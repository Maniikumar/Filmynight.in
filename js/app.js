"use strict";
$(document).ready(function () {
    $(".trending").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows:true,
        dots:false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.playlist').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
    });



    $(".gallery").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: true,
    });




    $('.play-trailer').on('click', function () {
        var id = $(this).data('id');
        var url = $(this).data('url');
        var token = $(this).data('token');
        $.ajax({
            type: 'get',
            url: url+'/getTrailer/'+id,
            async: false,
            data:{
                id:id,
                '_token': token
            },

            success: function (data) {
                $("#trailer-modal .modal-content").html('<iframe id="video" width="100%" height="100%" src="https://www.youtube.com/embed/'+data+'?autoplay=1" frameborder="0" allowfullscreen></iframe>');
                $("#trailer-modal").modal('toggle');
            }
        });
    });


    $('.play-trailer-tv').on('click', function () {
        var id = $(this).data('id');
        var url = $(this).data('url');
        $.ajax({
            type: 'get',
            url: url+'/getTvTrailer/'+id,
            async: false,

            success: function (data) {
                $("#trailer-modal .modal-content").html('<iframe id="video" width="100%" height="100%" src="https://www.youtube.com/embed/'+data+'?autoplay=1" frameborder="0" allowfullscreen></iframe>');
                $("#trailer-modal").modal('toggle');
            }
        });

    });

    $(document).on('hidden.bs.modal', '#trailer-modal', function () {
        $("#trailer-modal .modal-content").html('');
    });

    /*---------------------------------------
    * search
    * --------------------------------------*/

    var timer = null;
    $("#search").on("keyup",function(){
        clearTimeout(timer);
        timer = setTimeout(getSearch, 350)
    });

    function getSearch() {
        $('.form-container .loader').show();
        var url = $('#search').data('url');
        var value = $('#search').val();
        $.ajax({
            type: 'get',
            url: url+'/getSearch/'+value,
            dataType: "text",

            success: function (data) {
                $(".search-results ul").html(data);
                $(".search-results").addClass('active');
                $('.form-container .loader').hide();
            }
        });
    }

    $('html').click(function() {
        $('.search-results').removeClass('active');
    });

    $('.search-results').click(function(event){
        event.stopPropagation();
    });

    /*---------------------------------------
    * add to collection
    * --------------------------------------*/

    $('.add_collection').on('click', function () {
        var type = $(this).data('type');
        var collection = $(this).data('collection');
        var id = $(this).data('id');
        var url = $(this).data('url');
        var $this = $(this);

        $.ajax({
            type: 'get',
            url: url+'/addCollection',
            data:{
                id:id,
                type:type,
                collection:collection
            },
            success: function (data) {
                if(data == 'success'){
                    $this.attr('class', 'active remove_collection');
                    if(collection == 'favourite'){
                        $this.attr('data-original-title', 'Remove Favourite');
                    }else {
                        $this.attr('data-original-title', 'Remove from Wishlist');
                    }
                }
            }
        });
    });

    $(document).on('click', '.remove_collection', function () {
        var id = $(this).data('id');
        var collection = $(this).data('collection');
        var url = $(this).data('url');
        var $this = $(this);

        $.ajax({
            type: 'get',
            url: url+'/removeCollection/'+id,
            success: function (data) {
                if(data == 'success'){
                    $this.attr('class', 'add_collection');
                    if(collection == 'favourite'){
                        $this.attr('data-original-title', 'Mark Favourite');
                    }else {
                        $this.attr('data-original-title', 'Add to Wishlist');
                    }
                }
            }
        });
    });

    $('.edit-toggle').on('click', function () {
       $('.edit-review').show();
    });

    $('.delete-review').on('click', function () {
       var id = $(this).data('id');
       var url = $(this).data('url');
        $.ajax({
            type: 'get',
            url: url+'/removeReview/'+id,
            success: function (data) {
                location.reload();
            }
        });
    });

    $('[data-toggle="tooltip"]').tooltip();
});