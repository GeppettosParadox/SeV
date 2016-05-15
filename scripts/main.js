$.fn.isOnScreen = function () {
    var element = this.get(0);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 84;
};

function setWhatsInsideIcons(slider, nextSlide) {
    $('.whats-inside__icon', slider)
        .css('transform', 'scale(0.66, 0.66)')
        .css('opacity', '.66')
    ;
    $('.whats-inside__icon[data-slick-index="' + nextSlide + '"]', slider)
        .css('transform', 'scale(1, 1)')
        .css('opacity', '1')
    ;
    $('.whats-inside__icon[data-slick-index="' + (nextSlide + 1) + '"], .whats-inside__icon[data-slick-index="' + (nextSlide - 1) + '"]', slider)
        .css('transform', 'scale(0.75, 0.75)')
        .css('opacity', '.8')
    ;
    $('.whats-inside__icon[data-slick-index="' + (nextSlide + 2) + '"], .whats-inside__icon[data-slick-index="' + (nextSlide - 2) + '"]', slider)
        .css('transform', 'scale(0.66, 0.66)')
        .css('opacity', '.66')
    ;
}

$(document).ready(function () {
    $('.tab-picker button').on('click', function () {
        var $button = $(this);
        var $category = $(this).attr('data-productcat');
        var $productGrid = $button.closest('.product-grid');
        if ($productGrid.hasClass('category')) {
            var $products = $productGrid.find('.category__product');
        } else {
            var $products = $productGrid.find('.product-grid__product');
        }
        $button
            .siblings()
            .addBack()
            .removeClass('active')
        ;
        $button
            .addClass('active')
        ;
        if ($category == 'all') {
            $products.removeClass('hide');
        } else {
            $products.addClass('hide');
            if ($category !== '') {
                $products.filter('[data-productcat="' + $category + '"]')
                    .removeClass('hide')
                ;
            } else {
                $products.removeClass('hide');
            }
        }
    });

    var $whats_inside_icons = $('.whats-inside__icons');

    $whats_inside_icons.slick({
        speed: 500,
        arrows: false,
        slidesToScroll: 1,
        slidesToShow: 7,
        centerMode: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5
                }
            }
        ]
    });

    setWhatsInsideIcons($whats_inside_icons, 0);

    $whats_inside_icons.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        setWhatsInsideIcons(this, nextSlide);
    });

    $('.whats-inside__icon', $whats_inside_icons).on('click', function () {
        var $index = $(this).attr('data-slick-index');
        $whats_inside_icons.slick('slickGoTo', $index, false);
    });

    $('.explore-product--more button').on('click', function () {
        $('.explore-product--hidable')
            .css('display', 'block')
            .delay(330)
            .removeClass('explore-product--hidden')
        ;
        $('.explore-product--more')
            .addClass('explore-product--hidden')
            .delay(330)
            .css('display', 'none')
        ;
        $('.explore-product--less')
            .removeClass('explore-product--hidden')
            .delay(330)
            .css('display', 'block')
        ;
    });

    $('.explore-product--less button').on('click', function () {
        $('.explore-product--hidable')
            .addClass('explore-product--hidden')
            .css('display', 'none')
        ;
        $('.explore-product--less')
            .css('display', 'none')
            .addClass('explore-product--hidden')
        ;
        $('.explore-product--more')
            .css('display', '')
            .removeClass('explore-product--hidden')
        ;
    });

    $('.size-options button').on('click', function () {
        $(this).siblings().andSelf().removeClass('active');
        $(this).addClass('active');
    });

    $('.color-options button').on('click', function () {
        $(this).siblings().andSelf().removeClass('active');
        $(this).addClass('active');
    });

    $('.qty-options button').on('click', function () {
        var qty = $(this).siblings('input')[0];
        var $qty_value = parseInt($(qty).val());
        if ($(this).hasClass('add')) {
            $qty_value = $qty_value + 1;
        }
        if ($(this).hasClass('sub') && $qty_value > 1) {
            $qty_value = $qty_value - 1;
        }
        $(qty).val($qty_value).attr('value', $qty_value);
    });

    var $cart = $('.cart');
    var $cartBtn = $('.nav-bar__cart-btn');
    var $cartCloseBtn = $('.nav-bar__close-cart-btn');
    var $cartWrapper = $('.cart-button-wrap');
    $cartBtn.on('click', function (e) {
        $cartWrapper.addClass('active');
        if (!window.body.hasClass('sticky-navbar')) {
            window.body.addClass("temp-sticky-navbar");
        }
        window.navBar.addClass("sticky");
        window.body.addClass("sticky-navbar");
        window.navBar.show();
        $cart.show();
    });

    $cartCloseBtn.on('click', function (e) {
        $cartWrapper.removeClass('active');
        if (window.body.hasClass('temp-sticky-navbar')) {
            window.navBar.removeClass("sticky");
            window.body.removeClass("sticky-navbar");
        }
        $cart.hide();
    });

    $('.launch-nav-btn').on('click', function () {
        $cartWrapper.removeClass('active');
        if (window.body.hasClass('temp-sticky-navbar')) {
            window.navBar.removeClass("sticky");
            window.body.removeClass("sticky-navbar");
        }
        $cart.hide();

    });

    $('.product-filter__toggle-button').on('click', function (e) {
        e.preventDefault();
        var $filtersContainer = $('.product-filter');
        var $filters = $('.product-filter__inner');
        var $sort = $('.product-filter__sort');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $filters.slideUp();
            $sort.show();
        } else {
            $(this).addClass('active');
            $sort.hide();
            $filters.slideDown();
            Foundation.reInit($('.price-slider'));
            Foundation.reInit($('.pocket-slider'));
        }
    });

    $('.product-filter button').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    $('.price-slider').on('moved.zf.slider', function () {
        var fromValue = $('#priceSliderFrom').val();
        $('.price-slider__info-from__value').html('$' + fromValue);
        var toValue = $('#priceSliderTo').val();
        $('.price-slider__info-to__value').html('$' + toValue);
    });

    $('.pocket-slider').on('moved.zf.slider', function () {
        var fromValue = $('#pocketSliderFrom').val();
        $('.pocket-slider__info-from__value').html(fromValue);
        var toValue = $('#pocketSliderTo').val();
        $('.pocket-slider__info-to__value').html(toValue);
    });

    $('.error-bar__close-button').on('click', function (e) {
        e.preventDefault();
        $('.error-bar').hide();
    });

    $("select").selectBoxIt({
        autoWidth: false,
        native: true,
        copyClasses: "container"
    });

    $('.product-grid__quick-view-btn').on('click', function (e) {
        e.preventDefault();
    });

    $('.toggle-checkout-buttons').on('click', function (e) {
        e.preventDefault();
        var $cartButtons = $('.cart__buttons');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $cartButtons.slideUp();
        } else {
            $(this).addClass('active');
            $cartButtons.slideDown();
        }
    });

    var $promoCodeToggle = $('.promo-code-toggle');
    var $promoCodeInput = $('.promo-code-input');
    $promoCodeInput.hide();
    $promoCodeToggle
        .show()
        .on('click', function (e) {
            e.preventDefault();
            $promoCodeInput.show().focus();
            $promoCodeToggle.hide();
        });


    window.navBar = $('.nav-bar');
    window.topBars = $('.top-bar');
    window.topBarsHeight = 0;
    window.body = $('body');
    window.buy_btn = $('.buy-bar .buy-btn button');
    window.scroll_btn = $('.scroll-back-btn button');

    window.scroll_btn.on('click', function (e) {
        e.preventDefault();
        window.topBarsHeight = 0;
        window.topBars.each(function () {
            if (!$(this).hasClass('nav-bar')) {
                window.topBarsHeight = window.topBarsHeight + $(this).outerHeight();
            }
        });

        $("html, body").animate({scrollTop: window.topBarsHeight}, "slow");
        return false;
    });

    $(window).scroll(function () {

        window.topBarsHeight = 0;

        window.topBars.each(function () {
            if (!$(this).hasClass('nav-bar')) {
                window.topBarsHeight = window.topBarsHeight + $(this).outerHeight();
            }
        });

        if ($(this).scrollTop() > topBarsHeight) {
            window.navBar.addClass("sticky");
            window.body.addClass("sticky-navbar");
            window.navBar.show();
        } else {
            if (!$('.cart-button-wrap').hasClass('active')) {
                window.navBar.removeClass("sticky");
                window.body.removeClass("sticky-navbar");
            }
        }

        if (window.buy_btn.length > 0) {
            if (window.buy_btn.isOnScreen()) {
                window.body.removeClass('buy-btn-offscreen');
                window.scroll_btn.css('opacity', '0').attr('disabled', '');
            } else {
                window.body.addClass('buy-btn-offscreen');
                window.scroll_btn.css('opacity', '1').removeAttr('disabled');
            }
        }
    });

    $('.more-link button').on('click', function (e) {
        $(this).closest('.tabs-panel').find('.hidable').toggleClass('show-for-sr');
        $(this).remove();
    });

    $('#stick-kit__buy').stick_in_parent({
        offset_top: 100
    });

    $('.down-arrow').on('click', function () {
        $('html, body').animate({
            scrollTop: $("#main").offset().top - 84
        }, 1000);
    });

    $('[data-open="sizing-modal"]').on('click', function () {
        $.ajax($(this).attr('data-href'))
            .done(function (resp) {
                $('#sizing-modal').html(resp);
            });
    });

    $('[data-open="quickview"]').on('click', function () {
        $.ajax($(this).attr('data-href'))
            .done(function (resp) {
                $('#quickview').html(resp);
                $(".xray-img").twentytwenty({
                    default_offset_pct: 0.5, // How much of the before image is visible when the page loads
                    orientation: 'horizontal' // Orientation of the before and after images ('horizontal' or 'vertical')
                });
                var $arrowsContainer = $('.color-options__carousel-nav');
                $('.color-options__graphical-carousel').slick({
                    arrows: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 3,
                    respondTo: 'slider',
                    variableWidth: true,
                    appendArrows: $arrowsContainer,
                    prevArrow: '<button type="button" class="slick-prev"><img src="/images/slide-arrow-back.svg"/></button>',
                    nextArrow: '<button type="button" class="slick-next"><img src="/images/slide-arrow.svg"/></button>'
                });
            });
    });
});

$(window).load(function () {
    $(".xray-img").twentytwenty({
        default_offset_pct: 0.5, // How much of the before image is visible when the page loads
        orientation: 'horizontal' // Orientation of the before and after images ('horizontal' or 'vertical')
    });
    $('.twentytwenty-handle').on('click', function (e) {
        e.preventDefault();
    });
    $(document).foundation();
});

$(window).resize(function () {
    Foundation.reInit('equalizer');
});

$('[data-reveal]').bind('open.zf.reveal', function () {

});
