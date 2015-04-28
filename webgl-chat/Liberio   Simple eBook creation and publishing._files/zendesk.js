var c = document.createElement('link');
c.rel = "stylesheet";
c.type = "text/css";
c.href = "//asset.zendesk.com/external/zenbox/v2.4/zenbox.css";
var h = document.getElementsByTagName('head')[0];
h.appendChild(c);
$.ajax({
    url: "//asset.zendesk.com/external/zenbox/v2.4/zenbox.js",
    dataType: "script",
    cache: true,
    success: function() {
        Zenbox.init({
            dropboxID: "20220673",
            url: "https://liberio.zendesk.com",
            tabTooltip: "Ask us",
            tabImageURL: "https://assets.zendesk.com/external/zenbox/images/tab_ask_us_right.png",
            tabColor: "black",
            tabPosition: "Right",
            hide_tab: "true"
        });
    }
});