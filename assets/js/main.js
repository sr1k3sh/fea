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

    /** window scroll event */
    var $body = jQuery("body");
    var $window = jQuery(window);
    var $topbar = jQuery(".js-topbar");
    var $navbar = jQuery(".js-navbar");
    var $header = jQuery(".fe-header__main-menu");
    var toogleState = false;

    const scrollWindow = () =>{
        if($window.scrollTop() > 10){
            $body.addClass("body-scrolled");
            $navbar.addClass("scrolled");
            $topbar.slideUp();
        }else{
            $body.removeClass("body-scrolled");
            $topbar.slideDown();
            $navbar.removeClass("scrolled");
        }
    }

    scrollWindow();

    $window.on("scroll",function(){
        if(!toogleState){
            scrollWindow();
        }
    });


    /** toggle menu */
    var $menuToggler = jQuery(".navbar-toggler");
    $menuToggler.on('click',function(){
        if($(this).hasClass("collapsed")){
            $header.removeClass("opened");
            $body.css({overflow:"auto"});
            $topbar.slideDown("fast");
            toogleState = false;
        }else{
            $header.addClass("opened");
            $topbar.slideUp();
            toogleState = true;
            $body.css({overflow:"hidden"});
        }
    });


    /** window resize */

    let timer;
    $window.on("resize",function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            if(toogleState){
                if($window.width() >= 1200){
                    $menuToggler.trigger('click');
                    // $header.removeClass("opened");
                    // $body.css({overflow:"auto"})
                }else{
                    // $header.addClass("opened");
                    // $body.css({overflow:"hidden"})
                }
            }
        },0);
    });

    /** hover effect for mega menu */
    if (window.innerWidth > 1200) {

        document.querySelectorAll('.fe-header__nav-item').forEach(function(everyitem){

            everyitem.addEventListener('mouseover', function(e){

                let el_link = this.querySelector('a[data-bs-toggle]');

                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.add('show');
                    nextEl.classList.add('show');
                }

            });
            everyitem.addEventListener('mouseleave', function(e){
                let el_link = this.querySelector('a[data-bs-toggle]');

                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.remove('show');
                    nextEl.classList.remove('show');
                }


            })
        });

    }
});
