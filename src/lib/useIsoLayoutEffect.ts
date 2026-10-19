import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect côté client, useEffect au SSR (évite le warning React). */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
