$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
	dots:true,
	navText:["",""],
	rewindNav : true,
	autoplay:true,
    responsive:{
        0:{
            items:1,
			nav:false
        },
        600:{
            items:1,
			nav:false
        },
        1000:{
            items:2
        }
    }
})
window.onscroll = function() {myFunction()};
var mynav = document.getElementById("sentriex-nav");
var sticky = mynav.offsetTop;
function myFunction() {
  if (window.pageYOffset >= 100) {
    mynav.classList.add("sticky")
  } else {
    mynav.classList.remove("sticky");
  }
}

