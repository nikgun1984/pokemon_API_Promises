const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

/* Call our data and build our cards */
document.querySelector("#form-pokemon").addEventListener('submit', function (evt) {
    evt.preventDefault();
    for (let i = 0; i < 3; i++) {
        setTimeout(function () {
            getPokemonData();
            //document.querySelector("button#btn").disabled = true;
        }, 3000)
        //createTags(name, image, description);
    }
})

/* Get Pakemon data from API */
function getPokemonData() {
    const pokemon = Math.floor((Math.random() * 898));
    let name, image, url, description;
    axios
        .get(`${BASE_URL}/${pokemon}`)
        .then(pokemon => {
            name = pokemon.data.species.name;
            image = pokemon.data.sprites.front_default;
            url = pokemon.data.species.url;
            createTags(name, image)
            console.log(name)
            console.log(image)
            console.log(url)
            return axios.get(url);
        })
        .then(description => {
            console.log(description.data.flavor_text_entries[0].flavor_text);
            description = getEnDescription(description.data.flavor_text_entries);
            const descrip = document.createElement("p");
            descrip.textContent = description;
            document.querySelector(`div#${name}`).appendChild(descrip);

        })
        .catch(err => {
            console.log(`Oops, there was a problem :( ${err}`);
        });
}

/* Create Card Content */
function createTags(name, image) {
    const div = document.createElement("div"),
        img = document.createElement("img"),
        title = document.createElement("h1");
    // desc = document.createElement("p");
    //append div
    div.classList.add('card');
    div.setAttribute("id", name)
    document.querySelector(".cards").appendChild(div);

    title.textContent = name;
    if (image) {
        img.setAttribute('src', image);
    }
    // desc.textContent = description;
    div.appendChild(title);
    div.appendChild(img);
    // div.appendChild(desc);
}

/* Get Description in English language */
function getEnDescription(entries) {
    for (let text of entries) {
        if (text.language.name == 'en') {
            return text.flavor_text;
        }
    }
    return null;
}