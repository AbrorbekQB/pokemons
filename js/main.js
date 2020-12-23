var $ = function(selector) {
return document.querySelector(selector)
}

var elSearchForm = document.querySelector(".search__form");
var elSearchInput = document.querySelector(".search__input");
var elSearchButton = document.querySelector(".search__button");
var elPokemonsList = document.querySelector(".pokemons__list");
var elPokemonsTemplate = document.querySelector("#pokemons__template").content;

var elModal = document.querySelector(".modal");
var elModalContant = document.querySelector(".modal__contant");
var elModalImg = document.querySelector(".modal__img");
var elModalHeading = document.querySelector(".modal__heading");
var elModalText = document.querySelector(".modal__text");

var ESC__KEYCODE = 27;

var modernPokemons = pokemons.map(function(pokemon) {
  return {
    id : pokemon.id,
    name : pokemon.name,
    img : pokemon.img,
    type : pokemon.type,
    weight : pokemon.weight,
    height : pokemon.height,
    weaknesses : pokemon.weaknesses
  };
});

// function 
var showpokemons = function (pokemonsArray) {
  elPokemonsList.innerHTML = "";
  var elPokemonsFragment = document.createDocumentFragment();
  pokemonsArray.forEach(function (pokemon) {
    var elPokemonsClone = document.importNode(elPokemonsTemplate, true);

    elPokemonsClone.querySelector(".pokemon__img").src = pokemon.img;
    elPokemonsClone.querySelector(".pokemon__img").alt = pokemon.name + "'s img";
    elPokemonsClone.querySelector(".pokemon__name").textContent = pokemon.name;
    elPokemonsClone.querySelector(".pokemon__info__btn").dataset.id = pokemon.id

    elPokemonsFragment.appendChild(elPokemonsClone);
  });
  elPokemonsList.appendChild(elPokemonsFragment);
}

showpokemons(modernPokemons);

// sort pokemons by elSearchInput's value

elSearchForm.addEventListener("submit" , function(evt) {
  evt.preventDefault();

  if(!elSearchInput.value.trim()) {
    showpokemons(modernPokemons);
    return;
  }

  var SearchPokemonsRegExp = new RegExp(elSearchInput.value.trim(), "gi");
  var results = modernPokemons.filter(function(result) {
    return result.name.match(SearchPokemonsRegExp);
  });
  showpokemons(results);
});


elPokemonsList.addEventListener("click", function(evt){
  evt.preventDefault();

  // modal open when info btn clicked

  if(evt.target.matches(".pokemon__info__btn")) {
    var choosenPokemon = modernPokemons[parseInt(evt.target.dataset.id,10)-1];
    elModal.classList.add("modal--open");

    elModalImg.src = choosenPokemon.img;
    elModalImg.alt = choosenPokemon.name + "'s img";
    elModalHeading.textContent = choosenPokemon.name;
    elModalText.textContent = "Weakness: "+choosenPokemon.weaknesses;
  }
  elModal.addEventListener("click", function(evt){
      if (evt.target.matches(".modal__close__btn") || evt.target.matches(".modal")) {
        elModal.classList.remove("modal--open");
      }
  });
  document.addEventListener("keyup", function(evt) {
    if(evt.keyCode === ESC__KEYCODE)
    {
      elModal.classList.remove("modal--open");
    }
  })
});


