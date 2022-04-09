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

//4. Creo una función (función manejadora) que escuche al input y lo filtre en FETCH
function handleKeyupInput(event) {
  event.preventDefault();
  callFetch(searchDrinks);
}
inputSearch.addEventListener('keyup',handleKeyupInput);

//5. Obtener los datos del servidor con fetch (creando la función callFetch) y que los pinte (aun no me lo puede pintar xq me falta la función para pintar el cocktail)
function callFetch(searchDrinks) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchDrinks}")
  .then(response => response.json())
  .then(data => {
  cockList = data.drinks;
  });
}

//6. Tengo que crear la función para pintar/renderizar el cocktail q me refería en el punto 5, una vez que he obtenido los datos
function paintCocktail() {
  let html = '';
  for (const drink of cockList) {
    let classFavorite = ""; 
    //1º miro si es favorita o no, antes de pintar
    const favoriteFoundIndex = favorites.findIndex((fav) => { 
      return fav.idDrink === drink.idDrink;
  });
  if(favoriteFoundIndex !== -1){
    classFavorite = "cocktail--favorite";
  }
  else {
    classFavorite = "";
  }
  //Ahora creo todo el código html
  //classFavorite -> añade la clase de favorito en caso de que corresponda
  html += `<li class="drink js-drink ${classFavorite}>" id=${drink.idDrink}>`;
  html += `<h3 class="nameDrink js-nameDrink"> ${drink.strDrink}</h3>`;
  html += `<img class="imgDrink js-imgDrink" src="${drink.strDrinkThumb}" alt="Cocktail" />`;
  html += `</li>`
}};
cocktailList.innerHTML = html;
