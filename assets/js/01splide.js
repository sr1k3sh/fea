/** vertical slider */
var splide = new Splide( '.splide' ,{
    direction: 'ttb',
    wheel    : true,
    wheelSleep: 500,
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
});

splide.on("move",function(current,prev,dest){
    $customButton.removeClass('active');
    $(`.js-custom-button[data-index="${dest}"]`).addClass("active");
});