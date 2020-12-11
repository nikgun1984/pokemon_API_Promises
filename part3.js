const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

for (let i = 0; i < 3; i++) {
    const {
        name,
        image,
        description,
        url
    } = getPokemonData();
}

function getPokemonData() {
    const pokemon = Math.floor((Math.random() * 898));
    let name, image, url, description;
    axios
        .get(`${BASE_URL}/${pokemon}`)
        .then(pokemon => {
            name = pokemon.data.species.name;
            image = pokemon.data.sprites.front_default;
            url = pokemon.data.species.url;
            console.log(name)
            console.log(image)
            console.log(url)
            return axios.get(url);
        })
        .then(description => {
            console.log(description.data.flavor_text_entries);
            description = description.data.flavor_text_entries;
        })
        .catch(err => {
            console.log(`Oops, there was a problem :( ${err}`);
        });

    return {
        name,
        image,
        description,
        url
    }
}