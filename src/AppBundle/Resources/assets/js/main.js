function showNotify() {
    var $notificationButton = $('button#notify').attr('id', 'notify');
    $('#notifications').append($notificationButton);

    var notify = $('#notify'),
        randomId = 'rewrwe21',
        randomElement = $('.notifyMsg').attr('id', randomId).text('test notification').hide(),
        message = $('#messages');

    notify.on('click', showNotifyMsg);

    function showNotifyMsg() {
        message.append(randomElement);
        randomElement.fadeIn('slow');
        randomElement.fadeOut(1000, function() { $(this).remove(); });
    }
}

var isMobileView = $(window).width() <= 767,
    checkoutPageFlex = $('.checkoutPage');

function showBag() {
    var bagIcon = $('.checkoutGo'),
        productDetails = $('.product-details'),
        checkoutPage = $('.checkout'),
        shipping = 20,
        price = 300;

    bagIcon.on('click', showCheckoutPage);    
    
    function showCheckoutPage() {

        if($('#counterT').html() == "<script>document.write(localStorage.clickcount);</script>0" || $('#counterT').html() == 0) {
            shipping = 0;
        }  else {
            shipping = 20;
        }

        productDetails.hide();
        checkoutPage.show();
        document.getElementById("qtyEl").innerHTML = localStorage.clickcount;
        document.getElementById("qtyEl2").innerHTML = localStorage.clickcount*price+shipping  + '$';
        document.getElementById("subtotalEl").innerHTML = localStorage.clickcount*price + '$';

        if (isMobileView) {
            checkoutPageFlex.addClass('displayFlex');
        } 
    }
} 

function backToDetailsPage() {
    var btnProduct = $('.backToProduct'),
        productDetails = $('.product-details'),
        checkoutPage = $('.checkout');

    btnProduct.on('click', showProductPage);

    function showProductPage() {
        productDetails.show();
        checkoutPage.hide();
        if (isMobileView) {
            checkoutPageFlex.removeClass('displayFlex');
        } 
    }
} 

function addProcutToBasket() {
    var addtocart = $('#addtocart');

    addtocart.on('click', addProduct);

    function addProduct() {
        if(typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
                localStorage.clickcount = Number(localStorage.clickcount)+1;
            } else {
                localStorage.clickcount = 0;
            }
            document.getElementById("counterT").innerHTML = localStorage.clickcount;
        }
        if($('#counterT').text() > "0") {
            $('#removeFromCart').prop("disabled",false).removeClass('disabled');
        }
    }
}

function removeProcutFromBasket() {
    var removeFromCart = $('#removeFromCart');

    removeFromCart.on('click', removeProduct);

    function removeProduct() {
        if(typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
                localStorage.clickcount = Number(localStorage.clickcount)-1;
            } else {
                localStorage.clickcount = 0;
            }
            document.getElementById("counterT").innerHTML = localStorage.clickcount;
        }
         if($('#counterT').text() === "0") {
            $('#removeFromCart').prop("disabled",true).addClass('disabled');
        } else {
            $('#removeFromCart').prop("disabled",false).removeClass('disabled');
        }
    }
}

$(document).ready(function() {
    if($('#counterT').text() === "document.write(localStorage.clickcount);0") {
        $('#removeFromCart').prop("disabled", true).addClass('disabled');
    } else {
        $('#removeFromCart').prop("disabled", false).removeClass('disabled');
    }
});

