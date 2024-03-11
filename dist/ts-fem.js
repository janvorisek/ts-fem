var ja = Object.defineProperty;
var eu = (e, t, n) => t in e ? ja(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var se = (e, t, n) => (eu(e, typeof t != "symbol" ? t + "" : t, n), n);
function Or() {
  return Or = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
  }, Or.apply(this, arguments);
}
var pi = {
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
function Le(e) {
  return typeof e == "number";
}
function Pe(e) {
  return !e || typeof e != "object" || typeof e.constructor != "function" ? !1 : e.isBigNumber === !0 && typeof e.constructor.prototype == "object" && e.constructor.prototype.isBigNumber === !0 || typeof e.constructor.isDecimal == "function" && e.constructor.isDecimal(e) === !0;
}
function Gt(e) {
  return e && typeof e == "object" && Object.getPrototypeOf(e).isComplex === !0 || !1;
}
function Yt(e) {
  return e && typeof e == "object" && Object.getPrototypeOf(e).isFraction === !0 || !1;
}
function di(e) {
  return e && e.constructor.prototype.isUnit === !0 || !1;
}
function tr(e) {
  return typeof e == "string";
}
var Me = Array.isArray;
function _e(e) {
  return e && e.constructor.prototype.isMatrix === !0 || !1;
}
function ot(e) {
  return Array.isArray(e) || _e(e);
}
function mi(e) {
  return e && e.isDenseMatrix && e.constructor.prototype.isMatrix === !0 || !1;
}
function gi(e) {
  return e && e.isSparseMatrix && e.constructor.prototype.isMatrix === !0 || !1;
}
function Di(e) {
  return e && e.constructor.prototype.isRange === !0 || !1;
}
function wt(e) {
  return e && e.constructor.prototype.isIndex === !0 || !1;
}
function ru(e) {
  return typeof e == "boolean";
}
function tu(e) {
  return e && e.constructor.prototype.isResultSet === !0 || !1;
}
function nu(e) {
  return e && e.constructor.prototype.isHelp === !0 || !1;
}
function iu(e) {
  return typeof e == "function";
}
function au(e) {
  return e instanceof Date;
}
function uu(e) {
  return e instanceof RegExp;
}
function yi(e) {
  return !!(e && typeof e == "object" && e.constructor === Object && !Gt(e) && !Yt(e));
}
function ou(e) {
  return e === null;
}
function su(e) {
  return e === void 0;
}
function fu(e) {
  return e && e.isAccessorNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function cu(e) {
  return e && e.isArrayNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function lu(e) {
  return e && e.isAssignmentNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function hu(e) {
  return e && e.isBlockNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function vu(e) {
  return e && e.isConditionalNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function pu(e) {
  return e && e.isConstantNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function du(e) {
  return e && e.isFunctionAssignmentNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function mu(e) {
  return e && e.isFunctionNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function gu(e) {
  return e && e.isIndexNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Du(e) {
  return e && e.isNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function yu(e) {
  return e && e.isObjectNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function wu(e) {
  return e && e.isOperatorNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Au(e) {
  return e && e.isParenthesisNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Eu(e) {
  return e && e.isRangeNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Fu(e) {
  return e && e.isRelationalNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Cu(e) {
  return e && e.isSymbolNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function bu(e) {
  return e && e.constructor.prototype.isChain === !0 || !1;
}
function lr(e) {
  var t = typeof e;
  return t === "object" ? e === null ? "null" : Pe(e) ? "BigNumber" : e.constructor && e.constructor.name ? e.constructor.name : "Object" : t;
}
function Ce(e) {
  var t = typeof e;
  if (t === "number" || t === "string" || t === "boolean" || e === null || e === void 0)
    return e;
  if (typeof e.clone == "function")
    return e.clone();
  if (Array.isArray(e))
    return e.map(function(n) {
      return Ce(n);
    });
  if (e instanceof Date)
    return new Date(e.valueOf());
  if (Pe(e))
    return e;
  if (yi(e))
    return Mu(e, Ce);
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(e, ")"));
}
function Mu(e, t) {
  var n = {};
  for (var i in e)
    Yr(e, i) && (n[i] = t(e[i]));
  return n;
}
function Su(e, t) {
  for (var n in t)
    Yr(t, n) && (e[n] = t[n]);
  return e;
}
function Ir(e, t) {
  var n, i, r;
  if (Array.isArray(e)) {
    if (!Array.isArray(t) || e.length !== t.length)
      return !1;
    for (i = 0, r = e.length; i < r; i++)
      if (!Ir(e[i], t[i]))
        return !1;
    return !0;
  } else {
    if (typeof e == "function")
      return e === t;
    if (e instanceof Object) {
      if (Array.isArray(t) || !(t instanceof Object))
        return !1;
      for (n in e)
        if (!(n in t) || !Ir(e[n], t[n]))
          return !1;
      for (n in t)
        if (!(n in e))
          return !1;
      return !0;
    } else
      return e === t;
  }
}
function Yr(e, t) {
  return e && Object.hasOwnProperty.call(e, t);
}
function xu(e, t) {
  for (var n = {}, i = 0; i < t.length; i++) {
    var r = t[i], a = e[r];
    a !== void 0 && (n[r] = a);
  }
  return n;
}
var Nu = ["Matrix", "Array"], Bu = ["number", "BigNumber", "Fraction"], je = function(t) {
  if (t)
    throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(pi);
};
Or(je, pi, {
  MATRIX_OPTIONS: Nu,
  NUMBER_OPTIONS: Bu
});
function nn() {
  return !0;
}
function rr() {
  return !1;
}
function Br() {
}
const an = "Argument is not a typed-function.";
function wi() {
  function e(N) {
    return typeof N == "object" && N !== null && N.constructor === Object;
  }
  const t = [{
    name: "number",
    test: function(N) {
      return typeof N == "number";
    }
  }, {
    name: "string",
    test: function(N) {
      return typeof N == "string";
    }
  }, {
    name: "boolean",
    test: function(N) {
      return typeof N == "boolean";
    }
  }, {
    name: "Function",
    test: function(N) {
      return typeof N == "function";
    }
  }, {
    name: "Array",
    test: Array.isArray
  }, {
    name: "Date",
    test: function(N) {
      return N instanceof Date;
    }
  }, {
    name: "RegExp",
    test: function(N) {
      return N instanceof RegExp;
    }
  }, {
    name: "Object",
    test: e
  }, {
    name: "null",
    test: function(N) {
      return N === null;
    }
  }, {
    name: "undefined",
    test: function(N) {
      return N === void 0;
    }
  }], n = {
    name: "any",
    test: nn,
    isAny: !0
  };
  let i, r, a = 0, o = {
    createCount: 0
  };
  function h(N) {
    const _ = i.get(N);
    if (_)
      return _;
    let L = 'Unknown type "' + N + '"';
    const R = N.toLowerCase();
    let H;
    for (H of r)
      if (H.toLowerCase() === R) {
        L += '. Did you mean "' + H + '" ?';
        break;
      }
    throw new TypeError(L);
  }
  function c(N) {
    let _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
    const L = _ ? h(_).index : r.length, R = [];
    for (let Y = 0; Y < N.length; ++Y) {
      if (!N[Y] || typeof N[Y].name != "string" || typeof N[Y].test != "function")
        throw new TypeError("Object with properties {name: string, test: function} expected");
      const ae = N[Y].name;
      if (i.has(ae))
        throw new TypeError('Duplicate type name "' + ae + '"');
      R.push(ae), i.set(ae, {
        name: ae,
        test: N[Y].test,
        isAny: N[Y].isAny,
        index: L + Y,
        conversionsTo: []
        // Newly added type can't have any conversions to it
      });
    }
    const H = r.slice(L);
    r = r.slice(0, L).concat(R).concat(H);
    for (let Y = L + R.length; Y < r.length; ++Y)
      i.get(r[Y]).index = Y;
  }
  function l() {
    i = /* @__PURE__ */ new Map(), r = [], a = 0, c([n], !1);
  }
  l(), c(t);
  function s() {
    let N;
    for (N of r)
      i.get(N).conversionsTo = [];
    a = 0;
  }
  function u(N) {
    const _ = r.filter((L) => {
      const R = i.get(L);
      return !R.isAny && R.test(N);
    });
    return _.length ? _ : ["any"];
  }
  function f(N) {
    return N && typeof N == "function" && "_typedFunctionData" in N;
  }
  function p(N, _, L) {
    if (!f(N))
      throw new TypeError(an);
    const R = L && L.exact, H = Array.isArray(_) ? _.join(",") : _, Y = A(H), ae = m(Y);
    if (!R || ae in N.signatures) {
      const Ne = N._typedFunctionData.signatureMap.get(ae);
      if (Ne)
        return Ne;
    }
    const te = Y.length;
    let ie;
    if (R) {
      ie = [];
      let Ne;
      for (Ne in N.signatures)
        ie.push(N._typedFunctionData.signatureMap.get(Ne));
    } else
      ie = N._typedFunctionData.signatures;
    for (let Ne = 0; Ne < te; ++Ne) {
      const Oe = Y[Ne], Re = [];
      let Ke;
      for (Ke of ie) {
        const Xe = b(Ke.params, Ne);
        if (!(!Xe || Oe.restParam && !Xe.restParam)) {
          if (!Xe.hasAny) {
            const nr = g(Xe);
            if (Oe.types.some((ir) => !nr.has(ir.name)))
              continue;
          }
          Re.push(Ke);
        }
      }
      if (ie = Re, ie.length === 0)
        break;
    }
    let re;
    for (re of ie)
      if (re.params.length <= te)
        return re;
    throw new TypeError("Signature not found (signature: " + (N.name || "unnamed") + "(" + m(Y, ", ") + "))");
  }
  function D(N, _, L) {
    return p(N, _, L).implementation;
  }
  function v(N, _) {
    const L = h(_);
    if (L.test(N))
      return N;
    const R = L.conversionsTo;
    if (R.length === 0)
      throw new Error("There are no conversions to " + _ + " defined.");
    for (let H = 0; H < R.length; H++)
      if (h(R[H].from).test(N))
        return R[H].convert(N);
    throw new Error("Cannot convert " + N + " to " + _);
  }
  function m(N) {
    let _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return N.map((L) => L.name).join(_);
  }
  function d(N) {
    const _ = N.indexOf("...") === 0, R = (_ ? N.length > 3 ? N.slice(3) : "any" : N).split("|").map((te) => h(te.trim()));
    let H = !1, Y = _ ? "..." : "";
    return {
      types: R.map(function(te) {
        return H = te.isAny || H, Y += te.name + "|", {
          name: te.name,
          typeIndex: te.index,
          test: te.test,
          isAny: te.isAny,
          conversion: null,
          conversionIndex: -1
        };
      }),
      name: Y.slice(0, -1),
      // remove trailing '|' from above
      hasAny: H,
      hasConversion: !1,
      restParam: _
    };
  }
  function w(N) {
    const _ = N.types.map((ae) => ae.name), L = G(_);
    let R = N.hasAny, H = N.name;
    const Y = L.map(function(ae) {
      const te = h(ae.from);
      return R = te.isAny || R, H += "|" + ae.from, {
        name: ae.from,
        typeIndex: te.index,
        test: te.test,
        isAny: te.isAny,
        conversion: ae,
        conversionIndex: ae.index
      };
    });
    return {
      types: N.types.concat(Y),
      name: H,
      hasAny: R,
      hasConversion: Y.length > 0,
      restParam: N.restParam
    };
  }
  function g(N) {
    return N.typeSet || (N.typeSet = /* @__PURE__ */ new Set(), N.types.forEach((_) => N.typeSet.add(_.name))), N.typeSet;
  }
  function A(N) {
    const _ = [];
    if (typeof N != "string")
      throw new TypeError("Signatures must be strings");
    const L = N.trim();
    if (L === "")
      return _;
    const R = L.split(",");
    for (let H = 0; H < R.length; ++H) {
      const Y = d(R[H].trim());
      if (Y.restParam && H !== R.length - 1)
        throw new SyntaxError('Unexpected rest parameter "' + R[H] + '": only allowed for the last parameter');
      if (Y.types.length === 0)
        return null;
      _.push(Y);
    }
    return _;
  }
  function F(N) {
    const _ = X(N);
    return _ ? _.restParam : !1;
  }
  function y(N) {
    if (!N || N.types.length === 0)
      return nn;
    if (N.types.length === 1)
      return h(N.types[0].name).test;
    if (N.types.length === 2) {
      const _ = h(N.types[0].name).test, L = h(N.types[1].name).test;
      return function(H) {
        return _(H) || L(H);
      };
    } else {
      const _ = N.types.map(function(L) {
        return h(L.name).test;
      });
      return function(R) {
        for (let H = 0; H < _.length; H++)
          if (_[H](R))
            return !0;
        return !1;
      };
    }
  }
  function C(N) {
    let _, L, R;
    if (F(N)) {
      _ = Q(N).map(y);
      const H = _.length, Y = y(X(N)), ae = function(te) {
        for (let ie = H; ie < te.length; ie++)
          if (!Y(te[ie]))
            return !1;
        return !0;
      };
      return function(ie) {
        for (let re = 0; re < _.length; re++)
          if (!_[re](ie[re]))
            return !1;
        return ae(ie) && ie.length >= H + 1;
      };
    } else
      return N.length === 0 ? function(Y) {
        return Y.length === 0;
      } : N.length === 1 ? (L = y(N[0]), function(Y) {
        return L(Y[0]) && Y.length === 1;
      }) : N.length === 2 ? (L = y(N[0]), R = y(N[1]), function(Y) {
        return L(Y[0]) && R(Y[1]) && Y.length === 2;
      }) : (_ = N.map(y), function(Y) {
        for (let ae = 0; ae < _.length; ae++)
          if (!_[ae](Y[ae]))
            return !1;
        return Y.length === _.length;
      });
  }
  function b(N, _) {
    return _ < N.length ? N[_] : F(N) ? X(N) : null;
  }
  function E(N, _) {
    const L = b(N, _);
    return L ? g(L) : /* @__PURE__ */ new Set();
  }
  function S(N) {
    return N.conversion === null || N.conversion === void 0;
  }
  function M(N, _) {
    const L = /* @__PURE__ */ new Set();
    return N.forEach((R) => {
      const H = E(R.params, _);
      let Y;
      for (Y of H)
        L.add(Y);
    }), L.has("any") ? ["any"] : Array.from(L);
  }
  function x(N, _, L) {
    let R, H;
    const Y = N || "unnamed";
    let ae = L, te;
    for (te = 0; te < _.length; te++) {
      const Oe = [];
      if (ae.forEach((Re) => {
        const Ke = b(Re.params, te), Xe = y(Ke);
        (te < Re.params.length || F(Re.params)) && Xe(_[te]) && Oe.push(Re);
      }), Oe.length === 0) {
        if (H = M(ae, te), H.length > 0) {
          const Re = u(_[te]);
          return R = new TypeError("Unexpected type of argument in function " + Y + " (expected: " + H.join(" or ") + ", actual: " + Re.join(" | ") + ", index: " + te + ")"), R.data = {
            category: "wrongType",
            fn: Y,
            index: te,
            actual: Re,
            expected: H
          }, R;
        }
      } else
        ae = Oe;
    }
    const ie = ae.map(function(Oe) {
      return F(Oe.params) ? 1 / 0 : Oe.params.length;
    });
    if (_.length < Math.min.apply(null, ie))
      return H = M(ae, te), R = new TypeError("Too few arguments in function " + Y + " (expected: " + H.join(" or ") + ", index: " + _.length + ")"), R.data = {
        category: "tooFewArgs",
        fn: Y,
        index: _.length,
        expected: H
      }, R;
    const re = Math.max.apply(null, ie);
    if (_.length > re)
      return R = new TypeError("Too many arguments in function " + Y + " (expected: " + re + ", actual: " + _.length + ")"), R.data = {
        category: "tooManyArgs",
        fn: Y,
        index: _.length,
        expectedLength: re
      }, R;
    const Ne = [];
    for (let Oe = 0; Oe < _.length; ++Oe)
      Ne.push(u(_[Oe]).join("|"));
    return R = new TypeError('Arguments of type "' + Ne.join(", ") + '" do not match any of the defined signatures of function ' + Y + "."), R.data = {
      category: "mismatch",
      actual: Ne
    }, R;
  }
  function O(N) {
    let _ = r.length + 1;
    for (let L = 0; L < N.types.length; L++)
      S(N.types[L]) && (_ = Math.min(_, N.types[L].typeIndex));
    return _;
  }
  function T(N) {
    let _ = a + 1;
    for (let L = 0; L < N.types.length; L++)
      S(N.types[L]) || (_ = Math.min(_, N.types[L].conversionIndex));
    return _;
  }
  function I(N, _) {
    if (N.hasAny) {
      if (!_.hasAny)
        return 1;
    } else if (_.hasAny)
      return -1;
    if (N.restParam) {
      if (!_.restParam)
        return 1;
    } else if (_.restParam)
      return -1;
    if (N.hasConversion) {
      if (!_.hasConversion)
        return 1;
    } else if (_.hasConversion)
      return -1;
    const L = O(N) - O(_);
    if (L < 0)
      return -1;
    if (L > 0)
      return 1;
    const R = T(N) - T(_);
    return R < 0 ? -1 : R > 0 ? 1 : 0;
  }
  function B(N, _) {
    const L = N.params, R = _.params, H = X(L), Y = X(R), ae = F(L), te = F(R);
    if (ae && H.hasAny) {
      if (!te || !Y.hasAny)
        return 1;
    } else if (te && Y.hasAny)
      return -1;
    let ie = 0, re = 0, Ne;
    for (Ne of L)
      Ne.hasAny && ++ie, Ne.hasConversion && ++re;
    let Oe = 0, Re = 0;
    for (Ne of R)
      Ne.hasAny && ++Oe, Ne.hasConversion && ++Re;
    if (ie !== Oe)
      return ie - Oe;
    if (ae && H.hasConversion) {
      if (!te || !Y.hasConversion)
        return 1;
    } else if (te && Y.hasConversion)
      return -1;
    if (re !== Re)
      return re - Re;
    if (ae) {
      if (!te)
        return 1;
    } else if (te)
      return -1;
    const Ke = (L.length - R.length) * (ae ? -1 : 1);
    if (Ke !== 0)
      return Ke;
    const Xe = [];
    let nr = 0;
    for (let Nr = 0; Nr < L.length; ++Nr) {
      const nt = I(L[Nr], R[Nr]);
      Xe.push(nt), nr += nt;
    }
    if (nr !== 0)
      return nr;
    let ir;
    for (ir of Xe)
      if (ir !== 0)
        return ir;
    return 0;
  }
  function G(N) {
    if (N.length === 0)
      return [];
    const _ = N.map(h);
    N.length > 1 && _.sort((H, Y) => H.index - Y.index);
    let L = _[0].conversionsTo;
    if (N.length === 1)
      return L;
    L = L.concat([]);
    const R = new Set(N);
    for (let H = 1; H < _.length; ++H) {
      let Y;
      for (Y of _[H].conversionsTo)
        R.has(Y.from) || (L.push(Y), R.add(Y.from));
    }
    return L;
  }
  function $(N, _) {
    let L = _;
    if (N.some((H) => H.hasConversion)) {
      const H = F(N), Y = N.map(z);
      L = function() {
        const te = [], ie = H ? arguments.length - 1 : arguments.length;
        for (let re = 0; re < ie; re++)
          te[re] = Y[re](arguments[re]);
        return H && (te[ie] = arguments[ie].map(Y[ie])), _.apply(this, te);
      };
    }
    let R = L;
    if (F(N)) {
      const H = N.length - 1;
      R = function() {
        return L.apply(this, J(arguments, 0, H).concat([J(arguments, H)]));
      };
    }
    return R;
  }
  function z(N) {
    let _, L, R, H;
    const Y = [], ae = [];
    switch (N.types.forEach(function(te) {
      te.conversion && (Y.push(h(te.conversion.from).test), ae.push(te.conversion.convert));
    }), ae.length) {
      case 0:
        return function(ie) {
          return ie;
        };
      case 1:
        return _ = Y[0], R = ae[0], function(ie) {
          return _(ie) ? R(ie) : ie;
        };
      case 2:
        return _ = Y[0], L = Y[1], R = ae[0], H = ae[1], function(ie) {
          return _(ie) ? R(ie) : L(ie) ? H(ie) : ie;
        };
      default:
        return function(ie) {
          for (let re = 0; re < ae.length; re++)
            if (Y[re](ie))
              return ae[re](ie);
          return ie;
        };
    }
  }
  function V(N) {
    function _(L, R, H) {
      if (R < L.length) {
        const Y = L[R];
        let ae = [];
        if (Y.restParam) {
          const te = Y.types.filter(S);
          te.length < Y.types.length && ae.push({
            types: te,
            name: "..." + te.map((ie) => ie.name).join("|"),
            hasAny: te.some((ie) => ie.isAny),
            hasConversion: !1,
            restParam: !0
          }), ae.push(Y);
        } else
          ae = Y.types.map(function(te) {
            return {
              types: [te],
              name: te.name,
              hasAny: te.isAny,
              hasConversion: te.conversion,
              restParam: !1
            };
          });
        return j(ae, function(te) {
          return _(L, R + 1, H.concat([te]));
        });
      } else
        return [H];
    }
    return _(N, 0, []);
  }
  function K(N, _) {
    const L = Math.max(N.length, _.length);
    for (let te = 0; te < L; te++) {
      const ie = E(N, te), re = E(_, te);
      let Ne = !1, Oe;
      for (Oe of re)
        if (ie.has(Oe)) {
          Ne = !0;
          break;
        }
      if (!Ne)
        return !1;
    }
    const R = N.length, H = _.length, Y = F(N), ae = F(_);
    return Y ? ae ? R === H : H >= R : ae ? R >= H : R === H;
  }
  function P(N) {
    return N.map((_) => we(_) ? de(_.referToSelf.callback) : ge(_) ? le(_.referTo.references, _.referTo.callback) : _);
  }
  function q(N, _, L) {
    const R = [];
    let H;
    for (H of N) {
      let Y = L[H];
      if (typeof Y != "number")
        throw new TypeError('No definition for referenced signature "' + H + '"');
      if (Y = _[Y], typeof Y != "function")
        return !1;
      R.push(Y);
    }
    return R;
  }
  function Z(N, _, L) {
    const R = P(N), H = new Array(R.length).fill(!1);
    let Y = !0;
    for (; Y; ) {
      Y = !1;
      let ae = !0;
      for (let te = 0; te < R.length; ++te) {
        if (H[te])
          continue;
        const ie = R[te];
        if (we(ie))
          R[te] = ie.referToSelf.callback(L), R[te].referToSelf = ie.referToSelf, H[te] = !0, ae = !1;
        else if (ge(ie)) {
          const re = q(ie.referTo.references, R, _);
          re ? (R[te] = ie.referTo.callback.apply(this, re), R[te].referTo = ie.referTo, H[te] = !0, ae = !1) : Y = !0;
        }
      }
      if (ae && Y)
        throw new SyntaxError("Circular reference detected in resolving typed.referTo");
    }
    return R;
  }
  function ne(N) {
    const _ = /\bthis(\(|\.signatures\b)/;
    Object.keys(N).forEach((L) => {
      const R = N[L];
      if (_.test(R.toString()))
        throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
    });
  }
  function k(N, _) {
    if (o.createCount++, Object.keys(_).length === 0)
      throw new SyntaxError("No signatures provided");
    o.warnAgainstDeprecatedThis && ne(_);
    const L = [], R = [], H = {}, Y = [];
    let ae;
    for (ae in _) {
      if (!Object.prototype.hasOwnProperty.call(_, ae))
        continue;
      const xe = A(ae);
      if (!xe)
        continue;
      L.forEach(function(Gr) {
        if (K(Gr, xe))
          throw new TypeError('Conflicting signatures "' + m(Gr) + '" and "' + m(xe) + '".');
      }), L.push(xe);
      const We = R.length;
      R.push(_[ae]);
      const Wa = xe.map(w);
      let it;
      for (it of V(Wa)) {
        const Gr = m(it);
        Y.push({
          params: it,
          name: Gr,
          fn: We
        }), it.every((ka) => !ka.hasConversion) && (H[Gr] = We);
      }
    }
    Y.sort(B);
    const te = Z(R, H, Zr);
    let ie;
    for (ie in H)
      Object.prototype.hasOwnProperty.call(H, ie) && (H[ie] = te[H[ie]]);
    const re = [], Ne = /* @__PURE__ */ new Map();
    for (ie of Y)
      Ne.has(ie.name) || (ie.fn = te[ie.fn], re.push(ie), Ne.set(ie.name, ie));
    const Oe = re[0] && re[0].params.length <= 2 && !F(re[0].params), Re = re[1] && re[1].params.length <= 2 && !F(re[1].params), Ke = re[2] && re[2].params.length <= 2 && !F(re[2].params), Xe = re[3] && re[3].params.length <= 2 && !F(re[3].params), nr = re[4] && re[4].params.length <= 2 && !F(re[4].params), ir = re[5] && re[5].params.length <= 2 && !F(re[5].params), Nr = Oe && Re && Ke && Xe && nr && ir;
    for (let xe = 0; xe < re.length; ++xe)
      re[xe].test = C(re[xe].params);
    const nt = Oe ? y(re[0].params[0]) : rr, Fa = Re ? y(re[1].params[0]) : rr, Ca = Ke ? y(re[2].params[0]) : rr, ba = Xe ? y(re[3].params[0]) : rr, Ma = nr ? y(re[4].params[0]) : rr, Sa = ir ? y(re[5].params[0]) : rr, xa = Oe ? y(re[0].params[1]) : rr, Na = Re ? y(re[1].params[1]) : rr, Ba = Ke ? y(re[2].params[1]) : rr, _a = Xe ? y(re[3].params[1]) : rr, za = nr ? y(re[4].params[1]) : rr, Ta = ir ? y(re[5].params[1]) : rr;
    for (let xe = 0; xe < re.length; ++xe)
      re[xe].implementation = $(re[xe].params, re[xe].fn);
    const Oa = Oe ? re[0].implementation : Br, Ia = Re ? re[1].implementation : Br, La = Ke ? re[2].implementation : Br, $a = Xe ? re[3].implementation : Br, qa = nr ? re[4].implementation : Br, Pa = ir ? re[5].implementation : Br, Ra = Oe ? re[0].params.length : -1, Ua = Re ? re[1].params.length : -1, Va = Ke ? re[2].params.length : -1, Za = Xe ? re[3].params.length : -1, Ga = nr ? re[4].params.length : -1, Ya = ir ? re[5].params.length : -1, Ja = Nr ? 6 : 0, Qa = re.length, Xa = re.map((xe) => xe.test), Ha = re.map((xe) => xe.implementation), Ka = function() {
      for (let We = Ja; We < Qa; We++)
        if (Xa[We](arguments))
          return Ha[We].apply(this, arguments);
      return o.onMismatch(N, arguments, re);
    };
    function Zr(xe, We) {
      return arguments.length === Ra && nt(xe) && xa(We) ? Oa.apply(this, arguments) : arguments.length === Ua && Fa(xe) && Na(We) ? Ia.apply(this, arguments) : arguments.length === Va && Ca(xe) && Ba(We) ? La.apply(this, arguments) : arguments.length === Za && ba(xe) && _a(We) ? $a.apply(this, arguments) : arguments.length === Ga && Ma(xe) && za(We) ? qa.apply(this, arguments) : arguments.length === Ya && Sa(xe) && Ta(We) ? Pa.apply(this, arguments) : Ka.apply(this, arguments);
    }
    try {
      Object.defineProperty(Zr, "name", {
        value: N
      });
    } catch {
    }
    return Zr.signatures = H, Zr._typedFunctionData = {
      signatures: re,
      signatureMap: Ne
    }, Zr;
  }
  function U(N, _, L) {
    throw x(N, _, L);
  }
  function Q(N) {
    return J(N, 0, N.length - 1);
  }
  function X(N) {
    return N[N.length - 1];
  }
  function J(N, _, L) {
    return Array.prototype.slice.call(N, _, L);
  }
  function ue(N, _) {
    for (let L = 0; L < N.length; L++)
      if (_(N[L]))
        return N[L];
  }
  function j(N, _) {
    return Array.prototype.concat.apply([], N.map(_));
  }
  function oe() {
    const N = Q(arguments).map((L) => m(A(L))), _ = X(arguments);
    if (typeof _ != "function")
      throw new TypeError("Callback function expected as last argument");
    return le(N, _);
  }
  function le(N, _) {
    return {
      referTo: {
        references: N,
        callback: _
      }
    };
  }
  function de(N) {
    if (typeof N != "function")
      throw new TypeError("Callback function expected as first argument");
    return {
      referToSelf: {
        callback: N
      }
    };
  }
  function ge(N) {
    return N && typeof N.referTo == "object" && Array.isArray(N.referTo.references) && typeof N.referTo.callback == "function";
  }
  function we(N) {
    return N && typeof N.referToSelf == "object" && typeof N.referToSelf.callback == "function";
  }
  function he(N, _) {
    if (!N)
      return _;
    if (_ && _ !== N) {
      const L = new Error("Function names do not match (expected: " + N + ", actual: " + _ + ")");
      throw L.data = {
        actual: _,
        expected: N
      }, L;
    }
    return N;
  }
  function be(N) {
    let _;
    for (const L in N)
      Object.prototype.hasOwnProperty.call(N, L) && (f(N[L]) || typeof N[L].signature == "string") && (_ = he(_, N[L].name));
    return _;
  }
  function Ee(N, _) {
    let L;
    for (L in _)
      if (Object.prototype.hasOwnProperty.call(_, L)) {
        if (L in N && _[L] !== N[L]) {
          const R = new Error('Signature "' + L + '" is defined twice');
          throw R.data = {
            signature: L,
            sourceFunction: _[L],
            destFunction: N[L]
          }, R;
        }
        N[L] = _[L];
      }
  }
  const Se = o;
  o = function(N) {
    const _ = typeof N == "string", L = _ ? 1 : 0;
    let R = _ ? N : "";
    const H = {};
    for (let Y = L; Y < arguments.length; ++Y) {
      const ae = arguments[Y];
      let te = {}, ie;
      if (typeof ae == "function" ? (ie = ae.name, typeof ae.signature == "string" ? te[ae.signature] = ae : f(ae) && (te = ae.signatures)) : e(ae) && (te = ae, _ || (ie = be(ae))), Object.keys(te).length === 0) {
        const re = new TypeError("Argument to 'typed' at index " + Y + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        throw re.data = {
          index: Y,
          argument: ae
        }, re;
      }
      _ || (R = he(R, ie)), Ee(H, te);
    }
    return k(R || "", H);
  }, o.create = wi, o.createCount = Se.createCount, o.onMismatch = U, o.throwMismatchError = U, o.createError = x, o.clear = l, o.clearConversions = s, o.addTypes = c, o._findType = h, o.referTo = oe, o.referToSelf = de, o.convert = v, o.findSignature = p, o.find = D, o.isTypedFunction = f, o.warnAgainstDeprecatedThis = !0, o.addType = function(N, _) {
    let L = "any";
    _ !== !1 && i.has("Object") && (L = "Object"), o.addTypes([N], L);
  };
  function Ue(N) {
    if (!N || typeof N.from != "string" || typeof N.to != "string" || typeof N.convert != "function")
      throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    if (N.to === N.from)
      throw new SyntaxError('Illegal to define conversion from "' + N.from + '" to itself.');
  }
  return o.addConversion = function(N) {
    Ue(N);
    const _ = h(N.to);
    if (_.conversionsTo.every(function(L) {
      return L.from !== N.from;
    }))
      _.conversionsTo.push({
        from: N.from,
        convert: N.convert,
        index: a++
      });
    else
      throw new Error('There is already a conversion from "' + N.from + '" to "' + _.name + '"');
  }, o.addConversions = function(N) {
    N.forEach(o.addConversion);
  }, o.removeConversion = function(N) {
    Ue(N);
    const _ = h(N.to), L = ue(_.conversionsTo, (H) => H.from === N.from);
    if (!L)
      throw new Error("Attempt to remove nonexistent conversion from " + N.from + " to " + N.to);
    if (L.convert !== N.convert)
      throw new Error("Conversion to remove does not match existing conversion");
    const R = _.conversionsTo.indexOf(L);
    _.conversionsTo.splice(R, 1);
  }, o.resolve = function(N, _) {
    if (!f(N))
      throw new TypeError(an);
    const L = N._typedFunctionData.signatures;
    for (let R = 0; R < L.length; ++R)
      if (L[R].test(_))
        return L[R];
    return null;
  }, o;
}
const un = wi();
function ze(e) {
  return typeof e == "boolean" ? !0 : isFinite(e) ? e === Math.round(e) : !1;
}
var _u = Math.sign || function(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
};
function Bt(e, t, n) {
  var i = {
    2: "0b",
    8: "0o",
    16: "0x"
  }, r = i[t], a = "";
  if (n) {
    if (n < 1)
      throw new Error("size must be in greater than 0");
    if (!ze(n))
      throw new Error("size must be an integer");
    if (e > 2 ** (n - 1) - 1 || e < -(2 ** (n - 1)))
      throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!ze(e))
      throw new Error("Value must be an integer");
    e < 0 && (e = e + 2 ** n), a = "i".concat(n);
  }
  var o = "";
  return e < 0 && (e = -e, o = "-"), "".concat(o).concat(r).concat(e.toString(t)).concat(a);
}
function Ot(e, t) {
  if (typeof t == "function")
    return t(e);
  if (e === 1 / 0)
    return "Infinity";
  if (e === -1 / 0)
    return "-Infinity";
  if (isNaN(e))
    return "NaN";
  var n = "auto", i, r;
  if (t && (t.notation && (n = t.notation), Le(t) ? i = t : Le(t.precision) && (i = t.precision), t.wordSize && (r = t.wordSize, typeof r != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (n) {
    case "fixed":
      return Tu(e, i);
    case "exponential":
      return Ai(e, i);
    case "engineering":
      return zu(e, i);
    case "bin":
      return Bt(e, 2, r);
    case "oct":
      return Bt(e, 8, r);
    case "hex":
      return Bt(e, 16, r);
    case "auto":
      return Ou(e, i, t && t).replace(/((\.\d*?)(0+))($|e)/, function() {
        var a = arguments[2], o = arguments[4];
        return a !== "." ? a + o : o;
      });
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function At(e) {
  var t = String(e).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!t)
    throw new SyntaxError("Invalid number " + e);
  var n = t[1], i = t[2], r = parseFloat(t[4] || "0"), a = i.indexOf(".");
  r += a !== -1 ? a - 1 : i.length - 1;
  var o = i.replace(".", "").replace(/^0*/, function(h) {
    return r -= h.length, "";
  }).replace(/0*$/, "").split("").map(function(h) {
    return parseInt(h);
  });
  return o.length === 0 && (o.push(0), r++), {
    sign: n,
    coefficients: o,
    exponent: r
  };
}
function zu(e, t) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var n = At(e), i = Et(n, t), r = i.exponent, a = i.coefficients, o = r % 3 === 0 ? r : r < 0 ? r - 3 - r % 3 : r - r % 3;
  if (Le(t))
    for (; t > a.length || r - o + 1 > a.length; )
      a.push(0);
  else
    for (var h = Math.abs(r - o) - (a.length - 1), c = 0; c < h; c++)
      a.push(0);
  for (var l = Math.abs(r - o), s = 1; l > 0; )
    s++, l--;
  var u = a.slice(s).join(""), f = Le(t) && u.length || u.match(/[1-9]/) ? "." + u : "", p = a.slice(0, s).join("") + f + "e" + (r >= 0 ? "+" : "") + o.toString();
  return i.sign + p;
}
function Tu(e, t) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var n = At(e), i = typeof t == "number" ? Et(n, n.exponent + 1 + t) : n, r = i.coefficients, a = i.exponent + 1, o = a + (t || 0);
  return r.length < o && (r = r.concat(zr(o - r.length))), a < 0 && (r = zr(-a + 1).concat(r), a = 1), a < r.length && r.splice(a, 0, a === 0 ? "0." : "."), i.sign + r.join("");
}
function Ai(e, t) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var n = At(e), i = t ? Et(n, t) : n, r = i.coefficients, a = i.exponent;
  r.length < t && (r = r.concat(zr(t - r.length)));
  var o = r.shift();
  return i.sign + o + (r.length > 0 ? "." + r.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
}
function Ou(e, t, n) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var i = n && n.lowerExp !== void 0 ? n.lowerExp : -3, r = n && n.upperExp !== void 0 ? n.upperExp : 5, a = At(e), o = t ? Et(a, t) : a;
  if (o.exponent < i || o.exponent >= r)
    return Ai(e, t);
  var h = o.coefficients, c = o.exponent;
  h.length < t && (h = h.concat(zr(t - h.length))), h = h.concat(zr(c - h.length + 1 + (h.length < t ? t - h.length : 0))), h = zr(-c).concat(h);
  var l = c > 0 ? c : 0;
  return l < h.length - 1 && h.splice(l + 1, 0, "."), o.sign + h.join("");
}
function Et(e, t) {
  for (var n = {
    sign: e.sign,
    coefficients: e.coefficients,
    exponent: e.exponent
  }, i = n.coefficients; t <= 0; )
    i.unshift(0), n.exponent++, t++;
  if (i.length > t) {
    var r = i.splice(t, i.length - t);
    if (r[0] >= 5) {
      var a = t - 1;
      for (i[a]++; i[a] === 10; )
        i.pop(), a === 0 && (i.unshift(0), n.exponent++, a++), a--, i[a]++;
    }
  }
  return n;
}
function zr(e) {
  for (var t = [], n = 0; n < e; n++)
    t.push(0);
  return t;
}
function Iu(e) {
  return e.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
var Lu = Number.EPSILON || 2220446049250313e-31;
function wr(e, t, n) {
  if (n == null)
    return e === t;
  if (e === t)
    return !0;
  if (isNaN(e) || isNaN(t))
    return !1;
  if (isFinite(e) && isFinite(t)) {
    var i = Math.abs(e - t);
    return i <= Lu ? !0 : i <= Math.max(Math.abs(e), Math.abs(t)) * n;
  }
  return !1;
}
function _t(e, t, n) {
  var i = e.constructor, r = new i(2), a = "";
  if (n) {
    if (n < 1)
      throw new Error("size must be in greater than 0");
    if (!ze(n))
      throw new Error("size must be an integer");
    if (e.greaterThan(r.pow(n - 1).sub(1)) || e.lessThan(r.pow(n - 1).mul(-1)))
      throw new Error("Value must be in range [-2^".concat(n - 1, ", 2^").concat(n - 1, "-1]"));
    if (!e.isInteger())
      throw new Error("Value must be an integer");
    e.lessThan(0) && (e = e.add(r.pow(n))), a = "i".concat(n);
  }
  switch (t) {
    case 2:
      return "".concat(e.toBinary()).concat(a);
    case 8:
      return "".concat(e.toOctal()).concat(a);
    case 16:
      return "".concat(e.toHexadecimal()).concat(a);
    default:
      throw new Error("Base ".concat(t, " not supported "));
  }
}
function $u(e, t) {
  if (typeof t == "function")
    return t(e);
  if (!e.isFinite())
    return e.isNaN() ? "NaN" : e.gt(0) ? "Infinity" : "-Infinity";
  var n = "auto", i, r;
  if (t !== void 0 && (t.notation && (n = t.notation), typeof t == "number" ? i = t : t.precision !== void 0 && (i = t.precision), t.wordSize && (r = t.wordSize, typeof r != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (n) {
    case "fixed":
      return Pu(e, i);
    case "exponential":
      return on(e, i);
    case "engineering":
      return qu(e, i);
    case "bin":
      return _t(e, 2, r);
    case "oct":
      return _t(e, 8, r);
    case "hex":
      return _t(e, 16, r);
    case "auto": {
      var a = t && t.lowerExp !== void 0 ? t.lowerExp : -3, o = t && t.upperExp !== void 0 ? t.upperExp : 5;
      if (e.isZero())
        return "0";
      var h, c = e.toSignificantDigits(i), l = c.e;
      return l >= a && l < o ? h = c.toFixed() : h = on(e, i), h.replace(/((\.\d*?)(0+))($|e)/, function() {
        var s = arguments[2], u = arguments[4];
        return s !== "." ? s + u : u;
      });
    }
    default:
      throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function qu(e, t) {
  var n = e.e, i = n % 3 === 0 ? n : n < 0 ? n - 3 - n % 3 : n - n % 3, r = e.mul(Math.pow(10, -i)), a = r.toPrecision(t);
  if (a.indexOf("e") !== -1) {
    var o = e.constructor;
    a = new o(a).toFixed();
  }
  return a + "e" + (n >= 0 ? "+" : "") + i.toString();
}
function on(e, t) {
  return t !== void 0 ? e.toExponential(t - 1) : e.toExponential();
}
function Pu(e, t) {
  return e.toFixed(t);
}
function Ie(e, t) {
  var n = Ru(e, t);
  return t && typeof t == "object" && "truncate" in t && n.length > t.truncate ? n.substring(0, t.truncate - 3) + "..." : n;
}
function Ru(e, t) {
  if (typeof e == "number")
    return Ot(e, t);
  if (Pe(e))
    return $u(e, t);
  if (Uu(e))
    return !t || t.fraction !== "decimal" ? e.s * e.n + "/" + e.d : e.toString();
  if (Array.isArray(e))
    return Ei(e, t);
  if (tr(e))
    return sn(e);
  if (typeof e == "function")
    return e.syntax ? String(e.syntax) : "function";
  if (e && typeof e == "object") {
    if (typeof e.format == "function")
      return e.format(t);
    if (e && e.toString(t) !== {}.toString())
      return e.toString(t);
    var n = Object.keys(e).map((i) => sn(i) + ": " + Ie(e[i], t));
    return "{" + n.join(", ") + "}";
  }
  return String(e);
}
function sn(e) {
  for (var t = String(e), n = "", i = 0; i < t.length; ) {
    var r = t.charAt(i);
    n += r in fn ? fn[r] : r, i++;
  }
  return '"' + n + '"';
}
var fn = {
  '"': '\\"',
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t"
};
function Ei(e, t) {
  if (Array.isArray(e)) {
    for (var n = "[", i = e.length, r = 0; r < i; r++)
      r !== 0 && (n += ", "), n += Ei(e[r], t);
    return n += "]", n;
  } else
    return Ie(e, t);
}
function Uu(e) {
  return e && typeof e == "object" && typeof e.s == "number" && typeof e.n == "number" && typeof e.d == "number" || !1;
}
function Fe(e, t, n) {
  if (!(this instanceof Fe))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = e, this.expected = t, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + " " + (this.relation || "!=") + " " + (Array.isArray(t) ? "[" + t.join(", ") + "]" : t) + ")", this.stack = new Error().stack;
}
Fe.prototype = new RangeError();
Fe.prototype.constructor = RangeError;
Fe.prototype.name = "DimensionError";
Fe.prototype.isDimensionError = !0;
function br(e, t, n) {
  if (!(this instanceof br))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = e, arguments.length < 3 ? (this.min = 0, this.max = t) : (this.min = t, this.max = n), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
br.prototype = new RangeError();
br.prototype.constructor = RangeError;
br.prototype.name = "IndexError";
br.prototype.isIndexError = !0;
function $e(e) {
  for (var t = []; Array.isArray(e); )
    t.push(e.length), e = e[0];
  return t;
}
function Fi(e, t, n) {
  var i, r = e.length;
  if (r !== t[n])
    throw new Fe(r, t[n]);
  if (n < t.length - 1) {
    var a = n + 1;
    for (i = 0; i < r; i++) {
      var o = e[i];
      if (!Array.isArray(o))
        throw new Fe(t.length - 1, t.length, "<");
      Fi(e[i], t, a);
    }
  } else
    for (i = 0; i < r; i++)
      if (Array.isArray(e[i]))
        throw new Fe(t.length + 1, t.length, ">");
}
function cn(e, t) {
  var n = t.length === 0;
  if (n) {
    if (Array.isArray(e))
      throw new Fe(e.length, 0);
  } else
    Fi(e, t, 0);
}
function st(e, t) {
  var n = e.isMatrix ? e._size : $e(e), i = t._sourceSize;
  i.forEach((r, a) => {
    if (r !== null && r !== n[a])
      throw new Fe(r, n[a]);
  });
}
function Be(e, t) {
  if (e !== void 0) {
    if (!Le(e) || !ze(e))
      throw new TypeError("Index must be an integer (value: " + e + ")");
    if (e < 0 || typeof t == "number" && e >= t)
      throw new br(e, t);
  }
}
function Lr(e) {
  for (var t = 0; t < e._dimensions.length; ++t) {
    var n = e._dimensions[t];
    if (n._data && Me(n._data)) {
      if (n._size[0] === 0)
        return !0;
    } else if (n.isRange) {
      if (n.start === n.end)
        return !0;
    } else if (tr(n) && n.length === 0)
      return !0;
  }
  return !1;
}
function ft(e, t, n) {
  if (!Array.isArray(t))
    throw new TypeError("Array expected");
  if (t.length === 0)
    throw new Error("Resizing to scalar is not supported");
  t.forEach(function(r) {
    if (!Le(r) || !ze(r) || r < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Ie(t) + ")");
  }), (Le(e) || Pe(e)) && (e = [e]);
  var i = n !== void 0 ? n : 0;
  return It(e, t, 0, i), e;
}
function It(e, t, n, i) {
  var r, a, o = e.length, h = t[n], c = Math.min(o, h);
  if (e.length = h, n < t.length - 1) {
    var l = n + 1;
    for (r = 0; r < c; r++)
      a = e[r], Array.isArray(a) || (a = [a], e[r] = a), It(a, t, l, i);
    for (r = c; r < h; r++)
      a = [], e[r] = a, It(a, t, l, i);
  } else {
    for (r = 0; r < c; r++)
      for (; Array.isArray(e[r]); )
        e[r] = e[r][0];
    for (r = c; r < h; r++)
      e[r] = i;
  }
}
function Jt(e, t) {
  var n = Lt(e), i = n.length;
  if (!Array.isArray(e) || !Array.isArray(t))
    throw new TypeError("Array expected");
  if (t.length === 0)
    throw new Fe(0, i, "!=");
  t = Qt(t, i);
  var r = Ci(t);
  if (i !== r)
    throw new Fe(r, i, "!=");
  try {
    return Vu(n, t);
  } catch (a) {
    throw a instanceof Fe ? new Fe(r, i, "!=") : a;
  }
}
function Qt(e, t) {
  var n = Ci(e), i = e.slice(), r = -1, a = e.indexOf(r), o = e.indexOf(r, a + 1) >= 0;
  if (o)
    throw new Error("More than one wildcard in sizes");
  var h = a >= 0, c = t % n === 0;
  if (h)
    if (c)
      i[a] = -t / n;
    else
      throw new Error("Could not replace wildcard, since " + t + " is no multiple of " + -n);
  return i;
}
function Ci(e) {
  return e.reduce((t, n) => t * n, 1);
}
function Vu(e, t) {
  for (var n = e, i, r = t.length - 1; r > 0; r--) {
    var a = t[r];
    i = [];
    for (var o = n.length / a, h = 0; h < o; h++)
      i.push(n.slice(h * a, (h + 1) * a));
    n = i;
  }
  return n;
}
function ln(e, t) {
  for (var n = t || $e(e); Array.isArray(e) && e.length === 1; )
    e = e[0], n.shift();
  for (var i = n.length; n[i - 1] === 1; )
    i--;
  return i < n.length && (e = bi(e, i, 0), n.length = i), e;
}
function bi(e, t, n) {
  var i, r;
  if (n < t) {
    var a = n + 1;
    for (i = 0, r = e.length; i < r; i++)
      e[i] = bi(e[i], t, a);
  } else
    for (; Array.isArray(e); )
      e = e[0];
  return e;
}
function Mi(e, t, n, i) {
  var r = i || $e(e);
  if (n)
    for (var a = 0; a < n; a++)
      e = [e], r.unshift(1);
  for (e = Si(e, t, 0); r.length < t; )
    r.push(1);
  return e;
}
function Si(e, t, n) {
  var i, r;
  if (Array.isArray(e)) {
    var a = n + 1;
    for (i = 0, r = e.length; i < r; i++)
      e[i] = Si(e[i], t, a);
  } else
    for (var o = n; o < t; o++)
      e = [e];
  return e;
}
function Lt(e) {
  if (!Array.isArray(e))
    return e;
  var t = [];
  return e.forEach(function n(i) {
    Array.isArray(i) ? i.forEach(n) : t.push(i);
  }), t;
}
function Jr(e, t) {
  for (var n, i = 0, r = 0; r < e.length; r++) {
    var a = e[r], o = Array.isArray(a);
    if (r === 0 && o && (i = a.length), o && a.length !== i)
      return;
    var h = o ? Jr(a, t) : t(a);
    if (n === void 0)
      n = h;
    else if (n !== h)
      return "mixed";
  }
  return n;
}
function xi(e, t, n, i) {
  if (i < n) {
    if (e.length !== t.length)
      throw new Fe(e.length, t.length);
    for (var r = [], a = 0; a < e.length; a++)
      r[a] = xi(e[a], t[a], n, i + 1);
    return r;
  } else
    return e.concat(t);
}
function Ni() {
  var e = Array.prototype.slice.call(arguments, 0, -1), t = Array.prototype.slice.call(arguments, -1);
  if (e.length === 1)
    return e[0];
  if (e.length > 1)
    return e.slice(1).reduce(function(n, i) {
      return xi(n, i, t, 0);
    }, e[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function Zu() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  for (var i = t.map((f) => f.length), r = Math.max(...i), a = new Array(r).fill(null), o = 0; o < t.length; o++)
    for (var h = t[o], c = i[o], l = 0; l < c; l++) {
      var s = r - c + l;
      h[l] > a[s] && (a[s] = h[l]);
    }
  for (var u = 0; u < t.length; u++)
    ct(t[u], a);
  return a;
}
function ct(e, t) {
  for (var n = t.length, i = e.length, r = 0; r < i; r++) {
    var a = n - i + r;
    if (e[r] < t[a] && e[r] > 1 || e[r] > t[a])
      throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(e, ") not possible to broadcast dimension ").concat(i, " with size ").concat(e[r], " to size ").concat(t[a]));
  }
}
function hn(e, t) {
  var n = $e(e);
  if (Ir(n, t))
    return e;
  ct(n, t);
  var i = Zu(n, t), r = i.length, a = [...Array(r - n.length).fill(1), ...n], o = Yu(e);
  n.length < r && (o = Jt(o, a), n = $e(o));
  for (var h = 0; h < r; h++)
    n[h] < i[h] && (o = Gu(o, i[h], h), n = $e(o));
  return o;
}
function Gu(e, t, n) {
  return Ni(...Array(t).fill(e), n);
}
function Yu(e) {
  return Or([], e);
}
function ee(e, t, n, i) {
  function r(a) {
    var o = xu(a, t.map(Xu));
    return Ju(e, t, a), n(o);
  }
  return r.isFactory = !0, r.fn = e, r.dependencies = t.slice().sort(), i && (r.meta = i), r;
}
function Ju(e, t, n) {
  var i = t.filter((a) => !Qu(a)).every((a) => n[a] !== void 0);
  if (!i) {
    var r = t.filter((a) => n[a] === void 0);
    throw new Error('Cannot create function "'.concat(e, '", ') + "some dependencies are missing: ".concat(r.map((a) => '"'.concat(a, '"')).join(", "), "."));
  }
}
function Qu(e) {
  return e && e[0] === "?";
}
function Xu(e) {
  return e && e[0] === "?" ? e.slice(1) : e;
}
function Bi(e, t) {
  if (Ti(e) && zi(e, t))
    return e[t];
  throw typeof e[t] == "function" && Ku(e, t) ? new Error('Cannot access method "' + t + '" as a property') : new Error('No access to property "' + t + '"');
}
function _i(e, t, n) {
  if (Ti(e) && zi(e, t))
    return e[t] = n, n;
  throw new Error('No access to property "' + t + '"');
}
function Hu(e, t) {
  return t in e;
}
function zi(e, t) {
  return !e || typeof e != "object" ? !1 : Yr(Wu, t) ? !0 : !(t in Object.prototype || t in Function.prototype);
}
function Ku(e, t) {
  return e == null || typeof e[t] != "function" || Yr(e, t) && Object.getPrototypeOf && t in Object.getPrototypeOf(e) ? !1 : Yr(ku, t) ? !0 : !(t in Object.prototype || t in Function.prototype);
}
function Ti(e) {
  return typeof e == "object" && e && e.constructor === Object;
}
var Wu = {
  length: !0,
  name: !0
}, ku = {
  toString: !0,
  valueOf: !0,
  toLocaleString: !0
};
class ju {
  constructor(t) {
    this.wrappedObject = t;
  }
  keys() {
    return Object.keys(this.wrappedObject);
  }
  get(t) {
    return Bi(this.wrappedObject, t);
  }
  set(t, n) {
    return _i(this.wrappedObject, t, n), this;
  }
  has(t) {
    return Hu(this.wrappedObject, t);
  }
}
function eo(e) {
  return e ? e instanceof Map || e instanceof ju || typeof e.set == "function" && typeof e.get == "function" && typeof e.keys == "function" && typeof e.has == "function" : !1;
}
var Oi = function() {
  return Oi = un.create, un;
}, ro = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], to = /* @__PURE__ */ ee("typed", ro, function(t) {
  var {
    BigNumber: n,
    Complex: i,
    DenseMatrix: r,
    Fraction: a
  } = t, o = Oi();
  return o.clear(), o.addTypes([
    {
      name: "number",
      test: Le
    },
    {
      name: "Complex",
      test: Gt
    },
    {
      name: "BigNumber",
      test: Pe
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
      test: (h) => tr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(h)
    },
    {
      name: "string",
      test: tr
    },
    {
      name: "Chain",
      test: bu
    },
    {
      name: "Array",
      test: Me
    },
    {
      name: "Matrix",
      test: _e
    },
    {
      name: "DenseMatrix",
      test: mi
    },
    {
      name: "SparseMatrix",
      test: gi
    },
    {
      name: "Range",
      test: Di
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
      test: tu
    },
    {
      name: "Help",
      test: nu
    },
    {
      name: "function",
      test: iu
    },
    {
      name: "Date",
      test: au
    },
    {
      name: "RegExp",
      test: uu
    },
    {
      name: "null",
      test: ou
    },
    {
      name: "undefined",
      test: su
    },
    {
      name: "AccessorNode",
      test: fu
    },
    {
      name: "ArrayNode",
      test: cu
    },
    {
      name: "AssignmentNode",
      test: lu
    },
    {
      name: "BlockNode",
      test: hu
    },
    {
      name: "ConditionalNode",
      test: vu
    },
    {
      name: "ConstantNode",
      test: pu
    },
    {
      name: "FunctionNode",
      test: mu
    },
    {
      name: "FunctionAssignmentNode",
      test: du
    },
    {
      name: "IndexNode",
      test: gu
    },
    {
      name: "Node",
      test: Du
    },
    {
      name: "ObjectNode",
      test: yu
    },
    {
      name: "OperatorNode",
      test: wu
    },
    {
      name: "ParenthesisNode",
      test: Au
    },
    {
      name: "RangeNode",
      test: Eu
    },
    {
      name: "RelationalNode",
      test: Fu
    },
    {
      name: "SymbolNode",
      test: Cu
    },
    {
      name: "Map",
      test: eo
    },
    {
      name: "Object",
      test: yi
    }
    // order 'Object' last, it matches on other classes too
  ]), o.addConversions([{
    from: "number",
    to: "BigNumber",
    convert: function(c) {
      if (n || zt(c), Iu(c) > 15)
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
      return r || no(), new r(c);
    }
  }, {
    from: "Matrix",
    to: "Array",
    convert: function(c) {
      return c.valueOf();
    }
  }]), o.onMismatch = (h, c, l) => {
    var s = o.createError(h, c, l);
    if (["wrongType", "mismatch"].includes(s.data.category) && c.length === 1 && ot(c[0]) && // check if the function can be unary:
    l.some((f) => !f.params.includes(","))) {
      var u = new TypeError("Function '".concat(h, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(h, ")'."));
      throw u.data = s.data, u;
    }
    throw s;
  }, o.onMismatch = (h, c, l) => {
    var s = o.createError(h, c, l);
    if (["wrongType", "mismatch"].includes(s.data.category) && c.length === 1 && ot(c[0]) && // check if the function can be unary:
    l.some((f) => !f.params.includes(","))) {
      var u = new TypeError("Function '".concat(h, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(h, ")'."));
      throw u.data = s.data, u;
    }
    throw s;
  }, o;
});
function zt(e) {
  throw new Error("Cannot convert value ".concat(e, " into a BigNumber: no class 'BigNumber' provided"));
}
function at(e) {
  throw new Error("Cannot convert value ".concat(e, " into a Complex number: no class 'Complex' provided"));
}
function no() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function Tt(e) {
  throw new Error("Cannot convert value ".concat(e, " into a Fraction, no class 'Fraction' provided."));
}
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var _r = 9e15, Er = 1e9, $t = "0123456789abcdef", lt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", ht = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", qt = {
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
  minE: -_r,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: _r,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, Ii, pr, me = !0, Ft = "[DecimalError] ", Ar = Ft + "Invalid argument: ", Li = Ft + "Precision limit exceeded", $i = Ft + "crypto unavailable", qi = "[object Decimal]", Qe = Math.floor, Ve = Math.pow, io = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, ao = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, uo = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Pi = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, or = 1e7, pe = 7, oo = 9007199254740991, so = lt.length - 1, Pt = ht.length - 1, W = { toStringTag: qi };
W.absoluteValue = W.abs = function() {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), ve(e);
};
W.ceil = function() {
  return ve(new this.constructor(this), this.e + 1, 2);
};
W.clampedTo = W.clamp = function(e, t) {
  var n, i = this, r = i.constructor;
  if (e = new r(e), t = new r(t), !e.s || !t.s)
    return new r(NaN);
  if (e.gt(t))
    throw Error(Ar + t);
  return n = i.cmp(e), n < 0 ? e : i.cmp(t) > 0 ? t : new r(i);
};
W.comparedTo = W.cmp = function(e) {
  var t, n, i, r, a = this, o = a.d, h = (e = new a.constructor(e)).d, c = a.s, l = e.s;
  if (!o || !h)
    return !c || !l ? NaN : c !== l ? c : o === h ? 0 : !o ^ c < 0 ? 1 : -1;
  if (!o[0] || !h[0])
    return o[0] ? c : h[0] ? -l : 0;
  if (c !== l)
    return c;
  if (a.e !== e.e)
    return a.e > e.e ^ c < 0 ? 1 : -1;
  for (i = o.length, r = h.length, t = 0, n = i < r ? i : r; t < n; ++t)
    if (o[t] !== h[t])
      return o[t] > h[t] ^ c < 0 ? 1 : -1;
  return i === r ? 0 : i > r ^ c < 0 ? 1 : -1;
};
W.cosine = W.cos = function() {
  var e, t, n = this, i = n.constructor;
  return n.d ? n.d[0] ? (e = i.precision, t = i.rounding, i.precision = e + Math.max(n.e, n.sd()) + pe, i.rounding = 1, n = fo(i, Gi(i, n)), i.precision = e, i.rounding = t, ve(pr == 2 || pr == 3 ? n.neg() : n, e, t, !0)) : new i(1) : new i(NaN);
};
W.cubeRoot = W.cbrt = function() {
  var e, t, n, i, r, a, o, h, c, l, s = this, u = s.constructor;
  if (!s.isFinite() || s.isZero())
    return new u(s);
  for (me = !1, a = s.s * Ve(s.s * s, 1 / 3), !a || Math.abs(a) == 1 / 0 ? (n = Ye(s.d), e = s.e, (a = (e - n.length + 1) % 3) && (n += a == 1 || a == -2 ? "0" : "00"), a = Ve(n, 1 / 3), e = Qe((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), a == 1 / 0 ? n = "5e" + e : (n = a.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + e), i = new u(n), i.s = s.s) : i = new u(a.toString()), o = (e = u.precision) + 3; ; )
    if (h = i, c = h.times(h).times(h), l = c.plus(s), i = Te(l.plus(s).times(h), l.plus(c), o + 2, 1), Ye(h.d).slice(0, o) === (n = Ye(i.d)).slice(0, o))
      if (n = n.slice(o - 3, o + 1), n == "9999" || !r && n == "4999") {
        if (!r && (ve(h, e + 1, 0), h.times(h).times(h).eq(s))) {
          i = h;
          break;
        }
        o += 4, r = 1;
      } else {
        (!+n || !+n.slice(1) && n.charAt(0) == "5") && (ve(i, e + 1, 1), t = !i.times(i).times(i).eq(s));
        break;
      }
  return me = !0, ve(i, e, u.rounding, t);
};
W.decimalPlaces = W.dp = function() {
  var e, t = this.d, n = NaN;
  if (t) {
    if (e = t.length - 1, n = (e - Qe(this.e / pe)) * pe, e = t[e], e)
      for (; e % 10 == 0; e /= 10)
        n--;
    n < 0 && (n = 0);
  }
  return n;
};
W.dividedBy = W.div = function(e) {
  return Te(this, new this.constructor(e));
};
W.dividedToIntegerBy = W.divToInt = function(e) {
  var t = this, n = t.constructor;
  return ve(Te(t, new n(e), 0, 1, 1), n.precision, n.rounding);
};
W.equals = W.eq = function(e) {
  return this.cmp(e) === 0;
};
W.floor = function() {
  return ve(new this.constructor(this), this.e + 1, 3);
};
W.greaterThan = W.gt = function(e) {
  return this.cmp(e) > 0;
};
W.greaterThanOrEqualTo = W.gte = function(e) {
  var t = this.cmp(e);
  return t == 1 || t === 0;
};
W.hyperbolicCosine = W.cosh = function() {
  var e, t, n, i, r, a = this, o = a.constructor, h = new o(1);
  if (!a.isFinite())
    return new o(a.s ? 1 / 0 : NaN);
  if (a.isZero())
    return h;
  n = o.precision, i = o.rounding, o.precision = n + Math.max(a.e, a.sd()) + 4, o.rounding = 1, r = a.d.length, r < 32 ? (e = Math.ceil(r / 3), t = (1 / bt(4, e)).toString()) : (e = 16, t = "2.3283064365386962890625e-10"), a = $r(o, 1, a.times(t), new o(1), !0);
  for (var c, l = e, s = new o(8); l--; )
    c = a.times(a), a = h.minus(c.times(s.minus(c.times(s))));
  return ve(a, o.precision = n, o.rounding = i, !0);
};
W.hyperbolicSine = W.sinh = function() {
  var e, t, n, i, r = this, a = r.constructor;
  if (!r.isFinite() || r.isZero())
    return new a(r);
  if (t = a.precision, n = a.rounding, a.precision = t + Math.max(r.e, r.sd()) + 4, a.rounding = 1, i = r.d.length, i < 3)
    r = $r(a, 2, r, r, !0);
  else {
    e = 1.4 * Math.sqrt(i), e = e > 16 ? 16 : e | 0, r = r.times(1 / bt(5, e)), r = $r(a, 2, r, r, !0);
    for (var o, h = new a(5), c = new a(16), l = new a(20); e--; )
      o = r.times(r), r = r.times(h.plus(o.times(c.times(o).plus(l))));
  }
  return a.precision = t, a.rounding = n, ve(r, t, n, !0);
};
W.hyperbolicTangent = W.tanh = function() {
  var e, t, n = this, i = n.constructor;
  return n.isFinite() ? n.isZero() ? new i(n) : (e = i.precision, t = i.rounding, i.precision = e + 7, i.rounding = 1, Te(n.sinh(), n.cosh(), i.precision = e, i.rounding = t)) : new i(n.s);
};
W.inverseCosine = W.acos = function() {
  var e, t = this, n = t.constructor, i = t.abs().cmp(1), r = n.precision, a = n.rounding;
  return i !== -1 ? i === 0 ? t.isNeg() ? ur(n, r, a) : new n(0) : new n(NaN) : t.isZero() ? ur(n, r + 4, a).times(0.5) : (n.precision = r + 6, n.rounding = 1, t = t.asin(), e = ur(n, r + 4, a).times(0.5), n.precision = r, n.rounding = a, e.minus(t));
};
W.inverseHyperbolicCosine = W.acosh = function() {
  var e, t, n = this, i = n.constructor;
  return n.lte(1) ? new i(n.eq(1) ? 0 : NaN) : n.isFinite() ? (e = i.precision, t = i.rounding, i.precision = e + Math.max(Math.abs(n.e), n.sd()) + 4, i.rounding = 1, me = !1, n = n.times(n).minus(1).sqrt().plus(n), me = !0, i.precision = e, i.rounding = t, n.ln()) : new i(n);
};
W.inverseHyperbolicSine = W.asinh = function() {
  var e, t, n = this, i = n.constructor;
  return !n.isFinite() || n.isZero() ? new i(n) : (e = i.precision, t = i.rounding, i.precision = e + 2 * Math.max(Math.abs(n.e), n.sd()) + 6, i.rounding = 1, me = !1, n = n.times(n).plus(1).sqrt().plus(n), me = !0, i.precision = e, i.rounding = t, n.ln());
};
W.inverseHyperbolicTangent = W.atanh = function() {
  var e, t, n, i, r = this, a = r.constructor;
  return r.isFinite() ? r.e >= 0 ? new a(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = a.precision, t = a.rounding, i = r.sd(), Math.max(i, e) < 2 * -r.e - 1 ? ve(new a(r), e, t, !0) : (a.precision = n = i - r.e, r = Te(r.plus(1), new a(1).minus(r), n + e, 1), a.precision = e + 4, a.rounding = 1, r = r.ln(), a.precision = e, a.rounding = t, r.times(0.5))) : new a(NaN);
};
W.inverseSine = W.asin = function() {
  var e, t, n, i, r = this, a = r.constructor;
  return r.isZero() ? new a(r) : (t = r.abs().cmp(1), n = a.precision, i = a.rounding, t !== -1 ? t === 0 ? (e = ur(a, n + 4, i).times(0.5), e.s = r.s, e) : new a(NaN) : (a.precision = n + 6, a.rounding = 1, r = r.div(new a(1).minus(r.times(r)).sqrt().plus(1)).atan(), a.precision = n, a.rounding = i, r.times(2)));
};
W.inverseTangent = W.atan = function() {
  var e, t, n, i, r, a, o, h, c, l = this, s = l.constructor, u = s.precision, f = s.rounding;
  if (l.isFinite()) {
    if (l.isZero())
      return new s(l);
    if (l.abs().eq(1) && u + 4 <= Pt)
      return o = ur(s, u + 4, f).times(0.25), o.s = l.s, o;
  } else {
    if (!l.s)
      return new s(NaN);
    if (u + 4 <= Pt)
      return o = ur(s, u + 4, f).times(0.5), o.s = l.s, o;
  }
  for (s.precision = h = u + 10, s.rounding = 1, n = Math.min(28, h / pe + 2 | 0), e = n; e; --e)
    l = l.div(l.times(l).plus(1).sqrt().plus(1));
  for (me = !1, t = Math.ceil(h / pe), i = 1, c = l.times(l), o = new s(l), r = l; e !== -1; )
    if (r = r.times(c), a = o.minus(r.div(i += 2)), r = r.times(c), o = a.plus(r.div(i += 2)), o.d[t] !== void 0)
      for (e = t; o.d[e] === a.d[e] && e--; )
        ;
  return n && (o = o.times(2 << n - 1)), me = !0, ve(o, s.precision = u, s.rounding = f, !0);
};
W.isFinite = function() {
  return !!this.d;
};
W.isInteger = W.isInt = function() {
  return !!this.d && Qe(this.e / pe) > this.d.length - 2;
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
W.lessThan = W.lt = function(e) {
  return this.cmp(e) < 0;
};
W.lessThanOrEqualTo = W.lte = function(e) {
  return this.cmp(e) < 1;
};
W.logarithm = W.log = function(e) {
  var t, n, i, r, a, o, h, c, l = this, s = l.constructor, u = s.precision, f = s.rounding, p = 5;
  if (e == null)
    e = new s(10), t = !0;
  else {
    if (e = new s(e), n = e.d, e.s < 0 || !n || !n[0] || e.eq(1))
      return new s(NaN);
    t = e.eq(10);
  }
  if (n = l.d, l.s < 0 || !n || !n[0] || l.eq(1))
    return new s(n && !n[0] ? -1 / 0 : l.s != 1 ? NaN : n ? 0 : 1 / 0);
  if (t)
    if (n.length > 1)
      a = !0;
    else {
      for (r = n[0]; r % 10 === 0; )
        r /= 10;
      a = r !== 1;
    }
  if (me = !1, h = u + p, o = yr(l, h), i = t ? vt(s, h + 10) : yr(e, h), c = Te(o, i, h, 1), Qr(c.d, r = u, f))
    do
      if (h += 10, o = yr(l, h), i = t ? vt(s, h + 10) : yr(e, h), c = Te(o, i, h, 1), !a) {
        +Ye(c.d).slice(r + 1, r + 15) + 1 == 1e14 && (c = ve(c, u + 1, 0));
        break;
      }
    while (Qr(c.d, r += 10, f));
  return me = !0, ve(c, u, f);
};
W.minus = W.sub = function(e) {
  var t, n, i, r, a, o, h, c, l, s, u, f, p = this, D = p.constructor;
  if (e = new D(e), !p.d || !e.d)
    return !p.s || !e.s ? e = new D(NaN) : p.d ? e.s = -e.s : e = new D(e.d || p.s !== e.s ? p : NaN), e;
  if (p.s != e.s)
    return e.s = -e.s, p.plus(e);
  if (l = p.d, f = e.d, h = D.precision, c = D.rounding, !l[0] || !f[0]) {
    if (f[0])
      e.s = -e.s;
    else if (l[0])
      e = new D(p);
    else
      return new D(c === 3 ? -0 : 0);
    return me ? ve(e, h, c) : e;
  }
  if (n = Qe(e.e / pe), s = Qe(p.e / pe), l = l.slice(), a = s - n, a) {
    for (u = a < 0, u ? (t = l, a = -a, o = f.length) : (t = f, n = s, o = l.length), i = Math.max(Math.ceil(h / pe), o) + 2, a > i && (a = i, t.length = 1), t.reverse(), i = a; i--; )
      t.push(0);
    t.reverse();
  } else {
    for (i = l.length, o = f.length, u = i < o, u && (o = i), i = 0; i < o; i++)
      if (l[i] != f[i]) {
        u = l[i] < f[i];
        break;
      }
    a = 0;
  }
  for (u && (t = l, l = f, f = t, e.s = -e.s), o = l.length, i = f.length - o; i > 0; --i)
    l[o++] = 0;
  for (i = f.length; i > a; ) {
    if (l[--i] < f[i]) {
      for (r = i; r && l[--r] === 0; )
        l[r] = or - 1;
      --l[r], l[i] += or;
    }
    l[i] -= f[i];
  }
  for (; l[--o] === 0; )
    l.pop();
  for (; l[0] === 0; l.shift())
    --n;
  return l[0] ? (e.d = l, e.e = Ct(l, n), me ? ve(e, h, c) : e) : new D(c === 3 ? -0 : 0);
};
W.modulo = W.mod = function(e) {
  var t, n = this, i = n.constructor;
  return e = new i(e), !n.d || !e.s || e.d && !e.d[0] ? new i(NaN) : !e.d || n.d && !n.d[0] ? ve(new i(n), i.precision, i.rounding) : (me = !1, i.modulo == 9 ? (t = Te(n, e.abs(), 0, 3, 1), t.s *= e.s) : t = Te(n, e, 0, i.modulo, 1), t = t.times(e), me = !0, n.minus(t));
};
W.naturalExponential = W.exp = function() {
  return Rt(this);
};
W.naturalLogarithm = W.ln = function() {
  return yr(this);
};
W.negated = W.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s, ve(e);
};
W.plus = W.add = function(e) {
  var t, n, i, r, a, o, h, c, l, s, u = this, f = u.constructor;
  if (e = new f(e), !u.d || !e.d)
    return !u.s || !e.s ? e = new f(NaN) : u.d || (e = new f(e.d || u.s === e.s ? u : NaN)), e;
  if (u.s != e.s)
    return e.s = -e.s, u.minus(e);
  if (l = u.d, s = e.d, h = f.precision, c = f.rounding, !l[0] || !s[0])
    return s[0] || (e = new f(u)), me ? ve(e, h, c) : e;
  if (a = Qe(u.e / pe), i = Qe(e.e / pe), l = l.slice(), r = a - i, r) {
    for (r < 0 ? (n = l, r = -r, o = s.length) : (n = s, i = a, o = l.length), a = Math.ceil(h / pe), o = a > o ? a + 1 : o + 1, r > o && (r = o, n.length = 1), n.reverse(); r--; )
      n.push(0);
    n.reverse();
  }
  for (o = l.length, r = s.length, o - r < 0 && (r = o, n = s, s = l, l = n), t = 0; r; )
    t = (l[--r] = l[r] + s[r] + t) / or | 0, l[r] %= or;
  for (t && (l.unshift(t), ++i), o = l.length; l[--o] == 0; )
    l.pop();
  return e.d = l, e.e = Ct(l, i), me ? ve(e, h, c) : e;
};
W.precision = W.sd = function(e) {
  var t, n = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0)
    throw Error(Ar + e);
  return n.d ? (t = Ri(n.d), e && n.e + 1 > t && (t = n.e + 1)) : t = NaN, t;
};
W.round = function() {
  var e = this, t = e.constructor;
  return ve(new t(e), e.e + 1, t.rounding);
};
W.sine = W.sin = function() {
  var e, t, n = this, i = n.constructor;
  return n.isFinite() ? n.isZero() ? new i(n) : (e = i.precision, t = i.rounding, i.precision = e + Math.max(n.e, n.sd()) + pe, i.rounding = 1, n = lo(i, Gi(i, n)), i.precision = e, i.rounding = t, ve(pr > 2 ? n.neg() : n, e, t, !0)) : new i(NaN);
};
W.squareRoot = W.sqrt = function() {
  var e, t, n, i, r, a, o = this, h = o.d, c = o.e, l = o.s, s = o.constructor;
  if (l !== 1 || !h || !h[0])
    return new s(!l || l < 0 && (!h || h[0]) ? NaN : h ? o : 1 / 0);
  for (me = !1, l = Math.sqrt(+o), l == 0 || l == 1 / 0 ? (t = Ye(h), (t.length + c) % 2 == 0 && (t += "0"), l = Math.sqrt(t), c = Qe((c + 1) / 2) - (c < 0 || c % 2), l == 1 / 0 ? t = "5e" + c : (t = l.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + c), i = new s(t)) : i = new s(l.toString()), n = (c = s.precision) + 3; ; )
    if (a = i, i = a.plus(Te(o, a, n + 2, 1)).times(0.5), Ye(a.d).slice(0, n) === (t = Ye(i.d)).slice(0, n))
      if (t = t.slice(n - 3, n + 1), t == "9999" || !r && t == "4999") {
        if (!r && (ve(a, c + 1, 0), a.times(a).eq(o))) {
          i = a;
          break;
        }
        n += 4, r = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (ve(i, c + 1, 1), e = !i.times(i).eq(o));
        break;
      }
  return me = !0, ve(i, c, s.rounding, e);
};
W.tangent = W.tan = function() {
  var e, t, n = this, i = n.constructor;
  return n.isFinite() ? n.isZero() ? new i(n) : (e = i.precision, t = i.rounding, i.precision = e + 10, i.rounding = 1, n = n.sin(), n.s = 1, n = Te(n, new i(1).minus(n.times(n)).sqrt(), e + 10, 0), i.precision = e, i.rounding = t, ve(pr == 2 || pr == 4 ? n.neg() : n, e, t, !0)) : new i(NaN);
};
W.times = W.mul = function(e) {
  var t, n, i, r, a, o, h, c, l, s = this, u = s.constructor, f = s.d, p = (e = new u(e)).d;
  if (e.s *= s.s, !f || !f[0] || !p || !p[0])
    return new u(!e.s || f && !f[0] && !p || p && !p[0] && !f ? NaN : !f || !p ? e.s / 0 : e.s * 0);
  for (n = Qe(s.e / pe) + Qe(e.e / pe), c = f.length, l = p.length, c < l && (a = f, f = p, p = a, o = c, c = l, l = o), a = [], o = c + l, i = o; i--; )
    a.push(0);
  for (i = l; --i >= 0; ) {
    for (t = 0, r = c + i; r > i; )
      h = a[r] + p[i] * f[r - i - 1] + t, a[r--] = h % or | 0, t = h / or | 0;
    a[r] = (a[r] + t) % or | 0;
  }
  for (; !a[--o]; )
    a.pop();
  return t ? ++n : a.shift(), e.d = a, e.e = Ct(a, n), me ? ve(e, u.precision, u.rounding) : e;
};
W.toBinary = function(e, t) {
  return Xt(this, 2, e, t);
};
W.toDecimalPlaces = W.toDP = function(e, t) {
  var n = this, i = n.constructor;
  return n = new i(n), e === void 0 ? n : (ke(e, 0, Er), t === void 0 ? t = i.rounding : ke(t, 0, 8), ve(n, e + n.e + 1, t));
};
W.toExponential = function(e, t) {
  var n, i = this, r = i.constructor;
  return e === void 0 ? n = hr(i, !0) : (ke(e, 0, Er), t === void 0 ? t = r.rounding : ke(t, 0, 8), i = ve(new r(i), e + 1, t), n = hr(i, !0, e + 1)), i.isNeg() && !i.isZero() ? "-" + n : n;
};
W.toFixed = function(e, t) {
  var n, i, r = this, a = r.constructor;
  return e === void 0 ? n = hr(r) : (ke(e, 0, Er), t === void 0 ? t = a.rounding : ke(t, 0, 8), i = ve(new a(r), e + r.e + 1, t), n = hr(i, !1, e + i.e + 1)), r.isNeg() && !r.isZero() ? "-" + n : n;
};
W.toFraction = function(e) {
  var t, n, i, r, a, o, h, c, l, s, u, f, p = this, D = p.d, v = p.constructor;
  if (!D)
    return new v(p);
  if (l = n = new v(1), i = c = new v(0), t = new v(i), a = t.e = Ri(D) - p.e - 1, o = a % pe, t.d[0] = Ve(10, o < 0 ? pe + o : o), e == null)
    e = a > 0 ? t : l;
  else {
    if (h = new v(e), !h.isInt() || h.lt(l))
      throw Error(Ar + h);
    e = h.gt(t) ? a > 0 ? t : l : h;
  }
  for (me = !1, h = new v(Ye(D)), s = v.precision, v.precision = a = D.length * pe * 2; u = Te(h, t, 0, 1, 1), r = n.plus(u.times(i)), r.cmp(e) != 1; )
    n = i, i = r, r = l, l = c.plus(u.times(r)), c = r, r = t, t = h.minus(u.times(r)), h = r;
  return r = Te(e.minus(n), i, 0, 1, 1), c = c.plus(r.times(l)), n = n.plus(r.times(i)), c.s = l.s = p.s, f = Te(l, i, a, 1).minus(p).abs().cmp(Te(c, n, a, 1).minus(p).abs()) < 1 ? [l, i] : [c, n], v.precision = s, me = !0, f;
};
W.toHexadecimal = W.toHex = function(e, t) {
  return Xt(this, 16, e, t);
};
W.toNearest = function(e, t) {
  var n = this, i = n.constructor;
  if (n = new i(n), e == null) {
    if (!n.d)
      return n;
    e = new i(1), t = i.rounding;
  } else {
    if (e = new i(e), t === void 0 ? t = i.rounding : ke(t, 0, 8), !n.d)
      return e.s ? n : e;
    if (!e.d)
      return e.s && (e.s = n.s), e;
  }
  return e.d[0] ? (me = !1, n = Te(n, e, 0, t, 1).times(e), me = !0, ve(n)) : (e.s = n.s, n = e), n;
};
W.toNumber = function() {
  return +this;
};
W.toOctal = function(e, t) {
  return Xt(this, 8, e, t);
};
W.toPower = W.pow = function(e) {
  var t, n, i, r, a, o, h = this, c = h.constructor, l = +(e = new c(e));
  if (!h.d || !e.d || !h.d[0] || !e.d[0])
    return new c(Ve(+h, l));
  if (h = new c(h), h.eq(1))
    return h;
  if (i = c.precision, a = c.rounding, e.eq(1))
    return ve(h, i, a);
  if (t = Qe(e.e / pe), t >= e.d.length - 1 && (n = l < 0 ? -l : l) <= oo)
    return r = Ui(c, h, n, i), e.s < 0 ? new c(1).div(r) : ve(r, i, a);
  if (o = h.s, o < 0) {
    if (t < e.d.length - 1)
      return new c(NaN);
    if (e.d[t] & 1 || (o = 1), h.e == 0 && h.d[0] == 1 && h.d.length == 1)
      return h.s = o, h;
  }
  return n = Ve(+h, l), t = n == 0 || !isFinite(n) ? Qe(l * (Math.log("0." + Ye(h.d)) / Math.LN10 + h.e + 1)) : new c(n + "").e, t > c.maxE + 1 || t < c.minE - 1 ? new c(t > 0 ? o / 0 : 0) : (me = !1, c.rounding = h.s = 1, n = Math.min(12, (t + "").length), r = Rt(e.times(yr(h, i + n)), i), r.d && (r = ve(r, i + 5, 1), Qr(r.d, i, a) && (t = i + 10, r = ve(Rt(e.times(yr(h, t + n)), t), t + 5, 1), +Ye(r.d).slice(i + 1, i + 15) + 1 == 1e14 && (r = ve(r, i + 1, 0)))), r.s = o, me = !0, c.rounding = a, ve(r, i, a));
};
W.toPrecision = function(e, t) {
  var n, i = this, r = i.constructor;
  return e === void 0 ? n = hr(i, i.e <= r.toExpNeg || i.e >= r.toExpPos) : (ke(e, 1, Er), t === void 0 ? t = r.rounding : ke(t, 0, 8), i = ve(new r(i), e, t), n = hr(i, e <= i.e || i.e <= r.toExpNeg, e)), i.isNeg() && !i.isZero() ? "-" + n : n;
};
W.toSignificantDigits = W.toSD = function(e, t) {
  var n = this, i = n.constructor;
  return e === void 0 ? (e = i.precision, t = i.rounding) : (ke(e, 1, Er), t === void 0 ? t = i.rounding : ke(t, 0, 8)), ve(new i(n), e, t);
};
W.toString = function() {
  var e = this, t = e.constructor, n = hr(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + n : n;
};
W.truncated = W.trunc = function() {
  return ve(new this.constructor(this), this.e + 1, 1);
};
W.valueOf = W.toJSON = function() {
  var e = this, t = e.constructor, n = hr(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() ? "-" + n : n;
};
function Ye(e) {
  var t, n, i, r = e.length - 1, a = "", o = e[0];
  if (r > 0) {
    for (a += o, t = 1; t < r; t++)
      i = e[t] + "", n = pe - i.length, n && (a += mr(n)), a += i;
    o = e[t], i = o + "", n = pe - i.length, n && (a += mr(n));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; )
    o /= 10;
  return a + o;
}
function ke(e, t, n) {
  if (e !== ~~e || e < t || e > n)
    throw Error(Ar + e);
}
function Qr(e, t, n, i) {
  var r, a, o, h;
  for (a = e[0]; a >= 10; a /= 10)
    --t;
  return --t < 0 ? (t += pe, r = 0) : (r = Math.ceil((t + 1) / pe), t %= pe), a = Ve(10, pe - t), h = e[r] % a | 0, i == null ? t < 3 ? (t == 0 ? h = h / 100 | 0 : t == 1 && (h = h / 10 | 0), o = n < 4 && h == 99999 || n > 3 && h == 49999 || h == 5e4 || h == 0) : o = (n < 4 && h + 1 == a || n > 3 && h + 1 == a / 2) && (e[r + 1] / a / 100 | 0) == Ve(10, t - 2) - 1 || (h == a / 2 || h == 0) && (e[r + 1] / a / 100 | 0) == 0 : t < 4 ? (t == 0 ? h = h / 1e3 | 0 : t == 1 ? h = h / 100 | 0 : t == 2 && (h = h / 10 | 0), o = (i || n < 4) && h == 9999 || !i && n > 3 && h == 4999) : o = ((i || n < 4) && h + 1 == a || !i && n > 3 && h + 1 == a / 2) && (e[r + 1] / a / 1e3 | 0) == Ve(10, t - 3) - 1, o;
}
function ut(e, t, n) {
  for (var i, r = [0], a, o = 0, h = e.length; o < h; ) {
    for (a = r.length; a--; )
      r[a] *= t;
    for (r[0] += $t.indexOf(e.charAt(o++)), i = 0; i < r.length; i++)
      r[i] > n - 1 && (r[i + 1] === void 0 && (r[i + 1] = 0), r[i + 1] += r[i] / n | 0, r[i] %= n);
  }
  return r.reverse();
}
function fo(e, t) {
  var n, i, r;
  if (t.isZero())
    return t;
  i = t.d.length, i < 32 ? (n = Math.ceil(i / 3), r = (1 / bt(4, n)).toString()) : (n = 16, r = "2.3283064365386962890625e-10"), e.precision += n, t = $r(e, 1, t.times(r), new e(1));
  for (var a = n; a--; ) {
    var o = t.times(t);
    t = o.times(o).minus(o).times(8).plus(1);
  }
  return e.precision -= n, t;
}
var Te = /* @__PURE__ */ function() {
  function e(i, r, a) {
    var o, h = 0, c = i.length;
    for (i = i.slice(); c--; )
      o = i[c] * r + h, i[c] = o % a | 0, h = o / a | 0;
    return h && i.unshift(h), i;
  }
  function t(i, r, a, o) {
    var h, c;
    if (a != o)
      c = a > o ? 1 : -1;
    else
      for (h = c = 0; h < a; h++)
        if (i[h] != r[h]) {
          c = i[h] > r[h] ? 1 : -1;
          break;
        }
    return c;
  }
  function n(i, r, a, o) {
    for (var h = 0; a--; )
      i[a] -= h, h = i[a] < r[a] ? 1 : 0, i[a] = h * o + i[a] - r[a];
    for (; !i[0] && i.length > 1; )
      i.shift();
  }
  return function(i, r, a, o, h, c) {
    var l, s, u, f, p, D, v, m, d, w, g, A, F, y, C, b, E, S, M, x, O = i.constructor, T = i.s == r.s ? 1 : -1, I = i.d, B = r.d;
    if (!I || !I[0] || !B || !B[0])
      return new O(
        // Return NaN if either NaN, or both Infinity or 0.
        !i.s || !r.s || (I ? B && I[0] == B[0] : !B) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          I && I[0] == 0 || !B ? T * 0 : T / 0
        )
      );
    for (c ? (p = 1, s = i.e - r.e) : (c = or, p = pe, s = Qe(i.e / p) - Qe(r.e / p)), M = B.length, E = I.length, d = new O(T), w = d.d = [], u = 0; B[u] == (I[u] || 0); u++)
      ;
    if (B[u] > (I[u] || 0) && s--, a == null ? (y = a = O.precision, o = O.rounding) : h ? y = a + (i.e - r.e) + 1 : y = a, y < 0)
      w.push(1), D = !0;
    else {
      if (y = y / p + 2 | 0, u = 0, M == 1) {
        for (f = 0, B = B[0], y++; (u < E || f) && y--; u++)
          C = f * c + (I[u] || 0), w[u] = C / B | 0, f = C % B | 0;
        D = f || u < E;
      } else {
        for (f = c / (B[0] + 1) | 0, f > 1 && (B = e(B, f, c), I = e(I, f, c), M = B.length, E = I.length), b = M, g = I.slice(0, M), A = g.length; A < M; )
          g[A++] = 0;
        x = B.slice(), x.unshift(0), S = B[0], B[1] >= c / 2 && ++S;
        do
          f = 0, l = t(B, g, M, A), l < 0 ? (F = g[0], M != A && (F = F * c + (g[1] || 0)), f = F / S | 0, f > 1 ? (f >= c && (f = c - 1), v = e(B, f, c), m = v.length, A = g.length, l = t(v, g, m, A), l == 1 && (f--, n(v, M < m ? x : B, m, c))) : (f == 0 && (l = f = 1), v = B.slice()), m = v.length, m < A && v.unshift(0), n(g, v, A, c), l == -1 && (A = g.length, l = t(B, g, M, A), l < 1 && (f++, n(g, M < A ? x : B, A, c))), A = g.length) : l === 0 && (f++, g = [0]), w[u++] = f, l && g[0] ? g[A++] = I[b] || 0 : (g = [I[b]], A = 1);
        while ((b++ < E || g[0] !== void 0) && y--);
        D = g[0] !== void 0;
      }
      w[0] || w.shift();
    }
    if (p == 1)
      d.e = s, Ii = D;
    else {
      for (u = 1, f = w[0]; f >= 10; f /= 10)
        u++;
      d.e = u + s * p - 1, ve(d, h ? a + d.e + 1 : a, o, D);
    }
    return d;
  };
}();
function ve(e, t, n, i) {
  var r, a, o, h, c, l, s, u, f, p = e.constructor;
  e:
    if (t != null) {
      if (u = e.d, !u)
        return e;
      for (r = 1, h = u[0]; h >= 10; h /= 10)
        r++;
      if (a = t - r, a < 0)
        a += pe, o = t, s = u[f = 0], c = s / Ve(10, r - o - 1) % 10 | 0;
      else if (f = Math.ceil((a + 1) / pe), h = u.length, f >= h)
        if (i) {
          for (; h++ <= f; )
            u.push(0);
          s = c = 0, r = 1, a %= pe, o = a - pe + 1;
        } else
          break e;
      else {
        for (s = h = u[f], r = 1; h >= 10; h /= 10)
          r++;
        a %= pe, o = a - pe + r, c = o < 0 ? 0 : s / Ve(10, r - o - 1) % 10 | 0;
      }
      if (i = i || t < 0 || u[f + 1] !== void 0 || (o < 0 ? s : s % Ve(10, r - o - 1)), l = n < 4 ? (c || i) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (n == 4 || i || n == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (a > 0 ? o > 0 ? s / Ve(10, r - o) : 0 : u[f - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7)), t < 1 || !u[0])
        return u.length = 0, l ? (t -= e.e + 1, u[0] = Ve(10, (pe - t % pe) % pe), e.e = -t || 0) : u[0] = e.e = 0, e;
      if (a == 0 ? (u.length = f, h = 1, f--) : (u.length = f + 1, h = Ve(10, pe - a), u[f] = o > 0 ? (s / Ve(10, r - o) % Ve(10, o) | 0) * h : 0), l)
        for (; ; )
          if (f == 0) {
            for (a = 1, o = u[0]; o >= 10; o /= 10)
              a++;
            for (o = u[0] += h, h = 1; o >= 10; o /= 10)
              h++;
            a != h && (e.e++, u[0] == or && (u[0] = 1));
            break;
          } else {
            if (u[f] += h, u[f] != or)
              break;
            u[f--] = 0, h = 1;
          }
      for (a = u.length; u[--a] === 0; )
        u.pop();
    }
  return me && (e.e > p.maxE ? (e.d = null, e.e = NaN) : e.e < p.minE && (e.e = 0, e.d = [0])), e;
}
function hr(e, t, n) {
  if (!e.isFinite())
    return Zi(e);
  var i, r = e.e, a = Ye(e.d), o = a.length;
  return t ? (n && (i = n - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + mr(i) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (a = "0." + mr(-r - 1) + a, n && (i = n - o) > 0 && (a += mr(i))) : r >= o ? (a += mr(r + 1 - o), n && (i = n - r - 1) > 0 && (a = a + "." + mr(i))) : ((i = r + 1) < o && (a = a.slice(0, i) + "." + a.slice(i)), n && (i = n - o) > 0 && (r + 1 === o && (a += "."), a += mr(i))), a;
}
function Ct(e, t) {
  var n = e[0];
  for (t *= pe; n >= 10; n /= 10)
    t++;
  return t;
}
function vt(e, t, n) {
  if (t > so)
    throw me = !0, n && (e.precision = n), Error(Li);
  return ve(new e(lt), t, 1, !0);
}
function ur(e, t, n) {
  if (t > Pt)
    throw Error(Li);
  return ve(new e(ht), t, n, !0);
}
function Ri(e) {
  var t = e.length - 1, n = t * pe + 1;
  if (t = e[t], t) {
    for (; t % 10 == 0; t /= 10)
      n--;
    for (t = e[0]; t >= 10; t /= 10)
      n++;
  }
  return n;
}
function mr(e) {
  for (var t = ""; e--; )
    t += "0";
  return t;
}
function Ui(e, t, n, i) {
  var r, a = new e(1), o = Math.ceil(i / pe + 4);
  for (me = !1; ; ) {
    if (n % 2 && (a = a.times(t), pn(a.d, o) && (r = !0)), n = Qe(n / 2), n === 0) {
      n = a.d.length - 1, r && a.d[n] === 0 && ++a.d[n];
      break;
    }
    t = t.times(t), pn(t.d, o);
  }
  return me = !0, a;
}
function vn(e) {
  return e.d[e.d.length - 1] & 1;
}
function Vi(e, t, n) {
  for (var i, r = new e(t[0]), a = 0; ++a < t.length; )
    if (i = new e(t[a]), i.s)
      r[n](i) && (r = i);
    else {
      r = i;
      break;
    }
  return r;
}
function Rt(e, t) {
  var n, i, r, a, o, h, c, l = 0, s = 0, u = 0, f = e.constructor, p = f.rounding, D = f.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new f(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
  for (t == null ? (me = !1, c = D) : c = t, h = new f(0.03125); e.e > -2; )
    e = e.times(h), u += 5;
  for (i = Math.log(Ve(2, u)) / Math.LN10 * 2 + 5 | 0, c += i, n = a = o = new f(1), f.precision = c; ; ) {
    if (a = ve(a.times(e), c, 1), n = n.times(++s), h = o.plus(Te(a, n, c, 1)), Ye(h.d).slice(0, c) === Ye(o.d).slice(0, c)) {
      for (r = u; r--; )
        o = ve(o.times(o), c, 1);
      if (t == null)
        if (l < 3 && Qr(o.d, c - i, p, l))
          f.precision = c += 10, n = a = h = new f(1), s = 0, l++;
        else
          return ve(o, f.precision = D, p, me = !0);
      else
        return f.precision = D, o;
    }
    o = h;
  }
}
function yr(e, t) {
  var n, i, r, a, o, h, c, l, s, u, f, p = 1, D = 10, v = e, m = v.d, d = v.constructor, w = d.rounding, g = d.precision;
  if (v.s < 0 || !m || !m[0] || !v.e && m[0] == 1 && m.length == 1)
    return new d(m && !m[0] ? -1 / 0 : v.s != 1 ? NaN : m ? 0 : v);
  if (t == null ? (me = !1, s = g) : s = t, d.precision = s += D, n = Ye(m), i = n.charAt(0), Math.abs(a = v.e) < 15e14) {
    for (; i < 7 && i != 1 || i == 1 && n.charAt(1) > 3; )
      v = v.times(e), n = Ye(v.d), i = n.charAt(0), p++;
    a = v.e, i > 1 ? (v = new d("0." + n), a++) : v = new d(i + "." + n.slice(1));
  } else
    return l = vt(d, s + 2, g).times(a + ""), v = yr(new d(i + "." + n.slice(1)), s - D).plus(l), d.precision = g, t == null ? ve(v, g, w, me = !0) : v;
  for (u = v, c = o = v = Te(v.minus(1), v.plus(1), s, 1), f = ve(v.times(v), s, 1), r = 3; ; ) {
    if (o = ve(o.times(f), s, 1), l = c.plus(Te(o, new d(r), s, 1)), Ye(l.d).slice(0, s) === Ye(c.d).slice(0, s))
      if (c = c.times(2), a !== 0 && (c = c.plus(vt(d, s + 2, g).times(a + ""))), c = Te(c, new d(p), s, 1), t == null)
        if (Qr(c.d, s - D, w, h))
          d.precision = s += D, l = o = v = Te(u.minus(1), u.plus(1), s, 1), f = ve(v.times(v), s, 1), r = h = 1;
        else
          return ve(c, d.precision = g, w, me = !0);
      else
        return d.precision = g, c;
    c = l, r += 2;
  }
}
function Zi(e) {
  return String(e.s * e.s / 0);
}
function Ut(e, t) {
  var n, i, r;
  for ((n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (i = t.search(/e/i)) > 0 ? (n < 0 && (n = i), n += +t.slice(i + 1), t = t.substring(0, i)) : n < 0 && (n = t.length), i = 0; t.charCodeAt(i) === 48; i++)
    ;
  for (r = t.length; t.charCodeAt(r - 1) === 48; --r)
    ;
  if (t = t.slice(i, r), t) {
    if (r -= i, e.e = n = n - i - 1, e.d = [], i = (n + 1) % pe, n < 0 && (i += pe), i < r) {
      for (i && e.d.push(+t.slice(0, i)), r -= pe; i < r; )
        e.d.push(+t.slice(i, i += pe));
      t = t.slice(i), i = pe - t.length;
    } else
      i -= r;
    for (; i--; )
      t += "0";
    e.d.push(+t), me && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
  } else
    e.e = 0, e.d = [0];
  return e;
}
function co(e, t) {
  var n, i, r, a, o, h, c, l, s;
  if (t.indexOf("_") > -1) {
    if (t = t.replace(/(\d)_(?=\d)/g, "$1"), Pi.test(t))
      return Ut(e, t);
  } else if (t === "Infinity" || t === "NaN")
    return +t || (e.s = NaN), e.e = NaN, e.d = null, e;
  if (ao.test(t))
    n = 16, t = t.toLowerCase();
  else if (io.test(t))
    n = 2;
  else if (uo.test(t))
    n = 8;
  else
    throw Error(Ar + t);
  for (a = t.search(/p/i), a > 0 ? (c = +t.slice(a + 1), t = t.substring(2, a)) : t = t.slice(2), a = t.indexOf("."), o = a >= 0, i = e.constructor, o && (t = t.replace(".", ""), h = t.length, a = h - a, r = Ui(i, new i(n), a, a * 2)), l = ut(t, n, or), s = l.length - 1, a = s; l[a] === 0; --a)
    l.pop();
  return a < 0 ? new i(e.s * 0) : (e.e = Ct(l, s), e.d = l, me = !1, o && (e = Te(e, r, h * 4)), c && (e = e.times(Math.abs(c) < 54 ? Ve(2, c) : qr.pow(2, c))), me = !0, e);
}
function lo(e, t) {
  var n, i = t.d.length;
  if (i < 3)
    return t.isZero() ? t : $r(e, 2, t, t);
  n = 1.4 * Math.sqrt(i), n = n > 16 ? 16 : n | 0, t = t.times(1 / bt(5, n)), t = $r(e, 2, t, t);
  for (var r, a = new e(5), o = new e(16), h = new e(20); n--; )
    r = t.times(t), t = t.times(a.plus(r.times(o.times(r).minus(h))));
  return t;
}
function $r(e, t, n, i, r) {
  var a, o, h, c, l = e.precision, s = Math.ceil(l / pe);
  for (me = !1, c = n.times(n), h = new e(i); ; ) {
    if (o = Te(h.times(c), new e(t++ * t++), l, 1), h = r ? i.plus(o) : i.minus(o), i = Te(o.times(c), new e(t++ * t++), l, 1), o = h.plus(i), o.d[s] !== void 0) {
      for (a = s; o.d[a] === h.d[a] && a--; )
        ;
      if (a == -1)
        break;
    }
    a = h, h = i, i = o, o = a;
  }
  return me = !0, o.d.length = s + 1, o;
}
function bt(e, t) {
  for (var n = e; --t; )
    n *= e;
  return n;
}
function Gi(e, t) {
  var n, i = t.s < 0, r = ur(e, e.precision, 1), a = r.times(0.5);
  if (t = t.abs(), t.lte(a))
    return pr = i ? 4 : 1, t;
  if (n = t.divToInt(r), n.isZero())
    pr = i ? 3 : 2;
  else {
    if (t = t.minus(n.times(r)), t.lte(a))
      return pr = vn(n) ? i ? 2 : 3 : i ? 4 : 1, t;
    pr = vn(n) ? i ? 1 : 4 : i ? 3 : 2;
  }
  return t.minus(r).abs();
}
function Xt(e, t, n, i) {
  var r, a, o, h, c, l, s, u, f, p = e.constructor, D = n !== void 0;
  if (D ? (ke(n, 1, Er), i === void 0 ? i = p.rounding : ke(i, 0, 8)) : (n = p.precision, i = p.rounding), !e.isFinite())
    s = Zi(e);
  else {
    for (s = hr(e), o = s.indexOf("."), D ? (r = 2, t == 16 ? n = n * 4 - 3 : t == 8 && (n = n * 3 - 2)) : r = t, o >= 0 && (s = s.replace(".", ""), f = new p(1), f.e = s.length - o, f.d = ut(hr(f), 10, r), f.e = f.d.length), u = ut(s, 10, r), a = c = u.length; u[--c] == 0; )
      u.pop();
    if (!u[0])
      s = D ? "0p+0" : "0";
    else {
      if (o < 0 ? a-- : (e = new p(e), e.d = u, e.e = a, e = Te(e, f, n, i, 0, r), u = e.d, a = e.e, l = Ii), o = u[n], h = r / 2, l = l || u[n + 1] !== void 0, l = i < 4 ? (o !== void 0 || l) && (i === 0 || i === (e.s < 0 ? 3 : 2)) : o > h || o === h && (i === 4 || l || i === 6 && u[n - 1] & 1 || i === (e.s < 0 ? 8 : 7)), u.length = n, l)
        for (; ++u[--n] > r - 1; )
          u[n] = 0, n || (++a, u.unshift(1));
      for (c = u.length; !u[c - 1]; --c)
        ;
      for (o = 0, s = ""; o < c; o++)
        s += $t.charAt(u[o]);
      if (D) {
        if (c > 1)
          if (t == 16 || t == 8) {
            for (o = t == 16 ? 4 : 3, --c; c % o; c++)
              s += "0";
            for (u = ut(s, r, t), c = u.length; !u[c - 1]; --c)
              ;
            for (o = 1, s = "1."; o < c; o++)
              s += $t.charAt(u[o]);
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
    s = (t == 16 ? "0x" : t == 2 ? "0b" : t == 8 ? "0o" : "") + s;
  }
  return e.s < 0 ? "-" + s : s;
}
function pn(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function ho(e) {
  return new this(e).abs();
}
function vo(e) {
  return new this(e).acos();
}
function po(e) {
  return new this(e).acosh();
}
function mo(e, t) {
  return new this(e).plus(t);
}
function go(e) {
  return new this(e).asin();
}
function Do(e) {
  return new this(e).asinh();
}
function yo(e) {
  return new this(e).atan();
}
function wo(e) {
  return new this(e).atanh();
}
function Ao(e, t) {
  e = new this(e), t = new this(t);
  var n, i = this.precision, r = this.rounding, a = i + 4;
  return !e.s || !t.s ? n = new this(NaN) : !e.d && !t.d ? (n = ur(this, a, 1).times(t.s > 0 ? 0.25 : 0.75), n.s = e.s) : !t.d || e.isZero() ? (n = t.s < 0 ? ur(this, i, r) : new this(0), n.s = e.s) : !e.d || t.isZero() ? (n = ur(this, a, 1).times(0.5), n.s = e.s) : t.s < 0 ? (this.precision = a, this.rounding = 1, n = this.atan(Te(e, t, a, 1)), t = ur(this, a, 1), this.precision = i, this.rounding = r, n = e.s < 0 ? n.minus(t) : n.plus(t)) : n = this.atan(Te(e, t, a, 1)), n;
}
function Eo(e) {
  return new this(e).cbrt();
}
function Fo(e) {
  return ve(e = new this(e), e.e + 1, 2);
}
function Co(e, t, n) {
  return new this(e).clamp(t, n);
}
function bo(e) {
  if (!e || typeof e != "object")
    throw Error(Ft + "Object expected");
  var t, n, i, r = e.defaults === !0, a = [
    "precision",
    1,
    Er,
    "rounding",
    0,
    8,
    "toExpNeg",
    -_r,
    0,
    "toExpPos",
    0,
    _r,
    "maxE",
    0,
    _r,
    "minE",
    -_r,
    0,
    "modulo",
    0,
    9
  ];
  for (t = 0; t < a.length; t += 3)
    if (n = a[t], r && (this[n] = qt[n]), (i = e[n]) !== void 0)
      if (Qe(i) === i && i >= a[t + 1] && i <= a[t + 2])
        this[n] = i;
      else
        throw Error(Ar + n + ": " + i);
  if (n = "crypto", r && (this[n] = qt[n]), (i = e[n]) !== void 0)
    if (i === !0 || i === !1 || i === 0 || i === 1)
      if (i)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[n] = !0;
        else
          throw Error($i);
      else
        this[n] = !1;
    else
      throw Error(Ar + n + ": " + i);
  return this;
}
function Mo(e) {
  return new this(e).cos();
}
function So(e) {
  return new this(e).cosh();
}
function Yi(e) {
  var t, n, i;
  function r(a) {
    var o, h, c, l = this;
    if (!(l instanceof r))
      return new r(a);
    if (l.constructor = r, dn(a)) {
      l.s = a.s, me ? !a.d || a.e > r.maxE ? (l.e = NaN, l.d = null) : a.e < r.minE ? (l.e = 0, l.d = [0]) : (l.e = a.e, l.d = a.d.slice()) : (l.e = a.e, l.d = a.d ? a.d.slice() : a.d);
      return;
    }
    if (c = typeof a, c === "number") {
      if (a === 0) {
        l.s = 1 / a < 0 ? -1 : 1, l.e = 0, l.d = [0];
        return;
      }
      if (a < 0 ? (a = -a, l.s = -1) : l.s = 1, a === ~~a && a < 1e7) {
        for (o = 0, h = a; h >= 10; h /= 10)
          o++;
        me ? o > r.maxE ? (l.e = NaN, l.d = null) : o < r.minE ? (l.e = 0, l.d = [0]) : (l.e = o, l.d = [a]) : (l.e = o, l.d = [a]);
        return;
      } else if (a * 0 !== 0) {
        a || (l.s = NaN), l.e = NaN, l.d = null;
        return;
      }
      return Ut(l, a.toString());
    } else if (c !== "string")
      throw Error(Ar + a);
    return (h = a.charCodeAt(0)) === 45 ? (a = a.slice(1), l.s = -1) : (h === 43 && (a = a.slice(1)), l.s = 1), Pi.test(a) ? Ut(l, a) : co(l, a);
  }
  if (r.prototype = W, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = bo, r.clone = Yi, r.isDecimal = dn, r.abs = ho, r.acos = vo, r.acosh = po, r.add = mo, r.asin = go, r.asinh = Do, r.atan = yo, r.atanh = wo, r.atan2 = Ao, r.cbrt = Eo, r.ceil = Fo, r.clamp = Co, r.cos = Mo, r.cosh = So, r.div = xo, r.exp = No, r.floor = Bo, r.hypot = _o, r.ln = zo, r.log = To, r.log10 = Io, r.log2 = Oo, r.max = Lo, r.min = $o, r.mod = qo, r.mul = Po, r.pow = Ro, r.random = Uo, r.round = Vo, r.sign = Zo, r.sin = Go, r.sinh = Yo, r.sqrt = Jo, r.sub = Qo, r.sum = Xo, r.tan = Ho, r.tanh = Ko, r.trunc = Wo, e === void 0 && (e = {}), e && e.defaults !== !0)
    for (i = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], t = 0; t < i.length; )
      e.hasOwnProperty(n = i[t++]) || (e[n] = this[n]);
  return r.config(e), r;
}
function xo(e, t) {
  return new this(e).div(t);
}
function No(e) {
  return new this(e).exp();
}
function Bo(e) {
  return ve(e = new this(e), e.e + 1, 3);
}
function _o() {
  var e, t, n = new this(0);
  for (me = !1, e = 0; e < arguments.length; )
    if (t = new this(arguments[e++]), t.d)
      n.d && (n = n.plus(t.times(t)));
    else {
      if (t.s)
        return me = !0, new this(1 / 0);
      n = t;
    }
  return me = !0, n.sqrt();
}
function dn(e) {
  return e instanceof qr || e && e.toStringTag === qi || !1;
}
function zo(e) {
  return new this(e).ln();
}
function To(e, t) {
  return new this(e).log(t);
}
function Oo(e) {
  return new this(e).log(2);
}
function Io(e) {
  return new this(e).log(10);
}
function Lo() {
  return Vi(this, arguments, "lt");
}
function $o() {
  return Vi(this, arguments, "gt");
}
function qo(e, t) {
  return new this(e).mod(t);
}
function Po(e, t) {
  return new this(e).mul(t);
}
function Ro(e, t) {
  return new this(e).pow(t);
}
function Uo(e) {
  var t, n, i, r, a = 0, o = new this(1), h = [];
  if (e === void 0 ? e = this.precision : ke(e, 1, Er), i = Math.ceil(e / pe), this.crypto)
    if (crypto.getRandomValues)
      for (t = crypto.getRandomValues(new Uint32Array(i)); a < i; )
        r = t[a], r >= 429e7 ? t[a] = crypto.getRandomValues(new Uint32Array(1))[0] : h[a++] = r % 1e7;
    else if (crypto.randomBytes) {
      for (t = crypto.randomBytes(i *= 4); a < i; )
        r = t[a] + (t[a + 1] << 8) + (t[a + 2] << 16) + ((t[a + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(t, a) : (h.push(r % 1e7), a += 4);
      a = i / 4;
    } else
      throw Error($i);
  else
    for (; a < i; )
      h[a++] = Math.random() * 1e7 | 0;
  for (i = h[--a], e %= pe, i && e && (r = Ve(10, pe - e), h[a] = (i / r | 0) * r); h[a] === 0; a--)
    h.pop();
  if (a < 0)
    n = 0, h = [0];
  else {
    for (n = -1; h[0] === 0; n -= pe)
      h.shift();
    for (i = 1, r = h[0]; r >= 10; r /= 10)
      i++;
    i < pe && (n -= pe - i);
  }
  return o.e = n, o.d = h, o;
}
function Vo(e) {
  return ve(e = new this(e), e.e + 1, this.rounding);
}
function Zo(e) {
  return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function Go(e) {
  return new this(e).sin();
}
function Yo(e) {
  return new this(e).sinh();
}
function Jo(e) {
  return new this(e).sqrt();
}
function Qo(e, t) {
  return new this(e).sub(t);
}
function Xo() {
  var e = 0, t = arguments, n = new this(t[e]);
  for (me = !1; n.s && ++e < t.length; )
    n = n.plus(t[e]);
  return me = !0, ve(n, this.precision, this.rounding);
}
function Ho(e) {
  return new this(e).tan();
}
function Ko(e) {
  return new this(e).tanh();
}
function Wo(e) {
  return ve(e = new this(e), e.e + 1, 1);
}
W[Symbol.for("nodejs.util.inspect.custom")] = W.toString;
W[Symbol.toStringTag] = "Decimal";
var qr = W.constructor = Yi(qt);
lt = new qr(lt);
ht = new qr(ht);
var ko = "BigNumber", jo = ["?on", "config"], es = /* @__PURE__ */ ee(ko, jo, (e) => {
  var {
    on: t,
    config: n
  } = e, i = qr.clone({
    precision: n.precision,
    modulo: qr.EUCLID
  });
  return i.prototype = Object.create(i.prototype), i.prototype.type = "BigNumber", i.prototype.isBigNumber = !0, i.prototype.toJSON = function() {
    return {
      mathjs: "BigNumber",
      value: this.toString()
    };
  }, i.fromJSON = function(r) {
    return new i(r.value);
  }, t && t("config", function(r, a) {
    r.precision !== a.precision && i.config({
      precision: r.precision
    });
  }), i;
}, {
  isClass: !0
});
function Ji(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Qi = { exports: {} };
/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(e, t) {
  (function(n) {
    var i = Math.cosh || function(u) {
      return Math.abs(u) < 1e-9 ? 1 - u : (Math.exp(u) + Math.exp(-u)) * 0.5;
    }, r = Math.sinh || function(u) {
      return Math.abs(u) < 1e-9 ? u : (Math.exp(u) - Math.exp(-u)) * 0.5;
    }, a = function(u) {
      var f = Math.PI / 4;
      if (-f > u || u > f)
        return Math.cos(u) - 1;
      var p = u * u;
      return p * (p * (p * (p * (p * (p * (p * (p / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    }, o = function(u, f) {
      var p = Math.abs(u), D = Math.abs(f);
      return p < 3e3 && D < 3e3 ? Math.sqrt(p * p + D * D) : (p < D ? (p = D, D = u / f) : D = f / u, p * Math.sqrt(1 + D * D));
    }, h = function() {
      throw SyntaxError("Invalid Param");
    };
    function c(u, f) {
      var p = Math.abs(u), D = Math.abs(f);
      return u === 0 ? Math.log(D) : f === 0 ? Math.log(p) : p < 3e3 && D < 3e3 ? Math.log(u * u + f * f) * 0.5 : (u = u / 2, f = f / 2, 0.5 * Math.log(u * u + f * f) + Math.LN2);
    }
    var l = function(u, f) {
      var p = { re: 0, im: 0 };
      if (u == null)
        p.re = p.im = 0;
      else if (f !== void 0)
        p.re = u, p.im = f;
      else
        switch (typeof u) {
          case "object":
            if ("im" in u && "re" in u)
              p.re = u.re, p.im = u.im;
            else if ("abs" in u && "arg" in u) {
              if (!Number.isFinite(u.abs) && Number.isFinite(u.arg))
                return s.INFINITY;
              p.re = u.abs * Math.cos(u.arg), p.im = u.abs * Math.sin(u.arg);
            } else if ("r" in u && "phi" in u) {
              if (!Number.isFinite(u.r) && Number.isFinite(u.phi))
                return s.INFINITY;
              p.re = u.r * Math.cos(u.phi), p.im = u.r * Math.sin(u.phi);
            } else
              u.length === 2 ? (p.re = u[0], p.im = u[1]) : h();
            break;
          case "string":
            p.im = /* void */
            p.re = 0;
            var D = u.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), v = 1, m = 0;
            D === null && h();
            for (var d = 0; d < D.length; d++) {
              var w = D[d];
              w === " " || w === "	" || w === `
` || (w === "+" ? v++ : w === "-" ? m++ : w === "i" || w === "I" ? (v + m === 0 && h(), D[d + 1] !== " " && !isNaN(D[d + 1]) ? (p.im += parseFloat((m % 2 ? "-" : "") + D[d + 1]), d++) : p.im += parseFloat((m % 2 ? "-" : "") + "1"), v = m = 0) : ((v + m === 0 || isNaN(w)) && h(), D[d + 1] === "i" || D[d + 1] === "I" ? (p.im += parseFloat((m % 2 ? "-" : "") + w), d++) : p.re += parseFloat((m % 2 ? "-" : "") + w), v = m = 0));
            }
            v + m > 0 && h();
            break;
          case "number":
            p.im = 0, p.re = u;
            break;
          default:
            h();
        }
      return isNaN(p.re) || isNaN(p.im), p;
    };
    function s(u, f) {
      if (!(this instanceof s))
        return new s(u, f);
      var p = l(u, f);
      this.re = p.re, this.im = p.im;
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
        var p = new s(u, f);
        return this.isInfinite() && p.isInfinite() ? s.NAN : this.isInfinite() || p.isInfinite() ? s.INFINITY : new s(
          this.re + p.re,
          this.im + p.im
        );
      },
      /**
       * Subtracts two complex numbers
       *
       * @returns {Complex}
       */
      sub: function(u, f) {
        var p = new s(u, f);
        return this.isInfinite() && p.isInfinite() ? s.NAN : this.isInfinite() || p.isInfinite() ? s.INFINITY : new s(
          this.re - p.re,
          this.im - p.im
        );
      },
      /**
       * Multiplies two complex numbers
       *
       * @returns {Complex}
       */
      mul: function(u, f) {
        var p = new s(u, f);
        return this.isInfinite() && p.isZero() || this.isZero() && p.isInfinite() ? s.NAN : this.isInfinite() || p.isInfinite() ? s.INFINITY : p.im === 0 && this.im === 0 ? new s(this.re * p.re, 0) : new s(
          this.re * p.re - this.im * p.im,
          this.re * p.im + this.im * p.re
        );
      },
      /**
       * Divides two complex numbers
       *
       * @returns {Complex}
       */
      div: function(u, f) {
        var p = new s(u, f);
        if (this.isZero() && p.isZero() || this.isInfinite() && p.isInfinite())
          return s.NAN;
        if (this.isInfinite() || p.isZero())
          return s.INFINITY;
        if (this.isZero() || p.isInfinite())
          return s.ZERO;
        u = this.re, f = this.im;
        var D = p.re, v = p.im, m, d;
        return v === 0 ? new s(u / D, f / D) : Math.abs(D) < Math.abs(v) ? (d = D / v, m = D * d + v, new s(
          (u * d + f) / m,
          (f * d - u) / m
        )) : (d = v / D, m = v * d + D, new s(
          (u + f * d) / m,
          (f - u * d) / m
        ));
      },
      /**
       * Calculate the power of two complex numbers
       *
       * @returns {Complex}
       */
      pow: function(u, f) {
        var p = new s(u, f);
        if (u = this.re, f = this.im, p.isZero())
          return s.ONE;
        if (p.im === 0) {
          if (f === 0 && u > 0)
            return new s(Math.pow(u, p.re), 0);
          if (u === 0)
            switch ((p.re % 4 + 4) % 4) {
              case 0:
                return new s(Math.pow(f, p.re), 0);
              case 1:
                return new s(0, Math.pow(f, p.re));
              case 2:
                return new s(-Math.pow(f, p.re), 0);
              case 3:
                return new s(0, -Math.pow(f, p.re));
            }
        }
        if (u === 0 && f === 0 && p.re > 0 && p.im >= 0)
          return s.ZERO;
        var D = Math.atan2(f, u), v = c(u, f);
        return u = Math.exp(p.re * v - p.im * D), f = p.im * v + p.re * D, new s(
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
        var u = this.re, f = this.im, p = this.abs(), D, v;
        if (u >= 0) {
          if (f === 0)
            return new s(Math.sqrt(u), 0);
          D = 0.5 * Math.sqrt(2 * (p + u));
        } else
          D = Math.abs(f) / Math.sqrt(2 * (p - u));
        return u <= 0 ? v = 0.5 * Math.sqrt(2 * (p - u)) : v = Math.abs(f) / Math.sqrt(2 * (p + u)), new s(D, f < 0 ? -v : v);
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
          Math.cos(u) * r(f)
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
          -Math.sin(u) * r(f)
        );
      },
      /**
       * Calculate the tangent
       *
       * @returns {Complex}
       */
      tan: function() {
        var u = 2 * this.re, f = 2 * this.im, p = Math.cos(u) + i(f);
        return new s(
          Math.sin(u) / p,
          r(f) / p
        );
      },
      /**
       * Calculate the cotangent
       *
       * @returns {Complex}
       */
      cot: function() {
        var u = 2 * this.re, f = 2 * this.im, p = Math.cos(u) - i(f);
        return new s(
          -Math.sin(u) / p,
          r(f) / p
        );
      },
      /**
       * Calculate the secant
       *
       * @returns {Complex}
       */
      sec: function() {
        var u = this.re, f = this.im, p = 0.5 * i(2 * f) + 0.5 * Math.cos(2 * u);
        return new s(
          Math.cos(u) * i(f) / p,
          Math.sin(u) * r(f) / p
        );
      },
      /**
       * Calculate the cosecans
       *
       * @returns {Complex}
       */
      csc: function() {
        var u = this.re, f = this.im, p = 0.5 * i(2 * f) - 0.5 * Math.cos(2 * u);
        return new s(
          Math.sin(u) * i(f) / p,
          -Math.cos(u) * r(f) / p
        );
      },
      /**
       * Calculate the complex arcus sinus
       *
       * @returns {Complex}
       */
      asin: function() {
        var u = this.re, f = this.im, p = new s(
          f * f - u * u + 1,
          -2 * u * f
        ).sqrt(), D = new s(
          p.re - f,
          p.im + u
        ).log();
        return new s(D.im, -D.re);
      },
      /**
       * Calculate the complex arcus cosinus
       *
       * @returns {Complex}
       */
      acos: function() {
        var u = this.re, f = this.im, p = new s(
          f * f - u * u + 1,
          -2 * u * f
        ).sqrt(), D = new s(
          p.re - f,
          p.im + u
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
        var p = u * u + (1 - f) * (1 - f), D = new s(
          (1 - f * f - u * u) / p,
          -2 * u / p
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
        var p = u * u + f * f;
        return p !== 0 ? new s(
          u / p,
          -f / p
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
        var p = u * u + f * f;
        return p !== 0 ? new s(
          u / p,
          -f / p
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
        var p = u * u + f * f;
        return p !== 0 ? new s(
          u / p,
          -f / p
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
          r(u) * Math.cos(f),
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
          r(u) * Math.sin(f)
        );
      },
      /**
       * Calculate the complex tanh
       *
       * @returns {Complex}
       */
      tanh: function() {
        var u = 2 * this.re, f = 2 * this.im, p = i(u) + Math.cos(f);
        return new s(
          r(u) / p,
          Math.sin(f) / p
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      coth: function() {
        var u = 2 * this.re, f = 2 * this.im, p = i(u) - Math.cos(f);
        return new s(
          r(u) / p,
          -Math.sin(f) / p
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      csch: function() {
        var u = this.re, f = this.im, p = Math.cos(2 * f) - i(2 * u);
        return new s(
          -2 * r(u) * Math.cos(f) / p,
          2 * i(u) * Math.sin(f) / p
        );
      },
      /**
       * Calculate the complex sech
       *
       * @returns {Complex}
       */
      sech: function() {
        var u = this.re, f = this.im, p = Math.cos(2 * f) + i(2 * u);
        return new s(
          2 * i(u) * Math.cos(f) / p,
          -2 * r(u) * Math.sin(f) / p
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
        var u = this.re, f = this.im, p = u > 1 && f === 0, D = 1 - u, v = 1 + u, m = D * D + f * f, d = m !== 0 ? new s(
          (v * D - f * f) / m,
          (f * D + v * f) / m
        ) : new s(
          u !== -1 ? u / 0 : 0,
          f !== 0 ? f / 0 : 0
        ), w = d.re;
        return d.re = c(d.re, d.im) / 2, d.im = Math.atan2(d.im, w) / 2, p && (d.im = -d.im), d;
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
        var p = u * u + f * f;
        return p !== 0 ? new s(
          u / p,
          -f / p
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
        var p = u * u + f * f;
        return p !== 0 ? new s(
          u / p,
          -f / p
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
        var p = u * u + f * f;
        return p !== 0 ? new s(
          u / p,
          -f / p
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
        var u = this.re, f = this.im, p = u * u + f * f;
        return new s(u / p, -f / p);
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
        var p = new s(u, f);
        return Math.abs(p.re - this.re) <= s.EPSILON && Math.abs(p.im - this.im) <= s.EPSILON;
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
        var u = this.re, f = this.im, p = "";
        return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(u) < s.EPSILON && (u = 0), Math.abs(f) < s.EPSILON && (f = 0), f === 0 ? p + u : (u !== 0 ? (p += u, p += " ", f < 0 ? (f = -f, p += "-") : p += "+", p += " ") : f < 0 && (f = -f, p += "-"), f !== 1 && (p += f), p + "i"));
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
    }, s.ZERO = new s(0, 0), s.ONE = new s(1, 0), s.I = new s(0, 1), s.PI = new s(Math.PI, 0), s.E = new s(Math.E, 0), s.INFINITY = new s(1 / 0, 1 / 0), s.NAN = new s(NaN, NaN), s.EPSILON = 1e-15, Object.defineProperty(s, "__esModule", { value: !0 }), s.default = s, s.Complex = s, e.exports = s;
  })();
})(Qi);
var rs = Qi.exports;
const Ge = /* @__PURE__ */ Ji(rs);
var ts = "Complex", ns = [], is = /* @__PURE__ */ ee(ts, ns, () => (Object.defineProperty(Ge, "name", {
  value: "Complex"
}), Ge.prototype.constructor = Ge, Ge.prototype.type = "Complex", Ge.prototype.isComplex = !0, Ge.prototype.toJSON = function() {
  return {
    mathjs: "Complex",
    re: this.re,
    im: this.im
  };
}, Ge.prototype.toPolar = function() {
  return {
    r: this.abs(),
    phi: this.arg()
  };
}, Ge.prototype.format = function(e) {
  var t = "", n = this.im, i = this.re, r = Ot(this.re, e), a = Ot(this.im, e), o = Le(e) ? e : e ? e.precision : null;
  if (o !== null) {
    var h = Math.pow(10, -o);
    Math.abs(i / n) < h && (i = 0), Math.abs(n / i) < h && (n = 0);
  }
  return n === 0 ? t = r : i === 0 ? n === 1 ? t = "i" : n === -1 ? t = "-i" : t = a + "i" : n < 0 ? n === -1 ? t = r + " - i" : t = r + " - " + a.substring(1) + "i" : n === 1 ? t = r + " + i" : t = r + " + " + a + "i", t;
}, Ge.fromPolar = function(e) {
  switch (arguments.length) {
    case 1: {
      var t = arguments[0];
      if (typeof t == "object")
        return Ge(t);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var n = arguments[0], i = arguments[1];
      if (Le(n)) {
        if (di(i) && i.hasBase("ANGLE") && (i = i.toNumber("rad")), Le(i))
          return new Ge({
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
}, Ge.prototype.valueOf = Ge.prototype.toString, Ge.fromJSON = function(e) {
  return new Ge(e);
}, Ge.compare = function(e, t) {
  return e.re > t.re ? 1 : e.re < t.re ? -1 : e.im > t.im ? 1 : e.im < t.im ? -1 : 0;
}, Ge), {
  isClass: !0
}), Xi = { exports: {} };
/**
 * @license Fraction.js v4.3.0 20/08/2023
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2023, Robert Eisele (robert@raw.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(e, t) {
  (function(n) {
    var i = 2e3, r = {
      s: 1,
      n: 0,
      d: 1
    };
    function a(d, w) {
      if (isNaN(d = parseInt(d, 10)))
        throw v();
      return d * w;
    }
    function o(d, w) {
      if (w === 0)
        throw D();
      var g = Object.create(p.prototype);
      g.s = d < 0 ? -1 : 1, d = d < 0 ? -d : d;
      var A = f(d, w);
      return g.n = d / A, g.d = w / A, g;
    }
    function h(d) {
      for (var w = {}, g = d, A = 2, F = 4; F <= g; ) {
        for (; g % A === 0; )
          g /= A, w[A] = (w[A] || 0) + 1;
        F += 1 + 2 * A++;
      }
      return g !== d ? g > 1 && (w[g] = (w[g] || 0) + 1) : w[d] = (w[d] || 0) + 1, w;
    }
    var c = function(d, w) {
      var g = 0, A = 1, F = 1, y = 0, C = 0, b = 0, E = 1, S = 1, M = 0, x = 1, O = 1, T = 1, I = 1e7, B;
      if (d != null)
        if (w !== void 0) {
          if (g = d, A = w, F = g * A, g % 1 !== 0 || A % 1 !== 0)
            throw m();
        } else
          switch (typeof d) {
            case "object": {
              if ("d" in d && "n" in d)
                g = d.n, A = d.d, "s" in d && (g *= d.s);
              else if (0 in d)
                g = d[0], 1 in d && (A = d[1]);
              else
                throw v();
              F = g * A;
              break;
            }
            case "number": {
              if (d < 0 && (F = d, d = -d), d % 1 === 0)
                g = d;
              else if (d > 0) {
                for (d >= 1 && (S = Math.pow(10, Math.floor(1 + Math.log(d) / Math.LN10)), d /= S); x <= I && T <= I; )
                  if (B = (M + O) / (x + T), d === B) {
                    x + T <= I ? (g = M + O, A = x + T) : T > x ? (g = O, A = T) : (g = M, A = x);
                    break;
                  } else
                    d > B ? (M += O, x += T) : (O += M, T += x), x > I ? (g = O, A = T) : (g = M, A = x);
                g *= S;
              } else
                (isNaN(d) || isNaN(w)) && (A = g = NaN);
              break;
            }
            case "string": {
              if (x = d.match(/\d+|./g), x === null)
                throw v();
              if (x[M] === "-" ? (F = -1, M++) : x[M] === "+" && M++, x.length === M + 1 ? C = a(x[M++], F) : x[M + 1] === "." || x[M] === "." ? (x[M] !== "." && (y = a(x[M++], F)), M++, (M + 1 === x.length || x[M + 1] === "(" && x[M + 3] === ")" || x[M + 1] === "'" && x[M + 3] === "'") && (C = a(x[M], F), E = Math.pow(10, x[M].length), M++), (x[M] === "(" && x[M + 2] === ")" || x[M] === "'" && x[M + 2] === "'") && (b = a(x[M + 1], F), S = Math.pow(10, x[M + 1].length) - 1, M += 3)) : x[M + 1] === "/" || x[M + 1] === ":" ? (C = a(x[M], F), E = a(x[M + 2], 1), M += 3) : x[M + 3] === "/" && x[M + 1] === " " && (y = a(x[M], F), C = a(x[M + 2], F), E = a(x[M + 4], 1), M += 5), x.length <= M) {
                A = E * S, F = /* void */
                g = b + A * y + S * C;
                break;
              }
            }
            default:
              throw v();
          }
      if (A === 0)
        throw D();
      r.s = F < 0 ? -1 : 1, r.n = Math.abs(g), r.d = Math.abs(A);
    };
    function l(d, w, g) {
      for (var A = 1; w > 0; d = d * d % g, w >>= 1)
        w & 1 && (A = A * d % g);
      return A;
    }
    function s(d, w) {
      for (; w % 2 === 0; w /= 2)
        ;
      for (; w % 5 === 0; w /= 5)
        ;
      if (w === 1)
        return 0;
      for (var g = 10 % w, A = 1; g !== 1; A++)
        if (g = g * 10 % w, A > i)
          return 0;
      return A;
    }
    function u(d, w, g) {
      for (var A = 1, F = l(10, g, w), y = 0; y < 300; y++) {
        if (A === F)
          return y;
        A = A * 10 % w, F = F * 10 % w;
      }
      return 0;
    }
    function f(d, w) {
      if (!d)
        return w;
      if (!w)
        return d;
      for (; ; ) {
        if (d %= w, !d)
          return w;
        if (w %= d, !w)
          return d;
      }
    }
    function p(d, w) {
      if (c(d, w), this instanceof p)
        d = f(r.d, r.n), this.s = r.s, this.n = r.n / d, this.d = r.d / d;
      else
        return o(r.s * r.n, r.d);
    }
    var D = function() {
      return new Error("Division by Zero");
    }, v = function() {
      return new Error("Invalid argument");
    }, m = function() {
      return new Error("Parameters must be integer");
    };
    p.prototype = {
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
      add: function(d, w) {
        return c(d, w), o(
          this.s * this.n * r.d + r.s * this.d * r.n,
          this.d * r.d
        );
      },
      /**
       * Subtracts two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
       **/
      sub: function(d, w) {
        return c(d, w), o(
          this.s * this.n * r.d - r.s * this.d * r.n,
          this.d * r.d
        );
      },
      /**
       * Multiplies two rational numbers
       *
       * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
       **/
      mul: function(d, w) {
        return c(d, w), o(
          this.s * r.s * this.n * r.n,
          this.d * r.d
        );
      },
      /**
       * Divides two rational numbers
       *
       * Ex: new Fraction("-17.(345)").inverse().div(3)
       **/
      div: function(d, w) {
        return c(d, w), o(
          this.s * r.s * this.n * r.d,
          this.d * r.n
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
      mod: function(d, w) {
        if (isNaN(this.n) || isNaN(this.d))
          return new p(NaN);
        if (d === void 0)
          return o(this.s * this.n % this.d, 1);
        if (c(d, w), r.n === 0 && this.d === 0)
          throw D();
        return o(
          this.s * (r.d * this.n) % (r.n * this.d),
          r.d * this.d
        );
      },
      /**
       * Calculates the fractional gcd of two rational numbers
       *
       * Ex: new Fraction(5,8).gcd(3,7) => 1/56
       */
      gcd: function(d, w) {
        return c(d, w), o(f(r.n, this.n) * f(r.d, this.d), r.d * this.d);
      },
      /**
       * Calculates the fractional lcm of two rational numbers
       *
       * Ex: new Fraction(5,8).lcm(3,7) => 15
       */
      lcm: function(d, w) {
        return c(d, w), r.n === 0 && this.n === 0 ? o(0, 1) : o(r.n * this.n, f(r.n, this.n) * f(r.d, this.d));
      },
      /**
       * Calculates the ceil of a rational number
       *
       * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
       **/
      ceil: function(d) {
        return d = Math.pow(10, d || 0), isNaN(this.n) || isNaN(this.d) ? new p(NaN) : o(Math.ceil(d * this.s * this.n / this.d), d);
      },
      /**
       * Calculates the floor of a rational number
       *
       * Ex: new Fraction('4.(3)').floor() => (4 / 1)
       **/
      floor: function(d) {
        return d = Math.pow(10, d || 0), isNaN(this.n) || isNaN(this.d) ? new p(NaN) : o(Math.floor(d * this.s * this.n / this.d), d);
      },
      /**
       * Rounds a rational numbers
       *
       * Ex: new Fraction('4.(3)').round() => (4 / 1)
       **/
      round: function(d) {
        return d = Math.pow(10, d || 0), isNaN(this.n) || isNaN(this.d) ? new p(NaN) : o(Math.round(d * this.s * this.n / this.d), d);
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
      pow: function(d, w) {
        if (c(d, w), r.d === 1)
          return r.s < 0 ? o(Math.pow(this.s * this.d, r.n), Math.pow(this.n, r.n)) : o(Math.pow(this.s * this.n, r.n), Math.pow(this.d, r.n));
        if (this.s < 0)
          return null;
        var g = h(this.n), A = h(this.d), F = 1, y = 1;
        for (var C in g)
          if (C !== "1") {
            if (C === "0") {
              F = 0;
              break;
            }
            if (g[C] *= r.n, g[C] % r.d === 0)
              g[C] /= r.d;
            else
              return null;
            F *= Math.pow(C, g[C]);
          }
        for (var C in A)
          if (C !== "1") {
            if (A[C] *= r.n, A[C] % r.d === 0)
              A[C] /= r.d;
            else
              return null;
            y *= Math.pow(C, A[C]);
          }
        return r.s < 0 ? o(y, F) : o(F, y);
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      equals: function(d, w) {
        return c(d, w), this.s * this.n * r.d === r.s * r.n * this.d;
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      compare: function(d, w) {
        c(d, w);
        var g = this.s * this.n * r.d - r.s * r.n * this.d;
        return (0 < g) - (g < 0);
      },
      simplify: function(d) {
        if (isNaN(this.n) || isNaN(this.d))
          return this;
        d = d || 1e-3;
        for (var w = this.abs(), g = w.toContinued(), A = 1; A < g.length; A++) {
          for (var F = o(g[A - 1], 1), y = A - 2; y >= 0; y--)
            F = F.inverse().add(g[y]);
          if (Math.abs(F.sub(w).valueOf()) < d)
            return F.mul(this.s);
        }
        return this;
      },
      /**
       * Check if two rational numbers are divisible
       *
       * Ex: new Fraction(19.6).divisible(1.5);
       */
      divisible: function(d, w) {
        return c(d, w), !(!(r.n * this.d) || this.n * r.d % (r.n * this.d));
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
      toFraction: function(d) {
        var w, g = "", A = this.n, F = this.d;
        return this.s < 0 && (g += "-"), F === 1 ? g += A : (d && (w = Math.floor(A / F)) > 0 && (g += w, g += " ", A %= F), g += A, g += "/", g += F), g;
      },
      /**
       * Returns a latex representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
       **/
      toLatex: function(d) {
        var w, g = "", A = this.n, F = this.d;
        return this.s < 0 && (g += "-"), F === 1 ? g += A : (d && (w = Math.floor(A / F)) > 0 && (g += w, A %= F), g += "\\frac{", g += A, g += "}{", g += F, g += "}"), g;
      },
      /**
       * Returns an array of continued fraction elements
       *
       * Ex: new Fraction("7/8").toContinued() => [0,1,7]
       */
      toContinued: function() {
        var d, w = this.n, g = this.d, A = [];
        if (isNaN(w) || isNaN(g))
          return A;
        do
          A.push(Math.floor(w / g)), d = w % g, w = g, g = d;
        while (w !== 1);
        return A;
      },
      /**
       * Creates a string representation of a fraction with all digits
       *
       * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
       **/
      toString: function(d) {
        var w = this.n, g = this.d;
        if (isNaN(w) || isNaN(g))
          return "NaN";
        d = d || 15;
        var A = s(w, g), F = u(w, g, A), y = this.s < 0 ? "-" : "";
        if (y += w / g | 0, w %= g, w *= 10, w && (y += "."), A) {
          for (var C = F; C--; )
            y += w / g | 0, w %= g, w *= 10;
          y += "(";
          for (var C = A; C--; )
            y += w / g | 0, w %= g, w *= 10;
          y += ")";
        } else
          for (var C = d; w && C--; )
            y += w / g | 0, w %= g, w *= 10;
        return y;
      }
    }, Object.defineProperty(p, "__esModule", { value: !0 }), p.default = p, p.Fraction = p, e.exports = p;
  })();
})(Xi);
var as = Xi.exports;
const vr = /* @__PURE__ */ Ji(as);
var us = "Fraction", os = [], ss = /* @__PURE__ */ ee(us, os, () => (Object.defineProperty(vr, "name", {
  value: "Fraction"
}), vr.prototype.constructor = vr, vr.prototype.type = "Fraction", vr.prototype.isFraction = !0, vr.prototype.toJSON = function() {
  return {
    mathjs: "Fraction",
    n: this.s * this.n,
    d: this.d
  };
}, vr.fromJSON = function(e) {
  return new vr(e);
}, vr), {
  isClass: !0
}), fs = "Matrix", cs = [], ls = /* @__PURE__ */ ee(fs, cs, () => {
  function e() {
    if (!(this instanceof e))
      throw new SyntaxError("Constructor must be called with the new operator");
  }
  return e.prototype.type = "Matrix", e.prototype.isMatrix = !0, e.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  }, e.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  }, e.prototype.create = function(t, n) {
    throw new Error("Cannot invoke create on a Matrix interface");
  }, e.prototype.subset = function(t, n, i) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  }, e.prototype.get = function(t) {
    throw new Error("Cannot invoke get on a Matrix interface");
  }, e.prototype.set = function(t, n, i) {
    throw new Error("Cannot invoke set on a Matrix interface");
  }, e.prototype.resize = function(t, n) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  }, e.prototype.reshape = function(t, n) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  }, e.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  }, e.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  }, e.prototype.map = function(t, n) {
    throw new Error("Cannot invoke map on a Matrix interface");
  }, e.prototype.forEach = function(t) {
    throw new Error("Cannot invoke forEach on a Matrix interface");
  }, e.prototype[Symbol.iterator] = function() {
    throw new Error("Cannot iterate a Matrix interface");
  }, e.prototype.toArray = function() {
    throw new Error("Cannot invoke toArray on a Matrix interface");
  }, e.prototype.valueOf = function() {
    throw new Error("Cannot invoke valueOf on a Matrix interface");
  }, e.prototype.format = function(t) {
    throw new Error("Cannot invoke format on a Matrix interface");
  }, e.prototype.toString = function() {
    throw new Error("Cannot invoke toString on a Matrix interface");
  }, e;
}, {
  isClass: !0
});
function Hi(e) {
  return Object.keys(e.signatures || {}).reduce(function(t, n) {
    var i = (n.match(/,/g) || []).length + 1;
    return Math.max(t, i);
  }, -1);
}
var hs = "DenseMatrix", vs = ["Matrix"], ps = /* @__PURE__ */ ee(hs, vs, (e) => {
  var {
    Matrix: t
  } = e;
  function n(s, u) {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (u && !tr(u))
      throw new Error("Invalid datatype: " + u);
    if (_e(s))
      s.type === "DenseMatrix" ? (this._data = Ce(s._data), this._size = Ce(s._size), this._datatype = u || s._datatype) : (this._data = s.toArray(), this._size = s.size(), this._datatype = u || s._datatype);
    else if (s && Me(s.data) && Me(s.size))
      this._data = s.data, this._size = s.size, cn(this._data, this._size), this._datatype = u || s.datatype;
    else if (Me(s))
      this._data = l(s), this._size = $e(this._data), cn(this._data, this._size), this._datatype = u;
    else {
      if (s)
        throw new TypeError("Unsupported type of data (" + lr(s) + ")");
      this._data = [], this._size = [0], this._datatype = u;
    }
  }
  n.prototype = new t(), n.prototype.createDenseMatrix = function(s, u) {
    return new n(s, u);
  }, Object.defineProperty(n, "name", {
    value: "DenseMatrix"
  }), n.prototype.constructor = n, n.prototype.type = "DenseMatrix", n.prototype.isDenseMatrix = !0, n.prototype.getDataType = function() {
    return Jr(this._data, lr);
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
    if (!Me(s))
      throw new TypeError("Array expected");
    if (s.length !== this._size.length)
      throw new Fe(s.length, this._size.length);
    for (var u = 0; u < s.length; u++)
      Be(s[u], this._size[u]);
    for (var f = this._data, p = 0, D = s.length; p < D; p++) {
      var v = s[p];
      Be(v, f.length), f = f[v];
    }
    return f;
  }, n.prototype.set = function(s, u, f) {
    if (!Me(s))
      throw new TypeError("Array expected");
    if (s.length < this._size.length)
      throw new Fe(s.length, this._size.length, "<");
    var p, D, v, m = s.map(function(w) {
      return w + 1;
    });
    c(this, m, f);
    var d = this._data;
    for (p = 0, D = s.length - 1; p < D; p++)
      v = s[p], Be(v, d.length), d = d[v];
    return v = s[s.length - 1], Be(v, d.length), d[v] = u, this;
  };
  function i(s, u) {
    if (!wt(u))
      throw new TypeError("Invalid index");
    var f = u.isScalar();
    if (f)
      return s.get(u.min());
    var p = u.size();
    if (p.length !== s._size.length)
      throw new Fe(p.length, s._size.length);
    for (var D = u.min(), v = u.max(), m = 0, d = s._size.length; m < d; m++)
      Be(D[m], s._size[m]), Be(v[m], s._size[m]);
    return new n(r(s._data, u, p.length, 0), s._datatype);
  }
  function r(s, u, f, p) {
    var D = p === f - 1, v = u.dimension(p);
    return D ? v.map(function(m) {
      return Be(m, s.length), s[m];
    }).valueOf() : v.map(function(m) {
      Be(m, s.length);
      var d = s[m];
      return r(d, u, f, p + 1);
    }).valueOf();
  }
  function a(s, u, f, p) {
    if (!u || u.isIndex !== !0)
      throw new TypeError("Invalid index");
    var D = u.size(), v = u.isScalar(), m;
    if (_e(f) ? (m = f.size(), f = f.valueOf()) : m = $e(f), v) {
      if (m.length !== 0)
        throw new TypeError("Scalar expected");
      s.set(u.min(), f, p);
    } else {
      if (!Ir(m, D))
        try {
          m.length === 0 ? f = hn([f], D) : f = hn(f, D), m = $e(f);
        } catch {
        }
      if (D.length < s._size.length)
        throw new Fe(D.length, s._size.length, "<");
      if (m.length < D.length) {
        for (var d = 0, w = 0; D[d] === 1 && m[d] === 1; )
          d++;
        for (; D[d] === 1; )
          w++, d++;
        f = Mi(f, D.length, w, m);
      }
      if (!Ir(D, m))
        throw new Fe(D, m, ">");
      var g = u.max().map(function(y) {
        return y + 1;
      });
      c(s, g, p);
      var A = D.length, F = 0;
      o(s._data, u, f, A, F);
    }
    return s;
  }
  function o(s, u, f, p, D) {
    var v = D === p - 1, m = u.dimension(D);
    v ? m.forEach(function(d, w) {
      Be(d), s[d] = f[w[0]];
    }) : m.forEach(function(d, w) {
      Be(d), o(s[d], u, f[w[0]], p, D + 1);
    });
  }
  n.prototype.resize = function(s, u, f) {
    if (!ot(s))
      throw new TypeError("Array or Matrix expected");
    var p = s.valueOf().map((v) => Array.isArray(v) && v.length === 1 ? v[0] : v), D = f ? this.clone() : this;
    return h(D, p, u);
  };
  function h(s, u, f) {
    if (u.length === 0) {
      for (var p = s._data; Me(p); )
        p = p[0];
      return p;
    }
    return s._size = u.slice(0), s._data = ft(s._data, s._size, f), s;
  }
  n.prototype.reshape = function(s, u) {
    var f = u ? this.clone() : this;
    f._data = Jt(f._data, s);
    var p = f._size.reduce((D, v) => D * v);
    return f._size = Qt(s, p), f;
  };
  function c(s, u, f) {
    for (var p = s._size.slice(0), D = !1; p.length < u.length; )
      p.push(0), D = !0;
    for (var v = 0, m = u.length; v < m; v++)
      u[v] > p[v] && (p[v] = u[v], D = !0);
    D && h(s, p, f);
  }
  n.prototype.clone = function() {
    var s = new n({
      data: Ce(this._data),
      size: Ce(this._size),
      datatype: this._datatype
    });
    return s;
  }, n.prototype.size = function() {
    return this._size.slice(0);
  }, n.prototype.map = function(s) {
    var u = this, f = Hi(s), p = function m(d, w) {
      return Me(d) ? d.map(function(g, A) {
        return m(g, w.concat(A));
      }) : f === 1 ? s(d) : f === 2 ? s(d, w) : s(d, w, u);
    }, D = p(this._data, []), v = this._datatype !== void 0 ? Jr(D, lr) : void 0;
    return new n(D, v);
  }, n.prototype.forEach = function(s) {
    var u = this, f = function p(D, v) {
      Me(D) ? D.forEach(function(m, d) {
        p(m, v.concat(d));
      }) : s(D, v, u);
    };
    f(this._data, []);
  }, n.prototype[Symbol.iterator] = function* () {
    var s = function* u(f, p) {
      if (Me(f))
        for (var D = 0; D < f.length; D++)
          yield* u(f[D], p.concat(D));
      else
        yield {
          value: f,
          index: p
        };
    };
    yield* s(this._data, []);
  }, n.prototype.rows = function() {
    var s = [], u = this.size();
    if (u.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    var f = this._data;
    for (var p of f)
      s.push(new n([p], this._datatype));
    return s;
  }, n.prototype.columns = function() {
    var s = this, u = [], f = this.size();
    if (f.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var p = this._data, D = function(d) {
      var w = p.map((g) => [g[d]]);
      u.push(new n(w, s._datatype));
    }, v = 0; v < f[1]; v++)
      D(v);
    return u;
  }, n.prototype.toArray = function() {
    return Ce(this._data);
  }, n.prototype.valueOf = function() {
    return this._data;
  }, n.prototype.format = function(s) {
    return Ie(this._data, s);
  }, n.prototype.toString = function() {
    return Ie(this._data);
  }, n.prototype.toJSON = function() {
    return {
      mathjs: "DenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, n.prototype.diagonal = function(s) {
    if (s) {
      if (Pe(s) && (s = s.toNumber()), !Le(s) || !ze(s))
        throw new TypeError("The parameter k must be an integer number");
    } else
      s = 0;
    for (var u = s > 0 ? s : 0, f = s < 0 ? -s : 0, p = this._size[0], D = this._size[1], v = Math.min(p - f, D - u), m = [], d = 0; d < v; d++)
      m[d] = this._data[d + f][d + u];
    return new n({
      data: m,
      size: [v],
      datatype: this._datatype
    });
  }, n.diagonal = function(s, u, f, p) {
    if (!Me(s))
      throw new TypeError("Array expected, size parameter");
    if (s.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (s = s.map(function(C) {
      if (Pe(C) && (C = C.toNumber()), !Le(C) || !ze(C) || C < 1)
        throw new Error("Size values must be positive integers");
      return C;
    }), f) {
      if (Pe(f) && (f = f.toNumber()), !Le(f) || !ze(f))
        throw new TypeError("The parameter k must be an integer number");
    } else
      f = 0;
    var D = f > 0 ? f : 0, v = f < 0 ? -f : 0, m = s[0], d = s[1], w = Math.min(m - v, d - D), g;
    if (Me(u)) {
      if (u.length !== w)
        throw new Error("Invalid value array length");
      g = function(b) {
        return u[b];
      };
    } else if (_e(u)) {
      var A = u.size();
      if (A.length !== 1 || A[0] !== w)
        throw new Error("Invalid matrix length");
      g = function(b) {
        return u.get([b]);
      };
    } else
      g = function() {
        return u;
      };
    p || (p = Pe(g(0)) ? g(0).mul(0) : 0);
    var F = [];
    if (s.length > 0) {
      F = ft(F, s, p);
      for (var y = 0; y < w; y++)
        F[y + v][y + D] = g(y);
    }
    return new n({
      data: F,
      size: [m, d]
    });
  }, n.fromJSON = function(s) {
    return new n(s);
  }, n.prototype.swapRows = function(s, u) {
    if (!Le(s) || !ze(s) || !Le(u) || !ze(u))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Be(s, this._size[0]), Be(u, this._size[0]), n._swapRows(s, u, this._data), this;
  }, n._swapRows = function(s, u, f) {
    var p = f[s];
    f[s] = f[u], f[u] = p;
  };
  function l(s) {
    return _e(s) ? l(s.valueOf()) : Me(s) ? s.map(l) : s;
  }
  return n;
}, {
  isClass: !0
});
function er(e, t, n) {
  return e && typeof e.map == "function" ? e.map(function(i) {
    return er(i, t);
  }) : t(e);
}
var mn = "isInteger", ds = ["typed"], ms = /* @__PURE__ */ ee(mn, ds, (e) => {
  var {
    typed: t
  } = e;
  return t(mn, {
    number: ze,
    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
    BigNumber: function(i) {
      return i.isInt();
    },
    Fraction: function(i) {
      return i.d === 1 && isFinite(i.n);
    },
    "Array | Matrix": t.referToSelf((n) => (i) => er(i, n))
  });
}), Ht = "number", Mt = "number, number";
function Ki(e) {
  return Math.abs(e);
}
Ki.signature = Ht;
function Wi(e, t) {
  return e + t;
}
Wi.signature = Mt;
function ki(e, t) {
  return e - t;
}
ki.signature = Mt;
function ji(e, t) {
  return e * t;
}
ji.signature = Mt;
function ea(e) {
  return -e;
}
ea.signature = Ht;
function Vt(e) {
  return _u(e);
}
Vt.signature = Ht;
function ra(e, t) {
  return e * e < 1 && t === 1 / 0 || e * e > 1 && t === -1 / 0 ? 0 : Math.pow(e, t);
}
ra.signature = Mt;
var ta = "number";
function na(e) {
  return e > 0;
}
na.signature = ta;
function ia(e) {
  return e === 0;
}
ia.signature = ta;
var gn = "isPositive", gs = ["typed"], Ds = /* @__PURE__ */ ee(gn, gs, (e) => {
  var {
    typed: t
  } = e;
  return t(gn, {
    number: na,
    BigNumber: function(i) {
      return !i.isNeg() && !i.isZero() && !i.isNaN();
    },
    Fraction: function(i) {
      return i.s > 0 && i.n > 0;
    },
    Unit: t.referToSelf((n) => (i) => t.find(n, i.valueType())(i.value)),
    "Array | Matrix": t.referToSelf((n) => (i) => er(i, n))
  });
}), Dn = "isZero", ys = ["typed"], ws = /* @__PURE__ */ ee(Dn, ys, (e) => {
  var {
    typed: t
  } = e;
  return t(Dn, {
    number: ia,
    BigNumber: function(i) {
      return i.isZero();
    },
    Complex: function(i) {
      return i.re === 0 && i.im === 0;
    },
    Fraction: function(i) {
      return i.d === 1 && i.n === 0;
    },
    Unit: t.referToSelf((n) => (i) => t.find(n, i.valueType())(i.value)),
    "Array | Matrix": t.referToSelf((n) => (i) => er(i, n))
  });
}), yn = "typeOf", As = ["typed"], Es = /* @__PURE__ */ ee(yn, As, (e) => {
  var {
    typed: t
  } = e;
  return t(yn, {
    any: lr
  });
});
function Xr(e, t, n) {
  if (n == null)
    return e.eq(t);
  if (e.eq(t))
    return !0;
  if (e.isNaN() || t.isNaN())
    return !1;
  if (e.isFinite() && t.isFinite()) {
    var i = e.minus(t).abs();
    if (i.isZero())
      return !0;
    var r = e.constructor.max(e.abs(), t.abs());
    return i.lte(r.times(n));
  }
  return !1;
}
function Fs(e, t, n) {
  return wr(e.re, t.re, n) && wr(e.im, t.im, n);
}
var Hr = /* @__PURE__ */ ee("compareUnits", ["typed"], (e) => {
  var {
    typed: t
  } = e;
  return {
    "Unit, Unit": t.referToSelf((n) => (i, r) => {
      if (!i.equalBase(r))
        throw new Error("Cannot compare units with different base");
      return t.find(n, [i.valueType(), r.valueType()])(i.value, r.value);
    })
  };
}), pt = "equalScalar", Cs = ["typed", "config"], bs = /* @__PURE__ */ ee(pt, Cs, (e) => {
  var {
    typed: t,
    config: n
  } = e, i = Hr({
    typed: t
  });
  return t(pt, {
    "boolean, boolean": function(a, o) {
      return a === o;
    },
    "number, number": function(a, o) {
      return wr(a, o, n.epsilon);
    },
    "BigNumber, BigNumber": function(a, o) {
      return a.eq(o) || Xr(a, o, n.epsilon);
    },
    "Fraction, Fraction": function(a, o) {
      return a.equals(o);
    },
    "Complex, Complex": function(a, o) {
      return Fs(a, o, n.epsilon);
    }
  }, i);
});
ee(pt, ["typed", "config"], (e) => {
  var {
    typed: t,
    config: n
  } = e;
  return t(pt, {
    "number, number": function(r, a) {
      return wr(r, a, n.epsilon);
    }
  });
});
var Ms = "SparseMatrix", Ss = ["typed", "equalScalar", "Matrix"], xs = /* @__PURE__ */ ee(Ms, Ss, (e) => {
  var {
    typed: t,
    equalScalar: n,
    Matrix: i
  } = e;
  function r(v, m) {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (m && !tr(m))
      throw new Error("Invalid datatype: " + m);
    if (_e(v))
      a(this, v, m);
    else if (v && Me(v.index) && Me(v.ptr) && Me(v.size))
      this._values = v.values, this._index = v.index, this._ptr = v.ptr, this._size = v.size, this._datatype = m || v.datatype;
    else if (Me(v))
      o(this, v, m);
    else {
      if (v)
        throw new TypeError("Unsupported type of data (" + lr(v) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = m;
    }
  }
  function a(v, m, d) {
    m.type === "SparseMatrix" ? (v._values = m._values ? Ce(m._values) : void 0, v._index = Ce(m._index), v._ptr = Ce(m._ptr), v._size = Ce(m._size), v._datatype = d || m._datatype) : o(v, m.valueOf(), d || m._datatype);
  }
  function o(v, m, d) {
    v._values = [], v._index = [], v._ptr = [], v._datatype = d;
    var w = m.length, g = 0, A = n, F = 0;
    if (tr(d) && (A = t.find(n, [d, d]) || n, F = t.convert(0, d)), w > 0) {
      var y = 0;
      do {
        v._ptr.push(v._index.length);
        for (var C = 0; C < w; C++) {
          var b = m[C];
          if (Me(b)) {
            if (y === 0 && g < b.length && (g = b.length), y < b.length) {
              var E = b[y];
              A(E, F) || (v._values.push(E), v._index.push(C));
            }
          } else
            y === 0 && g < 1 && (g = 1), A(b, F) || (v._values.push(b), v._index.push(C));
        }
        y++;
      } while (y < g);
    }
    v._ptr.push(v._index.length), v._size = [w, g];
  }
  r.prototype = new i(), r.prototype.createSparseMatrix = function(v, m) {
    return new r(v, m);
  }, Object.defineProperty(r, "name", {
    value: "SparseMatrix"
  }), r.prototype.constructor = r, r.prototype.type = "SparseMatrix", r.prototype.isSparseMatrix = !0, r.prototype.getDataType = function() {
    return Jr(this._values, lr);
  }, r.prototype.storage = function() {
    return "sparse";
  }, r.prototype.datatype = function() {
    return this._datatype;
  }, r.prototype.create = function(v, m) {
    return new r(v, m);
  }, r.prototype.density = function() {
    var v = this._size[0], m = this._size[1];
    return v !== 0 && m !== 0 ? this._index.length / (v * m) : 0;
  }, r.prototype.subset = function(v, m, d) {
    if (!this._values)
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return h(this, v);
      case 2:
      case 3:
        return c(this, v, m, d);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function h(v, m) {
    if (!wt(m))
      throw new TypeError("Invalid index");
    var d = m.isScalar();
    if (d)
      return v.get(m.min());
    var w = m.size();
    if (w.length !== v._size.length)
      throw new Fe(w.length, v._size.length);
    var g, A, F, y, C = m.min(), b = m.max();
    for (g = 0, A = v._size.length; g < A; g++)
      Be(C[g], v._size[g]), Be(b[g], v._size[g]);
    var E = v._values, S = v._index, M = v._ptr, x = m.dimension(0), O = m.dimension(1), T = [], I = [];
    x.forEach(function(z, V) {
      I[z] = V[0], T[z] = !0;
    });
    var B = E ? [] : void 0, G = [], $ = [];
    return O.forEach(function(z) {
      for ($.push(G.length), F = M[z], y = M[z + 1]; F < y; F++)
        g = S[F], T[g] === !0 && (G.push(I[g]), B && B.push(E[F]));
    }), $.push(G.length), new r({
      values: B,
      index: G,
      ptr: $,
      size: w,
      datatype: v._datatype
    });
  }
  function c(v, m, d, w) {
    if (!m || m.isIndex !== !0)
      throw new TypeError("Invalid index");
    var g = m.size(), A = m.isScalar(), F;
    if (_e(d) ? (F = d.size(), d = d.toArray()) : F = $e(d), A) {
      if (F.length !== 0)
        throw new TypeError("Scalar expected");
      v.set(m.min(), d, w);
    } else {
      if (g.length !== 1 && g.length !== 2)
        throw new Fe(g.length, v._size.length, "<");
      if (F.length < g.length) {
        for (var y = 0, C = 0; g[y] === 1 && F[y] === 1; )
          y++;
        for (; g[y] === 1; )
          C++, y++;
        d = Mi(d, g.length, C, F);
      }
      if (!Ir(g, F))
        throw new Fe(g, F, ">");
      if (g.length === 1) {
        var b = m.dimension(0);
        b.forEach(function(M, x) {
          Be(M), v.set([M, 0], d[x[0]], w);
        });
      } else {
        var E = m.dimension(0), S = m.dimension(1);
        E.forEach(function(M, x) {
          Be(M), S.forEach(function(O, T) {
            Be(O), v.set([M, O], d[x[0]][T[0]], w);
          });
        });
      }
    }
    return v;
  }
  r.prototype.get = function(v) {
    if (!Me(v))
      throw new TypeError("Array expected");
    if (v.length !== this._size.length)
      throw new Fe(v.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var m = v[0], d = v[1];
    Be(m, this._size[0]), Be(d, this._size[1]);
    var w = l(m, this._ptr[d], this._ptr[d + 1], this._index);
    return w < this._ptr[d + 1] && this._index[w] === m ? this._values[w] : 0;
  }, r.prototype.set = function(v, m, d) {
    if (!Me(v))
      throw new TypeError("Array expected");
    if (v.length !== this._size.length)
      throw new Fe(v.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var w = v[0], g = v[1], A = this._size[0], F = this._size[1], y = n, C = 0;
    tr(this._datatype) && (y = t.find(n, [this._datatype, this._datatype]) || n, C = t.convert(0, this._datatype)), (w > A - 1 || g > F - 1) && (f(this, Math.max(w + 1, A), Math.max(g + 1, F), d), A = this._size[0], F = this._size[1]), Be(w, A), Be(g, F);
    var b = l(w, this._ptr[g], this._ptr[g + 1], this._index);
    return b < this._ptr[g + 1] && this._index[b] === w ? y(m, C) ? s(b, g, this._values, this._index, this._ptr) : this._values[b] = m : y(m, C) || u(b, w, g, m, this._values, this._index, this._ptr), this;
  };
  function l(v, m, d, w) {
    if (d - m === 0)
      return d;
    for (var g = m; g < d; g++)
      if (w[g] === v)
        return g;
    return m;
  }
  function s(v, m, d, w, g) {
    d.splice(v, 1), w.splice(v, 1);
    for (var A = m + 1; A < g.length; A++)
      g[A]--;
  }
  function u(v, m, d, w, g, A, F) {
    g.splice(v, 0, w), A.splice(v, 0, m);
    for (var y = d + 1; y < F.length; y++)
      F[y]++;
  }
  r.prototype.resize = function(v, m, d) {
    if (!ot(v))
      throw new TypeError("Array or Matrix expected");
    var w = v.valueOf().map((A) => Array.isArray(A) && A.length === 1 ? A[0] : A);
    if (w.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    w.forEach(function(A) {
      if (!Le(A) || !ze(A) || A < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Ie(w) + ")");
    });
    var g = d ? this.clone() : this;
    return f(g, w[0], w[1], m);
  };
  function f(v, m, d, w) {
    var g = w || 0, A = n, F = 0;
    tr(v._datatype) && (A = t.find(n, [v._datatype, v._datatype]) || n, F = t.convert(0, v._datatype), g = t.convert(g, v._datatype));
    var y = !A(g, F), C = v._size[0], b = v._size[1], E, S, M;
    if (d > b) {
      for (S = b; S < d; S++)
        if (v._ptr[S] = v._values.length, y)
          for (E = 0; E < C; E++)
            v._values.push(g), v._index.push(E);
      v._ptr[d] = v._values.length;
    } else
      d < b && (v._ptr.splice(d + 1, b - d), v._values.splice(v._ptr[d], v._values.length), v._index.splice(v._ptr[d], v._index.length));
    if (b = d, m > C) {
      if (y) {
        var x = 0;
        for (S = 0; S < b; S++) {
          v._ptr[S] = v._ptr[S] + x, M = v._ptr[S + 1] + x;
          var O = 0;
          for (E = C; E < m; E++, O++)
            v._values.splice(M + O, 0, g), v._index.splice(M + O, 0, E), x++;
        }
        v._ptr[b] = v._values.length;
      }
    } else if (m < C) {
      var T = 0;
      for (S = 0; S < b; S++) {
        v._ptr[S] = v._ptr[S] - T;
        var I = v._ptr[S], B = v._ptr[S + 1] - T;
        for (M = I; M < B; M++)
          E = v._index[M], E > m - 1 && (v._values.splice(M, 1), v._index.splice(M, 1), T++);
      }
      v._ptr[S] = v._values.length;
    }
    return v._size[0] = m, v._size[1] = d, v;
  }
  r.prototype.reshape = function(v, m) {
    if (!Me(v))
      throw new TypeError("Array expected");
    if (v.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    v.forEach(function(z) {
      if (!Le(z) || !ze(z) || z <= -2 || z === 0)
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Ie(v) + ")");
    });
    var d = this._size[0] * this._size[1];
    v = Qt(v, d);
    var w = v[0] * v[1];
    if (d !== w)
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var g = m ? this.clone() : this;
    if (this._size[0] === v[0] && this._size[1] === v[1])
      return g;
    for (var A = [], F = 0; F < g._ptr.length; F++)
      for (var y = 0; y < g._ptr[F + 1] - g._ptr[F]; y++)
        A.push(F);
    for (var C = g._values.slice(), b = g._index.slice(), E = 0; E < g._index.length; E++) {
      var S = b[E], M = A[E], x = S * g._size[1] + M;
      A[E] = x % v[1], b[E] = Math.floor(x / v[1]);
    }
    g._values.length = 0, g._index.length = 0, g._ptr.length = v[1] + 1, g._size = v.slice();
    for (var O = 0; O < g._ptr.length; O++)
      g._ptr[O] = 0;
    for (var T = 0; T < C.length; T++) {
      var I = b[T], B = A[T], G = C[T], $ = l(I, g._ptr[B], g._ptr[B + 1], g._index);
      u($, I, B, G, g._values, g._index, g._ptr);
    }
    return g;
  }, r.prototype.clone = function() {
    var v = new r({
      values: this._values ? Ce(this._values) : void 0,
      index: Ce(this._index),
      ptr: Ce(this._ptr),
      size: Ce(this._size),
      datatype: this._datatype
    });
    return v;
  }, r.prototype.size = function() {
    return this._size.slice(0);
  }, r.prototype.map = function(v, m) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var d = this, w = this._size[0], g = this._size[1], A = Hi(v), F = function(C, b, E) {
      return A === 1 ? v(C) : A === 2 ? v(C, [b, E]) : v(C, [b, E], d);
    };
    return p(this, 0, w - 1, 0, g - 1, F, m);
  };
  function p(v, m, d, w, g, A, F) {
    var y = [], C = [], b = [], E = n, S = 0;
    tr(v._datatype) && (E = t.find(n, [v._datatype, v._datatype]) || n, S = t.convert(0, v._datatype));
    for (var M = function(q, Z, ne) {
      q = A(q, Z, ne), E(q, S) || (y.push(q), C.push(Z));
    }, x = w; x <= g; x++) {
      b.push(y.length);
      var O = v._ptr[x], T = v._ptr[x + 1];
      if (F)
        for (var I = O; I < T; I++) {
          var B = v._index[I];
          B >= m && B <= d && M(v._values[I], B - m, x - w);
        }
      else {
        for (var G = {}, $ = O; $ < T; $++) {
          var z = v._index[$];
          G[z] = v._values[$];
        }
        for (var V = m; V <= d; V++) {
          var K = V in G ? G[V] : 0;
          M(K, V - m, x - w);
        }
      }
    }
    return b.push(y.length), new r({
      values: y,
      index: C,
      ptr: b,
      size: [d - m + 1, g - w + 1]
    });
  }
  r.prototype.forEach = function(v, m) {
    if (!this._values)
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var d = this, w = this._size[0], g = this._size[1], A = 0; A < g; A++) {
      var F = this._ptr[A], y = this._ptr[A + 1];
      if (m)
        for (var C = F; C < y; C++) {
          var b = this._index[C];
          v(this._values[C], [b, A], d);
        }
      else {
        for (var E = {}, S = F; S < y; S++) {
          var M = this._index[S];
          E[M] = this._values[S];
        }
        for (var x = 0; x < w; x++) {
          var O = x in E ? E[x] : 0;
          v(O, [x, A], d);
        }
      }
    }
  }, r.prototype[Symbol.iterator] = function* () {
    if (!this._values)
      throw new Error("Cannot iterate a Pattern only matrix");
    for (var v = this._size[1], m = 0; m < v; m++)
      for (var d = this._ptr[m], w = this._ptr[m + 1], g = d; g < w; g++) {
        var A = this._index[g];
        yield {
          value: this._values[g],
          index: [A, m]
        };
      }
  }, r.prototype.toArray = function() {
    return D(this._values, this._index, this._ptr, this._size, !0);
  }, r.prototype.valueOf = function() {
    return D(this._values, this._index, this._ptr, this._size, !1);
  };
  function D(v, m, d, w, g) {
    var A = w[0], F = w[1], y = [], C, b;
    for (C = 0; C < A; C++)
      for (y[C] = [], b = 0; b < F; b++)
        y[C][b] = 0;
    for (b = 0; b < F; b++)
      for (var E = d[b], S = d[b + 1], M = E; M < S; M++)
        C = m[M], y[C][b] = v ? g ? Ce(v[M]) : v[M] : 1;
    return y;
  }
  return r.prototype.format = function(v) {
    for (var m = this._size[0], d = this._size[1], w = this.density(), g = "Sparse Matrix [" + Ie(m, v) + " x " + Ie(d, v) + "] density: " + Ie(w, v) + `
`, A = 0; A < d; A++)
      for (var F = this._ptr[A], y = this._ptr[A + 1], C = F; C < y; C++) {
        var b = this._index[C];
        g += `
    (` + Ie(b, v) + ", " + Ie(A, v) + ") ==> " + (this._values ? Ie(this._values[C], v) : "X");
      }
    return g;
  }, r.prototype.toString = function() {
    return Ie(this.toArray());
  }, r.prototype.toJSON = function() {
    return {
      mathjs: "SparseMatrix",
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  }, r.prototype.diagonal = function(v) {
    if (v) {
      if (Pe(v) && (v = v.toNumber()), !Le(v) || !ze(v))
        throw new TypeError("The parameter k must be an integer number");
    } else
      v = 0;
    var m = v > 0 ? v : 0, d = v < 0 ? -v : 0, w = this._size[0], g = this._size[1], A = Math.min(w - d, g - m), F = [], y = [], C = [];
    C[0] = 0;
    for (var b = m; b < g && F.length < A; b++)
      for (var E = this._ptr[b], S = this._ptr[b + 1], M = E; M < S; M++) {
        var x = this._index[M];
        if (x === b - m + d) {
          F.push(this._values[M]), y[F.length - 1] = x - d;
          break;
        }
      }
    return C.push(F.length), new r({
      values: F,
      index: y,
      ptr: C,
      size: [A, 1]
    });
  }, r.fromJSON = function(v) {
    return new r(v);
  }, r.diagonal = function(v, m, d, w, g) {
    if (!Me(v))
      throw new TypeError("Array expected, size parameter");
    if (v.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (v = v.map(function(z) {
      if (Pe(z) && (z = z.toNumber()), !Le(z) || !ze(z) || z < 1)
        throw new Error("Size values must be positive integers");
      return z;
    }), d) {
      if (Pe(d) && (d = d.toNumber()), !Le(d) || !ze(d))
        throw new TypeError("The parameter k must be an integer number");
    } else
      d = 0;
    var A = n, F = 0;
    tr(g) && (A = t.find(n, [g, g]) || n, F = t.convert(0, g));
    var y = d > 0 ? d : 0, C = d < 0 ? -d : 0, b = v[0], E = v[1], S = Math.min(b - C, E - y), M;
    if (Me(m)) {
      if (m.length !== S)
        throw new Error("Invalid value array length");
      M = function(V) {
        return m[V];
      };
    } else if (_e(m)) {
      var x = m.size();
      if (x.length !== 1 || x[0] !== S)
        throw new Error("Invalid matrix length");
      M = function(V) {
        return m.get([V]);
      };
    } else
      M = function() {
        return m;
      };
    for (var O = [], T = [], I = [], B = 0; B < E; B++) {
      I.push(O.length);
      var G = B - y;
      if (G >= 0 && G < S) {
        var $ = M(G);
        A($, F) || (T.push(G + C), O.push($));
      }
    }
    return I.push(O.length), new r({
      values: O,
      index: T,
      ptr: I,
      size: [b, E]
    });
  }, r.prototype.swapRows = function(v, m) {
    if (!Le(v) || !ze(v) || !Le(m) || !ze(m))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Be(v, this._size[0]), Be(m, this._size[0]), r._swapRows(v, m, this._size[1], this._values, this._index, this._ptr), this;
  }, r._forEachRow = function(v, m, d, w, g) {
    for (var A = w[v], F = w[v + 1], y = A; y < F; y++)
      g(d[y], m[y]);
  }, r._swapRows = function(v, m, d, w, g, A) {
    for (var F = 0; F < d; F++) {
      var y = A[F], C = A[F + 1], b = l(v, y, C, g), E = l(m, y, C, g);
      if (b < C && E < C && g[b] === v && g[E] === m) {
        if (w) {
          var S = w[b];
          w[b] = w[E], w[E] = S;
        }
        continue;
      }
      if (b < C && g[b] === v && (E >= C || g[E] !== m)) {
        var M = w ? w[b] : void 0;
        g.splice(E, 0, m), w && w.splice(E, 0, M), g.splice(E <= b ? b + 1 : b, 1), w && w.splice(E <= b ? b + 1 : b, 1);
        continue;
      }
      if (E < C && g[E] === m && (b >= C || g[b] !== v)) {
        var x = w ? w[E] : void 0;
        g.splice(b, 0, v), w && w.splice(b, 0, x), g.splice(b <= E ? E + 1 : E, 1), w && w.splice(b <= E ? E + 1 : E, 1);
      }
    }
  }, r;
}, {
  isClass: !0
}), Ns = "number", Bs = ["typed"];
function _s(e) {
  var t = e.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (t) {
    var n = {
      "0b": 2,
      "0o": 8,
      "0x": 16
    }[t[1]], i = t[2], r = t[3];
    return {
      input: e,
      radix: n,
      integerPart: i,
      fractionalPart: r
    };
  } else
    return null;
}
function zs(e) {
  for (var t = parseInt(e.integerPart, e.radix), n = 0, i = 0; i < e.fractionalPart.length; i++) {
    var r = parseInt(e.fractionalPart[i], e.radix);
    n += r / Math.pow(e.radix, i + 1);
  }
  var a = t + n;
  if (isNaN(a))
    throw new SyntaxError('String "' + e.input + '" is not a valid number');
  return a;
}
var Ts = /* @__PURE__ */ ee(Ns, Bs, (e) => {
  var {
    typed: t
  } = e, n = t("number", {
    "": function() {
      return 0;
    },
    number: function(r) {
      return r;
    },
    string: function(r) {
      if (r === "NaN")
        return NaN;
      var a = _s(r);
      if (a)
        return zs(a);
      var o = 0, h = r.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      h && (o = Number(h[2]), r = h[1]);
      var c = Number(r);
      if (isNaN(c))
        throw new SyntaxError('String "' + r + '" is not a valid number');
      if (h) {
        if (c > 2 ** o - 1)
          throw new SyntaxError('String "'.concat(r, '" is out of range'));
        c >= 2 ** (o - 1) && (c = c - 2 ** o);
      }
      return c;
    },
    BigNumber: function(r) {
      return r.toNumber();
    },
    Fraction: function(r) {
      return r.valueOf();
    },
    Unit: t.referToSelf((i) => (r) => {
      var a = r.clone();
      return a.value = i(r.value), a;
    }),
    null: function(r) {
      return 0;
    },
    "Unit, string | Unit": function(r, a) {
      return r.toNumber(a);
    },
    "Array | Matrix": t.referToSelf((i) => (r) => er(r, i))
  });
  return n.fromJSON = function(i) {
    return parseFloat(i.value);
  }, n;
}), Os = "bignumber", Is = ["typed", "BigNumber"], Ls = /* @__PURE__ */ ee(Os, Is, (e) => {
  var {
    typed: t,
    BigNumber: n
  } = e;
  return t("bignumber", {
    "": function() {
      return new n(0);
    },
    number: function(r) {
      return new n(r + "");
    },
    string: function(r) {
      var a = r.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (a) {
        var o = a[2], h = n(a[1]), c = new n(2).pow(Number(o));
        if (h.gt(c.sub(1)))
          throw new SyntaxError('String "'.concat(r, '" is out of range'));
        var l = new n(2).pow(Number(o) - 1);
        return h.gte(l) ? h.sub(c) : h;
      }
      return new n(r);
    },
    BigNumber: function(r) {
      return r;
    },
    Unit: t.referToSelf((i) => (r) => {
      var a = r.clone();
      return a.value = i(r.value), a;
    }),
    Fraction: function(r) {
      return new n(r.n).div(r.d).times(r.s);
    },
    null: function(r) {
      return new n(0);
    },
    "Array | Matrix": t.referToSelf((i) => (r) => er(r, i))
  });
}), $s = "complex", qs = ["typed", "Complex"], Ps = /* @__PURE__ */ ee($s, qs, (e) => {
  var {
    typed: t,
    Complex: n
  } = e;
  return t("complex", {
    "": function() {
      return n.ZERO;
    },
    number: function(r) {
      return new n(r, 0);
    },
    "number, number": function(r, a) {
      return new n(r, a);
    },
    // TODO: this signature should be redundant
    "BigNumber, BigNumber": function(r, a) {
      return new n(r.toNumber(), a.toNumber());
    },
    Fraction: function(r) {
      return new n(r.valueOf(), 0);
    },
    Complex: function(r) {
      return r.clone();
    },
    string: function(r) {
      return n(r);
    },
    null: function(r) {
      return n(0);
    },
    Object: function(r) {
      if ("re" in r && "im" in r)
        return new n(r.re, r.im);
      if ("r" in r && "phi" in r || "abs" in r && "arg" in r)
        return new n(r);
      throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
    },
    "Array | Matrix": t.referToSelf((i) => (r) => er(r, i))
  });
}), Rs = "fraction", Us = ["typed", "Fraction"], Vs = /* @__PURE__ */ ee(Rs, Us, (e) => {
  var {
    typed: t,
    Fraction: n
  } = e;
  return t("fraction", {
    number: function(r) {
      if (!isFinite(r) || isNaN(r))
        throw new Error(r + " cannot be represented as a fraction");
      return new n(r);
    },
    string: function(r) {
      return new n(r);
    },
    "number, number": function(r, a) {
      return new n(r, a);
    },
    null: function(r) {
      return new n(0);
    },
    BigNumber: function(r) {
      return new n(r.toString());
    },
    Fraction: function(r) {
      return r;
    },
    Unit: t.referToSelf((i) => (r) => {
      var a = r.clone();
      return a.value = i(r.value), a;
    }),
    Object: function(r) {
      return new n(r);
    },
    "Array | Matrix": t.referToSelf((i) => (r) => er(r, i))
  });
}), wn = "matrix", Zs = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], Gs = /* @__PURE__ */ ee(wn, Zs, (e) => {
  var {
    typed: t,
    Matrix: n,
    DenseMatrix: i,
    SparseMatrix: r
  } = e;
  return t(wn, {
    "": function() {
      return a([]);
    },
    string: function(h) {
      return a([], h);
    },
    "string, string": function(h, c) {
      return a([], h, c);
    },
    Array: function(h) {
      return a(h);
    },
    Matrix: function(h) {
      return a(h, h.storage());
    },
    "Array | Matrix, string": a,
    "Array | Matrix, string, string": a
  });
  function a(o, h, c) {
    if (h === "dense" || h === "default" || h === void 0)
      return new i(o, c);
    if (h === "sparse")
      return new r(o, c);
    throw new TypeError("Unknown matrix type " + JSON.stringify(h) + ".");
  }
}), An = "matrixFromColumns", Ys = ["typed", "matrix", "flatten", "size"], Js = /* @__PURE__ */ ee(An, Ys, (e) => {
  var {
    typed: t,
    matrix: n,
    flatten: i,
    size: r
  } = e;
  return t(An, {
    "...Array": function(c) {
      return a(c);
    },
    "...Matrix": function(c) {
      return n(a(c.map((l) => l.toArray())));
    }
    // TODO implement this properly for SparseMatrix
  });
  function a(h) {
    if (h.length === 0)
      throw new TypeError("At least one column is needed to construct a matrix.");
    for (var c = o(h[0]), l = [], s = 0; s < c; s++)
      l[s] = [];
    for (var u of h) {
      var f = o(u);
      if (f !== c)
        throw new TypeError("The vectors had different length: " + (c | 0) + " ≠ " + (f | 0));
      for (var p = i(u), D = 0; D < c; D++)
        l[D].push(p[D]);
    }
    return l;
  }
  function o(h) {
    var c = r(h);
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
}), En = "unaryMinus", Qs = ["typed"], Xs = /* @__PURE__ */ ee(En, Qs, (e) => {
  var {
    typed: t
  } = e;
  return t(En, {
    number: ea,
    "Complex | BigNumber | Fraction": (n) => n.neg(),
    Unit: t.referToSelf((n) => (i) => {
      var r = i.clone();
      return r.value = t.find(n, r.valueType())(i.value), r;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    "Array | Matrix": t.referToSelf((n) => (i) => er(i, n))
    // TODO: add support for string
  });
}), Fn = "abs", Hs = ["typed"], Ks = /* @__PURE__ */ ee(Fn, Hs, (e) => {
  var {
    typed: t
  } = e;
  return t(Fn, {
    number: Ki,
    "Complex | BigNumber | Fraction | Unit": (n) => n.abs(),
    // deep map collection, skip zeros since abs(0) = 0
    "Array | Matrix": t.referToSelf((n) => (i) => er(i, n))
  });
}), Cn = "addScalar", Ws = ["typed"], ks = /* @__PURE__ */ ee(Cn, Ws, (e) => {
  var {
    typed: t
  } = e;
  return t(Cn, {
    "number, number": Wi,
    "Complex, Complex": function(i, r) {
      return i.add(r);
    },
    "BigNumber, BigNumber": function(i, r) {
      return i.plus(r);
    },
    "Fraction, Fraction": function(i, r) {
      return i.add(r);
    },
    "Unit, Unit": t.referToSelf((n) => (i, r) => {
      if (i.value === null || i.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (r.value === null || r.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!i.equalBase(r))
        throw new Error("Units do not match");
      var a = i.clone();
      return a.value = t.find(n, [a.valueType(), r.valueType()])(a.value, r.value), a.fixPrefix = !1, a;
    })
  });
}), bn = "subtractScalar", js = ["typed"], ef = /* @__PURE__ */ ee(bn, js, (e) => {
  var {
    typed: t
  } = e;
  return t(bn, {
    "number, number": ki,
    "Complex, Complex": function(i, r) {
      return i.sub(r);
    },
    "BigNumber, BigNumber": function(i, r) {
      return i.minus(r);
    },
    "Fraction, Fraction": function(i, r) {
      return i.sub(r);
    },
    "Unit, Unit": t.referToSelf((n) => (i, r) => {
      if (i.value === null || i.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (r.value === null || r.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!i.equalBase(r))
        throw new Error("Units do not match");
      var a = i.clone();
      return a.value = t.find(n, [a.valueType(), r.valueType()])(a.value, r.value), a.fixPrefix = !1, a;
    })
  });
}), rf = "matAlgo11xS0s", tf = ["typed", "equalScalar"], nf = /* @__PURE__ */ ee(rf, tf, (e) => {
  var {
    typed: t,
    equalScalar: n
  } = e;
  return function(r, a, o, h) {
    var c = r._values, l = r._index, s = r._ptr, u = r._size, f = r._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var p = u[0], D = u[1], v, m = n, d = 0, w = o;
    typeof f == "string" && (v = f, m = t.find(n, [v, v]), d = t.convert(0, v), a = t.convert(a, v), w = t.find(o, [v, v]));
    for (var g = [], A = [], F = [], y = 0; y < D; y++) {
      F[y] = A.length;
      for (var C = s[y], b = s[y + 1], E = C; E < b; E++) {
        var S = l[E], M = h ? w(a, c[E]) : w(c[E], a);
        m(M, d) || (A.push(S), g.push(M));
      }
    }
    return F[D] = A.length, r.createSparseMatrix({
      values: g,
      index: A,
      ptr: F,
      size: [p, D],
      datatype: v
    });
  };
}), af = "matAlgo12xSfs", uf = ["typed", "DenseMatrix"], Pr = /* @__PURE__ */ ee(af, uf, (e) => {
  var {
    typed: t,
    DenseMatrix: n
  } = e;
  return function(r, a, o, h) {
    var c = r._values, l = r._index, s = r._ptr, u = r._size, f = r._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var p = u[0], D = u[1], v, m = o;
    typeof f == "string" && (v = f, a = t.convert(a, v), m = t.find(o, [v, v]));
    for (var d = [], w = [], g = [], A = 0; A < D; A++) {
      for (var F = A + 1, y = s[A], C = s[A + 1], b = y; b < C; b++) {
        var E = l[b];
        w[E] = c[b], g[E] = F;
      }
      for (var S = 0; S < p; S++)
        A === 0 && (d[S] = []), g[S] === F ? d[S][A] = h ? m(a, w[S]) : m(w[S], a) : d[S][A] = h ? m(a, 0) : m(0, a);
    }
    return new n({
      data: d,
      size: [p, D],
      datatype: v
    });
  };
}), of = "matAlgo14xDs", sf = ["typed"], aa = /* @__PURE__ */ ee(of, sf, (e) => {
  var {
    typed: t
  } = e;
  return function(r, a, o, h) {
    var c = r._data, l = r._size, s = r._datatype, u, f = o;
    typeof s == "string" && (u = s, a = t.convert(a, u), f = t.find(o, [u, u]));
    var p = l.length > 0 ? n(f, 0, l, l[0], c, a, h) : [];
    return r.createDenseMatrix({
      data: p,
      size: Ce(l),
      datatype: u
    });
  };
  function n(i, r, a, o, h, c, l) {
    var s = [];
    if (r === a.length - 1)
      for (var u = 0; u < o; u++)
        s[u] = l ? i(c, h[u]) : i(h[u], c);
    else
      for (var f = 0; f < o; f++)
        s[f] = n(i, r + 1, a, a[r + 1], h[f], c, l);
    return s;
  }
}), ff = "matAlgo03xDSf", cf = ["typed"], Rr = /* @__PURE__ */ ee(ff, cf, (e) => {
  var {
    typed: t
  } = e;
  return function(i, r, a, o) {
    var h = i._data, c = i._size, l = i._datatype, s = r._values, u = r._index, f = r._ptr, p = r._size, D = r._datatype;
    if (c.length !== p.length)
      throw new Fe(c.length, p.length);
    if (c[0] !== p[0] || c[1] !== p[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + p + ")");
    if (!s)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var v = c[0], m = c[1], d, w = 0, g = a;
    typeof l == "string" && l === D && (d = l, w = t.convert(0, d), g = t.find(a, [d, d]));
    for (var A = [], F = 0; F < v; F++)
      A[F] = [];
    for (var y = [], C = [], b = 0; b < m; b++) {
      for (var E = b + 1, S = f[b], M = f[b + 1], x = S; x < M; x++) {
        var O = u[x];
        y[O] = o ? g(s[x], h[O][b]) : g(h[O][b], s[x]), C[O] = E;
      }
      for (var T = 0; T < v; T++)
        C[T] === E ? A[T][b] = y[T] : A[T][b] = o ? g(w, h[T][b]) : g(h[T][b], w);
    }
    return i.createDenseMatrix({
      data: A,
      size: [v, m],
      datatype: d
    });
  };
}), lf = "matAlgo05xSfSf", hf = ["typed", "equalScalar"], vf = /* @__PURE__ */ ee(lf, hf, (e) => {
  var {
    typed: t,
    equalScalar: n
  } = e;
  return function(r, a, o) {
    var h = r._values, c = r._index, l = r._ptr, s = r._size, u = r._datatype, f = a._values, p = a._index, D = a._ptr, v = a._size, m = a._datatype;
    if (s.length !== v.length)
      throw new Fe(s.length, v.length);
    if (s[0] !== v[0] || s[1] !== v[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + v + ")");
    var d = s[0], w = s[1], g, A = n, F = 0, y = o;
    typeof u == "string" && u === m && (g = u, A = t.find(n, [g, g]), F = t.convert(0, g), y = t.find(o, [g, g]));
    var C = h && f ? [] : void 0, b = [], E = [], S = C ? [] : void 0, M = C ? [] : void 0, x = [], O = [], T, I, B, G;
    for (I = 0; I < w; I++) {
      E[I] = b.length;
      var $ = I + 1;
      for (B = l[I], G = l[I + 1]; B < G; B++)
        T = c[B], b.push(T), x[T] = $, S && (S[T] = h[B]);
      for (B = D[I], G = D[I + 1]; B < G; B++)
        T = p[B], x[T] !== $ && b.push(T), O[T] = $, M && (M[T] = f[B]);
      if (C)
        for (B = E[I]; B < b.length; ) {
          T = b[B];
          var z = x[T], V = O[T];
          if (z === $ || V === $) {
            var K = z === $ ? S[T] : F, P = V === $ ? M[T] : F, q = y(K, P);
            A(q, F) ? b.splice(B, 1) : (C.push(q), B++);
          }
        }
    }
    return E[w] = b.length, r.createSparseMatrix({
      values: C,
      index: b,
      ptr: E,
      size: [d, w],
      datatype: g
    });
  };
}), pf = "matAlgo13xDD", df = ["typed"], mf = /* @__PURE__ */ ee(pf, df, (e) => {
  var {
    typed: t
  } = e;
  return function(r, a, o) {
    var h = r._data, c = r._size, l = r._datatype, s = a._data, u = a._size, f = a._datatype, p = [];
    if (c.length !== u.length)
      throw new Fe(c.length, u.length);
    for (var D = 0; D < c.length; D++) {
      if (c[D] !== u[D])
        throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + u + ")");
      p[D] = c[D];
    }
    var v, m = o;
    typeof l == "string" && l === f && (v = l, m = t.find(o, [v, v]));
    var d = p.length > 0 ? n(m, 0, p, p[0], h, s) : [];
    return r.createDenseMatrix({
      data: d,
      size: p,
      datatype: v
    });
  };
  function n(i, r, a, o, h, c) {
    var l = [];
    if (r === a.length - 1)
      for (var s = 0; s < o; s++)
        l[s] = i(h[s], c[s]);
    else
      for (var u = 0; u < o; u++)
        l[u] = n(i, r + 1, a, a[r + 1], h[u], c[u]);
    return l;
  }
}), gf = "broadcast", Df = ["concat"], yf = /* @__PURE__ */ ee(gf, Df, (e) => {
  var {
    concat: t
  } = e;
  return function(r, a) {
    var o = Math.max(r._size.length, a._size.length);
    if (r._size.length === a._size.length && r._size.every((D, v) => D === a._size[v]))
      return [r, a];
    for (var h = n(r._size, o, 0), c = n(a._size, o, 0), l = [], s = 0; s < o; s++)
      l[s] = Math.max(h[s], c[s]);
    ct(h, l), ct(c, l);
    var u = r.clone(), f = a.clone();
    u._size.length < o ? u.reshape(n(u._size, o, 1)) : f._size.length < o && f.reshape(n(f._size, o, 1));
    for (var p = 0; p < o; p++)
      u._size[p] < l[p] && (u = i(u, l[p], p)), f._size[p] < l[p] && (f = i(f, l[p], p));
    return [u, f];
  };
  function n(r, a, o) {
    return [...Array(a - r.length).fill(o), ...r];
  }
  function i(r, a, o) {
    return t(...Array(a).fill(r), o);
  }
}), wf = "matrixAlgorithmSuite", Af = ["typed", "matrix", "concat"], Mr = /* @__PURE__ */ ee(wf, Af, (e) => {
  var {
    typed: t,
    matrix: n,
    concat: i
  } = e, r = mf({
    typed: t
  }), a = aa({
    typed: t
  }), o = yf({
    concat: i
  });
  return function(c) {
    var l = c.elop, s = c.SD || c.DS, u;
    l ? (u = {
      "DenseMatrix, DenseMatrix": (v, m) => r(...o(v, m), l),
      "Array, Array": (v, m) => r(...o(n(v), n(m)), l).valueOf(),
      "Array, DenseMatrix": (v, m) => r(...o(n(v), m), l),
      "DenseMatrix, Array": (v, m) => r(...o(v, n(m)), l)
    }, c.SS && (u["SparseMatrix, SparseMatrix"] = (v, m) => c.SS(...o(v, m), l, !1)), c.DS && (u["DenseMatrix, SparseMatrix"] = (v, m) => c.DS(...o(v, m), l, !1), u["Array, SparseMatrix"] = (v, m) => c.DS(...o(n(v), m), l, !1)), s && (u["SparseMatrix, DenseMatrix"] = (v, m) => s(...o(m, v), l, !0), u["SparseMatrix, Array"] = (v, m) => s(...o(n(m), v), l, !0))) : (u = {
      "DenseMatrix, DenseMatrix": t.referToSelf((v) => (m, d) => r(...o(m, d), v)),
      "Array, Array": t.referToSelf((v) => (m, d) => r(...o(n(m), n(d)), v).valueOf()),
      "Array, DenseMatrix": t.referToSelf((v) => (m, d) => r(...o(n(m), d), v)),
      "DenseMatrix, Array": t.referToSelf((v) => (m, d) => r(...o(m, n(d)), v))
    }, c.SS && (u["SparseMatrix, SparseMatrix"] = t.referToSelf((v) => (m, d) => c.SS(...o(m, d), v, !1))), c.DS && (u["DenseMatrix, SparseMatrix"] = t.referToSelf((v) => (m, d) => c.DS(...o(m, d), v, !1)), u["Array, SparseMatrix"] = t.referToSelf((v) => (m, d) => c.DS(...o(n(m), d), v, !1))), s && (u["SparseMatrix, DenseMatrix"] = t.referToSelf((v) => (m, d) => s(...o(d, m), v, !0)), u["SparseMatrix, Array"] = t.referToSelf((v) => (m, d) => s(...o(n(d), m), v, !0))));
    var f = c.scalar || "any", p = c.Ds || c.Ss;
    p && (l ? (u["DenseMatrix," + f] = (v, m) => a(v, m, l, !1), u[f + ", DenseMatrix"] = (v, m) => a(m, v, l, !0), u["Array," + f] = (v, m) => a(n(v), m, l, !1).valueOf(), u[f + ", Array"] = (v, m) => a(n(m), v, l, !0).valueOf()) : (u["DenseMatrix," + f] = t.referToSelf((v) => (m, d) => a(m, d, v, !1)), u[f + ", DenseMatrix"] = t.referToSelf((v) => (m, d) => a(d, m, v, !0)), u["Array," + f] = t.referToSelf((v) => (m, d) => a(n(m), d, v, !1).valueOf()), u[f + ", Array"] = t.referToSelf((v) => (m, d) => a(n(d), m, v, !0).valueOf())));
    var D = c.sS !== void 0 ? c.sS : c.Ss;
    return l ? (c.Ss && (u["SparseMatrix," + f] = (v, m) => c.Ss(v, m, l, !1)), D && (u[f + ", SparseMatrix"] = (v, m) => D(m, v, l, !0))) : (c.Ss && (u["SparseMatrix," + f] = t.referToSelf((v) => (m, d) => c.Ss(m, d, v, !1))), D && (u[f + ", SparseMatrix"] = t.referToSelf((v) => (m, d) => D(d, m, v, !0)))), l && l.signatures && Su(u, l.signatures), u;
  };
}), Ef = "matAlgo01xDSid", Ff = ["typed"], ua = /* @__PURE__ */ ee(Ef, Ff, (e) => {
  var {
    typed: t
  } = e;
  return function(i, r, a, o) {
    var h = i._data, c = i._size, l = i._datatype, s = r._values, u = r._index, f = r._ptr, p = r._size, D = r._datatype;
    if (c.length !== p.length)
      throw new Fe(c.length, p.length);
    if (c[0] !== p[0] || c[1] !== p[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + p + ")");
    if (!s)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var v = c[0], m = c[1], d = typeof l == "string" && l === D ? l : void 0, w = d ? t.find(a, [d, d]) : a, g, A, F = [];
    for (g = 0; g < v; g++)
      F[g] = [];
    var y = [], C = [];
    for (A = 0; A < m; A++) {
      for (var b = A + 1, E = f[A], S = f[A + 1], M = E; M < S; M++)
        g = u[M], y[g] = o ? w(s[M], h[g][A]) : w(h[g][A], s[M]), C[g] = b;
      for (g = 0; g < v; g++)
        C[g] === b ? F[g][A] = y[g] : F[g][A] = h[g][A];
    }
    return i.createDenseMatrix({
      data: F,
      size: [v, m],
      datatype: d
    });
  };
}), Cf = "matAlgo04xSidSid", bf = ["typed", "equalScalar"], Mf = /* @__PURE__ */ ee(Cf, bf, (e) => {
  var {
    typed: t,
    equalScalar: n
  } = e;
  return function(r, a, o) {
    var h = r._values, c = r._index, l = r._ptr, s = r._size, u = r._datatype, f = a._values, p = a._index, D = a._ptr, v = a._size, m = a._datatype;
    if (s.length !== v.length)
      throw new Fe(s.length, v.length);
    if (s[0] !== v[0] || s[1] !== v[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + v + ")");
    var d = s[0], w = s[1], g, A = n, F = 0, y = o;
    typeof u == "string" && u === m && (g = u, A = t.find(n, [g, g]), F = t.convert(0, g), y = t.find(o, [g, g]));
    var C = h && f ? [] : void 0, b = [], E = [], S = h && f ? [] : void 0, M = h && f ? [] : void 0, x = [], O = [], T, I, B, G, $;
    for (I = 0; I < w; I++) {
      E[I] = b.length;
      var z = I + 1;
      for (G = l[I], $ = l[I + 1], B = G; B < $; B++)
        T = c[B], b.push(T), x[T] = z, S && (S[T] = h[B]);
      for (G = D[I], $ = D[I + 1], B = G; B < $; B++)
        if (T = p[B], x[T] === z) {
          if (S) {
            var V = y(S[T], f[B]);
            A(V, F) ? x[T] = null : S[T] = V;
          }
        } else
          b.push(T), O[T] = z, M && (M[T] = f[B]);
      if (S && M)
        for (B = E[I]; B < b.length; )
          T = b[B], x[T] === z ? (C[B] = S[T], B++) : O[T] === z ? (C[B] = M[T], B++) : b.splice(B, 1);
    }
    return E[w] = b.length, r.createSparseMatrix({
      values: C,
      index: b,
      ptr: E,
      size: [d, w],
      datatype: g
    });
  };
}), Sf = "matAlgo10xSids", xf = ["typed", "DenseMatrix"], oa = /* @__PURE__ */ ee(Sf, xf, (e) => {
  var {
    typed: t,
    DenseMatrix: n
  } = e;
  return function(r, a, o, h) {
    var c = r._values, l = r._index, s = r._ptr, u = r._size, f = r._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var p = u[0], D = u[1], v, m = o;
    typeof f == "string" && (v = f, a = t.convert(a, v), m = t.find(o, [v, v]));
    for (var d = [], w = [], g = [], A = 0; A < D; A++) {
      for (var F = A + 1, y = s[A], C = s[A + 1], b = y; b < C; b++) {
        var E = l[b];
        w[E] = c[b], g[E] = F;
      }
      for (var S = 0; S < p; S++)
        A === 0 && (d[S] = []), g[S] === F ? d[S][A] = h ? m(a, w[S]) : m(w[S], a) : d[S][A] = a;
    }
    return new n({
      data: d,
      size: [p, D],
      datatype: v
    });
  };
}), Nf = "multiplyScalar", Bf = ["typed"], _f = /* @__PURE__ */ ee(Nf, Bf, (e) => {
  var {
    typed: t
  } = e;
  return t("multiplyScalar", {
    "number, number": ji,
    "Complex, Complex": function(i, r) {
      return i.mul(r);
    },
    "BigNumber, BigNumber": function(i, r) {
      return i.times(r);
    },
    "Fraction, Fraction": function(i, r) {
      return i.mul(r);
    },
    "number | Fraction | BigNumber | Complex, Unit": (n, i) => i.multiply(n),
    "Unit, number | Fraction | BigNumber | Complex | Unit": (n, i) => n.multiply(i)
  });
}), Mn = "multiply", zf = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Tf = /* @__PURE__ */ ee(Mn, zf, (e) => {
  var {
    typed: t,
    matrix: n,
    addScalar: i,
    multiplyScalar: r,
    equalScalar: a,
    dot: o
  } = e, h = nf({
    typed: t,
    equalScalar: a
  }), c = aa({
    typed: t
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
    var C = F._data, b = F._size, E = F._datatype, S = y._data, M = y._size, x = y._datatype, O = b[0], T = M[1], I, B = i, G = r;
    E && x && E === x && typeof E == "string" && (I = E, B = t.find(i, [I, I]), G = t.find(r, [I, I]));
    for (var $ = [], z = 0; z < T; z++) {
      for (var V = G(C[0], S[0][z]), K = 1; K < O; K++)
        V = B(V, G(C[K], S[K][z]));
      $[z] = V;
    }
    return F.createDenseMatrix({
      data: $,
      size: [T],
      datatype: I
    });
  }
  var p = t("_multiplyMatrixVector", {
    "DenseMatrix, any": v,
    "SparseMatrix, any": w
  }), D = t("_multiplyMatrixMatrix", {
    "DenseMatrix, DenseMatrix": m,
    "DenseMatrix, SparseMatrix": d,
    "SparseMatrix, DenseMatrix": g,
    "SparseMatrix, SparseMatrix": A
  });
  function v(F, y) {
    var C = F._data, b = F._size, E = F._datatype, S = y._data, M = y._datatype, x = b[0], O = b[1], T, I = i, B = r;
    E && M && E === M && typeof E == "string" && (T = E, I = t.find(i, [T, T]), B = t.find(r, [T, T]));
    for (var G = [], $ = 0; $ < x; $++) {
      for (var z = C[$], V = B(z[0], S[0]), K = 1; K < O; K++)
        V = I(V, B(z[K], S[K]));
      G[$] = V;
    }
    return F.createDenseMatrix({
      data: G,
      size: [x],
      datatype: T
    });
  }
  function m(F, y) {
    var C = F._data, b = F._size, E = F._datatype, S = y._data, M = y._size, x = y._datatype, O = b[0], T = b[1], I = M[1], B, G = i, $ = r;
    E && x && E === x && typeof E == "string" && (B = E, G = t.find(i, [B, B]), $ = t.find(r, [B, B]));
    for (var z = [], V = 0; V < O; V++) {
      var K = C[V];
      z[V] = [];
      for (var P = 0; P < I; P++) {
        for (var q = $(K[0], S[0][P]), Z = 1; Z < T; Z++)
          q = G(q, $(K[Z], S[Z][P]));
        z[V][P] = q;
      }
    }
    return F.createDenseMatrix({
      data: z,
      size: [O, I],
      datatype: B
    });
  }
  function d(F, y) {
    var C = F._data, b = F._size, E = F._datatype, S = y._values, M = y._index, x = y._ptr, O = y._size, T = y._datatype;
    if (!S)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var I = b[0], B = O[1], G, $ = i, z = r, V = a, K = 0;
    E && T && E === T && typeof E == "string" && (G = E, $ = t.find(i, [G, G]), z = t.find(r, [G, G]), V = t.find(a, [G, G]), K = t.convert(0, G));
    for (var P = [], q = [], Z = [], ne = y.createSparseMatrix({
      values: P,
      index: q,
      ptr: Z,
      size: [I, B],
      datatype: G
    }), k = 0; k < B; k++) {
      Z[k] = q.length;
      var U = x[k], Q = x[k + 1];
      if (Q > U)
        for (var X = 0, J = 0; J < I; J++) {
          for (var ue = J + 1, j = void 0, oe = U; oe < Q; oe++) {
            var le = M[oe];
            X !== ue ? (j = z(C[J][le], S[oe]), X = ue) : j = $(j, z(C[J][le], S[oe]));
          }
          X === ue && !V(j, K) && (q.push(J), P.push(j));
        }
    }
    return Z[B] = q.length, ne;
  }
  function w(F, y) {
    var C = F._values, b = F._index, E = F._ptr, S = F._datatype;
    if (!C)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var M = y._data, x = y._datatype, O = F._size[0], T = y._size[0], I = [], B = [], G = [], $, z = i, V = r, K = a, P = 0;
    S && x && S === x && typeof S == "string" && ($ = S, z = t.find(i, [$, $]), V = t.find(r, [$, $]), K = t.find(a, [$, $]), P = t.convert(0, $));
    var q = [], Z = [];
    G[0] = 0;
    for (var ne = 0; ne < T; ne++) {
      var k = M[ne];
      if (!K(k, P))
        for (var U = E[ne], Q = E[ne + 1], X = U; X < Q; X++) {
          var J = b[X];
          Z[J] ? q[J] = z(q[J], V(k, C[X])) : (Z[J] = !0, B.push(J), q[J] = V(k, C[X]));
        }
    }
    for (var ue = B.length, j = 0; j < ue; j++) {
      var oe = B[j];
      I[j] = q[oe];
    }
    return G[1] = B.length, F.createSparseMatrix({
      values: I,
      index: B,
      ptr: G,
      size: [O, 1],
      datatype: $
    });
  }
  function g(F, y) {
    var C = F._values, b = F._index, E = F._ptr, S = F._datatype;
    if (!C)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var M = y._data, x = y._datatype, O = F._size[0], T = y._size[0], I = y._size[1], B, G = i, $ = r, z = a, V = 0;
    S && x && S === x && typeof S == "string" && (B = S, G = t.find(i, [B, B]), $ = t.find(r, [B, B]), z = t.find(a, [B, B]), V = t.convert(0, B));
    for (var K = [], P = [], q = [], Z = F.createSparseMatrix({
      values: K,
      index: P,
      ptr: q,
      size: [O, I],
      datatype: B
    }), ne = [], k = [], U = 0; U < I; U++) {
      q[U] = P.length;
      for (var Q = U + 1, X = 0; X < T; X++) {
        var J = M[X][U];
        if (!z(J, V))
          for (var ue = E[X], j = E[X + 1], oe = ue; oe < j; oe++) {
            var le = b[oe];
            k[le] !== Q ? (k[le] = Q, P.push(le), ne[le] = $(J, C[oe])) : ne[le] = G(ne[le], $(J, C[oe]));
          }
      }
      for (var de = q[U], ge = P.length, we = de; we < ge; we++) {
        var he = P[we];
        K[we] = ne[he];
      }
    }
    return q[I] = P.length, Z;
  }
  function A(F, y) {
    var C = F._values, b = F._index, E = F._ptr, S = F._datatype, M = y._values, x = y._index, O = y._ptr, T = y._datatype, I = F._size[0], B = y._size[1], G = C && M, $, z = i, V = r;
    S && T && S === T && typeof S == "string" && ($ = S, z = t.find(i, [$, $]), V = t.find(r, [$, $]));
    for (var K = G ? [] : void 0, P = [], q = [], Z = F.createSparseMatrix({
      values: K,
      index: P,
      ptr: q,
      size: [I, B],
      datatype: $
    }), ne = G ? [] : void 0, k = [], U, Q, X, J, ue, j, oe, le, de = 0; de < B; de++) {
      q[de] = P.length;
      var ge = de + 1;
      for (ue = O[de], j = O[de + 1], J = ue; J < j; J++)
        if (le = x[J], G)
          for (Q = E[le], X = E[le + 1], U = Q; U < X; U++)
            oe = b[U], k[oe] !== ge ? (k[oe] = ge, P.push(oe), ne[oe] = V(M[J], C[U])) : ne[oe] = z(ne[oe], V(M[J], C[U]));
        else
          for (Q = E[le], X = E[le + 1], U = Q; U < X; U++)
            oe = b[U], k[oe] !== ge && (k[oe] = ge, P.push(oe));
      if (G)
        for (var we = q[de], he = P.length, be = we; be < he; be++) {
          var Ee = P[be];
          K[be] = ne[Ee];
        }
    }
    return q[B] = P.length, Z;
  }
  return t(Mn, r, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices
    "Array, Array": t.referTo("Matrix, Matrix", (F) => (y, C) => {
      l($e(y), $e(C));
      var b = F(n(y), n(C));
      return _e(b) ? b.valueOf() : b;
    }),
    "Matrix, Matrix": function(y, C) {
      var b = y.size(), E = C.size();
      return l(b, E), b.length === 1 ? E.length === 1 ? s(y, C, b[0]) : u(y, C) : E.length === 1 ? p(y, C) : D(y, C);
    },
    "Matrix, Array": t.referTo("Matrix,Matrix", (F) => (y, C) => F(y, n(C))),
    "Array, Matrix": t.referToSelf((F) => (y, C) => F(n(y, C.storage()), C)),
    "SparseMatrix, any": function(y, C) {
      return h(y, C, r, !1);
    },
    "DenseMatrix, any": function(y, C) {
      return c(y, C, r, !1);
    },
    "any, SparseMatrix": function(y, C) {
      return h(C, y, r, !0);
    },
    "any, DenseMatrix": function(y, C) {
      return c(C, y, r, !0);
    },
    "Array, any": function(y, C) {
      return c(n(y), C, r, !1).valueOf();
    },
    "any, Array": function(y, C) {
      return c(n(C), y, r, !0).valueOf();
    },
    "any, any": r,
    "any, any, ...any": t.referToSelf((F) => (y, C, b) => {
      for (var E = F(y, C), S = 0; S < b.length; S++)
        E = F(E, b[S]);
      return E;
    })
  });
}), Sn = "sign", Of = ["typed", "BigNumber", "Fraction", "complex"], If = /* @__PURE__ */ ee(Sn, Of, (e) => {
  var {
    typed: t,
    BigNumber: n,
    complex: i,
    Fraction: r
  } = e;
  return t(Sn, {
    number: Vt,
    Complex: function(o) {
      return o.im === 0 ? i(Vt(o.re)) : o.sign();
    },
    BigNumber: function(o) {
      return new n(o.cmp(0));
    },
    Fraction: function(o) {
      return new r(o.s, 1);
    },
    // deep map collection, skip zeros since sign(0) = 0
    "Array | Matrix": t.referToSelf((a) => (o) => er(o, a)),
    Unit: t.referToSelf((a) => (o) => {
      if (!o._isDerived() && o.units[0].unit.offset !== 0)
        throw new TypeError("sign is ambiguous for units with offset");
      return t.find(a, o.valueType())(o.value);
    })
  });
}), Lf = "sqrt", $f = ["config", "typed", "Complex"], qf = /* @__PURE__ */ ee(Lf, $f, (e) => {
  var {
    config: t,
    typed: n,
    Complex: i
  } = e;
  return n("sqrt", {
    number: r,
    Complex: function(o) {
      return o.sqrt();
    },
    BigNumber: function(o) {
      return !o.isNegative() || t.predictable ? o.sqrt() : r(o.toNumber());
    },
    Unit: function(o) {
      return o.pow(0.5);
    }
  });
  function r(a) {
    return isNaN(a) ? NaN : a >= 0 || t.predictable ? Math.sqrt(a) : new i(a, 0).sqrt();
  }
}), xn = "subtract", Pf = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], Rf = /* @__PURE__ */ ee(xn, Pf, (e) => {
  var {
    typed: t,
    matrix: n,
    equalScalar: i,
    subtractScalar: r,
    unaryMinus: a,
    DenseMatrix: o,
    concat: h
  } = e, c = ua({
    typed: t
  }), l = Rr({
    typed: t
  }), s = vf({
    typed: t,
    equalScalar: i
  }), u = oa({
    typed: t,
    DenseMatrix: o
  }), f = Pr({
    typed: t,
    DenseMatrix: o
  }), p = Mr({
    typed: t,
    matrix: n,
    concat: h
  });
  return t(xn, {
    "any, any": r
  }, p({
    elop: r,
    SS: s,
    DS: c,
    SD: l,
    Ss: f,
    sS: u
  }));
}), Uf = "matAlgo07xSSf", Vf = ["typed", "DenseMatrix"], Kr = /* @__PURE__ */ ee(Uf, Vf, (e) => {
  var {
    typed: t,
    DenseMatrix: n
  } = e;
  return function(a, o, h) {
    var c = a._size, l = a._datatype, s = o._size, u = o._datatype;
    if (c.length !== s.length)
      throw new Fe(c.length, s.length);
    if (c[0] !== s[0] || c[1] !== s[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + s + ")");
    var f = c[0], p = c[1], D, v = 0, m = h;
    typeof l == "string" && l === u && (D = l, v = t.convert(0, D), m = t.find(h, [D, D]));
    var d, w, g = [];
    for (d = 0; d < f; d++)
      g[d] = [];
    var A = [], F = [], y = [], C = [];
    for (w = 0; w < p; w++) {
      var b = w + 1;
      for (i(a, w, y, A, b), i(o, w, C, F, b), d = 0; d < f; d++) {
        var E = y[d] === b ? A[d] : v, S = C[d] === b ? F[d] : v;
        g[d][w] = m(E, S);
      }
    }
    return new n({
      data: g,
      size: [f, p],
      datatype: D
    });
  };
  function i(r, a, o, h, c) {
    for (var l = r._values, s = r._index, u = r._ptr, f = u[a], p = u[a + 1]; f < p; f++) {
      var D = s[f];
      o[D] = c, h[D] = l[f];
    }
  }
}), Nn = "conj", Zf = ["typed"], Gf = /* @__PURE__ */ ee(Nn, Zf, (e) => {
  var {
    typed: t
  } = e;
  return t(Nn, {
    "number | BigNumber | Fraction": (n) => n,
    Complex: (n) => n.conjugate(),
    "Array | Matrix": t.referToSelf((n) => (i) => er(i, n))
  });
}), Bn = "im", Yf = ["typed"], Jf = /* @__PURE__ */ ee(Bn, Yf, (e) => {
  var {
    typed: t
  } = e;
  return t(Bn, {
    number: () => 0,
    "BigNumber | Fraction": (n) => n.mul(0),
    Complex: (n) => n.im,
    "Array | Matrix": t.referToSelf((n) => (i) => er(i, n))
  });
}), _n = "re", Qf = ["typed"], Xf = /* @__PURE__ */ ee(_n, Qf, (e) => {
  var {
    typed: t
  } = e;
  return t(_n, {
    "number | BigNumber | Fraction": (n) => n,
    Complex: (n) => n.re,
    "Array | Matrix": t.referToSelf((n) => (i) => er(i, n))
  });
}), zn = "concat", Hf = ["typed", "matrix", "isInteger"], Kf = /* @__PURE__ */ ee(zn, Hf, (e) => {
  var {
    typed: t,
    matrix: n,
    isInteger: i
  } = e;
  return t(zn, {
    // TODO: change signature to '...Array | Matrix, dim?' when supported
    "...Array | Matrix | number | BigNumber": function(a) {
      var o, h = a.length, c = -1, l, s = !1, u = [];
      for (o = 0; o < h; o++) {
        var f = a[o];
        if (_e(f) && (s = !0), Le(f) || Pe(f)) {
          if (o !== h - 1)
            throw new Error("Dimension must be specified as last argument");
          if (l = c, c = f.valueOf(), !i(c))
            throw new TypeError("Integer number expected for dimension");
          if (c < 0 || o > 0 && c > l)
            throw new br(c, l + 1);
        } else {
          var p = Ce(f).valueOf(), D = $e(p);
          if (u[o] = p, l = c, c = D.length - 1, o > 0 && c !== l)
            throw new Fe(l + 1, c + 1);
        }
      }
      if (u.length === 0)
        throw new SyntaxError("At least one matrix expected");
      for (var v = u.shift(); u.length; )
        v = Ni(v, u.shift(), c);
      return s ? n(v) : v;
    },
    "...string": function(a) {
      return a.join("");
    }
  });
}), Tn = "column", Wf = ["typed", "Index", "matrix", "range"], kf = /* @__PURE__ */ ee(Tn, Wf, (e) => {
  var {
    typed: t,
    Index: n,
    matrix: i,
    range: r
  } = e;
  return t(Tn, {
    "Matrix, number": a,
    "Array, number": function(h, c) {
      return a(i(Ce(h)), c).valueOf();
    }
  });
  function a(o, h) {
    if (o.size().length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    Be(h, o.size()[1]);
    var c = r(0, o.size()[0]), l = new n(c, h), s = o.subset(l);
    return _e(s) ? s : i([[s]]);
  }
}), On = "diag", jf = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], ec = /* @__PURE__ */ ee(On, jf, (e) => {
  var {
    typed: t,
    matrix: n,
    DenseMatrix: i,
    SparseMatrix: r
  } = e;
  return t(On, {
    // FIXME: simplify this huge amount of signatures as soon as typed-function supports optional arguments
    Array: function(l) {
      return a(l, 0, $e(l), null);
    },
    "Array, number": function(l, s) {
      return a(l, s, $e(l), null);
    },
    "Array, BigNumber": function(l, s) {
      return a(l, s.toNumber(), $e(l), null);
    },
    "Array, string": function(l, s) {
      return a(l, 0, $e(l), s);
    },
    "Array, number, string": function(l, s, u) {
      return a(l, s, $e(l), u);
    },
    "Array, BigNumber, string": function(l, s, u) {
      return a(l, s.toNumber(), $e(l), u);
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
    if (!ze(l))
      throw new TypeError("Second parameter in function diag must be an integer");
    var f = l > 0 ? l : 0, p = l < 0 ? -l : 0;
    switch (s.length) {
      case 1:
        return o(c, l, u, s[0], p, f);
      case 2:
        return h(c, l, u, s, p, f);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function o(c, l, s, u, f, p) {
    var D = [u + f, u + p];
    if (s && s !== "sparse" && s !== "dense")
      throw new TypeError("Unknown matrix type ".concat(s, '"'));
    var v = s === "sparse" ? r.diagonal(D, c, l) : i.diagonal(D, c, l);
    return s !== null ? v : v.valueOf();
  }
  function h(c, l, s, u, f, p) {
    if (_e(c)) {
      var D = c.diagonal(l);
      return s !== null ? s !== D.storage() ? n(D, s) : D : D.valueOf();
    }
    for (var v = Math.min(u[0] - f, u[1] - p), m = [], d = 0; d < v; d++)
      m[d] = c[d + f][d + p];
    return s !== null ? n(m) : m;
  }
}), In = "flatten", rc = ["typed", "matrix"], tc = /* @__PURE__ */ ee(In, rc, (e) => {
  var {
    typed: t,
    matrix: n
  } = e;
  return t(In, {
    Array: function(r) {
      return Lt(r);
    },
    Matrix: function(r) {
      var a = Lt(r.toArray());
      return n(a);
    }
  });
}), Ln = "getMatrixDataType", nc = ["typed"], ic = /* @__PURE__ */ ee(Ln, nc, (e) => {
  var {
    typed: t
  } = e;
  return t(Ln, {
    Array: function(i) {
      return Jr(i, lr);
    },
    Matrix: function(i) {
      return i.getDataType();
    }
  });
}), $n = "identity", ac = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], uc = /* @__PURE__ */ ee($n, ac, (e) => {
  var {
    typed: t,
    config: n,
    matrix: i,
    BigNumber: r,
    DenseMatrix: a,
    SparseMatrix: o
  } = e;
  return t($n, {
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
      return h(s);
    },
    "Array, string": function(s, u) {
      return h(s, u);
    },
    Matrix: function(s) {
      return h(s.valueOf(), s.storage());
    },
    "Matrix, string": function(s, u) {
      return h(s.valueOf(), u);
    }
  });
  function h(l, s) {
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
    var f = Pe(l) || Pe(s) ? r : null;
    if (Pe(l) && (l = l.toNumber()), Pe(s) && (s = s.toNumber()), !ze(l) || l < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!ze(s) || s < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var p = f ? new r(1) : 1, D = f ? new f(0) : 0, v = [l, s];
    if (u) {
      if (u === "sparse")
        return o.diagonal(v, p, 0, D);
      if (u === "dense")
        return a.diagonal(v, p, 0, D);
      throw new TypeError('Unknown matrix type "'.concat(u, '"'));
    }
    for (var m = ft([], v, D), d = l < s ? l : s, w = 0; w < d; w++)
      m[w][w] = p;
    return m;
  }
});
function sa() {
  throw new Error('No "bignumber" implementation available');
}
function oc() {
  throw new Error('No "fraction" implementation available');
}
function fa() {
  throw new Error('No "matrix" implementation available');
}
var qn = "range", sc = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], fc = /* @__PURE__ */ ee(qn, sc, (e) => {
  var {
    typed: t,
    config: n,
    matrix: i,
    bignumber: r,
    smaller: a,
    smallerEq: o,
    larger: h,
    largerEq: c,
    add: l,
    isPositive: s
  } = e;
  return t(qn, {
    // TODO: simplify signatures when typed-function supports default values and optional arguments
    // TODO: a number or boolean should not be converted to string here
    string: f,
    "string, boolean": f,
    "number, number": function(m, d) {
      return u(p(m, d, 1, !1));
    },
    "number, number, number": function(m, d, w) {
      return u(p(m, d, w, !1));
    },
    "number, number, boolean": function(m, d, w) {
      return u(p(m, d, 1, w));
    },
    "number, number, number, boolean": function(m, d, w, g) {
      return u(p(m, d, w, g));
    },
    "BigNumber, BigNumber": function(m, d) {
      var w = m.constructor;
      return u(p(m, d, new w(1), !1));
    },
    "BigNumber, BigNumber, BigNumber": function(m, d, w) {
      return u(p(m, d, w, !1));
    },
    "BigNumber, BigNumber, boolean": function(m, d, w) {
      var g = m.constructor;
      return u(p(m, d, new g(1), w));
    },
    "BigNumber, BigNumber, BigNumber, boolean": function(m, d, w, g) {
      return u(p(m, d, w, g));
    },
    "Unit, Unit, Unit": function(m, d, w) {
      return u(p(m, d, w, !1));
    },
    "Unit, Unit, Unit, boolean": function(m, d, w, g) {
      return u(p(m, d, w, g));
    }
  });
  function u(v) {
    return n.matrix === "Matrix" ? i ? i(v) : fa() : v;
  }
  function f(v, m) {
    var d = D(v);
    if (!d)
      throw new SyntaxError('String "' + v + '" is no valid range');
    return n.number === "BigNumber" ? (r === void 0 && sa(), u(p(r(d.start), r(d.end), r(d.step)))) : u(p(d.start, d.end, d.step, m));
  }
  function p(v, m, d, w) {
    for (var g = [], A = s(d) ? w ? o : a : w ? c : h, F = v; A(F, m); )
      g.push(F), F = l(F, d);
    return g;
  }
  function D(v) {
    var m = v.split(":"), d = m.map(function(g) {
      return Number(g);
    }), w = d.some(function(g) {
      return isNaN(g);
    });
    if (w)
      return null;
    switch (d.length) {
      case 2:
        return {
          start: d[0],
          end: d[1],
          step: 1
        };
      case 3:
        return {
          start: d[0],
          end: d[2],
          step: d[1]
        };
      default:
        return null;
    }
  }
}), Pn = "reshape", cc = ["typed", "isInteger", "matrix"], lc = /* @__PURE__ */ ee(Pn, cc, (e) => {
  var {
    typed: t,
    isInteger: n
  } = e;
  return t(Pn, {
    "Matrix, Array": function(r, a) {
      return r.reshape(a, !0);
    },
    "Array, Array": function(r, a) {
      return a.forEach(function(o) {
        if (!n(o))
          throw new TypeError("Invalid size for dimension: " + o);
      }), Jt(r, a);
    }
  });
}), Rn = "size", hc = ["typed", "config", "?matrix"], vc = /* @__PURE__ */ ee(Rn, hc, (e) => {
  var {
    typed: t,
    config: n,
    matrix: i
  } = e;
  return t(Rn, {
    Matrix: function(a) {
      return a.create(a.size());
    },
    Array: $e,
    string: function(a) {
      return n.matrix === "Array" ? [a.length] : i([a.length]);
    },
    "number | Complex | BigNumber | Unit | boolean | null": function(a) {
      return n.matrix === "Array" ? [] : i ? i([]) : fa();
    }
  });
}), Un = "squeeze", pc = ["typed", "matrix"], dc = /* @__PURE__ */ ee(Un, pc, (e) => {
  var {
    typed: t,
    matrix: n
  } = e;
  return t(Un, {
    Array: function(r) {
      return ln(Ce(r));
    },
    Matrix: function(r) {
      var a = ln(r.toArray());
      return Array.isArray(a) ? n(a) : a;
    },
    any: function(r) {
      return Ce(r);
    }
  });
}), Vn = "subset", mc = ["typed", "matrix", "zeros", "add"], gc = /* @__PURE__ */ ee(Vn, mc, (e) => {
  var {
    typed: t,
    matrix: n,
    zeros: i,
    add: r
  } = e;
  return t(Vn, {
    // get subset
    "Matrix, Index": function(h, c) {
      return Lr(c) ? n() : (st(h, c), h.subset(c));
    },
    "Array, Index": t.referTo("Matrix, Index", function(o) {
      return function(h, c) {
        var l = o(n(h), c);
        return c.isScalar() ? l : l.valueOf();
      };
    }),
    "Object, Index": yc,
    "string, Index": Dc,
    // set subset
    "Matrix, Index, any, any": function(h, c, l, s) {
      return Lr(c) ? h : (st(h, c), h.clone().subset(c, a(l, c), s));
    },
    "Array, Index, any, any": t.referTo("Matrix, Index, any, any", function(o) {
      return function(h, c, l, s) {
        var u = o(n(h), c, l, s);
        return u.isMatrix ? u.valueOf() : u;
      };
    }),
    "Array, Index, any": t.referTo("Matrix, Index, any, any", function(o) {
      return function(h, c, l) {
        return o(n(h), c, l, void 0).valueOf();
      };
    }),
    "Matrix, Index, any": t.referTo("Matrix, Index, any, any", function(o) {
      return function(h, c, l) {
        return o(h, c, l, void 0);
      };
    }),
    "string, Index, string": Zn,
    "string, Index, string, string": Zn,
    "Object, Index, any": wc
  });
  function a(o, h) {
    if (typeof o == "string")
      throw new Error("can't boradcast a string");
    if (h._isScalar)
      return o;
    var c = h.size();
    if (c.every((l) => l > 0))
      try {
        return r(o, i(c));
      } catch {
        return o;
      }
    else
      return o;
  }
});
function Dc(e, t) {
  if (!wt(t))
    throw new TypeError("Index expected");
  if (Lr(t))
    return "";
  if (st(Array.from(e), t), t.size().length !== 1)
    throw new Fe(t.size().length, 1);
  var n = e.length;
  Be(t.min()[0], n), Be(t.max()[0], n);
  var i = t.dimension(0), r = "";
  return i.forEach(function(a) {
    r += e.charAt(a);
  }), r;
}
function Zn(e, t, n, i) {
  if (!t || t.isIndex !== !0)
    throw new TypeError("Index expected");
  if (Lr(t))
    return e;
  if (st(Array.from(e), t), t.size().length !== 1)
    throw new Fe(t.size().length, 1);
  if (i !== void 0) {
    if (typeof i != "string" || i.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    i = " ";
  var r = t.dimension(0), a = r.size()[0];
  if (a !== n.length)
    throw new Fe(r.size()[0], n.length);
  var o = e.length;
  Be(t.min()[0]), Be(t.max()[0]);
  for (var h = [], c = 0; c < o; c++)
    h[c] = e.charAt(c);
  if (r.forEach(function(u, f) {
    h[u] = n.charAt(f[0]);
  }), h.length > o)
    for (var l = o - 1, s = h.length; l < s; l++)
      h[l] || (h[l] = i);
  return h.join("");
}
function yc(e, t) {
  if (!Lr(t)) {
    if (t.size().length !== 1)
      throw new Fe(t.size(), 1);
    var n = t.dimension(0);
    if (typeof n != "string")
      throw new TypeError("String expected as index to retrieve an object property");
    return Bi(e, n);
  }
}
function wc(e, t, n) {
  if (Lr(t))
    return e;
  if (t.size().length !== 1)
    throw new Fe(t.size(), 1);
  var i = t.dimension(0);
  if (typeof i != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var r = Ce(e);
  return _i(r, i, n), r;
}
var Gn = "transpose", Ac = ["typed", "matrix"], Ec = /* @__PURE__ */ ee(Gn, Ac, (e) => {
  var {
    typed: t,
    matrix: n
  } = e;
  return t(Gn, {
    Array: (o) => i(n(o)).valueOf(),
    Matrix: i,
    any: Ce
    // scalars
  });
  function i(o) {
    var h = o.size(), c;
    switch (h.length) {
      case 1:
        c = o.clone();
        break;
      case 2:
        {
          var l = h[0], s = h[1];
          if (s === 0)
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Ie(h) + ")");
          switch (o.storage()) {
            case "dense":
              c = r(o, l, s);
              break;
            case "sparse":
              c = a(o, l, s);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + Ie(h) + ")");
    }
    return c;
  }
  function r(o, h, c) {
    for (var l = o._data, s = [], u, f = 0; f < c; f++) {
      u = s[f] = [];
      for (var p = 0; p < h; p++)
        u[p] = Ce(l[p][f]);
    }
    return o.createDenseMatrix({
      data: s,
      size: [c, h],
      datatype: o._datatype
    });
  }
  function a(o, h, c) {
    for (var l = o._values, s = o._index, u = o._ptr, f = l ? [] : void 0, p = [], D = [], v = [], m = 0; m < h; m++)
      v[m] = 0;
    var d, w, g;
    for (d = 0, w = s.length; d < w; d++)
      v[s[d]]++;
    for (var A = 0, F = 0; F < h; F++)
      D.push(A), A += v[F], v[F] = D[F];
    for (D.push(A), g = 0; g < c; g++)
      for (var y = u[g], C = u[g + 1], b = y; b < C; b++) {
        var E = v[s[b]]++;
        p[E] = g, l && (f[E] = Ce(l[b]));
      }
    return o.createSparseMatrix({
      values: f,
      index: p,
      ptr: D,
      size: [c, h],
      datatype: o._datatype
    });
  }
}), Yn = "ctranspose", Fc = ["typed", "transpose", "conj"], Cc = /* @__PURE__ */ ee(Yn, Fc, (e) => {
  var {
    typed: t,
    transpose: n,
    conj: i
  } = e;
  return t(Yn, {
    any: function(a) {
      return i(n(a));
    }
  });
}), Jn = "zeros", bc = ["typed", "config", "matrix", "BigNumber"], Mc = /* @__PURE__ */ ee(Jn, bc, (e) => {
  var {
    typed: t,
    config: n,
    matrix: i,
    BigNumber: r
  } = e;
  return t(Jn, {
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
    var s = o(c), u = s ? new r(0) : 0;
    if (h(c), l) {
      var f = i(l);
      return c.length > 0 ? f.resize(c, u) : f;
    } else {
      var p = [];
      return c.length > 0 ? ft(p, c, u) : p;
    }
  }
  function o(c) {
    var l = !1;
    return c.forEach(function(s, u, f) {
      Pe(s) && (l = !0, f[u] = s.toNumber());
    }), l;
  }
  function h(c) {
    c.forEach(function(l) {
      if (typeof l != "number" || !ze(l) || l < 0)
        throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), Sc = "numeric", xc = ["number", "?bignumber", "?fraction"], Nc = /* @__PURE__ */ ee(Sc, xc, (e) => {
  var {
    number: t,
    bignumber: n,
    fraction: i
  } = e, r = {
    string: !0,
    number: !0,
    BigNumber: !0,
    Fraction: !0
  }, a = {
    number: (o) => t(o),
    BigNumber: n ? (o) => n(o) : sa,
    Fraction: i ? (o) => i(o) : oc
  };
  return function(h) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", l = arguments.length > 2 ? arguments[2] : void 0;
    if (l !== void 0)
      throw new SyntaxError("numeric() takes one or two arguments");
    var s = lr(h);
    if (!(s in r))
      throw new TypeError("Cannot convert " + h + ' of type "' + s + '"; valid input types are ' + Object.keys(r).join(", "));
    if (!(c in a))
      throw new TypeError("Cannot convert " + h + ' to type "' + c + '"; valid output types are ' + Object.keys(a).join(", "));
    return c === s ? h : a[c](h);
  };
}), Qn = "divideScalar", Bc = ["typed", "numeric"], _c = /* @__PURE__ */ ee(Qn, Bc, (e) => {
  var {
    typed: t,
    numeric: n
  } = e;
  return t(Qn, {
    "number, number": function(r, a) {
      return r / a;
    },
    "Complex, Complex": function(r, a) {
      return r.div(a);
    },
    "BigNumber, BigNumber": function(r, a) {
      return r.div(a);
    },
    "Fraction, Fraction": function(r, a) {
      return r.div(a);
    },
    "Unit, number | Complex | Fraction | BigNumber | Unit": (i, r) => i.divide(r),
    "number | Fraction | Complex | BigNumber, Unit": (i, r) => r.divideInto(i)
  });
}), Xn = "pow", zc = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], Tc = /* @__PURE__ */ ee(Xn, zc, (e) => {
  var {
    typed: t,
    config: n,
    identity: i,
    multiply: r,
    matrix: a,
    inv: o,
    number: h,
    fraction: c,
    Complex: l
  } = e;
  return t(Xn, {
    "number, number": s,
    "Complex, Complex": function(D, v) {
      return D.pow(v);
    },
    "BigNumber, BigNumber": function(D, v) {
      return v.isInteger() || D >= 0 || n.predictable ? D.pow(v) : new l(D.toNumber(), 0).pow(v.toNumber(), 0);
    },
    "Fraction, Fraction": function(D, v) {
      var m = D.pow(v);
      if (m != null)
        return m;
      if (n.predictable)
        throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
      return s(D.valueOf(), v.valueOf());
    },
    "Array, number": u,
    "Array, BigNumber": function(D, v) {
      return u(D, v.toNumber());
    },
    "Matrix, number": f,
    "Matrix, BigNumber": function(D, v) {
      return f(D, v.toNumber());
    },
    "Unit, number | BigNumber": function(D, v) {
      return D.pow(v);
    }
  });
  function s(p, D) {
    if (n.predictable && !ze(D) && p < 0)
      try {
        var v = c(D), m = h(v);
        if ((D === m || Math.abs((D - m) / D) < 1e-14) && v.d % 2 === 1)
          return (v.n % 2 === 0 ? 1 : -1) * Math.pow(-p, D);
      } catch {
      }
    return n.predictable && (p < -1 && D === 1 / 0 || p > -1 && p < 0 && D === -1 / 0) ? NaN : ze(D) || p >= 0 || n.predictable ? ra(p, D) : p * p < 1 && D === 1 / 0 || p * p > 1 && D === -1 / 0 ? 0 : new l(p, 0).pow(D, 0);
  }
  function u(p, D) {
    if (!ze(D))
      throw new TypeError("For A^b, b must be an integer (value is " + D + ")");
    var v = $e(p);
    if (v.length !== 2)
      throw new Error("For A^b, A must be 2 dimensional (A has " + v.length + " dimensions)");
    if (v[0] !== v[1])
      throw new Error("For A^b, A must be square (size is " + v[0] + "x" + v[1] + ")");
    if (D < 0)
      try {
        return u(o(p), -D);
      } catch (w) {
        throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + D + ")") : w;
      }
    for (var m = i(v[0]).valueOf(), d = p; D >= 1; )
      (D & 1) === 1 && (m = r(d, m)), D >>= 1, d = r(d, d);
    return m;
  }
  function f(p, D) {
    return a(u(p.valueOf(), D));
  }
});
function St(e) {
  var {
    DenseMatrix: t
  } = e;
  return function(i, r, a) {
    var o = i.size();
    if (o.length !== 2)
      throw new RangeError("Matrix must be two dimensional (size: " + Ie(o) + ")");
    var h = o[0], c = o[1];
    if (h !== c)
      throw new RangeError("Matrix must be square (size: " + Ie(o) + ")");
    var l = [];
    if (_e(r)) {
      var s = r.size(), u = r._data;
      if (s.length === 1) {
        if (s[0] !== h)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var f = 0; f < h; f++)
          l[f] = [u[f]];
        return new t({
          data: l,
          size: [h, 1],
          datatype: r._datatype
        });
      }
      if (s.length === 2) {
        if (s[0] !== h || s[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (mi(r)) {
          if (a) {
            l = [];
            for (var p = 0; p < h; p++)
              l[p] = [u[p][0]];
            return new t({
              data: l,
              size: [h, 1],
              datatype: r._datatype
            });
          }
          return r;
        }
        if (gi(r)) {
          for (var D = 0; D < h; D++)
            l[D] = [0];
          for (var v = r._values, m = r._index, d = r._ptr, w = d[1], g = d[0]; g < w; g++) {
            var A = m[g];
            l[A][0] = v[g];
          }
          return new t({
            data: l,
            size: [h, 1],
            datatype: r._datatype
          });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Me(r)) {
      var F = $e(r);
      if (F.length === 1) {
        if (F[0] !== h)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var y = 0; y < h; y++)
          l[y] = [r[y]];
        return new t({
          data: l,
          size: [h, 1]
        });
      }
      if (F.length === 2) {
        if (F[0] !== h || F[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var C = 0; C < h; C++)
          l[C] = [r[C][0]];
        return new t({
          data: l,
          size: [h, 1]
        });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var Hn = "lsolve", Oc = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Ic = /* @__PURE__ */ ee(Hn, Oc, (e) => {
  var {
    typed: t,
    matrix: n,
    divideScalar: i,
    multiplyScalar: r,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: h
  } = e, c = St({
    DenseMatrix: h
  });
  return t(Hn, {
    "SparseMatrix, Array | Matrix": function(f, p) {
      return s(f, p);
    },
    "DenseMatrix, Array | Matrix": function(f, p) {
      return l(f, p);
    },
    "Array, Array | Matrix": function(f, p) {
      var D = n(f), v = l(D, p);
      return v.valueOf();
    }
  });
  function l(u, f) {
    f = c(u, f, !0);
    for (var p = f._data, D = u._size[0], v = u._size[1], m = [], d = u._data, w = 0; w < v; w++) {
      var g = p[w][0] || 0, A = void 0;
      if (o(g, 0))
        A = 0;
      else {
        var F = d[w][w];
        if (o(F, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        A = i(g, F);
        for (var y = w + 1; y < D; y++)
          p[y] = [a(p[y][0] || 0, r(A, d[y][w]))];
      }
      m[w] = [A];
    }
    return new h({
      data: m,
      size: [D, 1]
    });
  }
  function s(u, f) {
    f = c(u, f, !0);
    for (var p = f._data, D = u._size[0], v = u._size[1], m = u._values, d = u._index, w = u._ptr, g = [], A = 0; A < v; A++) {
      var F = p[A][0] || 0;
      if (o(F, 0))
        g[A] = [0];
      else {
        for (var y = 0, C = [], b = [], E = w[A], S = w[A + 1], M = E; M < S; M++) {
          var x = d[M];
          x === A ? y = m[M] : x > A && (C.push(m[M]), b.push(x));
        }
        if (o(y, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = i(F, y), T = 0, I = b.length; T < I; T++) {
          var B = b[T];
          p[B] = [a(p[B][0] || 0, r(O, C[T]))];
        }
        g[A] = [O];
      }
    }
    return new h({
      data: g,
      size: [D, 1]
    });
  }
}), Kn = "usolve", Lc = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], $c = /* @__PURE__ */ ee(Kn, Lc, (e) => {
  var {
    typed: t,
    matrix: n,
    divideScalar: i,
    multiplyScalar: r,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: h
  } = e, c = St({
    DenseMatrix: h
  });
  return t(Kn, {
    "SparseMatrix, Array | Matrix": function(f, p) {
      return s(f, p);
    },
    "DenseMatrix, Array | Matrix": function(f, p) {
      return l(f, p);
    },
    "Array, Array | Matrix": function(f, p) {
      var D = n(f), v = l(D, p);
      return v.valueOf();
    }
  });
  function l(u, f) {
    f = c(u, f, !0);
    for (var p = f._data, D = u._size[0], v = u._size[1], m = [], d = u._data, w = v - 1; w >= 0; w--) {
      var g = p[w][0] || 0, A = void 0;
      if (o(g, 0))
        A = 0;
      else {
        var F = d[w][w];
        if (o(F, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        A = i(g, F);
        for (var y = w - 1; y >= 0; y--)
          p[y] = [a(p[y][0] || 0, r(A, d[y][w]))];
      }
      m[w] = [A];
    }
    return new h({
      data: m,
      size: [D, 1]
    });
  }
  function s(u, f) {
    f = c(u, f, !0);
    for (var p = f._data, D = u._size[0], v = u._size[1], m = u._values, d = u._index, w = u._ptr, g = [], A = v - 1; A >= 0; A--) {
      var F = p[A][0] || 0;
      if (o(F, 0))
        g[A] = [0];
      else {
        for (var y = 0, C = [], b = [], E = w[A], S = w[A + 1], M = S - 1; M >= E; M--) {
          var x = d[M];
          x === A ? y = m[M] : x < A && (C.push(m[M]), b.push(x));
        }
        if (o(y, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = i(F, y), T = 0, I = b.length; T < I; T++) {
          var B = b[T];
          p[B] = [a(p[B][0], r(O, C[T]))];
        }
        g[A] = [O];
      }
    }
    return new h({
      data: g,
      size: [D, 1]
    });
  }
}), Wn = "usolveAll", qc = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Pc = /* @__PURE__ */ ee(Wn, qc, (e) => {
  var {
    typed: t,
    matrix: n,
    divideScalar: i,
    multiplyScalar: r,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: h
  } = e, c = St({
    DenseMatrix: h
  });
  return t(Wn, {
    "SparseMatrix, Array | Matrix": function(f, p) {
      return s(f, p);
    },
    "DenseMatrix, Array | Matrix": function(f, p) {
      return l(f, p);
    },
    "Array, Array | Matrix": function(f, p) {
      var D = n(f), v = l(D, p);
      return v.map((m) => m.valueOf());
    }
  });
  function l(u, f) {
    for (var p = [c(u, f, !0)._data.map((b) => b[0])], D = u._data, v = u._size[0], m = u._size[1], d = m - 1; d >= 0; d--)
      for (var w = p.length, g = 0; g < w; g++) {
        var A = p[g];
        if (o(D[d][d], 0))
          if (o(A[d], 0)) {
            if (g === 0) {
              var y = [...A];
              y[d] = 1;
              for (var C = d - 1; C >= 0; C--)
                y[C] = a(y[C], D[C][d]);
              p.push(y);
            }
          } else {
            if (g === 0)
              return [];
            p.splice(g, 1), g -= 1, w -= 1;
          }
        else {
          A[d] = i(A[d], D[d][d]);
          for (var F = d - 1; F >= 0; F--)
            A[F] = a(A[F], r(A[d], D[F][d]));
        }
      }
    return p.map((b) => new h({
      data: b.map((E) => [E]),
      size: [v, 1]
    }));
  }
  function s(u, f) {
    for (var p = [c(u, f, !0)._data.map((K) => K[0])], D = u._size[0], v = u._size[1], m = u._values, d = u._index, w = u._ptr, g = v - 1; g >= 0; g--)
      for (var A = p.length, F = 0; F < A; F++) {
        for (var y = p[F], C = [], b = [], E = w[g], S = w[g + 1], M = 0, x = S - 1; x >= E; x--) {
          var O = d[x];
          O === g ? M = m[x] : O < g && (C.push(m[x]), b.push(O));
        }
        if (o(M, 0))
          if (o(y[g], 0)) {
            if (F === 0) {
              var G = [...y];
              G[g] = 1;
              for (var $ = 0, z = b.length; $ < z; $++) {
                var V = b[$];
                G[V] = a(G[V], C[$]);
              }
              p.push(G);
            }
          } else {
            if (F === 0)
              return [];
            p.splice(F, 1), F -= 1, A -= 1;
          }
        else {
          y[g] = i(y[g], M);
          for (var T = 0, I = b.length; T < I; T++) {
            var B = b[T];
            y[B] = a(y[B], r(y[g], C[T]));
          }
        }
      }
    return p.map((K) => new h({
      data: K.map((P) => [P]),
      size: [D, 1]
    }));
  }
}), dt = "equal", Rc = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], Uc = /* @__PURE__ */ ee(dt, Rc, (e) => {
  var {
    typed: t,
    matrix: n,
    equalScalar: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: t
  }), h = Kr({
    typed: t,
    DenseMatrix: r
  }), c = Pr({
    typed: t,
    DenseMatrix: r
  }), l = Mr({
    typed: t,
    matrix: n,
    concat: a
  });
  return t(dt, Vc({
    typed: t,
    equalScalar: i
  }), l({
    elop: i,
    SS: h,
    DS: o,
    Ss: c
  }));
}), Vc = ee(dt, ["typed", "equalScalar"], (e) => {
  var {
    typed: t,
    equalScalar: n
  } = e;
  return t(dt, {
    "any, any": function(r, a) {
      return r === null ? a === null : a === null ? r === null : r === void 0 ? a === void 0 : a === void 0 ? r === void 0 : n(r, a);
    }
  });
}), mt = "smaller", Zc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Gc = /* @__PURE__ */ ee(mt, Zc, (e) => {
  var {
    typed: t,
    config: n,
    matrix: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: t
  }), h = Kr({
    typed: t,
    DenseMatrix: r
  }), c = Pr({
    typed: t,
    DenseMatrix: r
  }), l = Mr({
    typed: t,
    matrix: i,
    concat: a
  }), s = Hr({
    typed: t
  });
  return t(mt, Yc({
    typed: t,
    config: n
  }), {
    "boolean, boolean": (u, f) => u < f,
    "BigNumber, BigNumber": function(f, p) {
      return f.lt(p) && !Xr(f, p, n.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) === -1,
    "Complex, Complex": function(f, p) {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, l({
    SS: h,
    DS: o,
    Ss: c
  }));
}), Yc = /* @__PURE__ */ ee(mt, ["typed", "config"], (e) => {
  var {
    typed: t,
    config: n
  } = e;
  return t(mt, {
    "number, number": function(r, a) {
      return r < a && !wr(r, a, n.epsilon);
    }
  });
}), gt = "smallerEq", Jc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Qc = /* @__PURE__ */ ee(gt, Jc, (e) => {
  var {
    typed: t,
    config: n,
    matrix: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: t
  }), h = Kr({
    typed: t,
    DenseMatrix: r
  }), c = Pr({
    typed: t,
    DenseMatrix: r
  }), l = Mr({
    typed: t,
    matrix: i,
    concat: a
  }), s = Hr({
    typed: t
  });
  return t(gt, Xc({
    typed: t,
    config: n
  }), {
    "boolean, boolean": (u, f) => u <= f,
    "BigNumber, BigNumber": function(f, p) {
      return f.lte(p) || Xr(f, p, n.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) !== 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, l({
    SS: h,
    DS: o,
    Ss: c
  }));
}), Xc = /* @__PURE__ */ ee(gt, ["typed", "config"], (e) => {
  var {
    typed: t,
    config: n
  } = e;
  return t(gt, {
    "number, number": function(r, a) {
      return r <= a || wr(r, a, n.epsilon);
    }
  });
}), Dt = "larger", Hc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Kc = /* @__PURE__ */ ee(Dt, Hc, (e) => {
  var {
    typed: t,
    config: n,
    matrix: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: t
  }), h = Kr({
    typed: t,
    DenseMatrix: r
  }), c = Pr({
    typed: t,
    DenseMatrix: r
  }), l = Mr({
    typed: t,
    matrix: i,
    concat: a
  }), s = Hr({
    typed: t
  });
  return t(Dt, Wc({
    typed: t,
    config: n
  }), {
    "boolean, boolean": (u, f) => u > f,
    "BigNumber, BigNumber": function(f, p) {
      return f.gt(p) && !Xr(f, p, n.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) === 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, l({
    SS: h,
    DS: o,
    Ss: c
  }));
}), Wc = /* @__PURE__ */ ee(Dt, ["typed", "config"], (e) => {
  var {
    typed: t,
    config: n
  } = e;
  return t(Dt, {
    "number, number": function(r, a) {
      return r > a && !wr(r, a, n.epsilon);
    }
  });
}), yt = "largerEq", kc = ["typed", "config", "matrix", "DenseMatrix", "concat"], jc = /* @__PURE__ */ ee(yt, kc, (e) => {
  var {
    typed: t,
    config: n,
    matrix: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: t
  }), h = Kr({
    typed: t,
    DenseMatrix: r
  }), c = Pr({
    typed: t,
    DenseMatrix: r
  }), l = Mr({
    typed: t,
    matrix: i,
    concat: a
  }), s = Hr({
    typed: t
  });
  return t(yt, el({
    typed: t,
    config: n
  }), {
    "boolean, boolean": (u, f) => u >= f,
    "BigNumber, BigNumber": function(f, p) {
      return f.gte(p) || Xr(f, p, n.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) !== -1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, l({
    SS: h,
    DS: o,
    Ss: c
  }));
}), el = /* @__PURE__ */ ee(yt, ["typed", "config"], (e) => {
  var {
    typed: t,
    config: n
  } = e;
  return t(yt, {
    "number, number": function(r, a) {
      return r >= a || wr(r, a, n.epsilon);
    }
  });
}), rl = "ImmutableDenseMatrix", tl = ["smaller", "DenseMatrix"], nl = /* @__PURE__ */ ee(rl, tl, (e) => {
  var {
    smaller: t,
    DenseMatrix: n
  } = e;
  function i(r, a) {
    if (!(this instanceof i))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (a && !tr(a))
      throw new Error("Invalid datatype: " + a);
    if (_e(r) || Me(r)) {
      var o = new n(r, a);
      this._data = o._data, this._size = o._size, this._datatype = o._datatype, this._min = null, this._max = null;
    } else if (r && Me(r.data) && Me(r.size))
      this._data = r.data, this._size = r.size, this._datatype = r.datatype, this._min = typeof r.min < "u" ? r.min : null, this._max = typeof r.max < "u" ? r.max : null;
    else {
      if (r)
        throw new TypeError("Unsupported type of data (" + lr(r) + ")");
      this._data = [], this._size = [0], this._datatype = a, this._min = null, this._max = null;
    }
  }
  return i.prototype = new n(), i.prototype.type = "ImmutableDenseMatrix", i.prototype.isImmutableDenseMatrix = !0, i.prototype.subset = function(r) {
    switch (arguments.length) {
      case 1: {
        var a = n.prototype.subset.call(this, r);
        return _e(a) ? new i({
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
      data: Ce(this._data),
      size: Ce(this._size),
      datatype: this._datatype
    });
  }, i.prototype.toJSON = function() {
    return {
      mathjs: "ImmutableDenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, i.fromJSON = function(r) {
    return new i(r);
  }, i.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  }, i.prototype.min = function() {
    if (this._min === null) {
      var r = null;
      this.forEach(function(a) {
        (r === null || t(a, r)) && (r = a);
      }), this._min = r !== null ? r : void 0;
    }
    return this._min;
  }, i.prototype.max = function() {
    if (this._max === null) {
      var r = null;
      this.forEach(function(a) {
        (r === null || t(r, a)) && (r = a);
      }), this._max = r !== null ? r : void 0;
    }
    return this._max;
  }, i;
}, {
  isClass: !0
}), il = "Index", al = ["ImmutableDenseMatrix", "getMatrixDataType"], ul = /* @__PURE__ */ ee(il, al, (e) => {
  var {
    ImmutableDenseMatrix: t,
    getMatrixDataType: n
  } = e;
  function i(a) {
    if (!(this instanceof i))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = !0;
    for (var o = 0, h = arguments.length; o < h; o++) {
      var c = arguments[o], l = Me(c), s = _e(c), u = null;
      if (Di(c))
        this._dimensions.push(c), this._isScalar = !1;
      else if (l || s) {
        var f = void 0;
        n(c) === "boolean" ? (l && (f = r(kn(c).valueOf())), s && (f = r(kn(c._data).valueOf())), u = c.valueOf().length) : f = r(c.valueOf()), this._dimensions.push(f);
        var p = f.size();
        (p.length !== 1 || p[0] !== 1 || u !== null) && (this._isScalar = !1);
      } else if (typeof c == "number")
        this._dimensions.push(r([c]));
      else if (typeof c == "string")
        this._dimensions.push(c);
      else
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      this._sourceSize.push(u);
    }
  }
  i.prototype.type = "Index", i.prototype.isIndex = !0;
  function r(a) {
    for (var o = 0, h = a.length; o < h; o++)
      if (typeof a[o] != "number" || !ze(a[o]))
        throw new TypeError("Index parameters must be positive integer numbers");
    return new t(a);
  }
  return i.prototype.clone = function() {
    var a = new i();
    return a._dimensions = Ce(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
  }, i.create = function(a) {
    var o = new i();
    return i.apply(o, a), o;
  }, i.prototype.size = function() {
    for (var a = [], o = 0, h = this._dimensions.length; o < h; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? 1 : c.size()[0];
    }
    return a;
  }, i.prototype.max = function() {
    for (var a = [], o = 0, h = this._dimensions.length; o < h; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? c : c.max();
    }
    return a;
  }, i.prototype.min = function() {
    for (var a = [], o = 0, h = this._dimensions.length; o < h; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? c : c.min();
    }
    return a;
  }, i.prototype.forEach = function(a) {
    for (var o = 0, h = this._dimensions.length; o < h; o++)
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
    for (var a = [], o = 0, h = this._dimensions.length; o < h; o++) {
      var c = this._dimensions[o];
      a.push(typeof c == "string" ? c : c.toArray());
    }
    return a;
  }, i.prototype.valueOf = i.prototype.toArray, i.prototype.toString = function() {
    for (var a = [], o = 0, h = this._dimensions.length; o < h; o++) {
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
function kn(e) {
  var t = [];
  return e.forEach((n, i) => {
    n && t.push(i);
  }), t;
}
var ol = "FibonacciHeap", sl = ["smaller", "larger"], fl = /* @__PURE__ */ ee(ol, sl, (e) => {
  var {
    smaller: t,
    larger: n
  } = e, i = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function r() {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  r.prototype.type = "FibonacciHeap", r.prototype.isFibonacciHeap = !0, r.prototype.insert = function(s, u) {
    var f = {
      key: s,
      value: u,
      degree: 0
    };
    if (this._minimum) {
      var p = this._minimum;
      f.left = p, f.right = p.right, p.right = f, f.right.left = f, t(s, p.key) && (this._minimum = f);
    } else
      f.left = f, f.right = f, this._minimum = f;
    return this._size++, f;
  }, r.prototype.size = function() {
    return this._size;
  }, r.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, r.prototype.isEmpty = function() {
    return this._size === 0;
  }, r.prototype.extractMinimum = function() {
    var s = this._minimum;
    if (s === null)
      return s;
    for (var u = this._minimum, f = s.degree, p = s.child; f > 0; ) {
      var D = p.right;
      p.left.right = p.right, p.right.left = p.left, p.left = u, p.right = u.right, u.right = p, p.right.left = p, p.parent = null, p = D, f--;
    }
    return s.left.right = s.right, s.right.left = s.left, s === s.right ? u = null : (u = s.right, u = l(u, this._size)), this._size--, this._minimum = u, s;
  }, r.prototype.remove = function(s) {
    this._minimum = a(this._minimum, s, -1), this.extractMinimum();
  };
  function a(s, u, f) {
    u.key = f;
    var p = u.parent;
    return p && t(u.key, p.key) && (o(s, u, p), h(s, p)), t(u.key, s.key) && (s = u), s;
  }
  function o(s, u, f) {
    u.left.right = u.right, u.right.left = u.left, f.degree--, f.child === u && (f.child = u.right), f.degree === 0 && (f.child = null), u.left = s, u.right = s.right, s.right = u, u.right.left = u, u.parent = null, u.mark = !1;
  }
  function h(s, u) {
    var f = u.parent;
    f && (u.mark ? (o(s, u, f), h(f)) : u.mark = !0);
  }
  var c = function(u, f) {
    u.left.right = u.right, u.right.left = u.left, u.parent = f, f.child ? (u.left = f.child, u.right = f.child.right, f.child.right = u, u.right.left = u) : (f.child = u, u.right = u, u.left = u), f.degree++, u.mark = !1;
  };
  function l(s, u) {
    var f = Math.floor(Math.log(u) * i) + 1, p = new Array(f), D = 0, v = s;
    if (v)
      for (D++, v = v.right; v !== s; )
        D++, v = v.right;
    for (var m; D > 0; ) {
      for (var d = v.degree, w = v.right; m = p[d], !!m; ) {
        if (n(v.key, m.key)) {
          var g = m;
          m = v, v = g;
        }
        c(m, v), p[d] = null, d++;
      }
      p[d] = v, v = w, D--;
    }
    s = null;
    for (var A = 0; A < f; A++)
      m = p[A], m && (s ? (m.left.right = m.right, m.right.left = m.left, m.left = s, m.right = s.right, s.right = m, m.right.left = m, t(m.key, s.key) && (s = m)) : s = m);
    return s;
  }
  return r;
}, {
  isClass: !0
}), cl = "Spa", ll = ["addScalar", "equalScalar", "FibonacciHeap"], hl = /* @__PURE__ */ ee(cl, ll, (e) => {
  var {
    addScalar: t,
    equalScalar: n,
    FibonacciHeap: i
  } = e;
  function r() {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new i();
  }
  return r.prototype.type = "Spa", r.prototype.isSpa = !0, r.prototype.set = function(a, o) {
    if (this._values[a])
      this._values[a].value = o;
    else {
      var h = this._heap.insert(a, o);
      this._values[a] = h;
    }
  }, r.prototype.get = function(a) {
    var o = this._values[a];
    return o ? o.value : 0;
  }, r.prototype.accumulate = function(a, o) {
    var h = this._values[a];
    h ? h.value = t(h.value, o) : (h = this._heap.insert(a, o), this._values[a] = h);
  }, r.prototype.forEach = function(a, o, h) {
    var c = this._heap, l = this._values, s = [], u = c.extractMinimum();
    for (u && s.push(u); u && u.key <= o; )
      u.key >= a && (n(u.value, 0) || h(u.key, u.value, this)), u = c.extractMinimum(), u && s.push(u);
    for (var f = 0; f < s.length; f++) {
      var p = s[f];
      u = c.insert(p.key, p.value), l[u.key] = u;
    }
  }, r.prototype.swap = function(a, o) {
    var h = this._values[a], c = this._values[o];
    if (!h && c)
      h = this._heap.insert(a, c.value), this._heap.remove(c), this._values[a] = h, this._values[o] = void 0;
    else if (h && !c)
      c = this._heap.insert(o, h.value), this._heap.remove(h), this._values[o] = c, this._values[a] = void 0;
    else if (h && c) {
      var l = h.value;
      h.value = c.value, c.value = l;
    }
  }, r;
}, {
  isClass: !0
}), vl = "atan", pl = ["typed"], dl = /* @__PURE__ */ ee(vl, pl, (e) => {
  var {
    typed: t
  } = e;
  return t("atan", {
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
}), ca = /* @__PURE__ */ ee("trigUnit", ["typed"], (e) => {
  var {
    typed: t
  } = e;
  return {
    Unit: t.referToSelf((n) => (i) => {
      if (!i.hasBase(i.constructor.BASE_UNITS.ANGLE))
        throw new TypeError("Unit in function cot is no angle");
      return t.find(n, i.valueType())(i.value);
    })
  };
}), jn = "cos", ml = ["typed"], gl = /* @__PURE__ */ ee(jn, ml, (e) => {
  var {
    typed: t
  } = e, n = ca({
    typed: t
  });
  return t(jn, {
    number: Math.cos,
    "Complex | BigNumber": (i) => i.cos()
  }, n);
}), ei = "sin", Dl = ["typed"], yl = /* @__PURE__ */ ee(ei, Dl, (e) => {
  var {
    typed: t
  } = e, n = ca({
    typed: t
  });
  return t(ei, {
    number: Math.sin,
    "Complex | BigNumber": (i) => i.sin()
  }, n);
}), ri = "add", wl = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], Al = /* @__PURE__ */ ee(ri, wl, (e) => {
  var {
    typed: t,
    matrix: n,
    addScalar: i,
    equalScalar: r,
    DenseMatrix: a,
    SparseMatrix: o,
    concat: h
  } = e, c = ua({
    typed: t
  }), l = Mf({
    typed: t,
    equalScalar: r
  }), s = oa({
    typed: t,
    DenseMatrix: a
  }), u = Mr({
    typed: t,
    matrix: n,
    concat: h
  });
  return t(ri, {
    "any, any": i,
    "any, any, ...any": t.referToSelf((f) => (p, D, v) => {
      for (var m = f(p, D), d = 0; d < v.length; d++)
        m = f(m, v[d]);
      return m;
    })
  }, u({
    elop: i,
    DS: c,
    SS: l,
    Ss: s
  }));
}), ti = "norm", El = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], Fl = /* @__PURE__ */ ee(ti, El, (e) => {
  var {
    typed: t,
    abs: n,
    add: i,
    pow: r,
    conj: a,
    sqrt: o,
    multiply: h,
    equalScalar: c,
    larger: l,
    smaller: s,
    matrix: u,
    ctranspose: f,
    eigs: p
  } = e;
  return t(ti, {
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
    "Array, number | BigNumber | string": function(b, E) {
      return y(u(b), E);
    },
    "Matrix, number | BigNumber | string": function(b, E) {
      return y(b, E);
    }
  });
  function D(C) {
    var b = 0;
    return C.forEach(function(E) {
      var S = n(E);
      l(S, b) && (b = S);
    }, !0), b;
  }
  function v(C) {
    var b;
    return C.forEach(function(E) {
      var S = n(E);
      (!b || s(S, b)) && (b = S);
    }, !0), b || 0;
  }
  function m(C, b) {
    if (b === Number.POSITIVE_INFINITY || b === "inf")
      return D(C);
    if (b === Number.NEGATIVE_INFINITY || b === "-inf")
      return v(C);
    if (b === "fro")
      return y(C, 2);
    if (typeof b == "number" && !isNaN(b)) {
      if (!c(b, 0)) {
        var E = 0;
        return C.forEach(function(S) {
          E = i(r(n(S), b), E);
        }, !0), r(E, 1 / b);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function d(C) {
    var b = 0;
    return C.forEach(function(E, S) {
      b = i(b, h(E, a(E)));
    }), n(o(b));
  }
  function w(C) {
    var b = [], E = 0;
    return C.forEach(function(S, M) {
      var x = M[1], O = i(b[x] || 0, n(S));
      l(O, E) && (E = O), b[x] = O;
    }, !0), E;
  }
  function g(C) {
    var b = C.size();
    if (b[0] !== b[1])
      throw new RangeError("Invalid matrix dimensions");
    var E = f(C), S = h(E, C), M = p(S).values.toArray(), x = M[M.length - 1];
    return n(o(x));
  }
  function A(C) {
    var b = [], E = 0;
    return C.forEach(function(S, M) {
      var x = M[0], O = i(b[x] || 0, n(S));
      l(O, E) && (E = O), b[x] = O;
    }, !0), E;
  }
  function F(C, b) {
    if (b === 1)
      return w(C);
    if (b === Number.POSITIVE_INFINITY || b === "inf")
      return A(C);
    if (b === "fro")
      return d(C);
    if (b === 2)
      return g(C);
    throw new Error("Unsupported parameter value " + b);
  }
  function y(C, b) {
    var E = C.size();
    if (E.length === 1)
      return m(C, b);
    if (E.length === 2) {
      if (E[0] && E[1])
        return F(C, b);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), ni = "dot", Cl = ["typed", "addScalar", "multiplyScalar", "conj", "size"], bl = /* @__PURE__ */ ee(ni, Cl, (e) => {
  var {
    typed: t,
    addScalar: n,
    multiplyScalar: i,
    conj: r,
    size: a
  } = e;
  return t(ni, {
    "Array | DenseMatrix, Array | DenseMatrix": h,
    "SparseMatrix, SparseMatrix": c
  });
  function o(s, u) {
    var f = l(s), p = l(u), D, v;
    if (f.length === 1)
      D = f[0];
    else if (f.length === 2 && f[1] === 1)
      D = f[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + f.join(", ") + ")");
    if (p.length === 1)
      v = p[0];
    else if (p.length === 2 && p[1] === 1)
      v = p[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + p.join(", ") + ")");
    if (D !== v)
      throw new RangeError("Vectors must have equal length (" + D + " != " + v + ")");
    if (D === 0)
      throw new RangeError("Cannot calculate the dot product of empty vectors");
    return D;
  }
  function h(s, u) {
    var f = o(s, u), p = _e(s) ? s._data : s, D = _e(s) ? s._datatype : void 0, v = _e(u) ? u._data : u, m = _e(u) ? u._datatype : void 0, d = l(s).length === 2, w = l(u).length === 2, g = n, A = i;
    if (D && m && D === m && typeof D == "string") {
      var F = D;
      g = t.find(n, [F, F]), A = t.find(i, [F, F]);
    }
    if (!d && !w) {
      for (var y = A(r(p[0]), v[0]), C = 1; C < f; C++)
        y = g(y, A(r(p[C]), v[C]));
      return y;
    }
    if (!d && w) {
      for (var b = A(r(p[0]), v[0][0]), E = 1; E < f; E++)
        b = g(b, A(r(p[E]), v[E][0]));
      return b;
    }
    if (d && !w) {
      for (var S = A(r(p[0][0]), v[0]), M = 1; M < f; M++)
        S = g(S, A(r(p[M][0]), v[M]));
      return S;
    }
    if (d && w) {
      for (var x = A(r(p[0][0]), v[0][0]), O = 1; O < f; O++)
        x = g(x, A(r(p[O][0]), v[O][0]));
      return x;
    }
  }
  function c(s, u) {
    o(s, u);
    for (var f = s._index, p = s._values, D = u._index, v = u._values, m = 0, d = n, w = i, g = 0, A = 0; g < f.length && A < D.length; ) {
      var F = f[g], y = D[A];
      if (F < y) {
        g++;
        continue;
      }
      if (F > y) {
        A++;
        continue;
      }
      F === y && (m = d(m, w(p[g], v[A])), g++, A++);
    }
    return m;
  }
  function l(s) {
    return _e(s) ? s.size() : a(s);
  }
}), ii = "index", Ml = ["typed", "Index"], Sl = /* @__PURE__ */ ee(ii, Ml, (e) => {
  var {
    typed: t,
    Index: n
  } = e;
  return t(ii, {
    "...number | string | BigNumber | Range | Array | Matrix": function(r) {
      var a = r.map(function(h) {
        return Pe(h) ? h.toNumber() : Me(h) || _e(h) ? h.map(function(c) {
          return Pe(c) ? c.toNumber() : c;
        }) : h;
      }), o = new n();
      return n.apply(o, a), o;
    }
  });
}), ai = "lup", xl = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], Nl = /* @__PURE__ */ ee(ai, xl, (e) => {
  var {
    typed: t,
    matrix: n,
    abs: i,
    addScalar: r,
    divideScalar: a,
    multiplyScalar: o,
    subtractScalar: h,
    larger: c,
    equalScalar: l,
    unaryMinus: s,
    DenseMatrix: u,
    SparseMatrix: f,
    Spa: p
  } = e;
  return t(ai, {
    DenseMatrix: function(d) {
      return D(d);
    },
    SparseMatrix: function(d) {
      return v(d);
    },
    Array: function(d) {
      var w = n(d), g = D(w);
      return {
        L: g.L.valueOf(),
        U: g.U.valueOf(),
        p: g.p
      };
    }
  });
  function D(m) {
    var d = m._size[0], w = m._size[1], g = Math.min(d, w), A = Ce(m._data), F = [], y = [d, g], C = [], b = [g, w], E, S, M, x = [];
    for (E = 0; E < d; E++)
      x[E] = E;
    for (S = 0; S < w; S++) {
      if (S > 0)
        for (E = 0; E < d; E++) {
          var O = Math.min(E, S), T = 0;
          for (M = 0; M < O; M++)
            T = r(T, o(A[E][M], A[M][S]));
          A[E][S] = h(A[E][S], T);
        }
      var I = S, B = 0, G = 0;
      for (E = S; E < d; E++) {
        var $ = A[E][S], z = i($);
        c(z, B) && (I = E, B = z, G = $);
      }
      if (S !== I && (x[S] = [x[I], x[I] = x[S]][0], u._swapRows(S, I, A)), S < d)
        for (E = S + 1; E < d; E++) {
          var V = A[E][S];
          l(V, 0) || (A[E][S] = a(A[E][S], G));
        }
    }
    for (S = 0; S < w; S++)
      for (E = 0; E < d; E++) {
        if (S === 0 && (E < w && (C[E] = []), F[E] = []), E < S) {
          E < w && (C[E][S] = A[E][S]), S < d && (F[E][S] = 0);
          continue;
        }
        if (E === S) {
          E < w && (C[E][S] = A[E][S]), S < d && (F[E][S] = 1);
          continue;
        }
        E < w && (C[E][S] = 0), S < d && (F[E][S] = A[E][S]);
      }
    var K = new u({
      data: F,
      size: y
    }), P = new u({
      data: C,
      size: b
    }), q = [];
    for (E = 0, g = x.length; E < g; E++)
      q[x[E]] = E;
    return {
      L: K,
      U: P,
      p: q,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
  function v(m) {
    var d = m._size[0], w = m._size[1], g = Math.min(d, w), A = m._values, F = m._index, y = m._ptr, C = [], b = [], E = [], S = [d, g], M = [], x = [], O = [], T = [g, w], I, B, G, $ = [], z = [];
    for (I = 0; I < d; I++)
      $[I] = I, z[I] = I;
    var V = function(q, Z) {
      var ne = z[q], k = z[Z];
      $[ne] = Z, $[k] = q, z[q] = k, z[Z] = ne;
    }, K = function() {
      var q = new p();
      B < d && (E.push(C.length), C.push(1), b.push(B)), O.push(M.length);
      var Z = y[B], ne = y[B + 1];
      for (G = Z; G < ne; G++)
        I = F[G], q.set($[I], A[G]);
      B > 0 && q.forEach(0, B - 1, function(X, J) {
        f._forEachRow(X, C, b, E, function(ue, j) {
          ue > X && q.accumulate(ue, s(o(j, J)));
        });
      });
      var k = B, U = q.get(B), Q = i(U);
      q.forEach(B + 1, d - 1, function(X, J) {
        var ue = i(J);
        c(ue, Q) && (k = X, Q = ue, U = J);
      }), B !== k && (f._swapRows(B, k, S[1], C, b, E), f._swapRows(B, k, T[1], M, x, O), q.swap(B, k), V(B, k)), q.forEach(0, d - 1, function(X, J) {
        X <= B ? (M.push(J), x.push(X)) : (J = a(J, U), l(J, 0) || (C.push(J), b.push(X)));
      });
    };
    for (B = 0; B < w; B++)
      K();
    return O.push(M.length), E.push(C.length), {
      L: new f({
        values: C,
        index: b,
        ptr: E,
        size: S
      }),
      U: new f({
        values: M,
        index: x,
        ptr: O,
        size: T
      }),
      p: $,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
}), ui = "qr", Bl = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], _l = /* @__PURE__ */ ee(ui, Bl, (e) => {
  var {
    typed: t,
    matrix: n,
    zeros: i,
    identity: r,
    isZero: a,
    equal: o,
    sign: h,
    sqrt: c,
    conj: l,
    unaryMinus: s,
    addScalar: u,
    divideScalar: f,
    multiplyScalar: p,
    subtractScalar: D,
    complex: v
  } = e;
  return Or(t(ui, {
    DenseMatrix: function(A) {
      return d(A);
    },
    SparseMatrix: function(A) {
      return w();
    },
    Array: function(A) {
      var F = n(A), y = d(F);
      return {
        Q: y.Q.valueOf(),
        R: y.R.valueOf()
      };
    }
  }), {
    _denseQRimpl: m
  });
  function m(g) {
    var A = g._size[0], F = g._size[1], y = r([A], "dense"), C = y._data, b = g.clone(), E = b._data, S, M, x, O = i([A], "");
    for (x = 0; x < Math.min(F, A); ++x) {
      var T = E[x][x], I = s(o(T, 0) ? 1 : h(T)), B = l(I), G = 0;
      for (S = x; S < A; S++)
        G = u(G, p(E[S][x], l(E[S][x])));
      var $ = p(I, c(G));
      if (!a($)) {
        var z = D(T, $);
        for (O[x] = 1, S = x + 1; S < A; S++)
          O[S] = f(E[S][x], z);
        var V = s(l(f(z, $))), K = void 0;
        for (M = x; M < F; M++) {
          for (K = 0, S = x; S < A; S++)
            K = u(K, p(l(O[S]), E[S][M]));
          for (K = p(K, V), S = x; S < A; S++)
            E[S][M] = p(D(E[S][M], p(O[S], K)), B);
        }
        for (S = 0; S < A; S++) {
          for (K = 0, M = x; M < A; M++)
            K = u(K, p(C[S][M], O[M]));
          for (K = p(K, V), M = x; M < A; ++M)
            C[S][M] = f(D(C[S][M], p(K, l(O[M]))), B);
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
  function d(g) {
    var A = m(g), F = A.R._data;
    if (g._data.length > 0)
      for (var y = F[0][0].type === "Complex" ? v(0) : 0, C = 0; C < F.length; ++C)
        for (var b = 0; b < C && b < (F[0] || []).length; ++b)
          F[C][b] = y;
    return A;
  }
  function w(g) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function zl(e, t, n, i) {
  for (var r = e._values, a = e._index, o = e._ptr, h = e._size, c = e._datatype, l = h[0], s = h[1], u = i && e._values ? [] : null, f = [], p = [], D = 0, v = 0; v < s; v++) {
    p[v] = D;
    for (var m = n ? n[v] : v, d = o[m], w = o[m + 1], g = d; g < w; g++) {
      var A = t ? t[a[g]] : a[g];
      f[D] = A, u && (u[D] = r[g]), D++;
    }
  }
  return p[s] = D, e.createSparseMatrix({
    values: u,
    index: f,
    ptr: p,
    size: [l, s],
    datatype: c
  });
}
function la(e, t, n, i, r, a, o) {
  var h = 0;
  for (n[o] = e; h >= 0; ) {
    var c = n[o + h], l = n[i + c];
    l === -1 ? (h--, a[t++] = c) : (n[i + c] = n[r + l], ++h, n[o + h] = l);
  }
  return t;
}
function Tl(e, t) {
  if (!e)
    return null;
  var n = 0, i, r = [], a = [], o = 0, h = t, c = 2 * t;
  for (i = 0; i < t; i++)
    a[o + i] = -1;
  for (i = t - 1; i >= 0; i--)
    e[i] !== -1 && (a[h + i] = a[o + e[i]], a[o + e[i]] = i);
  for (i = 0; i < t; i++)
    e[i] === -1 && (n = la(i, n, a, o, h, r, c));
  return r;
}
function Ol(e, t) {
  if (!e)
    return null;
  var n = e._index, i = e._ptr, r = e._size, a = r[0], o = r[1], h = [], c = [], l = 0, s = o, u, f;
  if (t)
    for (u = 0; u < a; u++)
      c[s + u] = -1;
  for (var p = 0; p < o; p++) {
    h[p] = -1, c[l + p] = -1;
    for (var D = i[p], v = i[p + 1], m = D; m < v; m++) {
      var d = n[m];
      for (u = t ? c[s + d] : d; u !== -1 && u < p; u = f)
        f = c[l + u], c[l + u] = p, f === -1 && (h[u] = p);
      t && (c[s + d] = p);
    }
  }
  return h;
}
function Il(e, t, n) {
  for (var i = e._values, r = e._index, a = e._ptr, o = e._size, h = o[1], c = 0, l = 0; l < h; l++) {
    var s = a[l];
    for (a[l] = c; s < a[l + 1]; s++)
      t(r[s], l, i ? i[s] : 1, n) && (r[c] = r[s], i && (i[c] = i[s]), c++);
  }
  return a[h] = c, r.splice(c, r.length - c), i && i.splice(c, i.length - c), c;
}
function gr(e) {
  return -e - 2;
}
var Ll = "csAmd", $l = ["add", "multiply", "transpose"], ql = /* @__PURE__ */ ee(Ll, $l, (e) => {
  var {
    add: t,
    multiply: n,
    transpose: i
  } = e;
  return function(s, u) {
    if (!u || s <= 0 || s > 3)
      return null;
    var f = u._size, p = f[0], D = f[1], v = 0, m = Math.max(16, 10 * Math.sqrt(D));
    m = Math.min(D - 2, m);
    var d = r(s, u, p, D, m);
    Il(d, c, null);
    for (var w = d._index, g = d._ptr, A = g[D], F = [], y = [], C = 0, b = D + 1, E = 2 * (D + 1), S = 3 * (D + 1), M = 4 * (D + 1), x = 5 * (D + 1), O = 6 * (D + 1), T = 7 * (D + 1), I = F, B = a(D, g, y, C, S, I, E, T, b, O, M, x), G = o(D, g, y, x, M, O, m, b, S, I, E), $ = 0, z, V, K, P, q, Z, ne, k, U, Q, X, J, ue, j, oe, le; G < D; ) {
      for (K = -1; $ < D && (K = y[S + $]) === -1; $++)
        ;
      y[E + K] !== -1 && (I[y[E + K]] = -1), y[S + $] = y[E + K];
      var de = y[M + K], ge = y[b + K];
      G += ge;
      var we = 0;
      y[b + K] = -ge;
      var he = g[K], be = de === 0 ? he : A, Ee = be;
      for (P = 1; P <= de + 1; P++) {
        for (P > de ? (Z = K, ne = he, k = y[C + K] - de) : (Z = w[he++], ne = g[Z], k = y[C + Z]), q = 1; q <= k; q++)
          z = w[ne++], !((U = y[b + z]) <= 0) && (we += U, y[b + z] = -U, w[Ee++] = z, y[E + z] !== -1 && (I[y[E + z]] = I[z]), I[z] !== -1 ? y[E + I[z]] = y[E + z] : y[S + y[x + z]] = y[E + z]);
        Z !== K && (g[Z] = gr(K), y[O + Z] = 0);
      }
      for (de !== 0 && (A = Ee), y[x + K] = we, g[K] = be, y[C + K] = Ee - be, y[M + K] = -2, B = h(B, v, y, O, D), Q = be; Q < Ee; Q++)
        if (z = w[Q], !((X = y[M + z]) <= 0)) {
          U = -y[b + z];
          var Se = B - U;
          for (he = g[z], J = g[z] + X - 1; he <= J; he++)
            Z = w[he], y[O + Z] >= B ? y[O + Z] -= U : y[O + Z] !== 0 && (y[O + Z] = y[x + Z] + Se);
        }
      for (Q = be; Q < Ee; Q++) {
        for (z = w[Q], J = g[z], ue = J + y[M + z] - 1, j = J, oe = 0, le = 0, he = J; he <= ue; he++)
          if (Z = w[he], y[O + Z] !== 0) {
            var Ue = y[O + Z] - B;
            Ue > 0 ? (le += Ue, w[j++] = Z, oe += Z) : (g[Z] = gr(K), y[O + Z] = 0);
          }
        y[M + z] = j - J + 1;
        var N = j, _ = J + y[C + z];
        for (he = ue + 1; he < _; he++) {
          V = w[he];
          var L = y[b + V];
          L <= 0 || (le += L, w[j++] = V, oe += V);
        }
        le === 0 ? (g[z] = gr(K), U = -y[b + z], we -= U, ge += U, G += U, y[b + z] = 0, y[M + z] = -1) : (y[x + z] = Math.min(y[x + z], le), w[j] = w[N], w[N] = w[J], w[J] = K, y[C + z] = j - J + 1, oe = (oe < 0 ? -oe : oe) % D, y[E + z] = y[T + oe], y[T + oe] = z, I[z] = oe);
      }
      for (y[x + K] = we, v = Math.max(v, we), B = h(B + v, v, y, O, D), Q = be; Q < Ee; Q++)
        if (z = w[Q], !(y[b + z] >= 0))
          for (oe = I[z], z = y[T + oe], y[T + oe] = -1; z !== -1 && y[E + z] !== -1; z = y[E + z], B++) {
            for (k = y[C + z], X = y[M + z], he = g[z] + 1; he <= g[z] + k - 1; he++)
              y[O + w[he]] = B;
            var R = z;
            for (V = y[E + z]; V !== -1; ) {
              var H = y[C + V] === k && y[M + V] === X;
              for (he = g[V] + 1; H && he <= g[V] + k - 1; he++)
                y[O + w[he]] !== B && (H = 0);
              H ? (g[V] = gr(z), y[b + z] += y[b + V], y[b + V] = 0, y[M + V] = -1, V = y[E + V], y[E + R] = V) : (R = V, V = y[E + V]);
            }
          }
      for (he = be, Q = be; Q < Ee; Q++)
        z = w[Q], !((U = -y[b + z]) <= 0) && (y[b + z] = U, le = y[x + z] + we - U, le = Math.min(le, D - G - U), y[S + le] !== -1 && (I[y[S + le]] = z), y[E + z] = y[S + le], I[z] = -1, y[S + le] = z, $ = Math.min($, le), y[x + z] = le, w[he++] = z);
      y[b + K] = ge, (y[C + K] = he - be) === 0 && (g[K] = -1, y[O + K] = 0), de !== 0 && (A = he);
    }
    for (z = 0; z < D; z++)
      g[z] = gr(g[z]);
    for (V = 0; V <= D; V++)
      y[S + V] = -1;
    for (V = D; V >= 0; V--)
      y[b + V] > 0 || (y[E + V] = y[S + g[V]], y[S + g[V]] = V);
    for (Z = D; Z >= 0; Z--)
      y[b + Z] <= 0 || g[Z] !== -1 && (y[E + Z] = y[S + g[Z]], y[S + g[Z]] = Z);
    for (K = 0, z = 0; z <= D; z++)
      g[z] === -1 && (K = la(z, K, y, S, E, F, O));
    return F.splice(F.length - 1, 1), F;
  };
  function r(l, s, u, f, p) {
    var D = i(s);
    if (l === 1 && f === u)
      return t(s, D);
    if (l === 2) {
      for (var v = D._index, m = D._ptr, d = 0, w = 0; w < u; w++) {
        var g = m[w];
        if (m[w] = d, !(m[w + 1] - g > p))
          for (var A = m[w + 1]; g < A; g++)
            v[d++] = v[g];
      }
      return m[u] = d, s = i(D), n(D, s);
    }
    return n(D, s);
  }
  function a(l, s, u, f, p, D, v, m, d, w, g, A) {
    for (var F = 0; F < l; F++)
      u[f + F] = s[F + 1] - s[F];
    u[f + l] = 0;
    for (var y = 0; y <= l; y++)
      u[p + y] = -1, D[y] = -1, u[v + y] = -1, u[m + y] = -1, u[d + y] = 1, u[w + y] = 1, u[g + y] = 0, u[A + y] = u[f + y];
    var C = h(0, 0, u, w, l);
    return u[g + l] = -2, s[l] = -1, u[w + l] = 0, C;
  }
  function o(l, s, u, f, p, D, v, m, d, w, g) {
    for (var A = 0, F = 0; F < l; F++) {
      var y = u[f + F];
      if (y === 0)
        u[p + F] = -2, A++, s[F] = -1, u[D + F] = 0;
      else if (y > v)
        u[m + F] = 0, u[p + F] = -1, A++, s[F] = gr(l), u[m + l]++;
      else {
        var C = u[d + y];
        C !== -1 && (w[C] = F), u[g + F] = u[d + y], u[d + y] = F;
      }
    }
    return A;
  }
  function h(l, s, u, f, p) {
    if (l < 2 || l + s < 0) {
      for (var D = 0; D < p; D++)
        u[f + D] !== 0 && (u[f + D] = 1);
      l = 2;
    }
    return l;
  }
  function c(l, s) {
    return l !== s;
  }
});
function Pl(e, t, n, i, r, a, o) {
  var h, c, l = 0, s;
  if (e <= t || n[i + t] <= n[r + e])
    return -1;
  n[r + e] = n[i + t];
  var u = n[a + e];
  if (n[a + e] = t, u === -1)
    l = 1, s = e;
  else {
    for (l = 2, s = u; s !== n[o + s]; s = n[o + s])
      ;
    for (h = u; h !== s; h = c)
      c = n[o + h], n[o + h] = s;
  }
  return {
    jleaf: l,
    q: s
  };
}
var Rl = "csCounts", Ul = ["transpose"], Vl = /* @__PURE__ */ ee(Rl, Ul, (e) => {
  var {
    transpose: t
  } = e;
  return function(n, i, r, a) {
    if (!n || !i || !r)
      return null;
    var o = n._size, h = o[0], c = o[1], l, s, u, f, p, D, v, m = 4 * c + (a ? c + h + 1 : 0), d = [], w = 0, g = c, A = 2 * c, F = 3 * c, y = 4 * c, C = 5 * c + 1;
    for (u = 0; u < m; u++)
      d[u] = -1;
    var b = [], E = t(n), S = E._index, M = E._ptr;
    for (u = 0; u < c; u++)
      for (s = r[u], b[s] = d[F + s] === -1 ? 1 : 0; s !== -1 && d[F + s] === -1; s = i[s])
        d[F + s] = u;
    if (a) {
      for (u = 0; u < c; u++)
        d[r[u]] = u;
      for (l = 0; l < h; l++) {
        for (u = c, D = M[l], v = M[l + 1], p = D; p < v; p++)
          u = Math.min(u, d[S[p]]);
        d[C + l] = d[y + u], d[y + u] = l;
      }
    }
    for (l = 0; l < c; l++)
      d[w + l] = l;
    for (u = 0; u < c; u++) {
      for (s = r[u], i[s] !== -1 && b[i[s]]--, f = a ? d[y + u] : s; f !== -1; f = a ? d[C + f] : -1)
        for (p = M[f]; p < M[f + 1]; p++) {
          l = S[p];
          var x = Pl(l, s, d, F, g, A, w);
          x.jleaf >= 1 && b[s]++, x.jleaf === 2 && b[x.q]--;
        }
      i[s] !== -1 && (d[w + s] = i[s]);
    }
    for (s = 0; s < c; s++)
      i[s] !== -1 && (b[i[s]] += b[s]);
    return b;
  };
}), Zl = "csSqr", Gl = ["add", "multiply", "transpose"], Yl = /* @__PURE__ */ ee(Zl, Gl, (e) => {
  var {
    add: t,
    multiply: n,
    transpose: i
  } = e, r = ql({
    add: t,
    multiply: n,
    transpose: i
  }), a = Vl({
    transpose: i
  });
  return function(c, l, s) {
    var u = l._ptr, f = l._size, p = f[1], D, v = {};
    if (v.q = r(c, l), c && !v.q)
      return null;
    if (s) {
      var m = c ? zl(l, null, v.q, 0) : l;
      v.parent = Ol(m, 1);
      var d = Tl(v.parent, p);
      if (v.cp = a(m, v.parent, d, 1), m && v.parent && v.cp && o(m, v))
        for (v.unz = 0, D = 0; D < p; D++)
          v.unz += v.cp[D];
    } else
      v.unz = 4 * u[p] + p, v.lnz = v.unz;
    return v;
  };
  function o(h, c) {
    var l = h._ptr, s = h._index, u = h._size, f = u[0], p = u[1];
    c.pinv = [], c.leftmost = [];
    var D = c.parent, v = c.pinv, m = c.leftmost, d = [], w = 0, g = f, A = f + p, F = f + 2 * p, y, C, b, E, S;
    for (C = 0; C < p; C++)
      d[g + C] = -1, d[A + C] = -1, d[F + C] = 0;
    for (y = 0; y < f; y++)
      m[y] = -1;
    for (C = p - 1; C >= 0; C--)
      for (E = l[C], S = l[C + 1], b = E; b < S; b++)
        m[s[b]] = C;
    for (y = f - 1; y >= 0; y--)
      v[y] = -1, C = m[y], C !== -1 && (d[F + C]++ === 0 && (d[A + C] = y), d[w + y] = d[g + C], d[g + C] = y);
    for (c.lnz = 0, c.m2 = f, C = 0; C < p; C++)
      if (y = d[g + C], c.lnz++, y < 0 && (y = c.m2++), v[y] = C, !(--F[C] <= 0)) {
        c.lnz += d[F + C];
        var M = D[C];
        M !== -1 && (d[F + M] === 0 && (d[A + M] = d[A + C]), d[w + d[A + C]] = d[g + M], d[g + M] = d[w + y], d[F + M] += d[F + C]);
      }
    for (y = 0; y < f; y++)
      v[y] < 0 && (v[y] = C++);
    return !0;
  }
});
function Zt(e, t) {
  return e[t] < 0;
}
function ha(e, t) {
  e[t] = gr(e[t]);
}
function oi(e) {
  return e < 0 ? gr(e) : e;
}
function Jl(e, t, n, i, r) {
  var a = t._index, o = t._ptr, h = t._size, c = h[1], l, s, u, f = 0;
  for (i[0] = e; f >= 0; ) {
    e = i[f];
    var p = r ? r[e] : e;
    Zt(o, e) || (ha(o, e), i[c + f] = p < 0 ? 0 : oi(o[p]));
    var D = 1;
    for (s = i[c + f], u = p < 0 ? 0 : oi(o[p + 1]); s < u; s++)
      if (l = a[s], !Zt(o, l)) {
        i[c + f] = s, i[++f] = l, D = 0;
        break;
      }
    D && (f--, i[--n] = e);
  }
  return n;
}
function Ql(e, t, n, i, r) {
  var a = e._ptr, o = e._size, h = t._index, c = t._ptr, l = o[1], s, u, f, p = l;
  for (u = c[n], f = c[n + 1], s = u; s < f; s++) {
    var D = h[s];
    Zt(a, D) || (p = Jl(D, e, p, i, r));
  }
  for (s = p; s < l; s++)
    ha(a, i[s]);
  return p;
}
var Xl = "csSpsolve", Hl = ["divideScalar", "multiply", "subtract"], Kl = /* @__PURE__ */ ee(Xl, Hl, (e) => {
  var {
    divideScalar: t,
    multiply: n,
    subtract: i
  } = e;
  return function(a, o, h, c, l, s, u) {
    var f = a._values, p = a._index, D = a._ptr, v = a._size, m = v[1], d = o._values, w = o._index, g = o._ptr, A, F, y, C, b = Ql(a, o, h, c, s);
    for (A = b; A < m; A++)
      l[c[A]] = 0;
    for (F = g[h], y = g[h + 1], A = F; A < y; A++)
      l[w[A]] = d[A];
    for (var E = b; E < m; E++) {
      var S = c[E], M = s ? s[S] : S;
      if (!(M < 0))
        for (F = D[M], y = D[M + 1], l[S] = t(l[S], f[u ? F : y - 1]), A = u ? F + 1 : F, C = u ? y : y - 1; A < C; A++) {
          var x = p[A];
          l[x] = i(l[x], n(f[A], l[S]));
        }
    }
    return b;
  };
}), Wl = "csLu", kl = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], jl = /* @__PURE__ */ ee(Wl, kl, (e) => {
  var {
    abs: t,
    divideScalar: n,
    multiply: i,
    subtract: r,
    larger: a,
    largerEq: o,
    SparseMatrix: h
  } = e, c = Kl({
    divideScalar: n,
    multiply: i,
    subtract: r
  });
  return function(s, u, f) {
    if (!s)
      return null;
    var p = s._size, D = p[1], v, m = 100, d = 100;
    u && (v = u.q, m = u.lnz || m, d = u.unz || d);
    var w = [], g = [], A = [], F = new h({
      values: w,
      index: g,
      ptr: A,
      size: [D, D]
    }), y = [], C = [], b = [], E = new h({
      values: y,
      index: C,
      ptr: b,
      size: [D, D]
    }), S = [], M, x, O = [], T = [];
    for (M = 0; M < D; M++)
      O[M] = 0, S[M] = -1, A[M + 1] = 0;
    m = 0, d = 0;
    for (var I = 0; I < D; I++) {
      A[I] = m, b[I] = d;
      var B = v ? v[I] : I, G = c(F, s, B, T, O, S, 1), $ = -1, z = -1;
      for (x = G; x < D; x++)
        if (M = T[x], S[M] < 0) {
          var V = t(O[M]);
          a(V, z) && (z = V, $ = M);
        } else
          C[d] = S[M], y[d++] = O[M];
      if ($ === -1 || z <= 0)
        return null;
      S[B] < 0 && o(t(O[B]), i(z, f)) && ($ = B);
      var K = O[$];
      for (C[d] = I, y[d++] = K, S[$] = I, g[m] = $, w[m++] = 1, x = G; x < D; x++)
        M = T[x], S[M] < 0 && (g[m] = M, w[m++] = n(O[M], K)), O[M] = 0;
    }
    for (A[D] = m, b[D] = d, x = 0; x < m; x++)
      g[x] = S[g[x]];
    return w.splice(m, w.length - m), g.splice(m, g.length - m), y.splice(d, y.length - d), C.splice(d, C.length - d), {
      L: F,
      U: E,
      pinv: S
    };
  };
}), si = "slu", e0 = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], r0 = /* @__PURE__ */ ee(si, e0, (e) => {
  var {
    typed: t,
    abs: n,
    add: i,
    multiply: r,
    transpose: a,
    divideScalar: o,
    subtract: h,
    larger: c,
    largerEq: l,
    SparseMatrix: s
  } = e, u = Yl({
    add: i,
    multiply: r,
    transpose: a
  }), f = jl({
    abs: n,
    divideScalar: o,
    multiply: r,
    subtract: h,
    larger: c,
    largerEq: l,
    SparseMatrix: s
  });
  return t(si, {
    "SparseMatrix, number, number": function(D, v, m) {
      if (!ze(v) || v < 0 || v > 3)
        throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
      if (m < 0 || m > 1)
        throw new Error("Partial pivoting threshold must be a number from 0 to 1");
      var d = u(v, D, !1), w = f(D, d, m);
      return {
        L: w.L,
        U: w.U,
        p: w.pinv,
        q: d.q,
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
function fi(e, t) {
  var n, i = t.length, r = [];
  if (e)
    for (n = 0; n < i; n++)
      r[e[n]] = t[n];
  else
    for (n = 0; n < i; n++)
      r[n] = t[n];
  return r;
}
var ci = "lusolve", t0 = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], n0 = /* @__PURE__ */ ee(ci, t0, (e) => {
  var {
    typed: t,
    matrix: n,
    lup: i,
    slu: r,
    usolve: a,
    lsolve: o,
    DenseMatrix: h
  } = e, c = St({
    DenseMatrix: h
  });
  return t(ci, {
    "Array, Array | Matrix": function(f, p) {
      f = n(f);
      var D = i(f), v = s(D.L, D.U, D.p, null, p);
      return v.valueOf();
    },
    "DenseMatrix, Array | Matrix": function(f, p) {
      var D = i(f);
      return s(D.L, D.U, D.p, null, p);
    },
    "SparseMatrix, Array | Matrix": function(f, p) {
      var D = i(f);
      return s(D.L, D.U, D.p, null, p);
    },
    "SparseMatrix, Array | Matrix, number, number": function(f, p, D, v) {
      var m = r(f, D, v);
      return s(m.L, m.U, m.p, m.q, p);
    },
    "Object, Array | Matrix": function(f, p) {
      return s(f.L, f.U, f.p, f.q, p);
    }
  });
  function l(u) {
    if (_e(u))
      return u;
    if (Me(u))
      return n(u);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function s(u, f, p, D, v) {
    u = l(u), f = l(f), p && (v = c(u, v, !0), v._data = fi(p, v._data));
    var m = o(u, v), d = a(f, m);
    return D && (d._data = fi(D, d._data)), d;
  }
}), li = "det", i0 = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], a0 = /* @__PURE__ */ ee(li, i0, (e) => {
  var {
    typed: t,
    matrix: n,
    subtractScalar: i,
    multiply: r,
    divideScalar: a,
    isZero: o,
    unaryMinus: h
  } = e;
  return t(li, {
    any: function(s) {
      return Ce(s);
    },
    "Array | Matrix": function(s) {
      var u;
      switch (_e(s) ? u = s.size() : Array.isArray(s) ? (s = n(s), u = s.size()) : u = [], u.length) {
        case 0:
          return Ce(s);
        case 1:
          if (u[0] === 1)
            return Ce(s.valueOf()[0]);
          if (u[0] === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Ie(u) + ")");
        case 2: {
          var f = u[0], p = u[1];
          if (f === p)
            return c(s.clone().valueOf(), f);
          if (p === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Ie(u) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Ie(u) + ")");
      }
    }
  });
  function c(l, s, u) {
    if (s === 1)
      return Ce(l[0][0]);
    if (s === 2)
      return i(r(l[0][0], l[1][1]), r(l[1][0], l[0][1]));
    for (var f = !1, p = new Array(s).fill(0).map((C, b) => b), D = 0; D < s; D++) {
      var v = p[D];
      if (o(l[v][D])) {
        var m = void 0;
        for (m = D + 1; m < s; m++)
          if (!o(l[p[m]][D])) {
            v = p[m], p[m] = p[D], p[D] = v, f = !f;
            break;
          }
        if (m === s)
          return l[v][D];
      }
      for (var d = l[v][D], w = D === 0 ? 1 : l[p[D - 1]][D - 1], g = D + 1; g < s; g++)
        for (var A = p[g], F = D + 1; F < s; F++)
          l[A][F] = a(i(r(l[A][F], d), r(l[A][D], l[v][F])), w);
    }
    var y = l[p[s - 1]][s - 1];
    return f ? h(y) : y;
  }
}), hi = "inv", u0 = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], o0 = /* @__PURE__ */ ee(hi, u0, (e) => {
  var {
    typed: t,
    matrix: n,
    divideScalar: i,
    addScalar: r,
    multiply: a,
    unaryMinus: o,
    det: h,
    identity: c,
    abs: l
  } = e;
  return t(hi, {
    "Array | Matrix": function(f) {
      var p = _e(f) ? f.size() : $e(f);
      switch (p.length) {
        case 1:
          if (p[0] === 1)
            return _e(f) ? n([i(1, f.valueOf()[0])]) : [i(1, f[0])];
          throw new RangeError("Matrix must be square (size: " + Ie(p) + ")");
        case 2: {
          var D = p[0], v = p[1];
          if (D === v)
            return _e(f) ? n(s(f.valueOf(), D, v), f.storage()) : s(f, D, v);
          throw new RangeError("Matrix must be square (size: " + Ie(p) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Ie(p) + ")");
      }
    },
    any: function(f) {
      return i(1, f);
    }
  });
  function s(u, f, p) {
    var D, v, m, d, w;
    if (f === 1) {
      if (d = u[0][0], d === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[i(1, d)]];
    } else if (f === 2) {
      var g = h(u);
      if (g === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[i(u[1][1], g), i(o(u[0][1]), g)], [i(o(u[1][0]), g), i(u[0][0], g)]];
    } else {
      var A = u.concat();
      for (D = 0; D < f; D++)
        A[D] = A[D].concat();
      for (var F = c(f).valueOf(), y = 0; y < p; y++) {
        var C = l(A[y][y]), b = y;
        for (D = y + 1; D < f; )
          l(A[D][y]) > C && (C = l(A[D][y]), b = D), D++;
        if (C === 0)
          throw Error("Cannot calculate inverse, determinant is zero");
        D = b, D !== y && (w = A[y], A[y] = A[D], A[D] = w, w = F[y], F[y] = F[D], F[D] = w);
        var E = A[y], S = F[y];
        for (D = 0; D < f; D++) {
          var M = A[D], x = F[D];
          if (D !== y) {
            if (M[y] !== 0) {
              for (m = i(o(M[y]), E[y]), v = y; v < p; v++)
                M[v] = r(M[v], a(m, E[v]));
              for (v = 0; v < p; v++)
                x[v] = r(x[v], a(m, S[v]));
            }
          } else {
            for (m = E[y], v = y; v < p; v++)
              M[v] = i(M[v], m);
            for (v = 0; v < p; v++)
              x[v] = i(x[v], m);
          }
        }
      }
      return F;
    }
  }
});
function s0(e) {
  var {
    addScalar: t,
    subtract: n,
    flatten: i,
    multiply: r,
    multiplyScalar: a,
    divideScalar: o,
    sqrt: h,
    abs: c,
    bignumber: l,
    diag: s,
    size: u,
    reshape: f,
    inv: p,
    qr: D,
    usolve: v,
    usolveAll: m,
    equal: d,
    complex: w,
    larger: g,
    smaller: A,
    matrixFromColumns: F,
    dot: y
  } = e;
  function C(P, q, Z, ne) {
    var k = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, U = b(P, q, Z, ne, k);
    E(P, q, Z, ne, k, U);
    var {
      values: Q,
      C: X
    } = S(P, q, Z, ne, k);
    if (k) {
      var J = M(P, q, X, U, Q, Z, ne);
      return {
        values: Q,
        eigenvectors: J
      };
    }
    return {
      values: Q
    };
  }
  function b(P, q, Z, ne, k) {
    var U = ne === "BigNumber", Q = ne === "Complex", X = U ? l(0) : 0, J = U ? l(1) : Q ? w(1) : 1, ue = U ? l(1) : 1, j = U ? l(10) : 2, oe = a(j, j), le;
    k && (le = Array(q).fill(J));
    for (var de = !1; !de; ) {
      de = !0;
      for (var ge = 0; ge < q; ge++) {
        for (var we = X, he = X, be = 0; be < q; be++)
          ge !== be && (we = t(we, c(P[be][ge])), he = t(he, c(P[ge][be])));
        if (!d(we, 0) && !d(he, 0)) {
          for (var Ee = ue, Se = we, Ue = o(he, j), N = a(he, j); A(Se, Ue); )
            Se = a(Se, oe), Ee = a(Ee, j);
          for (; g(Se, N); )
            Se = o(Se, oe), Ee = o(Ee, j);
          var _ = A(o(t(Se, he), Ee), a(t(we, he), 0.95));
          if (_) {
            de = !1;
            for (var L = o(1, Ee), R = 0; R < q; R++)
              ge !== R && (P[ge][R] = a(P[ge][R], L), P[R][ge] = a(P[R][ge], Ee));
            k && (le[ge] = a(le[ge], L));
          }
        }
      }
    }
    return k ? s(le) : null;
  }
  function E(P, q, Z, ne, k, U) {
    var Q = ne === "BigNumber", X = ne === "Complex", J = Q ? l(0) : X ? w(0) : 0;
    Q && (Z = l(Z));
    for (var ue = 0; ue < q - 2; ue++) {
      for (var j = 0, oe = J, le = ue + 1; le < q; le++) {
        var de = P[le][ue];
        A(c(oe), c(de)) && (oe = de, j = le);
      }
      if (!A(c(oe), Z)) {
        if (j !== ue + 1) {
          var ge = P[j];
          P[j] = P[ue + 1], P[ue + 1] = ge;
          for (var we = 0; we < q; we++) {
            var he = P[we][j];
            P[we][j] = P[we][ue + 1], P[we][ue + 1] = he;
          }
          if (k) {
            var be = U[j];
            U[j] = U[ue + 1], U[ue + 1] = be;
          }
        }
        for (var Ee = ue + 2; Ee < q; Ee++) {
          var Se = o(P[Ee][ue], oe);
          if (Se !== 0) {
            for (var Ue = 0; Ue < q; Ue++)
              P[Ee][Ue] = n(P[Ee][Ue], a(Se, P[ue + 1][Ue]));
            for (var N = 0; N < q; N++)
              P[N][ue + 1] = t(P[N][ue + 1], a(Se, P[N][Ee]));
            if (k)
              for (var _ = 0; _ < q; _++)
                U[Ee][_] = n(U[Ee][_], a(Se, U[ue + 1][_]));
          }
        }
      }
    }
    return U;
  }
  function S(P, q, Z, ne, k) {
    var U = ne === "BigNumber", Q = ne === "Complex", X = U ? l(1) : Q ? w(1) : 1;
    U && (Z = l(Z));
    for (var J = Ce(P), ue = [], j = q, oe = [], le = k ? s(Array(q).fill(X)) : void 0, de = k ? s(Array(j).fill(X)) : void 0, ge = 0; ge <= 100; ) {
      ge += 1;
      for (var we = J[j - 1][j - 1], he = 0; he < j; he++)
        J[he][he] = n(J[he][he], we);
      var {
        Q: be,
        R: Ee
      } = D(J);
      J = r(Ee, be);
      for (var Se = 0; Se < j; Se++)
        J[Se][Se] = t(J[Se][Se], we);
      if (k && (de = r(de, be)), j === 1 || A(c(J[j - 1][j - 2]), Z)) {
        ge = 0, ue.push(J[j - 1][j - 1]), k && (oe.unshift([[1]]), T(de, q), le = r(le, de), j > 1 && (de = s(Array(j - 1).fill(X)))), j -= 1, J.pop();
        for (var Ue = 0; Ue < j; Ue++)
          J[Ue].pop();
      } else if (j === 2 || A(c(J[j - 2][j - 3]), Z)) {
        ge = 0;
        var N = x(J[j - 2][j - 2], J[j - 2][j - 1], J[j - 1][j - 2], J[j - 1][j - 1]);
        ue.push(...N), k && (oe.unshift(O(J[j - 2][j - 2], J[j - 2][j - 1], J[j - 1][j - 2], J[j - 1][j - 1], N[0], N[1], Z, ne)), T(de, q), le = r(le, de), j > 2 && (de = s(Array(j - 2).fill(X)))), j -= 2, J.pop(), J.pop();
        for (var _ = 0; _ < j; _++)
          J[_].pop(), J[_].pop();
      }
      if (j === 0)
        break;
    }
    if (ue.sort((H, Y) => +n(c(H), c(Y))), ge > 100) {
      var L = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + ue.join(", "));
      throw L.values = ue, L.vectors = [], L;
    }
    var R = k ? r(le, I(oe, q)) : void 0;
    return {
      values: ue,
      C: R
    };
  }
  function M(P, q, Z, ne, k, U, Q) {
    var X = p(Z), J = r(X, P, Z), ue = Q === "BigNumber", j = Q === "Complex", oe = ue ? l(0) : j ? w(0) : 0, le = ue ? l(1) : j ? w(1) : 1, de = [], ge = [];
    for (var we of k) {
      var he = B(de, we, d);
      he === -1 ? (de.push(we), ge.push(1)) : ge[he] += 1;
    }
    for (var be = [], Ee = de.length, Se = Array(q).fill(oe), Ue = s(Array(q).fill(le)), N = function() {
      var R = de[_], H = n(J, r(R, Ue)), Y = m(H, Se);
      for (Y.shift(); Y.length < ge[_]; ) {
        var ae = G(H, q, Y, U, Q);
        if (ae === null)
          break;
        Y.push(ae);
      }
      var te = r(p(ne), Z);
      Y = Y.map((ie) => r(te, ie)), be.push(...Y.map((ie) => ({
        value: R,
        vector: i(ie)
      })));
    }, _ = 0; _ < Ee; _++)
      N();
    return be;
  }
  function x(P, q, Z, ne) {
    var k = t(P, ne), U = n(a(P, ne), a(q, Z)), Q = a(k, 0.5), X = a(h(n(a(k, k), a(4, U))), 0.5);
    return [t(Q, X), n(Q, X)];
  }
  function O(P, q, Z, ne, k, U, Q, X) {
    var J = X === "BigNumber", ue = X === "Complex", j = J ? l(0) : ue ? w(0) : 0, oe = J ? l(1) : ue ? w(1) : 1;
    if (A(c(Z), Q))
      return [[oe, j], [j, oe]];
    if (g(c(n(k, U)), Q))
      return [[n(k, ne), n(U, ne)], [Z, Z]];
    var le = n(P, k), de = n(ne, k);
    return A(c(q), Q) && A(c(de), Q) ? [[le, oe], [Z, j]] : [[q, j], [de, oe]];
  }
  function T(P, q) {
    for (var Z = 0; Z < P.length; Z++)
      P[Z].push(...Array(q - P[Z].length).fill(0));
    for (var ne = P.length; ne < q; ne++)
      P.push(Array(q).fill(0)), P[ne][ne] = 1;
    return P;
  }
  function I(P, q) {
    for (var Z = [], ne = 0; ne < q; ne++)
      Z[ne] = Array(q).fill(0);
    var k = 0;
    for (var U of P) {
      for (var Q = U.length, X = 0; X < Q; X++)
        for (var J = 0; J < Q; J++)
          Z[k + X][k + J] = U[X][J];
      k += Q;
    }
    return Z;
  }
  function B(P, q, Z) {
    for (var ne = 0; ne < P.length; ne++)
      if (Z(P[ne], q))
        return ne;
    return -1;
  }
  function G(P, q, Z, ne, k) {
    for (var U = k === "BigNumber" ? l(1e3) : 1e3, Q, X = 0; X < 5; ++X) {
      Q = $(q, Z, k);
      try {
        Q = v(P, Q);
      } catch {
        continue;
      }
      if (g(V(Q), U))
        break;
    }
    if (X >= 5)
      return null;
    for (X = 0; ; ) {
      var J = v(P, Q);
      if (A(V(z(Q, [J])), ne))
        break;
      if (++X >= 10)
        return null;
      Q = K(J);
    }
    return Q;
  }
  function $(P, q, Z) {
    var ne = Z === "BigNumber", k = Z === "Complex", U = Array(P).fill(0).map((Q) => 2 * Math.random() - 1);
    return ne && (U = U.map((Q) => l(Q))), k && (U = U.map((Q) => w(Q))), U = z(U, q), K(U, Z);
  }
  function z(P, q) {
    var Z = u(P);
    for (var ne of q)
      ne = f(ne, Z), P = n(P, r(o(y(ne, P), y(ne, ne)), ne));
    return P;
  }
  function V(P) {
    return c(h(y(P, P)));
  }
  function K(P, q) {
    var Z = q === "BigNumber", ne = q === "Complex", k = Z ? l(1) : ne ? w(1) : 1;
    return r(o(k, V(P)), P);
  }
  return C;
}
function f0(e) {
  var {
    config: t,
    addScalar: n,
    subtract: i,
    abs: r,
    atan: a,
    cos: o,
    sin: h,
    multiplyScalar: c,
    inv: l,
    bignumber: s,
    multiply: u,
    add: f
  } = e;
  function p(E, S) {
    var M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t.epsilon, x = arguments.length > 3 ? arguments[3] : void 0, O = arguments.length > 4 ? arguments[4] : void 0;
    if (x === "number")
      return D(E, M, O);
    if (x === "BigNumber")
      return v(E, M, O);
    throw TypeError("Unsupported data type: " + x);
  }
  function D(E, S, M) {
    var x = E.length, O = Math.abs(S / x), T, I;
    if (M) {
      I = new Array(x);
      for (var B = 0; B < x; B++)
        I[B] = Array(x).fill(0), I[B][B] = 1;
    }
    for (var G = y(E); Math.abs(G[1]) >= Math.abs(O); ) {
      var $ = G[0][0], z = G[0][1];
      T = m(E[$][$], E[z][z], E[$][z]), E = F(E, T, $, z), M && (I = w(I, T, $, z)), G = y(E);
    }
    for (var V = Array(x).fill(0), K = 0; K < x; K++)
      V[K] = E[K][K];
    return b(Ce(V), I, M);
  }
  function v(E, S, M) {
    var x = E.length, O = r(S / x), T, I;
    if (M) {
      I = new Array(x);
      for (var B = 0; B < x; B++)
        I[B] = Array(x).fill(0), I[B][B] = 1;
    }
    for (var G = C(E); r(G[1]) >= r(O); ) {
      var $ = G[0][0], z = G[0][1];
      T = d(E[$][$], E[z][z], E[$][z]), E = A(E, T, $, z), M && (I = g(I, T, $, z)), G = C(E);
    }
    for (var V = Array(x).fill(0), K = 0; K < x; K++)
      V[K] = E[K][K];
    return b(Ce(V), I, M);
  }
  function m(E, S, M) {
    var x = S - E;
    return Math.abs(x) <= t.epsilon ? Math.PI / 4 : 0.5 * Math.atan(2 * M / (S - E));
  }
  function d(E, S, M) {
    var x = i(S, E);
    return r(x) <= t.epsilon ? s(-1).acos().div(4) : c(0.5, a(u(2, M, l(x))));
  }
  function w(E, S, M, x) {
    for (var O = E.length, T = Math.cos(S), I = Math.sin(S), B = Array(O).fill(0), G = Array(O).fill(0), $ = 0; $ < O; $++)
      B[$] = T * E[$][M] - I * E[$][x], G[$] = I * E[$][M] + T * E[$][x];
    for (var z = 0; z < O; z++)
      E[z][M] = B[z], E[z][x] = G[z];
    return E;
  }
  function g(E, S, M, x) {
    for (var O = E.length, T = o(S), I = h(S), B = Array(O).fill(s(0)), G = Array(O).fill(s(0)), $ = 0; $ < O; $++)
      B[$] = i(c(T, E[$][M]), c(I, E[$][x])), G[$] = n(c(I, E[$][M]), c(T, E[$][x]));
    for (var z = 0; z < O; z++)
      E[z][M] = B[z], E[z][x] = G[z];
    return E;
  }
  function A(E, S, M, x) {
    for (var O = E.length, T = s(o(S)), I = s(h(S)), B = c(T, T), G = c(I, I), $ = Array(O).fill(s(0)), z = Array(O).fill(s(0)), V = u(s(2), T, I, E[M][x]), K = n(i(c(B, E[M][M]), V), c(G, E[x][x])), P = f(c(G, E[M][M]), V, c(B, E[x][x])), q = 0; q < O; q++)
      $[q] = i(c(T, E[M][q]), c(I, E[x][q])), z[q] = n(c(I, E[M][q]), c(T, E[x][q]));
    E[M][M] = K, E[x][x] = P, E[M][x] = s(0), E[x][M] = s(0);
    for (var Z = 0; Z < O; Z++)
      Z !== M && Z !== x && (E[M][Z] = $[Z], E[Z][M] = $[Z], E[x][Z] = z[Z], E[Z][x] = z[Z]);
    return E;
  }
  function F(E, S, M, x) {
    for (var O = E.length, T = Math.cos(S), I = Math.sin(S), B = T * T, G = I * I, $ = Array(O).fill(0), z = Array(O).fill(0), V = B * E[M][M] - 2 * T * I * E[M][x] + G * E[x][x], K = G * E[M][M] + 2 * T * I * E[M][x] + B * E[x][x], P = 0; P < O; P++)
      $[P] = T * E[M][P] - I * E[x][P], z[P] = I * E[M][P] + T * E[x][P];
    E[M][M] = V, E[x][x] = K, E[M][x] = 0, E[x][M] = 0;
    for (var q = 0; q < O; q++)
      q !== M && q !== x && (E[M][q] = $[q], E[q][M] = $[q], E[x][q] = z[q], E[q][x] = z[q]);
    return E;
  }
  function y(E) {
    for (var S = E.length, M = 0, x = [0, 1], O = 0; O < S; O++)
      for (var T = O + 1; T < S; T++)
        Math.abs(M) < Math.abs(E[O][T]) && (M = Math.abs(E[O][T]), x = [O, T]);
    return [x, M];
  }
  function C(E) {
    for (var S = E.length, M = 0, x = [0, 1], O = 0; O < S; O++)
      for (var T = O + 1; T < S; T++)
        r(M) < r(E[O][T]) && (M = r(E[O][T]), x = [O, T]);
    return [x, M];
  }
  function b(E, S, M) {
    var x = E.length, O = Array(x), T;
    if (M) {
      T = Array(x);
      for (var I = 0; I < x; I++)
        T[I] = Array(x);
    }
    for (var B = 0; B < x; B++) {
      for (var G = 0, $ = E[0], z = 0; z < E.length; z++)
        r(E[z]) < r($) && (G = z, $ = E[G]);
      if (O[B] = E.splice(G, 1)[0], M)
        for (var V = 0; V < x; V++)
          T[B][V] = S[V][G], S[V].splice(G, 1);
    }
    if (!M)
      return {
        values: O
      };
    var K = T.map((P, q) => ({
      value: O[q],
      vector: P
    }));
    return {
      values: O,
      eigenvectors: K
    };
  }
  return p;
}
var c0 = "eigs", l0 = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], h0 = /* @__PURE__ */ ee(c0, l0, (e) => {
  var {
    config: t,
    typed: n,
    matrix: i,
    addScalar: r,
    subtract: a,
    equal: o,
    abs: h,
    atan: c,
    cos: l,
    sin: s,
    multiplyScalar: u,
    divideScalar: f,
    inv: p,
    bignumber: D,
    multiply: v,
    add: m,
    larger: d,
    column: w,
    flatten: g,
    number: A,
    complex: F,
    sqrt: y,
    diag: C,
    size: b,
    reshape: E,
    qr: S,
    usolve: M,
    usolveAll: x,
    im: O,
    re: T,
    smaller: I,
    matrixFromColumns: B,
    dot: G
  } = e, $ = f0({
    config: t,
    addScalar: r,
    subtract: a,
    column: w,
    flatten: g,
    equal: o,
    abs: h,
    atan: c,
    cos: l,
    sin: s,
    multiplyScalar: u,
    inv: p,
    bignumber: D,
    complex: F,
    multiply: v,
    add: m
  }), z = s0({
    config: t,
    addScalar: r,
    subtract: a,
    multiply: v,
    multiplyScalar: u,
    flatten: g,
    divideScalar: f,
    sqrt: y,
    abs: h,
    bignumber: D,
    diag: C,
    size: b,
    reshape: E,
    qr: S,
    inv: p,
    usolve: M,
    usolveAll: x,
    equal: o,
    complex: F,
    larger: d,
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
      return Or(X, Q), V(U, X);
    }
  });
  function V(k) {
    var U, Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, X = "eigenvectors" in Q ? Q.eigenvectors : !0, J = (U = Q.precision) !== null && U !== void 0 ? U : t.epsilon, ue = K(k, J, X);
    return Q.matricize && (ue.values = i(ue.values), X && (ue.eigenvectors = ue.eigenvectors.map((j) => {
      var {
        value: oe,
        vector: le
      } = j;
      return {
        value: oe,
        vector: i(le)
      };
    }))), X && Object.defineProperty(ue, "vectors", {
      enumerable: !1,
      // to make sure that the eigenvectors can still be
      // converted to string.
      get: () => {
        throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
      }
    }), ue;
  }
  function K(k, U, Q) {
    var X = k.toArray(), J = k.size();
    if (J.length !== 2 || J[0] !== J[1])
      throw new RangeError("Matrix must be square (size: ".concat(Ie(J), ")"));
    var ue = J[0];
    if (q(X, ue, U) && (Z(X, ue), P(X, ue, U))) {
      var j = ne(k, X, ue);
      return $(X, ue, U, j, Q);
    }
    var oe = ne(k, X, ue);
    return z(X, ue, U, oe, Q);
  }
  function P(k, U, Q) {
    for (var X = 0; X < U; X++)
      for (var J = X; J < U; J++)
        if (d(D(h(a(k[X][J], k[J][X]))), Q))
          return !1;
    return !0;
  }
  function q(k, U, Q) {
    for (var X = 0; X < U; X++)
      for (var J = 0; J < U; J++)
        if (d(D(h(O(k[X][J]))), Q))
          return !1;
    return !0;
  }
  function Z(k, U) {
    for (var Q = 0; Q < U; Q++)
      for (var X = 0; X < U; X++)
        k[Q][X] = T(k[Q][X]);
  }
  function ne(k, U, Q) {
    var X = k.datatype();
    if (X === "number" || X === "BigNumber" || X === "Complex")
      return X;
    for (var J = !1, ue = !1, j = !1, oe = 0; oe < Q; oe++)
      for (var le = 0; le < Q; le++) {
        var de = U[oe][le];
        if (Le(de) || Yt(de))
          J = !0;
        else if (Pe(de))
          ue = !0;
        else if (Gt(de))
          j = !0;
        else
          throw TypeError("Unsupported type in Matrix: " + lr(de));
      }
    if (ue && j && console.warn("Complex BigNumbers not supported, this operation will lose precission."), j) {
      for (var ge = 0; ge < Q; ge++)
        for (var we = 0; we < Q; we++)
          U[ge][we] = F(U[ge][we]);
      return "Complex";
    }
    if (ue) {
      for (var he = 0; he < Q; he++)
        for (var be = 0; be < Q; be++)
          U[he][be] = D(U[he][be]);
      return "BigNumber";
    }
    if (J) {
      for (var Ee = 0; Ee < Q; Ee++)
        for (var Se = 0; Se < Q; Se++)
          U[Ee][Se] = A(U[Ee][Se]);
      return "number";
    } else
      throw TypeError("Matrix contains unsupported types only.");
  }
}), Wr = /* @__PURE__ */ es({
  config: je
}), xt = /* @__PURE__ */ is({}), Kt = /* @__PURE__ */ ss({}), Wt = /* @__PURE__ */ ls({}), Je = /* @__PURE__ */ ps({
  Matrix: Wt
}), ce = /* @__PURE__ */ to({
  BigNumber: Wr,
  Complex: xt,
  DenseMatrix: Je,
  Fraction: Kt
}), kr = /* @__PURE__ */ Ks({
  typed: ce
}), Fr = /* @__PURE__ */ ks({
  typed: ce
}), v0 = /* @__PURE__ */ dl({
  typed: ce
}), kt = /* @__PURE__ */ Ls({
  BigNumber: Wr,
  typed: ce
}), jt = /* @__PURE__ */ Ps({
  Complex: xt,
  typed: ce
}), Nt = /* @__PURE__ */ Gf({
  typed: ce
}), p0 = /* @__PURE__ */ gl({
  typed: ce
}), fr = /* @__PURE__ */ bs({
  config: je,
  typed: ce
}), d0 = /* @__PURE__ */ ic({
  typed: ce
}), m0 = /* @__PURE__ */ Jf({
  typed: ce
}), va = /* @__PURE__ */ ms({
  typed: ce
}), g0 = /* @__PURE__ */ Ds({
  typed: ce
}), pa = /* @__PURE__ */ ws({
  typed: ce
}), Cr = /* @__PURE__ */ _f({
  typed: ce
}), en = /* @__PURE__ */ Ts({
  typed: ce
}), D0 = /* @__PURE__ */ Xf({
  typed: ce
}), y0 = /* @__PURE__ */ If({
  BigNumber: Wr,
  Fraction: Kt,
  complex: jt,
  typed: ce
}), w0 = /* @__PURE__ */ yl({
  typed: ce
}), Ur = /* @__PURE__ */ xs({
  Matrix: Wt,
  equalScalar: fr,
  typed: ce
}), Sr = /* @__PURE__ */ ef({
  typed: ce
}), A0 = /* @__PURE__ */ Es({
  typed: ce
}), rn = /* @__PURE__ */ qf({
  Complex: xt,
  config: je,
  typed: ce
}), jr = /* @__PURE__ */ Xs({
  typed: ce
}), da = /* @__PURE__ */ Vs({
  Fraction: Kt,
  typed: ce
}), ye = /* @__PURE__ */ Gs({
  DenseMatrix: Je,
  Matrix: Wt,
  SparseMatrix: Ur,
  typed: ce
}), E0 = /* @__PURE__ */ Nc({
  bignumber: kt,
  fraction: da,
  number: en
}), F0 = /* @__PURE__ */ lc({
  isInteger: va,
  matrix: ye,
  typed: ce
}), et = /* @__PURE__ */ vc({
  matrix: ye,
  config: je,
  typed: ce
}), Dr = /* @__PURE__ */ dc({
  matrix: ye,
  typed: ce
}), Ze = /* @__PURE__ */ Ec({
  matrix: ye,
  typed: ce
}), He = /* @__PURE__ */ Mc({
  BigNumber: Wr,
  config: je,
  matrix: ye,
  typed: ce
}), xr = /* @__PURE__ */ Kf({
  isInteger: va,
  matrix: ye,
  typed: ce
}), C0 = /* @__PURE__ */ Cc({
  conj: Nt,
  transpose: Ze,
  typed: ce
}), b0 = /* @__PURE__ */ ec({
  DenseMatrix: Je,
  SparseMatrix: Ur,
  matrix: ye,
  typed: ce
}), dr = /* @__PURE__ */ _c({
  numeric: E0,
  typed: ce
}), ma = /* @__PURE__ */ Uc({
  DenseMatrix: Je,
  concat: xr,
  equalScalar: fr,
  matrix: ye,
  typed: ce
}), ga = /* @__PURE__ */ tc({
  matrix: ye,
  typed: ce
}), rt = /* @__PURE__ */ uc({
  BigNumber: Wr,
  DenseMatrix: Je,
  SparseMatrix: Ur,
  config: je,
  matrix: ye,
  typed: ce
}), Da = /* @__PURE__ */ jc({
  DenseMatrix: Je,
  concat: xr,
  config: je,
  matrix: ye,
  typed: ce
}), M0 = /* @__PURE__ */ Ic({
  DenseMatrix: Je,
  divideScalar: dr,
  equalScalar: fr,
  matrix: ye,
  multiplyScalar: Cr,
  subtractScalar: Sr,
  typed: ce
}), S0 = /* @__PURE__ */ Js({
  flatten: ga,
  matrix: ye,
  size: et,
  typed: ce
}), x0 = /* @__PURE__ */ _l({
  addScalar: Fr,
  complex: jt,
  conj: Nt,
  divideScalar: dr,
  equal: ma,
  identity: rt,
  isZero: pa,
  matrix: ye,
  multiplyScalar: Cr,
  sign: y0,
  sqrt: rn,
  subtractScalar: Sr,
  typed: ce,
  unaryMinus: jr,
  zeros: He
}), tt = /* @__PURE__ */ Gc({
  DenseMatrix: Je,
  concat: xr,
  config: je,
  matrix: ye,
  typed: ce
}), sr = /* @__PURE__ */ Rf({
  DenseMatrix: Je,
  concat: xr,
  equalScalar: fr,
  matrix: ye,
  subtractScalar: Sr,
  typed: ce,
  unaryMinus: jr
}), ya = /* @__PURE__ */ $c({
  DenseMatrix: Je,
  divideScalar: dr,
  equalScalar: fr,
  matrix: ye,
  multiplyScalar: Cr,
  subtractScalar: Sr,
  typed: ce
}), ar = /* @__PURE__ */ Al({
  DenseMatrix: Je,
  SparseMatrix: Ur,
  addScalar: Fr,
  concat: xr,
  equalScalar: fr,
  matrix: ye,
  typed: ce
}), wa = /* @__PURE__ */ bl({
  addScalar: Fr,
  conj: Nt,
  multiplyScalar: Cr,
  size: et,
  typed: ce
}), N0 = /* @__PURE__ */ nl({
  DenseMatrix: Je,
  smaller: tt
}), Aa = /* @__PURE__ */ ul({
  ImmutableDenseMatrix: N0,
  getMatrixDataType: d0
}), Vr = /* @__PURE__ */ Kc({
  DenseMatrix: Je,
  concat: xr,
  config: je,
  matrix: ye,
  typed: ce
}), fe = /* @__PURE__ */ Tf({
  addScalar: Fr,
  dot: wa,
  equalScalar: fr,
  matrix: ye,
  multiplyScalar: Cr,
  typed: ce
}), B0 = /* @__PURE__ */ r0({
  SparseMatrix: Ur,
  abs: kr,
  add: ar,
  divideScalar: dr,
  larger: Vr,
  largerEq: Da,
  multiply: fe,
  subtract: sr,
  transpose: Ze,
  typed: ce
}), Ae = /* @__PURE__ */ gc({
  add: ar,
  matrix: ye,
  typed: ce,
  zeros: He
}), _0 = /* @__PURE__ */ Pc({
  DenseMatrix: Je,
  divideScalar: dr,
  equalScalar: fr,
  matrix: ye,
  multiplyScalar: Cr,
  subtractScalar: Sr,
  typed: ce
}), z0 = /* @__PURE__ */ a0({
  divideScalar: dr,
  isZero: pa,
  matrix: ye,
  multiply: fe,
  subtractScalar: Sr,
  typed: ce,
  unaryMinus: jr
}), T0 = /* @__PURE__ */ fl({
  larger: Vr,
  smaller: tt
}), De = /* @__PURE__ */ Sl({
  Index: Aa,
  typed: ce
}), O0 = /* @__PURE__ */ Qc({
  DenseMatrix: Je,
  concat: xr,
  config: je,
  matrix: ye,
  typed: ce
}), Tr = /* @__PURE__ */ fc({
  bignumber: kt,
  matrix: ye,
  add: ar,
  config: je,
  isPositive: g0,
  larger: Vr,
  largerEq: Da,
  smaller: tt,
  smallerEq: O0,
  typed: ce
}), I0 = /* @__PURE__ */ hl({
  FibonacciHeap: T0,
  addScalar: Fr,
  equalScalar: fr
}), L0 = /* @__PURE__ */ kf({
  Index: Aa,
  matrix: ye,
  range: Tr,
  typed: ce
}), cr = /* @__PURE__ */ o0({
  abs: kr,
  addScalar: Fr,
  det: z0,
  divideScalar: dr,
  identity: rt,
  matrix: ye,
  multiply: fe,
  typed: ce,
  unaryMinus: jr
}), $0 = /* @__PURE__ */ Nl({
  DenseMatrix: Je,
  Spa: I0,
  SparseMatrix: Ur,
  abs: kr,
  addScalar: Fr,
  divideScalar: dr,
  equalScalar: fr,
  larger: Vr,
  matrix: ye,
  multiplyScalar: Cr,
  subtractScalar: Sr,
  typed: ce,
  unaryMinus: jr
}), q0 = /* @__PURE__ */ Tc({
  Complex: xt,
  config: je,
  fraction: da,
  identity: rt,
  inv: cr,
  matrix: ye,
  multiply: fe,
  number: en,
  typed: ce
}), P0 = /* @__PURE__ */ n0({
  DenseMatrix: Je,
  lsolve: M0,
  lup: $0,
  matrix: ye,
  slu: B0,
  typed: ce,
  usolve: ya
}), R0 = /* @__PURE__ */ h0({
  abs: kr,
  add: ar,
  addScalar: Fr,
  atan: v0,
  bignumber: kt,
  column: L0,
  complex: jt,
  config: je,
  cos: p0,
  diag: b0,
  divideScalar: dr,
  dot: wa,
  equal: ma,
  flatten: ga,
  im: m0,
  inv: cr,
  larger: Vr,
  matrix: ye,
  matrixFromColumns: S0,
  multiply: fe,
  multiplyScalar: Cr,
  number: en,
  qr: x0,
  re: D0,
  reshape: F0,
  sin: w0,
  size: et,
  smaller: tt,
  sqrt: rn,
  subtract: sr,
  typed: ce,
  usolve: ya,
  usolveAll: _0
}), vi = /* @__PURE__ */ Fl({
  abs: kr,
  add: ar,
  conj: Nt,
  ctranspose: C0,
  eigs: R0,
  equalScalar: fr,
  larger: Vr,
  matrix: ye,
  multiply: fe,
  pow: q0,
  smaller: tt,
  sqrt: rn,
  typed: ce
});
class U0 {
  /**
   * Node constructor
   * @param label number
   * @param coords coordinates
   * @param bcs boundary conditions {code:string]:boolean}
   */
  constructor(t, n, i = [0, 0, 0], r = []) {
    se(this, "label");
    // Node number
    se(this, "domain");
    // domain reference
    se(this, "coords");
    // ([float,float,float])* coordinates [m]
    //bcs: Set<DofID>; // for each DOF (identified by string id) the bc is applied
    //Note: prescribed values to be specified via boundaryCondition class
    se(this, "bcs");
    //Node local coordinate system. In this c.s. boundary conditions are applied and results obtained
    /**
     * Triplet defining the local coordinate system in node.
     * Value at position (i,j) represents angle between e'(i) and e(j),
     * where e' is base vector of local coordinate system and e is
     * base vector of global c.s.
     */
    se(this, "lcs");
    this.label = t.toString(), this.domain = n, this.coords = i, this.bcs = new Set(r), this.lcs = void 0;
  }
  /**
   * Change properties
   * @param label new label
   * @param coords new coordinates
   * @param bcs new dictionary with applied boundary conditions
   */
  change(t, n, i = []) {
    t != null && (this.label = t.toString()), n != null && (this.coords = n), i != null && (this.bcs = new Set(i));
  }
  change2(t) {
    t.label != null && (this.label = t.label.toString()), t.coords != null && (this.coords = t.coords), t.bcs != null && (this.bcs = new Set(t.bcs)), t.lcs != null && this.updateLcs(t.lcs);
  }
  getLocationArray(t) {
    return this.domain.solver.getNodeLocationArray(this.label, t);
  }
  getUnknowns(t, n) {
    const i = this.getLocationArray(n);
    return Ae(t.r, De(i));
  }
  getEigenValueUnknowns(t, n, i) {
    const r = this.getLocationArray(n);
    return Ae(t.eigenVectors[i], De(r));
  }
  /**
   * Returns receiver transformation matrix (from nodal to global c.s., ie. rg=t*r_n)
   * @param dofs dofs mask to consider
   */
  getTransformationMtrx(t) {
    const n = t.length;
    if (this.lcs == null)
      return rt(n);
    {
      const i = He([n, n]);
      for (let r = 0; r < n; r++) {
        const a = t[r];
        switch (a) {
          case qe.Dx:
          case qe.Dy:
          case qe.Dz:
            for (let o = 0; o < n; o++) {
              const h = t[o];
              (h == qe.Dx || h == qe.Dy || h == qe.Dz) && (i[r][o] = this.lcs[h][a]);
            }
            break;
          case qe.Rx:
          case qe.Ry:
          case qe.Rz:
            for (let o = 0; o < n; o++) {
              const h = t[o];
              (h == qe.Rx || h == qe.Ry || h == qe.Rz) && (i[r][o] = this.lcs[h - qe.Rx][a - qe.Rx]);
            }
            break;
          default:
            throw new TypeError("Unknown DofID: " + a);
        }
      }
      return ye(i);
    }
  }
  /**
   * Updates the reciver lcs triplet according to given lcs orientation
   * @param lcs
   */
  updateLcs(t) {
    if (t == null)
      this.lcs = void 0;
    else {
      this.lcs = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      const n = vi(t.locx), i = vi(t.locy);
      for (let r = 0; r < 3; r++)
        this.lcs[0][r] = t.locx[r] / n, this.lcs[1][r] = t.locy[r] / i;
      this.lcs[2][0] = this.lcs[0][1] * this.lcs[1][2] - this.lcs[0][2] * this.lcs[1][1], this.lcs[2][1] = this.lcs[0][2] * this.lcs[1][0] - this.lcs[0][0] * this.lcs[1][2], this.lcs[2][2] = this.lcs[0][0] * this.lcs[1][1] - this.lcs[0][1] * this.lcs[1][0];
    }
  }
  /**
   * Returns true if receiver has local c.s.
   */
  hasLcs() {
    return this.lcs != null;
  }
  getReactions(t, n = !1) {
    if (n && this.hasLcs()) {
      const i = this.domain.solver.getNodeDofIDs(this.label), r = this.getLocationArray(i), a = [];
      for (let h = 0; h < i.length; h++)
        this.bcs.has(i[h]) ? a.push(Ae(t.R, De([r[h] - this.domain.solver.neq]))) : a.push(0);
      const o = this.getTransformationMtrx(i);
      return {
        dofs: i,
        values: fe(o, a).toArray()
      };
    } else if (this.bcs.size > 0) {
      const i = Array.from(this.bcs), r = this.getLocationArray(i), a = sr(r, this.domain.solver.neq), o = Ae(t.R, De(a));
      return A0(o) === "number" ? { dofs: i, values: [o] } : { dofs: i, values: o };
    } else
      return { dofs: [], values: [] };
  }
}
class V0 {
  // domain reference
  /**
   * Constructor
   * @param label new label
   * @param nodes element nodes
   * @param mat element material number
   * @param cs element cross section number
   */
  constructor(t, n, i, r, a) {
    se(this, "label");
    //element number
    se(this, "nodes");
    // element nodes
    se(this, "mat");
    // material
    se(this, "cs");
    // cross section
    se(this, "domain");
    this.label = t.toString(), this.nodes = i.map((o) => o.toString()), this.mat = r.toString(), this.cs = a.toString(), this.domain = n;
  }
  /**
   * Change receiver properties
   * @param label new label
   * @param nodes nodes
   * @param mat new material (number)
   * @param cs new cross section (number)
   */
  change(t, n, i, r) {
    t != null && (this.label = t.toString()), n != null && (this.nodes = n.map((a) => a.toString())), i != null && (this.mat = i.toString()), r != null && (this.cs = r.toString());
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
  getNodeDofs(t) {
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
    return ye();
  }
}
class Z0 extends V0 {
  /**
   * Constructor
   * @param label element label (num)
   * @param nodes element nodes
   * @param mat element material (num)
   * @param cs element cross section (num)
   * @param hinges array of two boolean values indicating if hinge is present at start or end
   */
  constructor(n, i, r, a, o, h = [!1, !1]) {
    super(n, i, r, a, o);
    se(this, "hinges");
    // indicates element hinges
    se(this, "diagonalMassMatrix", !1);
    this.hinges = h;
  }
  getNodeDofs(n) {
    return [qe.Dx, qe.Dz, qe.Ry];
  }
  getLocationArray() {
    let n = Array();
    for (const i of this.nodes)
      n = n.concat(this.domain.solver.getNodeLocationArray(i, [qe.Dx, qe.Dz, qe.Ry]));
    return n;
  }
  // evaluates l, dx, dz
  /**
   * Returns Beam2D geometry object containing l: length, dx: element projection in to x axis, dz: element projection in z axis
   */
  computeGeo() {
    const n = this.domain.getNode(this.nodes[0]).coords, i = this.domain.getNode(this.nodes[1]).coords, r = i[0] - n[0], a = i[2] - n[2];
    return { l: Math.sqrt(r * r + a * a), dx: r, dz: a };
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
    const n = this.computeGeo(), i = n.dx / n.l, r = n.dz / n.l;
    let a = ye([
      [i, r, 0, 0, 0, 0],
      [-r, i, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, i, r, 0],
      [0, 0, 0, -r, i, 0],
      [0, 0, 0, 0, 0, 1]
    ]);
    if (this.domain.getNode(this.nodes[0]).hasLcs() || this.domain.getNode(this.nodes[1]).hasLcs()) {
      let o = He(6);
      o = Ae(
        o,
        De([0, 1, 2], [0, 1, 2]),
        this.domain.getNode(this.nodes[0]).getTransformationMtrx(this.getNodeDofs(this.nodes[0]))
      ), o = Ae(
        o,
        De([3, 4, 5], [3, 4, 5]),
        this.domain.getNode(this.nodes[1]).getTransformationMtrx(this.getNodeDofs(this.nodes[1]))
      ), a = fe(a, o);
    }
    return a;
  }
  /**
   * Computes Beam2D local stifness matrix
   * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
   */
  computeLocalStiffnessMtrx(n = !1) {
    const i = this.computeGeo(), r = this.getMaterial(), a = this.getCS(), o = r.e * a.a, h = r.e * a.iy, c = i.l, l = c * c, s = l * c, u = 12 * h / (a.k * r.g * a.a * c * c), f = 1 + u, p = ye([
      [o / c, 0, 0, -o / c, 0, 0],
      [0, 12 * h / s / f, -6 * h / l / f, 0, -12 * h / s / f, -6 * h / l / f],
      [0, -6 * h / l / f, (4 + u) * h / c / f, 0, 6 * h / l / f, (2 - u) * h / c / f],
      [-o / c, 0, 0, o / c, 0, 0],
      [0, -12 * h / s / f, 6 * h / l / f, 0, 12 * h / s / f, 6 * h / l / f],
      [0, -6 * h / l / f, (2 - u) * h / c / f, 0, 6 * h / l / f, (4 + u) * h / c / f]
    ]);
    if (this.hasHinges()) {
      if (this.hinges[0] && this.hinges[1])
        var D = [0, 1, 3, 4], v = [2, 5];
      else if (this.hinges[0])
        var D = [0, 1, 3, 4, 5], v = [2];
      else if (this.hinges[1])
        var D = [0, 1, 2, 3, 4], v = [5];
      const m = p.subset(De(D, D)), d = p.subset(De(D, v)), w = p.subset(De(v, v)), g = sr(m, fe(fe(d, cr(w)), Ze(d)));
      let A = He(6, 6);
      return A = Ae(A, De(D, D), g), n ? {
        answer: A,
        a: D,
        b: v,
        kaa: m,
        kab: d,
        kbb: w
      } : { answer: A };
    }
    return { answer: p };
  }
  /**
   * Computes local initial stress matrix
   * @param N normal force
   */
  computeLocalInitialStressMtrx(n) {
    const i = this.computeGeo(), r = this.getMaterial(), a = this.getCS(), o = i.l, h = o * o, c = n / o, l = 12 * r.e * a.iy / (a.k * r.g * a.a * o * o), s = l * l, u = ye([
      [0, 0, 0, 0, 0, 0],
      [0, 6 / 5 + 2 * l + s, -o / 10, 0, -6 / 5 - 2 * l - s, -o / 10],
      [
        0,
        -o / 10,
        2 * h / 15 + h * l / 6 + h * s / 12,
        0,
        o / 10,
        -h / 30 - h * l / 6 - h * s / 12
      ],
      [0, 0, 0, 0, 0, 0],
      [0, -6 / 5 - 2 * l - s, o / 10, 0, 6 / 5 + 2 * l + s, o / 10],
      [
        0,
        -o / 10,
        -h / 30 - h * l / 6 - h * s / 12,
        0,
        o / 10,
        2 * h / 15 + h * l / 6 + h * s / 12
      ]
    ]);
    fe(u, c / (1 + l) / (1 + l));
    const f = Math.min(Math.abs(u[1][1]), Math.abs(u[2][2])) / 1e3;
    if (u[0][0] = f, u[0][3] = -f, u[3][0] = -f, u[3][3] = f, this.hasHinges()) {
      const p = this.computeLocalStiffnessMtrx(!0), D = et(p.a)[0], v = He(6, D);
      Ae(v, De(p.a, Tr(0, D)), rt(D)), Ae(
        v,
        De(p.b, Tr(0, D)),
        fe(fe(cr(p.kbb), Ze(p.kab)), -1)
      );
      const m = fe(Ze(v), fe(u, v)), d = He(6, 6);
      return Ae(p.a, De(p.a, p.a), m), d;
    }
    return u;
  }
  /**
   * Computes Beam2D local stifness matrix
   * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
   */
  computeLocalMassMatrix(n = !1) {
    const i = this.computeGeo(), r = this.getMaterial(), a = this.getCS(), o = i.l, h = o * o;
    if (!this.diagonalMassMatrix)
      return fe(
        r.d * a.a * o / 420,
        ye([
          [140, 0, 0, 70, 0, 0],
          [0, 156, -22 * o, 0, 54, 13 * o],
          [0, -22 * o, 4 * o * o, 0, -13 * o, -3 * o * o],
          [70, 0, 0, 140, 0, 0],
          [0, 54, -13 * o, 0, 156, 22 * o],
          [0, 13 * o, -3 * o * o, 0, 22 * o, 4 * o * o]
        ])
      );
    const c = 1 / 78;
    return fe(
      r.d * a.a * o,
      ye([
        [1 / 2, 0, 0, 0, 0, 0],
        [0, 1 / 2, 0, 0, 0, 0],
        [0, 0, c * h, 0, 0, 0],
        [0, 0, 0, 1 / 2, 0, 0],
        [0, 0, 0, 0, 1 / 2, 0],
        [0, 0, 0, 0, 0, c * h]
      ])
    );
  }
  /**
   * Evaluate element stiffness matrix in global c.s.
   */
  computeStiffness() {
    this.computeGeo();
    const n = this.computeLocalStiffnessMtrx(), i = this.computeT();
    return fe(fe(Ze(i), n.answer), i);
  }
  /**
   * Evaluate element mass matrix in global c.s.
   */
  computeMassMatrix() {
    this.computeGeo();
    const n = this.computeLocalMassMatrix(), i = this.computeT();
    return fe(fe(Ze(i), n), i);
  }
  /**
   * Evaluates initial stress matrix in global c.s.
   * @param N Element normal force
   */
  computeInitialStressMatrix(n) {
    const i = this.computeLocalInitialStressMtrx(n), r = this.computeT();
    return fe(fe(Ze(r), i), r);
  }
  /**
   * Computes element end displacement vector (in element local c.s.)
   * @param r global vector of unknowns
   */
  computeEndDisplacement(n) {
    const i = this.computeT(), r = this.getLocationArray();
    let a = fe(i, Ae(n.r, De(r)));
    if (this.hasHinges()) {
      const o = this.computeLocalStiffnessMtrx(!0);
      let h = He(6);
      for (const c of n.getElementLoadsOnElement(this.label))
        h = ar(h, c.getLoadVectorForClampedBeam());
      this.hasHinges() && (a = Ae(
        a,
        De(o.b),
        fe(
          cr(o.kbb),
          fe(
            ar(
              Ae(h, De(o.b)),
              Dr(fe(Ze(o.kab), Ae(a, De(o.a))))
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
    const i = this.computeT(), r = this.getLocationArray(), a = fe(i, Ae(n.r, De(r))), o = this.computeLocalStiffnessMtrx(!0);
    let h = fe(o.answer, a), c = He(6);
    for (const l of n.getElementLoadsOnElement(this.label))
      c = ar(c, l.getLoadVectorForClampedBeam());
    if (this.hasHinges()) {
      const l = fe(o.kab, cr(o.kbb));
      if (o.b.length == 1) {
        const s = c.get(o.b);
        for (let u = 0; u < o.a.length; u++)
          h.set([o.a[u]], h.get([o.a[u]]) + c.get([o.a[u]]) - l.get([u, 0]) * s);
      } else {
        const s = sr(
          Ae(c, De(o.a)),
          fe(l, Ae(c, De(o.b)))
        );
        h = ar(h, Ae(h, De(o.a), s));
      }
    } else
      h = ar(h, c);
    return h;
  }
  /**
   * Computes nseg+1 values of local deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeLocalDefl(n, i) {
    const r = this.computeEndDisplacement(n), a = [], o = [], c = this.computeGeo().l, l = n.getElementLoadsOnElement(this.label);
    for (let s = 0; s <= i; s++) {
      const u = s / i;
      let f = (1 - 3 * u * u + 2 * u * u * u) * r.get([1]) + c * (-u + 2 * u * u - u * u * u) * r.get([2]) + (3 * u * u - 2 * u * u * u) * r.get([4]) + c * (u * u - u * u * u) * r.get([5]), p = (1 - u) * r.get([0]) + u * r.get([3]);
      for (const D of l) {
        const v = D.computeBeamDeflectionContrib(u);
        f += v.w, p += v.u;
      }
      a.push(p), o.push(f);
    }
    return { u: a, w: o };
  }
  /**
   * Computes nseg+1 values of global deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeGlobalDefl(n, i) {
    const r = this.computeLocalDefl(n, i), a = this.computeGeo(), o = a.dx / a.l, h = a.dz / a.l, c = [], l = [];
    for (let s = 0; s <= i; s++)
      c.push(r.u[s] * o - r.w[s] * h), l.push(r.w[s] * o + r.u[s] * h);
    return { u: c, w: l };
  }
  /**
   * Computes element end displacement vector (in element local c.s.)
   * @param r global vector of unknowns
   */
  computeEndDisplacementEigenMode(n, i) {
    const r = this.computeT(), a = this.getLocationArray();
    let o = fe(r, Ae(n.eigenVectors[i], De(a)));
    if (this.hasHinges()) {
      const h = this.computeLocalStiffnessMtrx(!0), c = He(6);
      this.hasHinges() && (o = Ae(
        o,
        De(h.b),
        fe(
          cr(h.kbb),
          fe(
            ar(
              Ae(c, De(h.b)),
              Dr(fe(Ze(h.kab), Ae(o, De(h.a))))
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
  computeLocalEigenMode(n, i, r) {
    const a = this.computeEndDisplacementEigenMode(n, i), o = [], h = [], l = this.computeGeo().l;
    for (let s = 0; s <= r; s++) {
      const u = s / r, f = (1 - 3 * u * u + 2 * u * u * u) * a.get([1]) + l * (-u + 2 * u * u - u * u * u) * a.get([2]) + (3 * u * u - 2 * u * u * u) * a.get([4]) + l * (u * u - u * u * u) * a.get([5]), p = (1 - u) * a.get([0]) + u * a.get([3]);
      o.push(p), h.push(f);
    }
    return { u: o, w: h };
  }
  /**
   * Computes nseg+1 values of global deflections
   * @param lc reference to load case
   * @param ntheig n-th eigen value
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeGlobalEigenMode(n, i, r) {
    const a = this.computeLocalEigenMode(n, i, r), o = this.computeGeo(), h = o.dx / o.l, c = o.dz / o.l, l = [], s = [];
    for (let u = 0; u <= r; u++)
      l.push(a.u[u] * h - a.w[u] * c), s.push(a.w[u] * h + a.u[u] * c);
    return { u: l, w: s };
  }
  /**
   * Computes the values of normal force along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeNormalForce(n, i) {
    const r = this.computeEndForces(n), a = this.computeGeo(), o = [], h = [], c = n.getElementLoadsOnElement(this.label);
    for (let l = 0; l <= i; l++) {
      const s = a.l * l / i;
      let u = -r.get([0]);
      for (const f of c)
        u += f.computeBeamNContrib(s);
      o.push(s), h.push(u);
    }
    return { x: o, N: h };
  }
  computeNormalForceAt(n, i) {
    const r = this.computeEndForces(n), a = n.getElementLoadsOnElement(this.label);
    let o = -r.get([0]);
    for (const h of a)
      o += h.computeBeamNContrib(i);
    return o;
  }
  /**
   * Computes the values of shear force along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeShearForce(n, i) {
    const r = this.computeEndForces(n), a = this.computeGeo(), o = [], h = [], c = n.getElementLoadsOnElement(this.label);
    for (let l = 0; l <= i; l++) {
      const s = a.l * l / i;
      let u = -r.get([1]);
      for (const f of c)
        u += f.computeBeamVContrib(s);
      o.push(s), h.push(u);
    }
    return { x: o, V: h };
  }
  computeShearForceAt(n, i) {
    const r = this.computeEndForces(n), a = n.getElementLoadsOnElement(this.label);
    let o = -r.get([1]);
    for (const h of a)
      o += h.computeBeamVContrib(i);
    return o;
  }
  /**
   * Computes the values of bending moment along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeBendingMoment(n, i) {
    const r = this.computeEndForces(n), a = this.computeGeo(), o = [], h = [], c = n.getElementLoadsOnElement(this.label);
    for (let l = 0; l <= i; l++) {
      const s = a.l * l / i;
      let u = -r.get([2]) - r.get([1]) * s;
      for (const f of c)
        u += f.computeBeamMContrib(s);
      o.push(s), h.push(u);
    }
    return { x: o, M: h };
  }
  computeBendingMomentAt(n, i) {
    const r = this.computeEndForces(n), a = n.getElementLoadsOnElement(this.label);
    let o = -r.get([2]) - r.get([1]) * i;
    for (const h of a)
      o += h.computeBeamMContrib(i);
    return o;
  }
}
class Ea {
  /**
   * Returns load vector for clamped beam
   * @param elem element number
   */
  constructor(t, n) {
    se(this, "target");
    // component number the target is applied
    se(this, "domain");
    this.target = t.toString(), this.domain = n;
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
class G0 extends Ea {
  constructor(n, i, r = {}) {
    super(n, i);
    se(this, "values");
    this.values = r;
  }
  change(n, i) {
    this.target = n.toString(), this.values = i;
  }
  getLoadVector() {
    const n = this.domain.solver.getNodeDofIDs(this.target), i = Array();
    for (const r of n)
      r in this.values ? i.push(this.values[r]) : i.push(0);
    return i;
  }
  getLocationArray() {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
class tn extends Ea {
  getLoadVectorForClampedBeam() {
    return [];
  }
  computeBeamDeflectionContrib(t) {
    return { u: 0, w: 0 };
  }
  computeBeamNContrib(t) {
    return 0;
  }
  computeBeamVContrib(t) {
    return 0;
  }
  computeBeamMContrib(t) {
    return 0;
  }
}
class Y0 extends tn {
  constructor(n, i, r, a) {
    super(n, i);
    se(this, "values");
    // Fx, Fz, My, distance x
    se(this, "lcs");
    this.values = r, this.lcs = a;
  }
  change(n, i, r) {
    this.target = n.toString(), this.values = i, this.lcs = r;
  }
  getGlobalIntensities() {
    const n = this.values[0], i = this.values[1];
    if (this.lcs) {
      const r = this.domain.getElement(this.target).computeGeo(), a = r.dx / r.l, o = r.dz / r.l;
      return { fx: n * a - i * o, fz: n * o + i * a, my: 0 };
    } else
      return { fx: n, fz: i, my: 0 };
  }
  getLocalIntensities() {
    const n = this.values[0], i = this.values[1], r = this.domain.getElement(this.target).computeGeo(), a = r.l, o = r.dx, h = r.dz, c = o / a, l = h / a;
    return this.lcs ? { fx: n, fz: i } : {
      fx: n * c + i * l,
      fz: -n * l + i * c
    };
  }
  getLoadVectorForClampedBeam() {
    const i = this.domain.getElement(this.target).computeGeo().l, r = this.values[3], a = i - r;
    return [
      -a / i * this.values[0],
      a / i * (r * (r - a) / i / i - 1) * this.values[1],
      r * a * a / i / i * this.values[1],
      -r / i * this.values[0],
      r / i * (a * (a - r) / i / i - 1) * this.values[1],
      -r * r * a / i / i * this.values[1]
    ];
  }
  getLocationArray() {
    return this.domain.getElement(this.target).getLocationArray();
  }
  getLoadVector() {
    const n = this.domain.getElement(this.target), i = n.computeT(), r = this.getLoadVectorForClampedBeam();
    if (n.hasHinges()) {
      const a = n.computeLocalStiffnessMtrx(!0);
      let o = [0, 0, 0, 0, 0, 0];
      const h = fe(a.kab, cr(a.kbb));
      if (a.b.length == 1) {
        const c = r[a.b[0]];
        for (let l = 0; l < a.a.length; l++)
          o[a.a[l]] = r[a.a[l]] - h.get([l, 0]) * c;
        return fe(fe(Ze(i), o), -1).toArray();
      } else {
        const c = sr(
          Ae(r, De(a.a)),
          fe(h, Ae(r, De(a.b)))
        );
        return o = Ae(o, De(a.a), c), fe(fe(Ze(i), o), -1).toArray();
      }
    } else
      return fe(fe(Ze(i), r), -1).toArray();
  }
  computeBeamDeflectionContrib(n) {
    const i = this.getLocalIntensities(), o = this.domain.elements.get(this.target).computeGeo().l, h = i.fx, c = i.fz, l = this.domain.getElement(this.target).getMaterial().e, s = this.domain.getElement(this.target).getCS().a, u = this.domain.getElement(this.target).getCS().iy, f = this.values[3], p = o - f, D = p / o * (f * (f - p) / o / o - 1) * c, v = f * p * p / o / o * c, m = l * u, d = l * s, w = n * o;
    let g = 0, A = 0;
    return w < f ? g += p / o * h * w / d : g += p / o * h * f / d - f / o * h * (w - f) / d, w > f ? A = (D * Math.pow(w, 3) / 6 + v * Math.pow(w, 2) / 2 + c * Math.pow(w - f, 3) / 6) / m : A = (D * Math.pow(w, 3) / 6 + v * Math.pow(w, 2) / 2) / m, { u: g, w: A };
  }
  computeBeamNContrib(n) {
    const i = this.getLocalIntensities(), r = this.values[3];
    return n < r ? 0 : -i.fx;
  }
  computeBeamVContrib(n) {
    const i = this.getLocalIntensities(), r = this.values[3];
    return n < r ? 0 : -i.fz;
  }
  computeBeamMContrib(n) {
    const i = this.getLocalIntensities(), r = this.values[3];
    return n < r ? 0 : -i.fz * (n - r);
  }
}
class J0 extends tn {
  // true if values in element local c.s (along length)
  constructor(n, i, r, a) {
    super(n, i);
    se(this, "values");
    // fx, fz intensities
    se(this, "lcs");
    this.values = r, this.lcs = a;
  }
  change(n, i, r) {
    this.target = n.toString(), this.values = i, this.lcs = r;
  }
  getGlobalIntensities() {
    const n = this.values[0], i = this.values[1];
    if (this.lcs) {
      const r = this.domain.getElement(this.target).computeGeo(), a = r.dx / r.l, o = r.dz / r.l;
      return { fx: n * a - i * o, fz: n * o + i * a, my: 0 };
    } else
      return { fx: n, fz: i, my: 0 };
  }
  getLocalIntensities() {
    const n = this.values[0], i = this.values[1], r = this.domain.getElement(this.target).computeGeo(), a = r.l, o = r.dx, h = r.dz, c = o / a, l = h / a;
    return this.lcs ? { fx: n, fz: i } : {
      fx: n * c + i * l,
      fz: -n * l + i * c
    };
  }
  // in local c.s
  getLoadVectorForClampedBeam() {
    const n = this.domain.getElement(this.target).computeGeo(), i = this.getLocalIntensities(), r = i.fx, a = i.fz, o = n.l;
    return [-0.5 * o * r, -0.5 * o * a, 1 / 12 * a * o * o, -0.5 * o * r, -0.5 * o * a, -1 / 12 * a * o * o];
  }
  getLocationArray() {
    return this.domain.getElement(this.target).getLocationArray();
  }
  getLoadVector() {
    const n = this.domain.getElement(this.target), i = n.computeT(), r = this.getLoadVectorForClampedBeam();
    if (n.hasHinges()) {
      const a = n.computeLocalStiffnessMtrx(!0);
      let o = [0, 0, 0, 0, 0, 0];
      const h = fe(a.kab, cr(a.kbb));
      if (a.b.length == 1) {
        const c = r[a.b[0]];
        for (let l = 0; l < a.a.length; l++)
          o[a.a[l]] = r[a.a[l]] - h.get([l, 0]) * c;
        return fe(fe(Ze(i), o), -1).toArray();
      } else {
        const c = sr(
          Ae(r, De(a.a)),
          fe(h, Ae(r, De(a.b)))
        );
        return o = Ae(o, De(a.a), c), fe(fe(Ze(i), o), -1).toArray();
      }
    } else
      return fe(fe(Ze(i), r), -1).toArray();
  }
  computeBeamDeflectionContrib(n) {
    const i = this.getLocalIntensities(), r = this.domain.elements.get(this.target), o = r.computeGeo().l;
    return { u: 0, w: i.fz * o * o * o * o * (n * n * n * n / 24 - n * n * n / 12 + n * n / 24) / (r.getMaterial().e * r.getCS().iy) };
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
class Q0 {
  /**
   * Constructor
   */
  constructor(t, n, i) {
    se(this, "target");
    // node (umber) subjected to Prescribed Displacement
    se(this, "prescribedValues");
    // prescribed values of individual DOFs
    se(this, "domain");
    this.target = t.toString(), this.prescribedValues = i, this.domain = n;
  }
  getNodePrescribedDisplacementVector() {
    const t = new Array(), n = this.domain.solver.getNodeDofIDs(this.target);
    for (const i of n)
      i in this.prescribedValues ? t.push(this.prescribedValues[i]) : t.push(0);
    return t;
  }
  getLocationArray() {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
const X0 = {};
class H0 {
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
  constructor(t, n = {}) {
    se(this, "label");
    // label of receiver
    se(this, "a");
    // cross section area of receiver [m2]. > 0.0
    se(this, "iy");
    // area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
    se(this, "iz");
    // area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
    se(this, "dyz");
    // product moment of area with respect to yz axes [m4]
    se(this, "h");
    // height of receiver [m]
    se(this, "k");
    // Timoshenko's shear coefficient [-]
    se(this, "j");
    this.label = t.toString(), n = { ...X0, ...n }, this.a = n.a, this.iy = n.iy, this.iz = n.iz, this.dyz = n.dyz, this.h = n.h, this.k = n.k, this.j = n.j;
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
  change(t) {
    t.a != null && (this.a = t.a), t.iy != null && (this.iy = t.iy), t.iz != null && (this.iz = t.iz), t.dyz != null && (this.dyz = t.dyz), t.h != null && (this.h = t.h), t.k != null && (this.k = t.k), t.j != null && (this.j = t.j);
  }
}
const K0 = { e: 1, g: 1, alpha: 1, d: 1 };
class W0 {
  // mass density [kg/m3]
  /**
   * @param  label int label of receiver
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  constructor(t, n = {}) {
    se(this, "label");
    //  label
    se(this, "e");
    // Young's modulus [Pa]
    se(this, "g");
    // Shear modulus [Pa]
    se(this, "alpha");
    // thermal dillatation coefficient [K-1]
    se(this, "d");
    this.label = t.toString(), n = { ...K0, ...n }, this.e = n.e, this.g = n.g, this.alpha = n.alpha, this.d = n.d;
  }
  /**
   * Change receiver properties
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  change(t) {
    t.e !== void 0 && (this.e = t.e), t.g !== void 0 && (this.g = t.g), t.alpha !== void 0 && (this.alpha = t.alpha), t.d !== void 0 && (this.d = t.d);
  }
}
class k0 {
  /**
   * Constructor
   */
  constructor(t) {
    se(this, "solver");
    se(this, "nodes", /* @__PURE__ */ new Map());
    se(this, "elements", /* @__PURE__ */ new Map());
    se(this, "materials", /* @__PURE__ */ new Map());
    se(this, "crossSections", /* @__PURE__ */ new Map());
    this.solver = t;
  }
  getNode(t) {
    const n = t.toString();
    if (this.nodes.has(n))
      return this.nodes.get(n);
    throw new RangeError("Node label " + t + " does not exists");
  }
  getElement(t) {
    const n = t.toString();
    if (this.elements.has(n))
      return this.elements.get(n);
    throw new RangeError("Element label " + t + " does not exists");
  }
  getMaterial(t) {
    const n = t.toString();
    if (this.materials.has(n))
      return this.materials.get(n);
    throw new RangeError("Material label " + t + " does not exists");
  }
  getCS(t) {
    const n = t.toString();
    if (this.crossSections.has(n))
      return this.crossSections.get(n);
    throw new RangeError("CrossSection label " + t + " does not exists");
  }
  // class factory
  createNode(t, n = [0, 0, 0], i = []) {
    const r = new U0(t, this, n, i);
    return this.nodes.set(t.toString(), r), r;
  }
  createBeam2D(t, n, i, r, a = [!1, !1]) {
    const o = new Z0(t, this, n, i, r, a);
    return this.elements.set(t.toString(), o), o;
  }
  createMaterial(t, n = {}) {
    const i = new W0(t, n);
    return this.materials.set(t.toString(), i), i;
  }
  createCrossSection(t, n = {}) {
    const i = new H0(t, n);
    return this.crossSections.set(t.toString(), i), i;
  }
}
class j0 {
  constructor() {
    se(this, "domain");
    se(this, "neq");
    // number of unknowns
    se(this, "pneq");
    // number of prescribed unknowns
    se(this, "k");
    se(this, "m");
    se(this, "f");
    se(this, "loadCases", new Array());
    se(this, "codeNumberGenerated", !1);
    // code numbers assigned to supported as well as free DOFs
    se(this, "nodeCodeNumbers", /* @__PURE__ */ new Map());
    this.domain = new k0(this), this.loadCases.push(new rh("DefaultLC", this.domain));
  }
  getNodeLocationArray(t, n) {
    let i = [];
    for (const r of n)
      i = i.concat(this.nodeCodeNumbers.get(t)[r]);
    return i;
  }
  getNodeDofIDs(t) {
    const n = [];
    for (const i in this.nodeCodeNumbers.get(t))
      n.push(parseInt(i));
    return n;
  }
  generateCodeNumbers() {
    const t = /* @__PURE__ */ new Map();
    for (const [r, a] of this.domain.nodes)
      this.nodeCodeNumbers.set(r, {}), t.set(r, /* @__PURE__ */ new Set());
    for (const [r, a] of this.domain.elements)
      for (const o of a.nodes) {
        const h = a.getNodeDofs(o);
        for (const c of h)
          if (t.has(o))
            t.get(o).add(c);
          else
            throw console.log(o, o in t, t.get(o)), new RangeError("Node label " + o + " does not exists");
      }
    this.neq = 0, this.pneq = 0;
    for (const [r, a] of this.domain.nodes)
      for (const o of t.get(r))
        a.bcs.has(o) ? this.pneq++ : this.neq++;
    let n = 0, i = this.neq;
    for (const [r, a] of this.domain.nodes)
      for (const o of t.get(r))
        a.bcs.has(o) ? this.nodeCodeNumbers.get(r)[o] = i++ : this.nodeCodeNumbers.get(r)[o] = n++;
    this.codeNumberGenerated = !0;
  }
  assembleVecLC(t, n, i, r) {
    for (let a = 0; a < i.length; a++)
      t.set([i[a], r], t.get([i[a], r]) + n[a]);
  }
  assembleVec(t, n, i) {
    for (let r = 0; r < i.length; r++)
      t.set([i[r]], t.get([i[r]]) + n[r]);
  }
}
class nh extends j0 {
  assemble() {
    this.k = He(this.neq + this.pneq, this.neq + this.pneq);
    for (const [t, n] of this.domain.elements) {
      const i = n.computeStiffness(), r = n.getLocationArray(), a = et(r)[0];
      for (let o = 0; o < a; o++) {
        const h = r[o];
        for (let c = 0; c < a; c++) {
          const l = r[c];
          this.k.set([h, l], this.k.get([h, l]) + i.get([o, c]));
        }
      }
    }
    this.f = He(this.neq + this.pneq, this.loadCases.length);
    for (let t = 0; t < this.loadCases.length; t++) {
      this.loadCases[t].r = He(this.neq + this.pneq);
      const n = this.loadCases[t];
      for (const i of n.nodalLoadList)
        this.assembleVecLC(this.f, i.getLoadVector(), i.getLocationArray(), t);
      for (const i of n.elementLoadList)
        this.assembleVecLC(this.f, i.getLoadVector(), i.getLocationArray(), t);
      for (const i of n.prescribedBC)
        this.assembleVec(n.r, i.getNodePrescribedDisplacementVector(), i.getLocationArray());
    }
  }
  solve() {
    const t = /* @__PURE__ */ new Date();
    this.codeNumberGenerated || this.generateCodeNumbers();
    const n = Tr(0, this.neq), i = Tr(this.neq, this.neq + this.pneq);
    if (this.assemble(), this.neq > 0)
      for (let o = 0; o < this.loadCases.length; o++) {
        this.loadCases[o].solved = !1;
        const h = Ae(this.loadCases[o].r, De(i)), c = fe(Ae(this.k, De(n, i)), h);
        let l = Ae(this.k, De(n, n));
        typeof l == "number" && (l = ye([[l]]));
        let s = Ae(this.f, De(n, [o]));
        typeof s == "number" && (s = ye([s]));
        const u = sr(Dr(s), c), f = Dr(P0(l, u));
        this.loadCases[o].r = Ae(this.loadCases[o].r, De(Tr(0, this.neq)), f), this.loadCases[o].R = Dr(fe(Ae(this.k, De(i, n)), f)), this.loadCases[o].R = sr(
          this.loadCases[o].R,
          Dr(Ae(this.f, De(i, [o])))
        ), this.loadCases[o].solved = !0;
      }
    else
      for (let o = 0; o < this.loadCases.length; o++)
        this.loadCases[o].R = Dr(fe(this.k, this.loadCases[o].r)), this.loadCases[o].R = sr(
          this.loadCases[o].R,
          Dr(Ae(this.f, De(i, [o])))
        ), this.loadCases[o].solved = !0;
    const a = (/* @__PURE__ */ new Date()).getTime() - t.getTime();
    console.log("Solution took ", Math.round(a * 100) / 100, " [ms]");
  }
}
class eh extends tn {
  // fx, fz intensities
  constructor(n, i, r) {
    super(n, i);
    se(this, "values");
    this.values = r;
  }
  change(n, i) {
    this.target = n.toString(), this.values = i;
  }
  // in local c.s
  getLoadVectorForClampedBeam() {
    const n = this.domain.getElement(this.target).getMaterial(), i = this.domain.getElement(this.target).getCS(), r = n.e, a = n.alpha, o = i.a, h = i.iy, c = i.h, l = this.values[1] - this.values[2];
    return [
      +r * o * a * this.values[0],
      0,
      +(r * h * a * l) / c,
      -r * o * a * this.values[0],
      0,
      -(r * h * a * l) / c
    ];
  }
  getLocationArray() {
    return this.domain.getElement(this.target).getLocationArray();
  }
  getLoadVector() {
    const n = this.domain.getElement(this.target), i = n.computeT(), r = this.getLoadVectorForClampedBeam();
    if (n.hasHinges()) {
      const a = n.computeLocalStiffnessMtrx(!0);
      let o = [0, 0, 0, 0, 0, 0];
      const h = fe(a.kab, cr(a.kbb));
      if (a.b.length == 1) {
        const c = r[a.b[0]];
        for (let l = 0; l < a.a.length; l++)
          o[a.a[l]] = r[a.a[l]] - h.get([l, 0]) * c;
        return fe(fe(Ze(i), o), -1).toArray();
      } else {
        const c = sr(
          Ae(r, De(a.a)),
          fe(h, Ae(r, De(a.b)))
        );
        return o = Ae(o, De(a.a), c), fe(fe(Ze(i), o), -1).toArray();
      }
    } else
      return fe(fe(Ze(i), r), -1).toArray();
  }
  computeBeamDeflectionContrib(n) {
    return { u: 0, w: 0 };
  }
  computeBeamNContrib(n) {
    return 0;
  }
  computeBeamVContrib(n) {
    return 0;
  }
  computeBeamMContrib(n) {
    return 0;
  }
}
class rh {
  /**
   * Creates a new loadcase
   * @param label load case name
   */
  constructor(t, n) {
    se(this, "label");
    se(this, "domain");
    // domain reference
    // dictionary (map), key is node number, value is PrescribedDisplacement object applied
    se(this, "bcMap", {});
    // Array of loads applied
    se(this, "nodalLoadList", new Array());
    se(this, "elementLoadList", new Array());
    se(this, "prescribedBC", new Array());
    // solution vector
    se(this, "r", He(0));
    // vector of reactions
    se(this, "R", He(0));
    // omegas
    se(this, "eigenNumbers", []);
    se(this, "eigenVectors", []);
    se(this, "solved", !1);
    this.label = t, this.domain = n;
  }
  /**
   * Returns list of applied element loads on element with given number
   * param e element number
   */
  getElementLoadsOnElement(t) {
    const n = [];
    for (const i of this.elementLoadList)
      i.target == t && n.push(i);
    return n;
  }
  //class factory
  createNodalLoad(t, n = {}) {
    const i = new G0(t, this.domain, n);
    return this.nodalLoadList.push(i), i;
  }
  createBeamElementUniformEdgeLoad(t, n, i) {
    const r = new J0(t, this.domain, n, i);
    return this.elementLoadList.push(r), r;
  }
  createBeamConcentratedLoad(t, n, i) {
    const r = new Y0(t, this.domain, n, i);
    return this.elementLoadList.push(r), r;
  }
  createBeamTemperatureLoad(t, n) {
    const i = new eh(t, this.domain, n);
    return this.elementLoadList.push(i), i;
  }
  createPrescribedDisplacement(t, n) {
    const i = new Q0(t, this.domain, n);
    return this.prescribedBC.push(i), i;
  }
}
var qe = /* @__PURE__ */ ((e) => (e[e.Dx = 0] = "Dx", e[e.Dy = 1] = "Dy", e[e.Dz = 2] = "Dz", e[e.Rx = 3] = "Rx", e[e.Ry = 4] = "Ry", e[e.Rz = 5] = "Rz", e))(qe || {});
export {
  Z0 as Beam2D,
  Y0 as BeamConcentratedLoad,
  tn as BeamElementLoad,
  J0 as BeamElementUniformEdgeLoad,
  H0 as CrossSection,
  qe as DofID,
  k0 as Domain,
  V0 as Element,
  nh as LinearStaticSolver,
  Ea as Load,
  rh as LoadCase,
  W0 as Material,
  G0 as NodalLoad,
  U0 as Node,
  Q0 as PrescribedDisplacement,
  j0 as Solver
};
