import { getConsoleFunction, setConsoleFunction } from "three";

const CLOCK_DEPRECATION = "Clock: This module has been deprecated";

function isClockDeprecation(message: unknown): boolean {
  return String(message ?? "").includes(CLOCK_DEPRECATION);
}

let installed = false;

function installThreeClockWarningFilter() {
  if (installed) return;
  installed = true;

  const previous = getConsoleFunction();
  setConsoleFunction((method, message, ...params) => {
    if (method === "warn" && isClockDeprecation(message)) return;
    if (previous) {
      previous(method, message, ...params);
      return;
    }
    if (method === "warn") console.warn(message, ...params);
    else if (method === "error") console.error(message, ...params);
    else console.log(message, ...params);
  });

  if (typeof window !== "undefined") {
    const nativeWarn = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      if (isClockDeprecation(args[0])) return;
      nativeWarn(...args);
    };
  }
}

installThreeClockWarningFilter();
