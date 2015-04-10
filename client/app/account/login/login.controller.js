'use strict';

angular.module('amplayfierSaasApp')
  .controller('LoginCtrl', function($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.multiItemSlickResponsive = [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }];

    $scope.slickMiniResponsive = [{
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    }, {
      breakpoint: 320,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 240,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }];

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then(function() {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch(function(err) {
            $scope.errors.other = err.message;
          });
      }
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.createUser({
            name: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then(function() {
            // Account created, redirect to home
            $location.path('/');
          })
          .catch(function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };


    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    //-----------------------------------------jquery.main.js----------------------------------------------------
    $("#nav > ul").dcAccordion({
      saveState: false,
      autoClose: true,
      disableLink: true,
      speed: "fast",
      showCount: false,
      autoExpand: false
    });

    $('.fa-briefcase').hover(function() {
      $('#formal-presenter').animate({
        marginRight: "-150px"
      });
      $('#goPop').html('Learning Portal').animate({
        opacity: 1
      })
    }, function() {
      $('#formal-presenter').animate({
        marginRight: "1000px"
      });
      $('#goPop').html('').animate({
        opacity: 0
      })
    })
    $('.fa-gamepad').hover(function() {
      $('#game-presenter').animate({
        marginLeft: "-150px"
      });
      $('#goPop').html('Marketing Portal').animate({
        opacity: 1
      });
    }, function() {
      $('#game-presenter').animate({
        marginLeft: "1000px"
      });
      $('#goPop').html('').animate({
        opacity: 0
      })
    })


    /* --------------- 13. DATA SLIDE --------------- */
    $('.data-slide').click(function(e) {
      var $this = $(this);
      var target = $this.attr('data-target');
      var $target = $(target);
      if ($('.slide-panel-parent').children().is('.open')) {
        $('.open').not(target).removeClass('open');
        $('.active-slide-btn').not(this).removeClass('active-slide-btn');
        $(this).toggleClass('active-slide-btn');
        $(target).toggleClass('open');
        $('html').removeClass('slide-active');
      } else {
        $(target).toggleClass('open');
        $(this).toggleClass('active-slide-btn');
        $('#page').toggleClass('page-off');
      }

      if ($('.slide-panel-parent').children().is('.open')) {
        $('html').addClass('slide-active'); //was addClass

      } else {
        $('html').removeClass('slide-active');

      }

      e.preventDefault();
    });

    //correct the shifting of the scrollbar when a slide is active
    if ($(document).height() > $(window).height()) {
      $('body').addClass('body-scroll-fix');
    }


    $('.slide-panel .close').click(function(e) {
      $('.active-slide-btn').removeClass('active-slide-btn');
      $(this).parent().removeClass('open');
      $('html').removeClass('slide-active');
      $('#page').removeClass('page-off');
      e.preventDefault();
    });


    // indicate what panel you're on when you've clicked inside a panel to another panel
    $('.slide-panel .signin-toggle').click(function(e) {
      $('.header-btn.signin-toggle').toggleClass('active-slide-btn');
      e.preventDefault();
    });

    $('.slide-panel .login-toggle').click(function(e) {
      $('.header-btn.login-toggle').toggleClass('active-slide-btn');
      e.preventDefault();
    });



    //set the variable of the Navbar
    var navbarHeight = $(".header").height() + 10;

    // SLIDE TO ANCHOR and DON'T COVER ANCHORS WITH .has-anchor on the trigger :: http://stackoverflow.com/a/20320919/1004312
    $('.has-anchor').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - navbarHeight //offset
          }, 1500);
        }
      }
    });
    // Executed on page load with URL containing an anchor tag.
    if ($(location.href.split("#")[1])) {
      var target = $('#' + location.href.split("#")[1]);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - navbarHeight //offset height of header here if the header is fixed and it is not!
        }, 1500);
        return false;
      }
    }




    /* --------------- 17. - 1 :: EQUAL HEIGHT INITIALIZE --------------- */
    $('.equal-height-content-box .equal-height-content').responsiveEqualHeightGrid();
    $('.equal-height-col [class*="col-"]').responsiveEqualHeightGrid();

    /* --------------- 17. - 2 :: .title inner wrapper --------------- */
    $('.title').wrapInner("<span></span>");

    /* --------------- 17. - 3 :: Inner Wrappers for .info-text-box and .widget-title --------------- */
    $('.info-text-box').wrapInner("<span></span>");
    $('.widget-title').wrapInner("<span></span>");

    /* --------------- 17. - 4 :: icon-click functions :: you can remove this on live sites ---------------*/
    $('.icon-demo span.glyphicon, .icon-demo span.ti').each(function() {
      var className = $(this).attr('class');
      $(this).attr('title', className).css({
        'cursor': 'pointer'
      });
      $(this).tooltip({
        trigger: 'click',
        container: 'body'
      }).toggleClass('active');
      $(this).after("<p>" + className + "</p>");
    });
    $('body').on('mouseup', function(e) {
      $('.icon-demo span.glyphicon, .icon-demo span.ti').each(function() {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.tooltip').has(e.target).length === 0) {
          $(this).tooltip('hide');
        }
      });
    });

    /* --------------- 17. - 5 :: Scroll to Top ---------------*/
    $('#go-to-top').hide();
    $(window).scroll(function() {
      if ($(this).scrollTop() > 300) {
        $('#go-to-top').fadeIn();
      } else {
        $('#go-to-top').fadeOut();
      }
    });
    $('#go-to-top').click(function(e) {
      $('html, body').animate({
        scrollTop: 0
      }, 800);
    });
    $('#btn-learnmore i').click(function(e) {
      $('html, body').animate({
        scrollTop: "600px"
      }, 800);
    });

    $('#go-to-home').click(function(e) {
      $('html, body').animate({
        scrollTop: 0
      }, 800);
    });
    $('#go-to-features').click(function(e) {
      $('html, body').animate({
        scrollTop: "600px"
      }, 800);
    });
    $('#go-to-demos').click(function(e) {
      $('html, body').animate({
        scrollTop: "1220px"
      }, 800);
    });
    $('#go-to-footer').click(function(e) {
      $('html, body').animate({
        scrollTop: "2050px"
      }, 800);
    });


    /* --------------- 17. - 6 :: Video Non-Blocking Load ---------------*/
    $('.video-holder.youtube .video-trigger').click(function(e) {
      e.preventDefault();
      var URL = $(this).attr('href');
      var htm = '<iframe width="560" height="315" src="http://www.youtube.com/embed/' + URL + '?rel=0?wmode=transparent" frameborder="0"></iframe>';
      $(this).parent().html(htm);
      $('.video-holder').fitVids();
      return false;
    });
    $('.video-holder.vimeo .video-trigger').click(function(e) {
      e.preventDefault();
      var URL = $(this).attr('href');
      var htm = '<iframe width="500" height="281" src="http://player.vimeo.com/video/' + URL + '?title=0&amp;byline=0&amp;portrait=0?wmode=transparent" frameborder="0"></iframe>';
      $(this).parent().html(htm);
      $('.video-holder').fitVids();
      return false;
    });

    //STOP VIDEO inside slider on click inside the slider
    $('.content-slider, .blog-slider, .featured-slider').click(function() {
      var element = $(this).find('.video-holder iframe');
      if (element.is(':visible')) {
        $.fn.videoStopFunction();
      }
    });

    $('.content-slider, .blog-slider, .featured-slider').on('touchstart', function() {
      var element = $(this).find('.video-holder iframe');
      if (element.is(':visible')) {
        $.fn.videoStopFunction();
      }
    });

    $.fn.videoStopFunction = function() {
      var video = $(".video-holder iframe").attr("src");
      $(".video-holder iframe").attr("src", "");
      $(".video-holder iframe").attr("src", video);
    }


    /* --------------- 17. - 7 :: pricing plan ---------------*/
    $('.the-details').hide();
    $('.has-details').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).children('.the-details').slideUp();
      } else {
        $('.has-details').removeClass('active');
        $(this).addClass('active');
        $('.the-details').slideUp();
        $(this).children('.the-details').slideDown();
      }
      return false;
    });
    $(document).bind("mouseup touchend", function(a) {
      if ($(a.target).parents().index($(".price-row")) == -1) {
        $('.has-details').removeClass('active');
        $('.the-details').slideUp();
      }
    });

    /* --------------- 17. - 8 :: CLICK SLIDE (mouseover on no-touch) ---------------*/
    var delay = (function() {
      var timer = 0;
      return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })();
    $('.click-slide').show();
    if ($('html').hasClass('touch')) {
      $('.click-slide').click(function() {
        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        } else {
          $('.click-slide').removeClass('open');
          $(this).addClass('open');
        }
      });
    } else {
      $('.click-slide').hover(function() { // Hover Intent is being used here
        if ($(this).hasClass('open')) {
          $(this).removeClass('open');
        } else {
          $('.click-slide').removeClass('open');
          $(this).addClass('open');
        }
      });
    }

    $(document).bind("mouseup touchend", function(e) {
      if ($(e.target).parents(".click-slide").length === 0) {
        $('.click-slide').removeClass('open');
      }
    });


    // --------------- 15. STICKY HEADER ---------------
    /* if window height greater than or equal to the height of the vertical icons and the header stick then not stick otherwise */
    $(window).on("load", function() {

      var windowHeight = $(window).height();
      var buttonWrapper = $('.header-btn-wrapper').outerHeight();
      var headerHeight = $('.header').outerHeight();
      var goToTopHeight = $('#go-to-top').height();


      if (windowHeight >= buttonWrapper + headerHeight) {
        $('.header').addClass('sticky-header');
      } else {
        $('.header').removeClass('sticky-header');

      }

      if (windowHeight >= buttonWrapper + headerHeight + goToTopHeight) {
        $('#go-to-top').addClass('position-1');
      } else {
        $('#go-to-top').removeClass('position-1');

      }

      var containerSize = $('.container').width();
      var colHeight = $('.featured-carousel img').innerHeight() // - 30//;

      if (containerSize >= 767) {
        $('.column-inner > .column-bg-fake').height(colHeight);
      }

    });

    //------------------------------------------------------------------------------------------------------

  });