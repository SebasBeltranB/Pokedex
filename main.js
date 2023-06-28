const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const pokemon = document.getElementById("nombrebuscar");
const botonBusqueda = document.getElementById("buscar");
const appNode = document.getElementById("app");

buscar.addEventListener("click", insertarPokemon);
function insertarPokemon() {
  window
    .fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
    .then((response) => {
      if (response.status === 404) {
        alert("Este Pokemón no está disponible");
      } else {
        return response.json();
      }
    })
    .then((responseJSON) => {
      const allItems = [];
      const result = [];
      for (let pokemonInfo in responseJSON) {
        result.push([pokemonInfo, responseJSON[pokemonInfo]]);
      }

      const imagenPokemon = document.createElement("img");
      imagenPokemon.src = result[14][1].front_default;

      const nombrePokemon = document.createElement("h1");
      nombrePokemon.innerText = `Nombre: ${result[10][1]} | ID: ${result[6][1]}`;

      const tipoPokemon = document.createElement("h1");
      tipoPokemon.innerText = `Tipo: ${result[16][1][0].type.name}`;

      const habilidadPokemon = document.createElement("h1");
      habilidadPokemon.innerText = `Habilidad: ${result[0][1][0].ability.name}`;

      const ataquePokemon = document.createElement("h1");
      ataquePokemon.innerText = `Ataque: ${result[15][1][1].base_stat}`;

      const defensaPokemon = document.createElement("h1");
      defensaPokemon.innerText = `Defensa: ${result[15][1][2].base_stat}`;

      const contenedor = document.createElement("section");
      contenedor.append(
        imagenPokemon,
        nombrePokemon,
        tipoPokemon,
        habilidadPokemon,
        ataquePokemon,
        defensaPokemon
      );

      allItems.push(contenedor);
      appNode.append(...allItems);
    });
}

const infoPokemon = document.querySelector(".pokemons");

function jsonPokemon(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())

    .then((info) => {
      cartaPokemon(info);
    });
}

function generarPokemons() {
  for (let i = 1; i <= 800; i++) {
    jsonPokemon(i);
  }
}

function cartaPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  const imagen = document.createElement("img");
  imagen.src = pokemon.sprites.front_default;

  const id = document.createElement("p");
  id.textContent = `ID: #${pokemon.id}`;

  const nombre = document.createElement("p");
  nombre.classList.add("nombre");
  nombre.textContent = pokemon.name;

  const tipos = document.createElement("p");
  tipos.classList.add("tipo");
  tipos.textContent = pokemon.types.map((type) => type.type.name);

  card.appendChild(imagen);
  card.appendChild(id);
  card.appendChild(nombre);
  card.appendChild(tipos);

  infoPokemon.appendChild(card);
}

generarPokemons();
