$(function() {
    // Test to be replaced
    var logo_file = "social_escaper.jpg";
    var socesc_txt_head = "You are browsing within __APP__ __PF__ application";
    var socesc_txt_body1 = "This could possibly cause unexpected issues.";
    var socesc_txt_body2 = "Please click the menu button (as show below) for navigating to your favorite browser.";
    var instruction_file = "instruction_{{APP}}_file.jpg";
    var secesc_txt_cont = "Continue using in __APP__";
    // CODE
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // TEST
    userAgent = "FBAN iPhone";
    // TEST
    function chkMobilePlatform() {
        var platform = "";
        if (userAgent.indexOf("iPhone") > -1) {
            platform = "iPhone";
        } else if (userAgent.indexOf("Android") > -1) {
            platform = "Android";
        }
        return platform;
    }
    function chkSocialApp() {
        var app = "";
        if ((userAgent.indexOf("FBAN") > -1) || (userAgent.indexOf("FBAV") > -1)) {
            app = "Facebook";
        } else if (userAgent.indexOf("Line") > -1) {
            app = "Line";
        }
        return app;
    }
    function getEscCookie() {
        return document.cookie;
    }
    function setEscCookie() {
        document.cookie = "socesc=dontescape;path=/";
    }
    var socialApp = chkSocialApp();
    if ("socesc=dontescape" !== getEscCookie() && "" !== socialApp) {
        var platform = chkMobilePlatform() || "mobile";
        socesc_txt_head = socesc_txt_head.replace("__APP__", socialApp).replace("__PF__", platform);
        secesc_txt_cont = secesc_txt_cont.replace("__APP__", socialApp);
        instruction_file = instruction_file.replace("{{APP}}", socialApp);
        $("body").append('<div id="socesc_wrapper">'+
                    '<div id="socesc_right_btn"><a id="socesc_close_btn">&times;</a></div>'+
                    '<img class="socesc-img" src="'+logo_file+'" />'+
                    '<h1>'+socesc_txt_head+'</h1>'+
                    '<p>'+socesc_txt_body1+'</p>'+
                    '<p>'+socesc_txt_body2+'</p>'+
                    '<img class="socesc_instruction" src="'+instruction_file+'" />'+
                    '<p><a id="socesc_close_txt">'+secesc_txt_cont+'</a></p>'+
                '</div>');
    }
    $("#socesc_close_txt, #socesc_close_btn").click(function (e) {
	e.preventDefault();
        setEscCookie();
	$("#socesc_wrapper").slideUp();
    });
});