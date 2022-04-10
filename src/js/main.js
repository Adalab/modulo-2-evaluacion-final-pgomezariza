'use strict';

//a. Llevo a JS el ul para pintar los cocktails y lista 
const cocktailList = document.querySelector(".js-cocktailList");
const favList = document.querySelector(".js-favList")

//b. Llevo a JS el input para escuhar lo que busca la usuaria 
const inputSearch = document. querySelector(".js-input");
const searchBtn = document.querySelector(".js-searchBtn");

//c. Necesito salvar/guardar los cocktails. Pero las tengo que guardar en una variable ("cockList = data.drinks ") para acceder en todo mi código. Va a estar vacio en inicio y tendrá valor cuando yo haga FETCH.
let cockList = [];

//d. Creo una función (función manejadora) que escuche al input y lo FILTRE en FETCH
function handleInput(event){
  event.preventDefault();
  const searchDrinks = inputSearch.value.toLowerCase();
  if(searchDrinks !== ""){
    callFetch(searchDrinks);
  } else {
    cockList = [];
    paintCocktail();
  }
}

searchBtn.addEventListener('click', handleInput);

//e. Obtener los datos del servidor con fetch (creando la función callFetch) y que los pinte (aun no me lo puede pintar xq me falta la función para pintar el cocktail)
function callFetch(searchDrinks) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchDrinks}`)
    .then(response => response.json())
    .then(data => {
    cockList = data.drinks;
    paintCocktail();
    });
}

//f. Tengo que crear la función para pintar/renderizar el cocktail q me refería en el punto 5, una vez que he obtenido los datos
function paintCocktail() {
  let html = '';
  for (const drink of cockList) {
    let classFavorite = ''; 
    //1º miro si es favorita o no, antes de pintar
    const favoriteFoundIndex = favorites.findIndex((fav) => { 
      return fav.idDrink === drink.idDrink;
  });
  if(favoriteFoundIndex !== -1){
    classFavorite = "cocktail--favorite";
  }
  else {
    classFavorite = '';
  }
  //Ahora creo todo el código html
  //classFavorite -> añade la clase de favorito en caso de que corresponda
  html += `<li class="drink js-drink ${classFavorite}>" id=${drink.idDrink}>`;
  html += `<h3 class="nameDrink js-nameDrink"> ${drink.strDrink}</h3>`;
  html += `<img width="500" class="imgDrink js-imgDrink" src="${drink.strDrinkThumb}" alt="Cocktail" />`;
  html += `</li>`
  }
//Añado el codigo htmñ creado a la página
cocktailList.innerHTML = html;
//Después de modificar el html escucho de nuevo los eventos 
listenerCocktails();
paintFavorites(); 
}


//g. Escuchar cuando se clica en el cocktail
function listenerCocktails() {
  const liCocktail = document.querySelectorAll('.js-drink');
  for (const drink of liCocktail) {
    drink.addEventListener('click', handleClicCocktail);
  }
}

//h. Crear listado (array) de los cócteles favortios
let favorites =[]; 

//Escuchar el click y obtener el cocktail sacando el valor del id
function handleClicCocktail(event) {
  const idDrinkSelected = event.currentTarget.id;

  //existe en el listado de favoritos: (map, push, filter, find, findIndex, splice)
  //find: buscar el elemento en el listado, devuelto el elemento
  //findIndex: buscar la posición en el listado, devuelve la posición donde está, pero si me devuelve -1
  //splice: elimina un elemento de un listado dado el posición de donde esta , segundo parametro cuantos quiere eliminar

  //Busca un cocktail en la array de todas las bebidas
  const drinkFound = cockList.find(fav=>{
    return fav.idDrink === idDrinkSelected;
  });

  //compruebo si el cocktail que recibo está en favoritos
  const favoriteFoundIndex = favorites.findIndex(fav=>{
    return fav.idDrink === idDrinkSelected;
  });

  //Si es -1 es que no lo encontró porque no está
  if(favoriteFoundIndex === -1){
    favorites.push(drinkFound);
  }
  else {
    //eliminar de la lista de favoritos
    favorites.splice(favoriteFoundIndex,1); 
  }
  //i. Para que cambie las clases; cuando paint va a pintar primero pregunta si es un favorito y entonces le añade la clase o no (retrocede al punto 6)
  paintCocktail();
}
  
  //j. Esta es la funcion que pinta en favoritos segun el array
  function paintFavorites() {
    console.log('favorites')
    let html = '';
    for (const drink of favorites) {
      let classFavorite = ''; 
      const favoriteFoundIndex = favorites.findIndex((fav) => { 
        return fav.idDrink === drink.idDrink;
    });
    if(favoriteFoundIndex !== -1){
      classFavorite = "cocktail--favorite";
    } else {
      classFavorite = '';
    }
    html += `<li class=" drink js-favDrink ${classFavorite}>" id=${drink.idDrink}>`;
    html += `<h3 class="favNameDrink js-favNameDrink"> ${drink.strDrink}</h3>`;
    html += `<img width="500" class="imgDrink js-imgDrink js-favImgDrink" src="${drink.strDrinkThumb}" alt="Cocktail" />`;
    html += `</li>`;
    }
    favList.innerHTML = html;
  }

 //**.  Obtenermos lo que hay en el Local Storage
 const listCocktailStorage = JSON.parse(localStorage.getItem('listCocktailStorage'));
