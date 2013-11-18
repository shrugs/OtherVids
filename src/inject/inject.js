chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

        var containerTemplate = '<div class="othervids-container">'+
            '<div class="othervids-header">'+
            'OtherVids'+
            '<div id="othervids-indicator" class="othervids-can-expand"></div>'+
            '</div>'+
            '<div class="othervids-content">'+
            '</div>'+
            '</div>';

        var slider = _.template(
                '<div class="feed-item-dismissable post-item ">'+
                    // '<div class="feed-author-bubble-container">'+
                    //      '<a href="/user/RoosterTeeth" class="feed-author-bubble yt-uix-sessionlink g-hovercard"> <span class="feed-item-author "> <span class="video-thumb  yt-thumb yt-thumb-28"> <span class="yt-thumb-square"> <span class="yt-thumb-clip"><img src="https://lh6.googleusercontent.com/-hddEYyXVeZM/AAAAAAAAAAI/AAAAAAAAAAA/ghwEL1-FHdE/s28-c-k-no/photo.jpg" alt="Rooster Teeth" width="28" /><span class="vertical-align"></span></span></span></span></span></a>'+
                    // '</div>'+
                    '<div class="feed-item-main">'+
                        '<div class="feed-item-header  vve-check">'+
                             '<span class="feed-item-actions-line">Recent videos from <span class="feed-item-owner"><a href="/user/RoosterTeeth?feature=g-high-crv" class="g-hovercard yt-uix-sessionlink yt-user-name spf-nolink">Rooster Teeth</a> <span class="yt-user-name-icon-verified"><img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-tooltip yt-channel-title-icon-verified" alt="" /></span></span></span>'+
                        '</div>'+
                        '<div class="feed-item-main-content">'+
                            '<div class="shelf-wrapper clearfix">'+
                                '<div class="compact-shelf shelf-item yt-uix-shelfslider yt-uix-shelfslider-at-head vve-check  feeds-mode yt-uix-tdl">'+
                                    '<div class="yt-uix-shelfslider-body context-data-container">'+
                                        '<ul id="othervids-list" class="yt-uix-shelfslider-list">'+
                                        '</ul>'+
                                    '</div>'+
                                    '<button class="yt-uix-shelfslider-prev yt-uix-button yt-uix-button-shelf-slider-pager yt-uix-button-size-default" type="button" id="othervids-prev">'+
                                        '<span class="yt-uix-button-content"><img class="yt-uix-shelfslider-prev-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Previous" /></span>'+
                                    '</button>'+
                                    '<button class="yt-uix-shelfslider-next yt-uix-button yt-uix-button-shelf-slider-pager yt-uix-button-size-default" type="button">'+
                                        '<span class="yt-uix-button-content"><img class="yt-uix-shelfslider-next-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Next" /></span>'+
                                    '</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );


        var itemTemplate = _.template(
                            '<li class="channels-content-item yt-shelf-grid-item yt-uix-shelfslider-item ">'+
                                '<div class="yt-lockup clearfix  yt-lockup-video yt-lockup-grid vve-check context-data-item">'+
                                    '<div class="yt-lockup-thumbnail">'+
                                         '<a href="/watch?v=rUSVNRE8MCo" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink yt-fluid-thumb-link contains-addto ">'+
                                            '<span class="video-thumb  yt-thumb yt-thumb-175 yt-thumb-fluid"> <span class="yt-thumb-default">'+
                                            '<span class="yt-thumb-clip">'+
                                            '<img src="//i1.ytimg.com/vi/rUSVNRE8MCo/mqdefault.jpg" alt="Thumbnail" width="175" />'+
                                            '<span class="vertical-align"></span></span></span></span></a>'+
                                        '<button class="addto-button video-actions spf-nolink hide-until-delayloaded addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-size-small yt-uix-tooltip" type="button">'+
                                            '<span class="yt-uix-button-content"><img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later" /></span>'+
                                        '</button>'+
                                    '</div>'+
                                    '<div class="yt-lockup-content">'+
                                        '<h3 class="yt-lockup-title">'+
                                             '<a class="yt-uix-sessionlink" title="Achievement Hunter Presents: PS4 Unboxing" href="/watch?v=rUSVNRE8MCo"><span class="yt-ui-ellipsis-wrapper">Achievement Hunter Presents: PS4 Unboxing</span></a>'+
                                        '</h3>'+
                                        '<div class="yt-lockup-meta">'+
                                            '<ul class="yt-lockup-meta-info">'+
                                                '<li>'+
                                                    'by <a href="/user/RoosterTeeth?feature=g-high-crv" class="g-hovercard yt-uix-sessionlink yt-user-name ">Rooster Teeth</a> <span class="yt-user-name-icon-verified"><img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-tooltip yt-channel-title-icon-verified" alt="" /></span>'+
                                                '</li>'+
                                                '<li>'+
                                                    '460,239 views'+
                                                '</li>'+
                                                '<li class="yt-lockup-deemphasized-text">'+
                                                    '2 days ago'+
                                                '</li>'+
                                            '</ul>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</li>');


    // LOAD LATEST VIDEOS HERE

        $.ajax({
            method: "GET",
            dataType: "JSON",
            data: {

            },
            url: "https://www.googleapis.com/youtube/v3/search",
            success: function(data) {

            }
        });


        var vidCount = 23;
        var totalWidth = vidCount * 175;
        var totalPages = Math.floor(vidCount/5);
        var currentPage = 0;
        var pageOffset = 175*5.22;



        $(containerTemplate).insertBefore("#playlist");
        $(".othervids-content").html(slider({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        $("#othervids-list").append(itemTemplate({}));
        // 23 * 175

        $(".othervids-header").on("click", function() {
            // expand the othervids-content div
            var contentDiv = $(".othervids-content");
            if (contentDiv.hasClass("expanded")) {
                // collapse
                contentDiv.removeClass("expanded");
                contentDiv.animate({height: "0"}, 400);
            } else {
                contentDiv.addClass("expanded");
                contentDiv.animate({height: "210px"}, 400);
            }
        });

        $(".yt-uix-shelfslider-next").on('click', function(e) {
            e.preventDefault();
            // if we're at the last page, wrap around to the beginning
            if (currentPage == totalPages) {
                $("#othervids-list").animate({marginLeft: "0"});
                currentPage = 0;
                $("#othervids-prev").css("visibility", "hidden");
            } else {
                currentPage += 1;
                $("#othervids-list").animate({marginLeft: "-" + (currentPage*pageOffset) + "px"});
                if (currentPage !== 0) {
                    // hide button
                    $("#othervids-prev").css("visibility", "visible");
                    $("#othervids-prev").css("opacity", "1");
                }
            }

        });

        $(".yt-uix-shelfslider-prev").on('click', function(e) {
            e.preventDefault();
            if (currentPage === 0) {
                // beginning page, this button shouldn't have even been clicked cause it should be hidden, but whatever
            } else {
                currentPage -= 1;
                $("#othervids-list").animate({marginLeft: "-" + (currentPage*pageOffset) + "px"});
                if (currentPage === 0) {
                    // hide button
                    $("#othervids-prev").css("visibility", "hidden");
                }
            }
        });

	}
	}, 10);
});