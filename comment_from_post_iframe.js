var n = this || self,
    p = function(a) {
        var b = typeof a;
        b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
        return "array" == b || "object" == b && "number" == typeof a.length
    };


var q = Array.prototype.indexOf ? function(a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (typeof a === "string") return typeof b !== "string" || 1 != b.length ? -1 : a.indexOf(b, c);
        for (; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    },
    r = Array.prototype.forEach ? function(a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = typeof a === "string" ? a.split("") : a, g = 0; g < d; g++) g in e && b.call(c, e[g], g, a)
    };

function t(a) {
    return Array.prototype.concat.apply([], arguments)
};
var u;
a: {
    var v = n.navigator;
    if (v) {
        var w = v.userAgent;
        if (w) {
            u = w;
            break a
        }
    }
    u = ""
}
var x = function(a) {
    return -1 != u.indexOf(a)
};
var y = x("Trident") || x("MSIE");

var z = function(a, b) {
        return typeof b === "string" ? a.getElementById(b) : b
    },

    A = function(a, b, c, d) {
        //a는 돔 객체
        a = d || a;
        var e = b && "*" != b ? String(b).toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (e || c))
            return a.querySelectorAll(e + (c ? "." + c : ""));

        if (c && a.getElementsByClassName) {
            b = a.getElementsByClassName(c);
            if (e) {
                a = {};
                for (var g = d = 0, h; h = b[g]; g++) e == h.nodeName && (a[d++] = h);
                a.length = d;
                return a
            }
            return b
        }
        b = a.getElementsByTagName(e || "*");

        if (c) {
            a = {};
            for (g = d = 0; h = b[g]; g++) {
                e = h.className;
                var m;
                if (m = typeof e.split == "function") m = 0 <= q(e.split(/\s+/),
                    c);
                m && (a[d++] = h)
            }
            a.length = d;

            return a
        }
        return b
    };

var B = function(a) {
    this.M = a
};

B.prototype.serialize = function(a) {
    var b = [];
    this.P(a, b);
    return b.join("")
};
B.prototype.P = function(a, b) {
    if (null == a) b.push("null");
    else {
        if ("object" == typeof a) {
            if (Array.isArray(a)) {
                this.serializeArray(a, b);
                return
            }
            if (a instanceof String || a instanceof Number || a instanceof Boolean) a = a.valueOf();
            else {
                this.la(a, b);
                return
            }
        }
        switch (typeof a) {
            case "string":
                this.ba(a, b);
                break;
            case "number":
                this.ka(a, b);
                break;
            case "boolean":
                b.push(String(a));
                break;
            case "function":
                b.push("null");
                break;
            default:
                throw Error("Unknown type: " + typeof a);
        }
    }
};
var C = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    },
    D = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
B.prototype.ba = function(a, b) {
    b.push('"', a.replace(D, function(c) {
        var d = C[c];
        d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1), C[c] = d);
        return d
    }), '"')
};
B.prototype.ka = function(a, b) {
    b.push(isFinite(a) && !isNaN(a) ? String(a) : "null")
};
B.prototype.serializeArray = function(a, b) {
    var c = a.length;
    b.push("[");
    for (var d = "", e = 0; e < c; e++) b.push(d), d = a[e], this.P(this.M ? this.M.call(a, String(e), d) : d, b), d = ",";
    b.push("]")
};
B.prototype.la = function(a, b) {
    b.push("{");
    var c = "",
        d;
    for (d in a)
        if (Object.prototype.hasOwnProperty.call(a, d)) {
            var e = a[d];
            typeof e != "function" && (b.push(c), this.ba(d, b), b.push(":"), this.P(this.M ? this.M.call(a, d, e) : e, b), c = ",")
        } b.push("}")
};
var E = "StopIteration" in n ? n.StopIteration : {
        message: "StopIteration",
        stack: ""
    },
    F = function() {};
