import {LOADING_START, LOADING_FINISHED} from "../constants";

export function startLoading() {
  return { type: LOADING_START};
}

export function finishLoading() {
  return { type: LOADING_FINISHED };
}
