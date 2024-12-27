import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "../@types/APIResponses";


const fetchPets:QueryFunction<
    PetAPIResponse,
    [
        "search",
        { animal: string, location: string, breed: string }
    ]
> = async ({ queryKey }) => {
    const { animal, location, breed } = queryKey[1];

    const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    if (!res.ok)
        throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`);

    return res.json();
}

type FetchPetProps = {
    queryKey: string[];
}

const fetchPet: QueryFunction<PetAPIResponse, ["details", string]> = async ({ queryKey }) => {
    const id = queryKey[1];

    const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

    if (!apiRes.ok) {
        throw new Error(`details/${id} fetch not ok`);
    }

    return apiRes.json();
}

export { fetchPets, fetchPet };