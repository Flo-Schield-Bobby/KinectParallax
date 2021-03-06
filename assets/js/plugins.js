// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// HELPERS / PLUGINS CONFIG //

// isArray check for vars from Mozilla Developer Network
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray
if(!Array.isArray) {
	Array.isArray = function (vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};
}

// Spin.js jQuery plugin
(function($) {
	$.fn.spin = function(opts, color) {
		if (arguments.length == 1 && opts == false) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data();

				if (data.spinner) {
					data.spinner.stop();
					delete data.spinner;
				}
			});
		}
		var presets = {
			"tiny": { lines: 8, length: 2, width: 2, radius: 3 },
			"small": { lines: 8, length: 4, width: 3, radius: 5 },
			"large": { lines: 10, length: 8, width: 4, radius: 8 }
		};
		if (Spinner) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data();
				
				if (data.spinner) {
					data.spinner.stop();
					delete data.spinner;
				}
				if (opts !== false) {
					if (typeof opts === "string") {
						if (opts in presets) {
							opts = presets[opts];
						} else {
							opts = {};
						}
						if (color) {
							opts.color = color;
						}
					}
					data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
				}
			});
		} else {
			throw "Spinner class not available.";
		}
	};
})(jQuery);

// requestAnimationFrame polyfill from Erik Möller - Opera developer
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
window.RAF = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
if (!window.RAF) {
	var lastTime = 0;
	window.RAF = function (callback, element) {
		var currTime = new Date().getTime(),
			timeToCall = Math.max(0, 16 - (currTime - lastTime)),
			id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
		return id;
	};
}
window.CRAF = window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame;
if (!window.CRAF) {
	window.CRAF = function(id) {
		clearTimeout(id);
	};
}

/**
 * jQuery.support.cssProperty
 * To verify that a CSS property is supported (or any of its browser-specific implementations)
 *
 * @param string p - css property name
 * [@param] bool rp - optional, if set to true, the css property name will be returned, instead of a boolean support indicator
 *
 * @Author: Axel Jack Fuchs (Cologne, Germany)
 * @Date: 08-29-2010 18:43
 */
$.support.cssProperty = (function() {
	function cssProperty(p, rp) {
		var b = document.body || document.documentElement,
		s = b.style;

		// No css support detected
		if(typeof s == 'undefined') { return false; }

		// Tests for standard prop
		if(typeof s[p] == 'string') { return rp ? p : true; }

		// Tests for vendor specific prop
		v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms', 'Icab'],
		p = p.charAt(0).toUpperCase() + p.substr(1);
		for(var i=0; i<v.length; i++) {
			if(typeof s[v[i] + p] == 'string') { return rp ? (v[i] + p) : true; }
		}
	}

	return cssProperty;
})();

// Old IE event binding
if (!document.addEventListener) {
	if (document.attachEvent) {
		document.addEventListener = document.attachEvent;
	}
}
if (!document.removeEventListener) {
	if (document.detachEvent) {
		document.removeEventListener = document.detachEvent;
	}
}