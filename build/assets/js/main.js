console.log('main.js');

$(document).ready(function () {


    $('.auto-slider-banner').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    });
    //-----------------------------------------
    $('.auto-slider-service').slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
    });

});