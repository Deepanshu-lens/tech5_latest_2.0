import { writable } from "svelte/store";

const createConfigSection = () => {
  const { subscribe, set, update } = writable<unknown[]>([]);
  return {
    subscribe,
    set: (data: unknown[]) => {
        //todo: validate here
      set(data);
    },
    update: (updater: (items: unknown[]) => unknown[]) => {
      update((current) => {
        const updatedData = updater(current);
        //todo: validate here
        return updatedData;
      });
    },
  };
};

export const currentSection = createConfigSection();
 