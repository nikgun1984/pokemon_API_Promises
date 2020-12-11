// PART 2 -- choose random 3 pokemons
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function partTwo() {
    const numberOfpokemons = 3;
    const pokemons = [];
    for (let i = 0; i < numberOfpokemons; i++) {
        pokemons.push(axios.get(`${BASE_URL}/${Math.floor(Math.random() * 898)}`))
    }
    Promise.all(pokemons)
        .then(pokemonArray => {
            pokemonArray.forEach(pokemon => {
                console.log(pokemon.data.species.name);
                console.log(pokemon.data.order);
                console.log(pokemon.data.species.url);
                console.log(pokemon.data.sprites.front_default);
            })
        })
        .catch(err => console.log(err));
}

partTwo();