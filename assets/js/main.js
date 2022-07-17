$(document).ready(function(){

    /** slick silder */
    $('.js-slider').slick({
        variableWidth: true,
        arrows: false,
        dots: false
    });

    $('.js-slider-2').slick({
        variableWidth: true,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: true,
    });

    /** vertical slider */

    var splide = new Splide( '.splide' ,{
        direction: 'ttb',
        // wheel    : true,
        // wheelSleep: 500,
        arrows: false,
        pagination : false,
        // releaseWheel: true,
        heightRatio: 0.4281,
        speed: 1000,
        breakpoints: {
            992: {
                destroy: true,
            },
        }
    }).mount();

    const splideChangeLogic = ($this, $selector) =>{
        var index = $this.attr('data-index');
        $selector.removeClass("active");
        $this.addClass("active");
        splide.go(parseInt(index));
    }

    var $customButton = $('.js-custom-button');
    $customButton.on('click',function(){
        splideChangeLogic($(this), $customButton);
    });

    $customButton.hover(function(){
        splideChangeLogic($(this), $customButton);
    })


    /** transition animation */

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
            if(toogleState && $window.width() >= 1200){
                $menuToggler.trigger('click');
            }
        },0);
    });

    /** hover effect for mega menu */
    if (window.innerWidth >= 1200) {

        $('.dropdown-toggle').on('click',function(){
            $(this).toggleClass("clicked show");
            $(this).next().toggleClass('clicked show')
        });

        $("body").on('click',function(e){
            if($(e.target).hasClass("dropdown-menu")) return;
            if($(e.target).hasClass("dropdown-toggle clicked")) return;
            $('.dropdown-toggle').removeClass('clicked show')
            $('.dropdown-toggle').next().removeClass('clicked show');
        });

        document.querySelectorAll('.fe-header__nav-item').forEach(function(everyitem){

            everyitem.addEventListener('mouseover', function(e){

                let el_link = this.querySelector('a[data-bs-toggle]');

                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    if(!$(el_link).hasClass('clicked')){
                        el_link.classList.add('show');
                        nextEl.classList.add('show');
                    }
                }
            });

            everyitem.addEventListener('mouseleave', function(e){
                let el_link = this.querySelector('a[data-bs-toggle]');

                if(el_link != null){
                    let nextEl = el_link.nextElementSibling;
                    if(!$(el_link).hasClass('clicked')){
                        el_link.classList.remove('show');
                        nextEl.classList.remove('show');
                    }
                }


            })
        });


    }

    /** fancybox */
    $('[data-fancybox="gallery"]').fancybox({
        // Options will go here
    });
});
