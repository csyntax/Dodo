(function($) {
    var ua = navigator.userAgent.toLowerCase(),
        match,
        rbrowsers = [
            /(chrome)[ \/]([\w.]+)/,
            /(safari)[ \/]([\w.]+)/,
            /(opera)(?:.*version)?[ \/]([\w.]+)/,
            /(msie) ([\w.]+)/,
            /(mozilla)(?:.*? rv:([\w.]+))?/
        ],
        i = rbrowsers.length;
    $.browser = {};
    while ( i-- ) {
        if ( (match = rbrowsers[i].exec( ua )) && match[1] ) {
            $.browser[ match[1] ] = true;
            $.browser.version = match[2] || "0";
            break;
        }
    }
})( window.jQuery || window );
(function($) {
    var ua = navigator.userAgent.toLowerCase(),
        match,
        rplatform = [
            /(ip\w+).*?os ([\w_]+)/,
            /(android)[ \/]([\w.]+)/,
            /(blackberry)(?:\d*?\/|.*?version\/)([\w.]+)/,
            /(windows phone)( os)? ([\w.]+)/,
            /(symbian)(?:os\/([\w.]+))?/
        ],
        i = rplatform.length;

    $.platform = {};
    while ( i-- ) {
        if ( (match = rplatform[i].exec( ua )) && match[1] ) {
            $.platform[ match[1].replace(" p", "P") ] = true;
            $.platform.version = match[2].split("_").join(".") || "0";
            break;
        }
    }
})( window.jQuery || window );