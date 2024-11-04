/**
* @vue/shared v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function _n(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const C = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, gn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], te = () => {
}, vn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), R = Object.assign, mn = Object.prototype.hasOwnProperty, b = (e, t) => mn.call(e, t), E = Array.isArray, ne = (e) => Ae(e) === "[object Map]", En = (e) => Ae(e) === "[object Set]", w = (e) => typeof e == "function", T = (e) => typeof e == "string", he = (e) => typeof e == "symbol", D = (e) => e !== null && typeof e == "object", bn = (e) => (D(e) || w(e)) && w(e.then) && w(e.catch), Nn = Object.prototype.toString, Ae = (e) => Nn.call(e), Ct = (e) => Ae(e).slice(8, -1), wn = (e) => Ae(e) === "[object Object]", st = (e) => T(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, It = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, On = /-(\w)/g, ye = It(
  (e) => e.replace(On, (t, n) => n ? n.toUpperCase() : "")
), Se = It((e) => e.charAt(0).toUpperCase() + e.slice(1)), U = (e, t) => !Object.is(e, t), xn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let mt;
const Me = () => mt || (mt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function He(e) {
  if (E(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = T(s) ? Vn(s) : He(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (T(e) || D(e))
    return e;
}
const yn = /;(?![^(]*\))/g, Sn = /:([^]+)/, Dn = /\/\*[^]*?\*\//g;
function Vn(e) {
  const t = {};
  return e.replace(Dn, "").split(yn).forEach((n) => {
    if (n) {
      const s = n.split(Sn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ot(e) {
  let t = "";
  if (T(e))
    t = e;
  else if (E(e))
    for (let n = 0; n < e.length; n++) {
      const s = ot(e[n]);
      s && (t += s + " ");
    }
  else if (D(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function j(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
const ze = /* @__PURE__ */ new WeakSet();
class Rn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ze.has(this) && (ze.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || $t(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Et(this), At(this);
    const t = g, n = $;
    g = this, $ = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && g !== this && j(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Mt(this), g = t, $ = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        lt(t);
      this.deps = this.depsTail = void 0, Et(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ze.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Xe(this) && this.run();
  }
  get dirty() {
    return Xe(this);
  }
}
let Pt = 0, le, ae;
function $t(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ae, ae = e;
    return;
  }
  e.next = le, le = e;
}
function it() {
  Pt++;
}
function ct() {
  if (--Pt > 0)
    return;
  if (ae) {
    let t = ae;
    for (ae = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; le; ) {
    let t = le;
    for (le = void 0; t; ) {
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
function At(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Mt(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), lt(s), Tn(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Xe(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Ht(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Ht(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === fe))
    return;
  e.globalVersion = fe;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Xe(e)) {
    e.flags &= -3;
    return;
  }
  const n = g, s = $;
  g = e, $ = !0;
  try {
    At(e);
    const r = e.fn(e._value);
    (t.version === 0 || U(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    g = n, $ = s, Mt(e), e.flags &= -3;
  }
}
function lt(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      lt(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Tn(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let $ = !0;
const Ft = [];
function Fe() {
  Ft.push($), $ = !1;
}
function je() {
  const e = Ft.pop();
  $ = e === void 0 ? !0 : e;
}
function Et(e) {
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
let fe = 0;
class Cn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class at {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!g || !$ || g === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== g)
      n = this.activeLink = new Cn(g, this), g.deps ? (n.prevDep = g.depsTail, g.depsTail.nextDep = n, g.depsTail = n) : g.deps = g.depsTail = n, jt(n);
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
    this.version++, fe++, this.notify(t);
  }
  notify(t) {
    it();
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
      ct();
    }
  }
}
function jt(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        jt(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Ze = /* @__PURE__ */ new WeakMap(), Y = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), ke = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), pe = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function N(e, t, n) {
  if ($ && g) {
    let s = Ze.get(e);
    s || Ze.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new at()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function K(e, t, n, s, r, o) {
  const i = Ze.get(e);
  if (!i) {
    fe++;
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
  if (it(), t === "clear")
    i.forEach(c);
  else {
    const a = E(e), f = a && st(n);
    if (a && n === "length") {
      const d = Number(s);
      i.forEach((l, u) => {
        (u === "length" || u === pe || !he(u) && u >= d) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), f && c(i.get(pe)), t) {
        case "add":
          a ? f && c(i.get("length")) : (c(i.get(Y)), ne(e) && c(i.get(ke)));
          break;
        case "delete":
          a || (c(i.get(Y)), ne(e) && c(i.get(ke)));
          break;
        case "set":
          ne(e) && c(i.get(Y));
          break;
      }
  }
  ct();
}
function Z(e) {
  const t = h(e);
  return t === e ? t : (N(t, "iterate", pe), V(e) ? t : t.map(x));
}
function We(e) {
  return N(e = h(e), "iterate", pe), e;
}
const In = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ue(this, Symbol.iterator, x);
  },
  concat(...e) {
    return Z(this).concat(
      ...e.map((t) => E(t) ? Z(t) : t)
    );
  },
  entries() {
    return Ue(this, "entries", (e) => (e[1] = x(e[1]), e));
  },
  every(e, t) {
    return H(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return H(this, "filter", e, t, (n) => n.map(x), arguments);
  },
  find(e, t) {
    return H(this, "find", e, t, x, arguments);
  },
  findIndex(e, t) {
    return H(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return H(this, "findLast", e, t, x, arguments);
  },
  findLastIndex(e, t) {
    return H(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return H(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Be(this, "includes", e);
  },
  indexOf(...e) {
    return Be(this, "indexOf", e);
  },
  join(e) {
    return Z(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Be(this, "lastIndexOf", e);
  },
  map(e, t) {
    return H(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ie(this, "pop");
  },
  push(...e) {
    return ie(this, "push", e);
  },
  reduce(e, ...t) {
    return bt(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return bt(this, "reduceRight", e, t);
  },
  shift() {
    return ie(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return H(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ie(this, "splice", e);
  },
  toReversed() {
    return Z(this).toReversed();
  },
  toSorted(e) {
    return Z(this).toSorted(e);
  },
  toSpliced(...e) {
    return Z(this).toSpliced(...e);
  },
  unshift(...e) {
    return ie(this, "unshift", e);
  },
  values() {
    return Ue(this, "values", x);
  }
};
function Ue(e, t, n) {
  const s = We(e), r = s[t]();
  return s !== e && !V(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const Pn = Array.prototype;
function H(e, t, n, s, r, o) {
  const i = We(e), c = i !== e && !V(e), a = i[t];
  if (a !== Pn[t]) {
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
function bt(e, t, n, s) {
  const r = We(e);
  let o = n;
  return r !== e && (V(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, x(c), a, e);
  }), r[t](o, ...s);
}
function Be(e, t, n) {
  const s = h(e);
  N(s, "iterate", pe);
  const r = s[t](...n);
  return (r === -1 || r === !1) && De(n[0]) ? (n[0] = h(n[0]), s[t](...n)) : r;
}
function ie(e, t, n = []) {
  Fe(), it();
  const s = h(e)[t].apply(e, n);
  return ct(), je(), s;
}
const $n = /* @__PURE__ */ _n("__proto__,__v_isRef,__isVue"), Wt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(he)
);
function An(e) {
  he(e) || (e = String(e));
  const t = h(this);
  return N(t, "has", e), t.hasOwnProperty(e);
}
class Lt {
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
      return s === (r ? o ? Bt : Ut : o ? Bn : zt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = E(t);
    if (!r) {
      let a;
      if (i && (a = In[n]))
        return a;
      if (n === "hasOwnProperty")
        return An;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      y(t) ? t : s
    );
    return (he(n) ? Wt.has(n) : $n(n)) || (r || N(t, "get", n), o) ? c : y(c) ? i && st(n) ? c : c.value : D(c) ? r ? Yt(c) : Jt(c) : c;
  }
}
class Mn extends Lt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = W(o);
      if (!V(s) && !W(s) && (o = h(o), s = h(s)), !E(t) && y(o) && !y(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = E(t) && st(n) ? Number(n) < t.length : b(t, n), c = Reflect.set(
      t,
      n,
      s,
      y(t) ? t : r
    );
    return t === h(r) && (i ? U(s, o) && K(t, "set", n, s, o) : K(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = b(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && K(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!he(n) || !Wt.has(n)) && N(t, "has", n), s;
  }
  ownKeys(t) {
    return N(
      t,
      "iterate",
      E(t) ? "length" : Y
    ), Reflect.ownKeys(t);
  }
}
class Kt extends Lt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && j(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && j(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Hn = /* @__PURE__ */ new Mn(), Fn = /* @__PURE__ */ new Kt(), jn = /* @__PURE__ */ new Kt(!0), et = (e) => e, ge = (e) => Reflect.getPrototypeOf(e);
function Wn(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = ne(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? et : t ? tt : x;
    return !t && N(
      o,
      "iterate",
      a ? ke : Y
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
function ve(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      j(
        `${Se(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ln(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      e || (U(r, c) && N(i, "get", r), N(i, "get", c));
      const { has: a } = ge(i), f = t ? et : e ? tt : x;
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
      const i = this, c = i.__v_raw, a = h(c), f = t ? et : e ? tt : x;
      return !e && N(a, "iterate", Y), c.forEach((d, l) => r.call(o, f(d), f(l), i));
    }
  };
  return R(
    n,
    e ? {
      add: ve("add"),
      set: ve("set"),
      delete: ve("delete"),
      clear: ve("clear")
    } : {
      add(r) {
        !t && !V(r) && !W(r) && (r = h(r));
        const o = h(this);
        return ge(o).has.call(o, r) || (o.add(r), K(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !V(o) && !W(o) && (o = h(o));
        const i = h(this), { has: c, get: a } = ge(i);
        let f = c.call(i, r);
        f ? process.env.NODE_ENV !== "production" && Nt(i, c, r) : (r = h(r), f = c.call(i, r));
        const d = a.call(i, r);
        return i.set(r, o), f ? U(o, d) && K(i, "set", r, o, d) : K(i, "add", r, o), this;
      },
      delete(r) {
        const o = h(this), { has: i, get: c } = ge(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && Nt(o, i, r) : (r = h(r), a = i.call(o, r));
        const f = c ? c.call(o, r) : void 0, d = o.delete(r);
        return a && K(o, "delete", r, void 0, f), d;
      },
      clear() {
        const r = h(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? ne(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
        return o && K(
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
    n[r] = Wn(r, e, t);
  }), n;
}
function ut(e, t) {
  const n = Ln(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    b(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Kn = {
  get: /* @__PURE__ */ ut(!1, !1)
}, zn = {
  get: /* @__PURE__ */ ut(!0, !1)
}, Un = {
  get: /* @__PURE__ */ ut(!0, !0)
};
function Nt(e, t, n) {
  const s = h(n);
  if (s !== n && t.call(e, s)) {
    const r = Ct(e);
    j(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const zt = /* @__PURE__ */ new WeakMap(), Bn = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakMap();
function Jn(e) {
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
function Yn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Jn(Ct(e));
}
function Jt(e) {
  return W(e) ? e : ft(
    e,
    !1,
    Hn,
    Kn,
    zt
  );
}
function Yt(e) {
  return ft(
    e,
    !0,
    Fn,
    zn,
    Ut
  );
}
function me(e) {
  return ft(
    e,
    !0,
    jn,
    Un,
    Bt
  );
}
function ft(e, t, n, s, r) {
  if (!D(e))
    return process.env.NODE_ENV !== "production" && j(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Yn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function q(e) {
  return W(e) ? q(e.__v_raw) : !!(e && e.__v_isReactive);
}
function W(e) {
  return !!(e && e.__v_isReadonly);
}
function V(e) {
  return !!(e && e.__v_isShallow);
}
function De(e) {
  return e ? !!e.__v_raw : !1;
}
function h(e) {
  const t = e && e.__v_raw;
  return t ? h(t) : e;
}
function qn(e) {
  return !b(e, "__v_skip") && Object.isExtensible(e) && xn(e, "__v_skip", !0), e;
}
const x = (e) => D(e) ? Jt(e) : e, tt = (e) => D(e) ? Yt(e) : e;
function y(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Ee(e) {
  return Gn(e, !1);
}
function Gn(e, t) {
  return y(e) ? e : new Qn(e, t);
}
class Qn {
  constructor(t, n) {
    this.dep = new at(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : h(t), this._value = n ? t : x(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || V(t) || W(t);
    t = s ? t : h(t), U(t, n) && (this._rawValue = t, this._value = s ? t : x(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function Xn(e) {
  return y(e) ? e.value : e;
}
const Zn = {
  get: (e, t, n) => t === "__v_raw" ? e : Xn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return y(r) && !y(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function kn(e) {
  return q(e) ? e : new Proxy(e, Zn);
}
class er {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new at(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = fe - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    g !== this)
      return $t(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Ht(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && j("Write operation failed: computed value is readonly");
  }
}
function tr(e, t, n = !1) {
  let s, r;
  w(e) ? s = e : (s = e.get, r = e.set);
  const o = new er(s, r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (o.onTrack = t.onTrack, o.onTrigger = t.onTrigger), o;
}
const be = {}, Ve = /* @__PURE__ */ new WeakMap();
let J;
function nr(e, t = !1, n = J) {
  if (n) {
    let s = Ve.get(n);
    s || Ve.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && j(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function rr(e, t, n = C) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, f = (_) => {
    (n.onWarn || j)(
      "Invalid watch source: ",
      _,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (_) => r ? _ : V(_) || r === !1 || r === 0 ? z(_, 1) : z(_);
  let l, u, p, m, O = !1, Q = !1;
  if (y(e) ? (u = () => e.value, O = V(e)) : q(e) ? (u = () => d(e), O = !0) : E(e) ? (Q = !0, O = e.some((_) => q(_) || V(_)), u = () => e.map((_) => {
    if (y(_))
      return _.value;
    if (q(_))
      return d(_);
    if (w(_))
      return a ? a(_, 2) : _();
    process.env.NODE_ENV !== "production" && f(_);
  })) : w(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (p) {
      Fe();
      try {
        p();
      } finally {
        je();
      }
    }
    const _ = J;
    J = l;
    try {
      return a ? a(e, 3, [m]) : e(m);
    } finally {
      J = _;
    }
  } : (u = te, process.env.NODE_ENV !== "production" && f(e)), t && r) {
    const _ = u, A = r === !0 ? 1 / 0 : r;
    u = () => z(_(), A);
  }
  const X = () => {
    l.stop();
  };
  if (o && t) {
    const _ = t;
    t = (...A) => {
      _(...A), X();
    };
  }
  let B = Q ? new Array(e.length).fill(be) : be;
  const oe = (_) => {
    if (!(!(l.flags & 1) || !l.dirty && !_))
      if (t) {
        const A = l.run();
        if (r || O || (Q ? A.some((Ke, _e) => U(Ke, B[_e])) : U(A, B))) {
          p && p();
          const Ke = J;
          J = l;
          try {
            const _e = [
              A,
              // pass undefined as the old value when it's changed for the first time
              B === be ? void 0 : Q && B[0] === be ? [] : B,
              m
            ];
            a ? a(t, 3, _e) : (
              // @ts-expect-error
              t(..._e)
            ), B = A;
          } finally {
            J = Ke;
          }
        }
      } else
        l.run();
  };
  return c && c(oe), l = new Rn(u), l.scheduler = i ? () => i(oe, !1) : oe, m = (_) => nr(_, !1, l), p = l.onStop = () => {
    const _ = Ve.get(l);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const A of _) A();
      Ve.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? oe(!0) : B = l.run() : i ? i(oe.bind(null, !0), !0) : l.run(), X.pause = l.pause.bind(l), X.resume = l.resume.bind(l), X.stop = X, X;
}
function z(e, t = 1 / 0, n) {
  if (t <= 0 || !D(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, y(e))
    z(e.value, t, n);
  else if (E(e))
    for (let s = 0; s < e.length; s++)
      z(e[s], t, n);
  else if (En(e) || ne(e))
    e.forEach((s) => {
      z(s, t, n);
    });
  else if (wn(e)) {
    for (const s in e)
      z(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && z(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.12
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const G = [];
function sr(e) {
  G.push(e);
}
function or() {
  G.pop();
}
let Je = !1;
function v(e, ...t) {
  if (Je) return;
  Je = !0, Fe();
  const n = G.length ? G[G.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = ir();
  if (s)
    Le(
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
          ({ vnode: o }) => `at <${dn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...cr(r)), console.warn(...o);
  }
  je(), Je = !1;
}
function ir() {
  let e = G[G.length - 1];
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
function cr(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...lr(n));
  }), t;
}
function lr({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${dn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...ar(e.props), o] : [r + o];
}
function ar(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...qt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function qt(e, t, n) {
  return T(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : y(t) ? (t = qt(e, h(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : w(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = h(t), n ? t : [`${e}=`, t]);
}
const Gt = {
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
function Le(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    pt(r, t, n);
  }
}
function Qt(e, t, n, s) {
  if (w(e)) {
    const r = Le(e, t, n, s);
    return r && bn(r) && r.catch((o) => {
      pt(o, t, n);
    }), r;
  }
  if (E(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Qt(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && v(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function pt(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || C;
  if (t) {
    let c = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? Gt[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
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
      Fe(), Le(o, null, 10, [
        e,
        a,
        f
      ]), je();
      return;
    }
  }
  ur(e, n, r, s, i);
}
function ur(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = Gt[t];
    if (n && sr(n), v(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && or(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const I = [];
let F = -1;
const re = [];
let L = null, k = 0;
const Xt = /* @__PURE__ */ Promise.resolve();
let Re = null;
const fr = 100;
function pr(e) {
  const t = Re || Xt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function dr(e) {
  let t = F + 1, n = I.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = I[s], o = de(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function dt(e) {
  if (!(e.flags & 1)) {
    const t = de(e), n = I[I.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= de(n) ? I.push(e) : I.splice(dr(t), 0, e), e.flags |= 1, Zt();
  }
}
function Zt() {
  Re || (Re = Xt.then(en));
}
function kt(e) {
  E(e) ? re.push(...e) : L && e.id === -1 ? L.splice(k + 1, 0, e) : e.flags & 1 || (re.push(e), e.flags |= 1), Zt();
}
function hr(e) {
  if (re.length) {
    const t = [...new Set(re)].sort(
      (n, s) => de(n) - de(s)
    );
    if (re.length = 0, L) {
      L.push(...t);
      return;
    }
    for (L = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), k = 0; k < L.length; k++) {
      const n = L[k];
      process.env.NODE_ENV !== "production" && tn(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    L = null, k = 0;
  }
}
const de = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function en(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => tn(e, n) : te;
  try {
    for (F = 0; F < I.length; F++) {
      const n = I[F];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Le(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; F < I.length; F++) {
      const n = I[F];
      n && (n.flags &= -2);
    }
    F = -1, I.length = 0, hr(e), Re = null, (I.length || re.length) && en(e);
  }
}
function tn(e, t) {
  const n = e.get(t) || 0;
  if (n > fr) {
    const s = t.i, r = s && vt(s.type);
    return pt(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const Ye = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Me().__VUE_HMR_RUNTIME__ = {
  createRecord: qe(_r),
  rerender: qe(gr),
  reload: qe(vr)
});
const Te = /* @__PURE__ */ new Map();
function _r(e, t) {
  return Te.has(e) ? !1 : (Te.set(e, {
    initialDef: Ce(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Ce(e) {
  return hn(e) ? e.__vccOpts : e;
}
function gr(e, t) {
  const n = Te.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, Ce(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function vr(e, t) {
  const n = Te.get(e);
  if (!n) return;
  t = Ce(t), wt(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = Ce(o.type);
    let c = Ye.get(i);
    c || (i !== n.initialDef && wt(i, t), Ye.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? dt(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  kt(() => {
    Ye.clear();
  });
}
function wt(e, t) {
  R(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function qe(e) {
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
let ee, Ne = [];
function nn(e, t) {
  var n, s;
  ee = e, ee ? (ee.enabled = !0, Ne.forEach(({ event: r, args: o }) => ee.emit(r, ...o)), Ne = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    nn(o, t);
  }), setTimeout(() => {
    ee || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Ne = []);
  }, 3e3)) : Ne = [];
}
let M = null, mr = null;
const Er = (e) => e.__isTeleport;
function rn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, rn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
Me().requestIdleCallback;
Me().cancelIdleCallback;
const br = "components", sn = Symbol.for("v-ndc");
function Nr(e) {
  return T(e) ? wr(br, e, !1) || e : e || sn;
}
function wr(e, t, n = !0, s = !1) {
  const r = se;
  if (r) {
    const o = r.type;
    {
      const c = vt(
        o,
        !1
      );
      if (c && (c === t || c === ye(t) || c === Se(ye(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ot(r[e] || o[e], t) || // global registration
      Ot(r.appContext[e], t)
    );
    return !i && s ? o : (process.env.NODE_ENV !== "production" && n && !i && v(`Failed to resolve ${e.slice(0, -1)}: ${t}
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.`), i);
  } else process.env.NODE_ENV !== "production" && v(
    `resolve${Se(e.slice(0, -1))} can only be used in render() or setup().`
  );
}
function Ot(e, t) {
  return e && (e[t] || e[ye(t)] || e[Se(ye(t))]);
}
function Or(e, t, n, s) {
  let r;
  const o = n, i = E(e);
  if (i || T(e)) {
    const c = i && q(e);
    let a = !1;
    c && (a = !V(e), e = We(e)), r = new Array(e.length);
    for (let f = 0, d = e.length; f < d; f++)
      r[f] = t(
        a ? x(e[f]) : e[f],
        f,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && v(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let c = 0; c < e; c++)
      r[c] = t(c + 1, c, void 0, o);
  } else if (D(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (c, a) => t(c, a, void 0, o)
      );
    else {
      const c = Object.keys(e);
      r = new Array(c.length);
      for (let a = 0, f = c.length; a < f; a++) {
        const d = c[a];
        r[a] = t(e[d], d, a, o);
      }
    }
  else
    r = [];
  return r;
}
const nt = (e) => e ? kr(e) ? ns(e) : nt(e.parent) : null, ue = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ R(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? me(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? me(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? me(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? me(e.refs) : e.refs,
    $parent: (e) => nt(e.parent),
    $root: (e) => nt(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Vr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      dt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = pr.bind(e.proxy)),
    $watch: (e) => jr.bind(e)
  })
), xr = (e) => e === "_" || e === "$", Ge = (e, t) => e !== C && !e.__isScriptSetup && b(e, t), yr = {
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
        if (Ge(s, t))
          return i[t] = 1, s[t];
        if (r !== C && b(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && b(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== C && b(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = ue[t];
    let l, u;
    if (d)
      return t === "$attrs" ? (N(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && N(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== C && b(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, b(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && M && (!T(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== C && xr(t[0]) && b(r, t) ? v(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === M && v(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Ge(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && b(r, t) ? (v(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== C && b(s, t) ? (s[t] = n, !0) : b(e.props, t) ? (process.env.NODE_ENV !== "production" && v(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && v(
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
    return !!n[i] || e !== C && b(e, i) || Ge(t, i) || (c = o[0]) && b(c, i) || b(s, i) || b(ue, i) || b(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : b(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (yr.ownKeys = (e) => (v(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Sr() {
  return Dr().slots;
}
function Dr() {
  const e = pn();
  return process.env.NODE_ENV !== "production" && !e && v("useContext() called without active instance."), e.setupContext || (e.setupContext = ts(e));
}
function xt(e) {
  return E(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Vr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (f) => Ie(a, f, i, !0)
  ), Ie(a, t, i)), D(t) && o.set(t, a), a;
}
function Ie(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Ie(e, o, n, !0), r && r.forEach(
    (i) => Ie(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && v(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Rr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Rr = {
  data: yt,
  props: Dt,
  emits: Dt,
  // objects
  methods: ce,
  computed: ce,
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
  components: ce,
  directives: ce,
  // watch
  watch: Cr,
  // provide / inject
  provide: yt,
  inject: Tr
};
function yt(e, t) {
  return t ? e ? function() {
    return R(
      w(e) ? e.call(this, this) : e,
      w(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Tr(e, t) {
  return ce(St(e), St(t));
}
function St(e) {
  if (E(e)) {
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
function ce(e, t) {
  return e ? R(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Dt(e, t) {
  return e ? E(e) && E(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : R(
    /* @__PURE__ */ Object.create(null),
    xt(e),
    xt(t ?? {})
  ) : t;
}
function Cr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = R(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let Ir = null;
function Pr(e, t, n = !1) {
  const s = se || M;
  if (s || Ir) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && w(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && v(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && v("inject() can only be used inside setup() or functional components.");
}
const $r = {}, on = (e) => Object.getPrototypeOf(e) === $r, Ar = Kr, Mr = Symbol.for("v-scx"), Hr = () => {
  {
    const e = Pr(Mr);
    return e || process.env.NODE_ENV !== "production" && v(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Fr(e, t, n = C) {
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
  if ($e) {
    if (o === "sync") {
      const p = Hr();
      f = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!a) {
      const p = () => {
      };
      return p.stop = te, p.resume = te, p.pause = te, p;
    }
  }
  const d = se;
  c.call = (p, m, O) => Qt(p, d, m, O);
  let l = !1;
  o === "post" ? c.scheduler = (p) => {
    Ar(p, d && d.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (p, m) => {
    m ? p() : dt(p);
  }), c.augmentJob = (p) => {
    t && (p.flags |= 4), l && (p.flags |= 2, d && (p.id = d.uid, p.i = d));
  };
  const u = rr(e, t, c);
  return $e && (f ? f.push(u) : a && u()), u;
}
function jr(e, t, n) {
  const s = this.proxy, r = T(e) ? e.includes(".") ? Wr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  w(t) ? o = t : (o = t.handler, n = t);
  const i = Zr(this), c = Fr(r, o.bind(s), n);
  return i(), c;
}
function Wr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Lr = (e) => e.__isSuspense;
function Kr(e, t) {
  t && t.pendingBranch ? E(e) ? t.effects.push(...e) : t.effects.push(e) : kt(e);
}
const ht = Symbol.for("v-fgt"), zr = Symbol.for("v-txt"), Ur = Symbol.for("v-cmt"), Oe = [];
let P = null;
function Qe(e = !1) {
  Oe.push(P = e ? null : []);
}
function Br() {
  Oe.pop(), P = Oe[Oe.length - 1] || null;
}
function cn(e) {
  return e.dynamicChildren = P || gn, Br(), P && P.push(e), e;
}
function Vt(e, t, n, s, r, o) {
  return cn(
    _t(
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
function Jr(e, t, n, s, r) {
  return cn(
    an(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Yr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const qr = (...e) => un(
  ...e
), ln = ({ key: e }) => e ?? null, xe = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? T(e) || y(e) || w(e) ? { i: M, r: e, k: t, f: !!n } : e : null);
function _t(e, t = null, n = null, s = 0, r = null, o = e === ht ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ln(t),
    ref: t && xe(t),
    scopeId: mr,
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
    ctx: M
  };
  return c ? (gt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= T(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && v("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  P && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && P.push(a), a;
}
const an = process.env.NODE_ENV !== "production" ? qr : un;
function un(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === sn) && (process.env.NODE_ENV !== "production" && !e && v(`Invalid vnode type when creating vnode: ${e}.`), e = Ur), Yr(e)) {
    const c = Pe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && gt(c, n), !o && P && (c.shapeFlag & 6 ? P[P.indexOf(e)] = c : P.push(c)), c.patchFlag = -2, c;
  }
  if (hn(e) && (e = e.__vccOpts), t) {
    t = Gr(t);
    let { class: c, style: a } = t;
    c && !T(c) && (t.class = ot(c)), D(a) && (De(a) && !E(a) && (a = R({}, a)), t.style = He(a));
  }
  const i = T(e) ? 1 : Lr(e) ? 128 : Er(e) ? 64 : D(e) ? 4 : w(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && De(e) && (e = h(e), v(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), _t(
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
function Gr(e) {
  return e ? De(e) || on(e) ? R({}, e) : e : null;
}
function Pe(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? Xr(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && ln(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? E(o) ? o.concat(xe(t)) : [o, xe(t)] : xe(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && E(c) ? c.map(fn) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ht ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Pe(e.ssContent),
    ssFallback: e.ssFallback && Pe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && rn(
    d,
    a.clone(d)
  ), d;
}
function fn(e) {
  const t = Pe(e);
  return E(e.children) && (t.children = e.children.map(fn)), t;
}
function Qr(e = " ", t = 0) {
  return an(zr, null, e, t);
}
function gt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (E(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), gt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !on(t) ? t._ctx = M : r === 3 && M && (M.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else w(t) ? (t = { default: t, _ctx: M }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Qr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Xr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ot([t.class, s.class]));
      else if (r === "style")
        t.style = He([t.style, s.style]);
      else if (vn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(E(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let se = null;
const pn = () => se || M;
let rt;
{
  const e = Me(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  rt = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => se = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => $e = n
  );
}
const Zr = (e) => {
  const t = se;
  return rt(e), e.scope.on(), () => {
    e.scope.off(), rt(t);
  };
};
function kr(e) {
  return e.vnode.shapeFlag & 4;
}
let $e = !1;
const Rt = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return N(e, "get", ""), e[t];
  },
  set() {
    return v("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return v("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return N(e, "get", ""), e[t];
  }
};
function es(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return N(e, "get", "$slots"), t[n];
    }
  });
}
function ts(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && v("expose() should be called only once per setup()."), n != null)) {
      let s = typeof n;
      s === "object" && (E(n) ? s = "array" : y(n) && (s = "ref")), s !== "object" && v(
        `expose() should be passed a plain object, received ${s}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, s;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, Rt));
      },
      get slots() {
        return s || (s = es(e));
      },
      get emit() {
        return (r, ...o) => e.emit(r, ...o);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, Rt),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function ns(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(kn(qn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ue)
        return ue[n](e);
    },
    has(t, n) {
      return n in t || n in ue;
    }
  })) : e.proxy;
}
const rs = /(?:^|[-_])(\w)/g, ss = (e) => e.replace(rs, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function vt(e, t = !0) {
  return w(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function dn(e, t, n = !1) {
  let s = vt(t);
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
  return s ? ss(s) : n ? "App" : "Anonymous";
}
function hn(e) {
  return w(e) && "__vccOpts" in e;
}
const we = (e, t) => {
  const n = tr(e, t, $e);
  if (process.env.NODE_ENV !== "production") {
    const s = pn();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function os() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return D(l) ? l.__isVue ? ["div", e, "VueInstance"] : y(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        // avoid debugger accessing value affecting behavior
        c("_value" in l ? l._value : l),
        ">"
      ] : q(l) ? [
        "div",
        {},
        ["span", e, V(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${W(l) ? " (readonly)" : ""}`
      ] : W(l) ? [
        "div",
        {},
        ["span", e, V(l) ? "ShallowReadonly" : "Readonly"],
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
    l.type.props && l.props && u.push(i("props", h(l.props))), l.setupState !== C && u.push(i("setup", l.setupState)), l.data !== C && u.push(i("data", h(l.data)));
    const p = a(l, "computed");
    p && u.push(i("computed", p));
    const m = a(l, "inject");
    return m && u.push(i("injected", m)), u.push([
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
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : D(l) ? ["object", { object: u ? h(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const p = l.type;
    if (w(p))
      return;
    const m = {};
    for (const O in l.ctx)
      f(p, O, u) && (m[O] = l.ctx[O]);
    return m;
  }
  function f(l, u, p) {
    const m = l[p];
    if (E(m) && m.includes(u) || D(m) && u in m || l.extends && f(l.extends, u, p) || l.mixins && l.mixins.some((O) => f(O, u, p)))
      return !0;
  }
  function d(l) {
    return V(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
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
function is() {
  os();
}
process.env.NODE_ENV !== "production" && is();
const cs = (e, t) => {
  let n = [];
  for (let s = e.length - 1; s >= 0; s--)
    t(e[s]) && n.unshift(s);
  return n;
}, ls = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Tt = "__virtual__item__", as = {
  __name: "VirtualScroll",
  setup(e) {
    const t = Sr(), n = Ee({ from: 0, to: 1 }), s = we(() => {
      var l;
      return (l = t == null ? void 0 : t.default) == null ? void 0 : l.call(t)[0].children;
    });
    s.value.forEach((l) => {
      l.props || (l.props = {}), l.props[Tt] = "";
    });
    const r = we(() => {
      var l;
      return (l = s.value) == null ? void 0 : l.slice(n.value.from, n.value.to);
    }), o = Ee([]), i = we(() => o.value[o.value.length - 1] / (o.value.length || 1)), c = we(() => {
      var p;
      let l = o.value[o.value.length - 1], u = (((p = s.value) == null ? void 0 : p.length) - o.value.length) * i.value;
      return l + u;
    }), a = Ee(), f = Ee(), d = async (l, u) => {
      for (; l <= u; ) {
        n.value.to++, await new Promise((Q) => setTimeout(Q, 0));
        let p = a.value.querySelector(`[${Tt}]:last-child`), m = window.getComputedStyle(p), O = parseFloat(m.marginTop) + parseFloat(m.marginBottom) + p.offsetHeight;
        l += O, o.value.push(l);
      }
      return l;
    };
    return onMounted(() => {
      let l = 0, u = a.value.offsetHeight;
      l = d(l, u), a.value.addEventListener("scroll", async (p) => {
        let m = cs(o.value, (O) => p.target.scrollTop <= O && p.target.scrollTop + u >= O);
        n.value.from = Math.min(...m), n.value.to = Math.max(...m), f.value.style.paddingTop = `${o.value[m[0]]}px`, l = await d(l, u + p.target.scrollTop);
      });
    }), (l, u) => (Qe(), Vt("div", {
      ref_key: "container",
      ref: a,
      class: "virtual-scroll-container"
    }, [
      _t("div", {
        ref_key: "inner",
        ref: f,
        class: "virtual-scroll-inner",
        style: He(`height: ${c.value}px`)
      }, [
        (Qe(!0), Vt(ht, null, Or(r.value, (p) => (Qe(), Jr(Nr(p)))), 256))
      ], 4)
    ], 512));
  }
}, us = /* @__PURE__ */ ls(as, [["__scopeId", "data-v-4e4a7bb0"]]);
export {
  us as VirtualScroll
};
