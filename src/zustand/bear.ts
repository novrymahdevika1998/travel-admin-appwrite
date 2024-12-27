import { create } from "zustand";

interface BearState {
    bears: number;
    addBear: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
    bears: 0,
    addBear: (by) => set((state) => ({ bears: state.bears + by })),
}))

export default useBearStore;