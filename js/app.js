const poke_container = document.getElementById('poke_container');
const pokeCache = {};
const pokemons_number = 493;
var pokname = [];

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
	for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
	}
};


const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
  	const pokemon = await res.json();
	createPokemonCard(pokemon);
	//console.log(pokemon.name);
	pokname.push(pokemon.name);
	localStorage.setItem("pokemon", pokemon.name);
	console.log(localStorage.getItem("pokemon"));
};
function deleteSinglePokemon(){
	document.getElementById('single-pokemon').remove();
}

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add("pokemon");
	
 	const poke_types = pokemon.types.map((type) => type.type.name);
 	const background = main_types.find(type => poke_types.indexOf(type) == 0);
 	const type = pokemon.types.map((type) => type.type.name).join(', ');
	const name = pokemon.name;
	const color = types[background];
  
	
  pokemonEl.style.backgroundColor = color;
  

	const pokeInnerHTML = `
		<div class="info">
		<h3 class="name">${name}</h3>
		<span class="number">#${pokemon.id
			.toString()
			.padStart(3, '0')}</span>
		</div>
        <div class="img_container" onclick="selectPokemon(${pokemon.id})">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
							pokemon.id
							.toString()
							.padStart(3, '0')
						}.png" alt="${name}" />
        </div>
        <div class="info">
			<small class="type">Type: <span>${type}</span></small>
		</div>
    `;
	pokemonEl.innerHTML = pokeInnerHTML.replace('pikachu', 'Micachu').split('-').join(' ');

	poke_container.appendChild(pokemonEl);
}
const selectPokemon = async (id) => {
	console.log("JA")
	event.preventDefault();
	if(!pokeCache[id]){
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const pokemon = await res.json();
		pokeCache[id] = pokemon;
		//console.log(pokeCache);
		displayPopup(pokemon);
	}
	displayPopup(pokeCache[id]);
	console.log("JAHOORRRR")
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
	let test = stat => base_stats.indexOf(stat)==0;
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
		<div class="type">Type: ${type}</div><br>
		<div class="weight">Weight: ${weight} kg</div>
		<div class="height">Height: ${height} m</div><br>

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

			<div class="back"><img src="/images/backbutton.png" onclick="deleteSinglePokemon(${pokemon.id})"></div>
		</div>
	</div>
`;

pokemonEl.innerHTML = singlepokeInnerHTML;
pokemonEl.innerHTML = singlepokeInnerHTML.replace('pikachu', 'Micachu');

poke_container.appendChild(pokemonEl);
};

fetchPokemons();

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js')
			.then(reg => console.log('Service Worker: Registered'))
			.catch(err => console.log(`Service Worker: Error: ${err}`));
	});
}




/*	let element = document.getElementById("poke_container");
	while (element.firstChild) {
  		element.removeChild(element.firstChild);
	}*/
//var pokname = [];

// function autocomplete(inp, arr) {
// 	/*the autocomplete function takes two arguments,
// 	the text field element and an array of possible autocompleted values:*/
// 	var currentFocus;
// 	/*execute a function when someone writes in the text field:*/
// 	inp.addEventListener("input", function(e) {
// 		var a, b, i, val = this.value;
// 		/*close any already open lists of autocompleted values*/
// 		closeAllLists();
// 		if (!val) { return false;}
// 		currentFocus = -1;
// 		/*create a DIV element that will contain the items (values):*/
// 		a = document.createElement("DIV");
// 		a.setAttribute("id", this.id + "autocomplete-list");
// 		a.setAttribute("class", "autocomplete-items");
// 		/*append the DIV element as a child of the autocomplete container:*/
// 		this.parentNode.appendChild(a);
// 		/*for each item in the array...*/
// 		for (i = 0; i < arr.length; i++) {
// 			/*check if the item starts with the same letters as the text field value:*/
// 			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
// 			/*create a DIV element for each matching element:*/
// 			b = document.createElement("DIV");
// 			/*make the matching letters bold:*/
// 			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
// 			b.innerHTML += arr[i].substr(val.length);
// 			/*insert a input field that will hold the current array item's value:*/
// 			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
// 			/*execute a function when someone clicks on the item value (DIV element):*/
// 				b.addEventListener("click", function(e) {
// 				/*insert the value for the autocomplete text field:*/
// 				inp.value = this.getElementsByTagName("input")[0].value;
// 				/*close the list of autocompleted values,
// 				(or any other open lists of autocompleted values:*/
// 				closeAllLists();
// 			});
// 			a.appendChild(b);
// 			}
// 		}
// 	});
// /*execute a function presses a key on the keyboard:*/
// inp.addEventListener("keydown", function(e) {
// 	var x = document.getElementById(this.id + "autocomplete-list");
// 	if (x) x = x.getElementsByTagName("div");
// 	if (e.keyCode == 40) {
// 		/*If the arrow DOWN key is pressed,
// 		increase the currentFocus variable:*/
// 		currentFocus++;
// 		/*and and make the current item more visible:*/
// 		addActive(x);
// 	} else if (e.keyCode == 38) { //up
// 		/*If the arrow UP key is pressed,
// 		decrease the currentFocus variable:*/
// 		currentFocus--;
// 		/*and and make the current item more visible:*/
// 		addActive(x);
// 	} else if (e.keyCode == 13) {
// 		/*If the ENTER key is pressed, prevent the form from being submitted,*/
// 		e.preventDefault();
// 		if (currentFocus > -1) {
// 		/*and simulate a click on the "active" item:*/
// 		if (x) x[currentFocus].click();
// 		}
// 	}
// });
// function addActive(x) {
// 	/*a function to classify an item as "active":*/
// 	if (!x) return false;
// 	/*start by removing the "active" class on all items:*/
// 	removeActive(x);
// 	if (currentFocus >= x.length) currentFocus = 0;
// 	if (currentFocus < 0) currentFocus = (x.length - 1);
// 	/*add class "autocomplete-active":*/
// 	x[currentFocus].classList.add("autocomplete-active");
// }
// function removeActive(x) {
// 	/*a function to remove the "active" class from all autocomplete items:*/
// 	for (var i = 0; i < x.length; i++) {
// 	x[i].classList.remove("autocomplete-active");
// 	}
// }
// function closeAllLists(elmnt) {
// 	/*close all autocomplete lists in the document,
// 	except the one passed as an argument:*/
// 	var x = document.getElementsByClassName("autocomplete-items");
// 	for (var i = 0; i < x.length; i++) {
// 	if (elmnt != x[i] && elmnt != inp) {
// 	x[i].parentNode.removeChild(x[i]);
// 	}
// }
// }
// /*execute a function when someone clicks in the document:*/
// document.addEventListener("click", function (e) {
// 	closeAllLists(e.target);
// });
// }