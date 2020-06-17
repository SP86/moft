var isMobile = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

function isIE() {
  ua = navigator.userAgent;
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  return is_ie;
}

if (isIE()) {
  document.querySelector('body').classList.add('ie');
}

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  }
});

function ibg() {
  if (isIE()) {
    var _ibg = document.querySelectorAll("._ibg");

    for (var i = 0; i < _ibg.length; i++) {
      if (_ibg[i].querySelector('img') && _ibg[i].querySelector('img').getAttribute('src') != null) {
        _ibg[i].style.backgroundImage = 'url(' + _ibg[i].querySelector('img').getAttribute('src') + ')';
      }
    }
  }
}

ibg();

let burgerWrapper = document.querySelector(".header__burger");
let iconMenu = document.querySelector(".icon-menu");
let body = document.querySelector("body");
let menuDropDown = document.querySelector(".header__menu-dropdown");
if (iconMenu) {
  burgerWrapper.addEventListener("click", function (e) {
    iconMenu.classList.toggle("active");
    body.classList.toggle("lock");
    menuDropDown.classList.toggle("active");
    e.stopPropagation();
  });
}

//Adaptive functions
let move_array=[];
if($('*[data-move]')){
  $.each($('*[data-move]'), function(index, val) {
    if($(this).data('move')!='' && $(this).data('move')!=null){
      $(this).attr('data-move-index',index);
      move_array[index]={
        'parent':$(this).parent(),
        "index":$(this).index()
      };
    }
  });
}
function dynamic_adaptive(){
  let w=$(window).outerWidth();
  $.each($('*[data-move]'), function(index, val) {
    if($(this).data('move')!='' && $(this).data('move')!=null){
      let dat_array=$(this).data('move').split(',');
      let dat_parent=$('.'+dat_array[0]);
      let dat_index=dat_array[1];
      let dat_bp=dat_array[2];
      if(w<dat_bp){
        if(!$(this).hasClass('js-move_done_'+dat_bp)){
          if(dat_index>0){
            $(this).insertAfter(dat_parent.find('*').eq(dat_index-1));
          }else{
            $(this).prependTo(dat_parent);
          }
          $(this).addClass('js-move_done_'+dat_bp);
        }
      }else{
        if($(this).hasClass('js-move_done_'+dat_bp)){
          dynamic_adaptive_back($(this));
          $(this).removeClass('js-move_done_'+dat_bp);
        }
      }
    }
  });
}
function dynamic_adaptive_back(el){
  let index_original=el.data('move-index');
  let move_place=move_array[index_original];
  let parent_place=move_place['parent'];
  let index_place=move_place['index'];
  if(index_place>0){
    el.insertAfter(parent_place.find('*').eq(index_place-1));
  }else{
    el.prependTo(parent_place);
  }
}
$(window).resize(function(event) {
  dynamic_adaptive();
});
dynamic_adaptive();


/*$(document).on('click touchstart', function (e) {
  console.log(e)
    if (!$(e.target).is(".header__menu-dropdown")) {
      $('.header__menu-dropdown').removeClass('active');
    };
});*/
