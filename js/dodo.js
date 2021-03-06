/*
	Dodo v1.1.0
	Copyright 2015 Ivan Cvetomirov Ivanov
*/
if (typeof jQuery == "undefined") {
	throw new Error("Dodo requires jQuery")
};
(function($) {
		var userAgent = navigator.userAgent.toLowerCase();

    var	browsers = [
        /(chrome)[ \/]([\w.]+)/,
        /(safari)[ \/]([\w.]+)/,
        /(opera)(?:.*version)?[ \/]([\w.]+)/,
        /(msie) ([\w.]+)/,
        /(mozilla)(?:.*? rv:([\w.]+))?/,
    ];
    var b = browsers.length;

		$.browser = {} || 0;

		while (b--) {
			if ( (match = browsers[b].exec( userAgent )) && match[1] ) {
				$.browser[ match[1] ] = true;
				$.browser.version = match[2] || 0;
				break;
			}
		}

		function Dodo() {
			this._curHash = "";
			this._callback = function (hash) { };
		};

		$.extend(Dodo.prototype, {
			init: function(callback) {
				this._curHash = location.hash;
				this._callback = callback;

				if($.browser.msie) {
					if (this._curHash == "") {
						this._curHash = "#!";
					}

					$("body").prepend('<iframe id="Dodo" style="display: none;"></iframe>');

					var iframe = $("#Dodo")[0].contentWindow.document;

					iframe.open();
					iframe.close();
					iframe.location.hash = this._curHash;
				} else if ($.browser.safari) {
					this._DodoBackStack = [];
					this._DodoBackStack.length = Dodo.length;
					this._DodoForwardStack = [];
					this._isFirst = true;
					this._dontCheck = false;
				}

				this._callback(this._curHash.replace(/^#/, ''));
				setInterval(this._check, 100);
			},
			add: function(hash) {
				this._DodoBackStack.push(hash);
				this._DodoForwardStack.length = 0;
				this._isFirst = true;
			},
			_check: function() {
				if($.browser.msie) {
					var iDodo = $("#Dodo")[0];
					var iframe = iDodo.contentDocument || iDodo.contentWindow.document;
					var current_hash = iframe.location.hash;

					if(current_hash != $.Dodo._curHash) {
						location.hash = current_hash;

						$.Dodo._curHash = current_hash;
						$.Dodo._callback(current_hash.replace(/^#/, ''));
					}
				} else if ($.browser.safari) {
					if (!$.Dodo._dontCheck) {
						var DodoDelta = Dodo.length - $.Dodo._DodoBackStack.length;

						if (DodoDelta) {
							$.Dodo._isFirst = false;
							if (DodoDelta < 0) {
								for (var i = 0; i < Math.abs(DodoDelta); i++) $.Dodo._DodoForwardStack.unshift($.Dodo._DodoBackStack.pop());
							} else {
								for (var i = 0; i < DodoDelta; i++) $.Dodo._DodoBackStack.push($.Dodo._DodoForwardStack.shift());
							}

							var cachedHash = $.Dodo._DodoBackStack[$.Dodo._DodoBackStack.length - 1];

							if (cachedHash != undefined) {
								$.Dodo._curHash = location.hash;
								$.Dodo._callback(cachedHash);
							}
						} else if ($.Dodo._DodoBackStack[$.Dodo._DodoBackStack.length - 1] == undefined && !$.Dodo._isFirst) {
							if (document.URL.indexOf('#') >= 0) {
								$.Dodo._callback(document.URL.split('#')[1]);
							} else {
								$.Dodo._callback('');
							}
							$.Dodo._isFirst = true;
						}
					}
				} else {
					var current_hash = location.hash;

					if(current_hash != $.Dodo._curHash) {
						$.Dodo._curHash = current_hash;
						$.Dodo._callback(current_hash.replace(/^#/, ''));
					}
				}
			},
			load: function(hash) {
				var newhash;

				if ($.browser.safari) {
					newhash = hash;
				} else {
					newhash = '#!' + hash;
					location.hash = newhash;
				}

				this._curHash = newhash;

				if ($.browser.msie) {
					var iDodo = $("#Dodo")[0];
					var iframe = iDodo.contentWindow.document;

					iframe.open();
					iframe.close();
					iframe.location.hash = newhash;
					this._callback(hash);
				} else if ($.browser.safari) {
					this._dontCheck = true;
					this.add(hash);

					var fn = function() {
						$.Dodo._dontCheck = false;
					};

					window.setTimeout(fn, 200);
					this._callback(hash);
					location.hash = newhash;
				} else {
			  		this._callback(hash);
				}
			}
		});

		$(document).ready(function() {
			$.Dodo = new Dodo();
		});
})(jQuery);
