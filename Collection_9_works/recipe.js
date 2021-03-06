var data;
var selectedTags = [];
var labels = document.querySelectorAll("label");
// var recipeList = document.getElementById("recipeList");
var recipes = document.getElementById("recipes");
var recipeTemplate = document.getElementById("recipeTemplate");
var recipeInstructioncontainer = document.getElementById("recipeInstructioncontainer");
var recipeInstruction = document.getElementById("recipeInstruction");

/*** FETCH JSON DATA, ASSIGN IT TO OUR DATA VARIABLE ***/
fetch('data_6.json').then(function(response){
  return response.json();
}).then(function(json) {
  data = json;
  labels.forEach(function (label) {
    label.addEventListener("click", toggleLabelSelection);
  })
});
// *******************************************************
// ********* 1) Recording user imput ****** //
// *******************************************************
function toggleLabelSelection(event) {
  var labelFor = event.target.htmlFor;
  var labelInput = document.getElementById(labelFor);
  if (!labelInput.checked) {
    selectedTags.push(labelFor);
  } else {
    selectedTags = selectedTags.filter(tag => tag !== labelFor);
  }
  showRecipes(); //this gives template for recipe selection
}

// *******************************************************
// ******** 2) Template for Recipe Selection *****//
// *******************************************************
function showRecipes() {
 var selectedRecipes = [];
  data.forEach(function (recipe) {  //could name it anything besides recipe.
    selectedTags.forEach(function (tag) {
      if (recipe.tags.includes(tag)) {
        selectedRecipes.push(recipe);
        return;
      }
    });
  });
  recipes.innerHTML = "";
  selectedRecipes.forEach(function (recipe) {
    var DOMrecipeListContainer = document.createElement('div');
    DOMrecipeListContainer.className = "recipe-link";
      var img = document.createElement('img');
        img.setAttribute('src', recipe.images);
      var h = document.createElement('H1'); //this is recipe.recipeTitle
          var t = document.createTextNode(recipe.recipeTitle);
          h.appendChild(t);
      var p = document.createElement('P');
          p.innerText = recipe.tags;
      p.appendChild(h);
      h.appendChild(img);
      DOMrecipeListContainer.append(img, h, p);
      DOMrecipeListContainer.style.width = "100VW";
      DOMrecipeListContainer.style.height = "100VW";
      DOMrecipeListContainer.style.background = "green";
      document.getElementById('recipes').appendChild(DOMrecipeListContainer);
                 // lines 48 to 54 must be recoded using create element and append child. Then you can do
                //          on click handler for each thing in loop.
                // alternatively use createelement and append child to build DIV above.
               //  because h1.onclick = function() this can be the function to click when I call my title
               //  this function needs to clear recipe.inner.html"" (line 46) then does the same thing again
                //    rebuilds page with this full one screen page of recipe instructions.
  });
  // showrecipeInstructioncontainer();
}


// var DOMrecipeListContainer = document.createElement('div');
// DOMrecipeListContainer.className = "recipe-link";
// var img = document.createElement('img'); DOMrecipeListContainer.style.width = "100VW";
// img.setAttribute('src', recipe.images);
// DOMrecipeListContainer.appendChild(img);
// DOMrecipeListContainer.style.height = "100VW";
// DOMrecipeListContainer.style.background = "green";
// document.recipes.appendChild(DOMrecipeListContainer);
//*****************************************************
//********* Document Clicked Individual Recipe ***********
// *******  3) No, actually record data again**************************************
// *******************************************************

//*****************************************************
// ************************************************
document.getElementById('showMyRecipes').addEventListener('click', function(){
  recipeList.style.visibility = "visible"
}) ;
document.getElementById('closelist').addEventListener('click', function(){
  recipeList.style.visibility = "hidden"
}) ;
// recipeList.addEventListener('click', function(recipe){
//   recipeInstruction.style.visibility = "visible"
// }) ;
