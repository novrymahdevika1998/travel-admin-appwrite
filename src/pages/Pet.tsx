import { Pet as PetType } from "../@types/APIResponses"



const Pet = (props: PetType) => {
    const { name, animal, breed, images, city, state, id } = props
    let hero = 'http://pets-images.dev-apis.com/pets/none.jpg'

    if (images.length) {
        hero = images[0]
    }
    return (
        <a href={`/details/${id}`} className="pet">
            <div className="image-container">
                <img src={hero} alt={name} width={400} />
            </div>
            <div className="info">
                <h1>{name}</h1>
                <h2>{animal} - {breed} - {city},{state}</h2>
            </div>
        </a>
    )
}

export default Pet