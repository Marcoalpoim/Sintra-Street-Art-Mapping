
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }


  
}


document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const action = params.get("action");

  if (action) {
    const btn = document.getElementById(action + "Button");
    if (btn) btn.click(); // simulate click
  }











  
$(".resettagselection").on("click",function(){$(".tagselected").hide()}),

$(".tagstreetart").on("click",function(){$(".streetarttag").show(),
  $(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),
  $(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),
  $(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),
  $(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),
  $(".mosaicotag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),
  $(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),
  $(".individualtag").hide()}),$(".taggraffiti").on("click",function(){
    $(".graffititag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),
    $(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),
    $(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),
    $(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),
    $(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),
    $(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),
    $(".coletivatag").hide(),$(".individualtag").hide()}),
    $(".tagartepublica").on("click",function(){$(".artepublicatag").show(),
      $(".streetarttag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),
      $(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),
      $(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),
      $(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),
      $(".mosaicotag").hide(),$(".instalaçõestag").hide(),
      $(".sociopoliticatag").hide(),$(".espacialtag").hide(),
      $(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),
      $(".tagtag").on("click",function(){$(".tagtag").show(),
        $(".streetarttag").hide(),$(".artepublicatag").hide(),
        $(".graffititag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),
        $(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),
        $(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),
        $(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),
        $(".sociopoliticatag").hide(),$(".espacialtag").hide(),
        $(".comercialtag").hide(),$(".coletivatag").hide(),
        $(".individualtag").hide()}),$(".tagthrow-up").on("click",function(){
          $(".throw-uptag").show(),$(".streetarttag").hide(),
          $(".artepublicatag").hide(),$(".graffititag").hide(),
          $(".tagtag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),
          $(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),
          $(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),
          $(".mosaicotag").hide(),$(".instalaçõestag").hide(),
          $(".sociopoliticatag").hide(),$(".espacialtag").hide(),
          $(".comercialtag").hide(),$(".coletivatag").hide(),
          $(".individualtag").hide()}),
          $(".taglettering").on("click",function(){$(".letteringtag").show(),
            $(".streetarttag").hide(),$(".artepublicatag").hide(),
            $(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),
            $(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),
            $(".stickertag").hide(),$(".stenciltag").hide(),
            $(".yarnbombingtag").hide(),$(".postertag").hide(),
            $(".mosaicotag").hide(),$(".instalaçõestag").hide(),
            $(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagpiece").on("click",function(){$(".piecetag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagwildstyle").on("click",function(){$(".wildstyletag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagmural").on("click",function(){$(".muraltag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagsticker").on("click",function(){$(".stickertag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),
            $(".tagstencil").on("click",function(){
  
  $(".stenciltag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),
  $(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagyarnbombing").on("click",function(){$(".yarnbombingtag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagposter").on("click",function(){$(".postertag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagmosaico").on("click",function(){$(".mosaicotag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),
    $(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),
    $(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),
    $(".postertag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),
    $(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),
    $(".individualtag").hide()}),$(".tagmural").on("click",function(){
      $(".muraltag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),
      $(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),
      $(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),
      $(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),
      $(".postertag").hide(),$(".mosaicotag").hide(),$(".instalaçõestag").hide(),
      $(".sociopoliticatag").hide(),$(".espacialtag").hide(),
      $(".comercialtag").hide(),$(".coletivatag").hide(),
      $(".individualtag").hide()}),
      $(".taginstalações").on("click",function(){
        $(".instalaçõestag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".muraltag").hide(),
        $(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),
        $(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagsociopolitica").on("click",function(){$(".sociopoliticatag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".muraltag").hide(),$(".instalaçõestag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagespacial").on("click",function(){$(".espacialtag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),
          $(".muraltag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".comercialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagcomercialtag").on("click",function(){$(".comercialtag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".muraltag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".coletivatag").hide(),$(".individualtag").hide()}),$(".tagcoletiva").on("click",function(){$(".coletivatag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".muraltag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),$(".comercialtag").hide(),$(".individualtag").hide()}),$(".tagindividual").on("click",function(){$(".resetlocal.active").show(),$(".individualtag").show(),$(".streetarttag").hide(),$(".artepublicatag").hide(),$(".graffititag").hide(),$(".tagtag").hide(),$(".throw-uptag").hide(),$(".letteringtag").hide(),$(".piecetag").hide(),$(".wildstyletag").hide(),$(".muraltag").hide(),$(".stickertag").hide(),$(".stenciltag").hide(),$(".yarnbombingtag").hide(),$(".postertag").hide(),$(".mosaicotag").hide(),$(".muraltag").hide(),$(".instalaçõestag").hide(),$(".sociopoliticatag").hide(),$(".espacialtag").hide(),
      $(".comercialtag").hide(),$(".coletivatag").hide()})

// initialize Packery
  var $grid = $('.grid').packery({
itemSelector: '.filterDiv',
  gutter: 0,
  transitionDuration:'0.2s'
 
 });
 
 
 
 // make all grid-items draggable
 $grid.find('.filterDiv').each( function( i, gridItem ) {
   var draggie = new Draggabilly( gridItem );
 
   // bind drag events to Packery
   $grid.packery( 'bindDraggabillyEvents', draggie );
 });
 
// add shuffle method
Packery.prototype.shuffle = function(){
 var m = this.items.length, t, i;
 while (m) {
     i = Math.floor(Math.random() * m--);
     t = this.items[m];
     this.items[m] = this.items[i];
     this.items[i] = t;
 }
 this.layout();
}

// init packery
var pckry = new Packery('.grid2');

// shuffle on click
document.querySelector('.shuffle-button').onclick = function() {

pckry.shuffle();
};


$(".btn, .tagbtn").click(function(){
   $(".shuffle-button").click(); 
   return false;
});

const carousel = document.getElementById("carousel");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const scrollAmount = 100; // Adjust if needed

// Center clicked button in carousel, but DON'T change classes
document.querySelectorAll(".freguesiatag").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Wait for filterSelection() to finish and set the right .active
    setTimeout(() => {
      const active = carousel.querySelector(".freguesiatag.active") || this;
      const li = active.closest("li");
      if (!li) return;

      // Calculate the scroll position that centers the <li>
      const liCenter = li.offsetLeft + li.offsetWidth / 2;
      const scrollTo = liCenter - carousel.clientWidth / 1;

      carousel.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }, 0);
  });
});

// Left / right arrows
prev.addEventListener("click", () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

next.addEventListener("click", () => {
  carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// Toggle arrow opacity
function toggleArrows() {
  prev.style.opacity = carousel.scrollLeft > 0 ? "1" : "0.3";
  next.style.opacity =
    carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth
      ? "1"
      : "0.3";
}

carousel.addEventListener("scroll", toggleArrows);
window.addEventListener("load", toggleArrows);





$(document).ready(function(){
    setTimeout(function(){
       $('.shuffle-button').trigger('click');
   }, 200);
});


});


function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


