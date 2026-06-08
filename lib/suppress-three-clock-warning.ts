import { getConsoleFunction, setConsoleFunction } from "three";

const CLOCK_DEPRECATION =
  "Clock: This module has been deprecated. Please use THREE.Timer instead.";

let installed = false;

function installThreeClockWarningFilter() {
  if (installed) return;
  installed = true;

  const previous = getConsoleFunction();
  setConsoleFunction((method, message, ...params) => {
    if (method === "warn" && message === CLOCK_DEPRECATION) return;
    if (previous) {
      previous(method, message, ...params);
      return;
    }
    if (method === "warn") console.warn(message, ...params);
    else if (method === "error") console.error(message, ...params);
    else console.log(message, ...params);
  });
}

installThreeClockWarningFilter();
