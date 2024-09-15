import { create } from "zustand";

interface FloorStore {
  floor: Number;
  setFloor: (floor: Number) => void;
}

export const useFloorStore = create<FloorStore>((set) => ({
  floor: 1,
  setFloor: (floor: Number) => set({ floor }),
}));
