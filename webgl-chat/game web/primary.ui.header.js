if ($('#landing-top-bar').length > 0) {
    $(window).scroll(function() {
        if (($('#landing-top-bar').offset().top + parseFloat($('#landing-top-bar').css('height'))) <= $(this).scrollTop()) {
            $('#navbar-landing').slideDown();
        } else {
            $('#navbar-landing').slideUp();
        }
    });
}


$(document).on('click', '.notify-me',
        function() {
            $(this).button('adding');
            ga('send', {
                'hitType': 'event',
                'eventCategory': 'Button',
                'eventAction': 'Subscribe Notify',
                'eventLabel': $(this).closest('form').attr('id')
            });
            $.getJSON('?trigger=home&do=add&where=mailchimp&list=bac1639eb8' + '&' + $(this).closest('form').serialize()+ '&signature=' + window.btoa($("meta[property='sf:user']").attr("content")) , function(data) {
                SFCheckAlerts();
                if (data.content.length) {
                    SFReloadContent('#' + data.target, data.content, data.method, data.js);
                }
            });
            $(this).button('reset');
            return false;
        }
);
    
    $(document).on('submit', '.notify-me-form',
        function() {
            $(this).children('.notify-me').button('adding');
            ga('send', {
                'hitType': 'event',
                'eventCategory': 'Button',
                'eventAction': 'Subscribe Notify',
                'eventLabel': $(this).closest('form').attr('id')
            });
            $.getJSON('?trigger=home&do=add&where=mailchimp&list=bac1639eb8' + '&' + $(this).serialize()+ '&signature=' + window.btoa($("meta[property='sf:user']").attr("content")) , function(data) {
                SFCheckAlerts();
                if (data.content.length) {
                    SFReloadContent('#' + data.target, data.content, data.method, data.js);
                }
            });
            $(this).children('.notify-me').button('reset');
            return false;
        }
);
    
    $(document).on('click', '.subscribe-me',
        function() {
            $(this).button('adding');
            ga('send', {
                'hitType': 'event',
                'eventCategory': 'Button',
                'eventAction': 'Subscribe Press',
                'eventLabel': $(this).closest('form').attr('id')
            });
            $.getJSON('?trigger=home&do=add&where=mailchimp&list=d7fa0d41eb' + '&' + $(this).closest('form').serialize()+ '&signature=' + window.btoa($("meta[property='sf:user']").attr("content")), function(data) {
                SFCheckAlerts();
                if (data.content.length) {
                    SFReloadContent('#' + data.target, data.content, data.method, data.js);
                }
            });
            $(this).button('reset');
            return false;
        }
);