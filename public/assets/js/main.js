'use strict';

//Obtener los datos de HTML con los que voy a trabajar (ul, input usuaria)


//1. Llevo a JS el ul para pintar los cocktails
const cocktailList = document.querySelector(".js-cocktailList");

//2. Llevo a JS el input para escuhar lo que busca 
const inputSearch = document. querySelector(".js-input");


//3. Obtener los datos del servidor 
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
.then(response => response.jason())
.then(data => {
  cocktailList = data.drinks;
})

//4. Necesito salvar/guardar los cocktails. Pero las tengo que guardar en una variable para acceder en todo mi código y las guardo y seria asi "cocktailList = data.drinks ". Va a estar vacio y tendrá valor cuando yo haga FETCH.
let cocktailList =[];

//# sourceMappingURL=main.js.map
