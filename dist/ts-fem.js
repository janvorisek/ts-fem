var ka = Object.defineProperty;
var ja = (r, e, n) => e in r ? ka(r, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : r[e] = n;
var lr = (r, e, n) => (ja(r, typeof e != "symbol" ? e + "" : e, n), n);
function Oe() {
  return Oe = Object.assign ? Object.assign.bind() : function(r) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
    }
    return r;
  }, Oe.apply(this, arguments);
}
var hi = {
  // minimum relative difference between two compared values,
  // used by all comparison functions
  epsilon: 1e-12,
  // type of default matrix output. Choose 'matrix' (default) or 'array'
  matrix: "Matrix",
  // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
  number: "number",
  // number of significant digits in BigNumbers
  precision: 64,
  // predictable output type of functions. When true, output type depends only
  // on the input types. When false (default), output type can vary depending
  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
  // predictable is false, and returns `NaN` when true.
  predictable: !1,
  // random seed for seeded pseudo random number generation
  // null = randomly seed
  randomSeed: null
};
function $r(r) {
  return typeof r == "number";
}
function Pr(r) {
  return !r || typeof r != "object" || typeof r.constructor != "function" ? !1 : r.isBigNumber === !0 && typeof r.constructor.prototype == "object" && r.constructor.prototype.isBigNumber === !0 || typeof r.constructor.isDecimal == "function" && r.constructor.isDecimal(r) === !0;
}
function Gt(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isComplex === !0 || !1;
}
function Yt(r) {
  return r && typeof r == "object" && Object.getPrototypeOf(r).isFraction === !0 || !1;
}
function di(r) {
  return r && r.constructor.prototype.isUnit === !0 || !1;
}
function te(r) {
  return typeof r == "string";
}
var Mr = Array.isArray;
function _r(r) {
  return r && r.constructor.prototype.isMatrix === !0 || !1;
}
function ot(r) {
  return Array.isArray(r) || _r(r);
}
function pi(r) {
  return r && r.isDenseMatrix && r.constructor.prototype.isMatrix === !0 || !1;
}
function mi(r) {
  return r && r.isSparseMatrix && r.constructor.prototype.isMatrix === !0 || !1;
}
function gi(r) {
  return r && r.constructor.prototype.isRange === !0 || !1;
}
function wt(r) {
  return r && r.constructor.prototype.isIndex === !0 || !1;
}
function ru(r) {
  return typeof r == "boolean";
}
function eu(r) {
  return r && r.constructor.prototype.isResultSet === !0 || !1;
}
function tu(r) {
  return r && r.constructor.prototype.isHelp === !0 || !1;
}
function nu(r) {
  return typeof r == "function";
}
function iu(r) {
  return r instanceof Date;
}
function au(r) {
  return r instanceof RegExp;
}
function Di(r) {
  return !!(r && typeof r == "object" && r.constructor === Object && !Gt(r) && !Yt(r));
}
function uu(r) {
  return r === null;
}
function ou(r) {
  return r === void 0;
}
function su(r) {
  return r && r.isAccessorNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function fu(r) {
  return r && r.isArrayNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function cu(r) {
  return r && r.isAssignmentNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function lu(r) {
  return r && r.isBlockNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function vu(r) {
  return r && r.isConditionalNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function hu(r) {
  return r && r.isConstantNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function du(r) {
  return r && r.isFunctionAssignmentNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function pu(r) {
  return r && r.isFunctionNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function mu(r) {
  return r && r.isIndexNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function gu(r) {
  return r && r.isNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function Du(r) {
  return r && r.isObjectNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function yu(r) {
  return r && r.isOperatorNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function wu(r) {
  return r && r.isParenthesisNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function Au(r) {
  return r && r.isRangeNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function Eu(r) {
  return r && r.isRelationalNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function Fu(r) {
  return r && r.isSymbolNode === !0 && r.constructor.prototype.isNode === !0 || !1;
}
function Cu(r) {
  return r && r.constructor.prototype.isChain === !0 || !1;
}
function fe(r) {
  var e = typeof r;
  return e === "object" ? r === null ? "null" : Pr(r) ? "BigNumber" : r.constructor && r.constructor.name ? r.constructor.name : "Object" : e;
}
function Fr(r) {
  var e = typeof r;
  if (e === "number" || e === "string" || e === "boolean" || r === null || r === void 0)
    return r;
  if (typeof r.clone == "function")
    return r.clone();
  if (Array.isArray(r))
    return r.map(function(n) {
      return Fr(n);
    });
  if (r instanceof Date)
    return new Date(r.valueOf());
  if (Pr(r))
    return r;
  if (Di(r))
    return bu(r, Fr);
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(r, ")"));
}
function bu(r, e) {
  var n = {};
  for (var i in r)
    Ye(r, i) && (n[i] = e(r[i]));
  return n;
}
function Mu(r, e) {
  for (var n in e)
    Ye(e, n) && (r[n] = e[n]);
  return r;
}
function Ie(r, e) {
  var n, i, t;
  if (Array.isArray(r)) {
    if (!Array.isArray(e) || r.length !== e.length)
      return !1;
    for (i = 0, t = r.length; i < t; i++)
      if (!Ie(r[i], e[i]))
        return !1;
    return !0;
  } else {
    if (typeof r == "function")
      return r === e;
    if (r instanceof Object) {
      if (Array.isArray(e) || !(e instanceof Object))
        return !1;
      for (n in r)
        if (!(n in e) || !Ie(r[n], e[n]))
          return !1;
      for (n in e)
        if (!(n in r))
          return !1;
      return !0;
    } else
      return r === e;
  }
}
function Ye(r, e) {
  return r && Object.hasOwnProperty.call(r, e);
}
function Su(r, e) {
  for (var n = {}, i = 0; i < e.length; i++) {
    var t = e[i], a = r[t];
    a !== void 0 && (n[t] = a);
  }
  return n;
}
var Nu = ["Matrix", "Array"], xu = ["number", "BigNumber", "Fraction"], kr = function(e) {
  if (e)
    throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(hi);
};
Oe(kr, hi, {
  MATRIX_OPTIONS: Nu,
  NUMBER_OPTIONS: xu
});
function tn() {
  return !0;
}
function ee() {
  return !1;
}
function Be() {
}
const nn = "Argument is not a typed-function.";
function yi() {
  function r(x) {
    return typeof x == "object" && x !== null && x.constructor === Object;
  }
  const e = [{
    name: "number",
    test: function(x) {
      return typeof x == "number";
    }
  }, {
    name: "string",
    test: function(x) {
      return typeof x == "string";
    }
  }, {
    name: "boolean",
    test: function(x) {
      return typeof x == "boolean";
    }
  }, {
    name: "Function",
    test: function(x) {
      return typeof x == "function";
    }
  }, {
    name: "Array",
    test: Array.isArray
  }, {
    name: "Date",
    test: function(x) {
      return x instanceof Date;
    }
  }, {
    name: "RegExp",
    test: function(x) {
      return x instanceof RegExp;
    }
  }, {
    name: "Object",
    test: r
  }, {
    name: "null",
    test: function(x) {
      return x === null;
    }
  }, {
    name: "undefined",
    test: function(x) {
      return x === void 0;
    }
  }], n = {
    name: "any",
    test: tn,
    isAny: !0
  };
  let i, t, a = 0, o = {
    createCount: 0
  };
  function v(x) {
    const _ = i.get(x);
    if (_)
      return _;
    let $ = 'Unknown type "' + x + '"';
    const R = x.toLowerCase();
    let K;
    for (K of t)
      if (K.toLowerCase() === R) {
        $ += '. Did you mean "' + K + '" ?';
        break;
      }
    throw new TypeError($);
  }
  function c(x) {
    let _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
    const $ = _ ? v(_).index : t.length, R = [];
    for (let Y = 0; Y < x.length; ++Y) {
      if (!x[Y] || typeof x[Y].name != "string" || typeof x[Y].test != "function")
        throw new TypeError("Object with properties {name: string, test: function} expected");
      const ar = x[Y].name;
      if (i.has(ar))
        throw new TypeError('Duplicate type name "' + ar + '"');
      R.push(ar), i.set(ar, {
        name: ar,
        test: x[Y].test,
        isAny: x[Y].isAny,
        index: $ + Y,
        conversionsTo: []
        // Newly added type can't have any conversions to it
      });
    }
    const K = t.slice($);
    t = t.slice(0, $).concat(R).concat(K);
    for (let Y = $ + R.length; Y < t.length; ++Y)
      i.get(t[Y]).index = Y;
  }
  function l() {
    i = /* @__PURE__ */ new Map(), t = [], a = 0, c([n], !1);
  }
  l(), c(e);
  function s() {
    let x;
    for (x of t)
      i.get(x).conversionsTo = [];
    a = 0;
  }
  function u(x) {
    const _ = t.filter(($) => {
      const R = i.get($);
      return !R.isAny && R.test(x);
    });
    return _.length ? _ : ["any"];
  }
  function f(x) {
    return x && typeof x == "function" && "_typedFunctionData" in x;
  }
  function d(x, _, $) {
    if (!f(x))
      throw new TypeError(nn);
    const R = $ && $.exact, K = Array.isArray(_) ? _.join(",") : _, Y = E(K), ar = m(Y);
    if (!R || ar in x.signatures) {
      const xr = x._typedFunctionData.signatureMap.get(ar);
      if (xr)
        return xr;
    }
    const tr = Y.length;
    let ir;
    if (R) {
      ir = [];
      let xr;
      for (xr in x.signatures)
        ir.push(x._typedFunctionData.signatureMap.get(xr));
    } else
      ir = x._typedFunctionData.signatures;
    for (let xr = 0; xr < tr; ++xr) {
      const Or = Y[xr], Rr = [];
      let Kr;
      for (Kr of ir) {
        const Qr = b(Kr.params, xr);
        if (!(!Qr || Or.restParam && !Qr.restParam)) {
          if (!Qr.hasAny) {
            const ne = g(Qr);
            if (Or.types.some((ie) => !ne.has(ie.name)))
              continue;
          }
          Rr.push(Kr);
        }
      }
      if (ir = Rr, ir.length === 0)
        break;
    }
    let er;
    for (er of ir)
      if (er.params.length <= tr)
        return er;
    throw new TypeError("Signature not found (signature: " + (x.name || "unnamed") + "(" + m(Y, ", ") + "))");
  }
  function D(x, _, $) {
    return d(x, _, $).implementation;
  }
  function h(x, _) {
    const $ = v(_);
    if ($.test(x))
      return x;
    const R = $.conversionsTo;
    if (R.length === 0)
      throw new Error("There are no conversions to " + _ + " defined.");
    for (let K = 0; K < R.length; K++)
      if (v(R[K].from).test(x))
        return R[K].convert(x);
    throw new Error("Cannot convert " + x + " to " + _);
  }
  function m(x) {
    let _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return x.map(($) => $.name).join(_);
  }
  function p(x) {
    const _ = x.indexOf("...") === 0, R = (_ ? x.length > 3 ? x.slice(3) : "any" : x).split("|").map((tr) => v(tr.trim()));
    let K = !1, Y = _ ? "..." : "";
    return {
      types: R.map(function(tr) {
        return K = tr.isAny || K, Y += tr.name + "|", {
          name: tr.name,
          typeIndex: tr.index,
          test: tr.test,
          isAny: tr.isAny,
          conversion: null,
          conversionIndex: -1
        };
      }),
      name: Y.slice(0, -1),
      // remove trailing '|' from above
      hasAny: K,
      hasConversion: !1,
      restParam: _
    };
  }
  function w(x) {
    const _ = x.types.map((ar) => ar.name), $ = G(_);
    let R = x.hasAny, K = x.name;
    const Y = $.map(function(ar) {
      const tr = v(ar.from);
      return R = tr.isAny || R, K += "|" + ar.from, {
        name: ar.from,
        typeIndex: tr.index,
        test: tr.test,
        isAny: tr.isAny,
        conversion: ar,
        conversionIndex: ar.index
      };
    });
    return {
      types: x.types.concat(Y),
      name: K,
      hasAny: R,
      hasConversion: Y.length > 0,
      restParam: x.restParam
    };
  }
  function g(x) {
    return x.typeSet || (x.typeSet = /* @__PURE__ */ new Set(), x.types.forEach((_) => x.typeSet.add(_.name))), x.typeSet;
  }
  function E(x) {
    const _ = [];
    if (typeof x != "string")
      throw new TypeError("Signatures must be strings");
    const $ = x.trim();
    if ($ === "")
      return _;
    const R = $.split(",");
    for (let K = 0; K < R.length; ++K) {
      const Y = p(R[K].trim());
      if (Y.restParam && K !== R.length - 1)
        throw new SyntaxError('Unexpected rest parameter "' + R[K] + '": only allowed for the last parameter');
      if (Y.types.length === 0)
        return null;
      _.push(Y);
    }
    return _;
  }
  function F(x) {
    const _ = X(x);
    return _ ? _.restParam : !1;
  }
  function y(x) {
    if (!x || x.types.length === 0)
      return tn;
    if (x.types.length === 1)
      return v(x.types[0].name).test;
    if (x.types.length === 2) {
      const _ = v(x.types[0].name).test, $ = v(x.types[1].name).test;
      return function(K) {
        return _(K) || $(K);
      };
    } else {
      const _ = x.types.map(function($) {
        return v($.name).test;
      });
      return function(R) {
        for (let K = 0; K < _.length; K++)
          if (_[K](R))
            return !0;
        return !1;
      };
    }
  }
  function C(x) {
    let _, $, R;
    if (F(x)) {
      _ = Q(x).map(y);
      const K = _.length, Y = y(X(x)), ar = function(tr) {
        for (let ir = K; ir < tr.length; ir++)
          if (!Y(tr[ir]))
            return !1;
        return !0;
      };
      return function(ir) {
        for (let er = 0; er < _.length; er++)
          if (!_[er](ir[er]))
            return !1;
        return ar(ir) && ir.length >= K + 1;
      };
    } else
      return x.length === 0 ? function(Y) {
        return Y.length === 0;
      } : x.length === 1 ? ($ = y(x[0]), function(Y) {
        return $(Y[0]) && Y.length === 1;
      }) : x.length === 2 ? ($ = y(x[0]), R = y(x[1]), function(Y) {
        return $(Y[0]) && R(Y[1]) && Y.length === 2;
      }) : (_ = x.map(y), function(Y) {
        for (let ar = 0; ar < _.length; ar++)
          if (!_[ar](Y[ar]))
            return !1;
        return Y.length === _.length;
      });
  }
  function b(x, _) {
    return _ < x.length ? x[_] : F(x) ? X(x) : null;
  }
  function A(x, _) {
    const $ = b(x, _);
    return $ ? g($) : /* @__PURE__ */ new Set();
  }
  function S(x) {
    return x.conversion === null || x.conversion === void 0;
  }
  function M(x, _) {
    const $ = /* @__PURE__ */ new Set();
    return x.forEach((R) => {
      const K = A(R.params, _);
      let Y;
      for (Y of K)
        $.add(Y);
    }), $.has("any") ? ["any"] : Array.from($);
  }
  function N(x, _, $) {
    let R, K;
    const Y = x || "unnamed";
    let ar = $, tr;
    for (tr = 0; tr < _.length; tr++) {
      const Or = [];
      if (ar.forEach((Rr) => {
        const Kr = b(Rr.params, tr), Qr = y(Kr);
        (tr < Rr.params.length || F(Rr.params)) && Qr(_[tr]) && Or.push(Rr);
      }), Or.length === 0) {
        if (K = M(ar, tr), K.length > 0) {
          const Rr = u(_[tr]);
          return R = new TypeError("Unexpected type of argument in function " + Y + " (expected: " + K.join(" or ") + ", actual: " + Rr.join(" | ") + ", index: " + tr + ")"), R.data = {
            category: "wrongType",
            fn: Y,
            index: tr,
            actual: Rr,
            expected: K
          }, R;
        }
      } else
        ar = Or;
    }
    const ir = ar.map(function(Or) {
      return F(Or.params) ? 1 / 0 : Or.params.length;
    });
    if (_.length < Math.min.apply(null, ir))
      return K = M(ar, tr), R = new TypeError("Too few arguments in function " + Y + " (expected: " + K.join(" or ") + ", index: " + _.length + ")"), R.data = {
        category: "tooFewArgs",
        fn: Y,
        index: _.length,
        expected: K
      }, R;
    const er = Math.max.apply(null, ir);
    if (_.length > er)
      return R = new TypeError("Too many arguments in function " + Y + " (expected: " + er + ", actual: " + _.length + ")"), R.data = {
        category: "tooManyArgs",
        fn: Y,
        index: _.length,
        expectedLength: er
      }, R;
    const xr = [];
    for (let Or = 0; Or < _.length; ++Or)
      xr.push(u(_[Or]).join("|"));
    return R = new TypeError('Arguments of type "' + xr.join(", ") + '" do not match any of the defined signatures of function ' + Y + "."), R.data = {
      category: "mismatch",
      actual: xr
    }, R;
  }
  function O(x) {
    let _ = t.length + 1;
    for (let $ = 0; $ < x.types.length; $++)
      S(x.types[$]) && (_ = Math.min(_, x.types[$].typeIndex));
    return _;
  }
  function T(x) {
    let _ = a + 1;
    for (let $ = 0; $ < x.types.length; $++)
      S(x.types[$]) || (_ = Math.min(_, x.types[$].conversionIndex));
    return _;
  }
  function I(x, _) {
    if (x.hasAny) {
      if (!_.hasAny)
        return 1;
    } else if (_.hasAny)
      return -1;
    if (x.restParam) {
      if (!_.restParam)
        return 1;
    } else if (_.restParam)
      return -1;
    if (x.hasConversion) {
      if (!_.hasConversion)
        return 1;
    } else if (_.hasConversion)
      return -1;
    const $ = O(x) - O(_);
    if ($ < 0)
      return -1;
    if ($ > 0)
      return 1;
    const R = T(x) - T(_);
    return R < 0 ? -1 : R > 0 ? 1 : 0;
  }
  function B(x, _) {
    const $ = x.params, R = _.params, K = X($), Y = X(R), ar = F($), tr = F(R);
    if (ar && K.hasAny) {
      if (!tr || !Y.hasAny)
        return 1;
    } else if (tr && Y.hasAny)
      return -1;
    let ir = 0, er = 0, xr;
    for (xr of $)
      xr.hasAny && ++ir, xr.hasConversion && ++er;
    let Or = 0, Rr = 0;
    for (xr of R)
      xr.hasAny && ++Or, xr.hasConversion && ++Rr;
    if (ir !== Or)
      return ir - Or;
    if (ar && K.hasConversion) {
      if (!tr || !Y.hasConversion)
        return 1;
    } else if (tr && Y.hasConversion)
      return -1;
    if (er !== Rr)
      return er - Rr;
    if (ar) {
      if (!tr)
        return 1;
    } else if (tr)
      return -1;
    const Kr = ($.length - R.length) * (ar ? -1 : 1);
    if (Kr !== 0)
      return Kr;
    const Qr = [];
    let ne = 0;
    for (let xe = 0; xe < $.length; ++xe) {
      const nt = I($[xe], R[xe]);
      Qr.push(nt), ne += nt;
    }
    if (ne !== 0)
      return ne;
    let ie;
    for (ie of Qr)
      if (ie !== 0)
        return ie;
    return 0;
  }
  function G(x) {
    if (x.length === 0)
      return [];
    const _ = x.map(v);
    x.length > 1 && _.sort((K, Y) => K.index - Y.index);
    let $ = _[0].conversionsTo;
    if (x.length === 1)
      return $;
    $ = $.concat([]);
    const R = new Set(x);
    for (let K = 1; K < _.length; ++K) {
      let Y;
      for (Y of _[K].conversionsTo)
        R.has(Y.from) || ($.push(Y), R.add(Y.from));
    }
    return $;
  }
  function q(x, _) {
    let $ = _;
    if (x.some((K) => K.hasConversion)) {
      const K = F(x), Y = x.map(z);
      $ = function() {
        const tr = [], ir = K ? arguments.length - 1 : arguments.length;
        for (let er = 0; er < ir; er++)
          tr[er] = Y[er](arguments[er]);
        return K && (tr[ir] = arguments[ir].map(Y[ir])), _.apply(this, tr);
      };
    }
    let R = $;
    if (F(x)) {
      const K = x.length - 1;
      R = function() {
        return $.apply(this, J(arguments, 0, K).concat([J(arguments, K)]));
      };
    }
    return R;
  }
  function z(x) {
    let _, $, R, K;
    const Y = [], ar = [];
    switch (x.types.forEach(function(tr) {
      tr.conversion && (Y.push(v(tr.conversion.from).test), ar.push(tr.conversion.convert));
    }), ar.length) {
      case 0:
        return function(ir) {
          return ir;
        };
      case 1:
        return _ = Y[0], R = ar[0], function(ir) {
          return _(ir) ? R(ir) : ir;
        };
      case 2:
        return _ = Y[0], $ = Y[1], R = ar[0], K = ar[1], function(ir) {
          return _(ir) ? R(ir) : $(ir) ? K(ir) : ir;
        };
      default:
        return function(ir) {
          for (let er = 0; er < ar.length; er++)
            if (Y[er](ir))
              return ar[er](ir);
          return ir;
        };
    }
  }
  function V(x) {
    function _($, R, K) {
      if (R < $.length) {
        const Y = $[R];
        let ar = [];
        if (Y.restParam) {
          const tr = Y.types.filter(S);
          tr.length < Y.types.length && ar.push({
            types: tr,
            name: "..." + tr.map((ir) => ir.name).join("|"),
            hasAny: tr.some((ir) => ir.isAny),
            hasConversion: !1,
            restParam: !0
          }), ar.push(Y);
        } else
          ar = Y.types.map(function(tr) {
            return {
              types: [tr],
              name: tr.name,
              hasAny: tr.isAny,
              hasConversion: tr.conversion,
              restParam: !1
            };
          });
        return j(ar, function(tr) {
          return _($, R + 1, K.concat([tr]));
        });
      } else
        return [K];
    }
    return _(x, 0, []);
  }
  function H(x, _) {
    const $ = Math.max(x.length, _.length);
    for (let tr = 0; tr < $; tr++) {
      const ir = A(x, tr), er = A(_, tr);
      let xr = !1, Or;
      for (Or of er)
        if (ir.has(Or)) {
          xr = !0;
          break;
        }
      if (!xr)
        return !1;
    }
    const R = x.length, K = _.length, Y = F(x), ar = F(_);
    return Y ? ar ? R === K : K >= R : ar ? R >= K : R === K;
  }
  function P(x) {
    return x.map((_) => yr(_) ? dr(_.referToSelf.callback) : gr(_) ? fr(_.referTo.references, _.referTo.callback) : _);
  }
  function L(x, _, $) {
    const R = [];
    let K;
    for (K of x) {
      let Y = $[K];
      if (typeof Y != "number")
        throw new TypeError('No definition for referenced signature "' + K + '"');
      if (Y = _[Y], typeof Y != "function")
        return !1;
      R.push(Y);
    }
    return R;
  }
  function Z(x, _, $) {
    const R = P(x), K = new Array(R.length).fill(!1);
    let Y = !0;
    for (; Y; ) {
      Y = !1;
      let ar = !0;
      for (let tr = 0; tr < R.length; ++tr) {
        if (K[tr])
          continue;
        const ir = R[tr];
        if (yr(ir))
          R[tr] = ir.referToSelf.callback($), R[tr].referToSelf = ir.referToSelf, K[tr] = !0, ar = !1;
        else if (gr(ir)) {
          const er = L(ir.referTo.references, R, _);
          er ? (R[tr] = ir.referTo.callback.apply(this, er), R[tr].referTo = ir.referTo, K[tr] = !0, ar = !1) : Y = !0;
        }
      }
      if (ar && Y)
        throw new SyntaxError("Circular reference detected in resolving typed.referTo");
    }
    return R;
  }
  function nr(x) {
    const _ = /\bthis(\(|\.signatures\b)/;
    Object.keys(x).forEach(($) => {
      const R = x[$];
      if (_.test(R.toString()))
        throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
    });
  }
  function k(x, _) {
    if (o.createCount++, Object.keys(_).length === 0)
      throw new SyntaxError("No signatures provided");
    o.warnAgainstDeprecatedThis && nr(_);
    const $ = [], R = [], K = {}, Y = [];
    let ar;
    for (ar in _) {
      if (!Object.prototype.hasOwnProperty.call(_, ar))
        continue;
      const Nr = E(ar);
      if (!Nr)
        continue;
      $.forEach(function(Ge) {
        if (H(Ge, Nr))
          throw new TypeError('Conflicting signatures "' + m(Ge) + '" and "' + m(Nr) + '".');
      }), $.push(Nr);
      const Hr = R.length;
      R.push(_[ar]);
      const Ha = Nr.map(w);
      let it;
      for (it of V(Ha)) {
        const Ge = m(it);
        Y.push({
          params: it,
          name: Ge,
          fn: Hr
        }), it.every((Wa) => !Wa.hasConversion) && (K[Ge] = Hr);
      }
    }
    Y.sort(B);
    const tr = Z(R, K, Ze);
    let ir;
    for (ir in K)
      Object.prototype.hasOwnProperty.call(K, ir) && (K[ir] = tr[K[ir]]);
    const er = [], xr = /* @__PURE__ */ new Map();
    for (ir of Y)
      xr.has(ir.name) || (ir.fn = tr[ir.fn], er.push(ir), xr.set(ir.name, ir));
    const Or = er[0] && er[0].params.length <= 2 && !F(er[0].params), Rr = er[1] && er[1].params.length <= 2 && !F(er[1].params), Kr = er[2] && er[2].params.length <= 2 && !F(er[2].params), Qr = er[3] && er[3].params.length <= 2 && !F(er[3].params), ne = er[4] && er[4].params.length <= 2 && !F(er[4].params), ie = er[5] && er[5].params.length <= 2 && !F(er[5].params), xe = Or && Rr && Kr && Qr && ne && ie;
    for (let Nr = 0; Nr < er.length; ++Nr)
      er[Nr].test = C(er[Nr].params);
    const nt = Or ? y(er[0].params[0]) : ee, Ea = Rr ? y(er[1].params[0]) : ee, Fa = Kr ? y(er[2].params[0]) : ee, Ca = Qr ? y(er[3].params[0]) : ee, ba = ne ? y(er[4].params[0]) : ee, Ma = ie ? y(er[5].params[0]) : ee, Sa = Or ? y(er[0].params[1]) : ee, Na = Rr ? y(er[1].params[1]) : ee, xa = Kr ? y(er[2].params[1]) : ee, Ba = Qr ? y(er[3].params[1]) : ee, _a = ne ? y(er[4].params[1]) : ee, za = ie ? y(er[5].params[1]) : ee;
    for (let Nr = 0; Nr < er.length; ++Nr)
      er[Nr].implementation = q(er[Nr].params, er[Nr].fn);
    const Ta = Or ? er[0].implementation : Be, Oa = Rr ? er[1].implementation : Be, Ia = Kr ? er[2].implementation : Be, $a = Qr ? er[3].implementation : Be, qa = ne ? er[4].implementation : Be, La = ie ? er[5].implementation : Be, Pa = Or ? er[0].params.length : -1, Ra = Rr ? er[1].params.length : -1, Ua = Kr ? er[2].params.length : -1, Va = Qr ? er[3].params.length : -1, Za = ne ? er[4].params.length : -1, Ga = ie ? er[5].params.length : -1, Ya = xe ? 6 : 0, Ja = er.length, Qa = er.map((Nr) => Nr.test), Xa = er.map((Nr) => Nr.implementation), Ka = function() {
      for (let Hr = Ya; Hr < Ja; Hr++)
        if (Qa[Hr](arguments))
          return Xa[Hr].apply(this, arguments);
      return o.onMismatch(x, arguments, er);
    };
    function Ze(Nr, Hr) {
      return arguments.length === Pa && nt(Nr) && Sa(Hr) ? Ta.apply(this, arguments) : arguments.length === Ra && Ea(Nr) && Na(Hr) ? Oa.apply(this, arguments) : arguments.length === Ua && Fa(Nr) && xa(Hr) ? Ia.apply(this, arguments) : arguments.length === Va && Ca(Nr) && Ba(Hr) ? $a.apply(this, arguments) : arguments.length === Za && ba(Nr) && _a(Hr) ? qa.apply(this, arguments) : arguments.length === Ga && Ma(Nr) && za(Hr) ? La.apply(this, arguments) : Ka.apply(this, arguments);
    }
    try {
      Object.defineProperty(Ze, "name", {
        value: x
      });
    } catch {
    }
    return Ze.signatures = K, Ze._typedFunctionData = {
      signatures: er,
      signatureMap: xr
    }, Ze;
  }
  function U(x, _, $) {
    throw N(x, _, $);
  }
  function Q(x) {
    return J(x, 0, x.length - 1);
  }
  function X(x) {
    return x[x.length - 1];
  }
  function J(x, _, $) {
    return Array.prototype.slice.call(x, _, $);
  }
  function ur(x, _) {
    for (let $ = 0; $ < x.length; $++)
      if (_(x[$]))
        return x[$];
  }
  function j(x, _) {
    return Array.prototype.concat.apply([], x.map(_));
  }
  function or() {
    const x = Q(arguments).map(($) => m(E($))), _ = X(arguments);
    if (typeof _ != "function")
      throw new TypeError("Callback function expected as last argument");
    return fr(x, _);
  }
  function fr(x, _) {
    return {
      referTo: {
        references: x,
        callback: _
      }
    };
  }
  function dr(x) {
    if (typeof x != "function")
      throw new TypeError("Callback function expected as first argument");
    return {
      referToSelf: {
        callback: x
      }
    };
  }
  function gr(x) {
    return x && typeof x.referTo == "object" && Array.isArray(x.referTo.references) && typeof x.referTo.callback == "function";
  }
  function yr(x) {
    return x && typeof x.referToSelf == "object" && typeof x.referToSelf.callback == "function";
  }
  function cr(x, _) {
    if (!x)
      return _;
    if (_ && _ !== x) {
      const $ = new Error("Function names do not match (expected: " + x + ", actual: " + _ + ")");
      throw $.data = {
        actual: _,
        expected: x
      }, $;
    }
    return x;
  }
  function Cr(x) {
    let _;
    for (const $ in x)
      Object.prototype.hasOwnProperty.call(x, $) && (f(x[$]) || typeof x[$].signature == "string") && (_ = cr(_, x[$].name));
    return _;
  }
  function wr(x, _) {
    let $;
    for ($ in _)
      if (Object.prototype.hasOwnProperty.call(_, $)) {
        if ($ in x && _[$] !== x[$]) {
          const R = new Error('Signature "' + $ + '" is defined twice');
          throw R.data = {
            signature: $,
            sourceFunction: _[$],
            destFunction: x[$]
          }, R;
        }
        x[$] = _[$];
      }
  }
  const Sr = o;
  o = function(x) {
    const _ = typeof x == "string", $ = _ ? 1 : 0;
    let R = _ ? x : "";
    const K = {};
    for (let Y = $; Y < arguments.length; ++Y) {
      const ar = arguments[Y];
      let tr = {}, ir;
      if (typeof ar == "function" ? (ir = ar.name, typeof ar.signature == "string" ? tr[ar.signature] = ar : f(ar) && (tr = ar.signatures)) : r(ar) && (tr = ar, _ || (ir = Cr(ar))), Object.keys(tr).length === 0) {
        const er = new TypeError("Argument to 'typed' at index " + Y + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        throw er.data = {
          index: Y,
          argument: ar
        }, er;
      }
      _ || (R = cr(R, ir)), wr(K, tr);
    }
    return k(R || "", K);
  }, o.create = yi, o.createCount = Sr.createCount, o.onMismatch = U, o.throwMismatchError = U, o.createError = N, o.clear = l, o.clearConversions = s, o.addTypes = c, o._findType = v, o.referTo = or, o.referToSelf = dr, o.convert = h, o.findSignature = d, o.find = D, o.isTypedFunction = f, o.warnAgainstDeprecatedThis = !0, o.addType = function(x, _) {
    let $ = "any";
    _ !== !1 && i.has("Object") && ($ = "Object"), o.addTypes([x], $);
  };
  function Ur(x) {
    if (!x || typeof x.from != "string" || typeof x.to != "string" || typeof x.convert != "function")
      throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    if (x.to === x.from)
      throw new SyntaxError('Illegal to define conversion from "' + x.from + '" to itself.');
  }
  return o.addConversion = function(x) {
    Ur(x);
    const _ = v(x.to);
    if (_.conversionsTo.every(function($) {
      return $.from !== x.from;
    }))
      _.conversionsTo.push({
        from: x.from,
        convert: x.convert,
        index: a++
      });
    else
      throw new Error('There is already a conversion from "' + x.from + '" to "' + _.name + '"');
  }, o.addConversions = function(x) {
    x.forEach(o.addConversion);
  }, o.removeConversion = function(x) {
    Ur(x);
    const _ = v(x.to), $ = ur(_.conversionsTo, (K) => K.from === x.from);
    if (!$)
      throw new Error("Attempt to remove nonexistent conversion from " + x.from + " to " + x.to);
    if ($.convert !== x.convert)
      throw new Error("Conversion to remove does not match existing conversion");
    const R = _.conversionsTo.indexOf($);
    _.conversionsTo.splice(R, 1);
  }, o.resolve = function(x, _) {
    if (!f(x))
      throw new TypeError(nn);
    const $ = x._typedFunctionData.signatures;
    for (let R = 0; R < $.length; ++R)
      if ($[R].test(_))
        return $[R];
    return null;
  }, o;
}
const an = yi();
function zr(r) {
  return typeof r == "boolean" ? !0 : isFinite(r) ? r === Math.round(r) : !1;
}
var Bu = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
};
function Bt(r, e, n) {
  var i = {
    2: "0b",
    8: "0o",
    16: "0x"
  }, t = i[e], a = "";
  if (n) {
    if (n < 1)
      throw new Error("size must be in greater than 0");
    if (!zr(n))
      throw new Error("size must be an integer");
    if (r > 2 ** (n - 1) - 1 || r < -(2 ** (n - 1)))
      throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!zr(r))
      throw new Error("Value must be an integer");
    r < 0 && (r = r + 2 ** n), a = "i".concat(n);
  }
  var o = "";
  return r < 0 && (r = -r, o = "-"), "".concat(o).concat(t).concat(r.toString(e)).concat(a);
}
function Ot(r, e) {
  if (typeof e == "function")
    return e(r);
  if (r === 1 / 0)
    return "Infinity";
  if (r === -1 / 0)
    return "-Infinity";
  if (isNaN(r))
    return "NaN";
  var n = "auto", i, t;
  if (e && (e.notation && (n = e.notation), $r(e) ? i = e : $r(e.precision) && (i = e.precision), e.wordSize && (t = e.wordSize, typeof t != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (n) {
    case "fixed":
      return zu(r, i);
    case "exponential":
      return wi(r, i);
    case "engineering":
      return _u(r, i);
    case "bin":
      return Bt(r, 2, t);
    case "oct":
      return Bt(r, 8, t);
    case "hex":
      return Bt(r, 16, t);
    case "auto":
      return Tu(r, i, e && e).replace(/((\.\d*?)(0+))($|e)/, function() {
        var a = arguments[2], o = arguments[4];
        return a !== "." ? a + o : o;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function At(r) {
  var e = String(r).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!e)
    throw new SyntaxError("Invalid number " + r);
  var n = e[1], i = e[2], t = parseFloat(e[4] || "0"), a = i.indexOf(".");
  t += a !== -1 ? a - 1 : i.length - 1;
  var o = i.replace(".", "").replace(/^0*/, function(v) {
    return t -= v.length, "";
  }).replace(/0*$/, "").split("").map(function(v) {
    return parseInt(v);
  });
  return o.length === 0 && (o.push(0), t++), {
    sign: n,
    coefficients: o,
    exponent: t
  };
}
function _u(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var n = At(r), i = Et(n, e), t = i.exponent, a = i.coefficients, o = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3;
  if ($r(e))
    for (; e > a.length || t - o + 1 > a.length; )
      a.push(0);
  else
    for (var v = Math.abs(t - o) - (a.length - 1), c = 0; c < v; c++)
      a.push(0);
  for (var l = Math.abs(t - o), s = 1; l > 0; )
    s++, l--;
  var u = a.slice(s).join(""), f = $r(e) && u.length || u.match(/[1-9]/) ? "." + u : "", d = a.slice(0, s).join("") + f + "e" + (t >= 0 ? "+" : "") + o.toString();
  return i.sign + d;
}
function zu(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var n = At(r), i = typeof e == "number" ? Et(n, n.exponent + 1 + e) : n, t = i.coefficients, a = i.exponent + 1, o = a + (e || 0);
  return t.length < o && (t = t.concat(ze(o - t.length))), a < 0 && (t = ze(-a + 1).concat(t), a = 1), a < t.length && t.splice(a, 0, a === 0 ? "0." : "."), i.sign + t.join("");
}
function wi(r, e) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var n = At(r), i = e ? Et(n, e) : n, t = i.coefficients, a = i.exponent;
  t.length < e && (t = t.concat(ze(e - t.length)));
  var o = t.shift();
  return i.sign + o + (t.length > 0 ? "." + t.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
}
function Tu(r, e, n) {
  if (isNaN(r) || !isFinite(r))
    return String(r);
  var i = n && n.lowerExp !== void 0 ? n.lowerExp : -3, t = n && n.upperExp !== void 0 ? n.upperExp : 5, a = At(r), o = e ? Et(a, e) : a;
  if (o.exponent < i || o.exponent >= t)
    return wi(r, e);
  var v = o.coefficients, c = o.exponent;
  v.length < e && (v = v.concat(ze(e - v.length))), v = v.concat(ze(c - v.length + 1 + (v.length < e ? e - v.length : 0))), v = ze(-c).concat(v);
  var l = c > 0 ? c : 0;
  return l < v.length - 1 && v.splice(l + 1, 0, "."), o.sign + v.join("");
}
function Et(r, e) {
  for (var n = {
    sign: r.sign,
    coefficients: r.coefficients,
    exponent: r.exponent
  }, i = n.coefficients; e <= 0; )
    i.unshift(0), n.exponent++, e++;
  if (i.length > e) {
    var t = i.splice(e, i.length - e);
    if (t[0] >= 5) {
      var a = e - 1;
      for (i[a]++; i[a] === 10; )
        i.pop(), a === 0 && (i.unshift(0), n.exponent++, a++), a--, i[a]++;
    }
  }
  return n;
}
function ze(r) {
  for (var e = [], n = 0; n < r; n++)
    e.push(0);
  return e;
}
function Ou(r) {
  return r.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
var Iu = Number.EPSILON || 2220446049250313e-31;
function we(r, e, n) {
  if (n == null)
    return r === e;
  if (r === e)
    return !0;
  if (isNaN(r) || isNaN(e))
    return !1;
  if (isFinite(r) && isFinite(e)) {
    var i = Math.abs(r - e);
    return i <= Iu ? !0 : i <= Math.max(Math.abs(r), Math.abs(e)) * n;
  }
  return !1;
}
function _t(r, e, n) {
  var i = r.constructor, t = new i(2), a = "";
  if (n) {
    if (n < 1)
      throw new Error("size must be in greater than 0");
    if (!zr(n))
      throw new Error("size must be an integer");
    if (r.greaterThan(t.pow(n - 1).sub(1)) || r.lessThan(t.pow(n - 1).mul(-1)))
      throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!r.isInteger())
      throw new Error("Value must be an integer");
    r.lessThan(0) && (r = r.add(t.pow(n))), a = "i".concat(n);
  }
  switch (e) {
    case 2:
      return "".concat(r.toBinary()).concat(a);
    case 8:
      return "".concat(r.toOctal()).concat(a);
    case 16:
      return "".concat(r.toHexadecimal()).concat(a);
    default:
      throw new Error("Base ".concat(e, " not supported "));
  }
}
function $u(r, e) {
  if (typeof e == "function")
    return e(r);
  if (!r.isFinite())
    return r.isNaN() ? "NaN" : r.gt(0) ? "Infinity" : "-Infinity";
  var n = "auto", i, t;
  if (e !== void 0 && (e.notation && (n = e.notation), typeof e == "number" ? i = e : e.precision !== void 0 && (i = e.precision), e.wordSize && (t = e.wordSize, typeof t != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (n) {
    case "fixed":
      return Lu(r, i);
    case "exponential":
      return un(r, i);
    case "engineering":
      return qu(r, i);
    case "bin":
      return _t(r, 2, t);
    case "oct":
      return _t(r, 8, t);
    case "hex":
      return _t(r, 16, t);
    case "auto": {
      var a = e && e.lowerExp !== void 0 ? e.lowerExp : -3, o = e && e.upperExp !== void 0 ? e.upperExp : 5;
      if (r.isZero())
        return "0";
      var v, c = r.toSignificantDigits(i), l = c.e;
      return l >= a && l < o ? v = c.toFixed() : v = un(r, i), v.replace(/((\.\d*?)(0+))($|e)/, function() {
        var s = arguments[2], u = arguments[4];
        return s !== "." ? s + u : u;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function qu(r, e) {
  var n = r.e, i = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, t = r.mul(Math.pow(10, -i)), a = t.toPrecision(e);
  if (a.indexOf("e") !== -1) {
    var o = r.constructor;
    a = new o(a).toFixed();
  }
  return a + "e" + (n >= 0 ? "+" : "") + i.toString();
}
function un(r, e) {
  return e !== void 0 ? r.toExponential(e - 1) : r.toExponential();
}
function Lu(r, e) {
  return r.toFixed(e);
}
function Ir(r, e) {
  var n = Pu(r, e);
  return e && typeof e == "object" && "truncate" in e && n.length > e.truncate ? n.substring(0, e.truncate - 3) + "..." : n;
}
function Pu(r, e) {
  if (typeof r == "number")
    return Ot(r, e);
  if (Pr(r))
    return $u(r, e);
  if (Ru(r))
    return !e || e.fraction !== "decimal" ? r.s * r.n + "/" + r.d : r.toString();
  if (Array.isArray(r))
    return Ai(r, e);
  if (te(r))
    return on(r);
  if (typeof r == "function")
    return r.syntax ? String(r.syntax) : "function";
  if (r && typeof r == "object") {
    if (typeof r.format == "function")
      return r.format(e);
    if (r && r.toString(e) !== {}.toString())
      return r.toString(e);
    var n = Object.keys(r).map((i) => on(i) + ": " + Ir(r[i], e));
    return "{" + n.join(", ") + "}";
  }
  return String(r);
}
function on(r) {
  for (var e = String(r), n = "", i = 0; i < e.length; ) {
    var t = e.charAt(i);
    n += t in sn ? sn[t] : t, i++;
  }
  return '"' + n + '"';
}
var sn = {
  '"': '\\"',
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t"
};
function Ai(r, e) {
  if (Array.isArray(r)) {
    for (var n = "[", i = r.length, t = 0; t < i; t++)
      t !== 0 && (n += ", "), n += Ai(r[t], e);
    return n += "]", n;
  } else
    return Ir(r, e);
}
function Ru(r) {
  return r && typeof r == "object" && typeof r.s == "number" && typeof r.n == "number" && typeof r.d == "number" || !1;
}
function Er(r, e, n) {
  if (!(this instanceof Er))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = r, this.expected = e, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + " " + (this.relation || "!=") + " " + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + ")", this.stack = new Error().stack;
}
Er.prototype = new RangeError();
Er.prototype.constructor = RangeError;
Er.prototype.name = "DimensionError";
Er.prototype.isDimensionError = !0;
function be(r, e, n) {
  if (!(this instanceof be))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = r, arguments.length < 3 ? (this.min = 0, this.max = e) : (this.min = e, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
be.prototype = new RangeError();
be.prototype.constructor = RangeError;
be.prototype.name = "IndexError";
be.prototype.isIndexError = !0;
function qr(r) {
  for (var e = []; Array.isArray(r); )
    e.push(r.length), r = r[0];
  return e;
}
function Ei(r, e, n) {
  var i, t = r.length;
  if (t !== e[n])
    throw new Er(t, e[n]);
  if (n < e.length - 1) {
    var a = n + 1;
    for (i = 0; i < t; i++) {
      var o = r[i];
      if (!Array.isArray(o))
        throw new Er(e.length - 1, e.length, "<");
      Ei(r[i], e, a);
    }
  } else
    for (i = 0; i < t; i++)
      if (Array.isArray(r[i]))
        throw new Er(e.length + 1, e.length, ">");
}
function fn(r, e) {
  var n = e.length === 0;
  if (n) {
    if (Array.isArray(r))
      throw new Er(r.length, 0);
  } else
    Ei(r, e, 0);
}
function st(r, e) {
  var n = r.isMatrix ? r._size : qr(r), i = e._sourceSize;
  i.forEach((t, a) => {
    if (t !== null && t !== n[a])
      throw new Er(t, n[a]);
  });
}
function Br(r, e) {
  if (r !== void 0) {
    if (!$r(r) || !zr(r))
      throw new TypeError("Index must be an integer (value: " + r + ")");
    if (r < 0 || typeof e == "number" && r >= e)
      throw new be(r, e);
  }
}
function $e(r) {
  for (var e = 0; e < r._dimensions.length; ++e) {
    var n = r._dimensions[e];
    if (n._data && Mr(n._data)) {
      if (n._size[0] === 0)
        return !0;
    } else if (n.isRange) {
      if (n.start === n.end)
        return !0;
    } else if (te(n) && n.length === 0)
      return !0;
  }
  return !1;
}
function ft(r, e, n) {
  if (!Array.isArray(e))
    throw new TypeError("Array expected");
  if (e.length === 0)
    throw new Error("Resizing to scalar is not supported");
  e.forEach(function(t) {
    if (!$r(t) || !zr(t) || t < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Ir(e) + ")");
  }), ($r(r) || Pr(r)) && (r = [r]);
  var i = n !== void 0 ? n : 0;
  return It(r, e, 0, i), r;
}
function It(r, e, n, i) {
  var t, a, o = r.length, v = e[n], c = Math.min(o, v);
  if (r.length = v, n < e.length - 1) {
    var l = n + 1;
    for (t = 0; t < c; t++)
      a = r[t], Array.isArray(a) || (a = [a], r[t] = a), It(a, e, l, i);
    for (t = c; t < v; t++)
      a = [], r[t] = a, It(a, e, l, i);
  } else {
    for (t = 0; t < c; t++)
      for (; Array.isArray(r[t]); )
        r[t] = r[t][0];
    for (t = c; t < v; t++)
      r[t] = i;
  }
}
function Jt(r, e) {
  var n = $t(r), i = n.length;
  if (!Array.isArray(r) || !Array.isArray(e))
    throw new TypeError("Array expected");
  if (e.length === 0)
    throw new Er(0, i, "!=");
  e = Qt(e, i);
  var t = Fi(e);
  if (i !== t)
    throw new Er(t, i, "!=");
  try {
    return Uu(n, e);
  } catch (a) {
    throw a instanceof Er ? new Er(t, i, "!=") : a;
  }
}
function Qt(r, e) {
  var n = Fi(r), i = r.slice(), t = -1, a = r.indexOf(t), o = r.indexOf(t, a + 1) >= 0;
  if (o)
    throw new Error("More than one wildcard in sizes");
  var v = a >= 0, c = e % n === 0;
  if (v)
    if (c)
      i[a] = -e / n;
    else
      throw new Error("Could not replace wildcard, since " + e + " is no multiple of " + -n);
  return i;
}
function Fi(r) {
  return r.reduce((e, n) => e * n, 1);
}
function Uu(r, e) {
  for (var n = r, i, t = e.length - 1; t > 0; t--) {
    var a = e[t];
    i = [];
    for (var o = n.length / a, v = 0; v < o; v++)
      i.push(n.slice(v * a, (v + 1) * a));
    n = i;
  }
  return n;
}
function cn(r, e) {
  for (var n = e || qr(r); Array.isArray(r) && r.length === 1; )
    r = r[0], n.shift();
  for (var i = n.length; n[i - 1] === 1; )
    i--;
  return i < n.length && (r = Ci(r, i, 0), n.length = i), r;
}
function Ci(r, e, n) {
  var i, t;
  if (n < e) {
    var a = n + 1;
    for (i = 0, t = r.length; i < t; i++)
      r[i] = Ci(r[i], e, a);
  } else
    for (; Array.isArray(r); )
      r = r[0];
  return r;
}
function bi(r, e, n, i) {
  var t = i || qr(r);
  if (n)
    for (var a = 0; a < n; a++)
      r = [r], t.unshift(1);
  for (r = Mi(r, e, 0); t.length < e; )
    t.push(1);
  return r;
}
function Mi(r, e, n) {
  var i, t;
  if (Array.isArray(r)) {
    var a = n + 1;
    for (i = 0, t = r.length; i < t; i++)
      r[i] = Mi(r[i], e, a);
  } else
    for (var o = n; o < e; o++)
      r = [r];
  return r;
}
function $t(r) {
  if (!Array.isArray(r))
    return r;
  var e = [];
  return r.forEach(function n(i) {
    Array.isArray(i) ? i.forEach(n) : e.push(i);
  }), e;
}
function Je(r, e) {
  for (var n, i = 0, t = 0; t < r.length; t++) {
    var a = r[t], o = Array.isArray(a);
    if (t === 0 && o && (i = a.length), o && a.length !== i)
      return;
    var v = o ? Je(a, e) : e(a);
    if (n === void 0)
      n = v;
    else if (n !== v)
      return "mixed";
  }
  return n;
}
function Si(r, e, n, i) {
  if (i < n) {
    if (r.length !== e.length)
      throw new Er(r.length, e.length);
    for (var t = [], a = 0; a < r.length; a++)
      t[a] = Si(r[a], e[a], n, i + 1);
    return t;
  } else
    return r.concat(e);
}
function Ni() {
  var r = Array.prototype.slice.call(arguments, 0, -1), e = Array.prototype.slice.call(arguments, -1);
  if (r.length === 1)
    return r[0];
  if (r.length > 1)
    return r.slice(1).reduce(function(n, i) {
      return Si(n, i, e, 0);
    }, r[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function Vu() {
  for (var r = arguments.length, e = new Array(r), n = 0; n < r; n++)
    e[n] = arguments[n];
  for (var i = e.map((f) => f.length), t = Math.max(...i), a = new Array(t).fill(null), o = 0; o < e.length; o++)
    for (var v = e[o], c = i[o], l = 0; l < c; l++) {
      var s = t - c + l;
      v[l] > a[s] && (a[s] = v[l]);
    }
  for (var u = 0; u < e.length; u++)
    ct(e[u], a);
  return a;
}
function ct(r, e) {
  for (var n = e.length, i = r.length, t = 0; t < i; t++) {
    var a = n - i + t;
    if (r[t] < e[a] && r[t] > 1 || r[t] > e[a])
      throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(r, ") not possible to broadcast dimension ").concat(i, " with size ").concat(r[t], " to size ").concat(e[a]));
  }
}
function ln(r, e) {
  var n = qr(r);
  if (Ie(n, e))
    return r;
  ct(n, e);
  var i = Vu(n, e), t = i.length, a = [...Array(t - n.length).fill(1), ...n], o = Gu(r);
  n.length < t && (o = Jt(o, a), n = qr(o));
  for (var v = 0; v < t; v++)
    n[v] < i[v] && (o = Zu(o, i[v], v), n = qr(o));
  return o;
}
function Zu(r, e, n) {
  return Ni(...Array(e).fill(r), n);
}
function Gu(r) {
  return Oe([], r);
}
function rr(r, e, n, i) {
  function t(a) {
    var o = Su(a, e.map(Qu));
    return Yu(r, e, a), n(o);
  }
  return t.isFactory = !0, t.fn = r, t.dependencies = e.slice().sort(), i && (t.meta = i), t;
}
function Yu(r, e, n) {
  var i = e.filter((a) => !Ju(a)).every((a) => n[a] !== void 0);
  if (!i) {
    var t = e.filter((a) => n[a] === void 0);
    throw new Error('Cannot create function "'.concat(r, '", ') + "some dependencies are missing: ".concat(t.map((a) => '"'.concat(a, '"')).join(", "), "."));
  }
}
function Ju(r) {
  return r && r[0] === "?";
}
function Qu(r) {
  return r && r[0] === "?" ? r.slice(1) : r;
}
function xi(r, e) {
  if (zi(r) && _i(r, e))
    return r[e];
  throw typeof r[e] == "function" && Ku(r, e) ? new Error('Cannot access method "' + e + '" as a property') : new Error('No access to property "' + e + '"');
}
function Bi(r, e, n) {
  if (zi(r) && _i(r, e))
    return r[e] = n, n;
  throw new Error('No access to property "' + e + '"');
}
function Xu(r, e) {
  return e in r;
}
function _i(r, e) {
  return !r || typeof r != "object" ? !1 : Ye(Hu, e) ? !0 : !(e in Object.prototype || e in Function.prototype);
}
function Ku(r, e) {
  return r == null || typeof r[e] != "function" || Ye(r, e) && Object.getPrototypeOf && e in Object.getPrototypeOf(r) ? !1 : Ye(Wu, e) ? !0 : !(e in Object.prototype || e in Function.prototype);
}
function zi(r) {
  return typeof r == "object" && r && r.constructor === Object;
}
var Hu = {
  length: !0,
  name: !0
}, Wu = {
  toString: !0,
  valueOf: !0,
  toLocaleString: !0
};
class ku {
  constructor(e) {
    this.wrappedObject = e;
  }
  keys() {
    return Object.keys(this.wrappedObject);
  }
  get(e) {
    return xi(this.wrappedObject, e);
  }
  set(e, n) {
    return Bi(this.wrappedObject, e, n), this;
  }
  has(e) {
    return Xu(this.wrappedObject, e);
  }
}
function ju(r) {
  return r ? r instanceof Map || r instanceof ku || typeof r.set == "function" && typeof r.get == "function" && typeof r.keys == "function" && typeof r.has == "function" : !1;
}
var Ti = function() {
  return Ti = an.create, an;
}, ro = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], eo = /* @__PURE__ */ rr("typed", ro, function(e) {
  var {
    BigNumber: n,
    Complex: i,
    DenseMatrix: t,
    Fraction: a
  } = e, o = Ti();
  return o.clear(), o.addTypes([
    {
      name: "number",
      test: $r
    },
    {
      name: "Complex",
      test: Gt
    },
    {
      name: "BigNumber",
      test: Pr
    },
    {
      name: "Fraction",
      test: Yt
    },
    {
      name: "Unit",
      test: di
    },
    // The following type matches a valid variable name, i.e., an alphanumeric
    // string starting with an alphabetic character. It is used (at least)
    // in the definition of the derivative() function, as the argument telling
    // what to differentiate over must (currently) be a variable.
    {
      name: "identifier",
      test: (v) => te && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(v)
    },
    {
      name: "string",
      test: te
    },
    {
      name: "Chain",
      test: Cu
    },
    {
      name: "Array",
      test: Mr
    },
    {
      name: "Matrix",
      test: _r
    },
    {
      name: "DenseMatrix",
      test: pi
    },
    {
      name: "SparseMatrix",
      test: mi
    },
    {
      name: "Range",
      test: gi
    },
    {
      name: "Index",
      test: wt
    },
    {
      name: "boolean",
      test: ru
    },
    {
      name: "ResultSet",
      test: eu
    },
    {
      name: "Help",
      test: tu
    },
    {
      name: "function",
      test: nu
    },
    {
      name: "Date",
      test: iu
    },
    {
      name: "RegExp",
      test: au
    },
    {
      name: "null",
      test: uu
    },
    {
      name: "undefined",
      test: ou
    },
    {
      name: "AccessorNode",
      test: su
    },
    {
      name: "ArrayNode",
      test: fu
    },
    {
      name: "AssignmentNode",
      test: cu
    },
    {
      name: "BlockNode",
      test: lu
    },
    {
      name: "ConditionalNode",
      test: vu
    },
    {
      name: "ConstantNode",
      test: hu
    },
    {
      name: "FunctionNode",
      test: pu
    },
    {
      name: "FunctionAssignmentNode",
      test: du
    },
    {
      name: "IndexNode",
      test: mu
    },
    {
      name: "Node",
      test: gu
    },
    {
      name: "ObjectNode",
      test: Du
    },
    {
      name: "OperatorNode",
      test: yu
    },
    {
      name: "ParenthesisNode",
      test: wu
    },
    {
      name: "RangeNode",
      test: Au
    },
    {
      name: "RelationalNode",
      test: Eu
    },
    {
      name: "SymbolNode",
      test: Fu
    },
    {
      name: "Map",
      test: ju
    },
    {
      name: "Object",
      test: Di
    }
    // order 'Object' last, it matches on other classes too
  ]), o.addConversions([{
    from: "number",
    to: "BigNumber",
    convert: function(c) {
      if (n || zt(c), Ou(c) > 15)
        throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + c + "). Use function bignumber(x) to convert to BigNumber.");
      return new n(c);
    }
  }, {
    from: "number",
    to: "Complex",
    convert: function(c) {
      return i || at(c), new i(c, 0);
    }
  }, {
    from: "BigNumber",
    to: "Complex",
    convert: function(c) {
      return i || at(c), new i(c.toNumber(), 0);
    }
  }, {
    from: "Fraction",
    to: "BigNumber",
    convert: function(c) {
      throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
    }
  }, {
    from: "Fraction",
    to: "Complex",
    convert: function(c) {
      return i || at(c), new i(c.valueOf(), 0);
    }
  }, {
    from: "number",
    to: "Fraction",
    convert: function(c) {
      a || Tt(c);
      var l = new a(c);
      if (l.valueOf() !== c)
        throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + c + "). Use function fraction(x) to convert to Fraction.");
      return l;
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: "string",
    to: "number",
    convert: function(c) {
      var l = Number(c);
      if (isNaN(l))
        throw new Error('Cannot convert "' + c + '" to a number');
      return l;
    }
  }, {
    from: "string",
    to: "BigNumber",
    convert: function(c) {
      n || zt(c);
      try {
        return new n(c);
      } catch {
        throw new Error('Cannot convert "' + c + '" to BigNumber');
      }
    }
  }, {
    from: "string",
    to: "Fraction",
    convert: function(c) {
      a || Tt(c);
      try {
        return new a(c);
      } catch {
        throw new Error('Cannot convert "' + c + '" to Fraction');
      }
    }
  }, {
    from: "string",
    to: "Complex",
    convert: function(c) {
      i || at(c);
      try {
        return new i(c);
      } catch {
        throw new Error('Cannot convert "' + c + '" to Complex');
      }
    }
  }, {
    from: "boolean",
    to: "number",
    convert: function(c) {
      return +c;
    }
  }, {
    from: "boolean",
    to: "BigNumber",
    convert: function(c) {
      return n || zt(c), new n(+c);
    }
  }, {
    from: "boolean",
    to: "Fraction",
    convert: function(c) {
      return a || Tt(c), new a(+c);
    }
  }, {
    from: "boolean",
    to: "string",
    convert: function(c) {
      return String(c);
    }
  }, {
    from: "Array",
    to: "Matrix",
    convert: function(c) {
      return t || to(), new t(c);
    }
  }, {
    from: "Matrix",
    to: "Array",
    convert: function(c) {
      return c.valueOf();
    }
  }]), o.onMismatch = (v, c, l) => {
    var s = o.createError(v, c, l);
    if (["wrongType", "mismatch"].includes(s.data.category) && c.length === 1 && ot(c[0]) && // check if the function can be unary:
    l.some((f) => !f.params.includes(","))) {
      var u = new TypeError("Function '".concat(v, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(v, ")'."));
      throw u.data = s.data, u;
    }
    throw s;
  }, o.onMismatch = (v, c, l) => {
    var s = o.createError(v, c, l);
    if (["wrongType", "mismatch"].includes(s.data.category) && c.length === 1 && ot(c[0]) && // check if the function can be unary:
    l.some((f) => !f.params.includes(","))) {
      var u = new TypeError("Function '".concat(v, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(v, ")'."));
      throw u.data = s.data, u;
    }
    throw s;
  }, o;
});
function zt(r) {
  throw new Error("Cannot convert value ".concat(r, " into a BigNumber: no class 'BigNumber' provided"));
}
function at(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Complex number: no class 'Complex' provided"));
}
function to() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function Tt(r) {
  throw new Error("Cannot convert value ".concat(r, " into a Fraction, no class 'Fraction' provided."));
}
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var _e = 9e15, Ee = 1e9, qt = "0123456789abcdef", lt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", vt = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Lt = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -_e,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: _e,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, Oi, he, mr = !0, Ft = "[DecimalError] ", Ae = Ft + "Invalid argument: ", Ii = Ft + "Precision limit exceeded", $i = Ft + "crypto unavailable", qi = "[object Decimal]", Jr = Math.floor, Vr = Math.pow, no = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, io = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, ao = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Li = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ue = 1e7, hr = 7, uo = 9007199254740991, oo = lt.length - 1, Pt = vt.length - 1, W = { toStringTag: qi };
W.absoluteValue = W.abs = function() {
  var r = new this.constructor(this);
  return r.s < 0 && (r.s = 1), vr(r);
};
W.ceil = function() {
  return vr(new this.constructor(this), this.e + 1, 2);
};
W.clampedTo = W.clamp = function(r, e) {
  var n, i = this, t = i.constructor;
  if (r = new t(r), e = new t(e), !r.s || !e.s)
    return new t(NaN);
  if (r.gt(e))
    throw Error(Ae + e);
  return n = i.cmp(r), n < 0 ? r : i.cmp(e) > 0 ? e : new t(i);
};
W.comparedTo = W.cmp = function(r) {
  var e, n, i, t, a = this, o = a.d, v = (r = new a.constructor(r)).d, c = a.s, l = r.s;
  if (!o || !v)
    return !c || !l ? NaN : c !== l ? c : o === v ? 0 : !o ^ c < 0 ? 1 : -1;
  if (!o[0] || !v[0])
    return o[0] ? c : v[0] ? -l : 0;
  if (c !== l)
    return c;
  if (a.e !== r.e)
    return a.e > r.e ^ c < 0 ? 1 : -1;
  for (i = o.length, t = v.length, e = 0, n = i < t ? i : t; e < n; ++e)
    if (o[e] !== v[e])
      return o[e] > v[e] ^ c < 0 ? 1 : -1;
  return i === t ? 0 : i > t ^ c < 0 ? 1 : -1;
};
W.cosine = W.cos = function() {
  var r, e, n = this, i = n.constructor;
  return n.d ? n.d[0] ? (r = i.precision, e = i.rounding, i.precision = r + Math.max(n.e, n.sd()) + hr, i.rounding = 1, n = so(i, Zi(i, n)), i.precision = r, i.rounding = e, vr(he == 2 || he == 3 ? n.neg() : n, r, e, !0)) : new i(1) : new i(NaN);
};
W.cubeRoot = W.cbrt = function() {
  var r, e, n, i, t, a, o, v, c, l, s = this, u = s.constructor;
  if (!s.isFinite() || s.isZero())
    return new u(s);
  for (mr = !1, a = s.s * Vr(s.s * s, 1 / 3), !a || Math.abs(a) == 1 / 0 ? (n = Gr(s.d), r = s.e, (a = (r - n.length + 1) % 3) && (n += a == 1 || a == -2 ? "0" : "00"), a = Vr(n, 1 / 3), r = Jr((r + 1) / 3) - (r % 3 == (r < 0 ? -1 : 2)), a == 1 / 0 ? n = "5e" + r : (n = a.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + r), i = new u(n), i.s = s.s) : i = new u(a.toString()), o = (r = u.precision) + 3; ; )
    if (v = i, c = v.times(v).times(v), l = c.plus(s), i = Tr(l.plus(s).times(v), l.plus(c), o + 2, 1), Gr(v.d).slice(0, o) === (n = Gr(i.d)).slice(0, o))
      if (n = n.slice(o - 3, o + 1), n == "9999" || !t && n == "4999") {
        if (!t && (vr(v, r + 1, 0), v.times(v).times(v).eq(s))) {
          i = v;
          break;
        }
        o += 4, t = 1;
      } else {
        (!+n || !+n.slice(1) && n.charAt(0) == "5") && (vr(i, r + 1, 1), e = !i.times(i).times(i).eq(s));
        break;
      }
  return mr = !0, vr(i, r, u.rounding, e);
};
W.decimalPlaces = W.dp = function() {
  var r, e = this.d, n = NaN;
  if (e) {
    if (r = e.length - 1, n = (r - Jr(this.e / hr)) * hr, r = e[r], r)
      for (; r % 10 == 0; r /= 10)
        n--;
    n < 0 && (n = 0);
  }
  return n;
};
W.dividedBy = W.div = function(r) {
  return Tr(this, new this.constructor(r));
};
W.dividedToIntegerBy = W.divToInt = function(r) {
  var e = this, n = e.constructor;
  return vr(Tr(e, new n(r), 0, 1, 1), n.precision, n.rounding);
};
W.equals = W.eq = function(r) {
  return this.cmp(r) === 0;
};
W.floor = function() {
  return vr(new this.constructor(this), this.e + 1, 3);
};
W.greaterThan = W.gt = function(r) {
  return this.cmp(r) > 0;
};
W.greaterThanOrEqualTo = W.gte = function(r) {
  var e = this.cmp(r);
  return e == 1 || e === 0;
};
W.hyperbolicCosine = W.cosh = function() {
  var r, e, n, i, t, a = this, o = a.constructor, v = new o(1);
  if (!a.isFinite())
    return new o(a.s ? 1 / 0 : NaN);
  if (a.isZero())
    return v;
  n = o.precision, i = o.rounding, o.precision = n + Math.max(a.e, a.sd()) + 4, o.rounding = 1, t = a.d.length, t < 32 ? (r = Math.ceil(t / 3), e = (1 / bt(4, r)).toString()) : (r = 16, e = "2.3283064365386962890625e-10"), a = qe(o, 1, a.times(e), new o(1), !0);
  for (var c, l = r, s = new o(8); l--; )
    c = a.times(a), a = v.minus(c.times(s.minus(c.times(s))));
  return vr(a, o.precision = n, o.rounding = i, !0);
};
W.hyperbolicSine = W.sinh = function() {
  var r, e, n, i, t = this, a = t.constructor;
  if (!t.isFinite() || t.isZero())
    return new a(t);
  if (e = a.precision, n = a.rounding, a.precision = e + Math.max(t.e, t.sd()) + 4, a.rounding = 1, i = t.d.length, i < 3)
    t = qe(a, 2, t, t, !0);
  else {
    r = 1.4 * Math.sqrt(i), r = r > 16 ? 16 : r | 0, t = t.times(1 / bt(5, r)), t = qe(a, 2, t, t, !0);
    for (var o, v = new a(5), c = new a(16), l = new a(20); r--; )
      o = t.times(t), t = t.times(v.plus(o.times(c.times(o).plus(l))));
  }
  return a.precision = e, a.rounding = n, vr(t, e, n, !0);
};
W.hyperbolicTangent = W.tanh = function() {
  var r, e, n = this, i = n.constructor;
  return n.isFinite() ? n.isZero() ? new i(n) : (r = i.precision, e = i.rounding, i.precision = r + 7, i.rounding = 1, Tr(n.sinh(), n.cosh(), i.precision = r, i.rounding = e)) : new i(n.s);
};
W.inverseCosine = W.acos = function() {
  var r, e = this, n = e.constructor, i = e.abs().cmp(1), t = n.precision, a = n.rounding;
  return i !== -1 ? i === 0 ? e.isNeg() ? ae(n, t, a) : new n(0) : new n(NaN) : e.isZero() ? ae(n, t + 4, a).times(0.5) : (n.precision = t + 6, n.rounding = 1, e = e.asin(), r = ae(n, t + 4, a).times(0.5), n.precision = t, n.rounding = a, r.minus(e));
};
W.inverseHyperbolicCosine = W.acosh = function() {
  var r, e, n = this, i = n.constructor;
  return n.lte(1) ? new i(n.eq(1) ? 0 : NaN) : n.isFinite() ? (r = i.precision, e = i.rounding, i.precision = r + Math.max(Math.abs(n.e), n.sd()) + 4, i.rounding = 1, mr = !1, n = n.times(n).minus(1).sqrt().plus(n), mr = !0, i.precision = r, i.rounding = e, n.ln()) : new i(n);
};
W.inverseHyperbolicSine = W.asinh = function() {
  var r, e, n = this, i = n.constructor;
  return !n.isFinite() || n.isZero() ? new i(n) : (r = i.precision, e = i.rounding, i.precision = r + 2 * Math.max(Math.abs(n.e), n.sd()) + 6, i.rounding = 1, mr = !1, n = n.times(n).plus(1).sqrt().plus(n), mr = !0, i.precision = r, i.rounding = e, n.ln());
};
W.inverseHyperbolicTangent = W.atanh = function() {
  var r, e, n, i, t = this, a = t.constructor;
  return t.isFinite() ? t.e >= 0 ? new a(t.abs().eq(1) ? t.s / 0 : t.isZero() ? t : NaN) : (r = a.precision, e = a.rounding, i = t.sd(), Math.max(i, r) < 2 * -t.e - 1 ? vr(new a(t), r, e, !0) : (a.precision = n = i - t.e, t = Tr(t.plus(1), new a(1).minus(t), n + r, 1), a.precision = r + 4, a.rounding = 1, t = t.ln(), a.precision = r, a.rounding = e, t.times(0.5))) : new a(NaN);
};
W.inverseSine = W.asin = function() {
  var r, e, n, i, t = this, a = t.constructor;
  return t.isZero() ? new a(t) : (e = t.abs().cmp(1), n = a.precision, i = a.rounding, e !== -1 ? e === 0 ? (r = ae(a, n + 4, i).times(0.5), r.s = t.s, r) : new a(NaN) : (a.precision = n + 6, a.rounding = 1, t = t.div(new a(1).minus(t.times(t)).sqrt().plus(1)).atan(), a.precision = n, a.rounding = i, t.times(2)));
};
W.inverseTangent = W.atan = function() {
  var r, e, n, i, t, a, o, v, c, l = this, s = l.constructor, u = s.precision, f = s.rounding;
  if (l.isFinite()) {
    if (l.isZero())
      return new s(l);
    if (l.abs().eq(1) && u + 4 <= Pt)
      return o = ae(s, u + 4, f).times(0.25), o.s = l.s, o;
  } else {
    if (!l.s)
      return new s(NaN);
    if (u + 4 <= Pt)
      return o = ae(s, u + 4, f).times(0.5), o.s = l.s, o;
  }
  for (s.precision = v = u + 10, s.rounding = 1, n = Math.min(28, v / hr + 2 | 0), r = n; r; --r)
    l = l.div(l.times(l).plus(1).sqrt().plus(1));
  for (mr = !1, e = Math.ceil(v / hr), i = 1, c = l.times(l), o = new s(l), t = l; r !== -1; )
    if (t = t.times(c), a = o.minus(t.div(i += 2)), t = t.times(c), o = a.plus(t.div(i += 2)), o.d[e] !== void 0)
      for (r = e; o.d[r] === a.d[r] && r--; )
        ;
  return n && (o = o.times(2 << n - 1)), mr = !0, vr(o, s.precision = u, s.rounding = f, !0);
};
W.isFinite = function() {
  return !!this.d;
};
W.isInteger = W.isInt = function() {
  return !!this.d && Jr(this.e / hr) > this.d.length - 2;
};
W.isNaN = function() {
  return !this.s;
};
W.isNegative = W.isNeg = function() {
  return this.s < 0;
};
W.isPositive = W.isPos = function() {
  return this.s > 0;
};
W.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
W.lessThan = W.lt = function(r) {
  return this.cmp(r) < 0;
};
W.lessThanOrEqualTo = W.lte = function(r) {
  return this.cmp(r) < 1;
};
W.logarithm = W.log = function(r) {
  var e, n, i, t, a, o, v, c, l = this, s = l.constructor, u = s.precision, f = s.rounding, d = 5;
  if (r == null)
    r = new s(10), e = !0;
  else {
    if (r = new s(r), n = r.d, r.s < 0 || !n || !n[0] || r.eq(1))
      return new s(NaN);
    e = r.eq(10);
  }
  if (n = l.d, l.s < 0 || !n || !n[0] || l.eq(1))
    return new s(n && !n[0] ? -1 / 0 : l.s != 1 ? NaN : n ? 0 : 1 / 0);
  if (e)
    if (n.length > 1)
      a = !0;
    else {
      for (t = n[0]; t % 10 === 0; )
        t /= 10;
      a = t !== 1;
    }
  if (mr = !1, v = u + d, o = ye(l, v), i = e ? ht(s, v + 10) : ye(r, v), c = Tr(o, i, v, 1), Qe(c.d, t = u, f))
    do
      if (v += 10, o = ye(l, v), i = e ? ht(s, v + 10) : ye(r, v), c = Tr(o, i, v, 1), !a) {
        +Gr(c.d).slice(t + 1, t + 15) + 1 == 1e14 && (c = vr(c, u + 1, 0));
        break;
      }
    while (Qe(c.d, t += 10, f));
  return mr = !0, vr(c, u, f);
};
W.minus = W.sub = function(r) {
  var e, n, i, t, a, o, v, c, l, s, u, f, d = this, D = d.constructor;
  if (r = new D(r), !d.d || !r.d)
    return !d.s || !r.s ? r = new D(NaN) : d.d ? r.s = -r.s : r = new D(r.d || d.s !== r.s ? d : NaN), r;
  if (d.s != r.s)
    return r.s = -r.s, d.plus(r);
  if (l = d.d, f = r.d, v = D.precision, c = D.rounding, !l[0] || !f[0]) {
    if (f[0])
      r.s = -r.s;
    else if (l[0])
      r = new D(d);
    else
      return new D(c === 3 ? -0 : 0);
    return mr ? vr(r, v, c) : r;
  }
  if (n = Jr(r.e / hr), s = Jr(d.e / hr), l = l.slice(), a = s - n, a) {
    for (u = a < 0, u ? (e = l, a = -a, o = f.length) : (e = f, n = s, o = l.length), i = Math.max(Math.ceil(v / hr), o) + 2, a > i && (a = i, e.length = 1), e.reverse(), i = a; i--; )
      e.push(0);
    e.reverse();
  } else {
    for (i = l.length, o = f.length, u = i < o, u && (o = i), i = 0; i < o; i++)
      if (l[i] != f[i]) {
        u = l[i] < f[i];
        break;
      }
    a = 0;
  }
  for (u && (e = l, l = f, f = e, r.s = -r.s), o = l.length, i = f.length - o; i > 0; --i)
    l[o++] = 0;
  for (i = f.length; i > a; ) {
    if (l[--i] < f[i]) {
      for (t = i; t && l[--t] === 0; )
        l[t] = ue - 1;
      --l[t], l[i] += ue;
    }
    l[i] -= f[i];
  }
  for (; l[--o] === 0; )
    l.pop();
  for (; l[0] === 0; l.shift())
    --n;
  return l[0] ? (r.d = l, r.e = Ct(l, n), mr ? vr(r, v, c) : r) : new D(c === 3 ? -0 : 0);
};
W.modulo = W.mod = function(r) {
  var e, n = this, i = n.constructor;
  return r = new i(r), !n.d || !r.s || r.d && !r.d[0] ? new i(NaN) : !r.d || n.d && !n.d[0] ? vr(new i(n), i.precision, i.rounding) : (mr = !1, i.modulo == 9 ? (e = Tr(n, r.abs(), 0, 3, 1), e.s *= r.s) : e = Tr(n, r, 0, i.modulo, 1), e = e.times(r), mr = !0, n.minus(e));
};
W.naturalExponential = W.exp = function() {
  return Rt(this);
};
W.naturalLogarithm = W.ln = function() {
  return ye(this);
};
W.negated = W.neg = function() {
  var r = new this.constructor(this);
  return r.s = -r.s, vr(r);
};
W.plus = W.add = function(r) {
  var e, n, i, t, a, o, v, c, l, s, u = this, f = u.constructor;
  if (r = new f(r), !u.d || !r.d)
    return !u.s || !r.s ? r = new f(NaN) : u.d || (r = new f(r.d || u.s === r.s ? u : NaN)), r;
  if (u.s != r.s)
    return r.s = -r.s, u.minus(r);
  if (l = u.d, s = r.d, v = f.precision, c = f.rounding, !l[0] || !s[0])
    return s[0] || (r = new f(u)), mr ? vr(r, v, c) : r;
  if (a = Jr(u.e / hr), i = Jr(r.e / hr), l = l.slice(), t = a - i, t) {
    for (t < 0 ? (n = l, t = -t, o = s.length) : (n = s, i = a, o = l.length), a = Math.ceil(v / hr), o = a > o ? a + 1 : o + 1, t > o && (t = o, n.length = 1), n.reverse(); t--; )
      n.push(0);
    n.reverse();
  }
  for (o = l.length, t = s.length, o - t < 0 && (t = o, n = s, s = l, l = n), e = 0; t; )
    e = (l[--t] = l[t] + s[t] + e) / ue | 0, l[t] %= ue;
  for (e && (l.unshift(e), ++i), o = l.length; l[--o] == 0; )
    l.pop();
  return r.d = l, r.e = Ct(l, i), mr ? vr(r, v, c) : r;
};
W.precision = W.sd = function(r) {
  var e, n = this;
  if (r !== void 0 && r !== !!r && r !== 1 && r !== 0)
    throw Error(Ae + r);
  return n.d ? (e = Pi(n.d), r && n.e + 1 > e && (e = n.e + 1)) : e = NaN, e;
};
W.round = function() {
  var r = this, e = r.constructor;
  return vr(new e(r), r.e + 1, e.rounding);
};
W.sine = W.sin = function() {
  var r, e, n = this, i = n.constructor;
  return n.isFinite() ? n.isZero() ? new i(n) : (r = i.precision, e = i.rounding, i.precision = r + Math.max(n.e, n.sd()) + hr, i.rounding = 1, n = co(i, Zi(i, n)), i.precision = r, i.rounding = e, vr(he > 2 ? n.neg() : n, r, e, !0)) : new i(NaN);
};
W.squareRoot = W.sqrt = function() {
  var r, e, n, i, t, a, o = this, v = o.d, c = o.e, l = o.s, s = o.constructor;
  if (l !== 1 || !v || !v[0])
    return new s(!l || l < 0 && (!v || v[0]) ? NaN : v ? o : 1 / 0);
  for (mr = !1, l = Math.sqrt(+o), l == 0 || l == 1 / 0 ? (e = Gr(v), (e.length + c) % 2 == 0 && (e += "0"), l = Math.sqrt(e), c = Jr((c + 1) / 2) - (c < 0 || c % 2), l == 1 / 0 ? e = "5e" + c : (e = l.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + c), i = new s(e)) : i = new s(l.toString()), n = (c = s.precision) + 3; ; )
    if (a = i, i = a.plus(Tr(o, a, n + 2, 1)).times(0.5), Gr(a.d).slice(0, n) === (e = Gr(i.d)).slice(0, n))
      if (e = e.slice(n - 3, n + 1), e == "9999" || !t && e == "4999") {
        if (!t && (vr(a, c + 1, 0), a.times(a).eq(o))) {
          i = a;
          break;
        }
        n += 4, t = 1;
      } else {
        (!+e || !+e.slice(1) && e.charAt(0) == "5") && (vr(i, c + 1, 1), r = !i.times(i).eq(o));
        break;
      }
  return mr = !0, vr(i, c, s.rounding, r);
};
W.tangent = W.tan = function() {
  var r, e, n = this, i = n.constructor;
  return n.isFinite() ? n.isZero() ? new i(n) : (r = i.precision, e = i.rounding, i.precision = r + 10, i.rounding = 1, n = n.sin(), n.s = 1, n = Tr(n, new i(1).minus(n.times(n)).sqrt(), r + 10, 0), i.precision = r, i.rounding = e, vr(he == 2 || he == 4 ? n.neg() : n, r, e, !0)) : new i(NaN);
};
W.times = W.mul = function(r) {
  var e, n, i, t, a, o, v, c, l, s = this, u = s.constructor, f = s.d, d = (r = new u(r)).d;
  if (r.s *= s.s, !f || !f[0] || !d || !d[0])
    return new u(!r.s || f && !f[0] && !d || d && !d[0] && !f ? NaN : !f || !d ? r.s / 0 : r.s * 0);
  for (n = Jr(s.e / hr) + Jr(r.e / hr), c = f.length, l = d.length, c < l && (a = f, f = d, d = a, o = c, c = l, l = o), a = [], o = c + l, i = o; i--; )
    a.push(0);
  for (i = l; --i >= 0; ) {
    for (e = 0, t = c + i; t > i; )
      v = a[t] + d[i] * f[t - i - 1] + e, a[t--] = v % ue | 0, e = v / ue | 0;
    a[t] = (a[t] + e) % ue | 0;
  }
  for (; !a[--o]; )
    a.pop();
  return e ? ++n : a.shift(), r.d = a, r.e = Ct(a, n), mr ? vr(r, u.precision, u.rounding) : r;
};
W.toBinary = function(r, e) {
  return Xt(this, 2, r, e);
};
W.toDecimalPlaces = W.toDP = function(r, e) {
  var n = this, i = n.constructor;
  return n = new i(n), r === void 0 ? n : (Wr(r, 0, Ee), e === void 0 ? e = i.rounding : Wr(e, 0, 8), vr(n, r + n.e + 1, e));
};
W.toExponential = function(r, e) {
  var n, i = this, t = i.constructor;
  return r === void 0 ? n = le(i, !0) : (Wr(r, 0, Ee), e === void 0 ? e = t.rounding : Wr(e, 0, 8), i = vr(new t(i), r + 1, e), n = le(i, !0, r + 1)), i.isNeg() && !i.isZero() ? "-" + n : n;
};
W.toFixed = function(r, e) {
  var n, i, t = this, a = t.constructor;
  return r === void 0 ? n = le(t) : (Wr(r, 0, Ee), e === void 0 ? e = a.rounding : Wr(e, 0, 8), i = vr(new a(t), r + t.e + 1, e), n = le(i, !1, r + i.e + 1)), t.isNeg() && !t.isZero() ? "-" + n : n;
};
W.toFraction = function(r) {
  var e, n, i, t, a, o, v, c, l, s, u, f, d = this, D = d.d, h = d.constructor;
  if (!D)
    return new h(d);
  if (l = n = new h(1), i = c = new h(0), e = new h(i), a = e.e = Pi(D) - d.e - 1, o = a % hr, e.d[0] = Vr(10, o < 0 ? hr + o : o), r == null)
    r = a > 0 ? e : l;
  else {
    if (v = new h(r), !v.isInt() || v.lt(l))
      throw Error(Ae + v);
    r = v.gt(e) ? a > 0 ? e : l : v;
  }
  for (mr = !1, v = new h(Gr(D)), s = h.precision, h.precision = a = D.length * hr * 2; u = Tr(v, e, 0, 1, 1), t = n.plus(u.times(i)), t.cmp(r) != 1; )
    n = i, i = t, t = l, l = c.plus(u.times(t)), c = t, t = e, e = v.minus(u.times(t)), v = t;
  return t = Tr(r.minus(n), i, 0, 1, 1), c = c.plus(t.times(l)), n = n.plus(t.times(i)), c.s = l.s = d.s, f = Tr(l, i, a, 1).minus(d).abs().cmp(Tr(c, n, a, 1).minus(d).abs()) < 1 ? [l, i] : [c, n], h.precision = s, mr = !0, f;
};
W.toHexadecimal = W.toHex = function(r, e) {
  return Xt(this, 16, r, e);
};
W.toNearest = function(r, e) {
  var n = this, i = n.constructor;
  if (n = new i(n), r == null) {
    if (!n.d)
      return n;
    r = new i(1), e = i.rounding;
  } else {
    if (r = new i(r), e === void 0 ? e = i.rounding : Wr(e, 0, 8), !n.d)
      return r.s ? n : r;
    if (!r.d)
      return r.s && (r.s = n.s), r;
  }
  return r.d[0] ? (mr = !1, n = Tr(n, r, 0, e, 1).times(r), mr = !0, vr(n)) : (r.s = n.s, n = r), n;
};
W.toNumber = function() {
  return +this;
};
W.toOctal = function(r, e) {
  return Xt(this, 8, r, e);
};
W.toPower = W.pow = function(r) {
  var e, n, i, t, a, o, v = this, c = v.constructor, l = +(r = new c(r));
  if (!v.d || !r.d || !v.d[0] || !r.d[0])
    return new c(Vr(+v, l));
  if (v = new c(v), v.eq(1))
    return v;
  if (i = c.precision, a = c.rounding, r.eq(1))
    return vr(v, i, a);
  if (e = Jr(r.e / hr), e >= r.d.length - 1 && (n = l < 0 ? -l : l) <= uo)
    return t = Ri(c, v, n, i), r.s < 0 ? new c(1).div(t) : vr(t, i, a);
  if (o = v.s, o < 0) {
    if (e < r.d.length - 1)
      return new c(NaN);
    if (r.d[e] & 1 || (o = 1), v.e == 0 && v.d[0] == 1 && v.d.length == 1)
      return v.s = o, v;
  }
  return n = Vr(+v, l), e = n == 0 || !isFinite(n) ? Jr(l * (Math.log("0." + Gr(v.d)) / Math.LN10 + v.e + 1)) : new c(n + "").e, e > c.maxE + 1 || e < c.minE - 1 ? new c(e > 0 ? o / 0 : 0) : (mr = !1, c.rounding = v.s = 1, n = Math.min(12, (e + "").length), t = Rt(r.times(ye(v, i + n)), i), t.d && (t = vr(t, i + 5, 1), Qe(t.d, i, a) && (e = i + 10, t = vr(Rt(r.times(ye(v, e + n)), e), e + 5, 1), +Gr(t.d).slice(i + 1, i + 15) + 1 == 1e14 && (t = vr(t, i + 1, 0)))), t.s = o, mr = !0, c.rounding = a, vr(t, i, a));
};
W.toPrecision = function(r, e) {
  var n, i = this, t = i.constructor;
  return r === void 0 ? n = le(i, i.e <= t.toExpNeg || i.e >= t.toExpPos) : (Wr(r, 1, Ee), e === void 0 ? e = t.rounding : Wr(e, 0, 8), i = vr(new t(i), r, e), n = le(i, r <= i.e || i.e <= t.toExpNeg, r)), i.isNeg() && !i.isZero() ? "-" + n : n;
};
W.toSignificantDigits = W.toSD = function(r, e) {
  var n = this, i = n.constructor;
  return r === void 0 ? (r = i.precision, e = i.rounding) : (Wr(r, 1, Ee), e === void 0 ? e = i.rounding : Wr(e, 0, 8)), vr(new i(n), r, e);
};
W.toString = function() {
  var r = this, e = r.constructor, n = le(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
  return r.isNeg() && !r.isZero() ? "-" + n : n;
};
W.truncated = W.trunc = function() {
  return vr(new this.constructor(this), this.e + 1, 1);
};
W.valueOf = W.toJSON = function() {
  var r = this, e = r.constructor, n = le(r, r.e <= e.toExpNeg || r.e >= e.toExpPos);
  return r.isNeg() ? "-" + n : n;
};
function Gr(r) {
  var e, n, i, t = r.length - 1, a = "", o = r[0];
  if (t > 0) {
    for (a += o, e = 1; e < t; e++)
      i = r[e] + "", n = hr - i.length, n && (a += pe(n)), a += i;
    o = r[e], i = o + "", n = hr - i.length, n && (a += pe(n));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; )
    o /= 10;
  return a + o;
}
function Wr(r, e, n) {
  if (r !== ~~r || r < e || r > n)
    throw Error(Ae + r);
}
function Qe(r, e, n, i) {
  var t, a, o, v;
  for (a = r[0]; a >= 10; a /= 10)
    --e;
  return --e < 0 ? (e += hr, t = 0) : (t = Math.ceil((e + 1) / hr), e %= hr), a = Vr(10, hr - e), v = r[t] % a | 0, i == null ? e < 3 ? (e == 0 ? v = v / 100 | 0 : e == 1 && (v = v / 10 | 0), o = n < 4 && v == 99999 || n > 3 && v == 49999 || v == 5e4 || v == 0) : o = (n < 4 && v + 1 == a || n > 3 && v + 1 == a / 2) && (r[t + 1] / a / 100 | 0) == Vr(10, e - 2) - 1 || (v == a / 2 || v == 0) && (r[t + 1] / a / 100 | 0) == 0 : e < 4 ? (e == 0 ? v = v / 1e3 | 0 : e == 1 ? v = v / 100 | 0 : e == 2 && (v = v / 10 | 0), o = (i || n < 4) && v == 9999 || !i && n > 3 && v == 4999) : o = ((i || n < 4) && v + 1 == a || !i && n > 3 && v + 1 == a / 2) && (r[t + 1] / a / 1e3 | 0) == Vr(10, e - 3) - 1, o;
}
function ut(r, e, n) {
  for (var i, t = [0], a, o = 0, v = r.length; o < v; ) {
    for (a = t.length; a--; )
      t[a] *= e;
    for (t[0] += qt.indexOf(r.charAt(o++)), i = 0; i < t.length; i++)
      t[i] > n - 1 && (t[i + 1] === void 0 && (t[i + 1] = 0), t[i + 1] += t[i] / n | 0, t[i] %= n);
  }
  return t.reverse();
}
function so(r, e) {
  var n, i, t;
  if (e.isZero())
    return e;
  i = e.d.length, i < 32 ? (n = Math.ceil(i / 3), t = (1 / bt(4, n)).toString()) : (n = 16, t = "2.3283064365386962890625e-10"), r.precision += n, e = qe(r, 1, e.times(t), new r(1));
  for (var a = n; a--; ) {
    var o = e.times(e);
    e = o.times(o).minus(o).times(8).plus(1);
  }
  return r.precision -= n, e;
}
var Tr = /* @__PURE__ */ function() {
  function r(i, t, a) {
    var o, v = 0, c = i.length;
    for (i = i.slice(); c--; )
      o = i[c] * t + v, i[c] = o % a | 0, v = o / a | 0;
    return v && i.unshift(v), i;
  }
  function e(i, t, a, o) {
    var v, c;
    if (a != o)
      c = a > o ? 1 : -1;
    else
      for (v = c = 0; v < a; v++)
        if (i[v] != t[v]) {
          c = i[v] > t[v] ? 1 : -1;
          break;
        }
    return c;
  }
  function n(i, t, a, o) {
    for (var v = 0; a--; )
      i[a] -= v, v = i[a] < t[a] ? 1 : 0, i[a] = v * o + i[a] - t[a];
    for (; !i[0] && i.length > 1; )
      i.shift();
  }
  return function(i, t, a, o, v, c) {
    var l, s, u, f, d, D, h, m, p, w, g, E, F, y, C, b, A, S, M, N, O = i.constructor, T = i.s == t.s ? 1 : -1, I = i.d, B = t.d;
    if (!I || !I[0] || !B || !B[0])
      return new O(
        // Return NaN if either NaN, or both Infinity or 0.
        !i.s || !t.s || (I ? B && I[0] == B[0] : !B) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          I && I[0] == 0 || !B ? T * 0 : T / 0
        )
      );
    for (c ? (d = 1, s = i.e - t.e) : (c = ue, d = hr, s = Jr(i.e / d) - Jr(t.e / d)), M = B.length, A = I.length, p = new O(T), w = p.d = [], u = 0; B[u] == (I[u] || 0); u++)
      ;
    if (B[u] > (I[u] || 0) && s--, a == null ? (y = a = O.precision, o = O.rounding) : v ? y = a + (i.e - t.e) + 1 : y = a, y < 0)
      w.push(1), D = !0;
    else {
      if (y = y / d + 2 | 0, u = 0, M == 1) {
        for (f = 0, B = B[0], y++; (u < A || f) && y--; u++)
          C = f * c + (I[u] || 0), w[u] = C / B | 0, f = C % B | 0;
        D = f || u < A;
      } else {
        for (f = c / (B[0] + 1) | 0, f > 1 && (B = r(B, f, c), I = r(I, f, c), M = B.length, A = I.length), b = M, g = I.slice(0, M), E = g.length; E < M; )
          g[E++] = 0;
        N = B.slice(), N.unshift(0), S = B[0], B[1] >= c / 2 && ++S;
        do
          f = 0, l = e(B, g, M, E), l < 0 ? (F = g[0], M != E && (F = F * c + (g[1] || 0)), f = F / S | 0, f > 1 ? (f >= c && (f = c - 1), h = r(B, f, c), m = h.length, E = g.length, l = e(h, g, m, E), l == 1 && (f--, n(h, M < m ? N : B, m, c))) : (f == 0 && (l = f = 1), h = B.slice()), m = h.length, m < E && h.unshift(0), n(g, h, E, c), l == -1 && (E = g.length, l = e(B, g, M, E), l < 1 && (f++, n(g, M < E ? N : B, E, c))), E = g.length) : l === 0 && (f++, g = [0]), w[u++] = f, l && g[0] ? g[E++] = I[b] || 0 : (g = [I[b]], E = 1);
        while ((b++ < A || g[0] !== void 0) && y--);
        D = g[0] !== void 0;
      }
      w[0] || w.shift();
    }
    if (d == 1)
      p.e = s, Oi = D;
    else {
      for (u = 1, f = w[0]; f >= 10; f /= 10)
        u++;
      p.e = u + s * d - 1, vr(p, v ? a + p.e + 1 : a, o, D);
    }
    return p;
  };
}();
function vr(r, e, n, i) {
  var t, a, o, v, c, l, s, u, f, d = r.constructor;
  r:
    if (e != null) {
      if (u = r.d, !u)
        return r;
      for (t = 1, v = u[0]; v >= 10; v /= 10)
        t++;
      if (a = e - t, a < 0)
        a += hr, o = e, s = u[f = 0], c = s / Vr(10, t - o - 1) % 10 | 0;
      else if (f = Math.ceil((a + 1) / hr), v = u.length, f >= v)
        if (i) {
          for (; v++ <= f; )
            u.push(0);
          s = c = 0, t = 1, a %= hr, o = a - hr + 1;
        } else
          break r;
      else {
        for (s = v = u[f], t = 1; v >= 10; v /= 10)
          t++;
        a %= hr, o = a - hr + t, c = o < 0 ? 0 : s / Vr(10, t - o - 1) % 10 | 0;
      }
      if (i = i || e < 0 || u[f + 1] !== void 0 || (o < 0 ? s : s % Vr(10, t - o - 1)), l = n < 4 ? (c || i) && (n == 0 || n == (r.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (n == 4 || i || n == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (a > 0 ? o > 0 ? s / Vr(10, t - o) : 0 : u[f - 1]) % 10 & 1 || n == (r.s < 0 ? 8 : 7)), e < 1 || !u[0])
        return u.length = 0, l ? (e -= r.e + 1, u[0] = Vr(10, (hr - e % hr) % hr), r.e = -e || 0) : u[0] = r.e = 0, r;
      if (a == 0 ? (u.length = f, v = 1, f--) : (u.length = f + 1, v = Vr(10, hr - a), u[f] = o > 0 ? (s / Vr(10, t - o) % Vr(10, o) | 0) * v : 0), l)
        for (; ; )
          if (f == 0) {
            for (a = 1, o = u[0]; o >= 10; o /= 10)
              a++;
            for (o = u[0] += v, v = 1; o >= 10; o /= 10)
              v++;
            a != v && (r.e++, u[0] == ue && (u[0] = 1));
            break;
          } else {
            if (u[f] += v, u[f] != ue)
              break;
            u[f--] = 0, v = 1;
          }
      for (a = u.length; u[--a] === 0; )
        u.pop();
    }
  return mr && (r.e > d.maxE ? (r.d = null, r.e = NaN) : r.e < d.minE && (r.e = 0, r.d = [0])), r;
}
function le(r, e, n) {
  if (!r.isFinite())
    return Vi(r);
  var i, t = r.e, a = Gr(r.d), o = a.length;
  return e ? (n && (i = n - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + pe(i) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (r.e < 0 ? "e" : "e+") + r.e) : t < 0 ? (a = "0." + pe(-t - 1) + a, n && (i = n - o) > 0 && (a += pe(i))) : t >= o ? (a += pe(t + 1 - o), n && (i = n - t - 1) > 0 && (a = a + "." + pe(i))) : ((i = t + 1) < o && (a = a.slice(0, i) + "." + a.slice(i)), n && (i = n - o) > 0 && (t + 1 === o && (a += "."), a += pe(i))), a;
}
function Ct(r, e) {
  var n = r[0];
  for (e *= hr; n >= 10; n /= 10)
    e++;
  return e;
}
function ht(r, e, n) {
  if (e > oo)
    throw mr = !0, n && (r.precision = n), Error(Ii);
  return vr(new r(lt), e, 1, !0);
}
function ae(r, e, n) {
  if (e > Pt)
    throw Error(Ii);
  return vr(new r(vt), e, n, !0);
}
function Pi(r) {
  var e = r.length - 1, n = e * hr + 1;
  if (e = r[e], e) {
    for (; e % 10 == 0; e /= 10)
      n--;
    for (e = r[0]; e >= 10; e /= 10)
      n++;
  }
  return n;
}
function pe(r) {
  for (var e = ""; r--; )
    e += "0";
  return e;
}
function Ri(r, e, n, i) {
  var t, a = new r(1), o = Math.ceil(i / hr + 4);
  for (mr = !1; ; ) {
    if (n % 2 && (a = a.times(e), hn(a.d, o) && (t = !0)), n = Jr(n / 2), n === 0) {
      n = a.d.length - 1, t && a.d[n] === 0 && ++a.d[n];
      break;
    }
    e = e.times(e), hn(e.d, o);
  }
  return mr = !0, a;
}
function vn(r) {
  return r.d[r.d.length - 1] & 1;
}
function Ui(r, e, n) {
  for (var i, t = new r(e[0]), a = 0; ++a < e.length; )
    if (i = new r(e[a]), i.s)
      t[n](i) && (t = i);
    else {
      t = i;
      break;
    }
  return t;
}
function Rt(r, e) {
  var n, i, t, a, o, v, c, l = 0, s = 0, u = 0, f = r.constructor, d = f.rounding, D = f.precision;
  if (!r.d || !r.d[0] || r.e > 17)
    return new f(r.d ? r.d[0] ? r.s < 0 ? 0 : 1 / 0 : 1 : r.s ? r.s < 0 ? 0 : r : NaN);
  for (e == null ? (mr = !1, c = D) : c = e, v = new f(0.03125); r.e > -2; )
    r = r.times(v), u += 5;
  for (i = Math.log(Vr(2, u)) / Math.LN10 * 2 + 5 | 0, c += i, n = a = o = new f(1), f.precision = c; ; ) {
    if (a = vr(a.times(r), c, 1), n = n.times(++s), v = o.plus(Tr(a, n, c, 1)), Gr(v.d).slice(0, c) === Gr(o.d).slice(0, c)) {
      for (t = u; t--; )
        o = vr(o.times(o), c, 1);
      if (e == null)
        if (l < 3 && Qe(o.d, c - i, d, l))
          f.precision = c += 10, n = a = v = new f(1), s = 0, l++;
        else
          return vr(o, f.precision = D, d, mr = !0);
      else
        return f.precision = D, o;
    }
    o = v;
  }
}
function ye(r, e) {
  var n, i, t, a, o, v, c, l, s, u, f, d = 1, D = 10, h = r, m = h.d, p = h.constructor, w = p.rounding, g = p.precision;
  if (h.s < 0 || !m || !m[0] || !h.e && m[0] == 1 && m.length == 1)
    return new p(m && !m[0] ? -1 / 0 : h.s != 1 ? NaN : m ? 0 : h);
  if (e == null ? (mr = !1, s = g) : s = e, p.precision = s += D, n = Gr(m), i = n.charAt(0), Math.abs(a = h.e) < 15e14) {
    for (; i < 7 && i != 1 || i == 1 && n.charAt(1) > 3; )
      h = h.times(r), n = Gr(h.d), i = n.charAt(0), d++;
    a = h.e, i > 1 ? (h = new p("0." + n), a++) : h = new p(i + "." + n.slice(1));
  } else
    return l = ht(p, s + 2, g).times(a + ""), h = ye(new p(i + "." + n.slice(1)), s - D).plus(l), p.precision = g, e == null ? vr(h, g, w, mr = !0) : h;
  for (u = h, c = o = h = Tr(h.minus(1), h.plus(1), s, 1), f = vr(h.times(h), s, 1), t = 3; ; ) {
    if (o = vr(o.times(f), s, 1), l = c.plus(Tr(o, new p(t), s, 1)), Gr(l.d).slice(0, s) === Gr(c.d).slice(0, s))
      if (c = c.times(2), a !== 0 && (c = c.plus(ht(p, s + 2, g).times(a + ""))), c = Tr(c, new p(d), s, 1), e == null)
        if (Qe(c.d, s - D, w, v))
          p.precision = s += D, l = o = h = Tr(u.minus(1), u.plus(1), s, 1), f = vr(h.times(h), s, 1), t = v = 1;
        else
          return vr(c, p.precision = g, w, mr = !0);
      else
        return p.precision = g, c;
    c = l, t += 2;
  }
}
function Vi(r) {
  return String(r.s * r.s / 0);
}
function Ut(r, e) {
  var n, i, t;
  for ((n = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (i = e.search(/e/i)) > 0 ? (n < 0 && (n = i), n += +e.slice(i + 1), e = e.substring(0, i)) : n < 0 && (n = e.length), i = 0; e.charCodeAt(i) === 48; i++)
    ;
  for (t = e.length; e.charCodeAt(t - 1) === 48; --t)
    ;
  if (e = e.slice(i, t), e) {
    if (t -= i, r.e = n = n - i - 1, r.d = [], i = (n + 1) % hr, n < 0 && (i += hr), i < t) {
      for (i && r.d.push(+e.slice(0, i)), t -= hr; i < t; )
        r.d.push(+e.slice(i, i += hr));
      e = e.slice(i), i = hr - e.length;
    } else
      i -= t;
    for (; i--; )
      e += "0";
    r.d.push(+e), mr && (r.e > r.constructor.maxE ? (r.d = null, r.e = NaN) : r.e < r.constructor.minE && (r.e = 0, r.d = [0]));
  } else
    r.e = 0, r.d = [0];
  return r;
}
function fo(r, e) {
  var n, i, t, a, o, v, c, l, s;
  if (e.indexOf("_") > -1) {
    if (e = e.replace(/(\d)_(?=\d)/g, "$1"), Li.test(e))
      return Ut(r, e);
  } else if (e === "Infinity" || e === "NaN")
    return +e || (r.s = NaN), r.e = NaN, r.d = null, r;
  if (io.test(e))
    n = 16, e = e.toLowerCase();
  else if (no.test(e))
    n = 2;
  else if (ao.test(e))
    n = 8;
  else
    throw Error(Ae + e);
  for (a = e.search(/p/i), a > 0 ? (c = +e.slice(a + 1), e = e.substring(2, a)) : e = e.slice(2), a = e.indexOf("."), o = a >= 0, i = r.constructor, o && (e = e.replace(".", ""), v = e.length, a = v - a, t = Ri(i, new i(n), a, a * 2)), l = ut(e, n, ue), s = l.length - 1, a = s; l[a] === 0; --a)
    l.pop();
  return a < 0 ? new i(r.s * 0) : (r.e = Ct(l, s), r.d = l, mr = !1, o && (r = Tr(r, t, v * 4)), c && (r = r.times(Math.abs(c) < 54 ? Vr(2, c) : Le.pow(2, c))), mr = !0, r);
}
function co(r, e) {
  var n, i = e.d.length;
  if (i < 3)
    return e.isZero() ? e : qe(r, 2, e, e);
  n = 1.4 * Math.sqrt(i), n = n > 16 ? 16 : n | 0, e = e.times(1 / bt(5, n)), e = qe(r, 2, e, e);
  for (var t, a = new r(5), o = new r(16), v = new r(20); n--; )
    t = e.times(e), e = e.times(a.plus(t.times(o.times(t).minus(v))));
  return e;
}
function qe(r, e, n, i, t) {
  var a, o, v, c, l = r.precision, s = Math.ceil(l / hr);
  for (mr = !1, c = n.times(n), v = new r(i); ; ) {
    if (o = Tr(v.times(c), new r(e++ * e++), l, 1), v = t ? i.plus(o) : i.minus(o), i = Tr(o.times(c), new r(e++ * e++), l, 1), o = v.plus(i), o.d[s] !== void 0) {
      for (a = s; o.d[a] === v.d[a] && a--; )
        ;
      if (a == -1)
        break;
    }
    a = v, v = i, i = o, o = a;
  }
  return mr = !0, o.d.length = s + 1, o;
}
function bt(r, e) {
  for (var n = r; --e; )
    n *= r;
  return n;
}
function Zi(r, e) {
  var n, i = e.s < 0, t = ae(r, r.precision, 1), a = t.times(0.5);
  if (e = e.abs(), e.lte(a))
    return he = i ? 4 : 1, e;
  if (n = e.divToInt(t), n.isZero())
    he = i ? 3 : 2;
  else {
    if (e = e.minus(n.times(t)), e.lte(a))
      return he = vn(n) ? i ? 2 : 3 : i ? 4 : 1, e;
    he = vn(n) ? i ? 1 : 4 : i ? 3 : 2;
  }
  return e.minus(t).abs();
}
function Xt(r, e, n, i) {
  var t, a, o, v, c, l, s, u, f, d = r.constructor, D = n !== void 0;
  if (D ? (Wr(n, 1, Ee), i === void 0 ? i = d.rounding : Wr(i, 0, 8)) : (n = d.precision, i = d.rounding), !r.isFinite())
    s = Vi(r);
  else {
    for (s = le(r), o = s.indexOf("."), D ? (t = 2, e == 16 ? n = n * 4 - 3 : e == 8 && (n = n * 3 - 2)) : t = e, o >= 0 && (s = s.replace(".", ""), f = new d(1), f.e = s.length - o, f.d = ut(le(f), 10, t), f.e = f.d.length), u = ut(s, 10, t), a = c = u.length; u[--c] == 0; )
      u.pop();
    if (!u[0])
      s = D ? "0p+0" : "0";
    else {
      if (o < 0 ? a-- : (r = new d(r), r.d = u, r.e = a, r = Tr(r, f, n, i, 0, t), u = r.d, a = r.e, l = Oi), o = u[n], v = t / 2, l = l || u[n + 1] !== void 0, l = i < 4 ? (o !== void 0 || l) && (i === 0 || i === (r.s < 0 ? 3 : 2)) : o > v || o === v && (i === 4 || l || i === 6 && u[n - 1] & 1 || i === (r.s < 0 ? 8 : 7)), u.length = n, l)
        for (; ++u[--n] > t - 1; )
          u[n] = 0, n || (++a, u.unshift(1));
      for (c = u.length; !u[c - 1]; --c)
        ;
      for (o = 0, s = ""; o < c; o++)
        s += qt.charAt(u[o]);
      if (D) {
        if (c > 1)
          if (e == 16 || e == 8) {
            for (o = e == 16 ? 4 : 3, --c; c % o; c++)
              s += "0";
            for (u = ut(s, t, e), c = u.length; !u[c - 1]; --c)
              ;
            for (o = 1, s = "1."; o < c; o++)
              s += qt.charAt(u[o]);
          } else
            s = s.charAt(0) + "." + s.slice(1);
        s = s + (a < 0 ? "p" : "p+") + a;
      } else if (a < 0) {
        for (; ++a; )
          s = "0" + s;
        s = "0." + s;
      } else if (++a > c)
        for (a -= c; a--; )
          s += "0";
      else
        a < c && (s = s.slice(0, a) + "." + s.slice(a));
    }
    s = (e == 16 ? "0x" : e == 2 ? "0b" : e == 8 ? "0o" : "") + s;
  }
  return r.s < 0 ? "-" + s : s;
}
function hn(r, e) {
  if (r.length > e)
    return r.length = e, !0;
}
function lo(r) {
  return new this(r).abs();
}
function vo(r) {
  return new this(r).acos();
}
function ho(r) {
  return new this(r).acosh();
}
function po(r, e) {
  return new this(r).plus(e);
}
function mo(r) {
  return new this(r).asin();
}
function go(r) {
  return new this(r).asinh();
}
function Do(r) {
  return new this(r).atan();
}
function yo(r) {
  return new this(r).atanh();
}
function wo(r, e) {
  r = new this(r), e = new this(e);
  var n, i = this.precision, t = this.rounding, a = i + 4;
  return !r.s || !e.s ? n = new this(NaN) : !r.d && !e.d ? (n = ae(this, a, 1).times(e.s > 0 ? 0.25 : 0.75), n.s = r.s) : !e.d || r.isZero() ? (n = e.s < 0 ? ae(this, i, t) : new this(0), n.s = r.s) : !r.d || e.isZero() ? (n = ae(this, a, 1).times(0.5), n.s = r.s) : e.s < 0 ? (this.precision = a, this.rounding = 1, n = this.atan(Tr(r, e, a, 1)), e = ae(this, a, 1), this.precision = i, this.rounding = t, n = r.s < 0 ? n.minus(e) : n.plus(e)) : n = this.atan(Tr(r, e, a, 1)), n;
}
function Ao(r) {
  return new this(r).cbrt();
}
function Eo(r) {
  return vr(r = new this(r), r.e + 1, 2);
}
function Fo(r, e, n) {
  return new this(r).clamp(e, n);
}
function Co(r) {
  if (!r || typeof r != "object")
    throw Error(Ft + "Object expected");
  var e, n, i, t = r.defaults === !0, a = [
    "precision",
    1,
    Ee,
    "rounding",
    0,
    8,
    "toExpNeg",
    -_e,
    0,
    "toExpPos",
    0,
    _e,
    "maxE",
    0,
    _e,
    "minE",
    -_e,
    0,
    "modulo",
    0,
    9
  ];
  for (e = 0; e < a.length; e += 3)
    if (n = a[e], t && (this[n] = Lt[n]), (i = r[n]) !== void 0)
      if (Jr(i) === i && i >= a[e + 1] && i <= a[e + 2])
        this[n] = i;
      else
        throw Error(Ae + n + ": " + i);
  if (n = "crypto", t && (this[n] = Lt[n]), (i = r[n]) !== void 0)
    if (i === !0 || i === !1 || i === 0 || i === 1)
      if (i)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[n] = !0;
        else
          throw Error($i);
      else
        this[n] = !1;
    else
      throw Error(Ae + n + ": " + i);
  return this;
}
function bo(r) {
  return new this(r).cos();
}
function Mo(r) {
  return new this(r).cosh();
}
function Gi(r) {
  var e, n, i;
  function t(a) {
    var o, v, c, l = this;
    if (!(l instanceof t))
      return new t(a);
    if (l.constructor = t, dn(a)) {
      l.s = a.s, mr ? !a.d || a.e > t.maxE ? (l.e = NaN, l.d = null) : a.e < t.minE ? (l.e = 0, l.d = [0]) : (l.e = a.e, l.d = a.d.slice()) : (l.e = a.e, l.d = a.d ? a.d.slice() : a.d);
      return;
    }
    if (c = typeof a, c === "number") {
      if (a === 0) {
        l.s = 1 / a < 0 ? -1 : 1, l.e = 0, l.d = [0];
        return;
      }
      if (a < 0 ? (a = -a, l.s = -1) : l.s = 1, a === ~~a && a < 1e7) {
        for (o = 0, v = a; v >= 10; v /= 10)
          o++;
        mr ? o > t.maxE ? (l.e = NaN, l.d = null) : o < t.minE ? (l.e = 0, l.d = [0]) : (l.e = o, l.d = [a]) : (l.e = o, l.d = [a]);
        return;
      } else if (a * 0 !== 0) {
        a || (l.s = NaN), l.e = NaN, l.d = null;
        return;
      }
      return Ut(l, a.toString());
    } else if (c !== "string")
      throw Error(Ae + a);
    return (v = a.charCodeAt(0)) === 45 ? (a = a.slice(1), l.s = -1) : (v === 43 && (a = a.slice(1)), l.s = 1), Li.test(a) ? Ut(l, a) : fo(l, a);
  }
  if (t.prototype = W, t.ROUND_UP = 0, t.ROUND_DOWN = 1, t.ROUND_CEIL = 2, t.ROUND_FLOOR = 3, t.ROUND_HALF_UP = 4, t.ROUND_HALF_DOWN = 5, t.ROUND_HALF_EVEN = 6, t.ROUND_HALF_CEIL = 7, t.ROUND_HALF_FLOOR = 8, t.EUCLID = 9, t.config = t.set = Co, t.clone = Gi, t.isDecimal = dn, t.abs = lo, t.acos = vo, t.acosh = ho, t.add = po, t.asin = mo, t.asinh = go, t.atan = Do, t.atanh = yo, t.atan2 = wo, t.cbrt = Ao, t.ceil = Eo, t.clamp = Fo, t.cos = bo, t.cosh = Mo, t.div = So, t.exp = No, t.floor = xo, t.hypot = Bo, t.ln = _o, t.log = zo, t.log10 = Oo, t.log2 = To, t.max = Io, t.min = $o, t.mod = qo, t.mul = Lo, t.pow = Po, t.random = Ro, t.round = Uo, t.sign = Vo, t.sin = Zo, t.sinh = Go, t.sqrt = Yo, t.sub = Jo, t.sum = Qo, t.tan = Xo, t.tanh = Ko, t.trunc = Ho, r === void 0 && (r = {}), r && r.defaults !== !0)
    for (i = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], e = 0; e < i.length; )
      r.hasOwnProperty(n = i[e++]) || (r[n] = this[n]);
  return t.config(r), t;
}
function So(r, e) {
  return new this(r).div(e);
}
function No(r) {
  return new this(r).exp();
}
function xo(r) {
  return vr(r = new this(r), r.e + 1, 3);
}
function Bo() {
  var r, e, n = new this(0);
  for (mr = !1, r = 0; r < arguments.length; )
    if (e = new this(arguments[r++]), e.d)
      n.d && (n = n.plus(e.times(e)));
    else {
      if (e.s)
        return mr = !0, new this(1 / 0);
      n = e;
    }
  return mr = !0, n.sqrt();
}
function dn(r) {
  return r instanceof Le || r && r.toStringTag === qi || !1;
}
function _o(r) {
  return new this(r).ln();
}
function zo(r, e) {
  return new this(r).log(e);
}
function To(r) {
  return new this(r).log(2);
}
function Oo(r) {
  return new this(r).log(10);
}
function Io() {
  return Ui(this, arguments, "lt");
}
function $o() {
  return Ui(this, arguments, "gt");
}
function qo(r, e) {
  return new this(r).mod(e);
}
function Lo(r, e) {
  return new this(r).mul(e);
}
function Po(r, e) {
  return new this(r).pow(e);
}
function Ro(r) {
  var e, n, i, t, a = 0, o = new this(1), v = [];
  if (r === void 0 ? r = this.precision : Wr(r, 1, Ee), i = Math.ceil(r / hr), this.crypto)
    if (crypto.getRandomValues)
      for (e = crypto.getRandomValues(new Uint32Array(i)); a < i; )
        t = e[a], t >= 429e7 ? e[a] = crypto.getRandomValues(new Uint32Array(1))[0] : v[a++] = t % 1e7;
    else if (crypto.randomBytes) {
      for (e = crypto.randomBytes(i *= 4); a < i; )
        t = e[a] + (e[a + 1] << 8) + (e[a + 2] << 16) + ((e[a + 3] & 127) << 24), t >= 214e7 ? crypto.randomBytes(4).copy(e, a) : (v.push(t % 1e7), a += 4);
      a = i / 4;
    } else
      throw Error($i);
  else
    for (; a < i; )
      v[a++] = Math.random() * 1e7 | 0;
  for (i = v[--a], r %= hr, i && r && (t = Vr(10, hr - r), v[a] = (i / t | 0) * t); v[a] === 0; a--)
    v.pop();
  if (a < 0)
    n = 0, v = [0];
  else {
    for (n = -1; v[0] === 0; n -= hr)
      v.shift();
    for (i = 1, t = v[0]; t >= 10; t /= 10)
      i++;
    i < hr && (n -= hr - i);
  }
  return o.e = n, o.d = v, o;
}
function Uo(r) {
  return vr(r = new this(r), r.e + 1, this.rounding);
}
function Vo(r) {
  return r = new this(r), r.d ? r.d[0] ? r.s : 0 * r.s : r.s || NaN;
}
function Zo(r) {
  return new this(r).sin();
}
function Go(r) {
  return new this(r).sinh();
}
function Yo(r) {
  return new this(r).sqrt();
}
function Jo(r, e) {
  return new this(r).sub(e);
}
function Qo() {
  var r = 0, e = arguments, n = new this(e[r]);
  for (mr = !1; n.s && ++r < e.length; )
    n = n.plus(e[r]);
  return mr = !0, vr(n, this.precision, this.rounding);
}
function Xo(r) {
  return new this(r).tan();
}
function Ko(r) {
  return new this(r).tanh();
}
function Ho(r) {
  return vr(r = new this(r), r.e + 1, 1);
}
W[Symbol.for("nodejs.util.inspect.custom")] = W.toString;
W[Symbol.toStringTag] = "Decimal";
var Le = W.constructor = Gi(Lt);
lt = new Le(lt);
vt = new Le(vt);
var Wo = "BigNumber", ko = ["?on", "config"], jo = /* @__PURE__ */ rr(Wo, ko, (r) => {
  var {
    on: e,
    config: n
  } = r, i = Le.clone({
    precision: n.precision,
    modulo: Le.EUCLID
  });
  return i.prototype = Object.create(i.prototype), i.prototype.type = "BigNumber", i.prototype.isBigNumber = !0, i.prototype.toJSON = function() {
    return {
      mathjs: "BigNumber",
      value: this.toString()
    };
  }, i.fromJSON = function(t) {
    return new i(t.value);
  }, e && e("config", function(t, a) {
    t.precision !== a.precision && i.config({
      precision: t.precision
    });
  }), i;
}, {
  isClass: !0
});
function Yi(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Ji = { exports: {} };
/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(r, e) {
  (function(n) {
    var i = Math.cosh || function(u) {
      return Math.abs(u) < 1e-9 ? 1 - u : (Math.exp(u) + Math.exp(-u)) * 0.5;
    }, t = Math.sinh || function(u) {
      return Math.abs(u) < 1e-9 ? u : (Math.exp(u) - Math.exp(-u)) * 0.5;
    }, a = function(u) {
      var f = Math.PI / 4;
      if (-f > u || u > f)
        return Math.cos(u) - 1;
      var d = u * u;
      return d * (d * (d * (d * (d * (d * (d * (d / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    }, o = function(u, f) {
      var d = Math.abs(u), D = Math.abs(f);
      return d < 3e3 && D < 3e3 ? Math.sqrt(d * d + D * D) : (d < D ? (d = D, D = u / f) : D = f / u, d * Math.sqrt(1 + D * D));
    }, v = function() {
      throw SyntaxError("Invalid Param");
    };
    function c(u, f) {
      var d = Math.abs(u), D = Math.abs(f);
      return u === 0 ? Math.log(D) : f === 0 ? Math.log(d) : d < 3e3 && D < 3e3 ? Math.log(u * u + f * f) * 0.5 : (u = u / 2, f = f / 2, 0.5 * Math.log(u * u + f * f) + Math.LN2);
    }
    var l = function(u, f) {
      var d = { re: 0, im: 0 };
      if (u == null)
        d.re = d.im = 0;
      else if (f !== void 0)
        d.re = u, d.im = f;
      else
        switch (typeof u) {
          case "object":
            if ("im" in u && "re" in u)
              d.re = u.re, d.im = u.im;
            else if ("abs" in u && "arg" in u) {
              if (!Number.isFinite(u.abs) && Number.isFinite(u.arg))
                return s.INFINITY;
              d.re = u.abs * Math.cos(u.arg), d.im = u.abs * Math.sin(u.arg);
            } else if ("r" in u && "phi" in u) {
              if (!Number.isFinite(u.r) && Number.isFinite(u.phi))
                return s.INFINITY;
              d.re = u.r * Math.cos(u.phi), d.im = u.r * Math.sin(u.phi);
            } else
              u.length === 2 ? (d.re = u[0], d.im = u[1]) : v();
            break;
          case "string":
            d.im = /* void */
            d.re = 0;
            var D = u.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), h = 1, m = 0;
            D === null && v();
            for (var p = 0; p < D.length; p++) {
              var w = D[p];
              w === " " || w === "	" || w === `
` || (w === "+" ? h++ : w === "-" ? m++ : w === "i" || w === "I" ? (h + m === 0 && v(), D[p + 1] !== " " && !isNaN(D[p + 1]) ? (d.im += parseFloat((m % 2 ? "-" : "") + D[p + 1]), p++) : d.im += parseFloat((m % 2 ? "-" : "") + "1"), h = m = 0) : ((h + m === 0 || isNaN(w)) && v(), D[p + 1] === "i" || D[p + 1] === "I" ? (d.im += parseFloat((m % 2 ? "-" : "") + w), p++) : d.re += parseFloat((m % 2 ? "-" : "") + w), h = m = 0));
            }
            h + m > 0 && v();
            break;
          case "number":
            d.im = 0, d.re = u;
            break;
          default:
            v();
        }
      return isNaN(d.re) || isNaN(d.im), d;
    };
    function s(u, f) {
      if (!(this instanceof s))
        return new s(u, f);
      var d = l(u, f);
      this.re = d.re, this.im = d.im;
    }
    s.prototype = {
      re: 0,
      im: 0,
      /**
       * Calculates the sign of a complex number, which is a normalized complex
       *
       * @returns {Complex}
       */
      sign: function() {
        var u = this.abs();
        return new s(
          this.re / u,
          this.im / u
        );
      },
      /**
       * Adds two complex numbers
       *
       * @returns {Complex}
       */
      add: function(u, f) {
        var d = new s(u, f);
        return this.isInfinite() && d.isInfinite() ? s.NAN : this.isInfinite() || d.isInfinite() ? s.INFINITY : new s(
          this.re + d.re,
          this.im + d.im
        );
      },
      /**
       * Subtracts two complex numbers
       *
       * @returns {Complex}
       */
      sub: function(u, f) {
        var d = new s(u, f);
        return this.isInfinite() && d.isInfinite() ? s.NAN : this.isInfinite() || d.isInfinite() ? s.INFINITY : new s(
          this.re - d.re,
          this.im - d.im
        );
      },
      /**
       * Multiplies two complex numbers
       *
       * @returns {Complex}
       */
      mul: function(u, f) {
        var d = new s(u, f);
        return this.isInfinite() && d.isZero() || this.isZero() && d.isInfinite() ? s.NAN : this.isInfinite() || d.isInfinite() ? s.INFINITY : d.im === 0 && this.im === 0 ? new s(this.re * d.re, 0) : new s(
          this.re * d.re - this.im * d.im,
          this.re * d.im + this.im * d.re
        );
      },
      /**
       * Divides two complex numbers
       *
       * @returns {Complex}
       */
      div: function(u, f) {
        var d = new s(u, f);
        if (this.isZero() && d.isZero() || this.isInfinite() && d.isInfinite())
          return s.NAN;
        if (this.isInfinite() || d.isZero())
          return s.INFINITY;
        if (this.isZero() || d.isInfinite())
          return s.ZERO;
        u = this.re, f = this.im;
        var D = d.re, h = d.im, m, p;
        return h === 0 ? new s(u / D, f / D) : Math.abs(D) < Math.abs(h) ? (p = D / h, m = D * p + h, new s(
          (u * p + f) / m,
          (f * p - u) / m
        )) : (p = h / D, m = h * p + D, new s(
          (u + f * p) / m,
          (f - u * p) / m
        ));
      },
      /**
       * Calculate the power of two complex numbers
       *
       * @returns {Complex}
       */
      pow: function(u, f) {
        var d = new s(u, f);
        if (u = this.re, f = this.im, d.isZero())
          return s.ONE;
        if (d.im === 0) {
          if (f === 0 && u > 0)
            return new s(Math.pow(u, d.re), 0);
          if (u === 0)
            switch ((d.re % 4 + 4) % 4) {
              case 0:
                return new s(Math.pow(f, d.re), 0);
              case 1:
                return new s(0, Math.pow(f, d.re));
              case 2:
                return new s(-Math.pow(f, d.re), 0);
              case 3:
                return new s(0, -Math.pow(f, d.re));
            }
        }
        if (u === 0 && f === 0 && d.re > 0 && d.im >= 0)
          return s.ZERO;
        var D = Math.atan2(f, u), h = c(u, f);
        return u = Math.exp(d.re * h - d.im * D), f = d.im * h + d.re * D, new s(
          u * Math.cos(f),
          u * Math.sin(f)
        );
      },
      /**
       * Calculate the complex square root
       *
       * @returns {Complex}
       */
      sqrt: function() {
        var u = this.re, f = this.im, d = this.abs(), D, h;
        if (u >= 0) {
          if (f === 0)
            return new s(Math.sqrt(u), 0);
          D = 0.5 * Math.sqrt(2 * (d + u));
        } else
          D = Math.abs(f) / Math.sqrt(2 * (d - u));
        return u <= 0 ? h = 0.5 * Math.sqrt(2 * (d - u)) : h = Math.abs(f) / Math.sqrt(2 * (d + u)), new s(D, f < 0 ? -h : h);
      },
      /**
       * Calculate the complex exponent
       *
       * @returns {Complex}
       */
      exp: function() {
        var u = Math.exp(this.re);
        return this.im, new s(
          u * Math.cos(this.im),
          u * Math.sin(this.im)
        );
      },
      /**
       * Calculate the complex exponent and subtracts one.
       *
       * This may be more accurate than `Complex(x).exp().sub(1)` if
       * `x` is small.
       *
       * @returns {Complex}
       */
      expm1: function() {
        var u = this.re, f = this.im;
        return new s(
          Math.expm1(u) * Math.cos(f) + a(f),
          Math.exp(u) * Math.sin(f)
        );
      },
      /**
       * Calculate the natural log
       *
       * @returns {Complex}
       */
      log: function() {
        var u = this.re, f = this.im;
        return new s(
          c(u, f),
          Math.atan2(f, u)
        );
      },
      /**
       * Calculate the magnitude of the complex number
       *
       * @returns {number}
       */
      abs: function() {
        return o(this.re, this.im);
      },
      /**
       * Calculate the angle of the complex number
       *
       * @returns {number}
       */
      arg: function() {
        return Math.atan2(this.im, this.re);
      },
      /**
       * Calculate the sine of the complex number
       *
       * @returns {Complex}
       */
      sin: function() {
        var u = this.re, f = this.im;
        return new s(
          Math.sin(u) * i(f),
          Math.cos(u) * t(f)
        );
      },
      /**
       * Calculate the cosine
       *
       * @returns {Complex}
       */
      cos: function() {
        var u = this.re, f = this.im;
        return new s(
          Math.cos(u) * i(f),
          -Math.sin(u) * t(f)
        );
      },
      /**
       * Calculate the tangent
       *
       * @returns {Complex}
       */
      tan: function() {
        var u = 2 * this.re, f = 2 * this.im, d = Math.cos(u) + i(f);
        return new s(
          Math.sin(u) / d,
          t(f) / d
        );
      },
      /**
       * Calculate the cotangent
       *
       * @returns {Complex}
       */
      cot: function() {
        var u = 2 * this.re, f = 2 * this.im, d = Math.cos(u) - i(f);
        return new s(
          -Math.sin(u) / d,
          t(f) / d
        );
      },
      /**
       * Calculate the secant
       *
       * @returns {Complex}
       */
      sec: function() {
        var u = this.re, f = this.im, d = 0.5 * i(2 * f) + 0.5 * Math.cos(2 * u);
        return new s(
          Math.cos(u) * i(f) / d,
          Math.sin(u) * t(f) / d
        );
      },
      /**
       * Calculate the cosecans
       *
       * @returns {Complex}
       */
      csc: function() {
        var u = this.re, f = this.im, d = 0.5 * i(2 * f) - 0.5 * Math.cos(2 * u);
        return new s(
          Math.sin(u) * i(f) / d,
          -Math.cos(u) * t(f) / d
        );
      },
      /**
       * Calculate the complex arcus sinus
       *
       * @returns {Complex}
       */
      asin: function() {
        var u = this.re, f = this.im, d = new s(
          f * f - u * u + 1,
          -2 * u * f
        ).sqrt(), D = new s(
          d.re - f,
          d.im + u
        ).log();
        return new s(D.im, -D.re);
      },
      /**
       * Calculate the complex arcus cosinus
       *
       * @returns {Complex}
       */
      acos: function() {
        var u = this.re, f = this.im, d = new s(
          f * f - u * u + 1,
          -2 * u * f
        ).sqrt(), D = new s(
          d.re - f,
          d.im + u
        ).log();
        return new s(Math.PI / 2 - D.im, D.re);
      },
      /**
       * Calculate the complex arcus tangent
       *
       * @returns {Complex}
       */
      atan: function() {
        var u = this.re, f = this.im;
        if (u === 0) {
          if (f === 1)
            return new s(0, 1 / 0);
          if (f === -1)
            return new s(0, -1 / 0);
        }
        var d = u * u + (1 - f) * (1 - f), D = new s(
          (1 - f * f - u * u) / d,
          -2 * u / d
        ).log();
        return new s(-0.5 * D.im, 0.5 * D.re);
      },
      /**
       * Calculate the complex arcus cotangent
       *
       * @returns {Complex}
       */
      acot: function() {
        var u = this.re, f = this.im;
        if (f === 0)
          return new s(Math.atan2(1, u), 0);
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).atan() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).atan();
      },
      /**
       * Calculate the complex arcus secant
       *
       * @returns {Complex}
       */
      asec: function() {
        var u = this.re, f = this.im;
        if (u === 0 && f === 0)
          return new s(0, 1 / 0);
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).acos() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).acos();
      },
      /**
       * Calculate the complex arcus cosecans
       *
       * @returns {Complex}
       */
      acsc: function() {
        var u = this.re, f = this.im;
        if (u === 0 && f === 0)
          return new s(Math.PI / 2, 1 / 0);
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).asin() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).asin();
      },
      /**
       * Calculate the complex sinh
       *
       * @returns {Complex}
       */
      sinh: function() {
        var u = this.re, f = this.im;
        return new s(
          t(u) * Math.cos(f),
          i(u) * Math.sin(f)
        );
      },
      /**
       * Calculate the complex cosh
       *
       * @returns {Complex}
       */
      cosh: function() {
        var u = this.re, f = this.im;
        return new s(
          i(u) * Math.cos(f),
          t(u) * Math.sin(f)
        );
      },
      /**
       * Calculate the complex tanh
       *
       * @returns {Complex}
       */
      tanh: function() {
        var u = 2 * this.re, f = 2 * this.im, d = i(u) + Math.cos(f);
        return new s(
          t(u) / d,
          Math.sin(f) / d
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      coth: function() {
        var u = 2 * this.re, f = 2 * this.im, d = i(u) - Math.cos(f);
        return new s(
          t(u) / d,
          -Math.sin(f) / d
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      csch: function() {
        var u = this.re, f = this.im, d = Math.cos(2 * f) - i(2 * u);
        return new s(
          -2 * t(u) * Math.cos(f) / d,
          2 * i(u) * Math.sin(f) / d
        );
      },
      /**
       * Calculate the complex sech
       *
       * @returns {Complex}
       */
      sech: function() {
        var u = this.re, f = this.im, d = Math.cos(2 * f) + i(2 * u);
        return new s(
          2 * i(u) * Math.cos(f) / d,
          -2 * t(u) * Math.sin(f) / d
        );
      },
      /**
       * Calculate the complex asinh
       *
       * @returns {Complex}
       */
      asinh: function() {
        var u = this.im;
        this.im = -this.re, this.re = u;
        var f = this.asin();
        return this.re = -this.im, this.im = u, u = f.re, f.re = -f.im, f.im = u, f;
      },
      /**
       * Calculate the complex acosh
       *
       * @returns {Complex}
       */
      acosh: function() {
        var u = this.acos();
        if (u.im <= 0) {
          var f = u.re;
          u.re = -u.im, u.im = f;
        } else {
          var f = u.im;
          u.im = -u.re, u.re = f;
        }
        return u;
      },
      /**
       * Calculate the complex atanh
       *
       * @returns {Complex}
       */
      atanh: function() {
        var u = this.re, f = this.im, d = u > 1 && f === 0, D = 1 - u, h = 1 + u, m = D * D + f * f, p = m !== 0 ? new s(
          (h * D - f * f) / m,
          (f * D + h * f) / m
        ) : new s(
          u !== -1 ? u / 0 : 0,
          f !== 0 ? f / 0 : 0
        ), w = p.re;
        return p.re = c(p.re, p.im) / 2, p.im = Math.atan2(p.im, w) / 2, d && (p.im = -p.im), p;
      },
      /**
       * Calculate the complex acoth
       *
       * @returns {Complex}
       */
      acoth: function() {
        var u = this.re, f = this.im;
        if (u === 0 && f === 0)
          return new s(0, Math.PI / 2);
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).atanh() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).atanh();
      },
      /**
       * Calculate the complex acsch
       *
       * @returns {Complex}
       */
      acsch: function() {
        var u = this.re, f = this.im;
        if (f === 0)
          return new s(
            u !== 0 ? Math.log(u + Math.sqrt(u * u + 1)) : 1 / 0,
            0
          );
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).asinh() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).asinh();
      },
      /**
       * Calculate the complex asech
       *
       * @returns {Complex}
       */
      asech: function() {
        var u = this.re, f = this.im;
        if (this.isZero())
          return s.INFINITY;
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).acosh() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).acosh();
      },
      /**
       * Calculate the complex inverse 1/z
       *
       * @returns {Complex}
       */
      inverse: function() {
        if (this.isZero())
          return s.INFINITY;
        if (this.isInfinite())
          return s.ZERO;
        var u = this.re, f = this.im, d = u * u + f * f;
        return new s(u / d, -f / d);
      },
      /**
       * Returns the complex conjugate
       *
       * @returns {Complex}
       */
      conjugate: function() {
        return new s(this.re, -this.im);
      },
      /**
       * Gets the negated complex number
       *
       * @returns {Complex}
       */
      neg: function() {
        return new s(-this.re, -this.im);
      },
      /**
       * Ceils the actual complex number
       *
       * @returns {Complex}
       */
      ceil: function(u) {
        return u = Math.pow(10, u || 0), new s(
          Math.ceil(this.re * u) / u,
          Math.ceil(this.im * u) / u
        );
      },
      /**
       * Floors the actual complex number
       *
       * @returns {Complex}
       */
      floor: function(u) {
        return u = Math.pow(10, u || 0), new s(
          Math.floor(this.re * u) / u,
          Math.floor(this.im * u) / u
        );
      },
      /**
       * Ceils the actual complex number
       *
       * @returns {Complex}
       */
      round: function(u) {
        return u = Math.pow(10, u || 0), new s(
          Math.round(this.re * u) / u,
          Math.round(this.im * u) / u
        );
      },
      /**
       * Compares two complex numbers
       *
       * **Note:** new Complex(Infinity).equals(Infinity) === false
       *
       * @returns {boolean}
       */
      equals: function(u, f) {
        var d = new s(u, f);
        return Math.abs(d.re - this.re) <= s.EPSILON && Math.abs(d.im - this.im) <= s.EPSILON;
      },
      /**
       * Clones the actual object
       *
       * @returns {Complex}
       */
      clone: function() {
        return new s(this.re, this.im);
      },
      /**
       * Gets a string of the actual complex number
       *
       * @returns {string}
       */
      toString: function() {
        var u = this.re, f = this.im, d = "";
        return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(u) < s.EPSILON && (u = 0), Math.abs(f) < s.EPSILON && (f = 0), f === 0 ? d + u : (u !== 0 ? (d += u, d += " ", f < 0 ? (f = -f, d += "-") : d += "+", d += " ") : f < 0 && (f = -f, d += "-"), f !== 1 && (d += f), d + "i"));
      },
      /**
       * Returns the actual number as a vector
       *
       * @returns {Array}
       */
      toVector: function() {
        return [this.re, this.im];
      },
      /**
       * Returns the actual real value of the current object
       *
       * @returns {number|null}
       */
      valueOf: function() {
        return this.im === 0 ? this.re : null;
      },
      /**
       * Determines whether a complex number is not on the Riemann sphere.
       *
       * @returns {boolean}
       */
      isNaN: function() {
        return isNaN(this.re) || isNaN(this.im);
      },
      /**
       * Determines whether or not a complex number is at the zero pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isZero: function() {
        return this.im === 0 && this.re === 0;
      },
      /**
       * Determines whether a complex number is not at the infinity pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isFinite: function() {
        return isFinite(this.re) && isFinite(this.im);
      },
      /**
       * Determines whether or not a complex number is at the infinity pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isInfinite: function() {
        return !(this.isNaN() || this.isFinite());
      }
    }, s.ZERO = new s(0, 0), s.ONE = new s(1, 0), s.I = new s(0, 1), s.PI = new s(Math.PI, 0), s.E = new s(Math.E, 0), s.INFINITY = new s(1 / 0, 1 / 0), s.NAN = new s(NaN, NaN), s.EPSILON = 1e-15, Object.defineProperty(s, "__esModule", { value: !0 }), s.default = s, s.Complex = s, r.exports = s;
  })();
})(Ji);
var rs = Ji.exports;
const Zr = /* @__PURE__ */ Yi(rs);
var es = "Complex", ts = [], ns = /* @__PURE__ */ rr(es, ts, () => (Object.defineProperty(Zr, "name", {
  value: "Complex"
}), Zr.prototype.constructor = Zr, Zr.prototype.type = "Complex", Zr.prototype.isComplex = !0, Zr.prototype.toJSON = function() {
  return {
    mathjs: "Complex",
    re: this.re,
    im: this.im
  };
}, Zr.prototype.toPolar = function() {
  return {
    r: this.abs(),
    phi: this.arg()
  };
}, Zr.prototype.format = function(r) {
  var e = "", n = this.im, i = this.re, t = Ot(this.re, r), a = Ot(this.im, r), o = $r(r) ? r : r ? r.precision : null;
  if (o !== null) {
    var v = Math.pow(10, -o);
    Math.abs(i / n) < v && (i = 0), Math.abs(n / i) < v && (n = 0);
  }
  return n === 0 ? e = t : i === 0 ? n === 1 ? e = "i" : n === -1 ? e = "-i" : e = a + "i" : n < 0 ? n === -1 ? e = t + " - i" : e = t + " - " + a.substring(1) + "i" : n === 1 ? e = t + " + i" : e = t + " + " + a + "i", e;
}, Zr.fromPolar = function(r) {
  switch (arguments.length) {
    case 1: {
      var e = arguments[0];
      if (typeof e == "object")
        return Zr(e);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var n = arguments[0], i = arguments[1];
      if ($r(n)) {
        if (di(i) && i.hasBase("ANGLE") && (i = i.toNumber("rad")), $r(i))
          return new Zr({
            r: n,
            phi: i
          });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else
        throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Zr.prototype.valueOf = Zr.prototype.toString, Zr.fromJSON = function(r) {
  return new Zr(r);
}, Zr.compare = function(r, e) {
  return r.re > e.re ? 1 : r.re < e.re ? -1 : r.im > e.im ? 1 : r.im < e.im ? -1 : 0;
}, Zr), {
  isClass: !0
}), Qi = { exports: {} };
/**
 * @license Fraction.js v4.3.0 20/08/2023
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2023, Robert Eisele (robert@raw.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(r, e) {
  (function(n) {
    var i = 2e3, t = {
      s: 1,
      n: 0,
      d: 1
    };
    function a(p, w) {
      if (isNaN(p = parseInt(p, 10)))
        throw h();
      return p * w;
    }
    function o(p, w) {
      if (w === 0)
        throw D();
      var g = Object.create(d.prototype);
      g.s = p < 0 ? -1 : 1, p = p < 0 ? -p : p;
      var E = f(p, w);
      return g.n = p / E, g.d = w / E, g;
    }
    function v(p) {
      for (var w = {}, g = p, E = 2, F = 4; F <= g; ) {
        for (; g % E === 0; )
          g /= E, w[E] = (w[E] || 0) + 1;
        F += 1 + 2 * E++;
      }
      return g !== p ? g > 1 && (w[g] = (w[g] || 0) + 1) : w[p] = (w[p] || 0) + 1, w;
    }
    var c = function(p, w) {
      var g = 0, E = 1, F = 1, y = 0, C = 0, b = 0, A = 1, S = 1, M = 0, N = 1, O = 1, T = 1, I = 1e7, B;
      if (p != null)
        if (w !== void 0) {
          if (g = p, E = w, F = g * E, g % 1 !== 0 || E % 1 !== 0)
            throw m();
        } else
          switch (typeof p) {
            case "object": {
              if ("d" in p && "n" in p)
                g = p.n, E = p.d, "s" in p && (g *= p.s);
              else if (0 in p)
                g = p[0], 1 in p && (E = p[1]);
              else
                throw h();
              F = g * E;
              break;
            }
            case "number": {
              if (p < 0 && (F = p, p = -p), p % 1 === 0)
                g = p;
              else if (p > 0) {
                for (p >= 1 && (S = Math.pow(10, Math.floor(1 + Math.log(p) / Math.LN10)), p /= S); N <= I && T <= I; )
                  if (B = (M + O) / (N + T), p === B) {
                    N + T <= I ? (g = M + O, E = N + T) : T > N ? (g = O, E = T) : (g = M, E = N);
                    break;
                  } else
                    p > B ? (M += O, N += T) : (O += M, T += N), N > I ? (g = O, E = T) : (g = M, E = N);
                g *= S;
              } else
                (isNaN(p) || isNaN(w)) && (E = g = NaN);
              break;
            }
            case "string": {
              if (N = p.match(/\d+|./g), N === null)
                throw h();
              if (N[M] === "-" ? (F = -1, M++) : N[M] === "+" && M++, N.length === M + 1 ? C = a(N[M++], F) : N[M + 1] === "." || N[M] === "." ? (N[M] !== "." && (y = a(N[M++], F)), M++, (M + 1 === N.length || N[M + 1] === "(" && N[M + 3] === ")" || N[M + 1] === "'" && N[M + 3] === "'") && (C = a(N[M], F), A = Math.pow(10, N[M].length), M++), (N[M] === "(" && N[M + 2] === ")" || N[M] === "'" && N[M + 2] === "'") && (b = a(N[M + 1], F), S = Math.pow(10, N[M + 1].length) - 1, M += 3)) : N[M + 1] === "/" || N[M + 1] === ":" ? (C = a(N[M], F), A = a(N[M + 2], 1), M += 3) : N[M + 3] === "/" && N[M + 1] === " " && (y = a(N[M], F), C = a(N[M + 2], F), A = a(N[M + 4], 1), M += 5), N.length <= M) {
                E = A * S, F = /* void */
                g = b + E * y + S * C;
                break;
              }
            }
            default:
              throw h();
          }
      if (E === 0)
        throw D();
      t.s = F < 0 ? -1 : 1, t.n = Math.abs(g), t.d = Math.abs(E);
    };
    function l(p, w, g) {
      for (var E = 1; w > 0; p = p * p % g, w >>= 1)
        w & 1 && (E = E * p % g);
      return E;
    }
    function s(p, w) {
      for (; w % 2 === 0; w /= 2)
        ;
      for (; w % 5 === 0; w /= 5)
        ;
      if (w === 1)
        return 0;
      for (var g = 10 % w, E = 1; g !== 1; E++)
        if (g = g * 10 % w, E > i)
          return 0;
      return E;
    }
    function u(p, w, g) {
      for (var E = 1, F = l(10, g, w), y = 0; y < 300; y++) {
        if (E === F)
          return y;
        E = E * 10 % w, F = F * 10 % w;
      }
      return 0;
    }
    function f(p, w) {
      if (!p)
        return w;
      if (!w)
        return p;
      for (; ; ) {
        if (p %= w, !p)
          return w;
        if (w %= p, !w)
          return p;
      }
    }
    function d(p, w) {
      if (c(p, w), this instanceof d)
        p = f(t.d, t.n), this.s = t.s, this.n = t.n / p, this.d = t.d / p;
      else
        return o(t.s * t.n, t.d);
    }
    var D = function() {
      return new Error("Division by Zero");
    }, h = function() {
      return new Error("Invalid argument");
    }, m = function() {
      return new Error("Parameters must be integer");
    };
    d.prototype = {
      s: 1,
      n: 0,
      d: 1,
      /**
       * Calculates the absolute value
       *
       * Ex: new Fraction(-4).abs() => 4
       **/
      abs: function() {
        return o(this.n, this.d);
      },
      /**
       * Inverts the sign of the current fraction
       *
       * Ex: new Fraction(-4).neg() => 4
       **/
      neg: function() {
        return o(-this.s * this.n, this.d);
      },
      /**
       * Adds two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
       **/
      add: function(p, w) {
        return c(p, w), o(
          this.s * this.n * t.d + t.s * this.d * t.n,
          this.d * t.d
        );
      },
      /**
       * Subtracts two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
       **/
      sub: function(p, w) {
        return c(p, w), o(
          this.s * this.n * t.d - t.s * this.d * t.n,
          this.d * t.d
        );
      },
      /**
       * Multiplies two rational numbers
       *
       * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
       **/
      mul: function(p, w) {
        return c(p, w), o(
          this.s * t.s * this.n * t.n,
          this.d * t.d
        );
      },
      /**
       * Divides two rational numbers
       *
       * Ex: new Fraction("-17.(345)").inverse().div(3)
       **/
      div: function(p, w) {
        return c(p, w), o(
          this.s * t.s * this.n * t.d,
          this.d * t.n
        );
      },
      /**
       * Clones the actual object
       *
       * Ex: new Fraction("-17.(345)").clone()
       **/
      clone: function() {
        return o(this.s * this.n, this.d);
      },
      /**
       * Calculates the modulo of two rational numbers - a more precise fmod
       *
       * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
       **/
      mod: function(p, w) {
        if (isNaN(this.n) || isNaN(this.d))
          return new d(NaN);
        if (p === void 0)
          return o(this.s * this.n % this.d, 1);
        if (c(p, w), t.n === 0 && this.d === 0)
          throw D();
        return o(
          this.s * (t.d * this.n) % (t.n * this.d),
          t.d * this.d
        );
      },
      /**
       * Calculates the fractional gcd of two rational numbers
       *
       * Ex: new Fraction(5,8).gcd(3,7) => 1/56
       */
      gcd: function(p, w) {
        return c(p, w), o(f(t.n, this.n) * f(t.d, this.d), t.d * this.d);
      },
      /**
       * Calculates the fractional lcm of two rational numbers
       *
       * Ex: new Fraction(5,8).lcm(3,7) => 15
       */
      lcm: function(p, w) {
        return c(p, w), t.n === 0 && this.n === 0 ? o(0, 1) : o(t.n * this.n, f(t.n, this.n) * f(t.d, this.d));
      },
      /**
       * Calculates the ceil of a rational number
       *
       * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
       **/
      ceil: function(p) {
        return p = Math.pow(10, p || 0), isNaN(this.n) || isNaN(this.d) ? new d(NaN) : o(Math.ceil(p * this.s * this.n / this.d), p);
      },
      /**
       * Calculates the floor of a rational number
       *
       * Ex: new Fraction('4.(3)').floor() => (4 / 1)
       **/
      floor: function(p) {
        return p = Math.pow(10, p || 0), isNaN(this.n) || isNaN(this.d) ? new d(NaN) : o(Math.floor(p * this.s * this.n / this.d), p);
      },
      /**
       * Rounds a rational numbers
       *
       * Ex: new Fraction('4.(3)').round() => (4 / 1)
       **/
      round: function(p) {
        return p = Math.pow(10, p || 0), isNaN(this.n) || isNaN(this.d) ? new d(NaN) : o(Math.round(p * this.s * this.n / this.d), p);
      },
      /**
       * Gets the inverse of the fraction, means numerator and denominator are exchanged
       *
       * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
       **/
      inverse: function() {
        return o(this.s * this.d, this.n);
      },
      /**
       * Calculates the fraction to some rational exponent, if possible
       *
       * Ex: new Fraction(-1,2).pow(-3) => -8
       */
      pow: function(p, w) {
        if (c(p, w), t.d === 1)
          return t.s < 0 ? o(Math.pow(this.s * this.d, t.n), Math.pow(this.n, t.n)) : o(Math.pow(this.s * this.n, t.n), Math.pow(this.d, t.n));
        if (this.s < 0)
          return null;
        var g = v(this.n), E = v(this.d), F = 1, y = 1;
        for (var C in g)
          if (C !== "1") {
            if (C === "0") {
              F = 0;
              break;
            }
            if (g[C] *= t.n, g[C] % t.d === 0)
              g[C] /= t.d;
            else
              return null;
            F *= Math.pow(C, g[C]);
          }
        for (var C in E)
          if (C !== "1") {
            if (E[C] *= t.n, E[C] % t.d === 0)
              E[C] /= t.d;
            else
              return null;
            y *= Math.pow(C, E[C]);
          }
        return t.s < 0 ? o(y, F) : o(F, y);
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      equals: function(p, w) {
        return c(p, w), this.s * this.n * t.d === t.s * t.n * this.d;
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      compare: function(p, w) {
        c(p, w);
        var g = this.s * this.n * t.d - t.s * t.n * this.d;
        return (0 < g) - (g < 0);
      },
      simplify: function(p) {
        if (isNaN(this.n) || isNaN(this.d))
          return this;
        p = p || 1e-3;
        for (var w = this.abs(), g = w.toContinued(), E = 1; E < g.length; E++) {
          for (var F = o(g[E - 1], 1), y = E - 2; y >= 0; y--)
            F = F.inverse().add(g[y]);
          if (Math.abs(F.sub(w).valueOf()) < p)
            return F.mul(this.s);
        }
        return this;
      },
      /**
       * Check if two rational numbers are divisible
       *
       * Ex: new Fraction(19.6).divisible(1.5);
       */
      divisible: function(p, w) {
        return c(p, w), !(!(t.n * this.d) || this.n * t.d % (t.n * this.d));
      },
      /**
       * Returns a decimal representation of the fraction
       *
       * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
       **/
      valueOf: function() {
        return this.s * this.n / this.d;
      },
      /**
       * Returns a string-fraction representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
       **/
      toFraction: function(p) {
        var w, g = "", E = this.n, F = this.d;
        return this.s < 0 && (g += "-"), F === 1 ? g += E : (p && (w = Math.floor(E / F)) > 0 && (g += w, g += " ", E %= F), g += E, g += "/", g += F), g;
      },
      /**
       * Returns a latex representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
       **/
      toLatex: function(p) {
        var w, g = "", E = this.n, F = this.d;
        return this.s < 0 && (g += "-"), F === 1 ? g += E : (p && (w = Math.floor(E / F)) > 0 && (g += w, E %= F), g += "\\frac{", g += E, g += "}{", g += F, g += "}"), g;
      },
      /**
       * Returns an array of continued fraction elements
       *
       * Ex: new Fraction("7/8").toContinued() => [0,1,7]
       */
      toContinued: function() {
        var p, w = this.n, g = this.d, E = [];
        if (isNaN(w) || isNaN(g))
          return E;
        do
          E.push(Math.floor(w / g)), p = w % g, w = g, g = p;
        while (w !== 1);
        return E;
      },
      /**
       * Creates a string representation of a fraction with all digits
       *
       * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
       **/
      toString: function(p) {
        var w = this.n, g = this.d;
        if (isNaN(w) || isNaN(g))
          return "NaN";
        p = p || 15;
        var E = s(w, g), F = u(w, g, E), y = this.s < 0 ? "-" : "";
        if (y += w / g | 0, w %= g, w *= 10, w && (y += "."), E) {
          for (var C = F; C--; )
            y += w / g | 0, w %= g, w *= 10;
          y += "(";
          for (var C = E; C--; )
            y += w / g | 0, w %= g, w *= 10;
          y += ")";
        } else
          for (var C = p; w && C--; )
            y += w / g | 0, w %= g, w *= 10;
        return y;
      }
    }, Object.defineProperty(d, "__esModule", { value: !0 }), d.default = d, d.Fraction = d, r.exports = d;
  })();
})(Qi);
var is = Qi.exports;
const ve = /* @__PURE__ */ Yi(is);
var as = "Fraction", us = [], os = /* @__PURE__ */ rr(as, us, () => (Object.defineProperty(ve, "name", {
  value: "Fraction"
}), ve.prototype.constructor = ve, ve.prototype.type = "Fraction", ve.prototype.isFraction = !0, ve.prototype.toJSON = function() {
  return {
    mathjs: "Fraction",
    n: this.s * this.n,
    d: this.d
  };
}, ve.fromJSON = function(r) {
  return new ve(r);
}, ve), {
  isClass: !0
}), ss = "Matrix", fs = [], cs = /* @__PURE__ */ rr(ss, fs, () => {
  function r() {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
  }
  return r.prototype.type = "Matrix", r.prototype.isMatrix = !0, r.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  }, r.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  }, r.prototype.create = function(e, n) {
    throw new Error("Cannot invoke create on a Matrix interface");
  }, r.prototype.subset = function(e, n, i) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  }, r.prototype.get = function(e) {
    throw new Error("Cannot invoke get on a Matrix interface");
  }, r.prototype.set = function(e, n, i) {
    throw new Error("Cannot invoke set on a Matrix interface");
  }, r.prototype.resize = function(e, n) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  }, r.prototype.reshape = function(e, n) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  }, r.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  }, r.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  }, r.prototype.map = function(e, n) {
    throw new Error("Cannot invoke map on a Matrix interface");
  }, r.prototype.forEach = function(e) {
    throw new Error("Cannot invoke forEach on a Matrix interface");
  }, r.prototype[Symbol.iterator] = function() {
    throw new Error("Cannot iterate a Matrix interface");
  }, r.prototype.toArray = function() {
    throw new Error("Cannot invoke toArray on a Matrix interface");
  }, r.prototype.valueOf = function() {
    throw new Error("Cannot invoke valueOf on a Matrix interface");
  }, r.prototype.format = function(e) {
    throw new Error("Cannot invoke format on a Matrix interface");
  }, r.prototype.toString = function() {
    throw new Error("Cannot invoke toString on a Matrix interface");
  }, r;
}, {
  isClass: !0
});
function Xi(r) {
  return Object.keys(r.signatures || {}).reduce(function(e, n) {
    var i = (n.match(/,/g) || []).length + 1;
    return Math.max(e, i);
  }, -1);
}
var ls = "DenseMatrix", vs = ["Matrix"], hs = /* @__PURE__ */ rr(ls, vs, (r) => {
  var {
    Matrix: e
  } = r;
  function n(s, u) {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (u && !te(u))
      throw new Error("Invalid datatype: " + u);
    if (_r(s))
      s.type === "DenseMatrix" ? (this._data = Fr(s._data), this._size = Fr(s._size), this._datatype = u || s._datatype) : (this._data = s.toArray(), this._size = s.size(), this._datatype = u || s._datatype);
    else if (s && Mr(s.data) && Mr(s.size))
      this._data = s.data, this._size = s.size, fn(this._data, this._size), this._datatype = u || s.datatype;
    else if (Mr(s))
      this._data = l(s), this._size = qr(this._data), fn(this._data, this._size), this._datatype = u;
    else {
      if (s)
        throw new TypeError("Unsupported type of data (" + fe(s) + ")");
      this._data = [], this._size = [0], this._datatype = u;
    }
  }
  n.prototype = new e(), n.prototype.createDenseMatrix = function(s, u) {
    return new n(s, u);
  }, Object.defineProperty(n, "name", {
    value: "DenseMatrix"
  }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = !0, n.prototype.getDataType = function() {
    return Je(this._data, fe);
  }, n.prototype.storage = function() {
    return "dense";
  }, n.prototype.datatype = function() {
    return this._datatype;
  }, n.prototype.create = function(s, u) {
    return new n(s, u);
  }, n.prototype.subset = function(s, u, f) {
    switch (arguments.length) {
      case 1:
        return i(this, s);
      case 2:
      case 3:
        return a(this, s, u, f);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, n.prototype.get = function(s) {
    if (!Mr(s))
      throw new TypeError("Array expected");
    if (s.length !== this._size.length)
      throw new Er(s.length, this._size.length);
    for (var u = 0; u < s.length; u++)
      Br(s[u], this._size[u]);
    for (var f = this._data, d = 0, D = s.length; d < D; d++) {
      var h = s[d];
      Br(h, f.length), f = f[h];
    }
    return f;
  }, n.prototype.set = function(s, u, f) {
    if (!Mr(s))
      throw new TypeError("Array expected");
    if (s.length < this._size.length)
      throw new Er(s.length, this._size.length, "<");
    var d, D, h, m = s.map(function(w) {
      return w + 1;
    });
    c(this, m, f);
    var p = this._data;
    for (d = 0, D = s.length - 1; d < D; d++)
      h = s[d], Br(h, p.length), p = p[h];
    return h = s[s.length - 1], Br(h, p.length), p[h] = u, this;
  };
  function i(s, u) {
    if (!wt(u))
      throw new TypeError("Invalid index");
    var f = u.isScalar();
    if (f)
      return s.get(u.min());
    var d = u.size();
    if (d.length !== s._size.length)
      throw new Er(d.length, s._size.length);
    for (var D = u.min(), h = u.max(), m = 0, p = s._size.length; m < p; m++)
      Br(D[m], s._size[m]), Br(h[m], s._size[m]);
    return new n(t(s._data, u, d.length, 0), s._datatype);
  }
  function t(s, u, f, d) {
    var D = d === f - 1, h = u.dimension(d);
    return D ? h.map(function(m) {
      return Br(m, s.length), s[m];
    }).valueOf() : h.map(function(m) {
      Br(m, s.length);
      var p = s[m];
      return t(p, u, f, d + 1);
    }).valueOf();
  }
  function a(s, u, f, d) {
    if (!u || u.isIndex !== !0)
      throw new TypeError("Invalid index");
    var D = u.size(), h = u.isScalar(), m;
    if (_r(f) ? (m = f.size(), f = f.valueOf()) : m = qr(f), h) {
      if (m.length !== 0)
        throw new TypeError("Scalar expected");
      s.set(u.min(), f, d);
    } else {
      if (!Ie(m, D))
        try {
          m.length === 0 ? f = ln([f], D) : f = ln(f, D), m = qr(f);
        } catch {
        }
      if (D.length < s._size.length)
        throw new Er(D.length, s._size.length, "<");
      if (m.length < D.length) {
        for (var p = 0, w = 0; D[p] === 1 && m[p] === 1; )
          p++;
        for (; D[p] === 1; )
          w++, p++;
        f = bi(f, D.length, w, m);
      }
      if (!Ie(D, m))
        throw new Er(D, m, ">");
      var g = u.max().map(function(y) {
        return y + 1;
      });
      c(s, g, d);
      var E = D.length, F = 0;
      o(s._data, u, f, E, F);
    }
    return s;
  }
  function o(s, u, f, d, D) {
    var h = D === d - 1, m = u.dimension(D);
    h ? m.forEach(function(p, w) {
      Br(p), s[p] = f[w[0]];
    }) : m.forEach(function(p, w) {
      Br(p), o(s[p], u, f[w[0]], d, D + 1);
    });
  }
  n.prototype.resize = function(s, u, f) {
    if (!ot(s))
      throw new TypeError("Array or Matrix expected");
    var d = s.valueOf().map((h) => Array.isArray(h) && h.length === 1 ? h[0] : h), D = f ? this.clone() : this;
    return v(D, d, u);
  };
  function v(s, u, f) {
    if (u.length === 0) {
      for (var d = s._data; Mr(d); )
        d = d[0];
      return d;
    }
    return s._size = u.slice(0), s._data = ft(s._data, s._size, f), s;
  }
  n.prototype.reshape = function(s, u) {
    var f = u ? this.clone() : this;
    f._data = Jt(f._data, s);
    var d = f._size.reduce((D, h) => D * h);
    return f._size = Qt(s, d), f;
  };
  function c(s, u, f) {
    for (var d = s._size.slice(0), D = !1; d.length < u.length; )
      d.push(0), D = !0;
    for (var h = 0, m = u.length; h < m; h++)
      u[h] > d[h] && (d[h] = u[h], D = !0);
    D && v(s, d, f);
  }
  n.prototype.clone = function() {
    var s = new n({
      data: Fr(this._data),
      size: Fr(this._size),
      datatype: this._datatype
    });
    return s;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype.map = function(s) {
    var u = this, f = Xi(s), d = function m(p, w) {
      return Mr(p) ? p.map(function(g, E) {
        return m(g, w.concat(E));
      }) : f === 1 ? s(p) : f === 2 ? s(p, w) : s(p, w, u);
    }, D = d(this._data, []), h = this._datatype !== void 0 ? Je(D, fe) : void 0;
    return new n(D, h);
  }, n.prototype.forEach = function(s) {
    var u = this, f = function d(D, h) {
      Mr(D) ? D.forEach(function(m, p) {
        d(m, h.concat(p));
      }) : s(D, h, u);
    };
    f(this._data, []);
  }, n.prototype[Symbol.iterator] = function* () {
    var s = function* u(f, d) {
      if (Mr(f))
        for (var D = 0; D < f.length; D++)
          yield* u(f[D], d.concat(D));
      else
        yield {
          value: f,
          index: d
        };
    };
    yield* s(this._data, []);
  }, n.prototype.rows = function() {
    var s = [], u = this.size();
    if (u.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    var f = this._data;
    for (var d of f)
      s.push(new n([d], this._datatype));
    return s;
  }, n.prototype.columns = function() {
    var s = this, u = [], f = this.size();
    if (f.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var d = this._data, D = function(p) {
      var w = d.map((g) => [g[p]]);
      u.push(new n(w, s._datatype));
    }, h = 0; h < f[1]; h++)
      D(h);
    return u;
  }, n.prototype.toArray = function() {
    return Fr(this._data);
  }, n.prototype.valueOf = function() {
    return this._data;
  }, n.prototype.format = function(s) {
    return Ir(this._data, s);
  }, n.prototype.toString = function() {
    return Ir(this._data);
  }, n.prototype.toJSON = function() {
    return {
      mathjs: "DenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, n.prototype.diagonal = function(s) {
    if (s) {
      if (Pr(s) && (s = s.toNumber()), !$r(s) || !zr(s))
        throw new TypeError("The parameter k must be an integer number");
    } else
      s = 0;
    for (var u = s > 0 ? s : 0, f = s < 0 ? -s : 0, d = this._size[0], D = this._size[1], h = Math.min(d - f, D - u), m = [], p = 0; p < h; p++)
      m[p] = this._data[p + f][p + u];
    return new n({
      data: m,
      size: [h],
      datatype: this._datatype
    });
  }, n.diagonal = function(s, u, f, d) {
    if (!Mr(s))
      throw new TypeError("Array expected, size parameter");
    if (s.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (s = s.map(function(C) {
      if (Pr(C) && (C = C.toNumber()), !$r(C) || !zr(C) || C < 1)
        throw new Error("Size values must be positive integers");
      return C;
    }), f) {
      if (Pr(f) && (f = f.toNumber()), !$r(f) || !zr(f))
        throw new TypeError("The parameter k must be an integer number");
    } else
      f = 0;
    var D = f > 0 ? f : 0, h = f < 0 ? -f : 0, m = s[0], p = s[1], w = Math.min(m - h, p - D), g;
    if (Mr(u)) {
      if (u.length !== w)
        throw new Error("Invalid value array length");
      g = function(b) {
        return u[b];
      };
    } else if (_r(u)) {
      var E = u.size();
      if (E.length !== 1 || E[0] !== w)
        throw new Error("Invalid matrix length");
      g = function(b) {
        return u.get([b]);
      };
    } else
      g = function() {
        return u;
      };
    d || (d = Pr(g(0)) ? g(0).mul(0) : 0);
    var F = [];
    if (s.length > 0) {
      F = ft(F, s, d);
      for (var y = 0; y < w; y++)
        F[y + h][y + D] = g(y);
    }
    return new n({
      data: F,
      size: [m, p]
    });
  }, n.fromJSON = function(s) {
    return new n(s);
  }, n.prototype.swapRows = function(s, u) {
    if (!$r(s) || !zr(s) || !$r(u) || !zr(u))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Br(s, this._size[0]), Br(u, this._size[0]), n._swapRows(s, u, this._data), this;
  }, n._swapRows = function(s, u, f) {
    var d = f[s];
    f[s] = f[u], f[u] = d;
  };
  function l(s) {
    return _r(s) ? l(s.valueOf()) : Mr(s) ? s.map(l) : s;
  }
  return n;
}, {
  isClass: !0
});
function jr(r, e, n) {
  return r && typeof r.map == "function" ? r.map(function(i) {
    return jr(i, e);
  }) : e(r);
}
var pn = "isInteger", ds = ["typed"], ps = /* @__PURE__ */ rr(pn, ds, (r) => {
  var {
    typed: e
  } = r;
  return e(pn, {
    number: zr,
    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
    BigNumber: function(i) {
      return i.isInt();
    },
    Fraction: function(i) {
      return i.d === 1 && isFinite(i.n);
    },
    "Array | Matrix": e.referToSelf((n) => (i) => jr(i, n))
  });
}), Kt = "number", Mt = "number, number";
function Ki(r) {
  return Math.abs(r);
}
Ki.signature = Kt;
function Hi(r, e) {
  return r + e;
}
Hi.signature = Mt;
function Wi(r, e) {
  return r - e;
}
Wi.signature = Mt;
function ki(r, e) {
  return r * e;
}
ki.signature = Mt;
function ji(r) {
  return -r;
}
ji.signature = Kt;
function Vt(r) {
  return Bu(r);
}
Vt.signature = Kt;
function ra(r, e) {
  return r * r < 1 && e === 1 / 0 || r * r > 1 && e === -1 / 0 ? 0 : Math.pow(r, e);
}
ra.signature = Mt;
var ea = "number";
function ta(r) {
  return r > 0;
}
ta.signature = ea;
function na(r) {
  return r === 0;
}
na.signature = ea;
var mn = "isPositive", ms = ["typed"], gs = /* @__PURE__ */ rr(mn, ms, (r) => {
  var {
    typed: e
  } = r;
  return e(mn, {
    number: ta,
    BigNumber: function(i) {
      return !i.isNeg() && !i.isZero() && !i.isNaN();
    },
    Fraction: function(i) {
      return i.s > 0 && i.n > 0;
    },
    Unit: e.referToSelf((n) => (i) => e.find(n, i.valueType())(i.value)),
    "Array | Matrix": e.referToSelf((n) => (i) => jr(i, n))
  });
}), gn = "isZero", Ds = ["typed"], ys = /* @__PURE__ */ rr(gn, Ds, (r) => {
  var {
    typed: e
  } = r;
  return e(gn, {
    number: na,
    BigNumber: function(i) {
      return i.isZero();
    },
    Complex: function(i) {
      return i.re === 0 && i.im === 0;
    },
    Fraction: function(i) {
      return i.d === 1 && i.n === 0;
    },
    Unit: e.referToSelf((n) => (i) => e.find(n, i.valueType())(i.value)),
    "Array | Matrix": e.referToSelf((n) => (i) => jr(i, n))
  });
}), Dn = "typeOf", ws = ["typed"], As = /* @__PURE__ */ rr(Dn, ws, (r) => {
  var {
    typed: e
  } = r;
  return e(Dn, {
    any: fe
  });
});
function Xe(r, e, n) {
  if (n == null)
    return r.eq(e);
  if (r.eq(e))
    return !0;
  if (r.isNaN() || e.isNaN())
    return !1;
  if (r.isFinite() && e.isFinite()) {
    var i = r.minus(e).abs();
    if (i.isZero())
      return !0;
    var t = r.constructor.max(r.abs(), e.abs());
    return i.lte(t.times(n));
  }
  return !1;
}
function Es(r, e, n) {
  return we(r.re, e.re, n) && we(r.im, e.im, n);
}
var Ke = /* @__PURE__ */ rr("compareUnits", ["typed"], (r) => {
  var {
    typed: e
  } = r;
  return {
    "Unit, Unit": e.referToSelf((n) => (i, t) => {
      if (!i.equalBase(t))
        throw new Error("Cannot compare units with different base");
      return e.find(n, [i.valueType(), t.valueType()])(i.value, t.value);
    })
  };
}), dt = "equalScalar", Fs = ["typed", "config"], Cs = /* @__PURE__ */ rr(dt, Fs, (r) => {
  var {
    typed: e,
    config: n
  } = r, i = Ke({
    typed: e
  });
  return e(dt, {
    "boolean, boolean": function(a, o) {
      return a === o;
    },
    "number, number": function(a, o) {
      return we(a, o, n.epsilon);
    },
    "BigNumber, BigNumber": function(a, o) {
      return a.eq(o) || Xe(a, o, n.epsilon);
    },
    "Fraction, Fraction": function(a, o) {
      return a.equals(o);
    },
    "Complex, Complex": function(a, o) {
      return Es(a, o, n.epsilon);
    }
  }, i);
});
rr(dt, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(dt, {
    "number, number": function(t, a) {
      return we(t, a, n.epsilon);
    }
  });
});
var bs = "SparseMatrix", Ms = ["typed", "equalScalar", "Matrix"], Ss = /* @__PURE__ */ rr(bs, Ms, (r) => {
  var {
    typed: e,
    equalScalar: n,
    Matrix: i
  } = r;
  function t(h, m) {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (m && !te(m))
      throw new Error("Invalid datatype: " + m);
    if (_r(h))
      a(this, h, m);
    else if (h && Mr(h.index) && Mr(h.ptr) && Mr(h.size))
      this._values = h.values, this._index = h.index, this._ptr = h.ptr, this._size = h.size, this._datatype = m || h.datatype;
    else if (Mr(h))
      o(this, h, m);
    else {
      if (h)
        throw new TypeError("Unsupported type of data (" + fe(h) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = m;
    }
  }
  function a(h, m, p) {
    m.type === "SparseMatrix" ? (h._values = m._values ? Fr(m._values) : void 0, h._index = Fr(m._index), h._ptr = Fr(m._ptr), h._size = Fr(m._size), h._datatype = p || m._datatype) : o(h, m.valueOf(), p || m._datatype);
  }
  function o(h, m, p) {
    h._values = [], h._index = [], h._ptr = [], h._datatype = p;
    var w = m.length, g = 0, E = n, F = 0;
    if (te(p) && (E = e.find(n, [p, p]) || n, F = e.convert(0, p)), w > 0) {
      var y = 0;
      do {
        h._ptr.push(h._index.length);
        for (var C = 0; C < w; C++) {
          var b = m[C];
          if (Mr(b)) {
            if (y === 0 && g < b.length && (g = b.length), y < b.length) {
              var A = b[y];
              E(A, F) || (h._values.push(A), h._index.push(C));
            }
          } else
            y === 0 && g < 1 && (g = 1), E(b, F) || (h._values.push(b), h._index.push(C));
        }
        y++;
      } while (y < g);
    }
    h._ptr.push(h._index.length), h._size = [w, g];
  }
  t.prototype = new i(), t.prototype.createSparseMatrix = function(h, m) {
    return new t(h, m);
  }, Object.defineProperty(t, "name", {
    value: "SparseMatrix"
  }), t.prototype.constructor = t, t.prototype.type = "SparseMatrix", t.prototype.isSparseMatrix = !0, t.prototype.getDataType = function() {
    return Je(this._values, fe);
  }, t.prototype.storage = function() {
    return "sparse";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(h, m) {
    return new t(h, m);
  }, t.prototype.density = function() {
    var h = this._size[0], m = this._size[1];
    return h !== 0 && m !== 0 ? this._index.length / (h * m) : 0;
  }, t.prototype.subset = function(h, m, p) {
    if (!this._values)
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return v(this, h);
      case 2:
      case 3:
        return c(this, h, m, p);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function v(h, m) {
    if (!wt(m))
      throw new TypeError("Invalid index");
    var p = m.isScalar();
    if (p)
      return h.get(m.min());
    var w = m.size();
    if (w.length !== h._size.length)
      throw new Er(w.length, h._size.length);
    var g, E, F, y, C = m.min(), b = m.max();
    for (g = 0, E = h._size.length; g < E; g++)
      Br(C[g], h._size[g]), Br(b[g], h._size[g]);
    var A = h._values, S = h._index, M = h._ptr, N = m.dimension(0), O = m.dimension(1), T = [], I = [];
    N.forEach(function(z, V) {
      I[z] = V[0], T[z] = !0;
    });
    var B = A ? [] : void 0, G = [], q = [];
    return O.forEach(function(z) {
      for (q.push(G.length), F = M[z], y = M[z + 1]; F < y; F++)
        g = S[F], T[g] === !0 && (G.push(I[g]), B && B.push(A[F]));
    }), q.push(G.length), new t({
      values: B,
      index: G,
      ptr: q,
      size: w,
      datatype: h._datatype
    });
  }
  function c(h, m, p, w) {
    if (!m || m.isIndex !== !0)
      throw new TypeError("Invalid index");
    var g = m.size(), E = m.isScalar(), F;
    if (_r(p) ? (F = p.size(), p = p.toArray()) : F = qr(p), E) {
      if (F.length !== 0)
        throw new TypeError("Scalar expected");
      h.set(m.min(), p, w);
    } else {
      if (g.length !== 1 && g.length !== 2)
        throw new Er(g.length, h._size.length, "<");
      if (F.length < g.length) {
        for (var y = 0, C = 0; g[y] === 1 && F[y] === 1; )
          y++;
        for (; g[y] === 1; )
          C++, y++;
        p = bi(p, g.length, C, F);
      }
      if (!Ie(g, F))
        throw new Er(g, F, ">");
      if (g.length === 1) {
        var b = m.dimension(0);
        b.forEach(function(M, N) {
          Br(M), h.set([M, 0], p[N[0]], w);
        });
      } else {
        var A = m.dimension(0), S = m.dimension(1);
        A.forEach(function(M, N) {
          Br(M), S.forEach(function(O, T) {
            Br(O), h.set([M, O], p[N[0]][T[0]], w);
          });
        });
      }
    }
    return h;
  }
  t.prototype.get = function(h) {
    if (!Mr(h))
      throw new TypeError("Array expected");
    if (h.length !== this._size.length)
      throw new Er(h.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var m = h[0], p = h[1];
    Br(m, this._size[0]), Br(p, this._size[1]);
    var w = l(m, this._ptr[p], this._ptr[p + 1], this._index);
    return w < this._ptr[p + 1] && this._index[w] === m ? this._values[w] : 0;
  }, t.prototype.set = function(h, m, p) {
    if (!Mr(h))
      throw new TypeError("Array expected");
    if (h.length !== this._size.length)
      throw new Er(h.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var w = h[0], g = h[1], E = this._size[0], F = this._size[1], y = n, C = 0;
    te(this._datatype) && (y = e.find(n, [this._datatype, this._datatype]) || n, C = e.convert(0, this._datatype)), (w > E - 1 || g > F - 1) && (f(this, Math.max(w + 1, E), Math.max(g + 1, F), p), E = this._size[0], F = this._size[1]), Br(w, E), Br(g, F);
    var b = l(w, this._ptr[g], this._ptr[g + 1], this._index);
    return b < this._ptr[g + 1] && this._index[b] === w ? y(m, C) ? s(b, g, this._values, this._index, this._ptr) : this._values[b] = m : y(m, C) || u(b, w, g, m, this._values, this._index, this._ptr), this;
  };
  function l(h, m, p, w) {
    if (p - m === 0)
      return p;
    for (var g = m; g < p; g++)
      if (w[g] === h)
        return g;
    return m;
  }
  function s(h, m, p, w, g) {
    p.splice(h, 1), w.splice(h, 1);
    for (var E = m + 1; E < g.length; E++)
      g[E]--;
  }
  function u(h, m, p, w, g, E, F) {
    g.splice(h, 0, w), E.splice(h, 0, m);
    for (var y = p + 1; y < F.length; y++)
      F[y]++;
  }
  t.prototype.resize = function(h, m, p) {
    if (!ot(h))
      throw new TypeError("Array or Matrix expected");
    var w = h.valueOf().map((E) => Array.isArray(E) && E.length === 1 ? E[0] : E);
    if (w.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    w.forEach(function(E) {
      if (!$r(E) || !zr(E) || E < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Ir(w) + ")");
    });
    var g = p ? this.clone() : this;
    return f(g, w[0], w[1], m);
  };
  function f(h, m, p, w) {
    var g = w || 0, E = n, F = 0;
    te(h._datatype) && (E = e.find(n, [h._datatype, h._datatype]) || n, F = e.convert(0, h._datatype), g = e.convert(g, h._datatype));
    var y = !E(g, F), C = h._size[0], b = h._size[1], A, S, M;
    if (p > b) {
      for (S = b; S < p; S++)
        if (h._ptr[S] = h._values.length, y)
          for (A = 0; A < C; A++)
            h._values.push(g), h._index.push(A);
      h._ptr[p] = h._values.length;
    } else
      p < b && (h._ptr.splice(p + 1, b - p), h._values.splice(h._ptr[p], h._values.length), h._index.splice(h._ptr[p], h._index.length));
    if (b = p, m > C) {
      if (y) {
        var N = 0;
        for (S = 0; S < b; S++) {
          h._ptr[S] = h._ptr[S] + N, M = h._ptr[S + 1] + N;
          var O = 0;
          for (A = C; A < m; A++, O++)
            h._values.splice(M + O, 0, g), h._index.splice(M + O, 0, A), N++;
        }
        h._ptr[b] = h._values.length;
      }
    } else if (m < C) {
      var T = 0;
      for (S = 0; S < b; S++) {
        h._ptr[S] = h._ptr[S] - T;
        var I = h._ptr[S], B = h._ptr[S + 1] - T;
        for (M = I; M < B; M++)
          A = h._index[M], A > m - 1 && (h._values.splice(M, 1), h._index.splice(M, 1), T++);
      }
      h._ptr[S] = h._values.length;
    }
    return h._size[0] = m, h._size[1] = p, h;
  }
  t.prototype.reshape = function(h, m) {
    if (!Mr(h))
      throw new TypeError("Array expected");
    if (h.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    h.forEach(function(z) {
      if (!$r(z) || !zr(z) || z <= -2 || z === 0)
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Ir(h) + ")");
    });
    var p = this._size[0] * this._size[1];
    h = Qt(h, p);
    var w = h[0] * h[1];
    if (p !== w)
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var g = m ? this.clone() : this;
    if (this._size[0] === h[0] && this._size[1] === h[1])
      return g;
    for (var E = [], F = 0; F < g._ptr.length; F++)
      for (var y = 0; y < g._ptr[F + 1] - g._ptr[F]; y++)
        E.push(F);
    for (var C = g._values.slice(), b = g._index.slice(), A = 0; A < g._index.length; A++) {
      var S = b[A], M = E[A], N = S * g._size[1] + M;
      E[A] = N % h[1], b[A] = Math.floor(N / h[1]);
    }
    g._values.length = 0, g._index.length = 0, g._ptr.length = h[1] + 1, g._size = h.slice();
    for (var O = 0; O < g._ptr.length; O++)
      g._ptr[O] = 0;
    for (var T = 0; T < C.length; T++) {
      var I = b[T], B = E[T], G = C[T], q = l(I, g._ptr[B], g._ptr[B + 1], g._index);
      u(q, I, B, G, g._values, g._index, g._ptr);
    }
    return g;
  }, t.prototype.clone = function() {
    var h = new t({
      values: this._values ? Fr(this._values) : void 0,
      index: Fr(this._index),
      ptr: Fr(this._ptr),
      size: Fr(this._size),
      datatype: this._datatype
    });
    return h;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(h, m) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var p = this, w = this._size[0], g = this._size[1], E = Xi(h), F = function(C, b, A) {
      return E === 1 ? h(C) : E === 2 ? h(C, [b, A]) : h(C, [b, A], p);
    };
    return d(this, 0, w - 1, 0, g - 1, F, m);
  };
  function d(h, m, p, w, g, E, F) {
    var y = [], C = [], b = [], A = n, S = 0;
    te(h._datatype) && (A = e.find(n, [h._datatype, h._datatype]) || n, S = e.convert(0, h._datatype));
    for (var M = function(L, Z, nr) {
      L = E(L, Z, nr), A(L, S) || (y.push(L), C.push(Z));
    }, N = w; N <= g; N++) {
      b.push(y.length);
      var O = h._ptr[N], T = h._ptr[N + 1];
      if (F)
        for (var I = O; I < T; I++) {
          var B = h._index[I];
          B >= m && B <= p && M(h._values[I], B - m, N - w);
        }
      else {
        for (var G = {}, q = O; q < T; q++) {
          var z = h._index[q];
          G[z] = h._values[q];
        }
        for (var V = m; V <= p; V++) {
          var H = V in G ? G[V] : 0;
          M(H, V - m, N - w);
        }
      }
    }
    return b.push(y.length), new t({
      values: y,
      index: C,
      ptr: b,
      size: [p - m + 1, g - w + 1]
    });
  }
  t.prototype.forEach = function(h, m) {
    if (!this._values)
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var p = this, w = this._size[0], g = this._size[1], E = 0; E < g; E++) {
      var F = this._ptr[E], y = this._ptr[E + 1];
      if (m)
        for (var C = F; C < y; C++) {
          var b = this._index[C];
          h(this._values[C], [b, E], p);
        }
      else {
        for (var A = {}, S = F; S < y; S++) {
          var M = this._index[S];
          A[M] = this._values[S];
        }
        for (var N = 0; N < w; N++) {
          var O = N in A ? A[N] : 0;
          h(O, [N, E], p);
        }
      }
    }
  }, t.prototype[Symbol.iterator] = function* () {
    if (!this._values)
      throw new Error("Cannot iterate a Pattern only matrix");
    for (var h = this._size[1], m = 0; m < h; m++)
      for (var p = this._ptr[m], w = this._ptr[m + 1], g = p; g < w; g++) {
        var E = this._index[g];
        yield {
          value: this._values[g],
          index: [E, m]
        };
      }
  }, t.prototype.toArray = function() {
    return D(this._values, this._index, this._ptr, this._size, !0);
  }, t.prototype.valueOf = function() {
    return D(this._values, this._index, this._ptr, this._size, !1);
  };
  function D(h, m, p, w, g) {
    var E = w[0], F = w[1], y = [], C, b;
    for (C = 0; C < E; C++)
      for (y[C] = [], b = 0; b < F; b++)
        y[C][b] = 0;
    for (b = 0; b < F; b++)
      for (var A = p[b], S = p[b + 1], M = A; M < S; M++)
        C = m[M], y[C][b] = h ? g ? Fr(h[M]) : h[M] : 1;
    return y;
  }
  return t.prototype.format = function(h) {
    for (var m = this._size[0], p = this._size[1], w = this.density(), g = "Sparse Matrix [" + Ir(m, h) + " x " + Ir(p, h) + "] density: " + Ir(w, h) + `
`, E = 0; E < p; E++)
      for (var F = this._ptr[E], y = this._ptr[E + 1], C = F; C < y; C++) {
        var b = this._index[C];
        g += `
    (` + Ir(b, h) + ", " + Ir(E, h) + ") ==> " + (this._values ? Ir(this._values[C], h) : "X");
      }
    return g;
  }, t.prototype.toString = function() {
    return Ir(this.toArray());
  }, t.prototype.toJSON = function() {
    return {
      mathjs: "SparseMatrix",
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  }, t.prototype.diagonal = function(h) {
    if (h) {
      if (Pr(h) && (h = h.toNumber()), !$r(h) || !zr(h))
        throw new TypeError("The parameter k must be an integer number");
    } else
      h = 0;
    var m = h > 0 ? h : 0, p = h < 0 ? -h : 0, w = this._size[0], g = this._size[1], E = Math.min(w - p, g - m), F = [], y = [], C = [];
    C[0] = 0;
    for (var b = m; b < g && F.length < E; b++)
      for (var A = this._ptr[b], S = this._ptr[b + 1], M = A; M < S; M++) {
        var N = this._index[M];
        if (N === b - m + p) {
          F.push(this._values[M]), y[F.length - 1] = N - p;
          break;
        }
      }
    return C.push(F.length), new t({
      values: F,
      index: y,
      ptr: C,
      size: [E, 1]
    });
  }, t.fromJSON = function(h) {
    return new t(h);
  }, t.diagonal = function(h, m, p, w, g) {
    if (!Mr(h))
      throw new TypeError("Array expected, size parameter");
    if (h.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (h = h.map(function(z) {
      if (Pr(z) && (z = z.toNumber()), !$r(z) || !zr(z) || z < 1)
        throw new Error("Size values must be positive integers");
      return z;
    }), p) {
      if (Pr(p) && (p = p.toNumber()), !$r(p) || !zr(p))
        throw new TypeError("The parameter k must be an integer number");
    } else
      p = 0;
    var E = n, F = 0;
    te(g) && (E = e.find(n, [g, g]) || n, F = e.convert(0, g));
    var y = p > 0 ? p : 0, C = p < 0 ? -p : 0, b = h[0], A = h[1], S = Math.min(b - C, A - y), M;
    if (Mr(m)) {
      if (m.length !== S)
        throw new Error("Invalid value array length");
      M = function(V) {
        return m[V];
      };
    } else if (_r(m)) {
      var N = m.size();
      if (N.length !== 1 || N[0] !== S)
        throw new Error("Invalid matrix length");
      M = function(V) {
        return m.get([V]);
      };
    } else
      M = function() {
        return m;
      };
    for (var O = [], T = [], I = [], B = 0; B < A; B++) {
      I.push(O.length);
      var G = B - y;
      if (G >= 0 && G < S) {
        var q = M(G);
        E(q, F) || (T.push(G + C), O.push(q));
      }
    }
    return I.push(O.length), new t({
      values: O,
      index: T,
      ptr: I,
      size: [b, A]
    });
  }, t.prototype.swapRows = function(h, m) {
    if (!$r(h) || !zr(h) || !$r(m) || !zr(m))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Br(h, this._size[0]), Br(m, this._size[0]), t._swapRows(h, m, this._size[1], this._values, this._index, this._ptr), this;
  }, t._forEachRow = function(h, m, p, w, g) {
    for (var E = w[h], F = w[h + 1], y = E; y < F; y++)
      g(p[y], m[y]);
  }, t._swapRows = function(h, m, p, w, g, E) {
    for (var F = 0; F < p; F++) {
      var y = E[F], C = E[F + 1], b = l(h, y, C, g), A = l(m, y, C, g);
      if (b < C && A < C && g[b] === h && g[A] === m) {
        if (w) {
          var S = w[b];
          w[b] = w[A], w[A] = S;
        }
        continue;
      }
      if (b < C && g[b] === h && (A >= C || g[A] !== m)) {
        var M = w ? w[b] : void 0;
        g.splice(A, 0, m), w && w.splice(A, 0, M), g.splice(A <= b ? b + 1 : b, 1), w && w.splice(A <= b ? b + 1 : b, 1);
        continue;
      }
      if (A < C && g[A] === m && (b >= C || g[b] !== h)) {
        var N = w ? w[A] : void 0;
        g.splice(b, 0, h), w && w.splice(b, 0, N), g.splice(b <= A ? A + 1 : A, 1), w && w.splice(b <= A ? A + 1 : A, 1);
      }
    }
  }, t;
}, {
  isClass: !0
}), Ns = "number", xs = ["typed"];
function Bs(r) {
  var e = r.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (e) {
    var n = {
      "0b": 2,
      "0o": 8,
      "0x": 16
    }[e[1]], i = e[2], t = e[3];
    return {
      input: r,
      radix: n,
      integerPart: i,
      fractionalPart: t
    };
  } else
    return null;
}
function _s(r) {
  for (var e = parseInt(r.integerPart, r.radix), n = 0, i = 0; i < r.fractionalPart.length; i++) {
    var t = parseInt(r.fractionalPart[i], r.radix);
    n += t / Math.pow(r.radix, i + 1);
  }
  var a = e + n;
  if (isNaN(a))
    throw new SyntaxError('String "' + r.input + '" is not a valid number');
  return a;
}
var zs = /* @__PURE__ */ rr(Ns, xs, (r) => {
  var {
    typed: e
  } = r, n = e("number", {
    "": function() {
      return 0;
    },
    number: function(t) {
      return t;
    },
    string: function(t) {
      if (t === "NaN")
        return NaN;
      var a = Bs(t);
      if (a)
        return _s(a);
      var o = 0, v = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      v && (o = Number(v[2]), t = v[1]);
      var c = Number(t);
      if (isNaN(c))
        throw new SyntaxError('String "' + t + '" is not a valid number');
      if (v) {
        if (c > 2 ** o - 1)
          throw new SyntaxError('String "'.concat(t, '" is out of range'));
        c >= 2 ** (o - 1) && (c = c - 2 ** o);
      }
      return c;
    },
    BigNumber: function(t) {
      return t.toNumber();
    },
    Fraction: function(t) {
      return t.valueOf();
    },
    Unit: e.referToSelf((i) => (t) => {
      var a = t.clone();
      return a.value = i(t.value), a;
    }),
    null: function(t) {
      return 0;
    },
    "Unit, string | Unit": function(t, a) {
      return t.toNumber(a);
    },
    "Array | Matrix": e.referToSelf((i) => (t) => jr(t, i))
  });
  return n.fromJSON = function(i) {
    return parseFloat(i.value);
  }, n;
}), Ts = "bignumber", Os = ["typed", "BigNumber"], Is = /* @__PURE__ */ rr(Ts, Os, (r) => {
  var {
    typed: e,
    BigNumber: n
  } = r;
  return e("bignumber", {
    "": function() {
      return new n(0);
    },
    number: function(t) {
      return new n(t + "");
    },
    string: function(t) {
      var a = t.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (a) {
        var o = a[2], v = n(a[1]), c = new n(2).pow(Number(o));
        if (v.gt(c.sub(1)))
          throw new SyntaxError('String "'.concat(t, '" is out of range'));
        var l = new n(2).pow(Number(o) - 1);
        return v.gte(l) ? v.sub(c) : v;
      }
      return new n(t);
    },
    BigNumber: function(t) {
      return t;
    },
    Unit: e.referToSelf((i) => (t) => {
      var a = t.clone();
      return a.value = i(t.value), a;
    }),
    Fraction: function(t) {
      return new n(t.n).div(t.d).times(t.s);
    },
    null: function(t) {
      return new n(0);
    },
    "Array | Matrix": e.referToSelf((i) => (t) => jr(t, i))
  });
}), $s = "complex", qs = ["typed", "Complex"], Ls = /* @__PURE__ */ rr($s, qs, (r) => {
  var {
    typed: e,
    Complex: n
  } = r;
  return e("complex", {
    "": function() {
      return n.ZERO;
    },
    number: function(t) {
      return new n(t, 0);
    },
    "number, number": function(t, a) {
      return new n(t, a);
    },
    // TODO: this signature should be redundant
    "BigNumber, BigNumber": function(t, a) {
      return new n(t.toNumber(), a.toNumber());
    },
    Fraction: function(t) {
      return new n(t.valueOf(), 0);
    },
    Complex: function(t) {
      return t.clone();
    },
    string: function(t) {
      return n(t);
    },
    null: function(t) {
      return n(0);
    },
    Object: function(t) {
      if ("re" in t && "im" in t)
        return new n(t.re, t.im);
      if ("r" in t && "phi" in t || "abs" in t && "arg" in t)
        return new n(t);
      throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
    },
    "Array | Matrix": e.referToSelf((i) => (t) => jr(t, i))
  });
}), Ps = "fraction", Rs = ["typed", "Fraction"], Us = /* @__PURE__ */ rr(Ps, Rs, (r) => {
  var {
    typed: e,
    Fraction: n
  } = r;
  return e("fraction", {
    number: function(t) {
      if (!isFinite(t) || isNaN(t))
        throw new Error(t + " cannot be represented as a fraction");
      return new n(t);
    },
    string: function(t) {
      return new n(t);
    },
    "number, number": function(t, a) {
      return new n(t, a);
    },
    null: function(t) {
      return new n(0);
    },
    BigNumber: function(t) {
      return new n(t.toString());
    },
    Fraction: function(t) {
      return t;
    },
    Unit: e.referToSelf((i) => (t) => {
      var a = t.clone();
      return a.value = i(t.value), a;
    }),
    Object: function(t) {
      return new n(t);
    },
    "Array | Matrix": e.referToSelf((i) => (t) => jr(t, i))
  });
}), yn = "matrix", Vs = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], Zs = /* @__PURE__ */ rr(yn, Vs, (r) => {
  var {
    typed: e,
    Matrix: n,
    DenseMatrix: i,
    SparseMatrix: t
  } = r;
  return e(yn, {
    "": function() {
      return a([]);
    },
    string: function(v) {
      return a([], v);
    },
    "string, string": function(v, c) {
      return a([], v, c);
    },
    Array: function(v) {
      return a(v);
    },
    Matrix: function(v) {
      return a(v, v.storage());
    },
    "Array | Matrix, string": a,
    "Array | Matrix, string, string": a
  });
  function a(o, v, c) {
    if (v === "dense" || v === "default" || v === void 0)
      return new i(o, c);
    if (v === "sparse")
      return new t(o, c);
    throw new TypeError("Unknown matrix type " + JSON.stringify(v) + ".");
  }
}), wn = "matrixFromColumns", Gs = ["typed", "matrix", "flatten", "size"], Ys = /* @__PURE__ */ rr(wn, Gs, (r) => {
  var {
    typed: e,
    matrix: n,
    flatten: i,
    size: t
  } = r;
  return e(wn, {
    "...Array": function(c) {
      return a(c);
    },
    "...Matrix": function(c) {
      return n(a(c.map((l) => l.toArray())));
    }
    // TODO implement this properly for SparseMatrix
  });
  function a(v) {
    if (v.length === 0)
      throw new TypeError("At least one column is needed to construct a matrix.");
    for (var c = o(v[0]), l = [], s = 0; s < c; s++)
      l[s] = [];
    for (var u of v) {
      var f = o(u);
      if (f !== c)
        throw new TypeError("The vectors had different length: " + (c | 0) + " ≠ " + (f | 0));
      for (var d = i(u), D = 0; D < c; D++)
        l[D].push(d[D]);
    }
    return l;
  }
  function o(v) {
    var c = t(v);
    if (c.length === 1)
      return c[0];
    if (c.length === 2) {
      if (c[0] === 1)
        return c[1];
      if (c[1] === 1)
        return c[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else
      throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), An = "unaryMinus", Js = ["typed"], Qs = /* @__PURE__ */ rr(An, Js, (r) => {
  var {
    typed: e
  } = r;
  return e(An, {
    number: ji,
    "Complex | BigNumber | Fraction": (n) => n.neg(),
    Unit: e.referToSelf((n) => (i) => {
      var t = i.clone();
      return t.value = e.find(n, t.valueType())(i.value), t;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    "Array | Matrix": e.referToSelf((n) => (i) => jr(i, n))
    // TODO: add support for string
  });
}), En = "abs", Xs = ["typed"], Ks = /* @__PURE__ */ rr(En, Xs, (r) => {
  var {
    typed: e
  } = r;
  return e(En, {
    number: Ki,
    "Complex | BigNumber | Fraction | Unit": (n) => n.abs(),
    // deep map collection, skip zeros since abs(0) = 0
    "Array | Matrix": e.referToSelf((n) => (i) => jr(i, n))
  });
}), Fn = "addScalar", Hs = ["typed"], Ws = /* @__PURE__ */ rr(Fn, Hs, (r) => {
  var {
    typed: e
  } = r;
  return e(Fn, {
    "number, number": Hi,
    "Complex, Complex": function(i, t) {
      return i.add(t);
    },
    "BigNumber, BigNumber": function(i, t) {
      return i.plus(t);
    },
    "Fraction, Fraction": function(i, t) {
      return i.add(t);
    },
    "Unit, Unit": e.referToSelf((n) => (i, t) => {
      if (i.value === null || i.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (t.value === null || t.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!i.equalBase(t))
        throw new Error("Units do not match");
      var a = i.clone();
      return a.value = e.find(n, [a.valueType(), t.valueType()])(a.value, t.value), a.fixPrefix = !1, a;
    })
  });
}), Cn = "subtractScalar", ks = ["typed"], js = /* @__PURE__ */ rr(Cn, ks, (r) => {
  var {
    typed: e
  } = r;
  return e(Cn, {
    "number, number": Wi,
    "Complex, Complex": function(i, t) {
      return i.sub(t);
    },
    "BigNumber, BigNumber": function(i, t) {
      return i.minus(t);
    },
    "Fraction, Fraction": function(i, t) {
      return i.sub(t);
    },
    "Unit, Unit": e.referToSelf((n) => (i, t) => {
      if (i.value === null || i.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (t.value === null || t.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!i.equalBase(t))
        throw new Error("Units do not match");
      var a = i.clone();
      return a.value = e.find(n, [a.valueType(), t.valueType()])(a.value, t.value), a.fixPrefix = !1, a;
    })
  });
}), rf = "matAlgo11xS0s", ef = ["typed", "equalScalar"], tf = /* @__PURE__ */ rr(rf, ef, (r) => {
  var {
    typed: e,
    equalScalar: n
  } = r;
  return function(t, a, o, v) {
    var c = t._values, l = t._index, s = t._ptr, u = t._size, f = t._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = u[0], D = u[1], h, m = n, p = 0, w = o;
    typeof f == "string" && (h = f, m = e.find(n, [h, h]), p = e.convert(0, h), a = e.convert(a, h), w = e.find(o, [h, h]));
    for (var g = [], E = [], F = [], y = 0; y < D; y++) {
      F[y] = E.length;
      for (var C = s[y], b = s[y + 1], A = C; A < b; A++) {
        var S = l[A], M = v ? w(a, c[A]) : w(c[A], a);
        m(M, p) || (E.push(S), g.push(M));
      }
    }
    return F[D] = E.length, t.createSparseMatrix({
      values: g,
      index: E,
      ptr: F,
      size: [d, D],
      datatype: h
    });
  };
}), nf = "matAlgo12xSfs", af = ["typed", "DenseMatrix"], Pe = /* @__PURE__ */ rr(nf, af, (r) => {
  var {
    typed: e,
    DenseMatrix: n
  } = r;
  return function(t, a, o, v) {
    var c = t._values, l = t._index, s = t._ptr, u = t._size, f = t._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = u[0], D = u[1], h, m = o;
    typeof f == "string" && (h = f, a = e.convert(a, h), m = e.find(o, [h, h]));
    for (var p = [], w = [], g = [], E = 0; E < D; E++) {
      for (var F = E + 1, y = s[E], C = s[E + 1], b = y; b < C; b++) {
        var A = l[b];
        w[A] = c[b], g[A] = F;
      }
      for (var S = 0; S < d; S++)
        E === 0 && (p[S] = []), g[S] === F ? p[S][E] = v ? m(a, w[S]) : m(w[S], a) : p[S][E] = v ? m(a, 0) : m(0, a);
    }
    return new n({
      data: p,
      size: [d, D],
      datatype: h
    });
  };
}), uf = "matAlgo14xDs", of = ["typed"], ia = /* @__PURE__ */ rr(uf, of, (r) => {
  var {
    typed: e
  } = r;
  return function(t, a, o, v) {
    var c = t._data, l = t._size, s = t._datatype, u, f = o;
    typeof s == "string" && (u = s, a = e.convert(a, u), f = e.find(o, [u, u]));
    var d = l.length > 0 ? n(f, 0, l, l[0], c, a, v) : [];
    return t.createDenseMatrix({
      data: d,
      size: Fr(l),
      datatype: u
    });
  };
  function n(i, t, a, o, v, c, l) {
    var s = [];
    if (t === a.length - 1)
      for (var u = 0; u < o; u++)
        s[u] = l ? i(c, v[u]) : i(v[u], c);
    else
      for (var f = 0; f < o; f++)
        s[f] = n(i, t + 1, a, a[t + 1], v[f], c, l);
    return s;
  }
}), sf = "matAlgo03xDSf", ff = ["typed"], Re = /* @__PURE__ */ rr(sf, ff, (r) => {
  var {
    typed: e
  } = r;
  return function(i, t, a, o) {
    var v = i._data, c = i._size, l = i._datatype, s = t._values, u = t._index, f = t._ptr, d = t._size, D = t._datatype;
    if (c.length !== d.length)
      throw new Er(c.length, d.length);
    if (c[0] !== d[0] || c[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + d + ")");
    if (!s)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var h = c[0], m = c[1], p, w = 0, g = a;
    typeof l == "string" && l === D && (p = l, w = e.convert(0, p), g = e.find(a, [p, p]));
    for (var E = [], F = 0; F < h; F++)
      E[F] = [];
    for (var y = [], C = [], b = 0; b < m; b++) {
      for (var A = b + 1, S = f[b], M = f[b + 1], N = S; N < M; N++) {
        var O = u[N];
        y[O] = o ? g(s[N], v[O][b]) : g(v[O][b], s[N]), C[O] = A;
      }
      for (var T = 0; T < h; T++)
        C[T] === A ? E[T][b] = y[T] : E[T][b] = o ? g(w, v[T][b]) : g(v[T][b], w);
    }
    return i.createDenseMatrix({
      data: E,
      size: [h, m],
      datatype: p
    });
  };
}), cf = "matAlgo05xSfSf", lf = ["typed", "equalScalar"], vf = /* @__PURE__ */ rr(cf, lf, (r) => {
  var {
    typed: e,
    equalScalar: n
  } = r;
  return function(t, a, o) {
    var v = t._values, c = t._index, l = t._ptr, s = t._size, u = t._datatype, f = a._values, d = a._index, D = a._ptr, h = a._size, m = a._datatype;
    if (s.length !== h.length)
      throw new Er(s.length, h.length);
    if (s[0] !== h[0] || s[1] !== h[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + h + ")");
    var p = s[0], w = s[1], g, E = n, F = 0, y = o;
    typeof u == "string" && u === m && (g = u, E = e.find(n, [g, g]), F = e.convert(0, g), y = e.find(o, [g, g]));
    var C = v && f ? [] : void 0, b = [], A = [], S = C ? [] : void 0, M = C ? [] : void 0, N = [], O = [], T, I, B, G;
    for (I = 0; I < w; I++) {
      A[I] = b.length;
      var q = I + 1;
      for (B = l[I], G = l[I + 1]; B < G; B++)
        T = c[B], b.push(T), N[T] = q, S && (S[T] = v[B]);
      for (B = D[I], G = D[I + 1]; B < G; B++)
        T = d[B], N[T] !== q && b.push(T), O[T] = q, M && (M[T] = f[B]);
      if (C)
        for (B = A[I]; B < b.length; ) {
          T = b[B];
          var z = N[T], V = O[T];
          if (z === q || V === q) {
            var H = z === q ? S[T] : F, P = V === q ? M[T] : F, L = y(H, P);
            E(L, F) ? b.splice(B, 1) : (C.push(L), B++);
          }
        }
    }
    return A[w] = b.length, t.createSparseMatrix({
      values: C,
      index: b,
      ptr: A,
      size: [p, w],
      datatype: g
    });
  };
}), hf = "matAlgo13xDD", df = ["typed"], pf = /* @__PURE__ */ rr(hf, df, (r) => {
  var {
    typed: e
  } = r;
  return function(t, a, o) {
    var v = t._data, c = t._size, l = t._datatype, s = a._data, u = a._size, f = a._datatype, d = [];
    if (c.length !== u.length)
      throw new Er(c.length, u.length);
    for (var D = 0; D < c.length; D++) {
      if (c[D] !== u[D])
        throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + u + ")");
      d[D] = c[D];
    }
    var h, m = o;
    typeof l == "string" && l === f && (h = l, m = e.find(o, [h, h]));
    var p = d.length > 0 ? n(m, 0, d, d[0], v, s) : [];
    return t.createDenseMatrix({
      data: p,
      size: d,
      datatype: h
    });
  };
  function n(i, t, a, o, v, c) {
    var l = [];
    if (t === a.length - 1)
      for (var s = 0; s < o; s++)
        l[s] = i(v[s], c[s]);
    else
      for (var u = 0; u < o; u++)
        l[u] = n(i, t + 1, a, a[t + 1], v[u], c[u]);
    return l;
  }
}), mf = "broadcast", gf = ["concat"], Df = /* @__PURE__ */ rr(mf, gf, (r) => {
  var {
    concat: e
  } = r;
  return function(t, a) {
    var o = Math.max(t._size.length, a._size.length);
    if (t._size.length === a._size.length && t._size.every((D, h) => D === a._size[h]))
      return [t, a];
    for (var v = n(t._size, o, 0), c = n(a._size, o, 0), l = [], s = 0; s < o; s++)
      l[s] = Math.max(v[s], c[s]);
    ct(v, l), ct(c, l);
    var u = t.clone(), f = a.clone();
    u._size.length < o ? u.reshape(n(u._size, o, 1)) : f._size.length < o && f.reshape(n(f._size, o, 1));
    for (var d = 0; d < o; d++)
      u._size[d] < l[d] && (u = i(u, l[d], d)), f._size[d] < l[d] && (f = i(f, l[d], d));
    return [u, f];
  };
  function n(t, a, o) {
    return [...Array(a - t.length).fill(o), ...t];
  }
  function i(t, a, o) {
    return e(...Array(a).fill(t), o);
  }
}), yf = "matrixAlgorithmSuite", wf = ["typed", "matrix", "concat"], Me = /* @__PURE__ */ rr(yf, wf, (r) => {
  var {
    typed: e,
    matrix: n,
    concat: i
  } = r, t = pf({
    typed: e
  }), a = ia({
    typed: e
  }), o = Df({
    concat: i
  });
  return function(c) {
    var l = c.elop, s = c.SD || c.DS, u;
    l ? (u = {
      "DenseMatrix, DenseMatrix": (h, m) => t(...o(h, m), l),
      "Array, Array": (h, m) => t(...o(n(h), n(m)), l).valueOf(),
      "Array, DenseMatrix": (h, m) => t(...o(n(h), m), l),
      "DenseMatrix, Array": (h, m) => t(...o(h, n(m)), l)
    }, c.SS && (u["SparseMatrix, SparseMatrix"] = (h, m) => c.SS(...o(h, m), l, !1)), c.DS && (u["DenseMatrix, SparseMatrix"] = (h, m) => c.DS(...o(h, m), l, !1), u["Array, SparseMatrix"] = (h, m) => c.DS(...o(n(h), m), l, !1)), s && (u["SparseMatrix, DenseMatrix"] = (h, m) => s(...o(m, h), l, !0), u["SparseMatrix, Array"] = (h, m) => s(...o(n(m), h), l, !0))) : (u = {
      "DenseMatrix, DenseMatrix": e.referToSelf((h) => (m, p) => t(...o(m, p), h)),
      "Array, Array": e.referToSelf((h) => (m, p) => t(...o(n(m), n(p)), h).valueOf()),
      "Array, DenseMatrix": e.referToSelf((h) => (m, p) => t(...o(n(m), p), h)),
      "DenseMatrix, Array": e.referToSelf((h) => (m, p) => t(...o(m, n(p)), h))
    }, c.SS && (u["SparseMatrix, SparseMatrix"] = e.referToSelf((h) => (m, p) => c.SS(...o(m, p), h, !1))), c.DS && (u["DenseMatrix, SparseMatrix"] = e.referToSelf((h) => (m, p) => c.DS(...o(m, p), h, !1)), u["Array, SparseMatrix"] = e.referToSelf((h) => (m, p) => c.DS(...o(n(m), p), h, !1))), s && (u["SparseMatrix, DenseMatrix"] = e.referToSelf((h) => (m, p) => s(...o(p, m), h, !0)), u["SparseMatrix, Array"] = e.referToSelf((h) => (m, p) => s(...o(n(p), m), h, !0))));
    var f = c.scalar || "any", d = c.Ds || c.Ss;
    d && (l ? (u["DenseMatrix," + f] = (h, m) => a(h, m, l, !1), u[f + ", DenseMatrix"] = (h, m) => a(m, h, l, !0), u["Array," + f] = (h, m) => a(n(h), m, l, !1).valueOf(), u[f + ", Array"] = (h, m) => a(n(m), h, l, !0).valueOf()) : (u["DenseMatrix," + f] = e.referToSelf((h) => (m, p) => a(m, p, h, !1)), u[f + ", DenseMatrix"] = e.referToSelf((h) => (m, p) => a(p, m, h, !0)), u["Array," + f] = e.referToSelf((h) => (m, p) => a(n(m), p, h, !1).valueOf()), u[f + ", Array"] = e.referToSelf((h) => (m, p) => a(n(p), m, h, !0).valueOf())));
    var D = c.sS !== void 0 ? c.sS : c.Ss;
    return l ? (c.Ss && (u["SparseMatrix," + f] = (h, m) => c.Ss(h, m, l, !1)), D && (u[f + ", SparseMatrix"] = (h, m) => D(m, h, l, !0))) : (c.Ss && (u["SparseMatrix," + f] = e.referToSelf((h) => (m, p) => c.Ss(m, p, h, !1))), D && (u[f + ", SparseMatrix"] = e.referToSelf((h) => (m, p) => D(p, m, h, !0)))), l && l.signatures && Mu(u, l.signatures), u;
  };
}), Af = "matAlgo01xDSid", Ef = ["typed"], aa = /* @__PURE__ */ rr(Af, Ef, (r) => {
  var {
    typed: e
  } = r;
  return function(i, t, a, o) {
    var v = i._data, c = i._size, l = i._datatype, s = t._values, u = t._index, f = t._ptr, d = t._size, D = t._datatype;
    if (c.length !== d.length)
      throw new Er(c.length, d.length);
    if (c[0] !== d[0] || c[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + d + ")");
    if (!s)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var h = c[0], m = c[1], p = typeof l == "string" && l === D ? l : void 0, w = p ? e.find(a, [p, p]) : a, g, E, F = [];
    for (g = 0; g < h; g++)
      F[g] = [];
    var y = [], C = [];
    for (E = 0; E < m; E++) {
      for (var b = E + 1, A = f[E], S = f[E + 1], M = A; M < S; M++)
        g = u[M], y[g] = o ? w(s[M], v[g][E]) : w(v[g][E], s[M]), C[g] = b;
      for (g = 0; g < h; g++)
        C[g] === b ? F[g][E] = y[g] : F[g][E] = v[g][E];
    }
    return i.createDenseMatrix({
      data: F,
      size: [h, m],
      datatype: p
    });
  };
}), Ff = "matAlgo04xSidSid", Cf = ["typed", "equalScalar"], bf = /* @__PURE__ */ rr(Ff, Cf, (r) => {
  var {
    typed: e,
    equalScalar: n
  } = r;
  return function(t, a, o) {
    var v = t._values, c = t._index, l = t._ptr, s = t._size, u = t._datatype, f = a._values, d = a._index, D = a._ptr, h = a._size, m = a._datatype;
    if (s.length !== h.length)
      throw new Er(s.length, h.length);
    if (s[0] !== h[0] || s[1] !== h[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + h + ")");
    var p = s[0], w = s[1], g, E = n, F = 0, y = o;
    typeof u == "string" && u === m && (g = u, E = e.find(n, [g, g]), F = e.convert(0, g), y = e.find(o, [g, g]));
    var C = v && f ? [] : void 0, b = [], A = [], S = v && f ? [] : void 0, M = v && f ? [] : void 0, N = [], O = [], T, I, B, G, q;
    for (I = 0; I < w; I++) {
      A[I] = b.length;
      var z = I + 1;
      for (G = l[I], q = l[I + 1], B = G; B < q; B++)
        T = c[B], b.push(T), N[T] = z, S && (S[T] = v[B]);
      for (G = D[I], q = D[I + 1], B = G; B < q; B++)
        if (T = d[B], N[T] === z) {
          if (S) {
            var V = y(S[T], f[B]);
            E(V, F) ? N[T] = null : S[T] = V;
          }
        } else
          b.push(T), O[T] = z, M && (M[T] = f[B]);
      if (S && M)
        for (B = A[I]; B < b.length; )
          T = b[B], N[T] === z ? (C[B] = S[T], B++) : O[T] === z ? (C[B] = M[T], B++) : b.splice(B, 1);
    }
    return A[w] = b.length, t.createSparseMatrix({
      values: C,
      index: b,
      ptr: A,
      size: [p, w],
      datatype: g
    });
  };
}), Mf = "matAlgo10xSids", Sf = ["typed", "DenseMatrix"], ua = /* @__PURE__ */ rr(Mf, Sf, (r) => {
  var {
    typed: e,
    DenseMatrix: n
  } = r;
  return function(t, a, o, v) {
    var c = t._values, l = t._index, s = t._ptr, u = t._size, f = t._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = u[0], D = u[1], h, m = o;
    typeof f == "string" && (h = f, a = e.convert(a, h), m = e.find(o, [h, h]));
    for (var p = [], w = [], g = [], E = 0; E < D; E++) {
      for (var F = E + 1, y = s[E], C = s[E + 1], b = y; b < C; b++) {
        var A = l[b];
        w[A] = c[b], g[A] = F;
      }
      for (var S = 0; S < d; S++)
        E === 0 && (p[S] = []), g[S] === F ? p[S][E] = v ? m(a, w[S]) : m(w[S], a) : p[S][E] = a;
    }
    return new n({
      data: p,
      size: [d, D],
      datatype: h
    });
  };
}), Nf = "multiplyScalar", xf = ["typed"], Bf = /* @__PURE__ */ rr(Nf, xf, (r) => {
  var {
    typed: e
  } = r;
  return e("multiplyScalar", {
    "number, number": ki,
    "Complex, Complex": function(i, t) {
      return i.mul(t);
    },
    "BigNumber, BigNumber": function(i, t) {
      return i.times(t);
    },
    "Fraction, Fraction": function(i, t) {
      return i.mul(t);
    },
    "number | Fraction | BigNumber | Complex, Unit": (n, i) => i.multiply(n),
    "Unit, number | Fraction | BigNumber | Complex | Unit": (n, i) => n.multiply(i)
  });
}), bn = "multiply", _f = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], zf = /* @__PURE__ */ rr(bn, _f, (r) => {
  var {
    typed: e,
    matrix: n,
    addScalar: i,
    multiplyScalar: t,
    equalScalar: a,
    dot: o
  } = r, v = tf({
    typed: e,
    equalScalar: a
  }), c = ia({
    typed: e
  });
  function l(F, y) {
    switch (F.length) {
      case 1:
        switch (y.length) {
          case 1:
            if (F[0] !== y[0])
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (F[0] !== y[0])
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + F[0] + ") must match Matrix rows (" + y[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + y.length + " dimensions)");
        }
        break;
      case 2:
        switch (y.length) {
          case 1:
            if (F[1] !== y[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + F[1] + ") must match Vector length (" + y[0] + ")");
            break;
          case 2:
            if (F[1] !== y[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + F[1] + ") must match Matrix B rows (" + y[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + y.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + F.length + " dimensions)");
    }
  }
  function s(F, y, C) {
    if (C === 0)
      throw new Error("Cannot multiply two empty vectors");
    return o(F, y);
  }
  function u(F, y) {
    if (y.storage() !== "dense")
      throw new Error("Support for SparseMatrix not implemented");
    return f(F, y);
  }
  function f(F, y) {
    var C = F._data, b = F._size, A = F._datatype, S = y._data, M = y._size, N = y._datatype, O = b[0], T = M[1], I, B = i, G = t;
    A && N && A === N && typeof A == "string" && (I = A, B = e.find(i, [I, I]), G = e.find(t, [I, I]));
    for (var q = [], z = 0; z < T; z++) {
      for (var V = G(C[0], S[0][z]), H = 1; H < O; H++)
        V = B(V, G(C[H], S[H][z]));
      q[z] = V;
    }
    return F.createDenseMatrix({
      data: q,
      size: [T],
      datatype: I
    });
  }
  var d = e("_multiplyMatrixVector", {
    "DenseMatrix, any": h,
    "SparseMatrix, any": w
  }), D = e("_multiplyMatrixMatrix", {
    "DenseMatrix, DenseMatrix": m,
    "DenseMatrix, SparseMatrix": p,
    "SparseMatrix, DenseMatrix": g,
    "SparseMatrix, SparseMatrix": E
  });
  function h(F, y) {
    var C = F._data, b = F._size, A = F._datatype, S = y._data, M = y._datatype, N = b[0], O = b[1], T, I = i, B = t;
    A && M && A === M && typeof A == "string" && (T = A, I = e.find(i, [T, T]), B = e.find(t, [T, T]));
    for (var G = [], q = 0; q < N; q++) {
      for (var z = C[q], V = B(z[0], S[0]), H = 1; H < O; H++)
        V = I(V, B(z[H], S[H]));
      G[q] = V;
    }
    return F.createDenseMatrix({
      data: G,
      size: [N],
      datatype: T
    });
  }
  function m(F, y) {
    var C = F._data, b = F._size, A = F._datatype, S = y._data, M = y._size, N = y._datatype, O = b[0], T = b[1], I = M[1], B, G = i, q = t;
    A && N && A === N && typeof A == "string" && (B = A, G = e.find(i, [B, B]), q = e.find(t, [B, B]));
    for (var z = [], V = 0; V < O; V++) {
      var H = C[V];
      z[V] = [];
      for (var P = 0; P < I; P++) {
        for (var L = q(H[0], S[0][P]), Z = 1; Z < T; Z++)
          L = G(L, q(H[Z], S[Z][P]));
        z[V][P] = L;
      }
    }
    return F.createDenseMatrix({
      data: z,
      size: [O, I],
      datatype: B
    });
  }
  function p(F, y) {
    var C = F._data, b = F._size, A = F._datatype, S = y._values, M = y._index, N = y._ptr, O = y._size, T = y._datatype;
    if (!S)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var I = b[0], B = O[1], G, q = i, z = t, V = a, H = 0;
    A && T && A === T && typeof A == "string" && (G = A, q = e.find(i, [G, G]), z = e.find(t, [G, G]), V = e.find(a, [G, G]), H = e.convert(0, G));
    for (var P = [], L = [], Z = [], nr = y.createSparseMatrix({
      values: P,
      index: L,
      ptr: Z,
      size: [I, B],
      datatype: G
    }), k = 0; k < B; k++) {
      Z[k] = L.length;
      var U = N[k], Q = N[k + 1];
      if (Q > U)
        for (var X = 0, J = 0; J < I; J++) {
          for (var ur = J + 1, j = void 0, or = U; or < Q; or++) {
            var fr = M[or];
            X !== ur ? (j = z(C[J][fr], S[or]), X = ur) : j = q(j, z(C[J][fr], S[or]));
          }
          X === ur && !V(j, H) && (L.push(J), P.push(j));
        }
    }
    return Z[B] = L.length, nr;
  }
  function w(F, y) {
    var C = F._values, b = F._index, A = F._ptr, S = F._datatype;
    if (!C)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var M = y._data, N = y._datatype, O = F._size[0], T = y._size[0], I = [], B = [], G = [], q, z = i, V = t, H = a, P = 0;
    S && N && S === N && typeof S == "string" && (q = S, z = e.find(i, [q, q]), V = e.find(t, [q, q]), H = e.find(a, [q, q]), P = e.convert(0, q));
    var L = [], Z = [];
    G[0] = 0;
    for (var nr = 0; nr < T; nr++) {
      var k = M[nr];
      if (!H(k, P))
        for (var U = A[nr], Q = A[nr + 1], X = U; X < Q; X++) {
          var J = b[X];
          Z[J] ? L[J] = z(L[J], V(k, C[X])) : (Z[J] = !0, B.push(J), L[J] = V(k, C[X]));
        }
    }
    for (var ur = B.length, j = 0; j < ur; j++) {
      var or = B[j];
      I[j] = L[or];
    }
    return G[1] = B.length, F.createSparseMatrix({
      values: I,
      index: B,
      ptr: G,
      size: [O, 1],
      datatype: q
    });
  }
  function g(F, y) {
    var C = F._values, b = F._index, A = F._ptr, S = F._datatype;
    if (!C)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var M = y._data, N = y._datatype, O = F._size[0], T = y._size[0], I = y._size[1], B, G = i, q = t, z = a, V = 0;
    S && N && S === N && typeof S == "string" && (B = S, G = e.find(i, [B, B]), q = e.find(t, [B, B]), z = e.find(a, [B, B]), V = e.convert(0, B));
    for (var H = [], P = [], L = [], Z = F.createSparseMatrix({
      values: H,
      index: P,
      ptr: L,
      size: [O, I],
      datatype: B
    }), nr = [], k = [], U = 0; U < I; U++) {
      L[U] = P.length;
      for (var Q = U + 1, X = 0; X < T; X++) {
        var J = M[X][U];
        if (!z(J, V))
          for (var ur = A[X], j = A[X + 1], or = ur; or < j; or++) {
            var fr = b[or];
            k[fr] !== Q ? (k[fr] = Q, P.push(fr), nr[fr] = q(J, C[or])) : nr[fr] = G(nr[fr], q(J, C[or]));
          }
      }
      for (var dr = L[U], gr = P.length, yr = dr; yr < gr; yr++) {
        var cr = P[yr];
        H[yr] = nr[cr];
      }
    }
    return L[I] = P.length, Z;
  }
  function E(F, y) {
    var C = F._values, b = F._index, A = F._ptr, S = F._datatype, M = y._values, N = y._index, O = y._ptr, T = y._datatype, I = F._size[0], B = y._size[1], G = C && M, q, z = i, V = t;
    S && T && S === T && typeof S == "string" && (q = S, z = e.find(i, [q, q]), V = e.find(t, [q, q]));
    for (var H = G ? [] : void 0, P = [], L = [], Z = F.createSparseMatrix({
      values: H,
      index: P,
      ptr: L,
      size: [I, B],
      datatype: q
    }), nr = G ? [] : void 0, k = [], U, Q, X, J, ur, j, or, fr, dr = 0; dr < B; dr++) {
      L[dr] = P.length;
      var gr = dr + 1;
      for (ur = O[dr], j = O[dr + 1], J = ur; J < j; J++)
        if (fr = N[J], G)
          for (Q = A[fr], X = A[fr + 1], U = Q; U < X; U++)
            or = b[U], k[or] !== gr ? (k[or] = gr, P.push(or), nr[or] = V(M[J], C[U])) : nr[or] = z(nr[or], V(M[J], C[U]));
        else
          for (Q = A[fr], X = A[fr + 1], U = Q; U < X; U++)
            or = b[U], k[or] !== gr && (k[or] = gr, P.push(or));
      if (G)
        for (var yr = L[dr], cr = P.length, Cr = yr; Cr < cr; Cr++) {
          var wr = P[Cr];
          H[Cr] = nr[wr];
        }
    }
    return L[B] = P.length, Z;
  }
  return e(bn, t, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices
    "Array, Array": e.referTo("Matrix, Matrix", (F) => (y, C) => {
      l(qr(y), qr(C));
      var b = F(n(y), n(C));
      return _r(b) ? b.valueOf() : b;
    }),
    "Matrix, Matrix": function(y, C) {
      var b = y.size(), A = C.size();
      return l(b, A), b.length === 1 ? A.length === 1 ? s(y, C, b[0]) : u(y, C) : A.length === 1 ? d(y, C) : D(y, C);
    },
    "Matrix, Array": e.referTo("Matrix,Matrix", (F) => (y, C) => F(y, n(C))),
    "Array, Matrix": e.referToSelf((F) => (y, C) => F(n(y, C.storage()), C)),
    "SparseMatrix, any": function(y, C) {
      return v(y, C, t, !1);
    },
    "DenseMatrix, any": function(y, C) {
      return c(y, C, t, !1);
    },
    "any, SparseMatrix": function(y, C) {
      return v(C, y, t, !0);
    },
    "any, DenseMatrix": function(y, C) {
      return c(C, y, t, !0);
    },
    "Array, any": function(y, C) {
      return c(n(y), C, t, !1).valueOf();
    },
    "any, Array": function(y, C) {
      return c(n(C), y, t, !0).valueOf();
    },
    "any, any": t,
    "any, any, ...any": e.referToSelf((F) => (y, C, b) => {
      for (var A = F(y, C), S = 0; S < b.length; S++)
        A = F(A, b[S]);
      return A;
    })
  });
}), Mn = "sign", Tf = ["typed", "BigNumber", "Fraction", "complex"], Of = /* @__PURE__ */ rr(Mn, Tf, (r) => {
  var {
    typed: e,
    BigNumber: n,
    complex: i,
    Fraction: t
  } = r;
  return e(Mn, {
    number: Vt,
    Complex: function(o) {
      return o.im === 0 ? i(Vt(o.re)) : o.sign();
    },
    BigNumber: function(o) {
      return new n(o.cmp(0));
    },
    Fraction: function(o) {
      return new t(o.s, 1);
    },
    // deep map collection, skip zeros since sign(0) = 0
    "Array | Matrix": e.referToSelf((a) => (o) => jr(o, a)),
    Unit: e.referToSelf((a) => (o) => {
      if (!o._isDerived() && o.units[0].unit.offset !== 0)
        throw new TypeError("sign is ambiguous for units with offset");
      return e.find(a, o.valueType())(o.value);
    })
  });
}), If = "sqrt", $f = ["config", "typed", "Complex"], qf = /* @__PURE__ */ rr(If, $f, (r) => {
  var {
    config: e,
    typed: n,
    Complex: i
  } = r;
  return n("sqrt", {
    number: t,
    Complex: function(o) {
      return o.sqrt();
    },
    BigNumber: function(o) {
      return !o.isNegative() || e.predictable ? o.sqrt() : t(o.toNumber());
    },
    Unit: function(o) {
      return o.pow(0.5);
    }
  });
  function t(a) {
    return isNaN(a) ? NaN : a >= 0 || e.predictable ? Math.sqrt(a) : new i(a, 0).sqrt();
  }
}), Sn = "subtract", Lf = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], Pf = /* @__PURE__ */ rr(Sn, Lf, (r) => {
  var {
    typed: e,
    matrix: n,
    equalScalar: i,
    subtractScalar: t,
    unaryMinus: a,
    DenseMatrix: o,
    concat: v
  } = r, c = aa({
    typed: e
  }), l = Re({
    typed: e
  }), s = vf({
    typed: e,
    equalScalar: i
  }), u = ua({
    typed: e,
    DenseMatrix: o
  }), f = Pe({
    typed: e,
    DenseMatrix: o
  }), d = Me({
    typed: e,
    matrix: n,
    concat: v
  });
  return e(Sn, {
    "any, any": t
  }, d({
    elop: t,
    SS: s,
    DS: c,
    SD: l,
    Ss: f,
    sS: u
  }));
}), Rf = "matAlgo07xSSf", Uf = ["typed", "DenseMatrix"], He = /* @__PURE__ */ rr(Rf, Uf, (r) => {
  var {
    typed: e,
    DenseMatrix: n
  } = r;
  return function(a, o, v) {
    var c = a._size, l = a._datatype, s = o._size, u = o._datatype;
    if (c.length !== s.length)
      throw new Er(c.length, s.length);
    if (c[0] !== s[0] || c[1] !== s[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + s + ")");
    var f = c[0], d = c[1], D, h = 0, m = v;
    typeof l == "string" && l === u && (D = l, h = e.convert(0, D), m = e.find(v, [D, D]));
    var p, w, g = [];
    for (p = 0; p < f; p++)
      g[p] = [];
    var E = [], F = [], y = [], C = [];
    for (w = 0; w < d; w++) {
      var b = w + 1;
      for (i(a, w, y, E, b), i(o, w, C, F, b), p = 0; p < f; p++) {
        var A = y[p] === b ? E[p] : h, S = C[p] === b ? F[p] : h;
        g[p][w] = m(A, S);
      }
    }
    return new n({
      data: g,
      size: [f, d],
      datatype: D
    });
  };
  function i(t, a, o, v, c) {
    for (var l = t._values, s = t._index, u = t._ptr, f = u[a], d = u[a + 1]; f < d; f++) {
      var D = s[f];
      o[D] = c, v[D] = l[f];
    }
  }
}), Nn = "conj", Vf = ["typed"], Zf = /* @__PURE__ */ rr(Nn, Vf, (r) => {
  var {
    typed: e
  } = r;
  return e(Nn, {
    "number | BigNumber | Fraction": (n) => n,
    Complex: (n) => n.conjugate(),
    "Array | Matrix": e.referToSelf((n) => (i) => jr(i, n))
  });
}), xn = "im", Gf = ["typed"], Yf = /* @__PURE__ */ rr(xn, Gf, (r) => {
  var {
    typed: e
  } = r;
  return e(xn, {
    number: () => 0,
    "BigNumber | Fraction": (n) => n.mul(0),
    Complex: (n) => n.im,
    "Array | Matrix": e.referToSelf((n) => (i) => jr(i, n))
  });
}), Bn = "re", Jf = ["typed"], Qf = /* @__PURE__ */ rr(Bn, Jf, (r) => {
  var {
    typed: e
  } = r;
  return e(Bn, {
    "number | BigNumber | Fraction": (n) => n,
    Complex: (n) => n.re,
    "Array | Matrix": e.referToSelf((n) => (i) => jr(i, n))
  });
}), _n = "concat", Xf = ["typed", "matrix", "isInteger"], Kf = /* @__PURE__ */ rr(_n, Xf, (r) => {
  var {
    typed: e,
    matrix: n,
    isInteger: i
  } = r;
  return e(_n, {
    // TODO: change signature to '...Array | Matrix, dim?' when supported
    "...Array | Matrix | number | BigNumber": function(a) {
      var o, v = a.length, c = -1, l, s = !1, u = [];
      for (o = 0; o < v; o++) {
        var f = a[o];
        if (_r(f) && (s = !0), $r(f) || Pr(f)) {
          if (o !== v - 1)
            throw new Error("Dimension must be specified as last argument");
          if (l = c, c = f.valueOf(), !i(c))
            throw new TypeError("Integer number expected for dimension");
          if (c < 0 || o > 0 && c > l)
            throw new be(c, l + 1);
        } else {
          var d = Fr(f).valueOf(), D = qr(d);
          if (u[o] = d, l = c, c = D.length - 1, o > 0 && c !== l)
            throw new Er(l + 1, c + 1);
        }
      }
      if (u.length === 0)
        throw new SyntaxError("At least one matrix expected");
      for (var h = u.shift(); u.length; )
        h = Ni(h, u.shift(), c);
      return s ? n(h) : h;
    },
    "...string": function(a) {
      return a.join("");
    }
  });
}), zn = "column", Hf = ["typed", "Index", "matrix", "range"], Wf = /* @__PURE__ */ rr(zn, Hf, (r) => {
  var {
    typed: e,
    Index: n,
    matrix: i,
    range: t
  } = r;
  return e(zn, {
    "Matrix, number": a,
    "Array, number": function(v, c) {
      return a(i(Fr(v)), c).valueOf();
    }
  });
  function a(o, v) {
    if (o.size().length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    Br(v, o.size()[1]);
    var c = t(0, o.size()[0]), l = new n(c, v), s = o.subset(l);
    return _r(s) ? s : i([[s]]);
  }
}), Tn = "diag", kf = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], jf = /* @__PURE__ */ rr(Tn, kf, (r) => {
  var {
    typed: e,
    matrix: n,
    DenseMatrix: i,
    SparseMatrix: t
  } = r;
  return e(Tn, {
    // FIXME: simplify this huge amount of signatures as soon as typed-function supports optional arguments
    Array: function(l) {
      return a(l, 0, qr(l), null);
    },
    "Array, number": function(l, s) {
      return a(l, s, qr(l), null);
    },
    "Array, BigNumber": function(l, s) {
      return a(l, s.toNumber(), qr(l), null);
    },
    "Array, string": function(l, s) {
      return a(l, 0, qr(l), s);
    },
    "Array, number, string": function(l, s, u) {
      return a(l, s, qr(l), u);
    },
    "Array, BigNumber, string": function(l, s, u) {
      return a(l, s.toNumber(), qr(l), u);
    },
    Matrix: function(l) {
      return a(l, 0, l.size(), l.storage());
    },
    "Matrix, number": function(l, s) {
      return a(l, s, l.size(), l.storage());
    },
    "Matrix, BigNumber": function(l, s) {
      return a(l, s.toNumber(), l.size(), l.storage());
    },
    "Matrix, string": function(l, s) {
      return a(l, 0, l.size(), s);
    },
    "Matrix, number, string": function(l, s, u) {
      return a(l, s, l.size(), u);
    },
    "Matrix, BigNumber, string": function(l, s, u) {
      return a(l, s.toNumber(), l.size(), u);
    }
  });
  function a(c, l, s, u) {
    if (!zr(l))
      throw new TypeError("Second parameter in function diag must be an integer");
    var f = l > 0 ? l : 0, d = l < 0 ? -l : 0;
    switch (s.length) {
      case 1:
        return o(c, l, u, s[0], d, f);
      case 2:
        return v(c, l, u, s, d, f);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function o(c, l, s, u, f, d) {
    var D = [u + f, u + d];
    if (s && s !== "sparse" && s !== "dense")
      throw new TypeError("Unknown matrix type ".concat(s, '"'));
    var h = s === "sparse" ? t.diagonal(D, c, l) : i.diagonal(D, c, l);
    return s !== null ? h : h.valueOf();
  }
  function v(c, l, s, u, f, d) {
    if (_r(c)) {
      var D = c.diagonal(l);
      return s !== null ? s !== D.storage() ? n(D, s) : D : D.valueOf();
    }
    for (var h = Math.min(u[0] - f, u[1] - d), m = [], p = 0; p < h; p++)
      m[p] = c[p + f][p + d];
    return s !== null ? n(m) : m;
  }
}), On = "flatten", rc = ["typed", "matrix"], ec = /* @__PURE__ */ rr(On, rc, (r) => {
  var {
    typed: e,
    matrix: n
  } = r;
  return e(On, {
    Array: function(t) {
      return $t(t);
    },
    Matrix: function(t) {
      var a = $t(t.toArray());
      return n(a);
    }
  });
}), In = "getMatrixDataType", tc = ["typed"], nc = /* @__PURE__ */ rr(In, tc, (r) => {
  var {
    typed: e
  } = r;
  return e(In, {
    Array: function(i) {
      return Je(i, fe);
    },
    Matrix: function(i) {
      return i.getDataType();
    }
  });
}), $n = "identity", ic = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], ac = /* @__PURE__ */ rr($n, ic, (r) => {
  var {
    typed: e,
    config: n,
    matrix: i,
    BigNumber: t,
    DenseMatrix: a,
    SparseMatrix: o
  } = r;
  return e($n, {
    "": function() {
      return n.matrix === "Matrix" ? i([]) : [];
    },
    string: function(s) {
      return i(s);
    },
    "number | BigNumber": function(s) {
      return c(s, s, n.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, string": function(s, u) {
      return c(s, s, u);
    },
    "number | BigNumber, number | BigNumber": function(s, u) {
      return c(s, u, n.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, number | BigNumber, string": function(s, u, f) {
      return c(s, u, f);
    },
    Array: function(s) {
      return v(s);
    },
    "Array, string": function(s, u) {
      return v(s, u);
    },
    Matrix: function(s) {
      return v(s.valueOf(), s.storage());
    },
    "Matrix, string": function(s, u) {
      return v(s.valueOf(), u);
    }
  });
  function v(l, s) {
    switch (l.length) {
      case 0:
        return s ? i(s) : [];
      case 1:
        return c(l[0], l[0], s);
      case 2:
        return c(l[0], l[1], s);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function c(l, s, u) {
    var f = Pr(l) || Pr(s) ? t : null;
    if (Pr(l) && (l = l.toNumber()), Pr(s) && (s = s.toNumber()), !zr(l) || l < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!zr(s) || s < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var d = f ? new t(1) : 1, D = f ? new f(0) : 0, h = [l, s];
    if (u) {
      if (u === "sparse")
        return o.diagonal(h, d, 0, D);
      if (u === "dense")
        return a.diagonal(h, d, 0, D);
      throw new TypeError('Unknown matrix type "'.concat(u, '"'));
    }
    for (var m = ft([], h, D), p = l < s ? l : s, w = 0; w < p; w++)
      m[w][w] = d;
    return m;
  }
});
function oa() {
  throw new Error('No "bignumber" implementation available');
}
function uc() {
  throw new Error('No "fraction" implementation available');
}
function sa() {
  throw new Error('No "matrix" implementation available');
}
var qn = "range", oc = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], sc = /* @__PURE__ */ rr(qn, oc, (r) => {
  var {
    typed: e,
    config: n,
    matrix: i,
    bignumber: t,
    smaller: a,
    smallerEq: o,
    larger: v,
    largerEq: c,
    add: l,
    isPositive: s
  } = r;
  return e(qn, {
    // TODO: simplify signatures when typed-function supports default values and optional arguments
    // TODO: a number or boolean should not be converted to string here
    string: f,
    "string, boolean": f,
    "number, number": function(m, p) {
      return u(d(m, p, 1, !1));
    },
    "number, number, number": function(m, p, w) {
      return u(d(m, p, w, !1));
    },
    "number, number, boolean": function(m, p, w) {
      return u(d(m, p, 1, w));
    },
    "number, number, number, boolean": function(m, p, w, g) {
      return u(d(m, p, w, g));
    },
    "BigNumber, BigNumber": function(m, p) {
      var w = m.constructor;
      return u(d(m, p, new w(1), !1));
    },
    "BigNumber, BigNumber, BigNumber": function(m, p, w) {
      return u(d(m, p, w, !1));
    },
    "BigNumber, BigNumber, boolean": function(m, p, w) {
      var g = m.constructor;
      return u(d(m, p, new g(1), w));
    },
    "BigNumber, BigNumber, BigNumber, boolean": function(m, p, w, g) {
      return u(d(m, p, w, g));
    },
    "Unit, Unit, Unit": function(m, p, w) {
      return u(d(m, p, w, !1));
    },
    "Unit, Unit, Unit, boolean": function(m, p, w, g) {
      return u(d(m, p, w, g));
    }
  });
  function u(h) {
    return n.matrix === "Matrix" ? i ? i(h) : sa() : h;
  }
  function f(h, m) {
    var p = D(h);
    if (!p)
      throw new SyntaxError('String "' + h + '" is no valid range');
    return n.number === "BigNumber" ? (t === void 0 && oa(), u(d(t(p.start), t(p.end), t(p.step)))) : u(d(p.start, p.end, p.step, m));
  }
  function d(h, m, p, w) {
    for (var g = [], E = s(p) ? w ? o : a : w ? c : v, F = h; E(F, m); )
      g.push(F), F = l(F, p);
    return g;
  }
  function D(h) {
    var m = h.split(":"), p = m.map(function(g) {
      return Number(g);
    }), w = p.some(function(g) {
      return isNaN(g);
    });
    if (w)
      return null;
    switch (p.length) {
      case 2:
        return {
          start: p[0],
          end: p[1],
          step: 1
        };
      case 3:
        return {
          start: p[0],
          end: p[2],
          step: p[1]
        };
      default:
        return null;
    }
  }
}), Ln = "reshape", fc = ["typed", "isInteger", "matrix"], cc = /* @__PURE__ */ rr(Ln, fc, (r) => {
  var {
    typed: e,
    isInteger: n
  } = r;
  return e(Ln, {
    "Matrix, Array": function(t, a) {
      return t.reshape(a, !0);
    },
    "Array, Array": function(t, a) {
      return a.forEach(function(o) {
        if (!n(o))
          throw new TypeError("Invalid size for dimension: " + o);
      }), Jt(t, a);
    }
  });
}), Pn = "size", lc = ["typed", "config", "?matrix"], vc = /* @__PURE__ */ rr(Pn, lc, (r) => {
  var {
    typed: e,
    config: n,
    matrix: i
  } = r;
  return e(Pn, {
    Matrix: function(a) {
      return a.create(a.size());
    },
    Array: qr,
    string: function(a) {
      return n.matrix === "Array" ? [a.length] : i([a.length]);
    },
    "number | Complex | BigNumber | Unit | boolean | null": function(a) {
      return n.matrix === "Array" ? [] : i ? i([]) : sa();
    }
  });
}), Rn = "squeeze", hc = ["typed", "matrix"], dc = /* @__PURE__ */ rr(Rn, hc, (r) => {
  var {
    typed: e,
    matrix: n
  } = r;
  return e(Rn, {
    Array: function(t) {
      return cn(Fr(t));
    },
    Matrix: function(t) {
      var a = cn(t.toArray());
      return Array.isArray(a) ? n(a) : a;
    },
    any: function(t) {
      return Fr(t);
    }
  });
}), Un = "subset", pc = ["typed", "matrix", "zeros", "add"], mc = /* @__PURE__ */ rr(Un, pc, (r) => {
  var {
    typed: e,
    matrix: n,
    zeros: i,
    add: t
  } = r;
  return e(Un, {
    // get subset
    "Matrix, Index": function(v, c) {
      return $e(c) ? n() : (st(v, c), v.subset(c));
    },
    "Array, Index": e.referTo("Matrix, Index", function(o) {
      return function(v, c) {
        var l = o(n(v), c);
        return c.isScalar() ? l : l.valueOf();
      };
    }),
    "Object, Index": Dc,
    "string, Index": gc,
    // set subset
    "Matrix, Index, any, any": function(v, c, l, s) {
      return $e(c) ? v : (st(v, c), v.clone().subset(c, a(l, c), s));
    },
    "Array, Index, any, any": e.referTo("Matrix, Index, any, any", function(o) {
      return function(v, c, l, s) {
        var u = o(n(v), c, l, s);
        return u.isMatrix ? u.valueOf() : u;
      };
    }),
    "Array, Index, any": e.referTo("Matrix, Index, any, any", function(o) {
      return function(v, c, l) {
        return o(n(v), c, l, void 0).valueOf();
      };
    }),
    "Matrix, Index, any": e.referTo("Matrix, Index, any, any", function(o) {
      return function(v, c, l) {
        return o(v, c, l, void 0);
      };
    }),
    "string, Index, string": Vn,
    "string, Index, string, string": Vn,
    "Object, Index, any": yc
  });
  function a(o, v) {
    if (typeof o == "string")
      throw new Error("can't boradcast a string");
    if (v._isScalar)
      return o;
    var c = v.size();
    if (c.every((l) => l > 0))
      try {
        return t(o, i(c));
      } catch {
        return o;
      }
    else
      return o;
  }
});
function gc(r, e) {
  if (!wt(e))
    throw new TypeError("Index expected");
  if ($e(e))
    return "";
  if (st(Array.from(r), e), e.size().length !== 1)
    throw new Er(e.size().length, 1);
  var n = r.length;
  Br(e.min()[0], n), Br(e.max()[0], n);
  var i = e.dimension(0), t = "";
  return i.forEach(function(a) {
    t += r.charAt(a);
  }), t;
}
function Vn(r, e, n, i) {
  if (!e || e.isIndex !== !0)
    throw new TypeError("Index expected");
  if ($e(e))
    return r;
  if (st(Array.from(r), e), e.size().length !== 1)
    throw new Er(e.size().length, 1);
  if (i !== void 0) {
    if (typeof i != "string" || i.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    i = " ";
  var t = e.dimension(0), a = t.size()[0];
  if (a !== n.length)
    throw new Er(t.size()[0], n.length);
  var o = r.length;
  Br(e.min()[0]), Br(e.max()[0]);
  for (var v = [], c = 0; c < o; c++)
    v[c] = r.charAt(c);
  if (t.forEach(function(u, f) {
    v[u] = n.charAt(f[0]);
  }), v.length > o)
    for (var l = o - 1, s = v.length; l < s; l++)
      v[l] || (v[l] = i);
  return v.join("");
}
function Dc(r, e) {
  if (!$e(e)) {
    if (e.size().length !== 1)
      throw new Er(e.size(), 1);
    var n = e.dimension(0);
    if (typeof n != "string")
      throw new TypeError("String expected as index to retrieve an object property");
    return xi(r, n);
  }
}
function yc(r, e, n) {
  if ($e(e))
    return r;
  if (e.size().length !== 1)
    throw new Er(e.size(), 1);
  var i = e.dimension(0);
  if (typeof i != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var t = Fr(r);
  return Bi(t, i, n), t;
}
var Zn = "transpose", wc = ["typed", "matrix"], Ac = /* @__PURE__ */ rr(Zn, wc, (r) => {
  var {
    typed: e,
    matrix: n
  } = r;
  return e(Zn, {
    Array: (o) => i(n(o)).valueOf(),
    Matrix: i,
    any: Fr
    // scalars
  });
  function i(o) {
    var v = o.size(), c;
    switch (v.length) {
      case 1:
        c = o.clone();
        break;
      case 2:
        {
          var l = v[0], s = v[1];
          if (s === 0)
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Ir(v) + ")");
          switch (o.storage()) {
            case "dense":
              c = t(o, l, s);
              break;
            case "sparse":
              c = a(o, l, s);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + Ir(v) + ")");
    }
    return c;
  }
  function t(o, v, c) {
    for (var l = o._data, s = [], u, f = 0; f < c; f++) {
      u = s[f] = [];
      for (var d = 0; d < v; d++)
        u[d] = Fr(l[d][f]);
    }
    return o.createDenseMatrix({
      data: s,
      size: [c, v],
      datatype: o._datatype
    });
  }
  function a(o, v, c) {
    for (var l = o._values, s = o._index, u = o._ptr, f = l ? [] : void 0, d = [], D = [], h = [], m = 0; m < v; m++)
      h[m] = 0;
    var p, w, g;
    for (p = 0, w = s.length; p < w; p++)
      h[s[p]]++;
    for (var E = 0, F = 0; F < v; F++)
      D.push(E), E += h[F], h[F] = D[F];
    for (D.push(E), g = 0; g < c; g++)
      for (var y = u[g], C = u[g + 1], b = y; b < C; b++) {
        var A = h[s[b]]++;
        d[A] = g, l && (f[A] = Fr(l[b]));
      }
    return o.createSparseMatrix({
      values: f,
      index: d,
      ptr: D,
      size: [c, v],
      datatype: o._datatype
    });
  }
}), Gn = "ctranspose", Ec = ["typed", "transpose", "conj"], Fc = /* @__PURE__ */ rr(Gn, Ec, (r) => {
  var {
    typed: e,
    transpose: n,
    conj: i
  } = r;
  return e(Gn, {
    any: function(a) {
      return i(n(a));
    }
  });
}), Yn = "zeros", Cc = ["typed", "config", "matrix", "BigNumber"], bc = /* @__PURE__ */ rr(Yn, Cc, (r) => {
  var {
    typed: e,
    config: n,
    matrix: i,
    BigNumber: t
  } = r;
  return e(Yn, {
    "": function() {
      return n.matrix === "Array" ? a([]) : a([], "default");
    },
    // math.zeros(m, n, p, ..., format)
    // TODO: more accurate signature '...number | BigNumber, string' as soon as typed-function supports this
    "...number | BigNumber | string": function(l) {
      var s = l[l.length - 1];
      if (typeof s == "string") {
        var u = l.pop();
        return a(l, u);
      } else
        return n.matrix === "Array" ? a(l) : a(l, "default");
    },
    Array: a,
    Matrix: function(l) {
      var s = l.storage();
      return a(l.valueOf(), s);
    },
    "Array | Matrix, string": function(l, s) {
      return a(l.valueOf(), s);
    }
  });
  function a(c, l) {
    var s = o(c), u = s ? new t(0) : 0;
    if (v(c), l) {
      var f = i(l);
      return c.length > 0 ? f.resize(c, u) : f;
    } else {
      var d = [];
      return c.length > 0 ? ft(d, c, u) : d;
    }
  }
  function o(c) {
    var l = !1;
    return c.forEach(function(s, u, f) {
      Pr(s) && (l = !0, f[u] = s.toNumber());
    }), l;
  }
  function v(c) {
    c.forEach(function(l) {
      if (typeof l != "number" || !zr(l) || l < 0)
        throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), Mc = "numeric", Sc = ["number", "?bignumber", "?fraction"], Nc = /* @__PURE__ */ rr(Mc, Sc, (r) => {
  var {
    number: e,
    bignumber: n,
    fraction: i
  } = r, t = {
    string: !0,
    number: !0,
    BigNumber: !0,
    Fraction: !0
  }, a = {
    number: (o) => e(o),
    BigNumber: n ? (o) => n(o) : oa,
    Fraction: i ? (o) => i(o) : uc
  };
  return function(v) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", l = arguments.length > 2 ? arguments[2] : void 0;
    if (l !== void 0)
      throw new SyntaxError("numeric() takes one or two arguments");
    var s = fe(v);
    if (!(s in t))
      throw new TypeError("Cannot convert " + v + ' of type "' + s + '"; valid input types are ' + Object.keys(t).join(", "));
    if (!(c in a))
      throw new TypeError("Cannot convert " + v + ' to type "' + c + '"; valid output types are ' + Object.keys(a).join(", "));
    return c === s ? v : a[c](v);
  };
}), Jn = "divideScalar", xc = ["typed", "numeric"], Bc = /* @__PURE__ */ rr(Jn, xc, (r) => {
  var {
    typed: e,
    numeric: n
  } = r;
  return e(Jn, {
    "number, number": function(t, a) {
      return t / a;
    },
    "Complex, Complex": function(t, a) {
      return t.div(a);
    },
    "BigNumber, BigNumber": function(t, a) {
      return t.div(a);
    },
    "Fraction, Fraction": function(t, a) {
      return t.div(a);
    },
    "Unit, number | Complex | Fraction | BigNumber | Unit": (i, t) => i.divide(t),
    "number | Fraction | Complex | BigNumber, Unit": (i, t) => t.divideInto(i)
  });
}), Qn = "pow", _c = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], zc = /* @__PURE__ */ rr(Qn, _c, (r) => {
  var {
    typed: e,
    config: n,
    identity: i,
    multiply: t,
    matrix: a,
    inv: o,
    number: v,
    fraction: c,
    Complex: l
  } = r;
  return e(Qn, {
    "number, number": s,
    "Complex, Complex": function(D, h) {
      return D.pow(h);
    },
    "BigNumber, BigNumber": function(D, h) {
      return h.isInteger() || D >= 0 || n.predictable ? D.pow(h) : new l(D.toNumber(), 0).pow(h.toNumber(), 0);
    },
    "Fraction, Fraction": function(D, h) {
      var m = D.pow(h);
      if (m != null)
        return m;
      if (n.predictable)
        throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
      return s(D.valueOf(), h.valueOf());
    },
    "Array, number": u,
    "Array, BigNumber": function(D, h) {
      return u(D, h.toNumber());
    },
    "Matrix, number": f,
    "Matrix, BigNumber": function(D, h) {
      return f(D, h.toNumber());
    },
    "Unit, number | BigNumber": function(D, h) {
      return D.pow(h);
    }
  });
  function s(d, D) {
    if (n.predictable && !zr(D) && d < 0)
      try {
        var h = c(D), m = v(h);
        if ((D === m || Math.abs((D - m) / D) < 1e-14) && h.d % 2 === 1)
          return (h.n % 2 === 0 ? 1 : -1) * Math.pow(-d, D);
      } catch {
      }
    return n.predictable && (d < -1 && D === 1 / 0 || d > -1 && d < 0 && D === -1 / 0) ? NaN : zr(D) || d >= 0 || n.predictable ? ra(d, D) : d * d < 1 && D === 1 / 0 || d * d > 1 && D === -1 / 0 ? 0 : new l(d, 0).pow(D, 0);
  }
  function u(d, D) {
    if (!zr(D))
      throw new TypeError("For A^b, b must be an integer (value is " + D + ")");
    var h = qr(d);
    if (h.length !== 2)
      throw new Error("For A^b, A must be 2 dimensional (A has " + h.length + " dimensions)");
    if (h[0] !== h[1])
      throw new Error("For A^b, A must be square (size is " + h[0] + "x" + h[1] + ")");
    if (D < 0)
      try {
        return u(o(d), -D);
      } catch (w) {
        throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + D + ")") : w;
      }
    for (var m = i(h[0]).valueOf(), p = d; D >= 1; )
      (D & 1) === 1 && (m = t(p, m)), D >>= 1, p = t(p, p);
    return m;
  }
  function f(d, D) {
    return a(u(d.valueOf(), D));
  }
});
function St(r) {
  var {
    DenseMatrix: e
  } = r;
  return function(i, t, a) {
    var o = i.size();
    if (o.length !== 2)
      throw new RangeError("Matrix must be two dimensional (size: " + Ir(o) + ")");
    var v = o[0], c = o[1];
    if (v !== c)
      throw new RangeError("Matrix must be square (size: " + Ir(o) + ")");
    var l = [];
    if (_r(t)) {
      var s = t.size(), u = t._data;
      if (s.length === 1) {
        if (s[0] !== v)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var f = 0; f < v; f++)
          l[f] = [u[f]];
        return new e({
          data: l,
          size: [v, 1],
          datatype: t._datatype
        });
      }
      if (s.length === 2) {
        if (s[0] !== v || s[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (pi(t)) {
          if (a) {
            l = [];
            for (var d = 0; d < v; d++)
              l[d] = [u[d][0]];
            return new e({
              data: l,
              size: [v, 1],
              datatype: t._datatype
            });
          }
          return t;
        }
        if (mi(t)) {
          for (var D = 0; D < v; D++)
            l[D] = [0];
          for (var h = t._values, m = t._index, p = t._ptr, w = p[1], g = p[0]; g < w; g++) {
            var E = m[g];
            l[E][0] = h[g];
          }
          return new e({
            data: l,
            size: [v, 1],
            datatype: t._datatype
          });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Mr(t)) {
      var F = qr(t);
      if (F.length === 1) {
        if (F[0] !== v)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var y = 0; y < v; y++)
          l[y] = [t[y]];
        return new e({
          data: l,
          size: [v, 1]
        });
      }
      if (F.length === 2) {
        if (F[0] !== v || F[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var C = 0; C < v; C++)
          l[C] = [t[C][0]];
        return new e({
          data: l,
          size: [v, 1]
        });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var Xn = "lsolve", Tc = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Oc = /* @__PURE__ */ rr(Xn, Tc, (r) => {
  var {
    typed: e,
    matrix: n,
    divideScalar: i,
    multiplyScalar: t,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: v
  } = r, c = St({
    DenseMatrix: v
  });
  return e(Xn, {
    "SparseMatrix, Array | Matrix": function(f, d) {
      return s(f, d);
    },
    "DenseMatrix, Array | Matrix": function(f, d) {
      return l(f, d);
    },
    "Array, Array | Matrix": function(f, d) {
      var D = n(f), h = l(D, d);
      return h.valueOf();
    }
  });
  function l(u, f) {
    f = c(u, f, !0);
    for (var d = f._data, D = u._size[0], h = u._size[1], m = [], p = u._data, w = 0; w < h; w++) {
      var g = d[w][0] || 0, E = void 0;
      if (o(g, 0))
        E = 0;
      else {
        var F = p[w][w];
        if (o(F, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        E = i(g, F);
        for (var y = w + 1; y < D; y++)
          d[y] = [a(d[y][0] || 0, t(E, p[y][w]))];
      }
      m[w] = [E];
    }
    return new v({
      data: m,
      size: [D, 1]
    });
  }
  function s(u, f) {
    f = c(u, f, !0);
    for (var d = f._data, D = u._size[0], h = u._size[1], m = u._values, p = u._index, w = u._ptr, g = [], E = 0; E < h; E++) {
      var F = d[E][0] || 0;
      if (o(F, 0))
        g[E] = [0];
      else {
        for (var y = 0, C = [], b = [], A = w[E], S = w[E + 1], M = A; M < S; M++) {
          var N = p[M];
          N === E ? y = m[M] : N > E && (C.push(m[M]), b.push(N));
        }
        if (o(y, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = i(F, y), T = 0, I = b.length; T < I; T++) {
          var B = b[T];
          d[B] = [a(d[B][0] || 0, t(O, C[T]))];
        }
        g[E] = [O];
      }
    }
    return new v({
      data: g,
      size: [D, 1]
    });
  }
}), Kn = "usolve", Ic = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], $c = /* @__PURE__ */ rr(Kn, Ic, (r) => {
  var {
    typed: e,
    matrix: n,
    divideScalar: i,
    multiplyScalar: t,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: v
  } = r, c = St({
    DenseMatrix: v
  });
  return e(Kn, {
    "SparseMatrix, Array | Matrix": function(f, d) {
      return s(f, d);
    },
    "DenseMatrix, Array | Matrix": function(f, d) {
      return l(f, d);
    },
    "Array, Array | Matrix": function(f, d) {
      var D = n(f), h = l(D, d);
      return h.valueOf();
    }
  });
  function l(u, f) {
    f = c(u, f, !0);
    for (var d = f._data, D = u._size[0], h = u._size[1], m = [], p = u._data, w = h - 1; w >= 0; w--) {
      var g = d[w][0] || 0, E = void 0;
      if (o(g, 0))
        E = 0;
      else {
        var F = p[w][w];
        if (o(F, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        E = i(g, F);
        for (var y = w - 1; y >= 0; y--)
          d[y] = [a(d[y][0] || 0, t(E, p[y][w]))];
      }
      m[w] = [E];
    }
    return new v({
      data: m,
      size: [D, 1]
    });
  }
  function s(u, f) {
    f = c(u, f, !0);
    for (var d = f._data, D = u._size[0], h = u._size[1], m = u._values, p = u._index, w = u._ptr, g = [], E = h - 1; E >= 0; E--) {
      var F = d[E][0] || 0;
      if (o(F, 0))
        g[E] = [0];
      else {
        for (var y = 0, C = [], b = [], A = w[E], S = w[E + 1], M = S - 1; M >= A; M--) {
          var N = p[M];
          N === E ? y = m[M] : N < E && (C.push(m[M]), b.push(N));
        }
        if (o(y, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = i(F, y), T = 0, I = b.length; T < I; T++) {
          var B = b[T];
          d[B] = [a(d[B][0], t(O, C[T]))];
        }
        g[E] = [O];
      }
    }
    return new v({
      data: g,
      size: [D, 1]
    });
  }
}), Hn = "usolveAll", qc = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Lc = /* @__PURE__ */ rr(Hn, qc, (r) => {
  var {
    typed: e,
    matrix: n,
    divideScalar: i,
    multiplyScalar: t,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: v
  } = r, c = St({
    DenseMatrix: v
  });
  return e(Hn, {
    "SparseMatrix, Array | Matrix": function(f, d) {
      return s(f, d);
    },
    "DenseMatrix, Array | Matrix": function(f, d) {
      return l(f, d);
    },
    "Array, Array | Matrix": function(f, d) {
      var D = n(f), h = l(D, d);
      return h.map((m) => m.valueOf());
    }
  });
  function l(u, f) {
    for (var d = [c(u, f, !0)._data.map((b) => b[0])], D = u._data, h = u._size[0], m = u._size[1], p = m - 1; p >= 0; p--)
      for (var w = d.length, g = 0; g < w; g++) {
        var E = d[g];
        if (o(D[p][p], 0))
          if (o(E[p], 0)) {
            if (g === 0) {
              var y = [...E];
              y[p] = 1;
              for (var C = p - 1; C >= 0; C--)
                y[C] = a(y[C], D[C][p]);
              d.push(y);
            }
          } else {
            if (g === 0)
              return [];
            d.splice(g, 1), g -= 1, w -= 1;
          }
        else {
          E[p] = i(E[p], D[p][p]);
          for (var F = p - 1; F >= 0; F--)
            E[F] = a(E[F], t(E[p], D[F][p]));
        }
      }
    return d.map((b) => new v({
      data: b.map((A) => [A]),
      size: [h, 1]
    }));
  }
  function s(u, f) {
    for (var d = [c(u, f, !0)._data.map((H) => H[0])], D = u._size[0], h = u._size[1], m = u._values, p = u._index, w = u._ptr, g = h - 1; g >= 0; g--)
      for (var E = d.length, F = 0; F < E; F++) {
        for (var y = d[F], C = [], b = [], A = w[g], S = w[g + 1], M = 0, N = S - 1; N >= A; N--) {
          var O = p[N];
          O === g ? M = m[N] : O < g && (C.push(m[N]), b.push(O));
        }
        if (o(M, 0))
          if (o(y[g], 0)) {
            if (F === 0) {
              var G = [...y];
              G[g] = 1;
              for (var q = 0, z = b.length; q < z; q++) {
                var V = b[q];
                G[V] = a(G[V], C[q]);
              }
              d.push(G);
            }
          } else {
            if (F === 0)
              return [];
            d.splice(F, 1), F -= 1, E -= 1;
          }
        else {
          y[g] = i(y[g], M);
          for (var T = 0, I = b.length; T < I; T++) {
            var B = b[T];
            y[B] = a(y[B], t(y[g], C[T]));
          }
        }
      }
    return d.map((H) => new v({
      data: H.map((P) => [P]),
      size: [D, 1]
    }));
  }
}), pt = "equal", Pc = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], Rc = /* @__PURE__ */ rr(pt, Pc, (r) => {
  var {
    typed: e,
    matrix: n,
    equalScalar: i,
    DenseMatrix: t,
    concat: a
  } = r, o = Re({
    typed: e
  }), v = He({
    typed: e,
    DenseMatrix: t
  }), c = Pe({
    typed: e,
    DenseMatrix: t
  }), l = Me({
    typed: e,
    matrix: n,
    concat: a
  });
  return e(pt, Uc({
    typed: e,
    equalScalar: i
  }), l({
    elop: i,
    SS: v,
    DS: o,
    Ss: c
  }));
}), Uc = rr(pt, ["typed", "equalScalar"], (r) => {
  var {
    typed: e,
    equalScalar: n
  } = r;
  return e(pt, {
    "any, any": function(t, a) {
      return t === null ? a === null : a === null ? t === null : t === void 0 ? a === void 0 : a === void 0 ? t === void 0 : n(t, a);
    }
  });
}), mt = "smaller", Vc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Zc = /* @__PURE__ */ rr(mt, Vc, (r) => {
  var {
    typed: e,
    config: n,
    matrix: i,
    DenseMatrix: t,
    concat: a
  } = r, o = Re({
    typed: e
  }), v = He({
    typed: e,
    DenseMatrix: t
  }), c = Pe({
    typed: e,
    DenseMatrix: t
  }), l = Me({
    typed: e,
    matrix: i,
    concat: a
  }), s = Ke({
    typed: e
  });
  return e(mt, Gc({
    typed: e,
    config: n
  }), {
    "boolean, boolean": (u, f) => u < f,
    "BigNumber, BigNumber": function(f, d) {
      return f.lt(d) && !Xe(f, d, n.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) === -1,
    "Complex, Complex": function(f, d) {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, l({
    SS: v,
    DS: o,
    Ss: c
  }));
}), Gc = /* @__PURE__ */ rr(mt, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(mt, {
    "number, number": function(t, a) {
      return t < a && !we(t, a, n.epsilon);
    }
  });
}), gt = "smallerEq", Yc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Jc = /* @__PURE__ */ rr(gt, Yc, (r) => {
  var {
    typed: e,
    config: n,
    matrix: i,
    DenseMatrix: t,
    concat: a
  } = r, o = Re({
    typed: e
  }), v = He({
    typed: e,
    DenseMatrix: t
  }), c = Pe({
    typed: e,
    DenseMatrix: t
  }), l = Me({
    typed: e,
    matrix: i,
    concat: a
  }), s = Ke({
    typed: e
  });
  return e(gt, Qc({
    typed: e,
    config: n
  }), {
    "boolean, boolean": (u, f) => u <= f,
    "BigNumber, BigNumber": function(f, d) {
      return f.lte(d) || Xe(f, d, n.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) !== 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, l({
    SS: v,
    DS: o,
    Ss: c
  }));
}), Qc = /* @__PURE__ */ rr(gt, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(gt, {
    "number, number": function(t, a) {
      return t <= a || we(t, a, n.epsilon);
    }
  });
}), Dt = "larger", Xc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Kc = /* @__PURE__ */ rr(Dt, Xc, (r) => {
  var {
    typed: e,
    config: n,
    matrix: i,
    DenseMatrix: t,
    concat: a
  } = r, o = Re({
    typed: e
  }), v = He({
    typed: e,
    DenseMatrix: t
  }), c = Pe({
    typed: e,
    DenseMatrix: t
  }), l = Me({
    typed: e,
    matrix: i,
    concat: a
  }), s = Ke({
    typed: e
  });
  return e(Dt, Hc({
    typed: e,
    config: n
  }), {
    "boolean, boolean": (u, f) => u > f,
    "BigNumber, BigNumber": function(f, d) {
      return f.gt(d) && !Xe(f, d, n.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) === 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, l({
    SS: v,
    DS: o,
    Ss: c
  }));
}), Hc = /* @__PURE__ */ rr(Dt, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(Dt, {
    "number, number": function(t, a) {
      return t > a && !we(t, a, n.epsilon);
    }
  });
}), yt = "largerEq", Wc = ["typed", "config", "matrix", "DenseMatrix", "concat"], kc = /* @__PURE__ */ rr(yt, Wc, (r) => {
  var {
    typed: e,
    config: n,
    matrix: i,
    DenseMatrix: t,
    concat: a
  } = r, o = Re({
    typed: e
  }), v = He({
    typed: e,
    DenseMatrix: t
  }), c = Pe({
    typed: e,
    DenseMatrix: t
  }), l = Me({
    typed: e,
    matrix: i,
    concat: a
  }), s = Ke({
    typed: e
  });
  return e(yt, jc({
    typed: e,
    config: n
  }), {
    "boolean, boolean": (u, f) => u >= f,
    "BigNumber, BigNumber": function(f, d) {
      return f.gte(d) || Xe(f, d, n.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) !== -1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, l({
    SS: v,
    DS: o,
    Ss: c
  }));
}), jc = /* @__PURE__ */ rr(yt, ["typed", "config"], (r) => {
  var {
    typed: e,
    config: n
  } = r;
  return e(yt, {
    "number, number": function(t, a) {
      return t >= a || we(t, a, n.epsilon);
    }
  });
}), rl = "ImmutableDenseMatrix", el = ["smaller", "DenseMatrix"], tl = /* @__PURE__ */ rr(rl, el, (r) => {
  var {
    smaller: e,
    DenseMatrix: n
  } = r;
  function i(t, a) {
    if (!(this instanceof i))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (a && !te(a))
      throw new Error("Invalid datatype: " + a);
    if (_r(t) || Mr(t)) {
      var o = new n(t, a);
      this._data = o._data, this._size = o._size, this._datatype = o._datatype, this._min = null, this._max = null;
    } else if (t && Mr(t.data) && Mr(t.size))
      this._data = t.data, this._size = t.size, this._datatype = t.datatype, this._min = typeof t.min < "u" ? t.min : null, this._max = typeof t.max < "u" ? t.max : null;
    else {
      if (t)
        throw new TypeError("Unsupported type of data (" + fe(t) + ")");
      this._data = [], this._size = [0], this._datatype = a, this._min = null, this._max = null;
    }
  }
  return i.prototype = new n(), i.prototype.type = "ImmutableDenseMatrix", i.prototype.isImmutableDenseMatrix = !0, i.prototype.subset = function(t) {
    switch (arguments.length) {
      case 1: {
        var a = n.prototype.subset.call(this, t);
        return _r(a) ? new i({
          data: a._data,
          size: a._size,
          datatype: a._datatype
        }) : a;
      }
      case 2:
      case 3:
        throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, i.prototype.set = function() {
    throw new Error("Cannot invoke set on an Immutable Matrix instance");
  }, i.prototype.resize = function() {
    throw new Error("Cannot invoke resize on an Immutable Matrix instance");
  }, i.prototype.reshape = function() {
    throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
  }, i.prototype.clone = function() {
    return new i({
      data: Fr(this._data),
      size: Fr(this._size),
      datatype: this._datatype
    });
  }, i.prototype.toJSON = function() {
    return {
      mathjs: "ImmutableDenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, i.fromJSON = function(t) {
    return new i(t);
  }, i.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  }, i.prototype.min = function() {
    if (this._min === null) {
      var t = null;
      this.forEach(function(a) {
        (t === null || e(a, t)) && (t = a);
      }), this._min = t !== null ? t : void 0;
    }
    return this._min;
  }, i.prototype.max = function() {
    if (this._max === null) {
      var t = null;
      this.forEach(function(a) {
        (t === null || e(t, a)) && (t = a);
      }), this._max = t !== null ? t : void 0;
    }
    return this._max;
  }, i;
}, {
  isClass: !0
}), nl = "Index", il = ["ImmutableDenseMatrix", "getMatrixDataType"], al = /* @__PURE__ */ rr(nl, il, (r) => {
  var {
    ImmutableDenseMatrix: e,
    getMatrixDataType: n
  } = r;
  function i(a) {
    if (!(this instanceof i))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = !0;
    for (var o = 0, v = arguments.length; o < v; o++) {
      var c = arguments[o], l = Mr(c), s = _r(c), u = null;
      if (gi(c))
        this._dimensions.push(c), this._isScalar = !1;
      else if (l || s) {
        var f = void 0;
        n(c) === "boolean" ? (l && (f = t(Wn(c).valueOf())), s && (f = t(Wn(c._data).valueOf())), u = c.valueOf().length) : f = t(c.valueOf()), this._dimensions.push(f);
        var d = f.size();
        (d.length !== 1 || d[0] !== 1 || u !== null) && (this._isScalar = !1);
      } else if (typeof c == "number")
        this._dimensions.push(t([c]));
      else if (typeof c == "string")
        this._dimensions.push(c);
      else
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      this._sourceSize.push(u);
    }
  }
  i.prototype.type = "Index", i.prototype.isIndex = !0;
  function t(a) {
    for (var o = 0, v = a.length; o < v; o++)
      if (typeof a[o] != "number" || !zr(a[o]))
        throw new TypeError("Index parameters must be positive integer numbers");
    return new e(a);
  }
  return i.prototype.clone = function() {
    var a = new i();
    return a._dimensions = Fr(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
  }, i.create = function(a) {
    var o = new i();
    return i.apply(o, a), o;
  }, i.prototype.size = function() {
    for (var a = [], o = 0, v = this._dimensions.length; o < v; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? 1 : c.size()[0];
    }
    return a;
  }, i.prototype.max = function() {
    for (var a = [], o = 0, v = this._dimensions.length; o < v; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? c : c.max();
    }
    return a;
  }, i.prototype.min = function() {
    for (var a = [], o = 0, v = this._dimensions.length; o < v; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? c : c.min();
    }
    return a;
  }, i.prototype.forEach = function(a) {
    for (var o = 0, v = this._dimensions.length; o < v; o++)
      a(this._dimensions[o], o, this);
  }, i.prototype.dimension = function(a) {
    return this._dimensions[a] || null;
  }, i.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, i.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, i.prototype.isScalar = function() {
    return this._isScalar;
  }, i.prototype.toArray = function() {
    for (var a = [], o = 0, v = this._dimensions.length; o < v; o++) {
      var c = this._dimensions[o];
      a.push(typeof c == "string" ? c : c.toArray());
    }
    return a;
  }, i.prototype.valueOf = i.prototype.toArray, i.prototype.toString = function() {
    for (var a = [], o = 0, v = this._dimensions.length; o < v; o++) {
      var c = this._dimensions[o];
      typeof c == "string" ? a.push(JSON.stringify(c)) : a.push(c.toString());
    }
    return "[" + a.join(", ") + "]";
  }, i.prototype.toJSON = function() {
    return {
      mathjs: "Index",
      dimensions: this._dimensions
    };
  }, i.fromJSON = function(a) {
    return i.create(a.dimensions);
  }, i;
}, {
  isClass: !0
});
function Wn(r) {
  var e = [];
  return r.forEach((n, i) => {
    n && e.push(i);
  }), e;
}
var ul = "FibonacciHeap", ol = ["smaller", "larger"], sl = /* @__PURE__ */ rr(ul, ol, (r) => {
  var {
    smaller: e,
    larger: n
  } = r, i = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function t() {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  t.prototype.type = "FibonacciHeap", t.prototype.isFibonacciHeap = !0, t.prototype.insert = function(s, u) {
    var f = {
      key: s,
      value: u,
      degree: 0
    };
    if (this._minimum) {
      var d = this._minimum;
      f.left = d, f.right = d.right, d.right = f, f.right.left = f, e(s, d.key) && (this._minimum = f);
    } else
      f.left = f, f.right = f, this._minimum = f;
    return this._size++, f;
  }, t.prototype.size = function() {
    return this._size;
  }, t.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, t.prototype.isEmpty = function() {
    return this._size === 0;
  }, t.prototype.extractMinimum = function() {
    var s = this._minimum;
    if (s === null)
      return s;
    for (var u = this._minimum, f = s.degree, d = s.child; f > 0; ) {
      var D = d.right;
      d.left.right = d.right, d.right.left = d.left, d.left = u, d.right = u.right, u.right = d, d.right.left = d, d.parent = null, d = D, f--;
    }
    return s.left.right = s.right, s.right.left = s.left, s === s.right ? u = null : (u = s.right, u = l(u, this._size)), this._size--, this._minimum = u, s;
  }, t.prototype.remove = function(s) {
    this._minimum = a(this._minimum, s, -1), this.extractMinimum();
  };
  function a(s, u, f) {
    u.key = f;
    var d = u.parent;
    return d && e(u.key, d.key) && (o(s, u, d), v(s, d)), e(u.key, s.key) && (s = u), s;
  }
  function o(s, u, f) {
    u.left.right = u.right, u.right.left = u.left, f.degree--, f.child === u && (f.child = u.right), f.degree === 0 && (f.child = null), u.left = s, u.right = s.right, s.right = u, u.right.left = u, u.parent = null, u.mark = !1;
  }
  function v(s, u) {
    var f = u.parent;
    f && (u.mark ? (o(s, u, f), v(f)) : u.mark = !0);
  }
  var c = function(u, f) {
    u.left.right = u.right, u.right.left = u.left, u.parent = f, f.child ? (u.left = f.child, u.right = f.child.right, f.child.right = u, u.right.left = u) : (f.child = u, u.right = u, u.left = u), f.degree++, u.mark = !1;
  };
  function l(s, u) {
    var f = Math.floor(Math.log(u) * i) + 1, d = new Array(f), D = 0, h = s;
    if (h)
      for (D++, h = h.right; h !== s; )
        D++, h = h.right;
    for (var m; D > 0; ) {
      for (var p = h.degree, w = h.right; m = d[p], !!m; ) {
        if (n(h.key, m.key)) {
          var g = m;
          m = h, h = g;
        }
        c(m, h), d[p] = null, p++;
      }
      d[p] = h, h = w, D--;
    }
    s = null;
    for (var E = 0; E < f; E++)
      m = d[E], m && (s ? (m.left.right = m.right, m.right.left = m.left, m.left = s, m.right = s.right, s.right = m, m.right.left = m, e(m.key, s.key) && (s = m)) : s = m);
    return s;
  }
  return t;
}, {
  isClass: !0
}), fl = "Spa", cl = ["addScalar", "equalScalar", "FibonacciHeap"], ll = /* @__PURE__ */ rr(fl, cl, (r) => {
  var {
    addScalar: e,
    equalScalar: n,
    FibonacciHeap: i
  } = r;
  function t() {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new i();
  }
  return t.prototype.type = "Spa", t.prototype.isSpa = !0, t.prototype.set = function(a, o) {
    if (this._values[a])
      this._values[a].value = o;
    else {
      var v = this._heap.insert(a, o);
      this._values[a] = v;
    }
  }, t.prototype.get = function(a) {
    var o = this._values[a];
    return o ? o.value : 0;
  }, t.prototype.accumulate = function(a, o) {
    var v = this._values[a];
    v ? v.value = e(v.value, o) : (v = this._heap.insert(a, o), this._values[a] = v);
  }, t.prototype.forEach = function(a, o, v) {
    var c = this._heap, l = this._values, s = [], u = c.extractMinimum();
    for (u && s.push(u); u && u.key <= o; )
      u.key >= a && (n(u.value, 0) || v(u.key, u.value, this)), u = c.extractMinimum(), u && s.push(u);
    for (var f = 0; f < s.length; f++) {
      var d = s[f];
      u = c.insert(d.key, d.value), l[u.key] = u;
    }
  }, t.prototype.swap = function(a, o) {
    var v = this._values[a], c = this._values[o];
    if (!v && c)
      v = this._heap.insert(a, c.value), this._heap.remove(c), this._values[a] = v, this._values[o] = void 0;
    else if (v && !c)
      c = this._heap.insert(o, v.value), this._heap.remove(v), this._values[o] = c, this._values[a] = void 0;
    else if (v && c) {
      var l = v.value;
      v.value = c.value, c.value = l;
    }
  }, t;
}, {
  isClass: !0
}), vl = "atan", hl = ["typed"], dl = /* @__PURE__ */ rr(vl, hl, (r) => {
  var {
    typed: e
  } = r;
  return e("atan", {
    number: function(i) {
      return Math.atan(i);
    },
    Complex: function(i) {
      return i.atan();
    },
    BigNumber: function(i) {
      return i.atan();
    }
  });
}), fa = /* @__PURE__ */ rr("trigUnit", ["typed"], (r) => {
  var {
    typed: e
  } = r;
  return {
    Unit: e.referToSelf((n) => (i) => {
      if (!i.hasBase(i.constructor.BASE_UNITS.ANGLE))
        throw new TypeError("Unit in function cot is no angle");
      return e.find(n, i.valueType())(i.value);
    })
  };
}), kn = "cos", pl = ["typed"], ml = /* @__PURE__ */ rr(kn, pl, (r) => {
  var {
    typed: e
  } = r, n = fa({
    typed: e
  });
  return e(kn, {
    number: Math.cos,
    "Complex | BigNumber": (i) => i.cos()
  }, n);
}), jn = "sin", gl = ["typed"], Dl = /* @__PURE__ */ rr(jn, gl, (r) => {
  var {
    typed: e
  } = r, n = fa({
    typed: e
  });
  return e(jn, {
    number: Math.sin,
    "Complex | BigNumber": (i) => i.sin()
  }, n);
}), ri = "add", yl = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], wl = /* @__PURE__ */ rr(ri, yl, (r) => {
  var {
    typed: e,
    matrix: n,
    addScalar: i,
    equalScalar: t,
    DenseMatrix: a,
    SparseMatrix: o,
    concat: v
  } = r, c = aa({
    typed: e
  }), l = bf({
    typed: e,
    equalScalar: t
  }), s = ua({
    typed: e,
    DenseMatrix: a
  }), u = Me({
    typed: e,
    matrix: n,
    concat: v
  });
  return e(ri, {
    "any, any": i,
    "any, any, ...any": e.referToSelf((f) => (d, D, h) => {
      for (var m = f(d, D), p = 0; p < h.length; p++)
        m = f(m, h[p]);
      return m;
    })
  }, u({
    elop: i,
    DS: c,
    SS: l,
    Ss: s
  }));
}), ei = "norm", Al = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], El = /* @__PURE__ */ rr(ei, Al, (r) => {
  var {
    typed: e,
    abs: n,
    add: i,
    pow: t,
    conj: a,
    sqrt: o,
    multiply: v,
    equalScalar: c,
    larger: l,
    smaller: s,
    matrix: u,
    ctranspose: f,
    eigs: d
  } = r;
  return e(ei, {
    number: Math.abs,
    Complex: function(b) {
      return b.abs();
    },
    BigNumber: function(b) {
      return b.abs();
    },
    boolean: function(b) {
      return Math.abs(b);
    },
    Array: function(b) {
      return y(u(b), 2);
    },
    Matrix: function(b) {
      return y(b, 2);
    },
    "Array, number | BigNumber | string": function(b, A) {
      return y(u(b), A);
    },
    "Matrix, number | BigNumber | string": function(b, A) {
      return y(b, A);
    }
  });
  function D(C) {
    var b = 0;
    return C.forEach(function(A) {
      var S = n(A);
      l(S, b) && (b = S);
    }, !0), b;
  }
  function h(C) {
    var b;
    return C.forEach(function(A) {
      var S = n(A);
      (!b || s(S, b)) && (b = S);
    }, !0), b || 0;
  }
  function m(C, b) {
    if (b === Number.POSITIVE_INFINITY || b === "inf")
      return D(C);
    if (b === Number.NEGATIVE_INFINITY || b === "-inf")
      return h(C);
    if (b === "fro")
      return y(C, 2);
    if (typeof b == "number" && !isNaN(b)) {
      if (!c(b, 0)) {
        var A = 0;
        return C.forEach(function(S) {
          A = i(t(n(S), b), A);
        }, !0), t(A, 1 / b);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function p(C) {
    var b = 0;
    return C.forEach(function(A, S) {
      b = i(b, v(A, a(A)));
    }), n(o(b));
  }
  function w(C) {
    var b = [], A = 0;
    return C.forEach(function(S, M) {
      var N = M[1], O = i(b[N] || 0, n(S));
      l(O, A) && (A = O), b[N] = O;
    }, !0), A;
  }
  function g(C) {
    var b = C.size();
    if (b[0] !== b[1])
      throw new RangeError("Invalid matrix dimensions");
    var A = f(C), S = v(A, C), M = d(S).values.toArray(), N = M[M.length - 1];
    return n(o(N));
  }
  function E(C) {
    var b = [], A = 0;
    return C.forEach(function(S, M) {
      var N = M[0], O = i(b[N] || 0, n(S));
      l(O, A) && (A = O), b[N] = O;
    }, !0), A;
  }
  function F(C, b) {
    if (b === 1)
      return w(C);
    if (b === Number.POSITIVE_INFINITY || b === "inf")
      return E(C);
    if (b === "fro")
      return p(C);
    if (b === 2)
      return g(C);
    throw new Error("Unsupported parameter value " + b);
  }
  function y(C, b) {
    var A = C.size();
    if (A.length === 1)
      return m(C, b);
    if (A.length === 2) {
      if (A[0] && A[1])
        return F(C, b);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), ti = "dot", Fl = ["typed", "addScalar", "multiplyScalar", "conj", "size"], Cl = /* @__PURE__ */ rr(ti, Fl, (r) => {
  var {
    typed: e,
    addScalar: n,
    multiplyScalar: i,
    conj: t,
    size: a
  } = r;
  return e(ti, {
    "Array | DenseMatrix, Array | DenseMatrix": v,
    "SparseMatrix, SparseMatrix": c
  });
  function o(s, u) {
    var f = l(s), d = l(u), D, h;
    if (f.length === 1)
      D = f[0];
    else if (f.length === 2 && f[1] === 1)
      D = f[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + f.join(", ") + ")");
    if (d.length === 1)
      h = d[0];
    else if (d.length === 2 && d[1] === 1)
      h = d[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + d.join(", ") + ")");
    if (D !== h)
      throw new RangeError("Vectors must have equal length (" + D + " != " + h + ")");
    if (D === 0)
      throw new RangeError("Cannot calculate the dot product of empty vectors");
    return D;
  }
  function v(s, u) {
    var f = o(s, u), d = _r(s) ? s._data : s, D = _r(s) ? s._datatype : void 0, h = _r(u) ? u._data : u, m = _r(u) ? u._datatype : void 0, p = l(s).length === 2, w = l(u).length === 2, g = n, E = i;
    if (D && m && D === m && typeof D == "string") {
      var F = D;
      g = e.find(n, [F, F]), E = e.find(i, [F, F]);
    }
    if (!p && !w) {
      for (var y = E(t(d[0]), h[0]), C = 1; C < f; C++)
        y = g(y, E(t(d[C]), h[C]));
      return y;
    }
    if (!p && w) {
      for (var b = E(t(d[0]), h[0][0]), A = 1; A < f; A++)
        b = g(b, E(t(d[A]), h[A][0]));
      return b;
    }
    if (p && !w) {
      for (var S = E(t(d[0][0]), h[0]), M = 1; M < f; M++)
        S = g(S, E(t(d[M][0]), h[M]));
      return S;
    }
    if (p && w) {
      for (var N = E(t(d[0][0]), h[0][0]), O = 1; O < f; O++)
        N = g(N, E(t(d[O][0]), h[O][0]));
      return N;
    }
  }
  function c(s, u) {
    o(s, u);
    for (var f = s._index, d = s._values, D = u._index, h = u._values, m = 0, p = n, w = i, g = 0, E = 0; g < f.length && E < D.length; ) {
      var F = f[g], y = D[E];
      if (F < y) {
        g++;
        continue;
      }
      if (F > y) {
        E++;
        continue;
      }
      F === y && (m = p(m, w(d[g], h[E])), g++, E++);
    }
    return m;
  }
  function l(s) {
    return _r(s) ? s.size() : a(s);
  }
}), ni = "index", bl = ["typed", "Index"], Ml = /* @__PURE__ */ rr(ni, bl, (r) => {
  var {
    typed: e,
    Index: n
  } = r;
  return e(ni, {
    "...number | string | BigNumber | Range | Array | Matrix": function(t) {
      var a = t.map(function(v) {
        return Pr(v) ? v.toNumber() : Mr(v) || _r(v) ? v.map(function(c) {
          return Pr(c) ? c.toNumber() : c;
        }) : v;
      }), o = new n();
      return n.apply(o, a), o;
    }
  });
}), ii = "lup", Sl = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], Nl = /* @__PURE__ */ rr(ii, Sl, (r) => {
  var {
    typed: e,
    matrix: n,
    abs: i,
    addScalar: t,
    divideScalar: a,
    multiplyScalar: o,
    subtractScalar: v,
    larger: c,
    equalScalar: l,
    unaryMinus: s,
    DenseMatrix: u,
    SparseMatrix: f,
    Spa: d
  } = r;
  return e(ii, {
    DenseMatrix: function(p) {
      return D(p);
    },
    SparseMatrix: function(p) {
      return h(p);
    },
    Array: function(p) {
      var w = n(p), g = D(w);
      return {
        L: g.L.valueOf(),
        U: g.U.valueOf(),
        p: g.p
      };
    }
  });
  function D(m) {
    var p = m._size[0], w = m._size[1], g = Math.min(p, w), E = Fr(m._data), F = [], y = [p, g], C = [], b = [g, w], A, S, M, N = [];
    for (A = 0; A < p; A++)
      N[A] = A;
    for (S = 0; S < w; S++) {
      if (S > 0)
        for (A = 0; A < p; A++) {
          var O = Math.min(A, S), T = 0;
          for (M = 0; M < O; M++)
            T = t(T, o(E[A][M], E[M][S]));
          E[A][S] = v(E[A][S], T);
        }
      var I = S, B = 0, G = 0;
      for (A = S; A < p; A++) {
        var q = E[A][S], z = i(q);
        c(z, B) && (I = A, B = z, G = q);
      }
      if (S !== I && (N[S] = [N[I], N[I] = N[S]][0], u._swapRows(S, I, E)), S < p)
        for (A = S + 1; A < p; A++) {
          var V = E[A][S];
          l(V, 0) || (E[A][S] = a(E[A][S], G));
        }
    }
    for (S = 0; S < w; S++)
      for (A = 0; A < p; A++) {
        if (S === 0 && (A < w && (C[A] = []), F[A] = []), A < S) {
          A < w && (C[A][S] = E[A][S]), S < p && (F[A][S] = 0);
          continue;
        }
        if (A === S) {
          A < w && (C[A][S] = E[A][S]), S < p && (F[A][S] = 1);
          continue;
        }
        A < w && (C[A][S] = 0), S < p && (F[A][S] = E[A][S]);
      }
    var H = new u({
      data: F,
      size: y
    }), P = new u({
      data: C,
      size: b
    }), L = [];
    for (A = 0, g = N.length; A < g; A++)
      L[N[A]] = A;
    return {
      L: H,
      U: P,
      p: L,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
  function h(m) {
    var p = m._size[0], w = m._size[1], g = Math.min(p, w), E = m._values, F = m._index, y = m._ptr, C = [], b = [], A = [], S = [p, g], M = [], N = [], O = [], T = [g, w], I, B, G, q = [], z = [];
    for (I = 0; I < p; I++)
      q[I] = I, z[I] = I;
    var V = function(L, Z) {
      var nr = z[L], k = z[Z];
      q[nr] = Z, q[k] = L, z[L] = k, z[Z] = nr;
    }, H = function() {
      var L = new d();
      B < p && (A.push(C.length), C.push(1), b.push(B)), O.push(M.length);
      var Z = y[B], nr = y[B + 1];
      for (G = Z; G < nr; G++)
        I = F[G], L.set(q[I], E[G]);
      B > 0 && L.forEach(0, B - 1, function(X, J) {
        f._forEachRow(X, C, b, A, function(ur, j) {
          ur > X && L.accumulate(ur, s(o(j, J)));
        });
      });
      var k = B, U = L.get(B), Q = i(U);
      L.forEach(B + 1, p - 1, function(X, J) {
        var ur = i(J);
        c(ur, Q) && (k = X, Q = ur, U = J);
      }), B !== k && (f._swapRows(B, k, S[1], C, b, A), f._swapRows(B, k, T[1], M, N, O), L.swap(B, k), V(B, k)), L.forEach(0, p - 1, function(X, J) {
        X <= B ? (M.push(J), N.push(X)) : (J = a(J, U), l(J, 0) || (C.push(J), b.push(X)));
      });
    };
    for (B = 0; B < w; B++)
      H();
    return O.push(M.length), A.push(C.length), {
      L: new f({
        values: C,
        index: b,
        ptr: A,
        size: S
      }),
      U: new f({
        values: M,
        index: N,
        ptr: O,
        size: T
      }),
      p: q,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
}), ai = "qr", xl = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], Bl = /* @__PURE__ */ rr(ai, xl, (r) => {
  var {
    typed: e,
    matrix: n,
    zeros: i,
    identity: t,
    isZero: a,
    equal: o,
    sign: v,
    sqrt: c,
    conj: l,
    unaryMinus: s,
    addScalar: u,
    divideScalar: f,
    multiplyScalar: d,
    subtractScalar: D,
    complex: h
  } = r;
  return Oe(e(ai, {
    DenseMatrix: function(E) {
      return p(E);
    },
    SparseMatrix: function(E) {
      return w();
    },
    Array: function(E) {
      var F = n(E), y = p(F);
      return {
        Q: y.Q.valueOf(),
        R: y.R.valueOf()
      };
    }
  }), {
    _denseQRimpl: m
  });
  function m(g) {
    var E = g._size[0], F = g._size[1], y = t([E], "dense"), C = y._data, b = g.clone(), A = b._data, S, M, N, O = i([E], "");
    for (N = 0; N < Math.min(F, E); ++N) {
      var T = A[N][N], I = s(o(T, 0) ? 1 : v(T)), B = l(I), G = 0;
      for (S = N; S < E; S++)
        G = u(G, d(A[S][N], l(A[S][N])));
      var q = d(I, c(G));
      if (!a(q)) {
        var z = D(T, q);
        for (O[N] = 1, S = N + 1; S < E; S++)
          O[S] = f(A[S][N], z);
        var V = s(l(f(z, q))), H = void 0;
        for (M = N; M < F; M++) {
          for (H = 0, S = N; S < E; S++)
            H = u(H, d(l(O[S]), A[S][M]));
          for (H = d(H, V), S = N; S < E; S++)
            A[S][M] = d(D(A[S][M], d(O[S], H)), B);
        }
        for (S = 0; S < E; S++) {
          for (H = 0, M = N; M < E; M++)
            H = u(H, d(C[S][M], O[M]));
          for (H = d(H, V), M = N; M < E; ++M)
            C[S][M] = f(D(C[S][M], d(H, l(O[M]))), B);
        }
      }
    }
    return {
      Q: y,
      R: b,
      toString: function() {
        return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
      }
    };
  }
  function p(g) {
    var E = m(g), F = E.R._data;
    if (g._data.length > 0)
      for (var y = F[0][0].type === "Complex" ? h(0) : 0, C = 0; C < F.length; ++C)
        for (var b = 0; b < C && b < (F[0] || []).length; ++b)
          F[C][b] = y;
    return E;
  }
  function w(g) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function _l(r, e, n, i) {
  for (var t = r._values, a = r._index, o = r._ptr, v = r._size, c = r._datatype, l = v[0], s = v[1], u = i && r._values ? [] : null, f = [], d = [], D = 0, h = 0; h < s; h++) {
    d[h] = D;
    for (var m = n ? n[h] : h, p = o[m], w = o[m + 1], g = p; g < w; g++) {
      var E = e ? e[a[g]] : a[g];
      f[D] = E, u && (u[D] = t[g]), D++;
    }
  }
  return d[s] = D, r.createSparseMatrix({
    values: u,
    index: f,
    ptr: d,
    size: [l, s],
    datatype: c
  });
}
function ca(r, e, n, i, t, a, o) {
  var v = 0;
  for (n[o] = r; v >= 0; ) {
    var c = n[o + v], l = n[i + c];
    l === -1 ? (v--, a[e++] = c) : (n[i + c] = n[t + l], ++v, n[o + v] = l);
  }
  return e;
}
function zl(r, e) {
  if (!r)
    return null;
  var n = 0, i, t = [], a = [], o = 0, v = e, c = 2 * e;
  for (i = 0; i < e; i++)
    a[o + i] = -1;
  for (i = e - 1; i >= 0; i--)
    r[i] !== -1 && (a[v + i] = a[o + r[i]], a[o + r[i]] = i);
  for (i = 0; i < e; i++)
    r[i] === -1 && (n = ca(i, n, a, o, v, t, c));
  return t;
}
function Tl(r, e) {
  if (!r)
    return null;
  var n = r._index, i = r._ptr, t = r._size, a = t[0], o = t[1], v = [], c = [], l = 0, s = o, u, f;
  if (e)
    for (u = 0; u < a; u++)
      c[s + u] = -1;
  for (var d = 0; d < o; d++) {
    v[d] = -1, c[l + d] = -1;
    for (var D = i[d], h = i[d + 1], m = D; m < h; m++) {
      var p = n[m];
      for (u = e ? c[s + p] : p; u !== -1 && u < d; u = f)
        f = c[l + u], c[l + u] = d, f === -1 && (v[u] = d);
      e && (c[s + p] = d);
    }
  }
  return v;
}
function Ol(r, e, n) {
  for (var i = r._values, t = r._index, a = r._ptr, o = r._size, v = o[1], c = 0, l = 0; l < v; l++) {
    var s = a[l];
    for (a[l] = c; s < a[l + 1]; s++)
      e(t[s], l, i ? i[s] : 1, n) && (t[c] = t[s], i && (i[c] = i[s]), c++);
  }
  return a[v] = c, t.splice(c, t.length - c), i && i.splice(c, i.length - c), c;
}
function me(r) {
  return -r - 2;
}
var Il = "csAmd", $l = ["add", "multiply", "transpose"], ql = /* @__PURE__ */ rr(Il, $l, (r) => {
  var {
    add: e,
    multiply: n,
    transpose: i
  } = r;
  return function(s, u) {
    if (!u || s <= 0 || s > 3)
      return null;
    var f = u._size, d = f[0], D = f[1], h = 0, m = Math.max(16, 10 * Math.sqrt(D));
    m = Math.min(D - 2, m);
    var p = t(s, u, d, D, m);
    Ol(p, c, null);
    for (var w = p._index, g = p._ptr, E = g[D], F = [], y = [], C = 0, b = D + 1, A = 2 * (D + 1), S = 3 * (D + 1), M = 4 * (D + 1), N = 5 * (D + 1), O = 6 * (D + 1), T = 7 * (D + 1), I = F, B = a(D, g, y, C, S, I, A, T, b, O, M, N), G = o(D, g, y, N, M, O, m, b, S, I, A), q = 0, z, V, H, P, L, Z, nr, k, U, Q, X, J, ur, j, or, fr; G < D; ) {
      for (H = -1; q < D && (H = y[S + q]) === -1; q++)
        ;
      y[A + H] !== -1 && (I[y[A + H]] = -1), y[S + q] = y[A + H];
      var dr = y[M + H], gr = y[b + H];
      G += gr;
      var yr = 0;
      y[b + H] = -gr;
      var cr = g[H], Cr = dr === 0 ? cr : E, wr = Cr;
      for (P = 1; P <= dr + 1; P++) {
        for (P > dr ? (Z = H, nr = cr, k = y[C + H] - dr) : (Z = w[cr++], nr = g[Z], k = y[C + Z]), L = 1; L <= k; L++)
          z = w[nr++], !((U = y[b + z]) <= 0) && (yr += U, y[b + z] = -U, w[wr++] = z, y[A + z] !== -1 && (I[y[A + z]] = I[z]), I[z] !== -1 ? y[A + I[z]] = y[A + z] : y[S + y[N + z]] = y[A + z]);
        Z !== H && (g[Z] = me(H), y[O + Z] = 0);
      }
      for (dr !== 0 && (E = wr), y[N + H] = yr, g[H] = Cr, y[C + H] = wr - Cr, y[M + H] = -2, B = v(B, h, y, O, D), Q = Cr; Q < wr; Q++)
        if (z = w[Q], !((X = y[M + z]) <= 0)) {
          U = -y[b + z];
          var Sr = B - U;
          for (cr = g[z], J = g[z] + X - 1; cr <= J; cr++)
            Z = w[cr], y[O + Z] >= B ? y[O + Z] -= U : y[O + Z] !== 0 && (y[O + Z] = y[N + Z] + Sr);
        }
      for (Q = Cr; Q < wr; Q++) {
        for (z = w[Q], J = g[z], ur = J + y[M + z] - 1, j = J, or = 0, fr = 0, cr = J; cr <= ur; cr++)
          if (Z = w[cr], y[O + Z] !== 0) {
            var Ur = y[O + Z] - B;
            Ur > 0 ? (fr += Ur, w[j++] = Z, or += Z) : (g[Z] = me(H), y[O + Z] = 0);
          }
        y[M + z] = j - J + 1;
        var x = j, _ = J + y[C + z];
        for (cr = ur + 1; cr < _; cr++) {
          V = w[cr];
          var $ = y[b + V];
          $ <= 0 || (fr += $, w[j++] = V, or += V);
        }
        fr === 0 ? (g[z] = me(H), U = -y[b + z], yr -= U, gr += U, G += U, y[b + z] = 0, y[M + z] = -1) : (y[N + z] = Math.min(y[N + z], fr), w[j] = w[x], w[x] = w[J], w[J] = H, y[C + z] = j - J + 1, or = (or < 0 ? -or : or) % D, y[A + z] = y[T + or], y[T + or] = z, I[z] = or);
      }
      for (y[N + H] = yr, h = Math.max(h, yr), B = v(B + h, h, y, O, D), Q = Cr; Q < wr; Q++)
        if (z = w[Q], !(y[b + z] >= 0))
          for (or = I[z], z = y[T + or], y[T + or] = -1; z !== -1 && y[A + z] !== -1; z = y[A + z], B++) {
            for (k = y[C + z], X = y[M + z], cr = g[z] + 1; cr <= g[z] + k - 1; cr++)
              y[O + w[cr]] = B;
            var R = z;
            for (V = y[A + z]; V !== -1; ) {
              var K = y[C + V] === k && y[M + V] === X;
              for (cr = g[V] + 1; K && cr <= g[V] + k - 1; cr++)
                y[O + w[cr]] !== B && (K = 0);
              K ? (g[V] = me(z), y[b + z] += y[b + V], y[b + V] = 0, y[M + V] = -1, V = y[A + V], y[A + R] = V) : (R = V, V = y[A + V]);
            }
          }
      for (cr = Cr, Q = Cr; Q < wr; Q++)
        z = w[Q], !((U = -y[b + z]) <= 0) && (y[b + z] = U, fr = y[N + z] + yr - U, fr = Math.min(fr, D - G - U), y[S + fr] !== -1 && (I[y[S + fr]] = z), y[A + z] = y[S + fr], I[z] = -1, y[S + fr] = z, q = Math.min(q, fr), y[N + z] = fr, w[cr++] = z);
      y[b + H] = gr, (y[C + H] = cr - Cr) === 0 && (g[H] = -1, y[O + H] = 0), dr !== 0 && (E = cr);
    }
    for (z = 0; z < D; z++)
      g[z] = me(g[z]);
    for (V = 0; V <= D; V++)
      y[S + V] = -1;
    for (V = D; V >= 0; V--)
      y[b + V] > 0 || (y[A + V] = y[S + g[V]], y[S + g[V]] = V);
    for (Z = D; Z >= 0; Z--)
      y[b + Z] <= 0 || g[Z] !== -1 && (y[A + Z] = y[S + g[Z]], y[S + g[Z]] = Z);
    for (H = 0, z = 0; z <= D; z++)
      g[z] === -1 && (H = ca(z, H, y, S, A, F, O));
    return F.splice(F.length - 1, 1), F;
  };
  function t(l, s, u, f, d) {
    var D = i(s);
    if (l === 1 && f === u)
      return e(s, D);
    if (l === 2) {
      for (var h = D._index, m = D._ptr, p = 0, w = 0; w < u; w++) {
        var g = m[w];
        if (m[w] = p, !(m[w + 1] - g > d))
          for (var E = m[w + 1]; g < E; g++)
            h[p++] = h[g];
      }
      return m[u] = p, s = i(D), n(D, s);
    }
    return n(D, s);
  }
  function a(l, s, u, f, d, D, h, m, p, w, g, E) {
    for (var F = 0; F < l; F++)
      u[f + F] = s[F + 1] - s[F];
    u[f + l] = 0;
    for (var y = 0; y <= l; y++)
      u[d + y] = -1, D[y] = -1, u[h + y] = -1, u[m + y] = -1, u[p + y] = 1, u[w + y] = 1, u[g + y] = 0, u[E + y] = u[f + y];
    var C = v(0, 0, u, w, l);
    return u[g + l] = -2, s[l] = -1, u[w + l] = 0, C;
  }
  function o(l, s, u, f, d, D, h, m, p, w, g) {
    for (var E = 0, F = 0; F < l; F++) {
      var y = u[f + F];
      if (y === 0)
        u[d + F] = -2, E++, s[F] = -1, u[D + F] = 0;
      else if (y > h)
        u[m + F] = 0, u[d + F] = -1, E++, s[F] = me(l), u[m + l]++;
      else {
        var C = u[p + y];
        C !== -1 && (w[C] = F), u[g + F] = u[p + y], u[p + y] = F;
      }
    }
    return E;
  }
  function v(l, s, u, f, d) {
    if (l < 2 || l + s < 0) {
      for (var D = 0; D < d; D++)
        u[f + D] !== 0 && (u[f + D] = 1);
      l = 2;
    }
    return l;
  }
  function c(l, s) {
    return l !== s;
  }
});
function Ll(r, e, n, i, t, a, o) {
  var v, c, l = 0, s;
  if (r <= e || n[i + e] <= n[t + r])
    return -1;
  n[t + r] = n[i + e];
  var u = n[a + r];
  if (n[a + r] = e, u === -1)
    l = 1, s = r;
  else {
    for (l = 2, s = u; s !== n[o + s]; s = n[o + s])
      ;
    for (v = u; v !== s; v = c)
      c = n[o + v], n[o + v] = s;
  }
  return {
    jleaf: l,
    q: s
  };
}
var Pl = "csCounts", Rl = ["transpose"], Ul = /* @__PURE__ */ rr(Pl, Rl, (r) => {
  var {
    transpose: e
  } = r;
  return function(n, i, t, a) {
    if (!n || !i || !t)
      return null;
    var o = n._size, v = o[0], c = o[1], l, s, u, f, d, D, h, m = 4 * c + (a ? c + v + 1 : 0), p = [], w = 0, g = c, E = 2 * c, F = 3 * c, y = 4 * c, C = 5 * c + 1;
    for (u = 0; u < m; u++)
      p[u] = -1;
    var b = [], A = e(n), S = A._index, M = A._ptr;
    for (u = 0; u < c; u++)
      for (s = t[u], b[s] = p[F + s] === -1 ? 1 : 0; s !== -1 && p[F + s] === -1; s = i[s])
        p[F + s] = u;
    if (a) {
      for (u = 0; u < c; u++)
        p[t[u]] = u;
      for (l = 0; l < v; l++) {
        for (u = c, D = M[l], h = M[l + 1], d = D; d < h; d++)
          u = Math.min(u, p[S[d]]);
        p[C + l] = p[y + u], p[y + u] = l;
      }
    }
    for (l = 0; l < c; l++)
      p[w + l] = l;
    for (u = 0; u < c; u++) {
      for (s = t[u], i[s] !== -1 && b[i[s]]--, f = a ? p[y + u] : s; f !== -1; f = a ? p[C + f] : -1)
        for (d = M[f]; d < M[f + 1]; d++) {
          l = S[d];
          var N = Ll(l, s, p, F, g, E, w);
          N.jleaf >= 1 && b[s]++, N.jleaf === 2 && b[N.q]--;
        }
      i[s] !== -1 && (p[w + s] = i[s]);
    }
    for (s = 0; s < c; s++)
      i[s] !== -1 && (b[i[s]] += b[s]);
    return b;
  };
}), Vl = "csSqr", Zl = ["add", "multiply", "transpose"], Gl = /* @__PURE__ */ rr(Vl, Zl, (r) => {
  var {
    add: e,
    multiply: n,
    transpose: i
  } = r, t = ql({
    add: e,
    multiply: n,
    transpose: i
  }), a = Ul({
    transpose: i
  });
  return function(c, l, s) {
    var u = l._ptr, f = l._size, d = f[1], D, h = {};
    if (h.q = t(c, l), c && !h.q)
      return null;
    if (s) {
      var m = c ? _l(l, null, h.q, 0) : l;
      h.parent = Tl(m, 1);
      var p = zl(h.parent, d);
      if (h.cp = a(m, h.parent, p, 1), m && h.parent && h.cp && o(m, h))
        for (h.unz = 0, D = 0; D < d; D++)
          h.unz += h.cp[D];
    } else
      h.unz = 4 * u[d] + d, h.lnz = h.unz;
    return h;
  };
  function o(v, c) {
    var l = v._ptr, s = v._index, u = v._size, f = u[0], d = u[1];
    c.pinv = [], c.leftmost = [];
    var D = c.parent, h = c.pinv, m = c.leftmost, p = [], w = 0, g = f, E = f + d, F = f + 2 * d, y, C, b, A, S;
    for (C = 0; C < d; C++)
      p[g + C] = -1, p[E + C] = -1, p[F + C] = 0;
    for (y = 0; y < f; y++)
      m[y] = -1;
    for (C = d - 1; C >= 0; C--)
      for (A = l[C], S = l[C + 1], b = A; b < S; b++)
        m[s[b]] = C;
    for (y = f - 1; y >= 0; y--)
      h[y] = -1, C = m[y], C !== -1 && (p[F + C]++ === 0 && (p[E + C] = y), p[w + y] = p[g + C], p[g + C] = y);
    for (c.lnz = 0, c.m2 = f, C = 0; C < d; C++)
      if (y = p[g + C], c.lnz++, y < 0 && (y = c.m2++), h[y] = C, !(--F[C] <= 0)) {
        c.lnz += p[F + C];
        var M = D[C];
        M !== -1 && (p[F + M] === 0 && (p[E + M] = p[E + C]), p[w + p[E + C]] = p[g + M], p[g + M] = p[w + y], p[F + M] += p[F + C]);
      }
    for (y = 0; y < f; y++)
      h[y] < 0 && (h[y] = C++);
    return !0;
  }
});
function Zt(r, e) {
  return r[e] < 0;
}
function la(r, e) {
  r[e] = me(r[e]);
}
function ui(r) {
  return r < 0 ? me(r) : r;
}
function Yl(r, e, n, i, t) {
  var a = e._index, o = e._ptr, v = e._size, c = v[1], l, s, u, f = 0;
  for (i[0] = r; f >= 0; ) {
    r = i[f];
    var d = t ? t[r] : r;
    Zt(o, r) || (la(o, r), i[c + f] = d < 0 ? 0 : ui(o[d]));
    var D = 1;
    for (s = i[c + f], u = d < 0 ? 0 : ui(o[d + 1]); s < u; s++)
      if (l = a[s], !Zt(o, l)) {
        i[c + f] = s, i[++f] = l, D = 0;
        break;
      }
    D && (f--, i[--n] = r);
  }
  return n;
}
function Jl(r, e, n, i, t) {
  var a = r._ptr, o = r._size, v = e._index, c = e._ptr, l = o[1], s, u, f, d = l;
  for (u = c[n], f = c[n + 1], s = u; s < f; s++) {
    var D = v[s];
    Zt(a, D) || (d = Yl(D, r, d, i, t));
  }
  for (s = d; s < l; s++)
    la(a, i[s]);
  return d;
}
var Ql = "csSpsolve", Xl = ["divideScalar", "multiply", "subtract"], Kl = /* @__PURE__ */ rr(Ql, Xl, (r) => {
  var {
    divideScalar: e,
    multiply: n,
    subtract: i
  } = r;
  return function(a, o, v, c, l, s, u) {
    var f = a._values, d = a._index, D = a._ptr, h = a._size, m = h[1], p = o._values, w = o._index, g = o._ptr, E, F, y, C, b = Jl(a, o, v, c, s);
    for (E = b; E < m; E++)
      l[c[E]] = 0;
    for (F = g[v], y = g[v + 1], E = F; E < y; E++)
      l[w[E]] = p[E];
    for (var A = b; A < m; A++) {
      var S = c[A], M = s ? s[S] : S;
      if (!(M < 0))
        for (F = D[M], y = D[M + 1], l[S] = e(l[S], f[u ? F : y - 1]), E = u ? F + 1 : F, C = u ? y : y - 1; E < C; E++) {
          var N = d[E];
          l[N] = i(l[N], n(f[E], l[S]));
        }
    }
    return b;
  };
}), Hl = "csLu", Wl = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], kl = /* @__PURE__ */ rr(Hl, Wl, (r) => {
  var {
    abs: e,
    divideScalar: n,
    multiply: i,
    subtract: t,
    larger: a,
    largerEq: o,
    SparseMatrix: v
  } = r, c = Kl({
    divideScalar: n,
    multiply: i,
    subtract: t
  });
  return function(s, u, f) {
    if (!s)
      return null;
    var d = s._size, D = d[1], h, m = 100, p = 100;
    u && (h = u.q, m = u.lnz || m, p = u.unz || p);
    var w = [], g = [], E = [], F = new v({
      values: w,
      index: g,
      ptr: E,
      size: [D, D]
    }), y = [], C = [], b = [], A = new v({
      values: y,
      index: C,
      ptr: b,
      size: [D, D]
    }), S = [], M, N, O = [], T = [];
    for (M = 0; M < D; M++)
      O[M] = 0, S[M] = -1, E[M + 1] = 0;
    m = 0, p = 0;
    for (var I = 0; I < D; I++) {
      E[I] = m, b[I] = p;
      var B = h ? h[I] : I, G = c(F, s, B, T, O, S, 1), q = -1, z = -1;
      for (N = G; N < D; N++)
        if (M = T[N], S[M] < 0) {
          var V = e(O[M]);
          a(V, z) && (z = V, q = M);
        } else
          C[p] = S[M], y[p++] = O[M];
      if (q === -1 || z <= 0)
        return null;
      S[B] < 0 && o(e(O[B]), i(z, f)) && (q = B);
      var H = O[q];
      for (C[p] = I, y[p++] = H, S[q] = I, g[m] = q, w[m++] = 1, N = G; N < D; N++)
        M = T[N], S[M] < 0 && (g[m] = M, w[m++] = n(O[M], H)), O[M] = 0;
    }
    for (E[D] = m, b[D] = p, N = 0; N < m; N++)
      g[N] = S[g[N]];
    return w.splice(m, w.length - m), g.splice(m, g.length - m), y.splice(p, y.length - p), C.splice(p, C.length - p), {
      L: F,
      U: A,
      pinv: S
    };
  };
}), oi = "slu", jl = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], r0 = /* @__PURE__ */ rr(oi, jl, (r) => {
  var {
    typed: e,
    abs: n,
    add: i,
    multiply: t,
    transpose: a,
    divideScalar: o,
    subtract: v,
    larger: c,
    largerEq: l,
    SparseMatrix: s
  } = r, u = Gl({
    add: i,
    multiply: t,
    transpose: a
  }), f = kl({
    abs: n,
    divideScalar: o,
    multiply: t,
    subtract: v,
    larger: c,
    largerEq: l,
    SparseMatrix: s
  });
  return e(oi, {
    "SparseMatrix, number, number": function(D, h, m) {
      if (!zr(h) || h < 0 || h > 3)
        throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
      if (m < 0 || m > 1)
        throw new Error("Partial pivoting threshold must be a number from 0 to 1");
      var p = u(h, D, !1), w = f(D, p, m);
      return {
        L: w.L,
        U: w.U,
        p: w.pinv,
        q: p.q,
        toString: function() {
          return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
        }
      };
    }
  });
});
function si(r, e) {
  var n, i = e.length, t = [];
  if (r)
    for (n = 0; n < i; n++)
      t[r[n]] = e[n];
  else
    for (n = 0; n < i; n++)
      t[n] = e[n];
  return t;
}
var fi = "lusolve", e0 = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], t0 = /* @__PURE__ */ rr(fi, e0, (r) => {
  var {
    typed: e,
    matrix: n,
    lup: i,
    slu: t,
    usolve: a,
    lsolve: o,
    DenseMatrix: v
  } = r, c = St({
    DenseMatrix: v
  });
  return e(fi, {
    "Array, Array | Matrix": function(f, d) {
      f = n(f);
      var D = i(f), h = s(D.L, D.U, D.p, null, d);
      return h.valueOf();
    },
    "DenseMatrix, Array | Matrix": function(f, d) {
      var D = i(f);
      return s(D.L, D.U, D.p, null, d);
    },
    "SparseMatrix, Array | Matrix": function(f, d) {
      var D = i(f);
      return s(D.L, D.U, D.p, null, d);
    },
    "SparseMatrix, Array | Matrix, number, number": function(f, d, D, h) {
      var m = t(f, D, h);
      return s(m.L, m.U, m.p, m.q, d);
    },
    "Object, Array | Matrix": function(f, d) {
      return s(f.L, f.U, f.p, f.q, d);
    }
  });
  function l(u) {
    if (_r(u))
      return u;
    if (Mr(u))
      return n(u);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function s(u, f, d, D, h) {
    u = l(u), f = l(f), d && (h = c(u, h, !0), h._data = si(d, h._data));
    var m = o(u, h), p = a(f, m);
    return D && (p._data = si(D, p._data)), p;
  }
}), ci = "det", n0 = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], i0 = /* @__PURE__ */ rr(ci, n0, (r) => {
  var {
    typed: e,
    matrix: n,
    subtractScalar: i,
    multiply: t,
    divideScalar: a,
    isZero: o,
    unaryMinus: v
  } = r;
  return e(ci, {
    any: function(s) {
      return Fr(s);
    },
    "Array | Matrix": function(s) {
      var u;
      switch (_r(s) ? u = s.size() : Array.isArray(s) ? (s = n(s), u = s.size()) : u = [], u.length) {
        case 0:
          return Fr(s);
        case 1:
          if (u[0] === 1)
            return Fr(s.valueOf()[0]);
          if (u[0] === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Ir(u) + ")");
        case 2: {
          var f = u[0], d = u[1];
          if (f === d)
            return c(s.clone().valueOf(), f);
          if (d === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Ir(u) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Ir(u) + ")");
      }
    }
  });
  function c(l, s, u) {
    if (s === 1)
      return Fr(l[0][0]);
    if (s === 2)
      return i(t(l[0][0], l[1][1]), t(l[1][0], l[0][1]));
    for (var f = !1, d = new Array(s).fill(0).map((C, b) => b), D = 0; D < s; D++) {
      var h = d[D];
      if (o(l[h][D])) {
        var m = void 0;
        for (m = D + 1; m < s; m++)
          if (!o(l[d[m]][D])) {
            h = d[m], d[m] = d[D], d[D] = h, f = !f;
            break;
          }
        if (m === s)
          return l[h][D];
      }
      for (var p = l[h][D], w = D === 0 ? 1 : l[d[D - 1]][D - 1], g = D + 1; g < s; g++)
        for (var E = d[g], F = D + 1; F < s; F++)
          l[E][F] = a(i(t(l[E][F], p), t(l[E][D], l[h][F])), w);
    }
    var y = l[d[s - 1]][s - 1];
    return f ? v(y) : y;
  }
}), li = "inv", a0 = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], u0 = /* @__PURE__ */ rr(li, a0, (r) => {
  var {
    typed: e,
    matrix: n,
    divideScalar: i,
    addScalar: t,
    multiply: a,
    unaryMinus: o,
    det: v,
    identity: c,
    abs: l
  } = r;
  return e(li, {
    "Array | Matrix": function(f) {
      var d = _r(f) ? f.size() : qr(f);
      switch (d.length) {
        case 1:
          if (d[0] === 1)
            return _r(f) ? n([i(1, f.valueOf()[0])]) : [i(1, f[0])];
          throw new RangeError("Matrix must be square (size: " + Ir(d) + ")");
        case 2: {
          var D = d[0], h = d[1];
          if (D === h)
            return _r(f) ? n(s(f.valueOf(), D, h), f.storage()) : s(f, D, h);
          throw new RangeError("Matrix must be square (size: " + Ir(d) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Ir(d) + ")");
      }
    },
    any: function(f) {
      return i(1, f);
    }
  });
  function s(u, f, d) {
    var D, h, m, p, w;
    if (f === 1) {
      if (p = u[0][0], p === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[i(1, p)]];
    } else if (f === 2) {
      var g = v(u);
      if (g === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[i(u[1][1], g), i(o(u[0][1]), g)], [i(o(u[1][0]), g), i(u[0][0], g)]];
    } else {
      var E = u.concat();
      for (D = 0; D < f; D++)
        E[D] = E[D].concat();
      for (var F = c(f).valueOf(), y = 0; y < d; y++) {
        var C = l(E[y][y]), b = y;
        for (D = y + 1; D < f; )
          l(E[D][y]) > C && (C = l(E[D][y]), b = D), D++;
        if (C === 0)
          throw Error("Cannot calculate inverse, determinant is zero");
        D = b, D !== y && (w = E[y], E[y] = E[D], E[D] = w, w = F[y], F[y] = F[D], F[D] = w);
        var A = E[y], S = F[y];
        for (D = 0; D < f; D++) {
          var M = E[D], N = F[D];
          if (D !== y) {
            if (M[y] !== 0) {
              for (m = i(o(M[y]), A[y]), h = y; h < d; h++)
                M[h] = t(M[h], a(m, A[h]));
              for (h = 0; h < d; h++)
                N[h] = t(N[h], a(m, S[h]));
            }
          } else {
            for (m = A[y], h = y; h < d; h++)
              M[h] = i(M[h], m);
            for (h = 0; h < d; h++)
              N[h] = i(N[h], m);
          }
        }
      }
      return F;
    }
  }
});
function o0(r) {
  var {
    addScalar: e,
    subtract: n,
    flatten: i,
    multiply: t,
    multiplyScalar: a,
    divideScalar: o,
    sqrt: v,
    abs: c,
    bignumber: l,
    diag: s,
    size: u,
    reshape: f,
    inv: d,
    qr: D,
    usolve: h,
    usolveAll: m,
    equal: p,
    complex: w,
    larger: g,
    smaller: E,
    matrixFromColumns: F,
    dot: y
  } = r;
  function C(P, L, Z, nr) {
    var k = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, U = b(P, L, Z, nr, k);
    A(P, L, Z, nr, k, U);
    var {
      values: Q,
      C: X
    } = S(P, L, Z, nr, k);
    if (k) {
      var J = M(P, L, X, U, Q, Z, nr);
      return {
        values: Q,
        eigenvectors: J
      };
    }
    return {
      values: Q
    };
  }
  function b(P, L, Z, nr, k) {
    var U = nr === "BigNumber", Q = nr === "Complex", X = U ? l(0) : 0, J = U ? l(1) : Q ? w(1) : 1, ur = U ? l(1) : 1, j = U ? l(10) : 2, or = a(j, j), fr;
    k && (fr = Array(L).fill(J));
    for (var dr = !1; !dr; ) {
      dr = !0;
      for (var gr = 0; gr < L; gr++) {
        for (var yr = X, cr = X, Cr = 0; Cr < L; Cr++)
          gr !== Cr && (yr = e(yr, c(P[Cr][gr])), cr = e(cr, c(P[gr][Cr])));
        if (!p(yr, 0) && !p(cr, 0)) {
          for (var wr = ur, Sr = yr, Ur = o(cr, j), x = a(cr, j); E(Sr, Ur); )
            Sr = a(Sr, or), wr = a(wr, j);
          for (; g(Sr, x); )
            Sr = o(Sr, or), wr = o(wr, j);
          var _ = E(o(e(Sr, cr), wr), a(e(yr, cr), 0.95));
          if (_) {
            dr = !1;
            for (var $ = o(1, wr), R = 0; R < L; R++)
              gr !== R && (P[gr][R] = a(P[gr][R], $), P[R][gr] = a(P[R][gr], wr));
            k && (fr[gr] = a(fr[gr], $));
          }
        }
      }
    }
    return k ? s(fr) : null;
  }
  function A(P, L, Z, nr, k, U) {
    var Q = nr === "BigNumber", X = nr === "Complex", J = Q ? l(0) : X ? w(0) : 0;
    Q && (Z = l(Z));
    for (var ur = 0; ur < L - 2; ur++) {
      for (var j = 0, or = J, fr = ur + 1; fr < L; fr++) {
        var dr = P[fr][ur];
        E(c(or), c(dr)) && (or = dr, j = fr);
      }
      if (!E(c(or), Z)) {
        if (j !== ur + 1) {
          var gr = P[j];
          P[j] = P[ur + 1], P[ur + 1] = gr;
          for (var yr = 0; yr < L; yr++) {
            var cr = P[yr][j];
            P[yr][j] = P[yr][ur + 1], P[yr][ur + 1] = cr;
          }
          if (k) {
            var Cr = U[j];
            U[j] = U[ur + 1], U[ur + 1] = Cr;
          }
        }
        for (var wr = ur + 2; wr < L; wr++) {
          var Sr = o(P[wr][ur], or);
          if (Sr !== 0) {
            for (var Ur = 0; Ur < L; Ur++)
              P[wr][Ur] = n(P[wr][Ur], a(Sr, P[ur + 1][Ur]));
            for (var x = 0; x < L; x++)
              P[x][ur + 1] = e(P[x][ur + 1], a(Sr, P[x][wr]));
            if (k)
              for (var _ = 0; _ < L; _++)
                U[wr][_] = n(U[wr][_], a(Sr, U[ur + 1][_]));
          }
        }
      }
    }
    return U;
  }
  function S(P, L, Z, nr, k) {
    var U = nr === "BigNumber", Q = nr === "Complex", X = U ? l(1) : Q ? w(1) : 1;
    U && (Z = l(Z));
    for (var J = Fr(P), ur = [], j = L, or = [], fr = k ? s(Array(L).fill(X)) : void 0, dr = k ? s(Array(j).fill(X)) : void 0, gr = 0; gr <= 100; ) {
      gr += 1;
      for (var yr = J[j - 1][j - 1], cr = 0; cr < j; cr++)
        J[cr][cr] = n(J[cr][cr], yr);
      var {
        Q: Cr,
        R: wr
      } = D(J);
      J = t(wr, Cr);
      for (var Sr = 0; Sr < j; Sr++)
        J[Sr][Sr] = e(J[Sr][Sr], yr);
      if (k && (dr = t(dr, Cr)), j === 1 || E(c(J[j - 1][j - 2]), Z)) {
        gr = 0, ur.push(J[j - 1][j - 1]), k && (or.unshift([[1]]), T(dr, L), fr = t(fr, dr), j > 1 && (dr = s(Array(j - 1).fill(X)))), j -= 1, J.pop();
        for (var Ur = 0; Ur < j; Ur++)
          J[Ur].pop();
      } else if (j === 2 || E(c(J[j - 2][j - 3]), Z)) {
        gr = 0;
        var x = N(J[j - 2][j - 2], J[j - 2][j - 1], J[j - 1][j - 2], J[j - 1][j - 1]);
        ur.push(...x), k && (or.unshift(O(J[j - 2][j - 2], J[j - 2][j - 1], J[j - 1][j - 2], J[j - 1][j - 1], x[0], x[1], Z, nr)), T(dr, L), fr = t(fr, dr), j > 2 && (dr = s(Array(j - 2).fill(X)))), j -= 2, J.pop(), J.pop();
        for (var _ = 0; _ < j; _++)
          J[_].pop(), J[_].pop();
      }
      if (j === 0)
        break;
    }
    if (ur.sort((K, Y) => +n(c(K), c(Y))), gr > 100) {
      var $ = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + ur.join(", "));
      throw $.values = ur, $.vectors = [], $;
    }
    var R = k ? t(fr, I(or, L)) : void 0;
    return {
      values: ur,
      C: R
    };
  }
  function M(P, L, Z, nr, k, U, Q) {
    var X = d(Z), J = t(X, P, Z), ur = Q === "BigNumber", j = Q === "Complex", or = ur ? l(0) : j ? w(0) : 0, fr = ur ? l(1) : j ? w(1) : 1, dr = [], gr = [];
    for (var yr of k) {
      var cr = B(dr, yr, p);
      cr === -1 ? (dr.push(yr), gr.push(1)) : gr[cr] += 1;
    }
    for (var Cr = [], wr = dr.length, Sr = Array(L).fill(or), Ur = s(Array(L).fill(fr)), x = function() {
      var R = dr[_], K = n(J, t(R, Ur)), Y = m(K, Sr);
      for (Y.shift(); Y.length < gr[_]; ) {
        var ar = G(K, L, Y, U, Q);
        if (ar === null)
          break;
        Y.push(ar);
      }
      var tr = t(d(nr), Z);
      Y = Y.map((ir) => t(tr, ir)), Cr.push(...Y.map((ir) => ({
        value: R,
        vector: i(ir)
      })));
    }, _ = 0; _ < wr; _++)
      x();
    return Cr;
  }
  function N(P, L, Z, nr) {
    var k = e(P, nr), U = n(a(P, nr), a(L, Z)), Q = a(k, 0.5), X = a(v(n(a(k, k), a(4, U))), 0.5);
    return [e(Q, X), n(Q, X)];
  }
  function O(P, L, Z, nr, k, U, Q, X) {
    var J = X === "BigNumber", ur = X === "Complex", j = J ? l(0) : ur ? w(0) : 0, or = J ? l(1) : ur ? w(1) : 1;
    if (E(c(Z), Q))
      return [[or, j], [j, or]];
    if (g(c(n(k, U)), Q))
      return [[n(k, nr), n(U, nr)], [Z, Z]];
    var fr = n(P, k), dr = n(nr, k);
    return E(c(L), Q) && E(c(dr), Q) ? [[fr, or], [Z, j]] : [[L, j], [dr, or]];
  }
  function T(P, L) {
    for (var Z = 0; Z < P.length; Z++)
      P[Z].push(...Array(L - P[Z].length).fill(0));
    for (var nr = P.length; nr < L; nr++)
      P.push(Array(L).fill(0)), P[nr][nr] = 1;
    return P;
  }
  function I(P, L) {
    for (var Z = [], nr = 0; nr < L; nr++)
      Z[nr] = Array(L).fill(0);
    var k = 0;
    for (var U of P) {
      for (var Q = U.length, X = 0; X < Q; X++)
        for (var J = 0; J < Q; J++)
          Z[k + X][k + J] = U[X][J];
      k += Q;
    }
    return Z;
  }
  function B(P, L, Z) {
    for (var nr = 0; nr < P.length; nr++)
      if (Z(P[nr], L))
        return nr;
    return -1;
  }
  function G(P, L, Z, nr, k) {
    for (var U = k === "BigNumber" ? l(1e3) : 1e3, Q, X = 0; X < 5; ++X) {
      Q = q(L, Z, k);
      try {
        Q = h(P, Q);
      } catch {
        continue;
      }
      if (g(V(Q), U))
        break;
    }
    if (X >= 5)
      return null;
    for (X = 0; ; ) {
      var J = h(P, Q);
      if (E(V(z(Q, [J])), nr))
        break;
      if (++X >= 10)
        return null;
      Q = H(J);
    }
    return Q;
  }
  function q(P, L, Z) {
    var nr = Z === "BigNumber", k = Z === "Complex", U = Array(P).fill(0).map((Q) => 2 * Math.random() - 1);
    return nr && (U = U.map((Q) => l(Q))), k && (U = U.map((Q) => w(Q))), U = z(U, L), H(U, Z);
  }
  function z(P, L) {
    var Z = u(P);
    for (var nr of L)
      nr = f(nr, Z), P = n(P, t(o(y(nr, P), y(nr, nr)), nr));
    return P;
  }
  function V(P) {
    return c(v(y(P, P)));
  }
  function H(P, L) {
    var Z = L === "BigNumber", nr = L === "Complex", k = Z ? l(1) : nr ? w(1) : 1;
    return t(o(k, V(P)), P);
  }
  return C;
}
function s0(r) {
  var {
    config: e,
    addScalar: n,
    subtract: i,
    abs: t,
    atan: a,
    cos: o,
    sin: v,
    multiplyScalar: c,
    inv: l,
    bignumber: s,
    multiply: u,
    add: f
  } = r;
  function d(A, S) {
    var M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.epsilon, N = arguments.length > 3 ? arguments[3] : void 0, O = arguments.length > 4 ? arguments[4] : void 0;
    if (N === "number")
      return D(A, M, O);
    if (N === "BigNumber")
      return h(A, M, O);
    throw TypeError("Unsupported data type: " + N);
  }
  function D(A, S, M) {
    var N = A.length, O = Math.abs(S / N), T, I;
    if (M) {
      I = new Array(N);
      for (var B = 0; B < N; B++)
        I[B] = Array(N).fill(0), I[B][B] = 1;
    }
    for (var G = y(A); Math.abs(G[1]) >= Math.abs(O); ) {
      var q = G[0][0], z = G[0][1];
      T = m(A[q][q], A[z][z], A[q][z]), A = F(A, T, q, z), M && (I = w(I, T, q, z)), G = y(A);
    }
    for (var V = Array(N).fill(0), H = 0; H < N; H++)
      V[H] = A[H][H];
    return b(Fr(V), I, M);
  }
  function h(A, S, M) {
    var N = A.length, O = t(S / N), T, I;
    if (M) {
      I = new Array(N);
      for (var B = 0; B < N; B++)
        I[B] = Array(N).fill(0), I[B][B] = 1;
    }
    for (var G = C(A); t(G[1]) >= t(O); ) {
      var q = G[0][0], z = G[0][1];
      T = p(A[q][q], A[z][z], A[q][z]), A = E(A, T, q, z), M && (I = g(I, T, q, z)), G = C(A);
    }
    for (var V = Array(N).fill(0), H = 0; H < N; H++)
      V[H] = A[H][H];
    return b(Fr(V), I, M);
  }
  function m(A, S, M) {
    var N = S - A;
    return Math.abs(N) <= e.epsilon ? Math.PI / 4 : 0.5 * Math.atan(2 * M / (S - A));
  }
  function p(A, S, M) {
    var N = i(S, A);
    return t(N) <= e.epsilon ? s(-1).acos().div(4) : c(0.5, a(u(2, M, l(N))));
  }
  function w(A, S, M, N) {
    for (var O = A.length, T = Math.cos(S), I = Math.sin(S), B = Array(O).fill(0), G = Array(O).fill(0), q = 0; q < O; q++)
      B[q] = T * A[q][M] - I * A[q][N], G[q] = I * A[q][M] + T * A[q][N];
    for (var z = 0; z < O; z++)
      A[z][M] = B[z], A[z][N] = G[z];
    return A;
  }
  function g(A, S, M, N) {
    for (var O = A.length, T = o(S), I = v(S), B = Array(O).fill(s(0)), G = Array(O).fill(s(0)), q = 0; q < O; q++)
      B[q] = i(c(T, A[q][M]), c(I, A[q][N])), G[q] = n(c(I, A[q][M]), c(T, A[q][N]));
    for (var z = 0; z < O; z++)
      A[z][M] = B[z], A[z][N] = G[z];
    return A;
  }
  function E(A, S, M, N) {
    for (var O = A.length, T = s(o(S)), I = s(v(S)), B = c(T, T), G = c(I, I), q = Array(O).fill(s(0)), z = Array(O).fill(s(0)), V = u(s(2), T, I, A[M][N]), H = n(i(c(B, A[M][M]), V), c(G, A[N][N])), P = f(c(G, A[M][M]), V, c(B, A[N][N])), L = 0; L < O; L++)
      q[L] = i(c(T, A[M][L]), c(I, A[N][L])), z[L] = n(c(I, A[M][L]), c(T, A[N][L]));
    A[M][M] = H, A[N][N] = P, A[M][N] = s(0), A[N][M] = s(0);
    for (var Z = 0; Z < O; Z++)
      Z !== M && Z !== N && (A[M][Z] = q[Z], A[Z][M] = q[Z], A[N][Z] = z[Z], A[Z][N] = z[Z]);
    return A;
  }
  function F(A, S, M, N) {
    for (var O = A.length, T = Math.cos(S), I = Math.sin(S), B = T * T, G = I * I, q = Array(O).fill(0), z = Array(O).fill(0), V = B * A[M][M] - 2 * T * I * A[M][N] + G * A[N][N], H = G * A[M][M] + 2 * T * I * A[M][N] + B * A[N][N], P = 0; P < O; P++)
      q[P] = T * A[M][P] - I * A[N][P], z[P] = I * A[M][P] + T * A[N][P];
    A[M][M] = V, A[N][N] = H, A[M][N] = 0, A[N][M] = 0;
    for (var L = 0; L < O; L++)
      L !== M && L !== N && (A[M][L] = q[L], A[L][M] = q[L], A[N][L] = z[L], A[L][N] = z[L]);
    return A;
  }
  function y(A) {
    for (var S = A.length, M = 0, N = [0, 1], O = 0; O < S; O++)
      for (var T = O + 1; T < S; T++)
        Math.abs(M) < Math.abs(A[O][T]) && (M = Math.abs(A[O][T]), N = [O, T]);
    return [N, M];
  }
  function C(A) {
    for (var S = A.length, M = 0, N = [0, 1], O = 0; O < S; O++)
      for (var T = O + 1; T < S; T++)
        t(M) < t(A[O][T]) && (M = t(A[O][T]), N = [O, T]);
    return [N, M];
  }
  function b(A, S, M) {
    var N = A.length, O = Array(N), T;
    if (M) {
      T = Array(N);
      for (var I = 0; I < N; I++)
        T[I] = Array(N);
    }
    for (var B = 0; B < N; B++) {
      for (var G = 0, q = A[0], z = 0; z < A.length; z++)
        t(A[z]) < t(q) && (G = z, q = A[G]);
      if (O[B] = A.splice(G, 1)[0], M)
        for (var V = 0; V < N; V++)
          T[B][V] = S[V][G], S[V].splice(G, 1);
    }
    if (!M)
      return {
        values: O
      };
    var H = T.map((P, L) => ({
      value: O[L],
      vector: P
    }));
    return {
      values: O,
      eigenvectors: H
    };
  }
  return d;
}
var f0 = "eigs", c0 = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], l0 = /* @__PURE__ */ rr(f0, c0, (r) => {
  var {
    config: e,
    typed: n,
    matrix: i,
    addScalar: t,
    subtract: a,
    equal: o,
    abs: v,
    atan: c,
    cos: l,
    sin: s,
    multiplyScalar: u,
    divideScalar: f,
    inv: d,
    bignumber: D,
    multiply: h,
    add: m,
    larger: p,
    column: w,
    flatten: g,
    number: E,
    complex: F,
    sqrt: y,
    diag: C,
    size: b,
    reshape: A,
    qr: S,
    usolve: M,
    usolveAll: N,
    im: O,
    re: T,
    smaller: I,
    matrixFromColumns: B,
    dot: G
  } = r, q = s0({
    config: e,
    addScalar: t,
    subtract: a,
    column: w,
    flatten: g,
    equal: o,
    abs: v,
    atan: c,
    cos: l,
    sin: s,
    multiplyScalar: u,
    inv: d,
    bignumber: D,
    complex: F,
    multiply: h,
    add: m
  }), z = o0({
    config: e,
    addScalar: t,
    subtract: a,
    multiply: h,
    multiplyScalar: u,
    flatten: g,
    divideScalar: f,
    sqrt: y,
    abs: v,
    bignumber: D,
    diag: C,
    size: b,
    reshape: A,
    qr: S,
    inv: d,
    usolve: M,
    usolveAll: N,
    equal: o,
    complex: F,
    larger: p,
    smaller: I,
    matrixFromColumns: B,
    dot: G
  });
  return n("eigs", {
    // The conversion to matrix in the first two implementations,
    // just to convert back to an array right away in
    // computeValuesAndVectors, is unfortunate, and should perhaps be
    // streamlined. It is done because the Matrix object carries some
    // type information about its entries, and so constructing the matrix
    // is a roundabout way of doing type detection.
    Array: function(U) {
      return V(i(U));
    },
    "Array, number|BigNumber": function(U, Q) {
      return V(i(U), {
        precision: Q
      });
    },
    "Array, Object"(k, U) {
      return V(i(k), U);
    },
    Matrix: function(U) {
      return V(U, {
        matricize: !0
      });
    },
    "Matrix, number|BigNumber": function(U, Q) {
      return V(U, {
        precision: Q,
        matricize: !0
      });
    },
    "Matrix, Object": function(U, Q) {
      var X = {
        matricize: !0
      };
      return Oe(X, Q), V(U, X);
    }
  });
  function V(k) {
    var U, Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, X = "eigenvectors" in Q ? Q.eigenvectors : !0, J = (U = Q.precision) !== null && U !== void 0 ? U : e.epsilon, ur = H(k, J, X);
    return Q.matricize && (ur.values = i(ur.values), X && (ur.eigenvectors = ur.eigenvectors.map((j) => {
      var {
        value: or,
        vector: fr
      } = j;
      return {
        value: or,
        vector: i(fr)
      };
    }))), X && Object.defineProperty(ur, "vectors", {
      enumerable: !1,
      // to make sure that the eigenvectors can still be
      // converted to string.
      get: () => {
        throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
      }
    }), ur;
  }
  function H(k, U, Q) {
    var X = k.toArray(), J = k.size();
    if (J.length !== 2 || J[0] !== J[1])
      throw new RangeError("Matrix must be square (size: ".concat(Ir(J), ")"));
    var ur = J[0];
    if (L(X, ur, U) && (Z(X, ur), P(X, ur, U))) {
      var j = nr(k, X, ur);
      return q(X, ur, U, j, Q);
    }
    var or = nr(k, X, ur);
    return z(X, ur, U, or, Q);
  }
  function P(k, U, Q) {
    for (var X = 0; X < U; X++)
      for (var J = X; J < U; J++)
        if (p(D(v(a(k[X][J], k[J][X]))), Q))
          return !1;
    return !0;
  }
  function L(k, U, Q) {
    for (var X = 0; X < U; X++)
      for (var J = 0; J < U; J++)
        if (p(D(v(O(k[X][J]))), Q))
          return !1;
    return !0;
  }
  function Z(k, U) {
    for (var Q = 0; Q < U; Q++)
      for (var X = 0; X < U; X++)
        k[Q][X] = T(k[Q][X]);
  }
  function nr(k, U, Q) {
    var X = k.datatype();
    if (X === "number" || X === "BigNumber" || X === "Complex")
      return X;
    for (var J = !1, ur = !1, j = !1, or = 0; or < Q; or++)
      for (var fr = 0; fr < Q; fr++) {
        var dr = U[or][fr];
        if ($r(dr) || Yt(dr))
          J = !0;
        else if (Pr(dr))
          ur = !0;
        else if (Gt(dr))
          j = !0;
        else
          throw TypeError("Unsupported type in Matrix: " + fe(dr));
      }
    if (ur && j && console.warn("Complex BigNumbers not supported, this operation will lose precission."), j) {
      for (var gr = 0; gr < Q; gr++)
        for (var yr = 0; yr < Q; yr++)
          U[gr][yr] = F(U[gr][yr]);
      return "Complex";
    }
    if (ur) {
      for (var cr = 0; cr < Q; cr++)
        for (var Cr = 0; Cr < Q; Cr++)
          U[cr][Cr] = D(U[cr][Cr]);
      return "BigNumber";
    }
    if (J) {
      for (var wr = 0; wr < Q; wr++)
        for (var Sr = 0; Sr < Q; Sr++)
          U[wr][Sr] = E(U[wr][Sr]);
      return "number";
    } else
      throw TypeError("Matrix contains unsupported types only.");
  }
}), We = /* @__PURE__ */ jo({
  config: kr
}), Nt = /* @__PURE__ */ ns({}), Ht = /* @__PURE__ */ os({}), Wt = /* @__PURE__ */ cs({}), Yr = /* @__PURE__ */ hs({
  Matrix: Wt
}), sr = /* @__PURE__ */ eo({
  BigNumber: We,
  Complex: Nt,
  DenseMatrix: Yr,
  Fraction: Ht
}), ke = /* @__PURE__ */ Ks({
  typed: sr
}), Fe = /* @__PURE__ */ Ws({
  typed: sr
}), v0 = /* @__PURE__ */ dl({
  typed: sr
}), kt = /* @__PURE__ */ Is({
  BigNumber: We,
  typed: sr
}), jt = /* @__PURE__ */ Ls({
  Complex: Nt,
  typed: sr
}), xt = /* @__PURE__ */ Zf({
  typed: sr
}), h0 = /* @__PURE__ */ ml({
  typed: sr
}), oe = /* @__PURE__ */ Cs({
  config: kr,
  typed: sr
}), d0 = /* @__PURE__ */ nc({
  typed: sr
}), p0 = /* @__PURE__ */ Yf({
  typed: sr
}), va = /* @__PURE__ */ ps({
  typed: sr
}), m0 = /* @__PURE__ */ gs({
  typed: sr
}), ha = /* @__PURE__ */ ys({
  typed: sr
}), Ce = /* @__PURE__ */ Bf({
  typed: sr
}), rn = /* @__PURE__ */ zs({
  typed: sr
}), g0 = /* @__PURE__ */ Qf({
  typed: sr
}), D0 = /* @__PURE__ */ Of({
  BigNumber: We,
  Fraction: Ht,
  complex: jt,
  typed: sr
}), y0 = /* @__PURE__ */ Dl({
  typed: sr
}), Ue = /* @__PURE__ */ Ss({
  Matrix: Wt,
  equalScalar: oe,
  typed: sr
}), Se = /* @__PURE__ */ js({
  typed: sr
}), w0 = /* @__PURE__ */ As({
  typed: sr
}), en = /* @__PURE__ */ qf({
  Complex: Nt,
  config: kr,
  typed: sr
}), je = /* @__PURE__ */ Qs({
  typed: sr
}), da = /* @__PURE__ */ Us({
  Fraction: Ht,
  typed: sr
}), Dr = /* @__PURE__ */ Zs({
  DenseMatrix: Yr,
  Matrix: Wt,
  SparseMatrix: Ue,
  typed: sr
}), A0 = /* @__PURE__ */ Nc({
  bignumber: kt,
  fraction: da,
  number: rn
}), E0 = /* @__PURE__ */ cc({
  isInteger: va,
  matrix: Dr,
  typed: sr
}), rt = /* @__PURE__ */ vc({
  matrix: Dr,
  config: kr,
  typed: sr
}), ge = /* @__PURE__ */ dc({
  matrix: Dr,
  typed: sr
}), re = /* @__PURE__ */ Ac({
  matrix: Dr,
  typed: sr
}), Xr = /* @__PURE__ */ bc({
  BigNumber: We,
  config: kr,
  matrix: Dr,
  typed: sr
}), Ne = /* @__PURE__ */ Kf({
  isInteger: va,
  matrix: Dr,
  typed: sr
}), F0 = /* @__PURE__ */ Fc({
  conj: xt,
  transpose: re,
  typed: sr
}), C0 = /* @__PURE__ */ jf({
  DenseMatrix: Yr,
  SparseMatrix: Ue,
  matrix: Dr,
  typed: sr
}), de = /* @__PURE__ */ Bc({
  numeric: A0,
  typed: sr
}), pa = /* @__PURE__ */ Rc({
  DenseMatrix: Yr,
  concat: Ne,
  equalScalar: oe,
  matrix: Dr,
  typed: sr
}), ma = /* @__PURE__ */ ec({
  matrix: Dr,
  typed: sr
}), et = /* @__PURE__ */ ac({
  BigNumber: We,
  DenseMatrix: Yr,
  SparseMatrix: Ue,
  config: kr,
  matrix: Dr,
  typed: sr
}), ga = /* @__PURE__ */ kc({
  DenseMatrix: Yr,
  concat: Ne,
  config: kr,
  matrix: Dr,
  typed: sr
}), b0 = /* @__PURE__ */ Oc({
  DenseMatrix: Yr,
  divideScalar: de,
  equalScalar: oe,
  matrix: Dr,
  multiplyScalar: Ce,
  subtractScalar: Se,
  typed: sr
}), M0 = /* @__PURE__ */ Ys({
  flatten: ma,
  matrix: Dr,
  size: rt,
  typed: sr
}), S0 = /* @__PURE__ */ Bl({
  addScalar: Fe,
  complex: jt,
  conj: xt,
  divideScalar: de,
  equal: pa,
  identity: et,
  isZero: ha,
  matrix: Dr,
  multiplyScalar: Ce,
  sign: D0,
  sqrt: en,
  subtractScalar: Se,
  typed: sr,
  unaryMinus: je,
  zeros: Xr
}), tt = /* @__PURE__ */ Zc({
  DenseMatrix: Yr,
  concat: Ne,
  config: kr,
  matrix: Dr,
  typed: sr
}), ce = /* @__PURE__ */ Pf({
  DenseMatrix: Yr,
  concat: Ne,
  equalScalar: oe,
  matrix: Dr,
  subtractScalar: Se,
  typed: sr,
  unaryMinus: je
}), Da = /* @__PURE__ */ $c({
  DenseMatrix: Yr,
  divideScalar: de,
  equalScalar: oe,
  matrix: Dr,
  multiplyScalar: Ce,
  subtractScalar: Se,
  typed: sr
}), se = /* @__PURE__ */ wl({
  DenseMatrix: Yr,
  SparseMatrix: Ue,
  addScalar: Fe,
  concat: Ne,
  equalScalar: oe,
  matrix: Dr,
  typed: sr
}), ya = /* @__PURE__ */ Cl({
  addScalar: Fe,
  conj: xt,
  multiplyScalar: Ce,
  size: rt,
  typed: sr
}), N0 = /* @__PURE__ */ tl({
  DenseMatrix: Yr,
  smaller: tt
}), wa = /* @__PURE__ */ al({
  ImmutableDenseMatrix: N0,
  getMatrixDataType: d0
}), Ve = /* @__PURE__ */ Kc({
  DenseMatrix: Yr,
  concat: Ne,
  config: kr,
  matrix: Dr,
  typed: sr
}), pr = /* @__PURE__ */ zf({
  addScalar: Fe,
  dot: ya,
  equalScalar: oe,
  matrix: Dr,
  multiplyScalar: Ce,
  typed: sr
}), x0 = /* @__PURE__ */ r0({
  SparseMatrix: Ue,
  abs: ke,
  add: se,
  divideScalar: de,
  larger: Ve,
  largerEq: ga,
  multiply: pr,
  subtract: ce,
  transpose: re,
  typed: sr
}), br = /* @__PURE__ */ mc({
  add: se,
  matrix: Dr,
  typed: sr,
  zeros: Xr
}), B0 = /* @__PURE__ */ Lc({
  DenseMatrix: Yr,
  divideScalar: de,
  equalScalar: oe,
  matrix: Dr,
  multiplyScalar: Ce,
  subtractScalar: Se,
  typed: sr
}), _0 = /* @__PURE__ */ i0({
  divideScalar: de,
  isZero: ha,
  matrix: Dr,
  multiply: pr,
  subtractScalar: Se,
  typed: sr,
  unaryMinus: je
}), z0 = /* @__PURE__ */ sl({
  larger: Ve,
  smaller: tt
}), Ar = /* @__PURE__ */ Ml({
  Index: wa,
  typed: sr
}), T0 = /* @__PURE__ */ Jc({
  DenseMatrix: Yr,
  concat: Ne,
  config: kr,
  matrix: Dr,
  typed: sr
}), Te = /* @__PURE__ */ sc({
  bignumber: kt,
  matrix: Dr,
  add: se,
  config: kr,
  isPositive: m0,
  larger: Ve,
  largerEq: ga,
  smaller: tt,
  smallerEq: T0,
  typed: sr
}), O0 = /* @__PURE__ */ ll({
  FibonacciHeap: z0,
  addScalar: Fe,
  equalScalar: oe
}), I0 = /* @__PURE__ */ Wf({
  Index: wa,
  matrix: Dr,
  range: Te,
  typed: sr
}), De = /* @__PURE__ */ u0({
  abs: ke,
  addScalar: Fe,
  det: _0,
  divideScalar: de,
  identity: et,
  matrix: Dr,
  multiply: pr,
  typed: sr,
  unaryMinus: je
}), $0 = /* @__PURE__ */ Nl({
  DenseMatrix: Yr,
  Spa: O0,
  SparseMatrix: Ue,
  abs: ke,
  addScalar: Fe,
  divideScalar: de,
  equalScalar: oe,
  larger: Ve,
  matrix: Dr,
  multiplyScalar: Ce,
  subtractScalar: Se,
  typed: sr,
  unaryMinus: je
}), q0 = /* @__PURE__ */ zc({
  Complex: Nt,
  config: kr,
  fraction: da,
  identity: et,
  inv: De,
  matrix: Dr,
  multiply: pr,
  number: rn,
  typed: sr
}), L0 = /* @__PURE__ */ t0({
  DenseMatrix: Yr,
  lsolve: b0,
  lup: $0,
  matrix: Dr,
  slu: x0,
  typed: sr,
  usolve: Da
}), P0 = /* @__PURE__ */ l0({
  abs: ke,
  add: se,
  addScalar: Fe,
  atan: v0,
  bignumber: kt,
  column: I0,
  complex: jt,
  config: kr,
  cos: h0,
  diag: C0,
  divideScalar: de,
  dot: ya,
  equal: pa,
  flatten: ma,
  im: p0,
  inv: De,
  larger: Ve,
  matrix: Dr,
  matrixFromColumns: M0,
  multiply: pr,
  multiplyScalar: Ce,
  number: rn,
  qr: S0,
  re: g0,
  reshape: E0,
  sin: y0,
  size: rt,
  smaller: tt,
  sqrt: en,
  subtract: ce,
  typed: sr,
  usolve: Da,
  usolveAll: B0
}), vi = /* @__PURE__ */ El({
  abs: ke,
  add: se,
  conj: xt,
  ctranspose: F0,
  eigs: P0,
  equalScalar: oe,
  larger: Ve,
  matrix: Dr,
  multiply: pr,
  pow: q0,
  smaller: tt,
  sqrt: en,
  typed: sr
});
class R0 {
  /**
   * Node constructor
   * @param label number
   * @param coords coordinates
   * @param bcs boundary conditions {code:string]:boolean}
   */
  constructor(e, n, i = [0, 0, 0], t = []) {
    lr(this, "label");
    // Node number
    lr(this, "domain");
    // domain reference
    lr(this, "coords");
    // ([float,float,float])* coordinates [m]
    //bcs: Set<DofID>; // for each DOF (identified by string id) the bc is applied
    //Note: prescribed values to be specified via boundaryCondition class
    lr(this, "bcs");
    //Node local coordinate system. In this c.s. boundary conditions are applied and results obtained
    /**
     * Triplet defining the local coordinate system in node.
     * Value at position (i,j) represents angle between e'(i) and e(j),
     * where e' is base vector of local coordinate system and e is
     * base vector of global c.s.
     */
    lr(this, "lcs");
    this.label = e.toString(), this.domain = n, this.coords = i, this.bcs = new Set(t), this.lcs = void 0;
  }
  /**
   * Change properties
   * @param label new label
   * @param coords new coordinates
   * @param bcs new dictionary with applied boundary conditions
   */
  change(e, n, i = []) {
    e != null && (this.label = e.toString()), n != null && (this.coords = n), i != null && (this.bcs = new Set(i));
  }
  change2(e) {
    e.label != null && (this.label = e.label.toString()), e.coords != null && (this.coords = e.coords), e.bcs != null && (this.bcs = new Set(e.bcs)), e.lcs != null && this.updateLcs(e.lcs);
  }
  getLocationArray(e) {
    return this.domain.solver.getNodeLocationArray(this.label, e);
  }
  getUnknowns(e, n) {
    const i = this.getLocationArray(n);
    return br(e.r, Ar(i));
  }
  getEigenValueUnknowns(e, n, i) {
    const t = this.getLocationArray(n);
    return br(e.eigenVectors[i], Ar(t));
  }
  /**
   * Returns receiver transformation matrix (from nodal to global c.s., ie. rg=t*r_n)
   * @param dofs dofs mask to consider
   */
  getTransformationMtrx(e) {
    const n = e.length;
    if (this.lcs == null)
      return et(n);
    {
      const i = Xr([n, n]);
      for (let t = 0; t < n; t++) {
        const a = e[t];
        switch (a) {
          case Lr.Dx:
          case Lr.Dy:
          case Lr.Dz:
            for (let o = 0; o < n; o++) {
              const v = e[o];
              (v == Lr.Dx || v == Lr.Dy || v == Lr.Dz) && (i[t][o] = this.lcs[v][a]);
            }
            break;
          case Lr.Rx:
          case Lr.Ry:
          case Lr.Rz:
            for (let o = 0; o < n; o++) {
              const v = e[o];
              (v == Lr.Rx || v == Lr.Ry || v == Lr.Rz) && (i[t][o] = this.lcs[v - Lr.Rx][a - Lr.Rx]);
            }
            break;
          default:
            throw new TypeError("Unknown DofID: " + a);
        }
      }
      return Dr(i);
    }
  }
  /**
   * Updates the reciver lcs triplet according to given lcs orientation
   * @param lcs
   */
  updateLcs(e) {
    if (e == null)
      this.lcs = void 0;
    else {
      this.lcs = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      const n = vi(e.locx), i = vi(e.locy);
      for (let t = 0; t < 3; t++)
        this.lcs[0][t] = e.locx[t] / n, this.lcs[1][t] = e.locy[t] / i;
      this.lcs[2][0] = this.lcs[0][1] * this.lcs[1][2] - this.lcs[0][2] * this.lcs[1][1], this.lcs[2][1] = this.lcs[0][2] * this.lcs[1][0] - this.lcs[0][0] * this.lcs[1][2], this.lcs[2][2] = this.lcs[0][0] * this.lcs[1][1] - this.lcs[0][1] * this.lcs[1][0];
    }
  }
  /**
   * Returns true if receiver has local c.s.
   */
  hasLcs() {
    return this.lcs != null;
  }
  getReactions(e, n = !1) {
    if (n && this.hasLcs()) {
      const i = this.domain.solver.getNodeDofIDs(this.label), t = this.getLocationArray(i), a = [];
      for (let v = 0; v < i.length; v++)
        this.bcs.has(i[v]) ? a.push(br(e.R, Ar([t[v] - this.domain.solver.neq]))) : a.push(0);
      const o = this.getTransformationMtrx(i);
      return {
        dofs: i,
        values: pr(o, a).toArray()
      };
    } else if (this.bcs.size > 0) {
      const i = Array.from(this.bcs), t = this.getLocationArray(i), a = ce(t, this.domain.solver.neq), o = br(e.R, Ar(a));
      return w0(o) === "number" ? { dofs: i, values: [o] } : { dofs: i, values: o };
    } else
      return { dofs: [], values: [] };
  }
}
class U0 {
  // domain reference
  /**
   * Constructor
   * @param label new label
   * @param nodes element nodes
   * @param mat element material number
   * @param cs element cross section number
   */
  constructor(e, n, i, t, a) {
    lr(this, "label");
    //element number
    lr(this, "nodes");
    // element nodes
    lr(this, "mat");
    // material
    lr(this, "cs");
    // cross section
    lr(this, "domain");
    this.label = e.toString(), this.nodes = i.map((o) => o.toString()), this.mat = t.toString(), this.cs = a.toString(), this.domain = n;
  }
  /**
   * Change receiver properties
   * @param label new label
   * @param nodes nodes
   * @param mat new material (number)
   * @param cs new cross section (number)
   */
  change(e, n, i, t) {
    e != null && (this.label = e.toString()), n != null && (this.nodes = n.map((a) => a.toString())), i != null && (this.mat = i.toString()), t != null && (this.cs = t.toString());
  }
  change2(e) {
    e.label != null && (this.label = e.label.toString()), e.nodes != null && (this.nodes = e.nodes.map((n) => n.toString())), e.mat != null && (this.mat = e.mat.toString()), e.cs != null && (this.cs = e.cs.toString());
  }
  /**
   * Returns Material (object) associated to element
   */
  getMaterial() {
    return this.domain.getMaterial(this.mat);
  }
  /**
   * Returns Cross Section (object) associated to element
   */
  getCS() {
    return this.domain.getCS(this.cs);
  }
  /**
   * Returns array of DOFs for given node
   * @param node node id
   */
  getNodeDofs(e) {
    return [];
  }
  /**
   * Computes global stiffness matrix of element
   */
  computeStiffness() {
  }
  /**
   * Computes global mass matrix of element
   */
  computeMassMatrix() {
  }
  /**
   * Returns element code numbers
   */
  getLocationArray() {
  }
  /**
   * Returns object with element geometry
   */
  computeGeo() {
  }
  /**
   * Returns element transformation matrix frol global to local c.s
   */
  computeT() {
    return Dr();
  }
}
class V0 extends U0 {
  /**
   * Constructor
   * @param label element label (num)
   * @param nodes element nodes
   * @param mat element material (num)
   * @param cs element cross section (num)
   * @param hinges array of two boolean values indicating if hinge is present at start or end
   */
  constructor(n, i, t, a, o, v = [!1, !1]) {
    super(n, i, t, a, o);
    lr(this, "hinges");
    // indicates element hinges
    lr(this, "diagonalMassMatrix", !1);
    this.hinges = v;
  }
  // @ts-expect-error
  change2(n) {
    n.label != null && (this.label = n.label.toString()), n.nodes != null && (this.nodes = n.nodes.map((i) => i.toString())), n.mat != null && (this.mat = n.mat.toString()), n.cs != null && (this.cs = n.cs.toString()), n.hinges != null && (this.hinges = n.hinges);
  }
  getNodeDofs(n) {
    return [Lr.Dx, Lr.Dz, Lr.Ry];
  }
  getLocationArray() {
    let n = Array();
    for (const i of this.nodes)
      n = n.concat(this.domain.solver.getNodeLocationArray(i, [Lr.Dx, Lr.Dz, Lr.Ry]));
    return n;
  }
  // evaluates l, dx, dz
  /**
   * Returns Beam2D geometry object containing l: length, dx: element projection in to x axis, dz: element projection in z axis
   */
  computeGeo() {
    const n = this.domain.getNode(this.nodes[0]).coords, i = this.domain.getNode(this.nodes[1]).coords, t = i[0] - n[0], a = i[2] - n[2];
    return { l: Math.sqrt(t * t + a * a), dx: t, dz: a };
  }
  /**
   * Returns tru if element has start or end hinge (or both)
   */
  hasHinges() {
    return this.hinges[0] || this.hinges[1];
  }
  /**
   * Computes element transformation matrix from local to global (nodal) c.s.
   */
  computeT() {
    const n = this.computeGeo(), i = n.dx / n.l, t = n.dz / n.l;
    let a = Dr([
      [i, t, 0, 0, 0, 0],
      [-t, i, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, i, t, 0],
      [0, 0, 0, -t, i, 0],
      [0, 0, 0, 0, 0, 1]
    ]);
    if (this.domain.getNode(this.nodes[0]).hasLcs() || this.domain.getNode(this.nodes[1]).hasLcs()) {
      let o = Xr(6);
      o = br(
        o,
        Ar([0, 1, 2], [0, 1, 2]),
        this.domain.getNode(this.nodes[0]).getTransformationMtrx(this.getNodeDofs(this.nodes[0]))
      ), o = br(
        o,
        Ar([3, 4, 5], [3, 4, 5]),
        this.domain.getNode(this.nodes[1]).getTransformationMtrx(this.getNodeDofs(this.nodes[1]))
      ), a = pr(a, o);
    }
    return a;
  }
  /**
   * Computes Beam2D local stifness matrix
   * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
   */
  computeLocalStiffnessMtrx(n = !1) {
    const i = this.computeGeo(), t = this.getMaterial(), a = this.getCS(), o = t.e * a.a, v = t.e * a.iy, c = i.l, l = c * c, s = l * c, u = 12 * v / (a.k * t.g * a.a * c * c), f = 1 + u, d = Dr([
      [o / c, 0, 0, -o / c, 0, 0],
      [0, 12 * v / s / f, -6 * v / l / f, 0, -12 * v / s / f, -6 * v / l / f],
      [0, -6 * v / l / f, (4 + u) * v / c / f, 0, 6 * v / l / f, (2 - u) * v / c / f],
      [-o / c, 0, 0, o / c, 0, 0],
      [0, -12 * v / s / f, 6 * v / l / f, 0, 12 * v / s / f, 6 * v / l / f],
      [0, -6 * v / l / f, (2 - u) * v / c / f, 0, 6 * v / l / f, (4 + u) * v / c / f]
    ]);
    if (this.hasHinges()) {
      if (this.hinges[0] && this.hinges[1])
        var D = [0, 1, 3, 4], h = [2, 5];
      else if (this.hinges[0])
        var D = [0, 1, 3, 4, 5], h = [2];
      else if (this.hinges[1])
        var D = [0, 1, 2, 3, 4], h = [5];
      const m = d.subset(Ar(D, D)), p = d.subset(Ar(D, h)), w = d.subset(Ar(h, h)), g = ce(m, pr(pr(p, De(w)), re(p)));
      let E = Xr(6, 6);
      return E = br(E, Ar(D, D), g), n ? {
        answer: E,
        a: D,
        b: h,
        kaa: m,
        kab: p,
        kbb: w
      } : { answer: E };
    }
    return { answer: d };
  }
  /**
   * Computes local initial stress matrix
   * @param N normal force
   */
  computeLocalInitialStressMtrx(n) {
    const i = this.computeGeo(), t = this.getMaterial(), a = this.getCS(), o = i.l, v = o * o, c = n / o, l = 12 * t.e * a.iy / (a.k * t.g * a.a * o * o), s = l * l, u = Dr([
      [0, 0, 0, 0, 0, 0],
      [0, 6 / 5 + 2 * l + s, -o / 10, 0, -6 / 5 - 2 * l - s, -o / 10],
      [
        0,
        -o / 10,
        2 * v / 15 + v * l / 6 + v * s / 12,
        0,
        o / 10,
        -v / 30 - v * l / 6 - v * s / 12
      ],
      [0, 0, 0, 0, 0, 0],
      [0, -6 / 5 - 2 * l - s, o / 10, 0, 6 / 5 + 2 * l + s, o / 10],
      [
        0,
        -o / 10,
        -v / 30 - v * l / 6 - v * s / 12,
        0,
        o / 10,
        2 * v / 15 + v * l / 6 + v * s / 12
      ]
    ]);
    pr(u, c / (1 + l) / (1 + l));
    const f = Math.min(Math.abs(u[1][1]), Math.abs(u[2][2])) / 1e3;
    if (u[0][0] = f, u[0][3] = -f, u[3][0] = -f, u[3][3] = f, this.hasHinges()) {
      const d = this.computeLocalStiffnessMtrx(!0), D = rt(d.a)[0], h = Xr(6, D);
      br(h, Ar(d.a, Te(0, D)), et(D)), br(
        h,
        Ar(d.b, Te(0, D)),
        pr(pr(De(d.kbb), re(d.kab)), -1)
      );
      const m = pr(re(h), pr(u, h)), p = Xr(6, 6);
      return br(d.a, Ar(d.a, d.a), m), p;
    }
    return u;
  }
  /**
   * Computes Beam2D local stifness matrix
   * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
   */
  computeLocalMassMatrix(n = !1) {
    const i = this.computeGeo(), t = this.getMaterial(), a = this.getCS(), o = i.l, v = o * o;
    if (!this.diagonalMassMatrix)
      return pr(
        t.d * a.a * o / 420,
        Dr([
          [140, 0, 0, 70, 0, 0],
          [0, 156, -22 * o, 0, 54, 13 * o],
          [0, -22 * o, 4 * o * o, 0, -13 * o, -3 * o * o],
          [70, 0, 0, 140, 0, 0],
          [0, 54, -13 * o, 0, 156, 22 * o],
          [0, 13 * o, -3 * o * o, 0, 22 * o, 4 * o * o]
        ])
      );
    const c = 1 / 78;
    return pr(
      t.d * a.a * o,
      Dr([
        [1 / 2, 0, 0, 0, 0, 0],
        [0, 1 / 2, 0, 0, 0, 0],
        [0, 0, c * v, 0, 0, 0],
        [0, 0, 0, 1 / 2, 0, 0],
        [0, 0, 0, 0, 1 / 2, 0],
        [0, 0, 0, 0, 0, c * v]
      ])
    );
  }
  /**
   * Evaluate element stiffness matrix in global c.s.
   */
  computeStiffness() {
    this.computeGeo();
    const n = this.computeLocalStiffnessMtrx(), i = this.computeT();
    return pr(pr(re(i), n.answer), i);
  }
  /**
   * Evaluate element mass matrix in global c.s.
   */
  computeMassMatrix() {
    this.computeGeo();
    const n = this.computeLocalMassMatrix(), i = this.computeT();
    return pr(pr(re(i), n), i);
  }
  /**
   * Evaluates initial stress matrix in global c.s.
   * @param N Element normal force
   */
  computeInitialStressMatrix(n) {
    const i = this.computeLocalInitialStressMtrx(n), t = this.computeT();
    return pr(pr(re(t), i), t);
  }
  /**
   * Computes element end displacement vector (in element local c.s.)
   * @param r global vector of unknowns
   */
  computeEndDisplacement(n) {
    const i = this.computeT(), t = this.getLocationArray();
    let a = pr(i, br(n.r, Ar(t)));
    if (this.hasHinges()) {
      const o = this.computeLocalStiffnessMtrx(!0);
      let v = Xr(6);
      for (const c of n.getElementLoadsOnElement(this.label))
        v = se(v, c.getLoadVectorForClampedBeam());
      this.hasHinges() && (a = br(
        a,
        Ar(o.b),
        pr(
          De(o.kbb),
          pr(
            se(
              br(v, Ar(o.b)),
              ge(pr(re(o.kab), br(a, Ar(o.a))))
            ),
            -1
          )
        )
      ));
    }
    return a;
  }
  /**
   * Computes element end forces (in element local c.s.)
   * @param lc load case reference
   */
  computeEndForces(n) {
    const i = this.computeT(), t = this.getLocationArray(), a = pr(i, br(n.r, Ar(t))), o = this.computeLocalStiffnessMtrx(!0);
    let v = pr(o.answer, a), c = Xr(6);
    for (const l of n.getElementLoadsOnElement(this.label))
      c = se(c, l.getLoadVectorForClampedBeam());
    if (this.hasHinges()) {
      const l = pr(o.kab, De(o.kbb));
      if (o.b.length == 1) {
        const s = c.get(o.b);
        for (let u = 0; u < o.a.length; u++)
          v.set([o.a[u]], v.get([o.a[u]]) + c.get([o.a[u]]) - l.get([u, 0]) * s);
      } else {
        const s = ce(
          br(c, Ar(o.a)),
          pr(l, Dr(br(c, Ar(o.b))))
        );
        v = br(
          v,
          Ar(o.a),
          ce(br(v, Ar(o.a)), s)
        );
      }
    } else
      v = se(v, c);
    return v;
  }
  /**
   * Computes nseg+1 values of local deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeLocalDefl(n, i) {
    const t = this.computeEndDisplacement(n), a = [], o = [], c = this.computeGeo().l, l = n.getElementLoadsOnElement(this.label);
    for (let s = 0; s <= i; s++) {
      const u = s / i;
      let f = (1 - 3 * u * u + 2 * u * u * u) * t.get([1]) + c * (-u + 2 * u * u - u * u * u) * t.get([2]) + (3 * u * u - 2 * u * u * u) * t.get([4]) + c * (u * u - u * u * u) * t.get([5]), d = (1 - u) * t.get([0]) + u * t.get([3]);
      for (const D of l) {
        const h = D.computeBeamDeflectionContrib(u);
        f += h.w, d += h.u;
      }
      a.push(d), o.push(f);
    }
    return { u: a, w: o };
  }
  /**
   * Computes nseg+1 values of global deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeGlobalDefl(n, i) {
    const t = this.computeLocalDefl(n, i), a = this.computeGeo(), o = a.dx / a.l, v = a.dz / a.l, c = [], l = [];
    for (let s = 0; s <= i; s++)
      c.push(t.u[s] * o - t.w[s] * v), l.push(t.w[s] * o + t.u[s] * v);
    return { u: c, w: l };
  }
  /**
   * Computes element end displacement vector (in element local c.s.)
   * @param r global vector of unknowns
   */
  computeEndDisplacementEigenMode(n, i) {
    const t = this.computeT(), a = this.getLocationArray();
    let o = pr(t, br(n.eigenVectors[i], Ar(a)));
    if (this.hasHinges()) {
      const v = this.computeLocalStiffnessMtrx(!0), c = Xr(6);
      this.hasHinges() && (o = br(
        o,
        Ar(v.b),
        pr(
          De(v.kbb),
          pr(
            se(
              br(c, Ar(v.b)),
              ge(pr(re(v.kab), br(o, Ar(v.a))))
            ),
            -1
          )
        )
      ));
    }
    return o;
  }
  /**
   * Computes nseg+1 values of local deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeLocalEigenMode(n, i, t) {
    const a = this.computeEndDisplacementEigenMode(n, i), o = [], v = [], l = this.computeGeo().l;
    for (let s = 0; s <= t; s++) {
      const u = s / t, f = (1 - 3 * u * u + 2 * u * u * u) * a.get([1]) + l * (-u + 2 * u * u - u * u * u) * a.get([2]) + (3 * u * u - 2 * u * u * u) * a.get([4]) + l * (u * u - u * u * u) * a.get([5]), d = (1 - u) * a.get([0]) + u * a.get([3]);
      o.push(d), v.push(f);
    }
    return { u: o, w: v };
  }
  /**
   * Computes nseg+1 values of global deflections
   * @param lc reference to load case
   * @param ntheig n-th eigen value
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeGlobalEigenMode(n, i, t) {
    const a = this.computeLocalEigenMode(n, i, t), o = this.computeGeo(), v = o.dx / o.l, c = o.dz / o.l, l = [], s = [];
    for (let u = 0; u <= t; u++)
      l.push(a.u[u] * v - a.w[u] * c), s.push(a.w[u] * v + a.u[u] * c);
    return { u: l, w: s };
  }
  /**
   * Computes the values of normal force along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeNormalForce(n, i) {
    const t = this.computeEndForces(n), a = this.computeGeo(), o = [], v = [], c = n.getElementLoadsOnElement(this.label);
    for (let l = 0; l <= i; l++) {
      const s = a.l * l / i;
      let u = -t.get([0]);
      for (const f of c)
        u += f.computeBeamNContrib(s);
      o.push(s), v.push(u);
    }
    return { x: o, N: v };
  }
  /**
   * Computes the values of shear force along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeShearForce(n, i) {
    const t = this.computeEndForces(n), a = this.computeGeo(), o = [], v = [], c = n.getElementLoadsOnElement(this.label);
    for (let l = 0; l <= i; l++) {
      const s = a.l * l / i;
      let u = -t.get([1]);
      for (const f of c)
        u += f.computeBeamVContrib(s);
      o.push(s), v.push(u);
    }
    return { x: o, V: v };
  }
  /**
   * Computes the values of bending moment along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeBendingMoment(n, i) {
    const t = this.computeEndForces(n), a = this.computeGeo(), o = [], v = [], c = n.getElementLoadsOnElement(this.label);
    for (let l = 0; l <= i; l++) {
      const s = a.l * l / i;
      let u = -t.get([2]) - t.get([1]) * s;
      for (const f of c)
        u += f.computeBeamMContrib(s);
      o.push(s), v.push(u);
    }
    return { x: o, M: v };
  }
}
class Aa {
  /**
   * Returns load vector for clamped beam
   * @param elem element number
   */
  constructor(e, n) {
    lr(this, "target");
    // component number the target is applied
    lr(this, "domain");
    this.target = e.toString(), this.domain = n;
  }
  /**
   * Evaluates the contribution to the load vector
   */
  getLoadVector() {
    return [];
  }
  /**
   * Returns load code numbers
   */
  getLocationArray() {
    return [];
  }
}
class Z0 extends Aa {
  constructor(n, i, t = {}) {
    super(n, i);
    lr(this, "values");
    this.values = t;
  }
  change(n, i) {
    this.target = n.toString(), this.values = i;
  }
  getLoadVector() {
    const n = this.domain.solver.getNodeDofIDs(this.target), i = Array();
    for (const t of n)
      t in this.values ? i.push(this.values[t]) : i.push(0);
    return i;
  }
  getLocationArray() {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
class G0 extends Aa {
  getLoadVectorForClampedBeam() {
    return [];
  }
  computeBeamDeflectionContrib(e) {
    return { u: 0, w: 0 };
  }
  computeBeamNContrib(e) {
    return 0;
  }
  computeBeamVContrib(e) {
    return 0;
  }
  computeBeamMContrib(e) {
    return 0;
  }
}
class Y0 extends G0 {
  // true if values in element local c.s (along length)
  constructor(n, i, t, a) {
    super(n, i);
    lr(this, "values");
    // fx, fz intensities
    lr(this, "lcs");
    this.values = t, this.lcs = a;
  }
  change(n, i, t) {
    this.target = n.toString(), this.values = i, this.lcs = t;
  }
  getGlobalIntensities() {
    const n = this.values[0], i = this.values[1];
    if (this.lcs) {
      const t = this.domain.elements.get(this.target).computeGeo(), a = t.dx / t.l, o = t.dz / t.l;
      return { fx: n * a - i * o, fz: n * o + i * a, my: 0 };
    } else
      return { fx: n, fz: i, my: 0 };
  }
  getLocalIntensities() {
    const n = this.values[0], i = this.values[1], t = this.domain.elements.get(this.target).computeGeo(), a = t.l, o = t.dx, v = t.dz, c = o / a, l = v / a;
    return this.lcs ? { fx: n, fz: i } : {
      fx: n * c + i * l,
      fz: -n * l + i * c
    };
  }
  // in local c.s
  getLoadVectorForClampedBeam() {
    const n = this.domain.elements.get(this.target).computeGeo(), i = this.getLocalIntensities(), t = i.fx, a = i.fz, o = n.l;
    return [-0.5 * o * t, -0.5 * o * a, 1 / 12 * a * o * o, -0.5 * o * t, -0.5 * o * a, -1 / 12 * a * o * o];
  }
  getLocationArray() {
    return this.domain.elements.get(this.target).getLocationArray();
  }
  getLoadVector() {
    const n = this.domain.elements.get(this.target), i = n.computeT(), t = this.getLoadVectorForClampedBeam();
    if (n.hasHinges()) {
      const a = n.computeLocalStiffnessMtrx(!0);
      let o = [0, 0, 0, 0, 0, 0];
      const v = pr(a.kab, De(a.kbb));
      if (a.b.length == 1) {
        const c = t[a.b[0]];
        for (let l = 0; l < a.a.length; l++)
          o[a.a[l]] = t[a.a[l]] - v.get([l, 0]) * c;
        return pr(pr(re(i), o), -1).toArray();
      } else {
        const c = ce(
          br(t, Ar(a.a)),
          pr(v, br(t, Ar(a.b)))
        );
        return o = br(o, Ar(a.a), c), pr(pr(re(i), o), -1).toArray();
      }
    } else
      return pr(pr(re(i), t), -1).toArray();
  }
  computeBeamDeflectionContrib(n) {
    const i = this.getLocalIntensities(), t = this.domain.elements.get(this.target), o = t.computeGeo().l;
    return { u: 0, w: i.fz * o * o * o * o * (n * n * n * n / 24 - n * n * n / 12 + n * n / 24) / (t.getMaterial().e * t.getCS().iy) };
  }
  computeBeamNContrib(n) {
    return -this.getLocalIntensities().fx * n;
  }
  computeBeamVContrib(n) {
    return -this.getLocalIntensities().fz * n;
  }
  computeBeamMContrib(n) {
    return -this.getLocalIntensities().fz * n * n / 2;
  }
}
class J0 {
  /**
   * Constructor
   */
  constructor(e, n, i) {
    lr(this, "target");
    // node (umber) subjected to Prescribed Displacement
    lr(this, "prescribedValues");
    // prescribed values of individual DOFs
    lr(this, "domain");
    this.target = e.toString(), this.prescribedValues = i, this.domain = n;
  }
  getNodePrescribedDisplacementVector() {
    const e = new Array(), n = this.domain.solver.getNodeDofIDs(this.target);
    for (const i of n)
      i in this.prescribedValues ? e.push(this.prescribedValues[i]) : e.push(0);
    return e;
  }
  getLocationArray() {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
const Q0 = {};
class X0 {
  // torsional stiffness moment [m4]
  /**
   * Constructor
   * @param label string label of receiver
   * @param a cross section area of receiver [m2]. > 0.0
   * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
   * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
   * @param dyz product moment of area with respect to yz axes [m4]
   * @param h height of receiver [m]
   * @param k Timoshenko's shear coefficient [-]
   * @param j torsional stiffness moment [m4]
   */
  constructor(e, n = {}) {
    lr(this, "label");
    // label of receiver
    lr(this, "a");
    // cross section area of receiver [m2]. > 0.0
    lr(this, "iy");
    // area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
    lr(this, "iz");
    // area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
    lr(this, "dyz");
    // product moment of area with respect to yz axes [m4]
    lr(this, "h");
    // height of receiver [m]
    lr(this, "k");
    // Timoshenko's shear coefficient [-]
    lr(this, "j");
    this.label = e.toString(), n = { ...Q0, ...n }, this.a = n.a, this.iy = n.iy, this.iz = n.iz, this.dyz = n.dyz, this.h = n.h, this.k = n.k, this.j = n.j;
  }
  /**
   * Change receiver properties
   * @param a cross section area of receiver [m2]. > 0.0
   * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
   * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
   * @param dyz product moment of area with respect to yz axes [m4]
   * @param h height of receiver [m]
   * @param k Timoshenko's shear coefficient [-]
   * @param j torsional stiffness moment [m4]
   */
  change(e) {
    e.a != null && (this.a = e.a), e.iy != null && (this.iy = e.iy), e.iz != null && (this.iz = e.iz), e.dyz != null && (this.dyz = e.dyz), e.h != null && (this.h = e.h), e.k != null && (this.k = e.k), e.j != null && (this.j = e.j);
  }
}
const K0 = { e: 1, g: 1, alpha: 1, d: 1 };
class H0 {
  // mass density [kg/m3]
  /**
   * @param  label int label of receiver
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  constructor(e, n = {}) {
    lr(this, "label");
    //  label
    lr(this, "e");
    // Young's modulus [Pa]
    lr(this, "g");
    // Shear modulus [Pa]
    lr(this, "alpha");
    // thermal dillatation coefficient [K-1]
    lr(this, "d");
    this.label = e.toString(), n = { ...K0, ...n }, this.e = n.e, this.g = n.g, this.alpha = n.alpha, this.d = n.d;
  }
  /**
   * Change receiver properties
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  change(e) {
    e.e !== void 0 && (this.e = e.e), e.g !== void 0 && (this.g = e.g), e.alpha !== void 0 && (this.alpha = e.alpha), e.d !== void 0 && (this.d = e.d);
  }
}
class W0 {
  /**
   * Constructor
   */
  constructor(e) {
    lr(this, "solver");
    lr(this, "nodes", /* @__PURE__ */ new Map());
    lr(this, "elements", /* @__PURE__ */ new Map());
    lr(this, "materials", /* @__PURE__ */ new Map());
    lr(this, "crossSections", /* @__PURE__ */ new Map());
    this.solver = e;
  }
  getNode(e) {
    const n = e.toString();
    if (this.nodes.has(n))
      return this.nodes.get(n);
    throw new RangeError("Node label " + e + " does not exists");
  }
  getElement(e) {
    const n = e.toString();
    if (this.elements.has(n))
      return this.elements.get(n);
    throw new RangeError("Element label " + e + " does not exists");
  }
  getMaterial(e) {
    const n = e.toString();
    if (this.materials.has(n))
      return this.materials.get(n);
    throw new RangeError("Material label " + e + " does not exists");
  }
  getCS(e) {
    const n = e.toString();
    if (this.crossSections.has(n))
      return this.crossSections.get(n);
    throw new RangeError("CrossSection label " + e + " does not exists");
  }
  // class factory
  createNode(e, n = [0, 0, 0], i = []) {
    const t = new R0(e, this, n, i);
    return this.nodes.set(e.toString(), t), t;
  }
  createBeam2D(e, n, i, t, a = [!1, !1]) {
    const o = new V0(e, this, n, i, t, a);
    return this.elements.set(e, o), o;
  }
  createMaterial(e, n = {}) {
    const i = new H0(e, n);
    return this.materials.set(e.toString(), i), i;
  }
  createCrossSection(e, n = {}) {
    const i = new X0(e, n);
    return this.crossSections.set(e.toString(), i), i;
  }
}
class k0 {
  constructor() {
    lr(this, "domain");
    lr(this, "neq");
    // number of unknowns
    lr(this, "pneq");
    // number of prescribed unknowns
    lr(this, "k");
    lr(this, "m");
    lr(this, "f");
    lr(this, "loadCases", new Array());
    lr(this, "codeNumberGenerated", !1);
    // code numbers assigned to supported as well as free DOFs
    lr(this, "nodeCodeNumbers", /* @__PURE__ */ new Map());
    this.domain = new W0(this), this.loadCases.push(new j0("DefaultLC", this.domain));
  }
  getNodeLocationArray(e, n) {
    let i = [];
    for (const t of n)
      i = i.concat(this.nodeCodeNumbers.get(e)[t]);
    return i;
  }
  getNodeDofIDs(e) {
    const n = [];
    for (const i in this.nodeCodeNumbers.get(e))
      n.push(parseInt(i));
    return n;
  }
  generateCodeNumbers() {
    const e = /* @__PURE__ */ new Map();
    for (const [t, a] of this.domain.nodes)
      this.nodeCodeNumbers.set(t, {}), e.set(t, /* @__PURE__ */ new Set());
    for (const [t, a] of this.domain.elements)
      for (const o of a.nodes) {
        const v = a.getNodeDofs(o);
        for (const c of v)
          if (e.has(o))
            e.get(o).add(c);
          else
            throw console.log(o, o in e, e.get(o)), new RangeError("Node label " + o + " does not exists");
      }
    this.neq = 0, this.pneq = 0;
    for (const [t, a] of this.domain.nodes)
      for (const o of e.get(t))
        a.bcs.has(o) ? this.pneq++ : this.neq++;
    let n = 0, i = this.neq;
    for (const [t, a] of this.domain.nodes)
      for (const o of e.get(t))
        a.bcs.has(o) ? this.nodeCodeNumbers.get(t)[o] = i++ : this.nodeCodeNumbers.get(t)[o] = n++;
    this.codeNumberGenerated = !0;
  }
  assembleVecLC(e, n, i, t) {
    for (let a = 0; a < i.length; a++)
      e.set([i[a], t], e.get([i[a], t]) + n[a]);
  }
  assembleVec(e, n, i) {
    for (let t = 0; t < i.length; t++)
      e.set([i[t]], e.get([i[t]]) + n[t]);
  }
}
class ev extends k0 {
  assemble() {
    this.k = Xr(this.neq + this.pneq, this.neq + this.pneq);
    for (const [e, n] of this.domain.elements) {
      const i = n.computeStiffness(), t = n.getLocationArray(), a = rt(t)[0];
      for (let o = 0; o < a; o++) {
        const v = t[o];
        for (let c = 0; c < a; c++) {
          const l = t[c];
          this.k.set([v, l], this.k.get([v, l]) + i.get([o, c]));
        }
      }
    }
    this.f = Xr(this.neq + this.pneq, this.loadCases.length);
    for (let e = 0; e < this.loadCases.length; e++) {
      this.loadCases[e].r = Xr(this.neq + this.pneq);
      const n = this.loadCases[e];
      for (const i of n.nodalLoadList)
        this.assembleVecLC(this.f, i.getLoadVector(), i.getLocationArray(), e);
      for (const i of n.elementLoadList)
        this.assembleVecLC(this.f, i.getLoadVector(), i.getLocationArray(), e);
      for (const i of n.prescribedBC)
        this.assembleVec(n.r, i.getNodePrescribedDisplacementVector(), i.getLocationArray());
    }
  }
  solve() {
    const e = /* @__PURE__ */ new Date();
    this.codeNumberGenerated || this.generateCodeNumbers();
    const n = Te(0, this.neq), i = Te(this.neq, this.neq + this.pneq);
    if (this.assemble(), this.neq > 0)
      for (let o = 0; o < this.loadCases.length; o++) {
        this.loadCases[o].solved = !1;
        const v = br(this.loadCases[o].r, Ar(i)), c = pr(br(this.k, Ar(n, i)), v);
        let l = br(this.k, Ar(n, n));
        typeof l == "number" && (l = Dr([[l]]));
        let s = br(this.f, Ar(n, [o]));
        typeof s == "number" && (s = Dr([s]));
        const u = ce(ge(s), c), f = ge(L0(l, u));
        this.loadCases[o].r = br(this.loadCases[o].r, Ar(Te(0, this.neq)), f), this.loadCases[o].R = ge(pr(br(this.k, Ar(i, n)), f)), this.loadCases[o].R = ce(
          this.loadCases[o].R,
          ge(br(this.f, Ar(i, [o])))
        ), this.loadCases[o].solved = !0;
      }
    else
      for (let o = 0; o < this.loadCases.length; o++)
        this.loadCases[o].R = ge(pr(this.k, this.loadCases[o].r)), this.loadCases[o].R = ce(
          this.loadCases[o].R,
          ge(br(this.f, Ar(i, [o])))
        ), this.loadCases[o].solved = !0;
    const a = (/* @__PURE__ */ new Date()).getTime() - e.getTime();
    console.log("Solution took ", Math.round(a * 100) / 100, " [ms]");
  }
}
class j0 {
  /**
   * Creates a new loadcase
   * @param label load case name
   */
  constructor(e, n) {
    lr(this, "label");
    lr(this, "domain");
    // domain reference
    // dictionary (map), key is node number, value is PrescribedDisplacement object applied
    lr(this, "bcMap", {});
    // Array of loads applied
    lr(this, "nodalLoadList", new Array());
    lr(this, "elementLoadList", new Array());
    lr(this, "prescribedBC", new Array());
    // solution vector
    lr(this, "r", Xr(0));
    // vector of reactions
    lr(this, "R", Xr(0));
    // omegas
    lr(this, "eigenNumbers", []);
    lr(this, "eigenVectors", []);
    lr(this, "solved", !1);
    this.label = e, this.domain = n;
  }
  /**
   * Returns list of applied element loads on element with given number
   * param e element number
   */
  getElementLoadsOnElement(e) {
    const n = [];
    for (const i of this.elementLoadList)
      i.target == e && n.push(i);
    return n;
  }
  //class factory
  createNodalLoad(e, n = {}) {
    const i = new Z0(e, this.domain, n);
    return this.nodalLoadList.push(i), i;
  }
  createBeamElementUniformEdgeLoad(e, n, i) {
    const t = new Y0(e, this.domain, n, i);
    return this.elementLoadList.push(t), t;
  }
  createPrescribedDisplacement(e, n) {
    const i = new J0(e, this.domain, n);
    return this.prescribedBC.push(i), i;
  }
}
var Lr = /* @__PURE__ */ ((r) => (r[r.Dx = 0] = "Dx", r[r.Dy = 1] = "Dy", r[r.Dz = 2] = "Dz", r[r.Rx = 3] = "Rx", r[r.Ry = 4] = "Ry", r[r.Rz = 5] = "Rz", r))(Lr || {});
export {
  V0 as Beam2D,
  G0 as BeamElementLoad,
  Y0 as BeamElementUniformEdgeLoad,
  X0 as CrossSection,
  Lr as DofID,
  W0 as Domain,
  U0 as Element,
  ev as LinearStaticSolver,
  Aa as Load,
  j0 as LoadCase,
  H0 as Material,
  Z0 as NodalLoad,
  R0 as Node,
  J0 as PrescribedDisplacement,
  k0 as Solver
};