F.prototype.next = function() {
    throw E;
};
F.prototype.ca = function() {
    return this
};
var G = function(a, b) {
    this.m = {};
    this.i = [];
    this.L = this.g = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else a && this.addAll(a)
};
var l = G.prototype;
l.Y = function() {
    return this.g
};
l.s = function() {
    this.G();
    for (var a = [], b = 0; b < this.i.length; b++) a.push(this.m[this.i[b]]);
    return a
};
l.A = function() {
    this.G();
    return this.i.concat()
};
l.H = function(a) {
    return H(this.m, a)
};
l.equals = function(a, b) {
    if (this === a) return !0;
    if (this.g != a.Y()) return !1;
    b = b || I;
    this.G();
    for (var c, d = 0; c = this.i[d]; d++)
        if (!b(this.get(c), a.get(c))) return !1;
    return !0
};
var I = function(a, b) {
    return a === b
};
l = G.prototype;
l.isEmpty = function() {
    return 0 == this.g
};
l.clear = function() {
    this.m = {};
    this.L = this.g = this.i.length = 0
};
l.remove = function(a) {
    return H(this.m, a) ? (delete this.m[a], this.g--, this.L++, this.i.length > 2 * this.g && this.G(), !0) : !1
};
l.G = function() {
    if (this.g != this.i.length) {
        for (var a = 0, b = 0; a < this.i.length;) {
            var c = this.i[a];
            H(this.m, c) && (this.i[b++] = c);
            a++
        }
        this.i.length = b
    }
    if (this.g != this.i.length) {
        var d = {};
        for (b = a = 0; a < this.i.length;) c = this.i[a], H(d, c) || (this.i[b++] = c, d[c] = 1), a++;
        this.i.length = b
    }
};
l.get = function(a, b) {
    return H(this.m, a) ? this.m[a] : b
};
l.set = function(a, b) {
    H(this.m, a) || (this.g++, this.i.push(a), this.L++);
    this.m[a] = b
};
l.addAll = function(a) {
    if (a instanceof G)
        for (var b = a.A(), c = 0; c < b.length; c++) this.set(b[c], a.get(b[c]));
    else
        for (b in a) this.set(b, a[b])
};
l.forEach = function(a, b) {
    for (var c = this.A(), d = 0; d < c.length; d++) {
        var e = c[d],
            g = this.get(e);
        a.call(b, g, e, this)
    }
};
l.clone = function() {
    return new G(this)
};
l.ca = function(a) {
    this.G();
    var b = 0,
        c = this.L,
        d = this,
        e = new F;
    e.next = function() {
        if (c != d.L) throw Error("The map has changed since the iterator was created");
        if (b >= d.i.length) throw E;
        var g = d.i[b++];
        return a ? g : d.m[g]
    };
    return e
};
var H = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
var J = function(a) {
        if (a.s && typeof a.s == "function") return a.s();
        if (typeof a === "string") return a.split("");
        if (p(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a) b[c++] = a[d];
        return b
    },
    K = function(a, b, c) {
        if (a.forEach && typeof a.forEach == "function") a.forEach(b, c);
        else if (p(a) || typeof a === "string") r(a, b, c);
        else {
            if (a.A && typeof a.A == "function") var d = a.A();
            else if (a.s && typeof a.s == "function") d = void 0;
            else if (p(a) || typeof a === "string") {
                d = [];
                for (var e = a.length, g = 0; g < e; g++) d.push(g)
            } else
                for (g in d = [], e = 0, a) d[e++] = g;
            e = J(a);
            g = e.length;
            for (var h = 0; h < g; h++) b.call(c, e[h], d && d[h], a)
        }
    };
var L = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
    M = function(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("="),
                    e = null;
                if (0 <= d) {
                    var g = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else g = a[c];
                b(g, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    };
var N = function(a, b) {
    this.I = this.K = this.B = "";
    this.F = null;
    this.J = this.O = "";
    this.j = this.ja = !1;
    var c;
    a instanceof N ? (this.j = void 0 !== b ? b : a.j, this.W(a.B), this.X(a.K), this.R(a.I), this.U(a.F), this.setPath(a.getPath()), this.V(a.l.clone()), this.S(a.J)) : a && (c = String(a).match(L)) ? (this.j = !!b, this.W(c[1] || "", !0), this.X(c[2] || "", !0), this.R(c[3] || "", !0), this.U(c[4]), this.setPath(c[5] || "", !0), this.V(c[6] || "", !0), this.S(c[7] || "", !0)) : (this.j = !!b, this.l = new O(null, this.j))
};
l = N.prototype;
l.toString = function() {
    var a = [],
        b = this.B;
    b && a.push(P(b, Q, !0), ":");
    var c = this.I;
    if (c || "file" == b) a.push("//"), (b = this.K) && a.push(P(b, Q, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.F, null != c && a.push(":", String(c));
    if (c = this.getPath()) this.N() && "/" != c.charAt(0) && a.push("/"), a.push(P(c, "/" == c.charAt(0) ? R : aa, !0));
    (c = this.Z()) && a.push("?", c);
    (c = this.J) && a.push("#", P(c, ba));
    return a.join("")
};
l.resolve = function(a) {
    var b = this.clone(),
        c = a.ha();
    c ? b.W(a.B) : c = a.ia();
    c ? b.X(a.K) : c = a.N();
    c ? b.R(a.I) : c = a.fa();
    var d = a.getPath();
    if (c) b.U(a.F);
    else if (c = a.aa()) {
        if ("/" != d.charAt(0))
            if (this.N() && !this.aa()) d = "/" + d;
            else {
                var e = b.getPath().lastIndexOf("/"); - 1 != e && (d = b.getPath().substr(0, e + 1) + d)
            } e = d;
        if (".." == e || "." == e) d = "";
        else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
            d = 0 == e.lastIndexOf("/", 0);
            e = e.split("/");
            for (var g = [], h = 0; h < e.length;) {
                var m = e[h++];
                "." == m ? d && h == e.length && g.push("") : ".." == m ? ((1 < g.length ||
                    1 == g.length && "" != g[0]) && g.pop(), d && h == e.length && g.push("")) : (g.push(m), d = !0)
            }
            d = g.join("/")
        } else d = e
    }
    c ? b.setPath(d) : c = a.ga();
    c ? b.V(a.l.clone()) : c = a.ea();
    c && b.S(a.J);

    return b
};

l.clone = function() {
    return new N(this)
};
l.W = function(a, b) {
    this.u();
    if (this.B = b ? S(a, !0) : a) this.B = this.B.replace(/:$/, "");
    return this
};
l.ha = function() {
    return !!this.B
};
l.X = function(a, b) {
    this.u();
    this.K = b ? S(a) : a;
    return this
};
l.ia = function() {
    return !!this.K
};
l.R = function(a, b) {
    this.u();
    this.I = b ? S(a, !0) : a;
    return this
};
l.N = function() {
    return !!this.I
};
l.U = function(a) {
    this.u();
    if (a) {
        a = Number(a);
        if (isNaN(a) || 0 > a) throw Error("Bad port number " + a);
        this.F = a
    } else this.F = null;
    return this
};
l.fa = function() {
    return null != this.F
};
l.getPath = function() {
    return this.O
};
l.setPath = function(a, b) {
    this.u();
    this.O = b ? S(a, !0) : a;
    return this
};
l.aa = function() {
    return !!this.O
};
l.ga = function() {
    return "" !== this.l.toString()
};
l.V = function(a, b) {
    this.u();
    a instanceof O ? (this.l = a, this.l.T(this.j)) : (b || (a = P(a, ca)), this.l = new O(a, this.j));
    return this
};
l.Z = function() {
    return this.l.toString()
};
l.getQuery = function() {
    return this.Z()
};
l.ma = function(a, b) {
    this.u();
    this.l.set(a, b);
    return this
};
l.da = function(a) {
    return this.l.get(a)
};
l.S = function(a, b) {
    this.u();
    this.J = b ? S(a) : a;
    return this
};
l.ea = function() {
    return !!this.J
};
l.removeParameter = function(a) {
    this.u();
    this.l.remove(a);
    return this
};
l.u = function() {
    if (this.ja) throw Error("Tried to modify a read-only Uri");
};
l.T = function(a) {
    this.j = a;
    this.l && this.l.T(a);
    return this
};
var S = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    },
    P = function(a, b, c) {
        return typeof a === "string" ? (a = encodeURI(a).replace(b, da), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    },
    da = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    },
    Q = /[#\/\?@]/g,
    aa = /[#\?:]/g,
    R = /[#\?]/g,
    ca = /[#\?@]/g,
    ba = /#/g,
    O = function(a, b) {
        this.g = this.h = null;
        this.v = a || null;
        this.j = !!b
    };
l = O.prototype;
l.o = function() {
    if (!this.h && (this.h = new G, this.g = 0, this.v)) {
        var a = this;
        M(this.v, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        })
    }
};
l.Y = function() {
    this.o();
    return this.g
};
l.add = function(a, b) {
    this.o();
    this.D();
    a = this.C(a);
    var c = this.h.get(a);
    c || this.h.set(a, c = []);
    c.push(b);
    this.g += 1;
    return this
};
l.remove = function(a) {
    this.o();
    a = this.C(a);
    return this.h.H(a) ? (this.D(), this.g -= this.h.get(a).length, this.h.remove(a)) : !1
};
l.clear = function() {
    this.D();
    this.h = null;
    this.g = 0
};
l.isEmpty = function() {
    this.o();
    return 0 == this.g
};
l.H = function(a) {
    this.o();
    a = this.C(a);
    return this.h.H(a)
};
l.forEach = function(a, b) {
    this.o();
    this.h.forEach(function(c, d) {
        r(c, function(e) {
            a.call(b, e, d, this)
        }, this)
    }, this)
};
l.A = function() {
    this.o();
    for (var a = this.h.s(), b = this.h.A(), c = [], d = 0; d < b.length; d++)
        for (var e = a[d], g = 0; g < e.length; g++) c.push(b[d]);
    return c
};
l.s = function(a) {
    this.o();
    var b = [];
    if (typeof a === "string") this.H(a) && (b = t(b, this.h.get(this.C(a))));
    else {
        a = this.h.s();
        for (var c = 0; c < a.length; c++) b = t(b, a[c])
    }
    return b
};
l.set = function(a, b) {
    this.o();
    this.D();
    a = this.C(a);
    this.H(a) && (this.g -= this.h.get(a).length);
    this.h.set(a, [b]);
    this.g += 1;
    return this
};
l.get = function(a, b) {
    if (!a) return b;
    a = this.s(a);
    return 0 < a.length ? String(a[0]) : b
};
l.setValues = function(a, b) {
    this.remove(a);
    if (0 < b.length) {
        this.D();
        var c = this.h,
            d = c.set;
        a = this.C(a);
        var e = b.length;
        if (0 < e) {
            for (var g = Array(e), h = 0; h < e; h++) g[h] = b[h];
            e = g
        } else e = [];
        d.call(c, a, e);
        this.g += b.length
    }
};
l.toString = function() {
    if (this.v) return this.v;
    if (!this.h) return "";
    for (var a = [], b = this.h.A(), c = 0; c < b.length; c++) {
        var d = b[c],
            e = encodeURIComponent(String(d));
        d = this.s(d);
        for (var g = 0; g < d.length; g++) {
            var h = e;
            "" !== d[g] && (h += "=" + encodeURIComponent(String(d[g])));
            a.push(h)
        }
    }
    return this.v = a.join("&")
};
l.D = function() {
    this.v = null
};
l.clone = function() {
    var a = new O;
    a.v = this.v;
    this.h && (a.h = this.h.clone(), a.g = this.g);
    return a
};
l.C = function(a) {
    a = String(a);
    this.j && (a = a.toLowerCase());
    return a
};
l.T = function(a) {
    a && !this.j && (this.o(), this.D(), this.h.forEach(function(b, c) {
        var d = c.toLowerCase();
        c != d && (this.remove(c), this.setValues(d, b))
    }, this));
    this.j = a
};
l.extend = function(a) {
    for (var b = 0; b < arguments.length; b++) K(arguments[b], function(c, d) {
        this.add(d, c)
    }, this)
};

function T(a, b, c) {
    a: {
        var d = 9 == b.nodeType ? b : b.ownerDocument || b.document;
        if (d.defaultView && d.defaultView.getComputedStyle && (d = d.defaultView.getComputedStyle(b, null))) {
            d = d[a] || d.getPropertyValue(a) || "";
            break a
        }
        d = ""
    }
    d = d || (b.currentStyle ? b.currentStyle[a] : null) || b.style && b.style[a];
    return null == d || "inherit" == d || "transparent" == d || "rgba(0, 0, 0, 0)" == d ? b != (9 == b.nodeType ? b : b.ownerDocument || b.document).body && b.parentNode ? U(a, b.parentNode) : c : d
}

function U(a, b) {
    return T(a, b, "rgb(0, 0, 0)")
}

function ea() {
    for (var a = A(document, "IFRAME", "blogger-iframe-colorize", void 0), b = 0; b < a.length; b++) {

        var c = a[b],
            d = z(document, c.id + "-src"),
            e = d.href;

        if (!(new N(e)).da("skin")) {

            d.href = "https://www.blogger.com/unvisited-link-" + (new Date).valueOf();

            d = d.href = e;
            e = encodeURIComponent;

            g = (new B(void 0)).serialize({
                color: U("color", c),
                backgroundColor: U("backgroundColor", c),
                unvisitedLinkColor: U("color", d),
                fontFamily: T("fontFamily", c, "serif")
            });
            e = d + ("#" + e(g))
        }
        c.src = e
    }
};

var ha = !y && !(x("Safari") && !((x("Chrome") || x("CriOS")) && !x("Edge") || x("Coast") || x("Opera") || x("Edge") || x("Edg/") || x("OPR") || x("Firefox") || x("FxiOS") || x("Silk") || x("Android")));
var V = -1;

var W = function() {
        V = Math.floor(1E7 * Math.random());
        for (var a = A(document, "iframe", "blogger-comment-from-post", void 0), b = 0; b < a.length; b++) {
            var c = z(document, a[b].id + "-src"),
                d = new N(c.href);
            d.ma("blogspotRpcToken", V);
            c.href = d.toString()
        }
        ea();
        a = function(e) {
            if (typeof e.data === "string" && 0 == e.data.indexOf("set-comment-editor-height")) {
                var g = document.getElementById("comment-editor");
                g.height = e.data.substring(26);
                if (ha && g.dataset) g.dataset.resized = !0;
                else {
                    if (/-[a-z]/.test("resized")) throw Error("");
                    g.setAttribute("data-" +
                        "resized".replace(/([A-Z])/g, "-$1").toLowerCase(), !0)
                }
            }
        };
        window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a)
    },
    X = ["BLOG_CMT_createIframe"],
    Y = n;
X[0] in Y || "undefined" == typeof Y.execScript || Y.execScript("var " + X[0]);
for (var Z; X.length && (Z = X.shift());) X.length || void 0 === W ? Y = Y[Z] && Y[Z] !== Object.prototype[Z] ? Y[Z] : Y[Z] = {} : Y[Z] = W;
}).call(this);