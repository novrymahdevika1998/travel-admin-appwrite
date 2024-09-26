import { useState } from "react";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import { fetchPets } from "../services/pets";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    })
    const [animal, setAnimal] = useState("");
    const { breedList: breeds } = useBreedList(animal);

    const results = useQuery({ queryKey: ["search", requestParams], queryFn: fetchPets });
    const pets = results.data?.pets ?? [];

    return (
        <div className="search-params">
            <form
                onSubmit={e => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    const obj = {
                        animal: formData.get("animal") as string,
                        location: formData.get("location") as string,
                        breed: formData.get("breed") as string
                    }
                    setRequestParams(obj)
                }}
            >
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        placeholder="Location"
                        name="location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        name="animal"
                        onChange={(e) => {
                            setAnimal(e.target.value);
                        }}
                        onBlur={(e) => {
                            setAnimal(e.target.value);
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!breeds.length}
                        id="breed"
                        name="breed"
                    >
                        <option />
                        {breeds.map((breed: any) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="btn">Submit</button>
            </form>

            <button className="btn btn-primary bg-primary">Hello daisyUI</button>

            <Results pets={pets} />
        </div>
    );
}

export default SearchParams