'use strict';

//01. Obtener los datos de HTML con los que voy a trabajar (ul, input usuaria)
//02. Pintar los datos según el input de la usuaria
//03. Agregar a favoritos y quitar de favoritos
//04. Mover de la "Lista" -> a la columna de "Cócteles Favoritos"
//05. Almacenamiento local (Local Storage)



//1. Llevo a JS el ul para pintar los cocktails y lista 
const cocktailList = document.querySelector(".js-cocktailList");
const favList = document.querySelector(".js-favList")

//2. Llevo a JS el input para escuhar lo que busca la usuaria 
const inputSearch = document. querySelector(".js-input");

//3. Necesito salvar/guardar los cocktails. Pero las tengo que guardar en una variable ("cockList = data.drinks ") para acceder en todo mi código. Va a estar vacio en inicio y tendrá valor cuando yo haga FETCH.
let cockList = [];

//4. Creo una función que escuche al input y lo filtre en FETCH
function handleKeyupInput(event) {
  event.preventDefault();
  callFetch(searchDrinks);
}
search.addEventListener('keyup',handleKeyupInput);

//5. Obtener los datos del servidor con fetch y que los pinte 
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchDrinks}")
.then(response => response.jason())
.then(data => {
  cockList = data.drinks;
});

