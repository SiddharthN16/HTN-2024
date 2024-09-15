import { create } from "zustand";

interface RoomStore {
  room: string;
  setRoom: (room: string) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  room: "",
  setRoom: (room: string) => set({ room }),
}));
