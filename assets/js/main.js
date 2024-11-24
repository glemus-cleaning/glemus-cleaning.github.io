/*
	Twenty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

!(function (e) {
  function t(n) {
    if (r[n]) return r[n].exports;
    var i = (r[n] = { i: n, l: !1, exports: {} });
    return e[n].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
  }
  var r = {};
  t.m = e;
  t.c = r;
  t.i = function (e) {
    return e;
  };
  t.d = function (e, r, n) {
    t.o(e, r) ||
      Object.defineProperty(e, r, { configurable: !1, enumerable: !0, get: n });
  };
  t.n = function (e) {
    var r =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    return t.d(r, "a", r), r;
  };
  t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  };
  t.p = "";
  t((t.s = 8));
})({
  4: function (e, t, r) {
    "use strict";

    // Add error-safe JSON.parse
    function safeJSONParse(data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        return null; // Return null or fallback value
      }
    }

    function n(e) {
      var t = document.querySelector("iframe.yelp-ga-tracker"),
        r = {
          hitType: "pageview",
          embedLocation: window.location.host,
          embedLocationPath: window.location.pathname,
          embedLocationQuery: window.location.search,
        },
        n = window.JSON.stringify(r);
      t.contentWindow.postMessage(n, e + "/ga");
    }

    function i(e, t) {
      // Use safe JSON parsing
      var r = safeJSONParse(e.data);
      if (!r) return; // Skip if JSON is invalid

      if ("gaInit" === r.action) {
        return void n(t);
      }

      var i = document.querySelectorAll(
          'iframe.yelp-review[data-review-id="' + r.reviewID + '"]'
        ),
        o = document.querySelector("iframe.yelp-ga-tracker");
      for (var a = 0; a < i.length; a++) {
        var d = i[a];
        if (d.contentWindow === e.source) {
          if (((d.style.height = r.reviewHeight + "px"), "resize" === r.action))
            return;
          if (
            (d.parentNode &&
              d.nextSibling &&
              d.parentNode.removeChild(d.nextSibling),
            o)
          ) {
            var c = { hitType: "event", reviewID: r.reviewID },
              l = window.JSON.stringify(c);
            o.contentWindow.postMessage(l, t + "/ga");
          }
          return;
        }
      }
    }

    function o(e, t, r) {
      var n = t + "/review/" + r + "?embed_location=" + window.location.host,
        i = document.createElement("iframe");
      i.setAttribute("data-review-id", r);
      i.classList.add("yelp-review");
      i.src = n;
      i.scrolling = "no";
      i.style.display = "block";
      i.style.maxWidth = "700px";
      i.style.minWidth = "320px";
      i.style.width = "100%";
      i.style.height = "0";
      i.style.border = "0";
      e.parentNode && e.parentNode.insertBefore(i, e);
    }

    function a() {
      if (document.querySelectorAll && window.postMessage && window.JSON) {
        var e = document.querySelectorAll("span.yelp-review[data-review-id]"),
          t = document.querySelector("iframe.yelp-ga-tracker");
        if (e.length) {
          if (!t) {
            var r =
              "https://" +
              String(e[0].getAttribute("data-hostname")) +
              "/embed";
            // Use safe message handler
            window.addEventListener(
              "message",
              function (e) {
                try {
                  i(e, r);
                } catch (error) {
                  return;
                }
              },
              !1
            );

            t = document.createElement("iframe");
            t.classList.add("yelp-ga-tracker");
            t.src = r + "/ga";
            t.style.display = "none";
            document.body && document.body.appendChild(t);
          }
          for (var n = 0; n < e.length; n++) {
            var a = String(e[n].getAttribute("data-review-id")),
              d = String(e[n].getAttribute("data-hostname")),
              c = "https://" + d + "/embed";
            e[n].removeAttribute("data-review-id");
            o(e[n], c, a);
          }
        }
      }
    }
    t.a = a;
  },
  8: function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var n = r(4);
    r.i(n.a)();
  },
});

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $header = $("#header"),
    $banner = $("#banner");

  // Breakpoints.
  breakpoints({
    wide: ["1281px", "1680px"],
    normal: ["981px", "1280px"],
    narrow: ["841px", "980px"],
    narrower: ["737px", "840px"],
    mobile: [null, "736px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Scrolly.
  $(".scrolly").scrolly({
    speed: 1000,
    offset: function () {
      return $header.height() + 10;
    },
  });

  // Dropdowns.
  $("#nav > ul").dropotron({
    mode: "fade",
    noOpenerFade: true,
    expandMode: browser.mobile ? "click" : "hover",
  });

  // Nav Panel.

  // Button.
  $(
    '<div id="navButton">' +
      '<a href="#navPanel" class="toggle"></a>' +
      "</div>"
  ).appendTo($body);

  // Panel.
  $('<div id="navPanel">' + "<nav>" + $("#nav").navList() + "</nav>" + "</div>")
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "left",
      target: $body,
      visibleClass: "navPanel-visible",
    });

  // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
  if (browser.os == "wp" && browser.osVersion < 10)
    $("#navButton, #navPanel, #page-wrapper").css("transition", "none");

  // Header.
  if (!browser.mobile && $header.hasClass("alt") && $banner.length > 0) {
    $window.on("load", function () {
      $banner.scrollex({
        bottom: $header.outerHeight(),
        terminate: function () {
          $header.removeClass("alt");
        },
        enter: function () {
          $header.addClass("alt reveal");
        },
        leave: function () {
          $header.removeClass("alt");
        },
      });
    });
  }
})(jQuery);
