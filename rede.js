
{

document.getElementsByClassName('title')[0].addEventListener("click", (evt) => {
    document.getElementsByClassName('about-bar')[0].style.width = "100%"
  })
  document.getElementsByClassName('CloseBTNlexicon1')[0].addEventListener("click", (evt) => {
    document.getElementsByClassName('about-bar')[0].style.width = "0"
  })
  
  
} 


$(function () {

    
    // Show First Info
    
    $('.info').first().show().animate({width: '100%'});
    
 
        
    });


 
  
 

