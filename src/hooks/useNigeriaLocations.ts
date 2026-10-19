import { useMemo } from "react";
import NaijaStates from "naija-state-local-government";

// Nigerian states and LGAs from the `naija-state-local-government` package (static data, no network calls).
const STATE_ALIASES: Record<string, string[]> = { "Federal Capital Territory": ["FCT", "Abuja"] };
const ALL_STATES = NaijaStates.states();
const lgaCache = new Map<string, string[]>();

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const matches = (option: string, search: string, aliases: string[] = []) => {
  const query = normalize(search);
  return !query || [option, ...aliases].some(name => normalize(name).includes(query));
};

/** All 37 states (36 + FCT), alphabetical. */
export const getNigeriaStates = () => ALL_STATES;

/** LGAs for a state (case-insensitive; accepts "FCT"/"Abuja"). Returns [] for an unknown state. */
export function getNigeriaLgas(state?: string): string[] {
  const resolved = resolveNigeriaState(state);
  if (!resolved) return [];
  if (!lgaCache.has(resolved)) lgaCache.set(resolved, [...new Set(NaijaStates.lgas(resolved).lgas)].sort((a, b) => a.localeCompare(b)));
  return lgaCache.get(resolved)!;
}

/** Maps user/API input ("lagos", "FCT", "Abuja") to the canonical state name, or undefined. */
export function resolveNigeriaState(state?: string): string | undefined {
  if (!state) return undefined;
  const key = normalize(state);
  return ALL_STATES.find(name => normalize(name) === key || STATE_ALIASES[name]?.some(alias => normalize(alias) === key));
}

export const searchNigeriaStates = (search = "") => ALL_STATES.filter(name => matches(name, search, STATE_ALIASES[name]));
export const searchNigeriaLgas = (state?: string, search = "") => getNigeriaLgas(state).filter(lga => matches(lga, search));

/**
 * States and LGAs with search, for any address form.
 *
 * const { states, lgas, isValidState, isValidLga } = useNigeriaLocations({ state, stateSearch, lgaSearch, lga });
 */
export function useNigeriaLocations({ state, lga, stateSearch = "", lgaSearch = "" }: { state?: string; lga?: string; stateSearch?: string; lgaSearch?: string } = {}) {
  const resolvedState = resolveNigeriaState(state);
  const states = useMemo(() => searchNigeriaStates(stateSearch), [stateSearch]);
  const lgas = useMemo(() => searchNigeriaLgas(resolvedState, lgaSearch), [resolvedState, lgaSearch]);
  return {
    states,
    lgas,
    allStates: ALL_STATES,
    resolvedState,
    isValidState: Boolean(resolvedState),
    isValidLga: Boolean(resolvedState && lga && getNigeriaLgas(resolvedState).includes(lga)),
  };
}
