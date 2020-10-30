const poke_container = document.getElementById('poke_container');
const pokeCache = {};
const pokemons_number = 493;
var pokname = [];
var list = document.getElementById("pokemons");

const types = {
	fire: 'rgb(247 163 163)',
	grass: '#DEFDE0',
	electric: 'rgb(251 240 186)',
	water: 'rgb(196 236 255)',
	ground: 'rgb(255 207 159)',
	rock: 'rgb(183 154 83)',
	fairy: '#fceaff',
	poison: 'rgb(224 197 222)',
	bug: 'rgb(179 185 73)',
	dragon: '#97b3e6',
	psychic: 'rgb(255 177 199)',
	flying: 'rgb(207 213 222)',
	fighting: '#E6E0D4',
  	normal: '#F5F5F5',
  	steel: '#B8B8D0',
 	dark: '#705848',
 	ice: 'rgb(184 255 245)',
 	ghost: '#bf90fd'
};
const main_types = Object.keys(types);

const fetchPokemons = async () => {
	const promises = [];
	for (let i = 1; i <= 75; i++) {
	//await getPokemon(i);
	promises.push(getPokemon(i).then((res) => res));
	}
	Promise.all(promises).then((res) => {
		//console.log(res);
		res.forEach(pokemon => {
			createPokemonCard(pokemon);
			pokname.push(pokemon.name);
			createSearchList(pokemon);
		})
	});
	const scndPromises = [];
	for (let i = 76; i <= pokemons_number; i++) {
		//await getPokemon(i);
		scndPromises.push(getPokemon(i).then((res) => res));
		}
		Promise.all(scndPromises).then((res) => {
			//console.log(res);
			res.forEach(pokemon => {
				createPokemonCard(pokemon);
				pokname.push(pokemon.name);
				createSearchList(pokemon);
			})
		});
};


const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	return await fetch(url)
	.then((res) => {
		//console.log(res);
		return res.json();
	});
  	/*const pokemon = await res.json();
	createPokemonCard(pokemon);
	
	pokname.push(pokemon.name);
	createSearchList(pokemon);*/
};
function createSearchList(pokemon){
	var option = document.createElement('option');
	option.value = pokemon.id;
	option.innerHTML = pokemon.name;
	list.appendChild(option);
}
function deleteSinglePokemon(){
	document.getElementById('single-pokemon').remove();
	enableScroll();
}

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');

	
 	const poke_types = pokemon.types.map((type) => type.type.name);
 	const background = main_types.find(type => poke_types.indexOf(type) == 0);
 	const type = pokemon.types.map((type) => type.type.name).join(', ');
	const name = pokemon.name;
	const color = types[background];
  
	
  
  

	const pokeInnerHTML = `
	<div class="pokemon" style="background:${color};" onclick="selectPokemon(${pokemon.id})">
		<div class="info">
		<h3 class="name">${name}</h3>
		<span class="number">#${pokemon.id
			.toString()
			.padStart(3, '0')}</span>
		</div>
        <div class="img_container">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
							pokemon.id
							.toString()
							.padStart(3, '0')
						}.png" alt="${name}" />
        </div>
        <div class="info">
			<small class="type">Type: <span>${type}</span></small>
		</div>
	</div>
	`;
	pokemonEl.innerHTML = pokeInnerHTML.replace('pikachu', 'Micachu').split('-').join(' ').replace('ninjask', 'Klaske Gasgeef');

	poke_container.appendChild(pokemonEl);
}
const pokemonForm = document.getElementById("searchPokemon");
	pokemonForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let pokemonId = pokemonForm.pokemon.value;
		console.log(pokemonId);
		selectPokemon(pokemonId);

});
const selectPokemon = async (id) => {
	if(!pokeCache[id]){
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const pokemon = await res.json();
		pokeCache[id] = pokemon;
		displayPopup(pokemon);
		disableScroll();
	}
	displayPopup(pokeCache[id]);
	disableScroll();
};

const displayPopup = (pokemon) => {
	if(document.getElementById('single-pokemon') != null){
		document.getElementById('single-pokemon').remove();
		}
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add("single-pokemon");
	pokemonEl.id = "single-pokemon";
	
 	const poke_types = pokemon.types.map((type) => type.type.name);
 	const background = main_types.find(type => poke_types.indexOf(type) == 0);
 	const type = pokemon.types.map((type) => type.type.name).join(', ');
	const name = pokemon.name;
	const color = types[background];
	const base_stats = pokemon.stats.map((stat) => stat.base_stat);
	const hp = base_stats[0];
	const atk = base_stats[1];
	const def = base_stats[2];
	const spatk = base_stats[3];
	const spdef = base_stats[4];
	const spd = base_stats[5];
	const weight = pokemon.weight / 10;
	const height = pokemon.height / 10;

	pokemonEl.style.backgroundColor = color;
  

	const singlepokeInnerHTML = `
	<div class="pokeName">
		<h3 class="name">${name}</h3>
		<span class="number">#${pokemon.id
						.toString()
						.padStart(3, '0')}</span>
	</div>
	<div class="pokeInfo">
		<div class="align-left">
			<div class="img_container">
			<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
							pokemon.id
							.toString()
							.padStart(3, '0')
						}.png" alt="${name}" />
			</div>
			<div class="info">
			<div class="type">Type: ${type}</div><br>
			<div class="weight">Weight: ${weight} kg</div>
			<div class="height">Height: ${height} m</div><br>
			</div>
		</div>
		<div class="align-right">
			<div class="info">
				<div class="detail-stats">
					<div class="detail-stats-row">
					<class="hp">HP: ${hp}
						<div class="progress">
							<div class="progress-bar" style="width: ${hp / 2}px">
							</div>
						</div>
					</div>

					<div class="detail-stats-row">
					<class="atk">ATK: ${atk}
						<div class="progress">
							<div class="progress-bar" style="width: ${atk / 2}px">
							</div>
						</div>
					</div>

					<div class="detail-stats-row">
					<class="def">DEF: ${def}
						<div class="progress">
							<div class="progress-bar" style="width: ${def / 2}px">
							</div>
						</div>
					</div>

					<div class="detail-stats-row">
					<class="spatk">SP.ATK: ${spatk}
						<div class="progress">
							<div class="progress-bar" style="width: ${spatk / 2}px">
							</div>
						</div>
					</div>

					<div class="detail-stats-row">
					<class="spdef">SP.DEF: ${spdef}
						<div class="progress">
							<div class="progress-bar" style="width: ${spdef / 2}px">
							</div>
						</div>
					</div>

					<div class="detail-stats-row">
					<class="spd">SPD: ${spd}
						<div class="progress">
							<div class="progress-bar" style="width: ${spd / 2}px">
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="back"><img src="/images/backbutton.png" onclick="deleteSinglePokemon(${pokemon.id})"></div>
		</div>
	</div>
`;

pokemonEl.innerHTML = singlepokeInnerHTML;
pokemonEl.innerHTML = singlepokeInnerHTML.replace('pikachu', 'Micachu').replace('ninjask', 'Klaske Gasgeef');

poke_container.appendChild(pokemonEl);
};

function enableScroll(){
	document.getElementById('body').style.overflow="auto";
}

function disableScroll(){
	document.getElementById('body').style.overflow="hidden";
}

fetchPokemons();

