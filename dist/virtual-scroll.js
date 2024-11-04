/**
* @vue/shared v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function en(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const T = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, tn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], k = () => {
}, nn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), R = Object.assign, rn = Object.prototype.hasOwnProperty, E = (e, t) => rn.call(e, t), m = Array.isArray, ee = (e) => Te(e) === "[object Map]", sn = (e) => Te(e) === "[object Set]", w = (e) => typeof e == "function", $ = (e) => typeof e == "string", fe = (e) => typeof e == "symbol", y = (e) => e !== null && typeof e == "object", on = (e) => (y(e) || w(e)) && w(e.then) && w(e.catch), cn = Object.prototype.toString, Te = (e) => cn.call(e), Et = (e) => Te(e).slice(8, -1), ln = (e) => Te(e) === "[object Object]", Xe = (e) => $(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, an = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, un = an((e) => e.charAt(0).toUpperCase() + e.slice(1)), U = (e, t) => !Object.is(e, t), fn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let at;
const Ce = () => at || (at = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ze(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = $(s) ? _n(s) : Ze(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if ($(e) || y(e))
    return e;
}
const pn = /;(?![^(]*\))/g, dn = /:([^]+)/, hn = /\/\*[^]*?\*\//g;
function _n(e) {
  const t = {};
  return e.replace(hn, "").split(pn).forEach((n) => {
    if (n) {
      const s = n.split(dn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ke(e) {
  let t = "";
  if ($(e))
    t = e;
  else if (m(e))
    for (let n = 0; n < e.length; n++) {
      const s = ke(e[n]);
      s && (t += s + " ");
    }
  else if (y(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function z(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
const je = /* @__PURE__ */ new WeakSet();
class gn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, je.has(this) && (je.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || mn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ut(this), Nt(this);
    const t = g, n = P;
    g = this, P = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && g !== this && z(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), wt(this), g = t, P = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        nt(t);
      this.deps = this.depsTail = void 0, ut(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? je.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ze(this) && this.run();
  }
  get dirty() {
    return ze(this);
  }
}
let bt = 0, ie, ce;
function mn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ce, ce = e;
    return;
  }
  e.next = ie, ie = e;
}
function et() {
  bt++;
}
function tt() {
  if (--bt > 0)
    return;
  if (ce) {
    let t = ce;
    for (ce = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ie; ) {
    let t = ie;
    for (ie = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Nt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function wt(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), nt(s), En(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function ze(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (vn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function vn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ne))
    return;
  e.globalVersion = Ne;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !ze(e)) {
    e.flags &= -3;
    return;
  }
  const n = g, s = P;
  g = e, P = !0;
  try {
    Nt(e);
    const r = e.fn(e._value);
    (t.version === 0 || U(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    g = n, P = s, wt(e), e.flags &= -3;
  }
}
function nt(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      nt(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function En(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let P = !0;
const Ot = [];
function Ie() {
  Ot.push(P), P = !1;
}
function Pe() {
  const e = Ot.pop();
  P = e === void 0 ? !0 : e;
}
function ut(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = g;
    g = void 0;
    try {
      t();
    } finally {
      g = n;
    }
  }
}
let Ne = 0;
class bn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class St {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!g || !P || g === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== g)
      n = this.activeLink = new bn(g, this), g.deps ? (n.prevDep = g.depsTail, g.depsTail.nextDep = n, g.depsTail = n) : g.deps = g.depsTail = n, xt(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = g.depsTail, n.nextDep = void 0, g.depsTail.nextDep = n, g.depsTail = n, g.deps === n && (g.deps = s);
    }
    return process.env.NODE_ENV !== "production" && g.onTrack && g.onTrack(
      R(
        {
          effect: g
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Ne++, this.notify(t);
  }
  notify(t) {
    et();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            R(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      tt();
    }
  }
}
function xt(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        xt(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const we = /* @__PURE__ */ new WeakMap(), Y = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Be = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), ae = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function N(e, t, n) {
  if (P && g) {
    let s = we.get(e);
    s || we.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new St()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function W(e, t, n, s, r, o) {
  const i = we.get(e);
  if (!i) {
    Ne++;
    return;
  }
  const c = (a) => {
    a && (process.env.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: r,
      oldTarget: o
    }) : a.trigger());
  };
  if (et(), t === "clear")
    i.forEach(c);
  else {
    const a = m(e), f = a && Xe(n);
    if (a && n === "length") {
      const d = Number(s);
      i.forEach((l, u) => {
        (u === "length" || u === ae || !fe(u) && u >= d) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), f && c(i.get(ae)), t) {
        case "add":
          a ? f && c(i.get("length")) : (c(i.get(Y)), ee(e) && c(i.get(Be)));
          break;
        case "delete":
          a || (c(i.get(Y)), ee(e) && c(i.get(Be)));
          break;
        case "set":
          ee(e) && c(i.get(Y));
          break;
      }
  }
  tt();
}
function Nn(e, t) {
  const n = we.get(e);
  return n && n.get(t);
}
function Q(e) {
  const t = h(e);
  return t === e ? t : (N(t, "iterate", ae), D(e) ? t : t.map(x));
}
function rt(e) {
  return N(e = h(e), "iterate", ae), e;
}
const wn = {
  __proto__: null,
  [Symbol.iterator]() {
    return Fe(this, Symbol.iterator, x);
  },
  concat(...e) {
    return Q(this).concat(
      ...e.map((t) => m(t) ? Q(t) : t)
    );
  },
  entries() {
    return Fe(this, "entries", (e) => (e[1] = x(e[1]), e));
  },
  every(e, t) {
    return M(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return M(this, "filter", e, t, (n) => n.map(x), arguments);
  },
  find(e, t) {
    return M(this, "find", e, t, x, arguments);
  },
  findIndex(e, t) {
    return M(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return M(this, "findLast", e, t, x, arguments);
  },
  findLastIndex(e, t) {
    return M(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return M(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return He(this, "includes", e);
  },
  indexOf(...e) {
    return He(this, "indexOf", e);
  },
  join(e) {
    return Q(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return He(this, "lastIndexOf", e);
  },
  map(e, t) {
    return M(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return se(this, "pop");
  },
  push(...e) {
    return se(this, "push", e);
  },
  reduce(e, ...t) {
    return ft(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ft(this, "reduceRight", e, t);
  },
  shift() {
    return se(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return M(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return se(this, "splice", e);
  },
  toReversed() {
    return Q(this).toReversed();
  },
  toSorted(e) {
    return Q(this).toSorted(e);
  },
  toSpliced(...e) {
    return Q(this).toSpliced(...e);
  },
  unshift(...e) {
    return se(this, "unshift", e);
  },
  values() {
    return Fe(this, "values", x);
  }
};
function Fe(e, t, n) {
  const s = rt(e), r = s[t]();
  return s !== e && !D(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const On = Array.prototype;
function M(e, t, n, s, r, o) {
  const i = rt(e), c = i !== e && !D(e), a = i[t];
  if (a !== On[t]) {
    const l = a.apply(e, o);
    return c ? x(l) : l;
  }
  let f = n;
  i !== e && (c ? f = function(l, u) {
    return n.call(this, x(l), u, e);
  } : n.length > 2 && (f = function(l, u) {
    return n.call(this, l, u, e);
  }));
  const d = a.call(i, f, s);
  return c && r ? r(d) : d;
}
function ft(e, t, n, s) {
  const r = rt(e);
  let o = n;
  return r !== e && (D(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, x(c), a, e);
  }), r[t](o, ...s);
}
function He(e, t, n) {
  const s = h(e);
  N(s, "iterate", ae);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Oe(n[0]) ? (n[0] = h(n[0]), s[t](...n)) : r;
}
function se(e, t, n = []) {
  Ie(), et();
  const s = h(e)[t].apply(e, n);
  return tt(), Pe(), s;
}
const Sn = /* @__PURE__ */ en("__proto__,__v_isRef,__isVue"), yt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(fe)
);
function xn(e) {
  fe(e) || (e = String(e));
  const t = h(this);
  return N(t, "has", e), t.hasOwnProperty(e);
}
class Dt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? Ct : Tt : o ? An : Vt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = m(t);
    if (!r) {
      let a;
      if (i && (a = wn[n]))
        return a;
      if (n === "hasOwnProperty")
        return xn;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      O(t) ? t : s
    );
    return (fe(n) ? yt.has(n) : Sn(n)) || (r || N(t, "get", n), o) ? c : O(c) ? i && Xe(n) ? c : c.value : y(c) ? r ? Pt(c) : It(c) : c;
  }
}
class yn extends Dt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = H(o);
      if (!D(s) && !H(s) && (o = h(o), s = h(s)), !m(t) && O(o) && !O(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = m(t) && Xe(n) ? Number(n) < t.length : E(t, n), c = Reflect.set(
      t,
      n,
      s,
      O(t) ? t : r
    );
    return t === h(r) && (i ? U(s, o) && W(t, "set", n, s, o) : W(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = E(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && W(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!fe(n) || !yt.has(n)) && N(t, "has", n), s;
  }
  ownKeys(t) {
    return N(
      t,
      "iterate",
      m(t) ? "length" : Y
    ), Reflect.ownKeys(t);
  }
}
class Rt extends Dt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && z(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && z(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Dn = /* @__PURE__ */ new yn(), Rn = /* @__PURE__ */ new Rt(), Vn = /* @__PURE__ */ new Rt(!0), Je = (e) => e, he = (e) => Reflect.getPrototypeOf(e);
function Tn(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = ee(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? Je : t ? Ye : x;
    return !t && N(
      o,
      "iterate",
      a ? Be : Y
    ), {
      // iterator protocol
      next() {
        const { value: l, done: u } = f.next();
        return u ? { value: l, done: u } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function _e(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      z(
        `${un(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Cn(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      e || (U(r, c) && N(i, "get", r), N(i, "get", c));
      const { has: a } = he(i), f = t ? Je : e ? Ye : x;
      if (a.call(i, r))
        return f(o.get(r));
      if (a.call(i, c))
        return f(o.get(c));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && N(h(r), "iterate", Y), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      return e || (U(r, c) && N(i, "has", r), N(i, "has", c)), r === c ? o.has(r) : o.has(r) || o.has(c);
    },
    forEach(r, o) {
      const i = this, c = i.__v_raw, a = h(c), f = t ? Je : e ? Ye : x;
      return !e && N(a, "iterate", Y), c.forEach((d, l) => r.call(o, f(d), f(l), i));
    }
  };
  return R(
    n,
    e ? {
      add: _e("add"),
      set: _e("set"),
      delete: _e("delete"),
      clear: _e("clear")
    } : {
      add(r) {
        !t && !D(r) && !H(r) && (r = h(r));
        const o = h(this);
        return he(o).has.call(o, r) || (o.add(r), W(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !D(o) && !H(o) && (o = h(o));
        const i = h(this), { has: c, get: a } = he(i);
        let f = c.call(i, r);
        f ? process.env.NODE_ENV !== "production" && pt(i, c, r) : (r = h(r), f = c.call(i, r));
        const d = a.call(i, r);
        return i.set(r, o), f ? U(o, d) && W(i, "set", r, o, d) : W(i, "add", r, o), this;
      },
      delete(r) {
        const o = h(this), { has: i, get: c } = he(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && pt(o, i, r) : (r = h(r), a = i.call(o, r));
        const f = c ? c.call(o, r) : void 0, d = o.delete(r);
        return a && W(o, "delete", r, void 0, f), d;
      },
      clear() {
        const r = h(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? ee(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
        return o && W(
          r,
          "clear",
          void 0,
          void 0,
          i
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Tn(r, e, t);
  }), n;
}
function st(e, t) {
  const n = Cn(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    E(n, r) && r in s ? n : s,
    r,
    o
  );
}
const In = {
  get: /* @__PURE__ */ st(!1, !1)
}, Pn = {
  get: /* @__PURE__ */ st(!0, !1)
}, $n = {
  get: /* @__PURE__ */ st(!0, !0)
};
function pt(e, t, n) {
  const s = h(n);
  if (s !== n && t.call(e, s)) {
    const r = Et(e);
    z(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Vt = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap();
function Mn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function jn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Mn(Et(e));
}
function It(e) {
  return H(e) ? e : ot(
    e,
    !1,
    Dn,
    In,
    Vt
  );
}
function Pt(e) {
  return ot(
    e,
    !0,
    Rn,
    Pn,
    Tt
  );
}
function ge(e) {
  return ot(
    e,
    !0,
    Vn,
    $n,
    Ct
  );
}
function ot(e, t, n, s, r) {
  if (!y(e))
    return process.env.NODE_ENV !== "production" && z(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = jn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function te(e) {
  return H(e) ? te(e.__v_raw) : !!(e && e.__v_isReactive);
}
function H(e) {
  return !!(e && e.__v_isReadonly);
}
function D(e) {
  return !!(e && e.__v_isShallow);
}
function Oe(e) {
  return e ? !!e.__v_raw : !1;
}
function h(e) {
  const t = e && e.__v_raw;
  return t ? h(t) : e;
}
function Fn(e) {
  return !E(e, "__v_skip") && Object.isExtensible(e) && fn(e, "__v_skip", !0), e;
}
const x = (e) => y(e) ? It(e) : e, Ye = (e) => y(e) ? Pt(e) : e;
function O(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function $t(e) {
  return Hn(e, !1);
}
function Hn(e, t) {
  return O(e) ? e : new Ln(e, t);
}
class Ln {
  constructor(t, n) {
    this.dep = new St(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : h(t), this._value = n ? t : x(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || D(t) || H(t);
    t = s ? t : h(t), U(t, n) && (this._rawValue = t, this._value = s ? t : x(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function Wn(e) {
  return O(e) ? e.value : e;
}
const Kn = {
  get: (e, t, n) => t === "__v_raw" ? e : Wn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return O(r) && !O(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Un(e) {
  return te(e) ? e : new Proxy(e, Kn);
}
class zn {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Nn(h(this._object), this._key);
  }
}
class Bn {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function Jn(e, t, n) {
  return O(e) ? e : w(e) ? new Bn(e) : y(e) && arguments.length > 1 ? Yn(e, t, n) : $t(e);
}
function Yn(e, t, n) {
  const s = e[t];
  return O(s) ? s : new zn(e, t, n);
}
const me = {}, Se = /* @__PURE__ */ new WeakMap();
let J;
function qn(e, t = !1, n = J) {
  if (n) {
    let s = Se.get(n);
    s || Se.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && z(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Gn(e, t, n = T) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, f = (_) => {
    (n.onWarn || z)(
      "Invalid watch source: ",
      _,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (_) => r ? _ : D(_) || r === !1 || r === 0 ? K(_, 1) : K(_);
  let l, u, p, b, V = !1, pe = !1;
  if (O(e) ? (u = () => e.value, V = D(e)) : te(e) ? (u = () => d(e), V = !0) : m(e) ? (pe = !0, V = e.some((_) => te(_) || D(_)), u = () => e.map((_) => {
    if (O(_))
      return _.value;
    if (te(_))
      return d(_);
    if (w(_))
      return a ? a(_, 2) : _();
    process.env.NODE_ENV !== "production" && f(_);
  })) : w(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (p) {
      Ie();
      try {
        p();
      } finally {
        Pe();
      }
    }
    const _ = J;
    J = l;
    try {
      return a ? a(e, 3, [b]) : e(b);
    } finally {
      J = _;
    }
  } : (u = k, process.env.NODE_ENV !== "production" && f(e)), t && r) {
    const _ = u, A = r === !0 ? 1 / 0 : r;
    u = () => K(_(), A);
  }
  const G = () => {
    l.stop();
  };
  if (o && t) {
    const _ = t;
    t = (...A) => {
      _(...A), G();
    };
  }
  let B = pe ? new Array(e.length).fill(me) : me;
  const re = (_) => {
    if (!(!(l.flags & 1) || !l.dirty && !_))
      if (t) {
        const A = l.run();
        if (r || V || (pe ? A.some((Me, de) => U(Me, B[de])) : U(A, B))) {
          p && p();
          const Me = J;
          J = l;
          try {
            const de = [
              A,
              // pass undefined as the old value when it's changed for the first time
              B === me ? void 0 : pe && B[0] === me ? [] : B,
              b
            ];
            a ? a(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            ), B = A;
          } finally {
            J = Me;
          }
        }
      } else
        l.run();
  };
  return c && c(re), l = new gn(u), l.scheduler = i ? () => i(re, !1) : re, b = (_) => qn(_, !1, l), p = l.onStop = () => {
    const _ = Se.get(l);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const A of _) A();
      Se.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? re(!0) : B = l.run() : i ? i(re.bind(null, !0), !0) : l.run(), G.pause = l.pause.bind(l), G.resume = l.resume.bind(l), G.stop = G, G;
}
function K(e, t = 1 / 0, n) {
  if (t <= 0 || !y(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, O(e))
    K(e.value, t, n);
  else if (m(e))
    for (let s = 0; s < e.length; s++)
      K(e[s], t, n);
  else if (sn(e) || ee(e))
    e.forEach((s) => {
      K(s, t, n);
    });
  else if (ln(e)) {
    for (const s in e)
      K(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && K(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const q = [];
function Qn(e) {
  q.push(e);
}
function Xn() {
  q.pop();
}
let Le = !1;
function v(e, ...t) {
  if (Le) return;
  Le = !0, Ie();
  const n = q.length ? q[q.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Zn();
  if (s)
    $e(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${Zt(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...kn(r)), console.warn(...o);
  }
  Pe(), Le = !1;
}
function Zn() {
  let e = q[q.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function kn(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...er(n));
  }), t;
}
function er({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Zt(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...tr(e.props), o] : [r + o];
}
function tr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...At(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function At(e, t, n) {
  return $(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : O(t) ? (t = At(e, h(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : w(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = h(t), n ? t : [`${e}=`, t]);
}
const Mt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function $e(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    it(r, t, n);
  }
}
function jt(e, t, n, s) {
  if (w(e)) {
    const r = $e(e, t, n, s);
    return r && on(r) && r.catch((o) => {
      it(o, t, n);
    }), r;
  }
  if (m(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(jt(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && v(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function it(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || T;
  if (t) {
    let c = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? Mt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const d = c.ec;
      if (d) {
        for (let l = 0; l < d.length; l++)
          if (d[l](e, a, f) === !1)
            return;
      }
      c = c.parent;
    }
    if (o) {
      Ie(), $e(o, null, 10, [
        e,
        a,
        f
      ]), Pe();
      return;
    }
  }
  nr(e, n, r, s, i);
}
function nr(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = Mt[t];
    if (n && Qn(n), v(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && Xn(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const C = [];
let j = -1;
const ne = [];
let L = null, X = 0;
const Ft = /* @__PURE__ */ Promise.resolve();
let xe = null;
const rr = 100;
function sr(e) {
  const t = xe || Ft;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function or(e) {
  let t = j + 1, n = C.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = C[s], o = ue(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ct(e) {
  if (!(e.flags & 1)) {
    const t = ue(e), n = C[C.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ue(n) ? C.push(e) : C.splice(or(t), 0, e), e.flags |= 1, Ht();
  }
}
function Ht() {
  xe || (xe = Ft.then(Wt));
}
function Lt(e) {
  m(e) ? ne.push(...e) : L && e.id === -1 ? L.splice(X + 1, 0, e) : e.flags & 1 || (ne.push(e), e.flags |= 1), Ht();
}
function ir(e) {
  if (ne.length) {
    const t = [...new Set(ne)].sort(
      (n, s) => ue(n) - ue(s)
    );
    if (ne.length = 0, L) {
      L.push(...t);
      return;
    }
    for (L = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), X = 0; X < L.length; X++) {
      const n = L[X];
      process.env.NODE_ENV !== "production" && Kt(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    L = null, X = 0;
  }
}
const ue = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Wt(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Kt(e, n) : k;
  try {
    for (j = 0; j < C.length; j++) {
      const n = C[j];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), $e(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; j < C.length; j++) {
      const n = C[j];
      n && (n.flags &= -2);
    }
    j = -1, C.length = 0, ir(e), xe = null, (C.length || ne.length) && Wt(e);
  }
}
function Kt(e, t) {
  const n = e.get(t) || 0;
  if (n > rr) {
    const s = t.i, r = s && Xt(s.type);
    return it(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const We = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Ce().__VUE_HMR_RUNTIME__ = {
  createRecord: Ke(cr),
  rerender: Ke(lr),
  reload: Ke(ar)
});
const ye = /* @__PURE__ */ new Map();
function cr(e, t) {
  return ye.has(e) ? !1 : (ye.set(e, {
    initialDef: De(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function De(e) {
  return kt(e) ? e.__vccOpts : e;
}
function lr(e, t) {
  const n = ye.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, De(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function ar(e, t) {
  const n = ye.get(e);
  if (!n) return;
  t = De(t), dt(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = De(o.type);
    let c = We.get(i);
    c || (i !== n.initialDef && dt(i, t), We.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? ct(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  Lt(() => {
    We.clear();
  });
}
function dt(e, t) {
  R(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ke(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let Z, ve = [];
function Ut(e, t) {
  var n, s;
  Z = e, Z ? (Z.enabled = !0, ve.forEach(({ event: r, args: o }) => Z.emit(r, ...o)), ve = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Ut(o, t);
  }), setTimeout(() => {
    Z || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, ve = []);
  }, 3e3)) : ve = [];
}
let F = null, ur = null;
const fr = (e) => e.__isTeleport;
function zt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, zt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
Ce().requestIdleCallback;
Ce().cancelIdleCallback;
const pr = Symbol.for("v-ndc"), qe = (e) => e ? Ur(e) ? zr(e) : qe(e.parent) : null, le = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ R(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ge(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ge(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ge(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ge(e.refs) : e.refs,
    $parent: (e) => qe(e.parent),
    $root: (e) => qe(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => _r(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ct(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = sr.bind(e.proxy)),
    $watch: (e) => yr.bind(e)
  })
), dr = (e) => e === "_" || e === "$", Ue = (e, t) => e !== T && !e.__isScriptSetup && E(e, t), hr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const p = i[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Ue(s, t))
          return i[t] = 1, s[t];
        if (r !== T && E(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && E(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== T && E(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = le[t];
    let l, u;
    if (d)
      return t === "$attrs" ? (N(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && N(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== T && E(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, E(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && F && (!$(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== T && dr(t[0]) && E(r, t) ? v(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === F && v(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Ue(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && E(r, t) ? (v(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== T && E(s, t) ? (s[t] = n, !0) : E(e.props, t) ? (process.env.NODE_ENV !== "production" && v(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && v(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== T && E(e, i) || Ue(t, i) || (c = o[0]) && E(c, i) || E(s, i) || E(le, i) || E(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : E(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (hr.ownKeys = (e) => (v(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function ht(e) {
  return m(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function _r(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (f) => Re(a, f, i, !0)
  ), Re(a, t, i)), y(t) && o.set(t, a), a;
}
function Re(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Re(e, o, n, !0), r && r.forEach(
    (i) => Re(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && v(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = gr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const gr = {
  data: _t,
  props: mt,
  emits: mt,
  // objects
  methods: oe,
  computed: oe,
  // lifecycle
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  // assets
  components: oe,
  directives: oe,
  // watch
  watch: vr,
  // provide / inject
  provide: _t,
  inject: mr
};
function _t(e, t) {
  return t ? e ? function() {
    return R(
      w(e) ? e.call(this, this) : e,
      w(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function mr(e, t) {
  return oe(gt(e), gt(t));
}
function gt(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function oe(e, t) {
  return e ? R(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function mt(e, t) {
  return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : R(
    /* @__PURE__ */ Object.create(null),
    ht(e),
    ht(t ?? {})
  ) : t;
}
function vr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = R(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let Er = null;
function br(e, t, n = !1) {
  const s = Ae || F;
  if (s || Er) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && w(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && v(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && v("inject() can only be used inside setup() or functional components.");
}
const Nr = {}, Bt = (e) => Object.getPrototypeOf(e) === Nr, wr = Vr, Or = Symbol.for("v-scx"), Sr = () => {
  {
    const e = br(Or);
    return e || process.env.NODE_ENV !== "production" && v(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function xr(e, t, n = T) {
  const { immediate: s, deep: r, flush: o, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && v(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && v(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && v(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = R({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = v);
  const a = t && s || !t && o !== "post";
  let f;
  if (Qe) {
    if (o === "sync") {
      const p = Sr();
      f = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!a) {
      const p = () => {
      };
      return p.stop = k, p.resume = k, p.pause = k, p;
    }
  }
  const d = Ae;
  c.call = (p, b, V) => jt(p, d, b, V);
  let l = !1;
  o === "post" ? c.scheduler = (p) => {
    wr(p, d && d.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (p, b) => {
    b ? p() : ct(p);
  }), c.augmentJob = (p) => {
    t && (p.flags |= 4), l && (p.flags |= 2, d && (p.id = d.uid, p.i = d));
  };
  const u = Gn(e, t, c);
  return Qe && (f ? f.push(u) : a && u()), u;
}
function yr(e, t, n) {
  const s = this.proxy, r = $(e) ? e.includes(".") ? Dr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = Kr(this), c = xr(r, o.bind(s), n);
  return i(), c;
}
function Dr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Rr = (e) => e.__isSuspense;
function Vr(e, t) {
  t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : Lt(e);
}
const Jt = Symbol.for("v-fgt"), Tr = Symbol.for("v-txt"), Cr = Symbol.for("v-cmt"), Ee = [];
let I = null;
function Ir(e = !1) {
  Ee.push(I = e ? null : []);
}
function Pr() {
  Ee.pop(), I = Ee[Ee.length - 1] || null;
}
function $r(e) {
  return e.dynamicChildren = I || tn, Pr(), I && I.push(e), e;
}
function Ar(e, t, n, s, r, o) {
  return $r(
    qt(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Mr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const jr = (...e) => Gt(
  ...e
), Yt = ({ key: e }) => e ?? null, be = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? $(e) || O(e) || w(e) ? { i: F, r: e, k: t, f: !!n } : e : null);
function qt(e, t = null, n = null, s = 0, r = null, o = e === Jt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Yt(t),
    ref: t && be(t),
    scopeId: ur,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: F
  };
  return c ? (lt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= $(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && v("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  I && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && I.push(a), a;
}
const Fr = process.env.NODE_ENV !== "production" ? jr : Gt;
function Gt(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === pr) && (process.env.NODE_ENV !== "production" && !e && v(`Invalid vnode type when creating vnode: ${e}.`), e = Cr), Mr(e)) {
    const c = Ve(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && lt(c, n), !o && I && (c.shapeFlag & 6 ? I[I.indexOf(e)] = c : I.push(c)), c.patchFlag = -2, c;
  }
  if (kt(e) && (e = e.__vccOpts), t) {
    t = Hr(t);
    let { class: c, style: a } = t;
    c && !$(c) && (t.class = ke(c)), y(a) && (Oe(a) && !m(a) && (a = R({}, a)), t.style = Ze(a));
  }
  const i = $(e) ? 1 : Rr(e) ? 128 : fr(e) ? 64 : y(e) ? 4 : w(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Oe(e) && (e = h(e), v(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), qt(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Hr(e) {
  return e ? Oe(e) || Bt(e) ? R({}, e) : e : null;
}
function Ve(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? Wr(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Yt(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? m(o) ? o.concat(be(t)) : [o, be(t)] : be(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && m(c) ? c.map(Qt) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Jt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ve(e.ssContent),
    ssFallback: e.ssFallback && Ve(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && zt(
    d,
    a.clone(d)
  ), d;
}
function Qt(e) {
  const t = Ve(e);
  return m(e.children) && (t.children = e.children.map(Qt)), t;
}
function Lr(e = " ", t = 0) {
  return Fr(Tr, null, e, t);
}
function lt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (m(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), lt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Bt(t) ? t._ctx = F : r === 3 && F && (F.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else w(t) ? (t = { default: t, _ctx: F }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Lr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Wr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ke([t.class, s.class]));
      else if (r === "style")
        t.style = Ze([t.style, s.style]);
      else if (nn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(m(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let Ae = null, Ge;
{
  const e = Ce(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  Ge = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ae = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Qe = n
  );
}
const Kr = (e) => {
  const t = Ae;
  return Ge(e), e.scope.on(), () => {
    e.scope.off(), Ge(t);
  };
};
function Ur(e) {
  return e.vnode.shapeFlag & 4;
}
let Qe = !1;
process.env.NODE_ENV;
function zr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Un(Fn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in le)
        return le[n](e);
    },
    has(t, n) {
      return n in t || n in le;
    }
  })) : e.proxy;
}
const Br = /(?:^|[-_])(\w)/g, Jr = (e) => e.replace(Br, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Xt(e, t = !0) {
  return w(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Zt(e, t, n = !1) {
  let s = Xt(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Jr(s) : n ? "App" : "Anonymous";
}
function kt(e) {
  return w(e) && "__vccOpts" in e;
}
function Yr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return y(l) ? l.__isVue ? ["div", e, "VueInstance"] : O(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        // avoid debugger accessing value affecting behavior
        c("_value" in l ? l._value : l),
        ">"
      ] : te(l) ? [
        "div",
        {},
        ["span", e, D(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${H(l) ? " (readonly)" : ""}`
      ] : H(l) ? [
        "div",
        {},
        ["span", e, D(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const u = [];
    l.type.props && l.props && u.push(i("props", h(l.props))), l.setupState !== T && u.push(i("setup", l.setupState)), l.data !== T && u.push(i("data", h(l.data)));
    const p = a(l, "computed");
    p && u.push(i("computed", p));
    const b = a(l, "inject");
    return b && u.push(i("injected", b)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), u;
  }
  function i(l, u) {
    return u = R({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((p) => [
          "div",
          {},
          ["span", s, p + ": "],
          c(u[p], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : y(l) ? ["object", { object: u ? h(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const p = l.type;
    if (w(p))
      return;
    const b = {};
    for (const V in l.ctx)
      f(p, V, u) && (b[V] = l.ctx[V]);
    return b;
  }
  function f(l, u, p) {
    const b = l[p];
    if (m(b) && b.includes(u) || y(b) && u in b || l.extends && f(l.extends, u, p) || l.mixins && l.mixins.some((V) => f(V, u, p)))
      return !0;
  }
  function d(l) {
    return D(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function qr() {
  Yr();
}
process.env.NODE_ENV !== "production" && qr();
const Gr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Qr = {};
function Xr(e, t) {
  return Ir(), Ar("div");
}
const Zr = /* @__PURE__ */ Gr(Qr, [["render", Xr]]), vt = {
  displayNumber: 5,
  triggerHeight: 200
}, kr = (e, t, n) => {
  n = { ...vt, ...n }, t = Jn(t);
  const s = $t(n.displayNumber), r = computed(() => t.value.slice(0, s));
  return e.addEventListener("scroll", (o) => {
    e.scrollHeight - o.scrollTop <= n.triggerHeight && (s.value += vt.displayNumber);
  }), {
    items: r
  };
};
export {
  Zr as VirtualScroll,
  kr as useVirtualScroll
};
