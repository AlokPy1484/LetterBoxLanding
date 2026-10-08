// Fixed launch deadline in IST, independent of the visitor's local time zone.
export const LAUNCH_TIME = Date.parse("2026-10-11T09:00:00+05:30");
export const LAUNCH_LABEL = "Sunday, 11 October 2026 at 9:00 AM IST";

export function getLaunchCountdown(now = Date.now()) {
    const seconds = Math.max(0, Math.ceil((LAUNCH_TIME - now) / 1000));
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = seconds % 60;
    const pad = (value: number) => String(value).padStart(2, "0");

    return {
        expired: seconds === 0,
        text: `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(remainder)}s`,
    };
}