function validation() {
  var errorCardNumber = $('.errorCardNumber'),
      buyProduct = $('.buyProduct');

  function isEmpty() {
    var inputFrmCheckout= $('.isNotEmpty');

    inputFrmCheckout.blur(function() {
      var value = inputFrmCheckout.filter(function () {
        return this.value === '';
      }); 

      if(value.length == 0) {
          buyProduct.attr("disabled", false).removeClass('disabled');
      } else {
          buyProduct.attr("disabled", true).addClass('disabled');
          $(this).next().text('This field must be complete!').show();
      }

      if($('#firstName').val().length > 0) {$('#errorName').text('').hide();}
      if($('#lastName').val().length > 0) {$('#errorLastName').text('').hide();}
      if($('#address').val().length > 0) {$('.errorAddress').text('').hide();}
      if($('#zipCode').val().length > 0) {$('#errorZipCode').text('').hide();}
      if($('#city').val().length > 0) {$('#errorCity').text('').hide();}
      if($('#state').val().length > 0) {$('#errorState').text('').hide();}
    });

    buyProduct.on('click', function(){
      var value = inputFrmCheckout.filter(function () {
        return this.value === '';
      }); 

      if(value.length == 0) {
          buyProduct.removeClass('disabled');
          buyProduct.attr("disabled", false);
          var thanksMsg = $('.thxMsg');
          thanksMsg.show();
          document.getElementById('thanksMsg').scrollIntoView();
      } else {
          alert('Full form! Please');
          buyProduct.attr("disabled", true).addClass('disabled');
          $('.error').text('This field must be complete!').show();
          $(this).addClass('error-input');
      }
    });
  } isEmpty();

  function isCardNumber() {
    var x, 
        text, 
        cardNumber = $('#cardNumber');

    cardNumber.blur(function() {
      x = document.getElementById("cardNumber").value;
        if (isNaN(x) || x.length != 14) {
            text = "It is not correct card number. Use only numbers, max value is 14!";
            buyProduct.attr("disabled", true).addClass('disabled');
            $(this).addClass('error-input');
        } else {
            text = "";
            $(this).removeClass('error-input');
        }
        document.getElementById("errorCardNumber").innerHTML = text;
    });
  } isCardNumber();

  function isCVCNumber() {
    var x, 
        text, 
        cvcNumber = $('#cvcNumber');

    cvcNumber.blur(function() {
      x = document.getElementById("cvcNumber").value;
        if (isNaN(x) || x.length != 3) {
            text = "It is not correct CVC number. Use only numbers, max value is 3!";
            buyProduct.attr("disabled", true).addClass('disabled');
            $(this).addClass('error-input');
        } else {
            text = "";
            $(this).removeClass('error-input');
        }
        document.getElementById("errorCVCNumber").innerHTML = text;
    });
  } isCVCNumber();

  function isText() {
    var x, 
        text, 
        cardHolder = $('#cardHolder');

    cardHolder.blur(function() {
      x = document.getElementById("cardHolder").value;
        if (!(isNaN(x))) {
            text = "Thils field should be text, not number!";
            buyProduct.attr("disabled", true).addClass('disabled');
        } else {
            text = "";
        }
        document.getElementById("errorCardHolder").innerHTML = text;
    });
  } isText();

    var emailInput = $("input#emailForm");

    emailInput.blur(function() { 
        function checkEmail() {
            emailInput.filter(function(){
                var email = emailInput.val(),
                    emailReg = /^[\w\.\-_\+]+@[\w-]+(\.\w{2,4})+$/; 
                    if(!emailReg.test(email)) {
                        text = "It is not correct email, example: name@yuongskilled.com";
                        $(this).addClass('error-input');
                    } else {
                        text = "";
                        $(this).removeClass('error-input');
                    }
                    document.getElementById("errorEmail").innerHTML = text;
            });    
        } checkEmail();
    });
}

function closeMsgFrm() {
  var closeWindow = $('.closeWindow'),
      thxMsg = $('.thxMsg'),
      input = $("input");

      closeWindow.on('click', closeMsg);

      function closeMsg() {
        thxMsg.hide(1000);
        input.val("");
      }
} 

function mobileNavi() {
    var mobileIcon = $('.mobileIcon'),
      mobileMenu = $('.mobileMenu');

      mobileIcon.on('click', showMobileMenu);

      function showMobileMenu() {
        mobileMenu.toggleClass('active');
      }
}

closeMsgFrm();
validation();
showNotify();
showBag();
backToDetailsPage();
addProcutToBasket();
removeProcutFromBasket();
mobileNavi();