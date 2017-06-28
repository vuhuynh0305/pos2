"use strict";

$(document).ready(function () {
    $('#navbar-menu').find('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 0)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });

    // Show loading before inititate page
    loading();

    // Clone carousel item
    cloneCarouselItem();

    // Scroll to top of page
    // scrollUp();

    // Start banner in main page
    slideBanner();

    // Start feature service slider in main page
    slideService();

    // Active "is-checked" class for filter in main page
    checkFilterProduct();

    // Truncate feature product title after number characters
    truncateFeatureProductTitle();

    // Truncate feature service text after number characters
    truncateFeatureServiceText();

    // Add border to slider based on number of item
    addDetailCarouselItemBorder();

    // Highlight current menu
    activeMenu();

    // Show or hide grid item in product page
    toggleProductPageGrid();

    $('.btn-search-mobile').on('click', function () {
        $('.top-search').slideToggle('slow');
    })

    // Active fancybox
    $('.fancybox').fancybox();

    // Click to go top of page
    toTop();

    // Set height for dropdown menu
    setDropDownMenuHeight();
});

function loading() {
    $(window).load(function () {
        $("#loading").fadeOut(500);
    });
}

function scrollUp() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('#scrollUp').fadeIn('slow');
        } else {
            $('#scrollUp').fadeOut('slow');
        }
    });

    $('#scrollUp').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
}

function slideBanner() {
    var sync1 = $("#slider-larger");
    var sync2 = $("#slider-thumb");
    // var slidesPerPage = slidesPerPage; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: false,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200
        //                navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            // items: slidesPerPage,
            dots: false,
            nav: true,
            smartSpeed: 200,
            slideSpeed: 500,
            autoplay: false,
            loop: true,
            margin: 5,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            },
            // slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100,
            navText: ['<i class="fa fa-angle-left fa-3x" aria-hidden="true"></i>', '<i class="fa fa-angle-right fa-3x" aria-hidden="true"></i>']
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
}

function slideService() {
    $('#servicesCarousel').owlCarousel({
        dots: false,
        nav: true,
        smartSpeed: 200,
        slideSpeed: 5000,
        margin: 30,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        },
        responsiveRefreshRate: 100,
        navText: ['<i class="fa fa-angle-left fa-3x" aria-hidden="true"></i>', '<i class="fa fa-angle-right fa-3x" aria-hidden="true"></i>']
    })
}

function checkFilterProduct() {
    var url = window.location.href;
    if (url.split('?')[1] != undefined && url.split('?')[1] != '') {
        var cateID = url.split('?')[1].split('=')[1];
        $('#filters button').each(function () {
            var dataFilter = $(this).data('filter');
            if (dataFilter == cateID) {
                $(this).addClass('is-checked');
            }
        })
    } else {
        $('#filters button:first-child').addClass('is-checked');
    }
}

function addDetailCarouselItemBorder() {
    var num = $('#detail .owl-carousel .item').length;
    $('#detail .owl-carousel .item').each(function (index) {
        if (num == 2 && index == 1) {
            $(this).children().addClass('border-left');

        }
        else if (num == 3 && (index == 1 || index == 2)) {
            $(this).children().addClass('border-left');
        }
        else if (num >= 4) {
            $('#detail .owl-carousel .item div').addClass('border-left');
        }
    })
}

function activeMenu() {
    var loc = window.location.pathname;

    $('.header').find('a').each(function () {
        if (loc == '/Home/Welcome' || loc == '') {
            $(this).closest('li').toggleClass('active', $(this).attr('href') == '/home/index/main');
        }
        else {
            $(this).closest('li').toggleClass('active', $(this).attr('href') == loc);
        }
    });
}

function truncateText(element, characters) {
    if (element.text().length > characters) {
        element.text(element.text().substring(0, characters) + '...');
    };
}

function truncateFeatureProductTitle() {
    $('.portfolio_detail_area .title').each(function () {
        truncateText($(this), 60);
    })
}

function truncateFeatureServiceText() {
    $('.services-detail-wrapper p').each(function () {
        truncateText($(this), 97);
    })
}

function toggleProductPageGrid() {
    $('#product-page .title h3').on('click', function () {
        $(this).closest('.row').find('.filters').toggleClass('visible');
        $(this).closest('.row').next('.grid').toggleClass('visible');
    })
}

function cloneCarouselItem() {
    if ($(window).width() > 767) {
        $('#featureCarousel .item').each(function () {
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            if (next.next().length > 0) {
                next.next().children(':first-child').clone().appendTo($(this));
            }
            else {
                $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }
        });
    }
}

function toTop() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('#scrollUp').fadeIn('slow');
        } else {
            $('#scrollUp').fadeOut('slow');
        }
    });

    $('#scrollUp').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
}

function setDropDownMenuHeight() {
    var menu = $('#product-page #menu .dropdown .dropdown-menu.menu1');
    var subMenu = $('#product-page #menu .dropdown .dropdown-menu.menu1 .sub-menu');
    var menuHeight = menu.actual('innerHeight');
    var subMenuHeight = 0;
    $('#product-page #menu .dropdown .dropdown-menu.menu1 li').each(function () {
        var currentHeight = $(this).children('.sub-menu').actual('innerHeight');
        subMenuHeight = currentHeight > subMenuHeight ? currentHeight : subMenuHeight;
    })
    if (menuHeight > subMenuHeight) {
        subMenu.height(menuHeight - 40);
    }
    else {
        menu.height(subMenuHeight);
        subMenu.height(subMenuHeight - 40);
    }
}

function toggleSideMenu(button) {
    $(button).toggleClass('is-active');
    $('#mySidenav').toggleClass('activeSideMenu');
    $('#product-page').toggleClass('activeSideMenu');
    $('.header').toggleClass('activeSideMenu');
}

$('.sideMenu span').click(function() {
    $(this).next('.sideMenuLv2').slideToggle('slow');
    $(this).find('i').toggleClass('fa-plus')
})

$('.sideMenuLv2 a button').click(function() {
    $(this).closest('li').find('.sideMenuLv3').slideToggle('slow');
    $(this).find('i').toggleClass('fa-minus')
})