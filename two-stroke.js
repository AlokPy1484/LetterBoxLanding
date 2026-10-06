/** A small two-stroke engine, assembled from parts that lift when selected. */
const {
  Cam, clamp, facing, fit, open, proj, prism, rings, rrect, disposer, mk,
  pointer, register, tdone, tset, tval, tween,
} = HL;

const MAX_LIFT = 20;
const PARTS = [
  {
    id: "carburetor", anchor: [-39, -1, 34],
    boxes: [
      [-52, -11, -29, 11, 6, 2, 28, 38],
      [-45, -8, -27, 8, 5, 1.5, 38, 46],
    ],
  },
  {
    id: "crankcase", anchor: [0, 0, 12],
    boxes: [[-31, -25, 31, 25, 12, 2.2, 0, 24]],
  },
  {
    id: "exhaust", anchor: [1, 43, 34],
    boxes: [
      [-9, 13, 9, 29, 5, 1.5, 31, 38],
      [-14, 28, 14, 51, 10, 2, 25, 43],
      [-9, 47, 9, 59, 4, 1.3, 29, 37],
    ],
  },
  {
    id: "cylinder", anchor: [0, 0, 49],
    boxes: [
      [-19, -19, 19, 19, 8, 2, 24, 66],
      [-25, -24, 25, 24, 9, 1.7, 30, 33],
      [-25, -24, 25, 24, 9, 1.7, 38, 41],
      [-25, -24, 25, 24, 9, 1.7, 46, 49],
      [-25, -24, 25, 24, 9, 1.7, 54, 57],
      [-25, -24, 25, 24, 9, 1.7, 62, 65],
    ],
  },
  {
    id: "head", anchor: [0, 0, 72],
    boxes: [[-24, -23, 24, 23, 9, 2, 66, 79]],
  },
  {
    id: "plug", anchor: [0, 0, 89],
    boxes: [
      [-5, -5, 5, 5, 2.5, 1.2, 79, 84],
      [-3, -3, 3, 3, 1.4, 0.7, 84, 94],
    ],
  },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value, active = -1;
  const C = Cam(45, 0.5, 1.82);
  const extents = [];
  for (const part of PARTS) for (const [x0, y0, x1, y1, , , z0, z1] of part.boxes) {
    for (const z of [z0, z1 + MAX_LIFT]) for (const [x, y] of [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]) extents.push([x, y, z]);
  }
  fit(C, extents, 200, 166);
  const P = proj(C), front = facing(C);
  const groups = PARTS.map((part) => {
    const g = mk("g", {}, svg), solids = [];
    const restMark = part.id === "plug";
    for (const spec of part.boxes) {
      const sil = mk("path", { class: restMark ? "sil hi" : "sil" }, g);
      const crease = mk("path", { class: restMark ? "nf lo hi" : "nf lo" }, g);
      solids.push({ spec, sil, crease });
    }
    return { part, g, solids, lift: tween(0) };
  });

  const anchors = PARTS.map((part) => P(...part.anchor));
  function hit([x, y]) {
    let best = -1, distance = 1e9;
    anchors.forEach(([ax, ay], i) => {
      const d = Math.hypot(x - ax, y - ay);
      if (d < distance) { distance = d; best = i; }
    });
    return distance < 44 ? best : -1;
  }
  function draw(group, amount) {
    for (const { spec, sil, crease } of group.solids) {
      const [x0, y0, x1, y1, radius, inset, z0, z1] = spec;
      const [ring, inner] = rings(x0, y0, x1, y1, radius, inset);
      const shifted = (x, y, z) => P(x, y, z + amount);
      const shape = prism(shifted, front, ring, inner, z0, z1);
      sil.setAttribute("d", shape.sil);
      crease.setAttribute("d", shape.crease);
    }
  }
  function caption(i) { return i < 0 ? "rest" : PARTS[i].id; }
  function setActive(next) {
    if (next === active) return;
    const now = performance.now();
    active = next;
    groups.forEach((group, i) => {
      tset(group.lift, i === next ? lift : 0, now);
      group.solids.forEach(({ sil, crease }) => {
        const bright = i === next || (next < 0 && group.part.id === "plug");
        sil.classList.toggle("hi", bright);
        crease.classList.toggle("hi", bright);
      });
    });
    read.textContent = caption(next);
    loop.wake();
  }

  // At rest the spark plug is the single bright starting mark.
  const loop = register(stage, (dt, now) => {
    let moving = false;
    groups.forEach((group) => {
      const amount = tval(group.lift, now);
      draw(group, amount);
      if (!tdone(group.lift, now)) moving = true;
    });
    return moving;
  });
  bag.add(loop.unregister);
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  groups.forEach((group) => draw(group, 0));

  return {
    set: (v) => {
      lift = clamp(v, 0, MAX_LIFT);
      if (active >= 0) {
        const now = performance.now();
        groups.forEach((group, i) => tset(group.lift, i === active ? lift : 0, now));
        loop.wake();
      }
    },
    destroy: bag.dispose,
  };
}

hairline({
  name: "two-stroke",
  means: "A two-stroke engine: point to a part and lift it for a closer look.",
  rules: [1, 4, 5, 9],
  range: [0, 10, 20],
  mount,
});
