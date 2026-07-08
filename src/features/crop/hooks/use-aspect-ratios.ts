"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addCustomRatio,
  EMPTY_STORE_STATE,
  hideBuiltIn,
  removeCustomRatio,
  restoreAllBuiltIns,
  restoreBuiltIn as restoreBuiltInRatio,
  visibleBuiltIns,
  type AspectRatioStoreState,
} from "@/features/crop/lib/aspect-ratio-store";
import type { CustomAspectRatioInput } from "@/features/crop/schema";
import type { AspectRatio } from "@/features/crop/types";

const STORAGE_KEY = "image-manager:crop:aspect-ratios";

export function useAspectRatios() {
  const [state, setState] = useState<AspectRatioStoreState>(EMPTY_STORE_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // localStorage is genuinely unavailable during SSR, so it can only be read after
        // mount — same justified exception as ThemeToggle (see CLAUDE.md "Design system").
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(JSON.parse(raw) as AspectRatioStoreState);
      }
    } catch {
      // Corrupt or inaccessible storage — fall back to defaults silently.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const presets = useMemo(() => visibleBuiltIns(state), [state]);
  const hasHiddenBuiltIns = state.deletedBuiltInIds.length > 0;

  const addCustom = useCallback((input: CustomAspectRatioInput): AspectRatio => {
    const ratio: AspectRatio = {
      id: crypto.randomUUID(),
      label: input.label,
      ratioLabel: `${input.width}:${input.height}`,
      ratio: input.width / input.height,
    };
    setState((s) => addCustomRatio(s, ratio));
    return ratio;
  }, []);

  const deleteBuiltIn = useCallback((id: string) => setState((s) => hideBuiltIn(s, id)), []);
  const restoreBuiltIn = useCallback(
    (id: string) => setState((s) => restoreBuiltInRatio(s, id)),
    [],
  );
  const restoreAllBuiltInsAction = useCallback(() => setState((s) => restoreAllBuiltIns(s)), []);
  const deleteCustom = useCallback((id: string) => setState((s) => removeCustomRatio(s, id)), []);
  const restoreCustom = useCallback(
    (ratio: AspectRatio) => setState((s) => addCustomRatio(s, ratio)),
    [],
  );

  return {
    hydrated,
    presets,
    customRatios: state.customRatios,
    hasHiddenBuiltIns,
    addCustom,
    deleteBuiltIn,
    restoreBuiltIn,
    restoreAllBuiltIns: restoreAllBuiltInsAction,
    deleteCustom,
    restoreCustom,
  };
}
