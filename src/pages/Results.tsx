import { Pet as PetType } from "../types/APIResponses";
import Pet from "./Pet";

const Results = ({ pets }: {pets: PetType[]}) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              city={pet.city}
              state={pet.state}
              description={pet.description}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;