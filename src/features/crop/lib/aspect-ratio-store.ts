import { BUILT_IN_ASPECT_RATIOS } from "@/features/crop/lib/aspect-ratios";
import type { AspectRatio } from "@/features/crop/types";

export interface AspectRatioStoreState {
  deletedBuiltInIds: string[];
  customRatios: AspectRatio[];
}

export const EMPTY_STORE_STATE: AspectRatioStoreState = {
  deletedBuiltInIds: [],
  customRatios: [],
};

export function addCustomRatio(
  state: AspectRatioStoreState,
  ratio: AspectRatio,
): AspectRatioStoreState {
  return { ...state, customRatios: [...state.customRatios, ratio] };
}

export function removeCustomRatio(state: AspectRatioStoreState, id: string): AspectRatioStoreState {
  return { ...state, customRatios: state.customRatios.filter((r) => r.id !== id) };
}

export function hideBuiltIn(state: AspectRatioStoreState, id: string): AspectRatioStoreState {
  if (state.deletedBuiltInIds.includes(id)) {
    return state;
  }
  return { ...state, deletedBuiltInIds: [...state.deletedBuiltInIds, id] };
}

export function restoreBuiltIn(state: AspectRatioStoreState, id: string): AspectRatioStoreState {
  return { ...state, deletedBuiltInIds: state.deletedBuiltInIds.filter((x) => x !== id) };
}

export function restoreAllBuiltIns(state: AspectRatioStoreState): AspectRatioStoreState {
  return { ...state, deletedBuiltInIds: [] };
}

export function visibleBuiltIns(state: AspectRatioStoreState): AspectRatio[] {
  return BUILT_IN_ASPECT_RATIOS.filter((r) => !state.deletedBuiltInIds.includes(r.id));
}
