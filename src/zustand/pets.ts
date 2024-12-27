import { create } from "zustand";

type PetType = {
    id: number,
    name: string,
    animal: string,
    city: string,
    state: string,
    description: string,
    images: string[],
}

interface IPetState {
    
}

const usePetStore = create()((set) => ({

}))

export default usePetStore;