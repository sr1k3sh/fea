$(document).ready(function(){
    $('.js-slider').slick({
        variableWidth: true,
        arrows: false,
        dots: false
    });

    $('.js-slider-2').slick({
        variableWidth: true,
        arrows: false,
        dots: false,
        // autoplay: true,
        // autoplaySpeed: 1000,
        draggable: true,
    });

    new Splide( '.splide' ,{
        direction: 'ttb',
        // height   : '565px',
        wheel    : true,
        wheelSleep: 500,
        pagination : false,
        releaseWheel: true,
        heightRatio: 0.4281,
        breakpoints: {
            768: {
                destroy: true,
            },
        }
    }).mount();

    AOS.init({
        offset:12,
        once: true
    });
})
