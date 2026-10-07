/** A two-stroke engine in a vertical section, at top dead center. */
const {
  Cam, clamp, circ, fit, fillet, open, poly, proj, disposer, mk,
  pointer, register, tdone, tset, tval, tween,
} = HL;

const MAX_LIFT = 86;
const K = Math.sqrt(0.75);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(0, 0.5, 1.6);
  fit(C, [[-56, 0, 0], [50, 0, 150 + MAX_LIFT / (C.S * K)]], 200, 166);
  const P = proj(C), profile = ([x, z]) => P(x, 0, z);
  const parts = [];

  function part(id, anchor, restMark = false) {
    const g = mk("g", {}, svg);
    const item = { id, anchor: profile(anchor), g, active: [], all: [], lift: tween(0), restMark };
    parts.push(item);
    return item;
  }
  function path(item, points, { closed = false, bright = false, dim = false, round = 0 } = {}) {
    let ps = points;
    if (round) ps = fillet(points, round, 4);
    const d = (closed ? poly : open)(ps.map(profile));
    const el = mk("path", { d, class: `nf ${dim ? "lo" : "sil"}${bright ? " hi" : ""}` }, item.g);
    item.all.push(el);
    if (!dim) item.active.push(el);
    if (bright) item.restMark = true;
    return el;
  }
  function rect(item, x0, z0, x1, z1, r = 1.5, options = {}) {
    return path(item, [[x0 + r, z0], [x1 - r, z0], [x1, z0 + r], [x1, z1 - r], [x1 - r, z1], [x0 + r, z1], [x0, z1 - r], [x0, z0 + r]], { ...options, closed: true });
  }
  function circle(item, x, z, r, options = {}) {
    const ring = circ(r, 16).map((p) => [x + p.u, z + p.v]);
    return path(item, ring.concat([ring[0]]), options);
  }

  // The sectioned crankcase is bulbous but open at the cut face.
  const casing = part("crankcase", [27, 18]);
  path(casing, [[-36, 9], [-39, 17], [-35, 32], [-27, 42], [-14, 47], [13, 47], [27, 40], [36, 28], [36, 12], [28, 5], [-27, 5]], { closed: true, round: [4, 5, 4, 5, 4, 4, 5, 5, 4, 4, 4] });
  path(casing, [[-28, 13], [-30, 23], [-23, 34], [-13, 39], [13, 39], [24, 32], [29, 22], [27, 14], [20, 10], [-20, 10]], { closed: true, dim: true, round: [3, 4, 4, 3, 3, 4, 4, 3, 3, 3] });
  for (let i = 0; i < 3; i++) path(casing, [[-34 + i * 3, 11], [-29 + i * 3, 17]], { dim: true });
  for (let i = 0; i < 3; i++) path(casing, [[25 + i * 2, 34], [30 + i * 2, 39]], { dim: true });

  // Crank webs, crankpin and the long connecting rod sit inside the case.
  const crank = part("crankshaft", [0, 27]);
  circle(crank, -7, 27, 12, { bright: false });
  circle(crank, 7, 27, 12, { dim: true });
  circle(crank, 0, 27, 4, { dim: true });
  circle(crank, -25, 24, 5, { dim: true });
  circle(crank, 25, 24, 5, { dim: true });

  // The port windows interrupt the liner; the piston skirt covers the exhaust window at rest.
  const cylinder = part("cylinder", [-25, 104]);
  for (const z of [57, 67, 98, 108, 118, 128]) {
    rect(cylinder, -31, z, 31, z + 2.5, 1.2);
    path(cylinder, [[-28, z + 1.2], [28, z + 1.2]], { dim: true });
  }
  path(cylinder, [[-21, 53], [-21, 81]], {});
  path(cylinder, [[-21, 94], [-21, 130]], {});
  path(cylinder, [[-12, 53], [-12, 130]], { dim: true });
  path(cylinder, [[21, 53], [21, 70]], {});
  path(cylinder, [[21, 79], [21, 130]], {});
  path(cylinder, [[12, 53], [12, 130]], { dim: true });
  path(cylinder, [[-21, 130], [-12, 130], [12, 130], [21, 130]], {});
  rect(cylinder, -23, 81, -11, 94, 1, { dim: true });
  rect(cylinder, 11, 70, 23, 79, 1, { dim: true });
  for (const z of [60, 64, 101, 111, 121]) {
    path(cylinder, [[-20, z], [-13, z + 2]], { dim: true });
    path(cylinder, [[13, z + 2], [20, z]], { dim: true });
  }

  // Piston, wrist pin and connecting rod lift as one connected assembly.
  const piston = part("piston", [0, 106]);
  path(piston, [[-2.2, 93], [2.2, 93], [4.5, 34], [1.6, 30], [-1.6, 30], [-4.5, 34]], { closed: true, round: [1, 1, 1.5, 1, 1, 1.5] });
  path(piston, [[0, 89], [0, 35]], { dim: true });
  // Domed crown, long skirt, two ring grooves and a hollow wrist pin.
  path(piston, [[-12, 78], [-12, 110], [-9, 116], [-5, 119], [0, 120], [5, 119], [9, 116], [12, 110], [12, 78]], { closed: true, round: [1.5, 1.5, 2, 2, 2, 2, 2, 1.5, 1.5] });
  path(piston, [[-11.5, 110], [11.5, 110]], { dim: true });
  path(piston, [[-11.5, 106], [11.5, 106]], { dim: true });
  circle(piston, 0, 91, 4.5, { dim: true });
  path(piston, [[-4.5, 91], [4.5, 91]], { dim: true });

  // Head and its small domed combustion chamber.
  const head = part("cylinder head", [0, 135]);
  path(head, [[-23, 130], [-23, 137], [-20, 141], [-15, 143], [15, 143], [20, 141], [23, 137], [23, 130]], { closed: true, round: [2, 2, 3, 3, 3, 3, 2, 2] });
  path(head, [[-10, 130], [-7, 126], [-4, 124], [0, 123], [4, 124], [7, 126], [10, 130]], { dim: true });
  for (const z of [135, 139, 143]) rect(head, -28, z, 28, z + 1.8, 0.8, { dim: true });

  // The threaded plug enters the chamber; its electrode is the rest highlight.
  const plug = part("spark plug", [0, 149], true);
  path(plug, [[-3.2, 139], [-3.2, 150], [-2, 153], [2, 153], [3.2, 150], [3.2, 139]], { closed: true, bright: true });
  for (const z of [141, 143, 145]) path(plug, [[-3, z], [3, z]], { dim: true });
  path(plug, [[0, 139], [0, 123], [2, 121]], { bright: true });

  // Exhaust tunnel and its expanding chamber on the left.
  const exhaust = part("exhaust", [-43, 61]);
  path(exhaust, [[-21, 82], [-30, 82], [-32, 72], [-40, 69], [-49, 64], [-53, 59], [-51, 54], [-45, 51], [-38, 52], [-34, 57], [-31, 67], [-25, 70]], { closed: true, round: [1.5, 2, 2, 3, 4, 4, 4, 3, 4, 3, 2, 2] });
  path(exhaust, [[-21, 88], [-29, 88], [-31, 76], [-40, 72], [-47, 66], [-49, 60]], { dim: true });
  path(exhaust, [[-21, 82], [-28, 82]], { dim: true });

  // Transfer passage returns charge from the crankcase to the opposite port.
  const transfer = part("transfer passage", [25, 57]);
  path(transfer, [[14, 39], [20, 36], [29, 48], [29, 63], [22, 70], [16, 70], [23, 61], [23, 50]], { closed: true, round: [1.5, 2, 2, 2, 2, 2, 2, 2] });
  path(transfer, [[17, 42], [24, 49], [24, 63], [20, 68]], { dim: true });

  // Carburetor and intake reed feed the sealed pumping case.
  const carb = part("carburetor", [43, 31]);
  path(carb, [[34, 24], [36, 20], [47, 20], [50, 24], [50, 34], [46, 38], [36, 37], [33, 33]], { closed: true, round: [2, 2, 2, 2, 3, 2, 2, 2] });
  circle(carb, 43, 29, 5, { dim: true });
  path(carb, [[33, 29], [27, 29], [25, 34]], { dim: true });
  path(carb, [[29, 25], [29, 33]], { dim: true });

  const anchors = parts.map((p) => p.anchor);
  function hit([x, y]) {
    let picked = -1, nearest = Infinity;
    anchors.forEach(([ax, ay], i) => {
      const d = Math.hypot(x - ax, y - ay);
      if (d < nearest) { nearest = d; picked = i; }
    });
    return nearest < 42 ? picked : -1;
  }
  let lift = value, active = -1;
  function setActive(next) {
    if (active === next) return;
    active = next;
    const now = performance.now();
    parts.forEach((p, i) => {
      tset(p.lift, i === next ? lift : 0, now, 0);
      p.active.forEach((el) => el.classList.toggle("hi", i === next || (next < 0 && p.restMark)));
    });
    read.textContent = next < 0 ? "rest" : parts[next].id;
    loop.wake();
  }
  const loop = register(stage, (_dt, now) => {
    let moving = false;
    parts.forEach((p) => {
      const amount = tval(p.lift, now);
      p.g.setAttribute("transform", `translate(${amount * 1.5} ${-amount})`);
      if (!tdone(p.lift, now)) moving = true;
    });
    return moving;
  });
  bag.add(loop.unregister);
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  parts.forEach((p) => p.active.forEach((el) => el.classList.toggle("hi", p.restMark)));

  return {
    set: (v) => {
      lift = clamp(v, 0, MAX_LIFT);
      if (active >= 0) {
        const now = performance.now();
        parts.forEach((p, i) => tset(p.lift, i === active ? lift : 0, now, 0));
        loop.wake();
      }
    },
    destroy: bag.dispose,
  };
}

hairline({
  name: "two-stroke",
  means: "A two-stroke cutaway at top dead center: point to a part and lift it.",
  rules: [1, 4, 5, 9],
  range: [0, 70, 86],
  mount,
});
