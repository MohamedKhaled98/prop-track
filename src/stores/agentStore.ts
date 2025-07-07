import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Agent } from "../types/agent";

type Store = {
  agent: Agent | null;
  setAgent: (agent: Agent) => void;
};

export const useAgentStore = create<Store>()(
  devtools(
    persist(
      set => ({
        agent: null,
        setAgent: agent => set({ agent }),
      }),
      {
        name: "agent",
      },
    ),
  ),
);
