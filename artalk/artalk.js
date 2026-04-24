"use strict";
(() => {
  !(function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Artalk = {});
  })(void 0, (function(e) {
    "use strict";
    var t = Object.defineProperty, n = Object.defineProperties, s = Object.getOwnPropertyDescriptors, i = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable, a = (e2, n2, s2) => n2 in e2 ? t(e2, n2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e2[n2] = s2, l = (e2, t2) => {
      for (var n2 in t2 || (t2 = {})) r.call(t2, n2) && a(e2, n2, t2[n2]);
      if (i) for (var n2 of i(t2)) o.call(t2, n2) && a(e2, n2, t2[n2]);
      return e2;
    }, c = (e2, t2) => n(e2, s(t2)), d = (e2, t2, n2) => a(e2, "symbol" != typeof t2 ? t2 + "" : t2, n2), h = (e2, t2, n2) => new Promise(((s2, i2) => {
      var r2 = (e3) => {
        try {
          a2(n2.next(e3));
        } catch (t3) {
          i2(t3);
        }
      }, o2 = (e3) => {
        try {
          a2(n2.throw(e3));
        } catch (t3) {
          i2(t3);
        }
      }, a2 = (e3) => e3.done ? s2(e3.value) : Promise.resolve(e3.value).then(r2, o2);
      a2((n2 = n2.apply(e2, t2)).next());
    }));
    class u {
      constructor(e2 = {}) {
        d(this, "baseUrl", "/api/v2"), d(this, "securityData", null), d(this, "securityWorker"), d(this, "abortControllers", /* @__PURE__ */ new Map()), d(this, "customFetch", ((...e3) => fetch(...e3))), d(this, "baseApiParams", { credentials: "same-origin", headers: {}, redirect: "follow", referrerPolicy: "no-referrer" }), d(this, "setSecurityData", ((e3) => {
          this.securityData = e3;
        })), d(this, "contentFormatters", { "application/json": (e3) => null === e3 || "object" != typeof e3 && "string" != typeof e3 ? e3 : JSON.stringify(e3), "text/plain": (e3) => null !== e3 && "string" != typeof e3 ? JSON.stringify(e3) : e3, "multipart/form-data": (e3) => Object.keys(e3 || {}).reduce(((t2, n2) => {
          const s2 = e3[n2];
          return t2.append(n2, s2 instanceof Blob ? s2 : "object" == typeof s2 && null !== s2 ? JSON.stringify(s2) : `${s2}`), t2;
        }), new FormData()), "application/x-www-form-urlencoded": (e3) => this.toQueryString(e3) }), d(this, "createAbortSignal", ((e3) => {
          if (this.abortControllers.has(e3)) {
            const t3 = this.abortControllers.get(e3);
            return t3 ? t3.signal : void 0;
          }
          const t2 = new AbortController();
          return this.abortControllers.set(e3, t2), t2.signal;
        })), d(this, "abortRequest", ((e3) => {
          const t2 = this.abortControllers.get(e3);
          t2 && (t2.abort(), this.abortControllers.delete(e3));
        })), d(this, "request", ((e3) => h(this, null, (function* () {
          var t2 = e3, { body: n2, secure: s2, path: a2, type: d2, query: u2, format: p2, baseUrl: g2, cancelToken: m2 } = t2, f2 = ((e4, t3) => {
            var n3 = {};
            for (var s3 in e4) r.call(e4, s3) && t3.indexOf(s3) < 0 && (n3[s3] = e4[s3]);
            if (null != e4 && i) for (var s3 of i(e4)) t3.indexOf(s3) < 0 && o.call(e4, s3) && (n3[s3] = e4[s3]);
            return n3;
          })(t2, ["body", "secure", "path", "type", "query", "format", "baseUrl", "cancelToken"]);
          const k2 = ("boolean" == typeof s2 ? s2 : this.baseApiParams.secure) && this.securityWorker && (yield this.securityWorker(this.securityData)) || {}, y2 = this.mergeRequestParams(f2, k2), $2 = u2 && this.toQueryString(u2), v2 = this.contentFormatters[d2 || "application/json"], w2 = p2 || y2.format;
          return this.customFetch(`${g2 || this.baseUrl || ""}${a2}${$2 ? `?${$2}` : ""}`, c(l({}, y2), { headers: l(l({}, y2.headers || {}), d2 && "multipart/form-data" !== d2 ? { "Content-Type": d2 } : {}), signal: (m2 ? this.createAbortSignal(m2) : y2.signal) || null, body: null == n2 ? null : v2(n2) })).then(((e4) => h(this, null, (function* () {
            const t3 = e4.clone();
            t3.data = null, t3.error = null;
            const n3 = w2 ? yield e4[w2]().then(((e5) => (t3.ok ? t3.data = e5 : t3.error = e5, t3))).catch(((e5) => (t3.error = e5, t3))) : t3;
            if (m2 && this.abortControllers.delete(m2), !e4.ok) throw n3;
            return n3;
          }))));
        })))), Object.assign(this, e2);
      }
      encodeQueryParam(e2, t2) {
        return `${encodeURIComponent(e2)}=${encodeURIComponent("number" == typeof t2 ? t2 : `${t2}`)}`;
      }
      addQueryParam(e2, t2) {
        return this.encodeQueryParam(t2, e2[t2]);
      }
      addArrayQueryParam(e2, t2) {
        return e2[t2].map(((e3) => this.encodeQueryParam(t2, e3))).join("&");
      }
      toQueryString(e2) {
        const t2 = e2 || {};
        return Object.keys(t2).filter(((e3) => void 0 !== t2[e3])).map(((e3) => Array.isArray(t2[e3]) ? this.addArrayQueryParam(t2, e3) : this.addQueryParam(t2, e3))).join("&");
      }
      addQueryParams(e2) {
        const t2 = this.toQueryString(e2);
        return t2 ? `?${t2}` : "";
      }
      mergeRequestParams(e2, t2) {
        return c(l(l(l({}, this.baseApiParams), e2), t2 || {}), { headers: l(l(l({}, this.baseApiParams.headers || {}), e2.headers || {}), t2 && t2.headers || {}) });
      }
    }
    /**
     * @title Artalk API
     * @version 2.0
     * @license MIT (https://github.com/ArtalkJS/Artalk/blob/master/LICENSE)
     * @baseUrl /api/v2
     * @contact API Support <artalkjs@gmail.com> (https://artalk.js.org)
     *
     * Artalk is a modern comment system based on Golang.
     */
    let p = class extends u {
      constructor() {
        super(...arguments), d(this, "auth", { loginByEmail: (e2, t2 = {}) => this.request(l({ path: "/auth/email/login", method: "POST", body: e2, type: "application/json", format: "json" }, t2)), registerByEmail: (e2, t2 = {}) => this.request(l({ path: "/auth/email/register", method: "POST", body: e2, type: "application/json", format: "json" }, t2)), sendVerifyEmail: (e2, t2 = {}) => this.request(l({ path: "/auth/email/send", method: "POST", body: e2, type: "application/json", format: "json" }, t2)), checkDataMerge: (e2 = {}) => this.request(l({ path: "/auth/merge", method: "GET", secure: true, format: "json" }, e2)), applyDataMerge: (e2, t2 = {}) => this.request(l({ path: "/auth/merge", method: "POST", body: e2, secure: true, type: "application/json", format: "json" }, t2)) }), d(this, "cache", { flushCache: (e2 = {}) => this.request(l({ path: "/cache/flush", method: "POST", secure: true, format: "json" }, e2)), warmUpCache: (e2 = {}) => this.request(l({ path: "/cache/warm_up", method: "POST", secure: true, format: "json" }, e2)) }), d(this, "captcha", { getCaptcha: (e2 = {}) => this.request(l({ path: "/captcha", method: "GET", format: "json" }, e2)), getCaptchaStatus: (e2 = {}) => this.request(l({ path: "/captcha/status", method: "GET", format: "json" }, e2)), verifyCaptcha: (e2, t2 = {}) => this.request(l({ path: "/captcha/verify", method: "POST", body: e2, type: "application/json", format: "json" }, t2)) }), d(this, "comments", { getComments: (e2, t2 = {}) => this.request(l({ path: "/comments", method: "GET", query: e2, secure: true, type: "application/json", format: "json" }, t2)), createComment: (e2, t2 = {}) => this.request(l({ path: "/comments", method: "POST", body: e2, secure: true, type: "application/json", format: "json" }, t2)), getComment: (e2, t2 = {}) => this.request(l({ path: `/comments/${e2}`, method: "GET", type: "application/json", format: "json" }, t2)), updateComment: (e2, t2, n2 = {}) => this.request(l({ path: `/comments/${e2}`, method: "PUT", body: t2, secure: true, type: "application/json", format: "json" }, n2)), deleteComment: (e2, t2 = {}) => this.request(l({ path: `/comments/${e2}`, method: "DELETE", secure: true, format: "json" }, t2)) }), d(this, "conf", { conf: (e2 = {}) => this.request(l({ path: "/conf", method: "GET", format: "json" }, e2)), getSocialLoginProviders: (e2 = {}) => this.request(l({ path: "/conf/auth/providers", method: "GET", format: "json" }, e2)), getDomain: (e2, t2 = {}) => this.request(l({ path: "/conf/domain", method: "GET", query: e2, format: "json" }, t2)) }), d(this, "notifies", { getNotifies: (e2, t2 = {}) => this.request(l({ path: "/notifies", method: "GET", query: e2, type: "application/json", format: "json" }, t2)), markAllNotifyRead: (e2, t2 = {}) => this.request(l({ path: "/notifies/read", method: "POST", body: e2, type: "application/json", format: "json" }, t2)), markNotifyRead: (e2, t2, n2 = {}) => this.request(l({ path: `/notifies/${e2}/${t2}`, method: "POST", format: "json" }, n2)) }), d(this, "pages", { getPages: (e2, t2 = {}) => this.request(l({ path: "/pages", method: "GET", query: e2, secure: true, type: "application/json", format: "json" }, t2)), fetchAllPages: (e2, t2 = {}) => this.request(l({ path: "/pages/fetch", method: "POST", body: e2, secure: true, type: "application/json", format: "json" }, t2)), getPageFetchStatus: (e2 = {}) => this.request(l({ path: "/pages/fetch/status", method: "GET", secure: true, format: "json" }, e2)), logPv: (e2, t2 = {}) => this.request(l({ path: "/pages/pv", method: "POST", body: e2, type: "application/json", format: "json" }, t2)), updatePage: (e2, t2, n2 = {}) => this.request(l({ path: `/pages/${e2}`, method: "PUT", body: t2, secure: true, type: "application/json", format: "json" }, n2)), deletePage: (e2, t2 = {}) => this.request(l({ path: `/pages/${e2}`, method: "DELETE", secure: true, format: "json" }, t2)), fetchPage: (e2, t2 = {}) => this.request(l({ path: `/pages/${e2}/fetch`, method: "POST", secure: true, type: "application/json", format: "json" }, t2)) }), d(this, "sendEmail", { sendEmail: (e2, t2 = {}) => this.request(l({ path: "/send_email", method: "POST", body: e2, secure: true, type: "application/json", format: "json" }, t2)) }), d(this, "settings", { getSettings: (e2 = {}) => this.request(l({ path: "/settings", method: "GET", secure: true, format: "json" }, e2)), applySettings: (e2, t2 = {}) => this.request(l({ path: "/settings", method: "PUT", body: e2, secure: true, type: "application/json", format: "json" }, t2)), getSettingsTemplate: (e2, t2 = {}) => this.request(l({ path: `/settings/template/${e2}`, method: "GET", secure: true, format: "json" }, t2)) }), d(this, "sites", { getSites: (e2 = {}) => this.request(l({ path: "/sites", method: "GET", secure: true, format: "json" }, e2)), createSite: (e2, t2 = {}) => this.request(l({ path: "/sites", method: "POST", body: e2, secure: true, type: "application/json", format: "json" }, t2)), updateSite: (e2, t2, n2 = {}) => this.request(l({ path: `/sites/${e2}`, method: "PUT", body: t2, secure: true, type: "application/json", format: "json" }, n2)), deleteSite: (e2, t2 = {}) => this.request(l({ path: `/sites/${e2}`, method: "DELETE", secure: true, format: "json" }, t2)) }), d(this, "stats", { getStats: (e2, t2, n2 = {}) => this.request(l({ path: `/stats/${e2}`, method: "GET", query: t2, type: "application/json", format: "json" }, n2)) }), d(this, "transfer", { exportArtrans: (e2 = {}) => this.request(l({ path: "/transfer/export", method: "GET", secure: true, format: "json" }, e2)), importArtrans: (e2, t2 = {}) => this.request(l({ path: "/transfer/import", method: "POST", body: e2, secure: true, type: "application/json" }, t2)), uploadArtrans: (e2, t2 = {}) => this.request(l({ path: "/transfer/upload", method: "POST", body: e2, secure: true, type: "multipart/form-data", format: "json" }, t2)) }), d(this, "upload", { upload: (e2, t2 = {}) => this.request(l({ path: "/upload", method: "POST", body: e2, secure: true, type: "multipart/form-data", format: "json" }, t2)) }), d(this, "user", { getUser: (e2, t2 = {}) => this.request(l({ path: "/user", method: "GET", query: e2, secure: true, format: "json" }, t2)), updateProfile: (e2, t2 = {}) => this.request(l({ path: "/user", method: "POST", body: e2, secure: true, type: "application/json", format: "json" }, t2)), login: (e2, t2 = {}) => this.request(l({ path: "/user/access_token", method: "POST", body: e2, type: "application/json", format: "json" }, t2)), getUserStatus: (e2, t2 = {}) => this.request(l({ path: "/user/status", method: "GET", query: e2, secure: true, format: "json" }, t2)) }), d(this, "users", { createUser: (e2, t2 = {}) => this.request(l({ path: "/users", method: "POST", body: e2, secure: true, type: "application/json", format: "json" }, t2)), updateUser: (e2, t2, n2 = {}) => this.request(l({ path: `/users/${e2}`, method: "PUT", body: t2, secure: true, type: "application/json", format: "json" }, n2)), deleteUser: (e2, t2 = {}) => this.request(l({ path: `/users/${e2}`, method: "DELETE", secure: true, format: "json" }, t2)), getUsers: (e2, t2, n2 = {}) => this.request(l({ path: `/users/${e2}`, method: "GET", query: t2, secure: true, type: "application/json", format: "json" }, n2)) }), d(this, "version", { getVersion: (e2 = {}) => this.request(l({ path: "/version", method: "GET", format: "json" }, e2)) }), d(this, "votes", { syncVotes: (e2 = {}) => this.request(l({ path: "/votes/sync", method: "POST", secure: true, format: "json" }, e2)), vote: (e2, t2, n2, s2 = {}) => this.request(l({ path: `/votes/${e2}/${t2}`, method: "POST", body: n2, type: "application/json", format: "json" }, s2)) });
      }
    };
    const g = (e2, t2, n2) => h(this, null, (function* () {
      const s2 = e2.getApiToken && e2.getApiToken(), i2 = new Headers(l({ Authorization: s2 ? `Bearer ${s2}` : "" }, null == n2 ? void 0 : n2.headers));
      i2.get("Authorization") || i2.delete("Authorization");
      const r2 = yield fetch(t2, c(l({}, n2), { headers: i2 }));
      if (!r2.ok) {
        const s3 = (yield r2.json().catch((() => {
        }))) || {};
        let i3 = false;
        if (e2.handlers && (yield e2.handlers.get().reduce(((e3, t3) => h(this, null, (function* () {
          yield e3, true === s3[t3.action] && (yield t3.handler(s3), i3 = true);
        }))), Promise.resolve())), i3) return g(e2, t2, n2);
        throw (function(e3, t3) {
          const n3 = new m();
          return n3.message = t3.msg || t3.message || "fetch error", n3.code = e3, n3.data = t3, console.error(n3), n3;
        })(r2.status, s3);
      }
      return r2;
    }));
    class m extends Error {
      constructor() {
        super(...arguments), d(this, "code", 0), d(this, "message", "fetch error"), d(this, "data");
      }
    }
    class f extends p {
      constructor(e2) {
        super({ baseUrl: e2.baseURL, customFetch: (t2, n2) => g(e2, t2, n2) }), d(this, "_opts"), this._opts = e2;
      }
      getUserFields() {
        const e2 = this._opts.userInfo;
        if ((null == e2 ? void 0 : e2.name) && (null == e2 ? void 0 : e2.email)) return { name: e2.name, email: e2.email };
      }
    }
    function k() {
      return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
    }
    let y = { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
    function $(e2) {
      y = e2;
    }
    const v = /[&<>"']/, w = new RegExp(v.source, "g"), b = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, x = new RegExp(b.source, "g"), C = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, E = (e2) => C[e2];
    function S(e2, t2) {
      if (t2) {
        if (v.test(e2)) return e2.replace(w, E);
      } else if (b.test(e2)) return e2.replace(x, E);
      return e2;
    }
    const T = /(^|[^\[])\^/g;
    function A(e2, t2) {
      let n2 = "string" == typeof e2 ? e2 : e2.source;
      t2 = t2 || "";
      const s2 = { replace: (e3, t3) => {
        let i2 = "string" == typeof t3 ? t3 : t3.source;
        return i2 = i2.replace(T, "$1"), n2 = n2.replace(e3, i2), s2;
      }, getRegex: () => new RegExp(n2, t2) };
      return s2;
    }
    function L(e2) {
      try {
        e2 = encodeURI(e2).replace(/%25/g, "%");
      } catch (t2) {
        return null;
      }
      return e2;
    }
    const M = { exec: () => null };
    function P(e2, t2) {
      const n2 = e2.replace(/\|/g, ((e3, t3, n3) => {
        let s3 = false, i2 = t3;
        for (; --i2 >= 0 && "\\" === n3[i2]; ) s3 = !s3;
        return s3 ? "|" : " |";
      })).split(/ \|/);
      let s2 = 0;
      if (n2[0].trim() || n2.shift(), n2.length > 0 && !n2[n2.length - 1].trim() && n2.pop(), t2) if (n2.length > t2) n2.splice(t2);
      else for (; n2.length < t2; ) n2.push("");
      for (; s2 < n2.length; s2++) n2[s2] = n2[s2].trim().replace(/\\\|/g, "|");
      return n2;
    }
    function I(e2, t2, n2) {
      const s2 = e2.length;
      if (0 === s2) return "";
      let i2 = 0;
      for (; i2 < s2; ) {
        const r2 = e2.charAt(s2 - i2 - 1);
        if (r2 !== t2 || n2) {
          if (r2 === t2 || !n2) break;
          i2++;
        } else i2++;
      }
      return e2.slice(0, s2 - i2);
    }
    function R(e2, t2, n2, s2) {
      const i2 = t2.href, r2 = t2.title ? S(t2.title) : null, o2 = e2[1].replace(/\\([\[\]])/g, "$1");
      if ("!" !== e2[0].charAt(0)) {
        s2.state.inLink = true;
        const e3 = { type: "link", raw: n2, href: i2, title: r2, text: o2, tokens: s2.inlineTokens(o2) };
        return s2.state.inLink = false, e3;
      }
      return { type: "image", raw: n2, href: i2, title: r2, text: S(o2) };
    }
    class U {
      constructor(e2) {
        d(this, "options"), d(this, "rules"), d(this, "lexer"), this.options = e2 || y;
      }
      space(e2) {
        const t2 = this.rules.block.newline.exec(e2);
        if (t2 && t2[0].length > 0) return { type: "space", raw: t2[0] };
      }
      code(e2) {
        const t2 = this.rules.block.code.exec(e2);
        if (t2) {
          const e3 = t2[0].replace(/^(?: {1,4}| {0,3}\t)/gm, "");
          return { type: "code", raw: t2[0], codeBlockStyle: "indented", text: this.options.pedantic ? e3 : I(e3, "\n") };
        }
      }
      fences(e2) {
        const t2 = this.rules.block.fences.exec(e2);
        if (t2) {
          const e3 = t2[0], n2 = (function(e4, t3) {
            const n3 = e4.match(/^(\s+)(?:```)/);
            if (null === n3) return t3;
            const s2 = n3[1];
            return t3.split("\n").map(((e5) => {
              const t4 = e5.match(/^\s+/);
              if (null === t4) return e5;
              const [n4] = t4;
              return n4.length >= s2.length ? e5.slice(s2.length) : e5;
            })).join("\n");
          })(e3, t2[3] || "");
          return { type: "code", raw: e3, lang: t2[2] ? t2[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t2[2], text: n2 };
        }
      }
      heading(e2) {
        const t2 = this.rules.block.heading.exec(e2);
        if (t2) {
          let e3 = t2[2].trim();
          if (/#$/.test(e3)) {
            const t3 = I(e3, "#");
            this.options.pedantic ? e3 = t3.trim() : t3 && !/ $/.test(t3) || (e3 = t3.trim());
          }
          return { type: "heading", raw: t2[0], depth: t2[1].length, text: e3, tokens: this.lexer.inline(e3) };
        }
      }
      hr(e2) {
        const t2 = this.rules.block.hr.exec(e2);
        if (t2) return { type: "hr", raw: I(t2[0], "\n") };
      }
      blockquote(e2) {
        const t2 = this.rules.block.blockquote.exec(e2);
        if (t2) {
          let e3 = I(t2[0], "\n").split("\n"), n2 = "", s2 = "";
          const i2 = [];
          for (; e3.length > 0; ) {
            let t3 = false;
            const r2 = [];
            let o2;
            for (o2 = 0; o2 < e3.length; o2++) if (/^ {0,3}>/.test(e3[o2])) r2.push(e3[o2]), t3 = true;
            else {
              if (t3) break;
              r2.push(e3[o2]);
            }
            e3 = e3.slice(o2);
            const a2 = r2.join("\n"), l2 = a2.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1").replace(/^ {0,3}>[ \t]?/gm, "");
            n2 = n2 ? `${n2}
${a2}` : a2, s2 = s2 ? `${s2}
${l2}` : l2;
            const c2 = this.lexer.state.top;
            if (this.lexer.state.top = true, this.lexer.blockTokens(l2, i2, true), this.lexer.state.top = c2, 0 === e3.length) break;
            const d2 = i2[i2.length - 1];
            if ("code" === (null == d2 ? void 0 : d2.type)) break;
            if ("blockquote" === (null == d2 ? void 0 : d2.type)) {
              const t4 = d2, r3 = t4.raw + "\n" + e3.join("\n"), o3 = this.blockquote(r3);
              i2[i2.length - 1] = o3, n2 = n2.substring(0, n2.length - t4.raw.length) + o3.raw, s2 = s2.substring(0, s2.length - t4.text.length) + o3.text;
              break;
            }
            if ("list" !== (null == d2 ? void 0 : d2.type)) ;
            else {
              const t4 = d2, r3 = t4.raw + "\n" + e3.join("\n"), o3 = this.list(r3);
              i2[i2.length - 1] = o3, n2 = n2.substring(0, n2.length - d2.raw.length) + o3.raw, s2 = s2.substring(0, s2.length - t4.raw.length) + o3.raw, e3 = r3.substring(i2[i2.length - 1].raw.length).split("\n");
            }
          }
          return { type: "blockquote", raw: n2, tokens: i2, text: s2 };
        }
      }
      list(e2) {
        let t2 = this.rules.block.list.exec(e2);
        if (t2) {
          let n2 = t2[1].trim();
          const s2 = n2.length > 1, i2 = { type: "list", raw: "", ordered: s2, start: s2 ? +n2.slice(0, -1) : "", loose: false, items: [] };
          n2 = s2 ? `\\d{1,9}\\${n2.slice(-1)}` : `\\${n2}`, this.options.pedantic && (n2 = s2 ? n2 : "[*+-]");
          const r2 = new RegExp(`^( {0,3}${n2})((?:[	 ][^\\n]*)?(?:\\n|$))`);
          let o2 = false;
          for (; e2; ) {
            let n3 = false, s3 = "", a2 = "";
            if (!(t2 = r2.exec(e2))) break;
            if (this.rules.block.hr.test(e2)) break;
            s3 = t2[0], e2 = e2.substring(s3.length);
            let l2 = t2[2].split("\n", 1)[0].replace(/^\t+/, ((e3) => " ".repeat(3 * e3.length))), c2 = e2.split("\n", 1)[0], d2 = !l2.trim(), h2 = 0;
            if (this.options.pedantic ? (h2 = 2, a2 = l2.trimStart()) : d2 ? h2 = t2[1].length + 1 : (h2 = t2[2].search(/[^ ]/), h2 = h2 > 4 ? 1 : h2, a2 = l2.slice(h2), h2 += t2[1].length), d2 && /^[ \t]*$/.test(c2) && (s3 += c2 + "\n", e2 = e2.substring(c2.length + 1), n3 = true), !n3) {
              const t3 = new RegExp(`^ {0,${Math.min(3, h2 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), n4 = new RegExp(`^ {0,${Math.min(3, h2 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), i3 = new RegExp(`^ {0,${Math.min(3, h2 - 1)}}(?:\`\`\`|~~~)`), r3 = new RegExp(`^ {0,${Math.min(3, h2 - 1)}}#`), o3 = new RegExp(`^ {0,${Math.min(3, h2 - 1)}}<[a-z].*>`, "i");
              for (; e2; ) {
                const u3 = e2.split("\n", 1)[0];
                let p3;
                if (c2 = u3, this.options.pedantic ? (c2 = c2.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  "), p3 = c2) : p3 = c2.replace(/\t/g, "    "), i3.test(c2)) break;
                if (r3.test(c2)) break;
                if (o3.test(c2)) break;
                if (t3.test(c2)) break;
                if (n4.test(c2)) break;
                if (p3.search(/[^ ]/) >= h2 || !c2.trim()) a2 += "\n" + p3.slice(h2);
                else {
                  if (d2) break;
                  if (l2.replace(/\t/g, "    ").search(/[^ ]/) >= 4) break;
                  if (i3.test(l2)) break;
                  if (r3.test(l2)) break;
                  if (n4.test(l2)) break;
                  a2 += "\n" + c2;
                }
                d2 || c2.trim() || (d2 = true), s3 += u3 + "\n", e2 = e2.substring(u3.length + 1), l2 = p3.slice(h2);
              }
            }
            i2.loose || (o2 ? i2.loose = true : /\n[ \t]*\n[ \t]*$/.test(s3) && (o2 = true));
            let u2, p2 = null;
            this.options.gfm && (p2 = /^\[[ xX]\] /.exec(a2), p2 && (u2 = "[ ] " !== p2[0], a2 = a2.replace(/^\[[ xX]\] +/, ""))), i2.items.push({ type: "list_item", raw: s3, task: !!p2, checked: u2, loose: false, text: a2, tokens: [] }), i2.raw += s3;
          }
          i2.items[i2.items.length - 1].raw = i2.items[i2.items.length - 1].raw.trimEnd(), i2.items[i2.items.length - 1].text = i2.items[i2.items.length - 1].text.trimEnd(), i2.raw = i2.raw.trimEnd();
          for (let e3 = 0; e3 < i2.items.length; e3++) if (this.lexer.state.top = false, i2.items[e3].tokens = this.lexer.blockTokens(i2.items[e3].text, []), !i2.loose) {
            const t3 = i2.items[e3].tokens.filter(((e4) => "space" === e4.type)), n3 = t3.length > 0 && t3.some(((e4) => /\n.*\n/.test(e4.raw)));
            i2.loose = n3;
          }
          if (i2.loose) for (let e3 = 0; e3 < i2.items.length; e3++) i2.items[e3].loose = true;
          return i2;
        }
      }
      html(e2) {
        const t2 = this.rules.block.html.exec(e2);
        if (t2) {
          return { type: "html", block: true, raw: t2[0], pre: "pre" === t2[1] || "script" === t2[1] || "style" === t2[1], text: t2[0] };
        }
      }
      def(e2) {
        const t2 = this.rules.block.def.exec(e2);
        if (t2) {
          const e3 = t2[1].toLowerCase().replace(/\s+/g, " "), n2 = t2[2] ? t2[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s2 = t2[3] ? t2[3].substring(1, t2[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t2[3];
          return { type: "def", tag: e3, raw: t2[0], href: n2, title: s2 };
        }
      }
      table(e2) {
        const t2 = this.rules.block.table.exec(e2);
        if (!t2) return;
        if (!/[:|]/.test(t2[2])) return;
        const n2 = P(t2[1]), s2 = t2[2].replace(/^\||\| *$/g, "").split("|"), i2 = t2[3] && t2[3].trim() ? t2[3].replace(/\n[ \t]*$/, "").split("\n") : [], r2 = { type: "table", raw: t2[0], header: [], align: [], rows: [] };
        if (n2.length === s2.length) {
          for (const e3 of s2) /^ *-+: *$/.test(e3) ? r2.align.push("right") : /^ *:-+: *$/.test(e3) ? r2.align.push("center") : /^ *:-+ *$/.test(e3) ? r2.align.push("left") : r2.align.push(null);
          for (let e3 = 0; e3 < n2.length; e3++) r2.header.push({ text: n2[e3], tokens: this.lexer.inline(n2[e3]), header: true, align: r2.align[e3] });
          for (const e3 of i2) r2.rows.push(P(e3, r2.header.length).map(((e4, t3) => ({ text: e4, tokens: this.lexer.inline(e4), header: false, align: r2.align[t3] }))));
          return r2;
        }
      }
      lheading(e2) {
        const t2 = this.rules.block.lheading.exec(e2);
        if (t2) return { type: "heading", raw: t2[0], depth: "=" === t2[2].charAt(0) ? 1 : 2, text: t2[1], tokens: this.lexer.inline(t2[1]) };
      }
      paragraph(e2) {
        const t2 = this.rules.block.paragraph.exec(e2);
        if (t2) {
          const e3 = "\n" === t2[1].charAt(t2[1].length - 1) ? t2[1].slice(0, -1) : t2[1];
          return { type: "paragraph", raw: t2[0], text: e3, tokens: this.lexer.inline(e3) };
        }
      }
      text(e2) {
        const t2 = this.rules.block.text.exec(e2);
        if (t2) return { type: "text", raw: t2[0], text: t2[0], tokens: this.lexer.inline(t2[0]) };
      }
      escape(e2) {
        const t2 = this.rules.inline.escape.exec(e2);
        if (t2) return { type: "escape", raw: t2[0], text: S(t2[1]) };
      }
      tag(e2) {
        const t2 = this.rules.inline.tag.exec(e2);
        if (t2) return !this.lexer.state.inLink && /^<a /i.test(t2[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && /^<\/a>/i.test(t2[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t2[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t2[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t2[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t2[0] };
      }
      link(e2) {
        const t2 = this.rules.inline.link.exec(e2);
        if (t2) {
          const e3 = t2[2].trim();
          if (!this.options.pedantic && /^</.test(e3)) {
            if (!/>$/.test(e3)) return;
            const t3 = I(e3.slice(0, -1), "\\");
            if ((e3.length - t3.length) % 2 == 0) return;
          } else {
            const e4 = (function(e5, t3) {
              if (-1 === e5.indexOf(t3[1])) return -1;
              let n3 = 0;
              for (let s3 = 0; s3 < e5.length; s3++) if ("\\" === e5[s3]) s3++;
              else if (e5[s3] === t3[0]) n3++;
              else if (e5[s3] === t3[1] && (n3--, n3 < 0)) return s3;
              return -1;
            })(t2[2], "()");
            if (e4 > -1) {
              const n3 = (0 === t2[0].indexOf("!") ? 5 : 4) + t2[1].length + e4;
              t2[2] = t2[2].substring(0, e4), t2[0] = t2[0].substring(0, n3).trim(), t2[3] = "";
            }
          }
          let n2 = t2[2], s2 = "";
          if (this.options.pedantic) {
            const e4 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n2);
            e4 && (n2 = e4[1], s2 = e4[3]);
          } else s2 = t2[3] ? t2[3].slice(1, -1) : "";
          return n2 = n2.trim(), /^</.test(n2) && (n2 = this.options.pedantic && !/>$/.test(e3) ? n2.slice(1) : n2.slice(1, -1)), R(t2, { href: n2 ? n2.replace(this.rules.inline.anyPunctuation, "$1") : n2, title: s2 ? s2.replace(this.rules.inline.anyPunctuation, "$1") : s2 }, t2[0], this.lexer);
        }
      }
      reflink(e2, t2) {
        let n2;
        if ((n2 = this.rules.inline.reflink.exec(e2)) || (n2 = this.rules.inline.nolink.exec(e2))) {
          const e3 = t2[(n2[2] || n2[1]).replace(/\s+/g, " ").toLowerCase()];
          if (!e3) {
            const e4 = n2[0].charAt(0);
            return { type: "text", raw: e4, text: e4 };
          }
          return R(n2, e3, n2[0], this.lexer);
        }
      }
      emStrong(e2, t2, n2 = "") {
        let s2 = this.rules.inline.emStrongLDelim.exec(e2);
        if (!s2) return;
        if (s2[3] && n2.match(/[\p{L}\p{N}]/u)) return;
        if (!(s2[1] || s2[2] || "") || !n2 || this.rules.inline.punctuation.exec(n2)) {
          const n3 = [...s2[0]].length - 1;
          let i2, r2, o2 = n3, a2 = 0;
          const l2 = "*" === s2[0][0] ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
          for (l2.lastIndex = 0, t2 = t2.slice(-1 * e2.length + n3); null != (s2 = l2.exec(t2)); ) {
            if (i2 = s2[1] || s2[2] || s2[3] || s2[4] || s2[5] || s2[6], !i2) continue;
            if (r2 = [...i2].length, s2[3] || s2[4]) {
              o2 += r2;
              continue;
            }
            if ((s2[5] || s2[6]) && n3 % 3 && !((n3 + r2) % 3)) {
              a2 += r2;
              continue;
            }
            if (o2 -= r2, o2 > 0) continue;
            r2 = Math.min(r2, r2 + o2 + a2);
            const t3 = [...s2[0]][0].length, l3 = e2.slice(0, n3 + s2.index + t3 + r2);
            if (Math.min(n3, r2) % 2) {
              const e3 = l3.slice(1, -1);
              return { type: "em", raw: l3, text: e3, tokens: this.lexer.inlineTokens(e3) };
            }
            const c2 = l3.slice(2, -2);
            return { type: "strong", raw: l3, text: c2, tokens: this.lexer.inlineTokens(c2) };
          }
        }
      }
      codespan(e2) {
        const t2 = this.rules.inline.code.exec(e2);
        if (t2) {
          let e3 = t2[2].replace(/\n/g, " ");
          const n2 = /[^ ]/.test(e3), s2 = /^ /.test(e3) && / $/.test(e3);
          return n2 && s2 && (e3 = e3.substring(1, e3.length - 1)), e3 = S(e3, true), { type: "codespan", raw: t2[0], text: e3 };
        }
      }
      br(e2) {
        const t2 = this.rules.inline.br.exec(e2);
        if (t2) return { type: "br", raw: t2[0] };
      }
      del(e2) {
        const t2 = this.rules.inline.del.exec(e2);
        if (t2) return { type: "del", raw: t2[0], text: t2[2], tokens: this.lexer.inlineTokens(t2[2]) };
      }
      autolink(e2) {
        const t2 = this.rules.inline.autolink.exec(e2);
        if (t2) {
          let e3, n2;
          return "@" === t2[2] ? (e3 = S(t2[1]), n2 = "mailto:" + e3) : (e3 = S(t2[1]), n2 = e3), { type: "link", raw: t2[0], text: e3, href: n2, tokens: [{ type: "text", raw: e3, text: e3 }] };
        }
      }
      url(e2) {
        var t2, n2;
        let s2;
        if (s2 = this.rules.inline.url.exec(e2)) {
          let e3, i2;
          if ("@" === s2[2]) e3 = S(s2[0]), i2 = "mailto:" + e3;
          else {
            let r2;
            do {
              r2 = s2[0], s2[0] = null != (n2 = null == (t2 = this.rules.inline._backpedal.exec(s2[0])) ? void 0 : t2[0]) ? n2 : "";
            } while (r2 !== s2[0]);
            e3 = S(s2[0]), i2 = "www." === s2[1] ? "http://" + s2[0] : s2[0];
          }
          return { type: "link", raw: s2[0], text: e3, href: i2, tokens: [{ type: "text", raw: e3, text: e3 }] };
        }
      }
      inlineText(e2) {
        const t2 = this.rules.inline.text.exec(e2);
        if (t2) {
          let e3;
          return e3 = this.lexer.state.inRawBlock ? t2[0] : S(t2[0]), { type: "text", raw: t2[0], text: e3 };
        }
      }
    }
    const q = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, _ = /(?:[*+-]|\d{1,9}[.)])/, O = A(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, _).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), D = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, B = /(?!\s*\])(?:\\.|[^\[\]\\])+/, j = A(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", B).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), F = A(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, _).getRegex(), W = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", z = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, N = A("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", z).replace("tag", W).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), H = A(D).replace("hr", q).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", W).getRegex(), Q = { blockquote: A(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", H).getRegex(), code: /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, def: j, fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, hr: q, html: N, lheading: O, list: F, newline: /^(?:[ \t]*(?:\n|$))+/, paragraph: H, table: M, text: /^[^\n]+/ }, V = A("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", q).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", W).getRegex(), G = c(l({}, Q), { table: V, paragraph: A(D).replace("hr", q).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", V).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", W).getRegex() }), K = c(l({}, Q), { html: A(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", z).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: M, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: A(D).replace("hr", q).replace("heading", " *#{1,6} *[^\n]").replace("lheading", O).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }), Z = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Y = /^( {2,}|\\)\n(?!\s*$)/, X = "\\p{P}\\p{S}", J = A(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, X).getRegex(), ee = A(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, X).getRegex(), te = A("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, X).getRegex(), ne = A("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, X).getRegex(), se = A(/\\([punct])/, "gu").replace(/punct/g, X).getRegex(), ie = A(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), re = A(z).replace("(?:-->|$)", "-->").getRegex(), oe = A("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", re).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ae = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, le = A(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", ae).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ce = A(/^!?\[(label)\]\[(ref)\]/).replace("label", ae).replace("ref", B).getRegex(), de = A(/^!?\[(ref)\](?:\[\])?/).replace("ref", B).getRegex(), he = { _backpedal: M, anyPunctuation: se, autolink: ie, blockSkip: /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, br: Y, code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, del: M, emStrongLDelim: ee, emStrongRDelimAst: te, emStrongRDelimUnd: ne, escape: Z, link: le, nolink: de, punctuation: J, reflink: ce, reflinkSearch: A("reflink|nolink(?!\\()", "g").replace("reflink", ce).replace("nolink", de).getRegex(), tag: oe, text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, url: M }, ue = c(l({}, he), { link: A(/^!?\[(label)\]\((.*?)\)/).replace("label", ae).getRegex(), reflink: A(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ae).getRegex() }), pe = c(l({}, he), { escape: A(Z).replace("])", "~|])").getRegex(), url: A(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ }), ge = c(l({}, pe), { br: A(Y).replace("{2,}", "*").getRegex(), text: A(pe.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }), me = { normal: Q, gfm: G, pedantic: K }, fe = { normal: he, gfm: pe, breaks: ge, pedantic: ue };
    class ke {
      constructor(e2) {
        d(this, "tokens"), d(this, "options"), d(this, "state"), d(this, "tokenizer"), d(this, "inlineQueue"), this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e2 || y, this.options.tokenizer = this.options.tokenizer || new U(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
        const t2 = { block: me.normal, inline: fe.normal };
        this.options.pedantic ? (t2.block = me.pedantic, t2.inline = fe.pedantic) : this.options.gfm && (t2.block = me.gfm, this.options.breaks ? t2.inline = fe.breaks : t2.inline = fe.gfm), this.tokenizer.rules = t2;
      }
      static get rules() {
        return { block: me, inline: fe };
      }
      static lex(e2, t2) {
        return new ke(t2).lex(e2);
      }
      static lexInline(e2, t2) {
        return new ke(t2).inlineTokens(e2);
      }
      lex(e2) {
        e2 = e2.replace(/\r\n|\r/g, "\n"), this.blockTokens(e2, this.tokens);
        for (let t2 = 0; t2 < this.inlineQueue.length; t2++) {
          const e3 = this.inlineQueue[t2];
          this.inlineTokens(e3.src, e3.tokens);
        }
        return this.inlineQueue = [], this.tokens;
      }
      blockTokens(e2, t2 = [], n2 = false) {
        let s2, i2, r2;
        for (this.options.pedantic && (e2 = e2.replace(/\t/g, "    ").replace(/^ +$/gm, "")); e2; ) if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(((n3) => !!(s2 = n3.call({ lexer: this }, e2, t2)) && (e2 = e2.substring(s2.raw.length), t2.push(s2), true))))) if (s2 = this.tokenizer.space(e2)) e2 = e2.substring(s2.raw.length), 1 === s2.raw.length && t2.length > 0 ? t2[t2.length - 1].raw += "\n" : t2.push(s2);
        else if (s2 = this.tokenizer.code(e2)) e2 = e2.substring(s2.raw.length), i2 = t2[t2.length - 1], !i2 || "paragraph" !== i2.type && "text" !== i2.type ? t2.push(s2) : (i2.raw += "\n" + s2.raw, i2.text += "\n" + s2.text, this.inlineQueue[this.inlineQueue.length - 1].src = i2.text);
        else if (s2 = this.tokenizer.fences(e2)) e2 = e2.substring(s2.raw.length), t2.push(s2);
        else if (s2 = this.tokenizer.heading(e2)) e2 = e2.substring(s2.raw.length), t2.push(s2);
        else if (s2 = this.tokenizer.hr(e2)) e2 = e2.substring(s2.raw.length), t2.push(s2);
        else if (s2 = this.tokenizer.blockquote(e2)) e2 = e2.substring(s2.raw.length), t2.push(s2);
        else if (s2 = this.tokenizer.list(e2)) e2 = e2.substring(s2.raw.length), t2.push(s2);
        else if (s2 = this.tokenizer.html(e2)) e2 = e2.substring(s2.raw.length), t2.push(s2);
        else if (s2 = this.tokenizer.def(e2)) e2 = e2.substring(s2.raw.length), i2 = t2[t2.length - 1], !i2 || "paragraph" !== i2.type && "text" !== i2.type ? this.tokens.links[s2.tag] || (this.tokens.links[s2.tag] = { href: s2.href, title: s2.title }) : (i2.raw += "\n" + s2.raw, i2.text += "\n" + s2.raw, this.inlineQueue[this.inlineQueue.length - 1].src = i2.text);
        else if (s2 = this.tokenizer.table(e2)) e2 = e2.substring(s2.raw.length), t2.push(s2);
        else if (s2 = this.tokenizer.lheading(e2)) e2 = e2.substring(s2.raw.length), t2.push(s2);
        else {
          if (r2 = e2, this.options.extensions && this.options.extensions.startBlock) {
            let t3 = 1 / 0;
            const n3 = e2.slice(1);
            let s3;
            this.options.extensions.startBlock.forEach(((e3) => {
              s3 = e3.call({ lexer: this }, n3), "number" == typeof s3 && s3 >= 0 && (t3 = Math.min(t3, s3));
            })), t3 < 1 / 0 && t3 >= 0 && (r2 = e2.substring(0, t3 + 1));
          }
          if (this.state.top && (s2 = this.tokenizer.paragraph(r2))) i2 = t2[t2.length - 1], n2 && "paragraph" === (null == i2 ? void 0 : i2.type) ? (i2.raw += "\n" + s2.raw, i2.text += "\n" + s2.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i2.text) : t2.push(s2), n2 = r2.length !== e2.length, e2 = e2.substring(s2.raw.length);
          else if (s2 = this.tokenizer.text(e2)) e2 = e2.substring(s2.raw.length), i2 = t2[t2.length - 1], i2 && "text" === i2.type ? (i2.raw += "\n" + s2.raw, i2.text += "\n" + s2.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = i2.text) : t2.push(s2);
          else if (e2) {
            const t3 = "Infinite loop on byte: " + e2.charCodeAt(0);
            if (this.options.silent) {
              console.error(t3);
              break;
            }
            throw new Error(t3);
          }
        }
        return this.state.top = true, t2;
      }
      inline(e2, t2 = []) {
        return this.inlineQueue.push({ src: e2, tokens: t2 }), t2;
      }
      inlineTokens(e2, t2 = []) {
        let n2, s2, i2, r2, o2, a2, l2 = e2;
        if (this.tokens.links) {
          const e3 = Object.keys(this.tokens.links);
          if (e3.length > 0) for (; null != (r2 = this.tokenizer.rules.inline.reflinkSearch.exec(l2)); ) e3.includes(r2[0].slice(r2[0].lastIndexOf("[") + 1, -1)) && (l2 = l2.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + l2.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
        }
        for (; null != (r2 = this.tokenizer.rules.inline.blockSkip.exec(l2)); ) l2 = l2.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + l2.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (; null != (r2 = this.tokenizer.rules.inline.anyPunctuation.exec(l2)); ) l2 = l2.slice(0, r2.index) + "++" + l2.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        for (; e2; ) if (o2 || (a2 = ""), o2 = false, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(((s3) => !!(n2 = s3.call({ lexer: this }, e2, t2)) && (e2 = e2.substring(n2.raw.length), t2.push(n2), true))))) if (n2 = this.tokenizer.escape(e2)) e2 = e2.substring(n2.raw.length), t2.push(n2);
        else if (n2 = this.tokenizer.tag(e2)) e2 = e2.substring(n2.raw.length), s2 = t2[t2.length - 1], s2 && "text" === n2.type && "text" === s2.type ? (s2.raw += n2.raw, s2.text += n2.text) : t2.push(n2);
        else if (n2 = this.tokenizer.link(e2)) e2 = e2.substring(n2.raw.length), t2.push(n2);
        else if (n2 = this.tokenizer.reflink(e2, this.tokens.links)) e2 = e2.substring(n2.raw.length), s2 = t2[t2.length - 1], s2 && "text" === n2.type && "text" === s2.type ? (s2.raw += n2.raw, s2.text += n2.text) : t2.push(n2);
        else if (n2 = this.tokenizer.emStrong(e2, l2, a2)) e2 = e2.substring(n2.raw.length), t2.push(n2);
        else if (n2 = this.tokenizer.codespan(e2)) e2 = e2.substring(n2.raw.length), t2.push(n2);
        else if (n2 = this.tokenizer.br(e2)) e2 = e2.substring(n2.raw.length), t2.push(n2);
        else if (n2 = this.tokenizer.del(e2)) e2 = e2.substring(n2.raw.length), t2.push(n2);
        else if (n2 = this.tokenizer.autolink(e2)) e2 = e2.substring(n2.raw.length), t2.push(n2);
        else if (this.state.inLink || !(n2 = this.tokenizer.url(e2))) {
          if (i2 = e2, this.options.extensions && this.options.extensions.startInline) {
            let t3 = 1 / 0;
            const n3 = e2.slice(1);
            let s3;
            this.options.extensions.startInline.forEach(((e3) => {
              s3 = e3.call({ lexer: this }, n3), "number" == typeof s3 && s3 >= 0 && (t3 = Math.min(t3, s3));
            })), t3 < 1 / 0 && t3 >= 0 && (i2 = e2.substring(0, t3 + 1));
          }
          if (n2 = this.tokenizer.inlineText(i2)) e2 = e2.substring(n2.raw.length), "_" !== n2.raw.slice(-1) && (a2 = n2.raw.slice(-1)), o2 = true, s2 = t2[t2.length - 1], s2 && "text" === s2.type ? (s2.raw += n2.raw, s2.text += n2.text) : t2.push(n2);
          else if (e2) {
            const t3 = "Infinite loop on byte: " + e2.charCodeAt(0);
            if (this.options.silent) {
              console.error(t3);
              break;
            }
            throw new Error(t3);
          }
        } else e2 = e2.substring(n2.raw.length), t2.push(n2);
        return t2;
      }
    }
    class ye {
      constructor(e2) {
        d(this, "options"), d(this, "parser"), this.options = e2 || y;
      }
      space(e2) {
        return "";
      }
      code({ text: e2, lang: t2, escaped: n2 }) {
        var s2;
        const i2 = null == (s2 = (t2 || "").match(/^\S*/)) ? void 0 : s2[0], r2 = e2.replace(/\n$/, "") + "\n";
        return i2 ? '<pre><code class="language-' + S(i2) + '">' + (n2 ? r2 : S(r2, true)) + "</code></pre>\n" : "<pre><code>" + (n2 ? r2 : S(r2, true)) + "</code></pre>\n";
      }
      blockquote({ tokens: e2 }) {
        return `<blockquote>
${this.parser.parse(e2)}</blockquote>
`;
      }
      html({ text: e2 }) {
        return e2;
      }
      heading({ tokens: e2, depth: t2 }) {
        return `<h${t2}>${this.parser.parseInline(e2)}</h${t2}>
`;
      }
      hr(e2) {
        return "<hr>\n";
      }
      list(e2) {
        const t2 = e2.ordered, n2 = e2.start;
        let s2 = "";
        for (let r2 = 0; r2 < e2.items.length; r2++) {
          const t3 = e2.items[r2];
          s2 += this.listitem(t3);
        }
        const i2 = t2 ? "ol" : "ul";
        return "<" + i2 + (t2 && 1 !== n2 ? ' start="' + n2 + '"' : "") + ">\n" + s2 + "</" + i2 + ">\n";
      }
      listitem(e2) {
        let t2 = "";
        if (e2.task) {
          const n2 = this.checkbox({ checked: !!e2.checked });
          e2.loose ? e2.tokens.length > 0 && "paragraph" === e2.tokens[0].type ? (e2.tokens[0].text = n2 + " " + e2.tokens[0].text, e2.tokens[0].tokens && e2.tokens[0].tokens.length > 0 && "text" === e2.tokens[0].tokens[0].type && (e2.tokens[0].tokens[0].text = n2 + " " + e2.tokens[0].tokens[0].text)) : e2.tokens.unshift({ type: "text", raw: n2 + " ", text: n2 + " " }) : t2 += n2 + " ";
        }
        return t2 += this.parser.parse(e2.tokens, !!e2.loose), `<li>${t2}</li>
`;
      }
      checkbox({ checked: e2 }) {
        return "<input " + (e2 ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
      }
      paragraph({ tokens: e2 }) {
        return `<p>${this.parser.parseInline(e2)}</p>
`;
      }
      table(e2) {
        let t2 = "", n2 = "";
        for (let i2 = 0; i2 < e2.header.length; i2++) n2 += this.tablecell(e2.header[i2]);
        t2 += this.tablerow({ text: n2 });
        let s2 = "";
        for (let i2 = 0; i2 < e2.rows.length; i2++) {
          const t3 = e2.rows[i2];
          n2 = "";
          for (let e3 = 0; e3 < t3.length; e3++) n2 += this.tablecell(t3[e3]);
          s2 += this.tablerow({ text: n2 });
        }
        return s2 && (s2 = `<tbody>${s2}</tbody>`), "<table>\n<thead>\n" + t2 + "</thead>\n" + s2 + "</table>\n";
      }
      tablerow({ text: e2 }) {
        return `<tr>
${e2}</tr>
`;
      }
      tablecell(e2) {
        const t2 = this.parser.parseInline(e2.tokens), n2 = e2.header ? "th" : "td";
        return (e2.align ? `<${n2} align="${e2.align}">` : `<${n2}>`) + t2 + `</${n2}>
`;
      }
      strong({ tokens: e2 }) {
        return `<strong>${this.parser.parseInline(e2)}</strong>`;
      }
      em({ tokens: e2 }) {
        return `<em>${this.parser.parseInline(e2)}</em>`;
      }
      codespan({ text: e2 }) {
        return `<code>${e2}</code>`;
      }
      br(e2) {
        return "<br>";
      }
      del({ tokens: e2 }) {
        return `<del>${this.parser.parseInline(e2)}</del>`;
      }
      link({ href: e2, title: t2, tokens: n2 }) {
        const s2 = this.parser.parseInline(n2), i2 = L(e2);
        if (null === i2) return s2;
        let r2 = '<a href="' + (e2 = i2) + '"';
        return t2 && (r2 += ' title="' + t2 + '"'), r2 += ">" + s2 + "</a>", r2;
      }
      image({ href: e2, title: t2, text: n2 }) {
        const s2 = L(e2);
        if (null === s2) return n2;
        let i2 = `<img src="${e2 = s2}" alt="${n2}"`;
        return t2 && (i2 += ` title="${t2}"`), i2 += ">", i2;
      }
      text(e2) {
        return "tokens" in e2 && e2.tokens ? this.parser.parseInline(e2.tokens) : e2.text;
      }
    }
    class $e {
      strong({ text: e2 }) {
        return e2;
      }
      em({ text: e2 }) {
        return e2;
      }
      codespan({ text: e2 }) {
        return e2;
      }
      del({ text: e2 }) {
        return e2;
      }
      html({ text: e2 }) {
        return e2;
      }
      text({ text: e2 }) {
        return e2;
      }
      link({ text: e2 }) {
        return "" + e2;
      }
      image({ text: e2 }) {
        return "" + e2;
      }
      br() {
        return "";
      }
    }
    class ve {
      constructor(e2) {
        d(this, "options"), d(this, "renderer"), d(this, "textRenderer"), this.options = e2 || y, this.options.renderer = this.options.renderer || new ye(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $e();
      }
      static parse(e2, t2) {
        return new ve(t2).parse(e2);
      }
      static parseInline(e2, t2) {
        return new ve(t2).parseInline(e2);
      }
      parse(e2, t2 = true) {
        let n2 = "";
        for (let s2 = 0; s2 < e2.length; s2++) {
          const i2 = e2[s2];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i2.type]) {
            const e3 = i2, t3 = this.options.extensions.renderers[e3.type].call({ parser: this }, e3);
            if (false !== t3 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(e3.type)) {
              n2 += t3 || "";
              continue;
            }
          }
          const r2 = i2;
          switch (r2.type) {
            case "space":
              n2 += this.renderer.space(r2);
              continue;
            case "hr":
              n2 += this.renderer.hr(r2);
              continue;
            case "heading":
              n2 += this.renderer.heading(r2);
              continue;
            case "code":
              n2 += this.renderer.code(r2);
              continue;
            case "table":
              n2 += this.renderer.table(r2);
              continue;
            case "blockquote":
              n2 += this.renderer.blockquote(r2);
              continue;
            case "list":
              n2 += this.renderer.list(r2);
              continue;
            case "html":
              n2 += this.renderer.html(r2);
              continue;
            case "paragraph":
              n2 += this.renderer.paragraph(r2);
              continue;
            case "text": {
              let i3 = r2, o2 = this.renderer.text(i3);
              for (; s2 + 1 < e2.length && "text" === e2[s2 + 1].type; ) i3 = e2[++s2], o2 += "\n" + this.renderer.text(i3);
              n2 += t2 ? this.renderer.paragraph({ type: "paragraph", raw: o2, text: o2, tokens: [{ type: "text", raw: o2, text: o2 }] }) : o2;
              continue;
            }
            default: {
              const e3 = 'Token with "' + r2.type + '" type was not found.';
              if (this.options.silent) return console.error(e3), "";
              throw new Error(e3);
            }
          }
        }
        return n2;
      }
      parseInline(e2, t2) {
        t2 = t2 || this.renderer;
        let n2 = "";
        for (let s2 = 0; s2 < e2.length; s2++) {
          const i2 = e2[s2];
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i2.type]) {
            const e3 = this.options.extensions.renderers[i2.type].call({ parser: this }, i2);
            if (false !== e3 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i2.type)) {
              n2 += e3 || "";
              continue;
            }
          }
          const r2 = i2;
          switch (r2.type) {
            case "escape":
            case "text":
              n2 += t2.text(r2);
              break;
            case "html":
              n2 += t2.html(r2);
              break;
            case "link":
              n2 += t2.link(r2);
              break;
            case "image":
              n2 += t2.image(r2);
              break;
            case "strong":
              n2 += t2.strong(r2);
              break;
            case "em":
              n2 += t2.em(r2);
              break;
            case "codespan":
              n2 += t2.codespan(r2);
              break;
            case "br":
              n2 += t2.br(r2);
              break;
            case "del":
              n2 += t2.del(r2);
              break;
            default: {
              const e3 = 'Token with "' + r2.type + '" type was not found.';
              if (this.options.silent) return console.error(e3), "";
              throw new Error(e3);
            }
          }
        }
        return n2;
      }
    }
    class we {
      constructor(e2) {
        d(this, "options"), d(this, "block"), this.options = e2 || y;
      }
      preprocess(e2) {
        return e2;
      }
      postprocess(e2) {
        return e2;
      }
      processAllTokens(e2) {
        return e2;
      }
      provideLexer() {
        return this.block ? ke.lex : ke.lexInline;
      }
      provideParser() {
        return this.block ? ve.parse : ve.parseInline;
      }
    }
    d(we, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]));
    class be {
      constructor(...e2) {
        d(this, "defaults", { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null }), d(this, "options", this.setOptions), d(this, "parse", this.parseMarkdown(true)), d(this, "parseInline", this.parseMarkdown(false)), d(this, "Parser", ve), d(this, "Renderer", ye), d(this, "TextRenderer", $e), d(this, "Lexer", ke), d(this, "Tokenizer", U), d(this, "Hooks", we), this.use(...e2);
      }
      walkTokens(e2, t2) {
        var n2, s2;
        let i2 = [];
        for (const r2 of e2) switch (i2 = i2.concat(t2.call(this, r2)), r2.type) {
          case "table": {
            const e3 = r2;
            for (const n3 of e3.header) i2 = i2.concat(this.walkTokens(n3.tokens, t2));
            for (const n3 of e3.rows) for (const e4 of n3) i2 = i2.concat(this.walkTokens(e4.tokens, t2));
            break;
          }
          case "list": {
            const e3 = r2;
            i2 = i2.concat(this.walkTokens(e3.items, t2));
            break;
          }
          default: {
            const e3 = r2;
            (null == (s2 = null == (n2 = this.defaults.extensions) ? void 0 : n2.childTokens) ? void 0 : s2[e3.type]) ? this.defaults.extensions.childTokens[e3.type].forEach(((n3) => {
              const s3 = e3[n3].flat(1 / 0);
              i2 = i2.concat(this.walkTokens(s3, t2));
            })) : e3.tokens && (i2 = i2.concat(this.walkTokens(e3.tokens, t2)));
          }
        }
        return i2;
      }
      use(...e2) {
        const t2 = this.defaults.extensions || { renderers: {}, childTokens: {} };
        return e2.forEach(((e3) => {
          const n2 = l({}, e3);
          if (n2.async = this.defaults.async || n2.async || false, e3.extensions && (e3.extensions.forEach(((e4) => {
            if (!e4.name) throw new Error("extension name required");
            if ("renderer" in e4) {
              const n3 = t2.renderers[e4.name];
              t2.renderers[e4.name] = n3 ? function(...t3) {
                let s2 = e4.renderer.apply(this, t3);
                return false === s2 && (s2 = n3.apply(this, t3)), s2;
              } : e4.renderer;
            }
            if ("tokenizer" in e4) {
              if (!e4.level || "block" !== e4.level && "inline" !== e4.level) throw new Error("extension level must be 'block' or 'inline'");
              const n3 = t2[e4.level];
              n3 ? n3.unshift(e4.tokenizer) : t2[e4.level] = [e4.tokenizer], e4.start && ("block" === e4.level ? t2.startBlock ? t2.startBlock.push(e4.start) : t2.startBlock = [e4.start] : "inline" === e4.level && (t2.startInline ? t2.startInline.push(e4.start) : t2.startInline = [e4.start]));
            }
            "childTokens" in e4 && e4.childTokens && (t2.childTokens[e4.name] = e4.childTokens);
          })), n2.extensions = t2), e3.renderer) {
            const t3 = this.defaults.renderer || new ye(this.defaults);
            for (const n3 in e3.renderer) {
              if (!(n3 in t3)) throw new Error(`renderer '${n3}' does not exist`);
              if (["options", "parser"].includes(n3)) continue;
              const s2 = n3, i2 = e3.renderer[s2], r2 = t3[s2];
              t3[s2] = (...e4) => {
                let n4 = i2.apply(t3, e4);
                return false === n4 && (n4 = r2.apply(t3, e4)), n4 || "";
              };
            }
            n2.renderer = t3;
          }
          if (e3.tokenizer) {
            const t3 = this.defaults.tokenizer || new U(this.defaults);
            for (const n3 in e3.tokenizer) {
              if (!(n3 in t3)) throw new Error(`tokenizer '${n3}' does not exist`);
              if (["options", "rules", "lexer"].includes(n3)) continue;
              const s2 = n3, i2 = e3.tokenizer[s2], r2 = t3[s2];
              t3[s2] = (...e4) => {
                let n4 = i2.apply(t3, e4);
                return false === n4 && (n4 = r2.apply(t3, e4)), n4;
              };
            }
            n2.tokenizer = t3;
          }
          if (e3.hooks) {
            const t3 = this.defaults.hooks || new we();
            for (const n3 in e3.hooks) {
              if (!(n3 in t3)) throw new Error(`hook '${n3}' does not exist`);
              if (["options", "block"].includes(n3)) continue;
              const s2 = n3, i2 = e3.hooks[s2], r2 = t3[s2];
              we.passThroughHooks.has(n3) ? t3[s2] = (e4) => {
                if (this.defaults.async) return Promise.resolve(i2.call(t3, e4)).then(((e5) => r2.call(t3, e5)));
                const n4 = i2.call(t3, e4);
                return r2.call(t3, n4);
              } : t3[s2] = (...e4) => {
                let n4 = i2.apply(t3, e4);
                return false === n4 && (n4 = r2.apply(t3, e4)), n4;
              };
            }
            n2.hooks = t3;
          }
          if (e3.walkTokens) {
            const t3 = this.defaults.walkTokens, s2 = e3.walkTokens;
            n2.walkTokens = function(e4) {
              let n3 = [];
              return n3.push(s2.call(this, e4)), t3 && (n3 = n3.concat(t3.call(this, e4))), n3;
            };
          }
          this.defaults = l(l({}, this.defaults), n2);
        })), this;
      }
      setOptions(e2) {
        return this.defaults = l(l({}, this.defaults), e2), this;
      }
      lexer(e2, t2) {
        return ke.lex(e2, null != t2 ? t2 : this.defaults);
      }
      parser(e2, t2) {
        return ve.parse(e2, null != t2 ? t2 : this.defaults);
      }
      parseMarkdown(e2) {
        return (t2, n2) => {
          const s2 = l({}, n2), i2 = l(l({}, this.defaults), s2), r2 = this.onError(!!i2.silent, !!i2.async);
          if (true === this.defaults.async && false === s2.async) return r2(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
          if (null == t2) return r2(new Error("marked(): input parameter is undefined or null"));
          if ("string" != typeof t2) return r2(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t2) + ", string expected"));
          i2.hooks && (i2.hooks.options = i2, i2.hooks.block = e2);
          const o2 = i2.hooks ? i2.hooks.provideLexer() : e2 ? ke.lex : ke.lexInline, a2 = i2.hooks ? i2.hooks.provideParser() : e2 ? ve.parse : ve.parseInline;
          if (i2.async) return Promise.resolve(i2.hooks ? i2.hooks.preprocess(t2) : t2).then(((e3) => o2(e3, i2))).then(((e3) => i2.hooks ? i2.hooks.processAllTokens(e3) : e3)).then(((e3) => i2.walkTokens ? Promise.all(this.walkTokens(e3, i2.walkTokens)).then((() => e3)) : e3)).then(((e3) => a2(e3, i2))).then(((e3) => i2.hooks ? i2.hooks.postprocess(e3) : e3)).catch(r2);
          try {
            i2.hooks && (t2 = i2.hooks.preprocess(t2));
            let e3 = o2(t2, i2);
            i2.hooks && (e3 = i2.hooks.processAllTokens(e3)), i2.walkTokens && this.walkTokens(e3, i2.walkTokens);
            let n3 = a2(e3, i2);
            return i2.hooks && (n3 = i2.hooks.postprocess(n3)), n3;
          } catch (c2) {
            return r2(c2);
          }
        };
      }
      onError(e2, t2) {
        return (n2) => {
          if (n2.message += "\nPlease report this to https://github.com/markedjs/marked.", e2) {
            const e3 = "<p>An error occurred:</p><pre>" + S(n2.message + "", true) + "</pre>";
            return t2 ? Promise.resolve(e3) : e3;
          }
          if (t2) return Promise.reject(n2);
          throw n2;
        };
      }
    }
    const xe = new be();
    function Ce(e2, t2) {
      return xe.parse(e2, t2);
    }
    Ce.options = Ce.setOptions = function(e2) {
      return xe.setOptions(e2), Ce.defaults = xe.defaults, $(Ce.defaults), Ce;
    }, Ce.getDefaults = k, Ce.defaults = y, Ce.use = function(...e2) {
      return xe.use(...e2), Ce.defaults = xe.defaults, $(Ce.defaults), Ce;
    }, Ce.walkTokens = function(e2, t2) {
      return xe.walkTokens(e2, t2);
    }, Ce.parseInline = xe.parseInline, Ce.Parser = ve, Ce.parser = ve.parse, Ce.Renderer = ye, Ce.TextRenderer = $e, Ce.Lexer = ke, Ce.lexer = ke.lex, Ce.Tokenizer = U, Ce.Hooks = we, Ce.parse = Ce, Ce.options, Ce.setOptions, Ce.use, Ce.walkTokens, Ce.parseInline, ve.parse, ke.lex;
    "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    function Ee(e2) {
      return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
    }
    var Se = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Te = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Ae = /(&amp;|&lt;|&gt;|&quot;|&#39;)/g, Le = /[&<>"']/g;
    function Me(e2) {
      return Se[e2];
    }
    function Pe(e2) {
      return Te[e2];
    }
    function Ie(e2) {
      return null == e2 ? "" : String(e2).replace(Le, Me);
    }
    function Re(e2) {
      return null == e2 ? "" : String(e2).replace(Ae, Pe);
    }
    Ie.options = Re.options = {};
    var Ue = { encode: Ie, escape: Ie, decode: Re, unescape: Re, version: "1.0.0-browser" };
    var qe = function e2(t2) {
      for (var n2, s2, i2 = Array.prototype.slice.call(arguments, 1); i2.length; ) for (s2 in n2 = i2.shift()) n2.hasOwnProperty(s2) && ("[object Object]" === Object.prototype.toString.call(t2[s2]) ? t2[s2] = e2(t2[s2], n2[s2]) : t2[s2] = n2[s2]);
      return t2;
    }, _e = function(e2) {
      return "string" == typeof e2 ? e2.toLowerCase() : e2;
    };
    function Oe(e2, t2) {
      return e2[t2] = true, e2;
    }
    var De = function(e2) {
      return e2.reduce(Oe, {});
    }, Be = { uris: De(["background", "base", "cite", "href", "longdesc", "src", "usemap"]) }, je = { voids: De(["area", "br", "col", "hr", "img", "wbr", "input", "base", "basefont", "link", "meta"]) }, Fe = Ue, We = _e, ze = je, Ne = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, He = /^<\s*\/\s*([\w:-]+)[^>]*>/, Qe = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, Ve = /^</, Ge = /^<\s*\//;
    var Ke = Ue, Ze = _e, Ye = Be, Xe = je;
    var Je = qe, et = function(e2, t2) {
      for (var n2, s2 = (function() {
        var e3 = [];
        return e3.lastItem = function() {
          return e3[e3.length - 1];
        }, e3;
      })(), i2 = e2; e2; ) r2();
      function r2() {
        n2 = true, (function() {
          "<!--" === e2.substr(0, 4) ? (s4 = e2.indexOf("-->")) >= 0 && (t2.comment && t2.comment(e2.substring(4, s4)), e2 = e2.substring(s4 + 3), n2 = false) : Ge.test(e2) ? o2(He, l2) : Ve.test(e2) && o2(Ne, a2);
          var s4;
          !(function() {
            if (!n2) return;
            var s5, i3 = e2.indexOf("<");
            i3 >= 0 ? (s5 = e2.substring(0, i3), e2 = e2.substring(i3)) : (s5 = e2, e2 = "");
            t2.chars && t2.chars(s5);
          })();
        })();
        var s3 = e2 === i2;
        i2 = e2, s3 && (e2 = "");
      }
      function o2(t3, s3) {
        var i3 = e2.match(t3);
        i3 && (e2 = e2.substring(i3[0].length), i3[0].replace(t3, s3), n2 = false);
      }
      function a2(e3, n3, i3, r3) {
        var o3 = {}, a3 = We(n3), l3 = ze.voids[a3] || !!r3;
        i3.replace(Qe, (function(e4, t3, n4, s3, i4) {
          o3[t3] = void 0 === n4 && void 0 === s3 && void 0 === i4 ? void 0 : Fe.decode(n4 || s3 || i4 || "");
        })), l3 || s2.push(a3), t2.start && t2.start(a3, o3, l3);
      }
      function l2(e3, n3) {
        var i3, r3 = 0, o3 = We(n3);
        if (o3) for (r3 = s2.length - 1; r3 >= 0 && s2[r3] !== o3; r3--) ;
        if (r3 >= 0) {
          for (i3 = s2.length - 1; i3 >= r3; i3--) t2.end && t2.end(s2[i3]);
          s2.length = r3;
        }
      }
      l2();
    }, tt = function(e2, t2) {
      var n2, s2 = t2 || {};
      return a2(), { start: function(e3, t3, o3) {
        var a3 = Ze(e3);
        if (n2.ignoring) return void r2(a3);
        if (-1 === (s2.allowedTags || []).indexOf(a3)) return void r2(a3);
        if (s2.filter && !s2.filter({ tag: a3, attrs: t3 })) return void r2(a3);
        i2("<"), i2(a3), Object.keys(t3).forEach((function(e4) {
          var n3 = t3[e4], r3 = (s2.allowedClasses || {})[a3] || [], o4 = (s2.allowedAttributes || {})[a3] || [], l2 = Ze(e4);
          ("class" === l2 && -1 === o4.indexOf(l2) ? (n3 = n3.split(" ").filter((function(e5) {
            return r3 && -1 !== r3.indexOf(e5);
          })).join(" ").trim()).length : -1 !== o4.indexOf(l2) && (true !== Ye.uris[l2] || (function(e5) {
            var t4 = e5[0];
            if ("#" === t4 || "/" === t4) return true;
            var n4 = e5.indexOf(":");
            if (-1 === n4) return true;
            var i3 = e5.indexOf("?");
            if (-1 !== i3 && n4 > i3) return true;
            var r4 = e5.indexOf("#");
            return -1 !== r4 && n4 > r4 || s2.allowedSchemes.some(o5);
            function o5(t5) {
              return 0 === e5.indexOf(t5 + ":");
            }
          })(n3))) && (i2(" "), i2(e4), "string" == typeof n3 && (i2('="'), i2(Ke.encode(n3)), i2('"')));
        })), i2(o3 ? "/>" : ">");
      }, end: function(e3) {
        var t3 = Ze(e3);
        -1 !== (s2.allowedTags || []).indexOf(t3) && false === n2.ignoring ? (i2("</"), i2(t3), i2(">")) : o2(t3);
      }, chars: function(e3) {
        false === n2.ignoring && i2(s2.transformText ? s2.transformText(e3) : e3);
      } };
      function i2(t3) {
        e2.push(t3);
      }
      function r2(e3) {
        Xe.voids[e3] || (false === n2.ignoring ? n2 = { ignoring: e3, depth: 1 } : n2.ignoring === e3 && n2.depth++);
      }
      function o2(e3) {
        n2.ignoring === e3 && --n2.depth <= 0 && a2();
      }
      function a2() {
        n2 = { ignoring: false, depth: 0 };
      }
    }, nt = { allowedAttributes: { a: ["href", "name", "target", "title", "aria-label"], iframe: ["allowfullscreen", "frameborder", "src"], img: ["src", "alt", "title", "aria-label"] }, allowedClasses: {}, allowedSchemes: ["http", "https", "mailto"], allowedTags: ["a", "abbr", "article", "b", "blockquote", "br", "caption", "code", "del", "details", "div", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li", "main", "mark", "ol", "p", "pre", "section", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "th", "thead", "tr", "u", "ul"], filter: null };
    function st(e2, t2, n2) {
      var s2 = [], i2 = true === n2 ? t2 : Je({}, nt, t2), r2 = tt(s2, i2);
      return et(e2, r2), s2.join("");
    }
    st.defaults = nt;
    const it = Ee(st), rt = { allowedClasses: {}, allowedSchemes: ["http", "https", "mailto", "data"], allowedTags: ["a", "abbr", "article", "b", "blockquote", "br", "caption", "code", "del", "details", "div", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li", "main", "mark", "ol", "p", "pre", "section", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "th", "thead", "tr", "u", "ul"], allowedAttributes: { "*": ["title", "accesskey"], a: ["href", "name", "target", "aria-label", "rel"], img: ["src", "alt", "title", "atk-emoticon", "aria-label", "data-src", "class", "loading"], code: ["class"], span: ["class", "style"] }, filter: (e2) => ([["code", /^hljs\W+language-(.*)$/], ["span", /^(hljs-.*)$/], ["img", /^lazyload$/]].forEach((([t2, n2]) => {
      e2.tag === t2 && e2.attrs.class && !n2.test(e2.attrs.class) && delete e2.attrs.class;
    })), "span" === e2.tag && e2.attrs.style && !/^color:(\W+)?#[0-9a-f]{3,6};?$/i.test(e2.attrs.style) && delete e2.attrs.style, true) };
    function ot(e2) {
      return it(e2, rt);
    }
    var at = { exports: {} };
    at.exports = (function() {
      function e2(e3, t3) {
        return e3(t3 = { exports: {} }, t3.exports), t3.exports;
      }
      var t2 = e2((function(e3) {
        var t3 = e3.exports = function() {
          return new RegExp("(?:" + t3.line().source + ")|(?:" + t3.block().source + ")", "gm");
        };
        t3.line = function() {
          return /(?:^|\s)\/\/(.+?)$/gm;
        }, t3.block = function() {
          return /\/\*([\S\s]*?)\*\//gm;
        };
      })), n2 = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
      function s2(e3) {
        return '<span style="color: slategray">' + e3 + "</span>";
      }
      return function(e3, i2) {
        void 0 === i2 && (i2 = {});
        var r2 = i2.colors;
        void 0 === r2 && (r2 = n2);
        var o2 = 0, a2 = {}, l2 = new RegExp("(" + /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/.source + "|" + /</.source + ")|(" + t2().source + ")", "gmi");
        return e3.replace(l2, (function(e4, t3, n3) {
          if (n3) return s2(n3);
          if ("<" === t3) return "&lt;";
          var i3;
          a2[t3] ? i3 = a2[t3] : (i3 = r2[o2], a2[t3] = i3);
          var l3 = '<span style="color: #' + i3 + '">' + t3 + "</span>";
          return o2 = ++o2 % r2.length, l3;
        }));
      };
    })();
    const lt = Ee(at.exports);
    function ct(e2) {
      return lt(e2);
    }
    function dt(e2) {
      const t2 = new Ce.Renderer();
      return t2.link = ht(t2, t2.link), t2.code = ut(), t2.image = pt(t2, t2.image, e2), t2;
    }
    const ht = (e2, t2) => (n2) => {
      const s2 = ((e3) => {
        try {
          return new URL(e3).origin;
        } catch (t3) {
          return "";
        }
      })(n2.href) === window.location.origin;
      return t2.call(e2, n2).replace(/^<a /, `<a target="_blank" ${s2 ? "" : 'rel="noreferrer noopener nofollow"'} `);
    }, ut = () => ({ lang: e2, text: t2 }) => {
      const n2 = e2 || "plaintext";
      let s2 = t2;
      return window.hljs ? n2 && window.hljs.getLanguage(n2) && (s2 = window.hljs.highlight(n2, t2).value) : s2 = ct(t2), `<pre rel="${n2}">
<code class="hljs language-${n2}">${s2.replace(/&amp;/g, "&")}</code>
</pre>`;
    }, pt = (e2, t2, { imgLazyLoad: n2 }) => (s2) => {
      const i2 = t2.call(e2, s2);
      return n2 ? "native" === n2 || true === n2 ? i2.replace(/^<img /, '<img class="lazyload" loading="lazy" ') : "data-src" === n2 ? i2.replace(/^<img /, '<img class="lazyload" ').replace("src=", "data-src=") : i2 : i2;
    };
    let gt, mt = [];
    const ft = { gfm: true, breaks: true, async: false };
    function kt() {
      return gt;
    }
    function yt(e2) {
      var t2;
      let n2 = null == (t2 = kt()) ? void 0 : t2.parse(e2);
      n2 || (n2 = (function(e3) {
        return e3.replace(/```\s*([^]+?.*?[^]+?[^]+?)```/g, ((e4, t3) => `<pre><code>${ct(t3)}</code></pre>`)).replace(/!\[(.*?)\]\((.*?)\)/g, ((e4, t3, n3) => `<img src="${n3}" alt="${t3}" />`)).replace(/\[(.*?)\]\((.*?)\)/g, ((e4, t3, n3) => `<a href="${n3}" target="_blank">${t3}</a>`)).replace(/\n/g, "<br>");
      })(e2));
      let s2 = ot(n2);
      return mt.forEach(((e3) => {
        "function" == typeof e3 && (s2 = e3(s2));
      })), s2;
    }
    function $t(...e2) {
      const t2 = (e3) => e3 && "object" == typeof e3 && e3.constructor === Object;
      return e2.reduce(((e3, n2) => (Object.keys(null != n2 ? n2 : {}).forEach(((s2) => {
        if ("__proto__" === s2 || "constructor" === s2 || "prototype" === s2) return;
        const i2 = e3[s2], r2 = n2[s2];
        Array.isArray(i2) && Array.isArray(r2) ? e3[s2] = i2.concat(...r2) : t2(i2) && t2(r2) ? e3[s2] = $t(i2, r2) : e3[s2] = r2;
      })), e3)), {});
    }
    class vt {
      constructor(e2) {
        d(this, "loading", false), d(this, "listLastFetch"), d(this, "comments", []), d(this, "notifies", []), d(this, "page"), this.events = e2;
      }
      getLoading() {
        return this.loading;
      }
      setLoading(e2) {
        this.loading = e2;
      }
      getListLastFetch() {
        return this.listLastFetch;
      }
      setListLastFetch(e2) {
        this.listLastFetch = e2;
      }
      getComments() {
        return this.comments;
      }
      fetchComments(e2) {
        this.events.trigger("list-fetch", e2);
      }
      findComment(e2) {
        return this.comments.find(((t2) => t2.id === e2));
      }
      clearComments() {
        this.comments = [], this.events.trigger("list-loaded", this.comments);
      }
      loadComments(e2) {
        this.events.trigger("list-load", e2), this.comments.push(...e2), this.events.trigger("list-loaded", this.comments);
      }
      insertComment(e2) {
        this.comments.push(e2), this.events.trigger("comment-inserted", e2), this.events.trigger("list-loaded", this.comments);
      }
      updateComment(e2) {
        this.comments = this.comments.map(((t2) => t2.id === e2.id ? e2 : t2)), this.events.trigger("comment-updated", e2), this.events.trigger("list-loaded", this.comments);
      }
      deleteComment(e2) {
        const t2 = this.comments.find(((t3) => t3.id === e2));
        if (!t2) throw new Error(`Comment ${e2} not found`);
        this.comments = this.comments.filter(((t3) => t3.id !== e2)), this.events.trigger("comment-deleted", t2), this.events.trigger("list-loaded", this.comments);
      }
      getNotifies() {
        return this.notifies;
      }
      updateNotifies(e2) {
        this.notifies = e2, this.events.trigger("notifies-updated", this.notifies);
      }
      getPage() {
        return this.page;
      }
      updatePage(e2) {
        this.page = e2, this.events.trigger("page-loaded", e2);
      }
    }
    function wt(e2 = "") {
      const t2 = document.createElement("div");
      return t2.innerHTML = e2.trim(), t2.firstElementChild || t2;
    }
    function bt(e2) {
      const t2 = document.createElement("div");
      t2.innerText = e2;
      return t2.innerHTML;
    }
    function xt(e2) {
      const t2 = RegExp(`[?&]${e2}=([^&]*)`).exec(window.location.search);
      return t2 && decodeURIComponent(t2[1].replace(/\+/g, " "));
    }
    function Ct(e2, t2) {
      const n2 = (e3) => {
        const t3 = e3.getBoundingClientRect(), n3 = window.pageXOffset || document.documentElement.scrollLeft, s3 = window.pageYOffset || document.documentElement.scrollTop;
        return { top: t3.top + s3, left: t3.left + n3 };
      }, s2 = n2(e2);
      if (!t2) return s2;
      const i2 = n2(t2);
      return { top: s2.top - i2.top, left: s2.left - i2.left };
    }
    function Et(e2, t2) {
      let n2 = e2.toString();
      for (; n2.length < t2; ) n2 = `0${n2}`;
      return n2;
    }
    function St(e2, t2 = (e3) => e3) {
      try {
        const n2 = e2.getTime(), s2 = (/* @__PURE__ */ new Date()).getTime() - n2, i2 = Math.floor(s2 / 864e5);
        if (0 === i2) {
          const e3 = s2 % 864e5, n3 = Math.floor(e3 / 36e5);
          if (0 === n3) {
            const n4 = e3 % 36e5, s3 = Math.floor(n4 / 6e4);
            if (0 === s3) {
              const e4 = n4 % 6e4, s4 = Math.round(e4 / 1e3);
              return s4 < 10 ? t2("now") : `${s4} ${t2("seconds")}`;
            }
            return `${s3} ${t2("minutes")}`;
          }
          return `${n3} ${t2("hours")}`;
        }
        return i2 < 0 ? t2("now") : i2 < 8 ? `${i2} ${t2("days")}` : (function(e3) {
          const t3 = Et(e3.getDate(), 2), n3 = Et(e3.getMonth() + 1, 2);
          return `${Et(e3.getFullYear(), 2)}-${n3}-${t3}`;
        })(e2);
      } catch (n2) {
        return console.error(n2), " - ";
      }
    }
    function Tt() {
      return h(this, null, (function* () {
        const e2 = navigator.userAgent;
        if (!navigator.userAgentData || !navigator.userAgentData.getHighEntropyValues) return e2;
        const t2 = navigator.userAgentData;
        let n2 = null;
        try {
          n2 = yield t2.getHighEntropyValues(["platformVersion"]);
        } catch (i2) {
          return console.error(i2), e2;
        }
        const s2 = Number(n2.platformVersion.split(".")[0]);
        return "Windows" === t2.platform && s2 >= 13 ? e2.replace(/Windows NT 10.0/, "Windows NT 11.0") : "macOS" === t2.platform && s2 >= 11 ? e2.replace(/(Mac OS X \d+_\d+_\d+|Mac OS X)/, `Mac OS X ${n2.platformVersion.replace(/\./g, "_")}`) : e2;
      }));
    }
    function At(e2) {
      let t2;
      try {
        t2 = new URL(e2);
      } catch (n2) {
        return false;
      }
      return "http:" === t2.protocol || "https:" === t2.protocol;
    }
    function Lt(e2) {
      return t2 = e2.base, n2 = e2.path, `${t2.replace(/\/$/, "")}/${n2.replace(/^\//, "")}`;
      var t2, n2;
    }
    const Mt = { placeholder: "Leave a comment", noComment: "No Comment", send: "Send", signIn: "Sign in", signUp: "Sign up", save: "Save", nick: "Nickname", email: "Email", link: "Website", emoticon: "Emoji", preview: "Preview", uploadImage: "Upload Image", uploadFail: "Upload Failed", commentFail: "Failed to comment", restoredMsg: "Content has been restored", onlyAdminCanReply: "Only admin can reply", uploadLoginMsg: "Please fill in your name and email to upload", counter: "{count} Comments", sortLatest: "Latest", sortOldest: "Oldest", sortBest: "Best", sortAuthor: "Author", openComment: "Open Comment", closeComment: "Close Comment", listLoadFailMsg: "Failed to load comments", listRetry: "Retry", loadMore: "Load More", admin: "Admin", reply: "Reply", voteUp: "Up", voteDown: "Down", voteFail: "Vote Failed", readMore: "Read More", actionConfirm: "Confirm", collapse: "Collapse", collapsed: "Collapsed", collapsedMsg: "This comment has been collapsed", expand: "Expand", approved: "Approved", pending: "Pending", pendingMsg: "Pending, visible only to commenter.", edit: "Edit", editCancel: "Cancel Edit", delete: "Delete", deleteConfirm: "Confirm", pin: "Pin", unpin: "Unpin", seconds: "seconds ago", minutes: "minutes ago", hours: "hours ago", days: "days ago", now: "just now", adminCheck: "Enter admin password:", captchaCheck: "Enter the CAPTCHA to continue:", confirm: "Confirm", cancel: "Cancel", msgCenter: "Messages", ctrlCenter: "Dashboard", userProfile: "Profile", noAccountPrompt: "Don't have an account?", haveAccountPrompt: "Already have an account?", forgetPassword: "Forget Password", resetPassword: "Reset Password", changePassword: "Change Password", confirmPassword: "Confirm Password", passwordMismatch: "Passwords do not match", verificationCode: "Verification Code", verifySend: "Send Code", verifyResend: "Resend", waitSeconds: "Wait {seconds}s", emailVerified: "Email has been verified", password: "Password", username: "Username", nextStep: "Next Step", skipVerify: "Skip verification", logoutConfirm: "Are you sure to logout?", accountMergeNotice: "Your email has multiple accounts with different id.", accountMergeSelectOne: "Please select one you want to merge all the data into it.", accountMergeConfirm: "All data will be merged into one account, the id is {id}.", dismiss: "Dismiss", merge: "Merge", frontend: "Frontend", backend: "Backend", loading: "Loading", loadFail: "Load Failed", editing: "Editing", editFail: "Edit Failed", deleting: "Deleting", deleteFail: "Delete Failed", reqGot: "Request got", reqAborted: "Request timed out or terminated unexpectedly", updateMsg: "Please update Artalk {name} to get the best experience!", currentVersion: "Current Version", ignore: "Ignore", open: "Open", openName: "Open {name}" }, Pt = "ArtalkI18n", It = { en: Mt, "en-US": Mt, "zh-CN": { placeholder: "\u952E\u5165\u5185\u5BB9...", noComment: "\u300C\u6B64\u65F6\u65E0\u58F0\u80DC\u6709\u58F0\u300D", send: "\u53D1\u9001", signIn: "\u767B\u5F55", signUp: "\u6CE8\u518C", save: "\u4FDD\u5B58", nick: "\u6635\u79F0", email: "\u90AE\u7BB1", link: "\u7F51\u5740", emoticon: "\u8868\u60C5", preview: "\u9884\u89C8", uploadImage: "\u4E0A\u4F20\u56FE\u7247", uploadFail: "\u4E0A\u4F20\u5931\u8D25", commentFail: "\u8BC4\u8BBA\u5931\u8D25", restoredMsg: "\u5185\u5BB9\u5DF2\u81EA\u52A8\u6062\u590D", onlyAdminCanReply: "\u4EC5\u7BA1\u7406\u5458\u53EF\u8BC4\u8BBA", uploadLoginMsg: "\u586B\u5165\u4F60\u7684\u540D\u5B57\u90AE\u7BB1\u624D\u80FD\u4E0A\u4F20\u54E6", counter: "{count} \u6761\u8BC4\u8BBA", sortLatest: "\u6700\u65B0", sortOldest: "\u6700\u65E9", sortBest: "\u6700\u70ED", sortAuthor: "\u4F5C\u8005", openComment: "\u6253\u5F00\u8BC4\u8BBA", closeComment: "\u5173\u95ED\u8BC4\u8BBA", listLoadFailMsg: "\u65E0\u6CD5\u83B7\u53D6\u8BC4\u8BBA\u5217\u8868\u6570\u636E", listRetry: "\u70B9\u51FB\u91CD\u65B0\u83B7\u53D6", loadMore: "\u52A0\u8F7D\u66F4\u591A", admin: "\u7BA1\u7406\u5458", reply: "\u56DE\u590D", voteUp: "\u8D5E\u540C", voteDown: "\u53CD\u5BF9", voteFail: "\u6295\u7968\u5931\u8D25", readMore: "\u9605\u8BFB\u66F4\u591A", actionConfirm: "\u786E\u8BA4\u64CD\u4F5C", collapse: "\u6298\u53E0", collapsed: "\u5DF2\u6298\u53E0", collapsedMsg: "\u8BE5\u8BC4\u8BBA\u5DF2\u88AB\u7CFB\u7EDF\u6216\u7BA1\u7406\u5458\u6298\u53E0", expand: "\u5C55\u5F00", approved: "\u5DF2\u5BA1", pending: "\u5F85\u5BA1", pendingMsg: "\u5BA1\u6838\u4E2D\uFF0C\u4EC5\u672C\u4EBA\u53EF\u89C1\u3002", edit: "\u7F16\u8F91", editCancel: "\u53D6\u6D88\u7F16\u8F91", delete: "\u5220\u9664", deleteConfirm: "\u786E\u8BA4\u5220\u9664", pin: "\u7F6E\u9876", unpin: "\u53D6\u6D88\u7F6E\u9876", seconds: "\u79D2\u524D", minutes: "\u5206\u949F\u524D", hours: "\u5C0F\u65F6\u524D", days: "\u5929\u524D", now: "\u521A\u521A", adminCheck: "\u952E\u5165\u5BC6\u7801\u6765\u9A8C\u8BC1\u7BA1\u7406\u5458\u8EAB\u4EFD\uFF1A", captchaCheck: "\u952E\u5165\u9A8C\u8BC1\u7801\u7EE7\u7EED\uFF1A", confirm: "\u786E\u8BA4", cancel: "\u53D6\u6D88", msgCenter: "\u901A\u77E5\u4E2D\u5FC3", ctrlCenter: "\u63A7\u5236\u4E2D\u5FC3", userProfile: "\u4E2A\u4EBA\u8D44\u6599", noAccountPrompt: "\u6CA1\u6709\u8D26\u53F7\uFF1F", haveAccountPrompt: "\u5DF2\u6709\u8D26\u53F7\uFF1F", forgetPassword: "\u5FD8\u8BB0\u5BC6\u7801", resetPassword: "\u91CD\u7F6E\u5BC6\u7801", changePassword: "\u4FEE\u6539\u5BC6\u7801", confirmPassword: "\u786E\u8BA4\u5BC6\u7801", passwordMismatch: "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4", verificationCode: "\u9A8C\u8BC1\u7801", verifySend: "\u53D1\u9001\u9A8C\u8BC1\u7801", verifyResend: "\u91CD\u65B0\u53D1\u9001", waitSeconds: "\u7B49\u5F85 {seconds}\u79D2", emailVerified: "\u90AE\u7BB1\u5DF2\u9A8C\u8BC1", password: "\u5BC6\u7801", username: "\u7528\u6237\u540D", nextStep: "\u4E0B\u4E00\u6B65", skipVerify: "\u8DF3\u8FC7\u9A8C\u8BC1", logoutConfirm: "\u786E\u5B9A\u8981\u9000\u51FA\u767B\u5F55\u5417\uFF1F", accountMergeNotice: "\u60A8\u7684\u7535\u5B50\u90AE\u4EF6\u4E0B\u6709\u591A\u4E2A\u4E0D\u540C ID \u7684\u8D26\u6237\u3002", accountMergeSelectOne: "\u8BF7\u9009\u62E9\u5C06\u6240\u6709\u6570\u636E\u5408\u5E76\u5230\u5176\u4E2D\u7684\u4E00\u4E2A\u3002", accountMergeConfirm: "\u6240\u6709\u6570\u636E\u5C06\u5408\u5E76\u5230 ID \u4E3A {id} \u7684\u8D26\u6237\u4E2D\u3002", dismiss: "\u5FFD\u7565", merge: "\u5408\u5E76", frontend: "\u524D\u7AEF", backend: "\u540E\u7AEF", loading: "\u52A0\u8F7D\u4E2D", loadFail: "\u52A0\u8F7D\u5931\u8D25", editing: "\u4FEE\u6539\u4E2D", editFail: "\u4FEE\u6539\u5931\u8D25", deleting: "\u5220\u9664\u4E2D", deleteFail: "\u5220\u9664\u5931\u8D25", reqGot: "\u8BF7\u6C42\u54CD\u5E94", reqAborted: "\u8BF7\u6C42\u8D85\u65F6\u6216\u610F\u5916\u7EC8\u6B62", updateMsg: "\u8BF7\u66F4\u65B0 Artalk {name} \u4EE5\u83B7\u5F97\u66F4\u597D\u7684\u4F53\u9A8C\uFF01", currentVersion: "\u5F53\u524D\u7248\u672C", ignore: "\u5FFD\u7565", open: "\u6253\u5F00", openName: "\u6253\u5F00{name}" } };
    function Rt(e2) {
      return e2 = e2.replace(/^([a-zA-Z]+)(-[a-zA-Z]+)?$/, ((e3, t2, n2) => t2.toLowerCase() + (n2 || "").toUpperCase())), It[e2] ? It[e2] : window[Pt] && window[Pt][e2] ? window[Pt][e2] : It.en;
    }
    let Ut = "en", qt = Rt(Ut);
    function _t(e2) {
      e2 !== Ut && (Ut = e2, qt = "string" == typeof e2 ? Rt(e2) : e2);
    }
    function Ot(e2, t2 = {}) {
      let n2 = (null == qt ? void 0 : qt[e2]) || e2;
      return n2 = n2.replace(/\{\s*(\w+?)\s*\}/g, ((e3, n3) => t2[n3] || "")), bt(n2);
    }
    class Dt {
      constructor() {
        d(this, "events", []);
      }
      on(e2, t2, n2 = {}) {
        this.events.push(l({ name: e2, handler: t2 }, n2));
      }
      off(e2, t2) {
        t2 && (this.events = this.events.filter(((n2) => !(n2.name === e2 && n2.handler === t2))));
      }
      trigger(e2, t2) {
        this.events.slice(0).filter(((t3) => t3.name === e2 && "function" == typeof t3.handler)).forEach(((n2) => {
          n2.once && this.off(e2, n2.handler), n2.handler(t2);
        }));
      }
    }
    const Bt = { el: "", pageKey: "", pageTitle: "", server: "", site: "", placeholder: "", noComment: "", sendBtn: "", darkMode: false, editorTravel: true, flatMode: "auto", nestMax: 2, nestSort: "DATE_ASC", emoticons: "https://cdn.jsdelivr.net/gh/ArtalkJS/Emoticons/grps/default.json", vote: true, voteDown: false, uaBadge: true, listSort: true, preview: true, countEl: ".artalk-comment-count", pvEl: ".artalk-pv-count", statPageKeyAttr: "data-page-key", gravatar: { mirror: "https://www.gravatar.com/avatar/", params: "sha256=1&d=mp&s=240" }, pagination: { pageSize: 20, readMore: true, autoLoad: true }, heightLimit: { content: 300, children: 400, scrollable: false }, imgUpload: true, reqTimeout: 15e3, versionCheck: true, useBackendConf: true, locale: "en" };
    function jt(e2, t2 = false) {
      const n2 = t2 ? $t(Bt, e2) : e2;
      if (n2.el && "string" == typeof n2.el) try {
        const e3 = document.querySelector(n2.el);
        if (!e3) throw Error(`Target element "${n2.el}" was not found.`);
        n2.el = e3;
      } catch (s2) {
        throw console.error(s2), new Error("Please check your Artalk `el` config.");
      }
      return "" === n2.pageKey && (n2.pageKey = `${window.location.pathname}`), "" === n2.pageTitle && (n2.pageTitle = `${document.title}`), n2.server && (n2.server = n2.server.replace(/\/$/, "").replace(/\/api\/?$/, "")), "auto" === n2.locale && (n2.locale = navigator.language), "auto" === n2.flatMode && (n2.flatMode = window.matchMedia("(max-width: 768px)").matches), "number" == typeof n2.nestMax && Number(n2.nestMax) <= 1 && (n2.flatMode = true), n2;
    }
    function Ft(e2, t2) {
      return { baseURL: `${e2.server}/api/v2`, siteName: e2.site || "", pageKey: e2.pageKey || "", pageTitle: e2.pageTitle || "", timeout: e2.reqTimeout, getApiToken: () => null == t2 ? void 0 : t2.get("user").getData().token, userInfo: (null == t2 ? void 0 : t2.get("user").checkHasBasicUserInfo()) ? { name: null == t2 ? void 0 : t2.get("user").getData().name, email: null == t2 ? void 0 : t2.get("user").getData().email } : void 0, handlers: null == t2 ? void 0 : t2.getApiHandlers() };
    }
    function Wt(e2, t2, n2) {
      let s2 = null;
      const i2 = () => {
        const i3 = (() => {
          const n3 = e2.getConf(), s3 = {};
          return t2.forEach(((e3) => {
            s3[e3] = n3[e3];
          })), s3;
        })();
        var r2, o2;
        (null == s2 || (r2 = s2, o2 = i3, !(JSON.stringify(r2) === JSON.stringify(o2)))) && (s2 = i3, n2(i3));
      };
      e2.on("mounted", i2), e2.on("updated", i2);
    }
    class zt {
      constructor(e2) {
        d(this, "conf"), d(this, "data"), d(this, "$root"), d(this, "events", new Dt()), d(this, "mounted", false), d(this, "apiHandlers", null), d(this, "getCommentList", this.getCommentNodes), d(this, "getCommentDataList", this.getComments), this.conf = e2, this.$root = e2.el, this.$root.classList.add("artalk"), this.$root.innerHTML = "", e2.darkMode && this.$root.classList.add("atk-dark-mode"), this.data = new vt(this.events), this.on("mounted", (() => {
          this.mounted = true;
        }));
      }
      inject(e2, t2) {
        this[e2] = t2;
      }
      get(e2) {
        return this[e2];
      }
      getApi() {
        return new f(Ft(this.conf, this));
      }
      getApiHandlers() {
        return this.apiHandlers || (this.apiHandlers = (function(e2) {
          const t2 = /* @__PURE__ */ (function() {
            const e3 = [];
            return { add: (t3, n2) => {
              e3.push({ action: t3, handler: n2 });
            }, remove: (t3) => {
              const n2 = e3.findIndex(((e4) => e4.action === t3));
              -1 !== n2 && e3.splice(n2, 1);
            }, get: () => e3 };
          })();
          return t2.add("need_captcha", ((t3) => e2.checkCaptcha(t3))), t2.add("need_login", (() => e2.checkAdmin({}))), t2;
        })(this)), this.apiHandlers;
      }
      getData() {
        return this.data;
      }
      replyComment(e2, t2) {
        this.editor.setReply(e2, t2);
      }
      editComment(e2, t2) {
        this.editor.setEditComment(e2, t2);
      }
      fetch(e2) {
        this.data.fetchComments(e2);
      }
      reload() {
        this.data.fetchComments({ offset: 0 });
      }
      listGotoFirst() {
        this.events.trigger("list-goto-first");
      }
      getCommentNodes() {
        return this.list.getCommentNodes();
      }
      getComments() {
        return this.data.getComments();
      }
      editorShowLoading() {
        this.editor.showLoading();
      }
      editorHideLoading() {
        this.editor.hideLoading();
      }
      editorShowNotify(e2, t2) {
        this.editor.showNotify(e2, t2);
      }
      editorResetState() {
        this.editor.resetState();
      }
      showSidebar(e2) {
        this.sidebarLayer.show(e2);
      }
      hideSidebar() {
        this.sidebarLayer.hide();
      }
      checkAdmin(e2) {
        return this.checkerLauncher.checkAdmin(e2);
      }
      checkCaptcha(e2) {
        return this.checkerLauncher.checkCaptcha(e2);
      }
      on(e2, t2) {
        this.events.on(e2, t2);
      }
      off(e2, t2) {
        this.events.off(e2, t2);
      }
      trigger(e2, t2) {
        this.events.trigger(e2, t2);
      }
      $t(e2, t2 = {}) {
        return Ot(e2, t2);
      }
      setDarkMode(e2) {
        this.updateConf({ darkMode: e2 });
      }
      updateConf(e2) {
        this.conf = $t(this.conf, jt(e2, false)), this.mounted && this.events.trigger("updated", this.conf);
      }
      getConf() {
        return this.conf;
      }
      getEl() {
        return this.$root;
      }
      getMarked() {
        return kt();
      }
      watchConf(e2, t2) {
        Wt(this, e2, t2);
      }
    }
    function Nt(e2, t2) {
      let n2 = e2.querySelector(":scope > .atk-loading");
      n2 || (n2 = wt('<div class="atk-loading" style="display: none;">\n      <div class="atk-loading-spinner">\n        <svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg>\n      </div>\n    </div>'), (null == t2 ? void 0 : t2.transparentBg) && (n2.style.background = "transparent"), e2.appendChild(n2)), n2.style.display = "";
      const s2 = n2.querySelector(".atk-loading-spinner");
      s2 && (s2.style.display = "none", window.setTimeout((() => {
        s2.isConnected && (s2.style.display = "");
      }), 500));
    }
    function Ht(e2) {
      const t2 = e2.querySelector(":scope > .atk-loading");
      t2 && (t2.style.display = "none");
    }
    function Qt(e2, t2) {
      e2 ? Nt(t2) : Ht(t2);
    }
    function Vt(e2, t2 = true, n2) {
      let s2;
      if (n2) {
        const t3 = n2.getBoundingClientRect();
        s2 = e2.getBoundingClientRect().top - t3.top + n2.scrollTop - n2.clientHeight / 2 + e2.clientHeight / 2;
      } else {
        const t3 = e2.getBoundingClientRect();
        s2 = t3.top + window.scrollY - (window.innerHeight / 2 - t3.height / 2);
      }
      const i2 = { top: s2, left: 0, behavior: "instant" };
      n2 ? n2.scroll(i2) : window.scroll(i2);
    }
    function Gt(e2, t2) {
      !(function(e3, t3, n2 = "in") {
        e3.classList.add(`atk-fade-${n2}`);
        const s2 = () => {
          e3.classList.remove(`atk-fade-${n2}`), e3.removeEventListener("animationend", s2);
        };
        e3.addEventListener("animationend", s2);
      })(e2, 0, "in");
    }
    function Kt(e2, t2, n2 = '<span class="atk-error-title">Artalk Error</span>') {
      let s2 = e2.querySelector(".atk-error-layer");
      if (null === t2) return void (null !== s2 && s2.remove());
      s2 || (s2 = wt(`<div class="atk-error-layer">${n2}<span class="atk-error-text"></span></div>`), e2.appendChild(s2));
      const i2 = s2.querySelector(".atk-error-text");
      i2.innerHTML = "", null !== t2 && (t2 instanceof HTMLElement ? i2.appendChild(t2) : i2.innerText = t2);
    }
    function Zt(e2) {
      const t2 = wt('<div class="atk-checker-iframe-wrap"></div>'), n2 = wt('<iframe class="atk-fade-in" referrerpolicy="strict-origin-when-cross-origin"></iframe>');
      n2.style.display = "none", Nt(t2, { transparentBg: true }), n2.src = e2.getOpts().getCaptchaIframeURL(), n2.onload = () => {
        n2.style.display = "", Ht(t2);
      }, t2.append(n2);
      const s2 = wt('<div class="atk-close-btn"><i class="atk-icon atk-icon-close"></i></div>');
      t2.append(s2), e2.hideInteractInput();
      let i2 = false;
      return (function t3() {
        return h(this, null, (function* () {
          var n3;
          if (yield (n3 = 1e3, new Promise(((e3) => {
            window.setTimeout((() => {
              e3(null);
            }), n3);
          }))), i2) return;
          let s3 = false;
          try {
            s3 = (yield e2.getApi().captcha.getCaptchaStatus()).data.is_pass;
          } catch (r2) {
            s3 = false;
          }
          s3 ? e2.triggerSuccess() : t3();
        }));
      })(), s2.onclick = () => {
        i2 = true, e2.cancel();
      }, t2;
    }
    const Yt = { request: (e2, t2) => e2.getApi().captcha.verifyCaptcha({ value: t2 }), body: (e2) => e2.get("iframe") ? Zt(e2) : (function(e3) {
      const t2 = wt(`<span><img class="atk-captcha-img" src="${e3.get("img_data") || ""}">${Ot("captchaCheck")}</span>`);
      return t2.querySelector(".atk-captcha-img").onclick = () => {
        const n2 = t2.querySelector(".atk-captcha-img");
        e3.getApi().captcha.getCaptcha().then(((e4) => {
          n2.setAttribute("src", e4.data.img_data);
        })).catch(((e4) => {
          console.error("Failed to get captcha image ", e4);
        }));
      }, t2;
    })(e2), onSuccess(e2, t2, n2, s2) {
      e2.set("val", n2);
    }, onError(e2, t2, n2, s2) {
      s2.querySelector(".atk-captcha-img").click(), s2.querySelector('input[type="text"]').value = "";
    } }, Xt = { inputType: "password", request(e2, t2) {
      return h(this, null, (function* () {
        return (yield e2.getApi().user.login({ name: e2.getUser().getData().name, email: e2.getUser().getData().email, password: t2 })).data;
      }));
    }, body: (e2) => wt(`<span>${Ot("adminCheck")}</span>`), onSuccess(e2, t2, n2, s2) {
      e2.getUser().update({ is_admin: true, token: t2.token }), e2.getOpts().onReload();
    }, onError(e2, t2, n2, s2) {
    } };
    class Jt {
      constructor(e2) {
        d(this, "$el"), d(this, "$content"), d(this, "$actions"), this.$el = wt('<div class="atk-layer-dialog-wrap">\n        <div class="atk-layer-dialog">\n          <div class="atk-layer-dialog-content"></div>\n          <div class="atk-layer-dialog-actions"></div>\n        </div>\n      </div>'), this.$actions = this.$el.querySelector(".atk-layer-dialog-actions"), this.$content = this.$el.querySelector(".atk-layer-dialog-content"), this.$content.appendChild(e2);
      }
      setYes(e2) {
        const t2 = wt(`<button data-action="confirm">${Ot("confirm")}</button>`);
        return t2.onclick = this.onBtnClick(e2), this.$actions.appendChild(t2), this;
      }
      setNo(e2) {
        const t2 = wt(`<button data-action="cancel">${Ot("cancel")}</button>`);
        return t2.onclick = this.onBtnClick(e2), this.$actions.appendChild(t2), this;
      }
      onBtnClick(e2) {
        return (t2) => {
          const n2 = e2(t2.currentTarget, this);
          void 0 !== n2 && true !== n2 || this.$el.remove();
        };
      }
    }
    function en(e2) {
      return (t2) => new Promise(((n2, s2) => {
        const i2 = t2.onCancel;
        t2.onCancel = () => {
          i2 && i2(), s2(new Error("user canceled the checker"));
        };
        const r2 = t2.onSuccess;
        t2.onSuccess = () => {
          r2 && r2(), n2();
        }, e2(t2);
      }));
    }
    class tn {
      constructor(e2) {
        d(this, "checkCaptcha", en(((e3) => {
          this.fire(Yt, e3, ((t2) => {
            t2.set("img_data", e3.img_data), t2.set("iframe", e3.iframe);
          }));
        }))), d(this, "checkAdmin", en(((e3) => {
          this.fire(Xt, e3);
        }))), this.opts = e2;
      }
      fire(e2, t2, n2) {
        const s2 = this.opts.getCtx().get("layerManager").create(`checker-${(/* @__PURE__ */ new Date()).getTime()}`);
        s2.show();
        const i2 = () => {
          s2.destroy();
        }, r2 = {};
        let o2 = false;
        const a2 = { set: (e3, t3) => {
          r2[e3] = t3;
        }, get: (e3) => r2[e3], getOpts: () => this.opts, getUser: () => this.opts.getCtx().get("user"), getApi: () => this.opts.getApi(), hideInteractInput: () => {
          o2 = true;
        }, triggerSuccess: () => {
          i2(), e2.onSuccess && e2.onSuccess(a2, "", "", l2), t2.onSuccess && t2.onSuccess();
        }, cancel: () => {
          i2(), t2.onCancel && t2.onCancel();
        } };
        n2 && n2(a2);
        const l2 = wt();
        l2.appendChild(e2.body(a2));
        const c2 = wt(`<input id="check" type="${e2.inputType || "text"}" autocomplete="off" required placeholder="">`);
        let d2;
        l2.appendChild(c2), setTimeout((() => c2.focus()), 80), c2.onkeyup = (e3) => {
          "Enter" !== e3.key && 13 !== e3.keyCode || (e3.preventDefault(), s2.getEl().querySelector('button[data-action="confirm"]').click());
        };
        const h2 = new Jt(l2);
        h2.setYes(((n3) => {
          const s3 = c2.value.trim();
          d2 || (d2 = n3.innerText);
          const r3 = () => {
            n3.innerText = d2 || "", n3.classList.remove("error");
          };
          return n3.innerText = `${Ot("loading")}...`, e2.request(a2, s3).then(((n4) => {
            i2(), e2.onSuccess && e2.onSuccess(a2, n4, s3, l2), t2.onSuccess && t2.onSuccess();
          })).catch(((t3) => {
            var i3;
            i3 = String(t3.message || String(t3)), n3.innerText = i3, n3.classList.add("error"), e2.onError && e2.onError(a2, t3, s3, l2);
            const o3 = setTimeout((() => r3()), 3e3);
            c2.onfocus = () => {
              r3(), clearTimeout(o3);
            };
          })), false;
        })), h2.setNo((() => (i2(), t2.onCancel && t2.onCancel(), false))), o2 && (c2.style.display = "none", h2.$el.querySelector(".atk-layer-dialog-actions").style.display = "none"), s2.getEl().append(h2.$el), t2.onMount && t2.onMount(h2.$el);
      }
    }
    class nn {
      constructor(e2) {
        d(this, "$el"), this.ctx = e2;
      }
      get conf() {
        return this.ctx.conf;
      }
      getEl() {
        return this.$el;
      }
    }
    const sn = { $header: ".atk-header", $name: '.atk-header [name="name"]', $email: '.atk-header [name="email"]', $link: '.atk-header [name="link"]', $textareaWrap: ".atk-textarea-wrap", $textarea: ".atk-textarea", $bottom: ".atk-bottom", $submitBtn: ".atk-send-btn", $notifyWrap: ".atk-notify-wrap", $bottomLeft: ".atk-bottom-left", $stateWrap: ".atk-state-wrap", $plugBtnWrap: ".atk-plug-btn-wrap", $plugPanelWrap: ".atk-plug-panel-wrap" };
    class rn {
      constructor(e2) {
        d(this, "$btn"), d(this, "$panel"), d(this, "editorStateEffectWhen"), this.kit = e2;
      }
      useBtn(e2 = "<div></div>") {
        return this.$btn = wt(`<span class="atk-plug-btn">${e2}</span>`), this.$btn;
      }
      usePanel(e2 = "<div></div>") {
        return this.$panel = wt(e2), this.$panel;
      }
      useContentTransformer(e2) {
        this.contentTransformer = e2;
      }
      usePanelShow(e2) {
        this.kit.useEvents().on("panel-show", ((t2) => {
          t2 === this && e2();
        }));
      }
      usePanelHide(e2) {
        this.kit.useEvents().on("panel-hide", ((t2) => {
          t2 === this && e2();
        }));
      }
      useEditorStateEffect(e2, t2) {
        this.editorStateEffectWhen = e2, this.editorStateEffect = t2;
      }
    }
    class on extends rn {
      constructor() {
        super(...arguments), d(this, "isMoved", false);
      }
      move(e2) {
        if (this.isMoved) return;
        this.isMoved = true;
        const t2 = this.kit.useUI().$el;
        t2.after(wt('<div class="atk-editor-travel-placeholder"></div>'));
        const n2 = wt("<div></div>");
        e2.after(n2), n2.replaceWith(t2), t2.classList.add("atk-fade-in"), t2.classList.add("editor-traveling");
      }
      back() {
        var e2;
        this.isMoved && (this.isMoved = false, null == (e2 = this.kit.useGlobalCtx().$root.querySelector(".atk-editor-travel-placeholder")) || e2.replaceWith(this.kit.useUI().$el), this.kit.useUI().$el.classList.remove("editor-traveling"));
      }
    }
    class an {
      constructor(e2) {
        d(this, "stateCurt", "normal"), d(this, "stateUnmountFn", null), this.editor = e2;
      }
      get() {
        return this.stateCurt;
      }
      switch(e2, t2) {
        var n2, s2, i2, r2, o2;
        if (this.stateUnmountFn && (this.stateUnmountFn(), this.stateUnmountFn = null, null == (s2 = null == (n2 = this.editor.getPlugs()) ? void 0 : n2.get(on)) || s2.back()), "normal" !== e2 && t2) {
          let n3 = t2.$comment;
          this.editor.conf.flatMode || (n3 = n3.querySelector(".atk-footer")), null == (r2 = null == (i2 = this.editor.getPlugs()) ? void 0 : i2.get(on)) || r2.move(n3);
          const s3 = this.editor.ctx.conf.scrollRelativeTo && this.editor.ctx.conf.scrollRelativeTo();
          Vt(this.editor.getUI().$el, true, s3);
          const a2 = null == (o2 = this.editor.getPlugs()) ? void 0 : o2.getPlugs().find(((t3) => t3.editorStateEffectWhen === e2));
          a2 && a2.editorStateEffect && (this.stateUnmountFn = a2.editorStateEffect(t2.comment));
        }
        this.stateCurt = e2;
      }
    }
    class ln extends nn {
      constructor(e2) {
        super(e2), d(this, "ui"), d(this, "state"), this.ui = (function() {
          const e3 = wt('<div class="atk-main-editor">\n  <div class="atk-header">\n    <input name="name" class="atk-name" type="text" required="required" />\n    <input name="email" class="atk-email" type="email" required="required" />\n    <input name="link" class="atk-link" type="url" />\n  </div>\n  <div class="atk-textarea-wrap">\n    <textarea class="atk-textarea"></textarea>\n  </div>\n  <div class="atk-plug-panel-wrap" style="display: none"></div>\n  <div class="atk-bottom">\n    <div class="atk-item atk-bottom-left">\n      <span class="atk-state-wrap"></span>\n      <span class="atk-plug-btn-wrap"></span>\n    </div>\n    <div class="atk-item">\n      <button type="button" class="atk-send-btn"></button>\n    </div>\n  </div>\n  <div class="atk-notify-wrap"></div>\n</div>\n'), t2 = { $el: e3 };
          return Object.entries(sn).forEach((([n2, s2]) => {
            t2[n2] = e3.querySelector(s2);
          })), t2;
        })(), this.$el = this.ui.$el, this.state = new an(this);
      }
      getUI() {
        return this.ui;
      }
      getPlugs() {
        return this.ctx.get("editorPlugs");
      }
      getState() {
        return this.state.get();
      }
      getHeaderInputEls() {
        return { name: this.ui.$name, email: this.ui.$email, link: this.ui.$link };
      }
      getContentFinal() {
        let e2 = this.getContentRaw();
        const t2 = this.getPlugs();
        return t2 && (e2 = t2.getTransformedContent(e2)), e2;
      }
      getContentRaw() {
        return this.ui.$textarea.value || "";
      }
      getContentMarked() {
        return yt(this.getContentFinal());
      }
      setContent(e2) {
        var t2;
        this.ui.$textarea.value = e2, null == (t2 = this.getPlugs()) || t2.getEvents().trigger("content-updated", e2);
      }
      insertContent(e2) {
        if (document.selection) this.ui.$textarea.focus(), document.selection.createRange().text = e2, this.ui.$textarea.focus();
        else if (this.ui.$textarea.selectionStart || 0 === this.ui.$textarea.selectionStart) {
          const t2 = this.ui.$textarea.selectionStart, n2 = this.ui.$textarea.selectionEnd, s2 = this.ui.$textarea.scrollTop;
          this.setContent(this.ui.$textarea.value.substring(0, t2) + e2 + this.ui.$textarea.value.substring(n2, this.ui.$textarea.value.length)), this.ui.$textarea.focus(), this.ui.$textarea.selectionStart = t2 + e2.length, this.ui.$textarea.selectionEnd = t2 + e2.length, this.ui.$textarea.scrollTop = s2;
        } else this.ui.$textarea.focus(), this.ui.$textarea.value += e2;
      }
      focus() {
        this.ui.$textarea.focus();
      }
      reset() {
        this.setContent(""), this.resetState();
      }
      resetState() {
        this.state.switch("normal");
      }
      setReply(e2, t2) {
        this.state.switch("reply", { comment: e2, $comment: t2 });
      }
      setEditComment(e2, t2) {
        this.state.switch("edit", { comment: e2, $comment: t2 });
      }
      showNotify(e2, t2) {
        !(function(e3, t3, n2) {
          const s2 = wt(`<div class="atk-notify atk-fade-in" style="background-color: ${{ s: "#57d59f", e: "#ff6f6c", w: "#ffc721", i: "#2ebcfc" }[n2]}"><span class="atk-notify-content"></span></div>`);
          s2.querySelector(".atk-notify-content").innerHTML = bt(t3).replace("\n", "<br/>"), e3.appendChild(s2);
          const i2 = () => {
            s2.classList.add("atk-fade-out"), setTimeout((() => {
              s2.remove();
            }), 200);
          };
          let r2;
          r2 = window.setTimeout((() => {
            i2();
          }), 3e3), s2.addEventListener("click", (() => {
            i2(), window.clearTimeout(r2);
          }));
        })(this.ui.$notifyWrap, e2, t2);
      }
      showLoading() {
        Nt(this.ui.$el);
      }
      hideLoading() {
        Ht(this.ui.$el);
      }
      submit() {
        const e2 = () => this.ctx.trigger("editor-submit");
        this.ctx.conf.beforeSubmit ? this.ctx.conf.beforeSubmit(this, e2) : e2();
      }
    }
    class cn extends nn {
      constructor(e2) {
        super(e2), d(this, "layer"), d(this, "$header"), d(this, "$closeBtn"), d(this, "$iframeWrap"), d(this, "$iframe"), d(this, "refreshWhenShow", true), d(this, "animTimer"), this.$el = wt('<div class="atk-sidebar-layer">\n  <div class="atk-sidebar-inner">\n    <div class="atk-sidebar-header">\n      <div class="atk-sidebar-close">\n        <i class="atk-icon atk-icon-close-slim"></i>\n      </div>\n    </div>\n    <div class="atk-sidebar-iframe-wrap"></div>\n  </div>\n</div>\n'), this.$header = this.$el.querySelector(".atk-sidebar-header"), this.$closeBtn = this.$header.querySelector(".atk-sidebar-close"), this.$iframeWrap = this.$el.querySelector(".atk-sidebar-iframe-wrap"), this.$closeBtn.onclick = () => {
          this.hide();
        }, this.ctx.on("user-changed", (() => {
          this.refreshWhenShow = true;
        }));
      }
      show() {
        return h(this, arguments, (function* (e2 = {}) {
          if (this.$el.style.transform = "", this.initLayer(), this.layer.show(), this.refreshWhenShow) this.refreshWhenShow = false, this.$iframeWrap.innerHTML = "", this.$iframe = this.createIframe(e2.view), this.$iframeWrap.append(this.$iframe);
          else {
            const e3 = this.$iframe, t2 = e3.src;
            this.getDarkMode() !== t2.includes("&darkMode=1") && this.iframeLoad(e3, t2.replace(/&darkMode=\d/, `&darkMode=${Number(this.getDarkMode())}`));
          }
          this.authCheck({ onSuccess: () => this.show(e2) }), this.animTimer = setTimeout((() => {
            this.animTimer = void 0, this.$el.style.transform = "translate(0, 0)", setTimeout((() => {
              this.ctx.getData().updateNotifies([]);
            }), 0), this.ctx.trigger("sidebar-show");
          }), 100);
        }));
      }
      hide() {
        var e2;
        null == (e2 = this.layer) || e2.hide();
      }
      authCheck(e2) {
        return h(this, null, (function* () {
          const t2 = (yield this.ctx.getApi().user.getUserStatus(l({}, this.ctx.getApi().getUserFields()))).data;
          t2.is_admin && !t2.is_login && (this.refreshWhenShow = true, this.ctx.checkAdmin({ onSuccess: () => {
            setTimeout((() => {
              e2.onSuccess();
            }), 500);
          }, onCancel: () => {
            this.hide();
          } }), this.hide());
        }));
      }
      initLayer() {
        this.layer || (this.layer = this.ctx.get("layerManager").create("sidebar", this.$el), this.layer.setOnAfterHide((() => {
          this.ctx.editorResetState(), this.animTimer && clearTimeout(this.animTimer), this.$el.style.transform = "", this.ctx.trigger("sidebar-hide");
        })));
      }
      createIframe(e2) {
        const t2 = wt('<iframe referrerpolicy="strict-origin-when-cross-origin"></iframe>'), n2 = Lt({ base: this.ctx.conf.server, path: "/sidebar/" }), s2 = { pageKey: this.conf.pageKey, site: this.conf.site || "", user: JSON.stringify(this.ctx.get("user").getData()), time: +/* @__PURE__ */ new Date() };
        e2 && (s2.view = e2), s2.darkMode = this.getDarkMode() ? "1" : "0";
        const i2 = new URLSearchParams(s2);
        return this.iframeLoad(t2, `${n2}?${i2.toString()}`), t2;
      }
      getDarkMode() {
        return "auto" === this.conf.darkMode ? window.matchMedia("(prefers-color-scheme: dark)").matches : this.conf.darkMode;
      }
      iframeLoad(e2, t2) {
        e2.src = t2, Nt(this.$iframeWrap), e2.onload = () => {
          Ht(this.$iframeWrap);
        };
      }
    }
    const dn = (e2) => ({ import: (t2) => {
      (function(e3, t3 = "DATE_DESC", n2 = 2) {
        const s2 = [];
        e3.filter(((e4) => 0 === e4.rid)).forEach(((t4) => {
          const i3 = { id: t4.id, comment: t4, children: [], level: 1 };
          i3.parent = i3, s2.push(i3), (function t5(s3) {
            const i4 = e3.filter(((e4) => e4.rid === s3.id));
            0 !== i4.length && (s3.level >= n2 && (s3 = s3.parent), i4.forEach(((e4) => {
              const n3 = { id: e4.id, comment: e4, children: [], parent: s3, level: s3.level + 1 };
              s3.children.push(n3), t5(n3);
            })));
          })(i3);
        }));
        const i2 = (n3, s3) => {
          let i3 = n3.id - s3.id;
          return "DATE_ASC" === t3 ? i3 = +new Date(n3.comment.date) - +new Date(s3.comment.date) : "DATE_DESC" === t3 ? i3 = +new Date(s3.comment.date) - +new Date(n3.comment.date) : "SRC_INDEX" === t3 ? i3 = e3.indexOf(n3.comment) - e3.indexOf(s3.comment) : "VOTE_UP_DESC" === t3 && (i3 = s3.comment.vote_up - n3.comment.vote_up), i3;
        };
        return (function e4(t4) {
          t4.forEach(((t5) => {
            t5.children = t5.children.sort(i2), e4(t5.children);
          }));
        })(s2), s2;
      })(t2, e2.nestSortBy, e2.nestMax).forEach(((n2) => {
        var s2;
        const i2 = e2.createCommentNode(n2.comment);
        null == (s2 = e2.$commentsWrap) || s2.appendChild(i2.getEl()), i2.getRender().playFadeAnim();
        const r2 = (n3, s3) => {
          s3.children.forEach(((s4) => {
            const i3 = t2.find(((e3) => e3.id === s4.comment.rid)), o2 = s4.comment, a2 = e2.createCommentNode(o2, i3);
            n3.putChild(a2), r2(a2, s4);
          }));
        };
        r2(i2, n2), i2.getRender().checkHeightLimit();
      }));
    }, insert: (t2, n2) => {
      var s2;
      const i2 = e2.createCommentNode(t2, n2);
      if (0 === t2.rid) null == (s2 = e2.$commentsWrap) || s2.prepend(i2.getEl());
      else {
        const n3 = e2.findCommentNode(t2.rid);
        n3 && (n3.putChild(i2, "DATE_ASC" === e2.nestSortBy ? "append" : "prepend"), i2.getParents().forEach(((e3) => {
          e3.getRender().heightLimitRemoveForChildren();
        })));
      }
      i2.getRender().checkHeightLimit(), i2.scrollIntoView(), i2.getRender().playFadeAnim();
    } });
    function hn(e2, t2, n2, s2) {
      n2.is_collapsed && (n2.is_allow_reply = false);
      const i2 = e2.createCommentNode(n2, s2);
      if (n2.visible) {
        const n3 = i2.getEl(), s3 = e2.$commentsWrap;
        "append" === t2 && (null == s3 || s3.append(n3)), "prepend" === t2 && (null == s3 || s3.prepend(n3)), i2.getRender().playFadeAnim();
      }
      return i2.getRender().checkHeightLimit(), i2;
    }
    class un {
      constructor(e2) {
        this.options = e2;
      }
      getStrategy() {
        return this.options.flatMode ? (e2 = this.options, { import: (t2) => {
          t2.forEach(((n2) => {
            const s2 = 0 === n2.rid ? void 0 : t2.find(((e3) => e3.id === n2.rid));
            hn(e2, "append", n2, s2);
          }));
        }, insert: (t2, n2) => {
          hn(e2, "prepend", t2, n2).scrollIntoView();
        } }) : dn(this.options);
        var e2;
      }
      import(e2) {
        this.getStrategy().import(e2);
      }
      insert(e2, t2) {
        this.getStrategy().insert(e2, t2);
      }
    }
    function pn(e2, t2) {
      t2.forEach((({ el: t3, max: n2, imgCheck: s2 }) => {
        if (!t3) return;
        s2 && (t3.style.maxHeight = `${n2 + 1}px`);
        let i2 = false;
        const r2 = () => {
          if (i2) return;
          if ((function(e3) {
            return parseFloat(getComputedStyle(e3, null).height.replace("px", "")) || 0;
          })(t3) <= n2) return;
          e2.scrollable ? (function(e3) {
            if (!e3.el) return;
            if (e3.el.classList.contains(fn)) return;
            e3.el.classList.add(fn), e3.el.style.height = `${e3.max}px`;
          })({ el: t3, max: n2 }) : (function(e3) {
            if (!e3.el) return;
            if (!e3.max) return;
            if (e3.el.classList.contains(gn)) return;
            e3.el.classList.add(gn), e3.el.style.height = `${e3.max}px`, e3.el.style.overflow = "hidden";
            const t4 = wt(`<div class="atk-height-limit-btn">${Ot("readMore")}</span>`);
            t4.onclick = (t5) => {
              t5.stopPropagation(), mn(e3.el), e3.afterExpandBtnClick && e3.afterExpandBtnClick(t5);
            }, e3.el.append(t4);
          })({ el: t3, max: n2, afterExpandBtnClick: () => {
            var t4;
            i2 = true, null == (t4 = e2.afterExpandBtnClick) || t4.call(e2);
          } });
        };
        if (r2(), s2) {
          const e3 = t3.querySelectorAll(".atk-content img");
          0 === e3.length && (t3.style.maxHeight = ""), e3.forEach(((e4) => {
            e4.onload = () => r2();
          }));
        }
      }));
    }
    const gn = "atk-height-limit";
    function mn(e2) {
      e2 && e2.classList.contains(gn) && (e2.classList.remove(gn), Array.from(e2.children).forEach(((e3) => {
        e3.classList.contains("atk-height-limit-btn") && e3.remove();
      })), e2.style.height = "", e2.style.maxHeight = "", e2.style.overflow = "");
    }
    const fn = "atk-height-limit-scroll";
    function kn(e2) {
      if (e2.$headerNick = e2.$el.querySelector(".atk-nick"), e2.data.link) {
        const t2 = wt('<a target="_blank" rel="noreferrer noopener nofollow"></a>');
        t2.innerText = e2.data.nick, t2.href = At(e2.data.link) ? e2.data.link : `https://${e2.data.link}`, e2.$headerNick.append(t2);
      } else e2.$headerNick.innerText = e2.data.nick;
    }
    function yn(e2) {
      e2.$headerBadgeWrap = e2.$el.querySelector(".atk-badge-wrap"), e2.$headerBadgeWrap.innerHTML = "";
      const t2 = e2.data.badge_name, n2 = e2.data.badge_color;
      if (t2) {
        const s2 = wt('<span class="atk-badge"></span>');
        s2.innerText = t2.replace("\u7BA1\u7406\u5458", Ot("admin")), s2.style.backgroundColor = n2 || "", e2.$headerBadgeWrap.append(s2);
      } else if (e2.data.is_verified) {
        const t3 = wt(`<span class="atk-verified-icon" title="${Ot("emailVerified")}"></span>`);
        e2.$headerBadgeWrap.append(t3);
      }
      if (e2.data.is_pinned) {
        const t3 = wt(`<span class="atk-pinned-badge">${Ot("pin")}</span>`);
        e2.$headerBadgeWrap.append(t3);
      }
    }
    function $n(e2) {
      const t2 = e2.$el.querySelector(".atk-date");
      t2.innerText = e2.comment.getDateFormatted(), t2.setAttribute("data-atk-comment-date", String(+new Date(e2.data.date)));
    }
    function vn(e2) {
      if (!e2.opts.uaBadge && !e2.data.ip_region) return;
      let t2 = e2.$header.querySelector("atk-ua-wrap");
      if (t2 || (t2 = wt('<span class="atk-ua-wrap"></span>'), e2.$header.append(t2)), t2.innerHTML = "", e2.data.ip_region) {
        const n2 = wt('<span class="atk-region-badge"></span>');
        n2.innerText = e2.data.ip_region, t2.append(n2);
      }
      if (e2.opts.uaBadge) {
        const { browser: n2, os: s2 } = e2.comment.getUserUA();
        if (String(n2).trim()) {
          const e3 = wt('<span class="atk-ua ua-browser"></span>');
          e3.innerText = n2, t2.append(e3);
        }
        if (String(s2).trim()) {
          const e3 = wt('<span class="atk-ua ua-os"></span>');
          e3.innerText = s2, t2.append(e3);
        }
      }
    }
    class wn {
      constructor(e2) {
        d(this, "opts"), d(this, "$el"), d(this, "isLoading", false), d(this, "msgRecTimer"), d(this, "msgRecTimerFunc"), d(this, "isConfirming", false), d(this, "confirmRecTimer"), this.$el = wt('<span class="atk-common-action-btn"></span>'), this.opts = "object" != typeof e2 ? { text: e2 } : e2, this.$el.innerText = this.getText(), this.opts.adminOnly && this.$el.setAttribute("atk-only-admin-show", "");
      }
      get isMessaging() {
        return !!this.msgRecTimer;
      }
      appendTo(e2) {
        return e2.append(this.$el), this;
      }
      getText() {
        return "string" == typeof this.opts.text ? this.opts.text : this.opts.text();
      }
      setClick(e2) {
        this.$el.onclick = (t2) => {
          if (t2.stopPropagation(), !this.isLoading) {
            if (this.opts.confirm && !this.isMessaging) {
              const e3 = () => {
                this.isConfirming = false, this.$el.classList.remove("atk-btn-confirm"), this.$el.innerText = this.getText();
              };
              if (!this.isConfirming) return this.isConfirming = true, this.$el.classList.add("atk-btn-confirm"), this.$el.innerText = this.opts.confirmText || Ot("actionConfirm"), void (this.confirmRecTimer = window.setTimeout((() => e3()), 5e3));
              this.confirmRecTimer && window.clearTimeout(this.confirmRecTimer), e3();
            }
            if (this.msgRecTimer) return this.fireMsgRecTimer(), void this.clearMsgRecTimer();
            e2();
          }
        };
      }
      updateText(e2) {
        e2 && (this.opts.text = e2), this.setLoading(false), this.$el.innerText = this.getText();
      }
      setLoading(e2, t2) {
        this.isLoading !== e2 && (this.isLoading = e2, e2 ? (this.$el.classList.add("atk-btn-loading"), this.$el.innerText = t2 || `${Ot("loading")}...`) : (this.$el.classList.remove("atk-btn-loading"), this.$el.innerText = this.getText()));
      }
      setError(e2) {
        this.setMsg(e2, "atk-btn-error");
      }
      setWarn(e2) {
        this.setMsg(e2, "atk-btn-warn");
      }
      setSuccess(e2) {
        this.setMsg(e2, "atk-btn-success");
      }
      setMsg(e2, t2, n2, s2) {
        this.setLoading(false), t2 && this.$el.classList.add(t2), this.$el.innerText = e2, this.setMsgRecTimer((() => {
          this.$el.innerText = this.getText(), t2 && this.$el.classList.remove(t2), s2 && s2();
        }), n2 || 2500);
      }
      setMsgRecTimer(e2, t2) {
        this.fireMsgRecTimer(), this.clearMsgRecTimer(), this.msgRecTimerFunc = e2, this.msgRecTimer = window.setTimeout((() => {
          e2(), this.clearMsgRecTimer();
        }), t2);
      }
      fireMsgRecTimer() {
        this.msgRecTimerFunc && this.msgRecTimerFunc();
      }
      clearMsgRecTimer() {
        this.msgRecTimer && window.clearTimeout(this.msgRecTimer), this.msgRecTimer = void 0, this.msgRecTimerFunc = void 0;
      }
    }
    function bn(e2) {
      e2.opts.vote && (e2.voteBtnUp = new wn((() => `${Ot("voteUp")} (${e2.data.vote_up || 0})`)).appendTo(e2.$actions), e2.voteBtnUp.setClick((() => {
        e2.comment.getActions().vote("up");
      })), e2.opts.voteDown && (e2.voteBtnDown = new wn((() => `${Ot("voteDown")} (${e2.data.vote_down || 0})`)).appendTo(e2.$actions), e2.voteBtnDown.setClick((() => {
        e2.comment.getActions().vote("down");
      }))));
    }
    function xn(e2) {
      if (!e2.data.is_allow_reply) return;
      const t2 = wt(`<span>${Ot("reply")}</span>`);
      e2.$actions.append(t2), t2.addEventListener("click", ((t3) => {
        t3.stopPropagation(), e2.opts.replyComment(e2.data, e2.$el);
      }));
    }
    function Cn(e2) {
      const t2 = new wn({ text: () => e2.data.is_collapsed ? Ot("expand") : Ot("collapse"), adminOnly: true });
      t2.appendTo(e2.$actions), t2.setClick((() => {
        e2.comment.getActions().adminEdit("collapsed", t2);
      }));
    }
    function En(e2) {
      const t2 = new wn({ text: () => e2.data.is_pending ? Ot("pending") : Ot("approved"), adminOnly: true });
      t2.appendTo(e2.$actions), t2.setClick((() => {
        e2.comment.getActions().adminEdit("pending", t2);
      }));
    }
    function Sn(e2) {
      const t2 = new wn({ text: () => e2.data.is_pinned ? Ot("unpin") : Ot("pin"), adminOnly: true });
      t2.appendTo(e2.$actions), t2.setClick((() => {
        e2.comment.getActions().adminEdit("pinned", t2);
      }));
    }
    function Tn(e2) {
      const t2 = new wn({ text: Ot("edit"), adminOnly: true });
      t2.appendTo(e2.$actions), t2.setClick((() => {
        e2.opts.editComment(e2.data, e2.$el);
      }));
    }
    function An(e2) {
      const t2 = new wn({ text: Ot("delete"), confirm: true, confirmText: Ot("deleteConfirm"), adminOnly: true });
      t2.appendTo(e2.$actions), t2.setClick((() => {
        e2.comment.getActions().adminDelete(t2);
      }));
    }
    const Ln = { Avatar: function(e2) {
      const t2 = e2.$el.querySelector(".atk-avatar"), n2 = wt("<img />"), s2 = e2.opts.avatarURLBuilder;
      if (n2.src = s2 ? s2(e2.data) : e2.comment.getGravatarURL(), e2.data.link) {
        const s3 = wt('<a target="_blank" rel="noreferrer noopener nofollow"></a>');
        s3.href = At(e2.data.link) ? e2.data.link : `https://${e2.data.link}`, s3.append(n2), t2.append(s3);
      } else t2.append(n2);
    }, Header: function(e2) {
      Object.entries({ renderNick: kn, renderVerifyBadge: yn, renderDate: $n, renderUABadge: vn }).forEach((([t2, n2]) => {
        n2(e2);
      }));
    }, Content: function(e2) {
      if (!e2.data.is_collapsed) return e2.$content.innerHTML = e2.comment.getContentMarked(), void e2.$content.classList.remove("atk-hide", "atk-collapsed");
      e2.$content.classList.add("atk-hide", "atk-type-collapsed");
      const t2 = wt(`
    <div class="atk-collapsed">
      <span class="atk-text">${Ot("collapsedMsg")}</span>
      <span class="atk-show-btn">${Ot("expand")}</span>
    </div>`);
      e2.$body.insertAdjacentElement("beforeend", t2);
      const n2 = t2.querySelector(".atk-show-btn");
      n2.addEventListener("click", ((t3) => {
        t3.stopPropagation(), e2.$content.classList.contains("atk-hide") ? (e2.$content.innerHTML = e2.comment.getContentMarked(), e2.$content.classList.remove("atk-hide"), Gt(e2.$content), n2.innerText = Ot("collapse")) : (e2.$content.innerHTML = "", e2.$content.classList.add("atk-hide"), n2.innerText = Ot("expand"));
      }));
    }, ReplyAt: function(e2) {
      e2.opts.flatMode || 0 === e2.data.rid || e2.opts.replyTo && (e2.$replyAt = wt('<span class="atk-item atk-reply-at"><span class="atk-arrow"></span><span class="atk-nick"></span></span>'), e2.$replyAt.querySelector(".atk-nick").innerText = `${e2.opts.replyTo.nick}`, e2.$replyAt.onclick = () => {
        e2.comment.getActions().goToReplyComment();
      }, e2.$headerBadgeWrap.insertAdjacentElement("afterend", e2.$replyAt));
    }, ReplyTo: function(e2) {
      if (!e2.opts.flatMode) return;
      if (!e2.opts.replyTo) return;
      e2.$replyTo = wt(`
    <div class="atk-reply-to">
      <div class="atk-meta">${Ot("reply")} <span class="atk-nick"></span>:</div>
      <div class="atk-content"></div>
    </div>`);
      const t2 = e2.$replyTo.querySelector(".atk-nick");
      t2.innerText = `@${e2.opts.replyTo.nick}`, t2.onclick = () => {
        e2.comment.getActions().goToReplyComment();
      };
      let n2 = yt(e2.opts.replyTo.content);
      e2.opts.replyTo.is_collapsed && (n2 = `[${Ot("collapsed")}]`), e2.$replyTo.querySelector(".atk-content").innerHTML = n2, e2.$body.prepend(e2.$replyTo);
    }, Pending: function(e2) {
      if (!e2.data.is_pending) return;
      const t2 = wt(`<div class="atk-pending">${Ot("pendingMsg")}</div>`);
      e2.$body.prepend(t2);
    }, Actions: function(e2) {
      Object.entries({ renderVote: bn, renderReply: xn, renderCollapse: Cn, renderModerator: En, renderPin: Sn, renderEdit: Tn, renderDel: An }).forEach((([t2, n2]) => {
        n2(e2);
      }));
    } };
    class Mn {
      constructor(e2) {
        d(this, "comment"), d(this, "$el"), d(this, "$main"), d(this, "$header"), d(this, "$headerNick"), d(this, "$headerBadgeWrap"), d(this, "$body"), d(this, "$content"), d(this, "$childrenWrap"), d(this, "$actions"), d(this, "voteBtnUp"), d(this, "voteBtnDown"), d(this, "$replyTo"), d(this, "$replyAt"), this.comment = e2;
      }
      get data() {
        return this.comment.getData();
      }
      get opts() {
        return this.comment.getOpts();
      }
      render() {
        var e2;
        return this.$el = wt('<div class="atk-comment-wrap">\n  <div class="atk-comment">\n    <div class="atk-avatar"></div>\n    <div class="atk-main">\n      <div class="atk-header">\n        <span class="atk-item atk-nick"></span>\n        <span class="atk-badge-wrap"></span>\n        <span class="atk-item atk-date"></span>\n      </div>\n      <div class="atk-body">\n        <div class="atk-content"></div>\n      </div>\n      <div class="atk-footer">\n        <div class="atk-actions"></div>\n      </div>\n    </div>\n  </div>\n</div>\n'), this.$main = this.$el.querySelector(".atk-main"), this.$header = this.$el.querySelector(".atk-header"), this.$body = this.$el.querySelector(".atk-body"), this.$content = this.$body.querySelector(".atk-content"), this.$actions = this.$el.querySelector(".atk-actions"), this.$el.setAttribute("id", `atk-comment-${this.data.id}`), e2 = this, Object.entries(Ln).forEach((([t2, n2]) => {
          n2(e2);
        })), this.$childrenWrap && this.$main.append(this.$childrenWrap), this.$el;
      }
      checkHeightLimit() {
        const e2 = this.opts.heightLimit;
        if (!e2 || !e2.content || !e2.children) return;
        const t2 = e2.content, n2 = e2.children;
        pn({ afterExpandBtnClick: () => {
          const e3 = this.comment.getChildren();
          1 === e3.length && mn(e3[0].getRender().$content);
        }, scrollable: e2.scrollable }, [{ el: this.$content, max: t2, imgCheck: true }, { el: this.$replyTo, max: t2, imgCheck: true }, { el: this.$childrenWrap, max: n2, imgCheck: false }]);
      }
      heightLimitRemoveForChildren() {
        this.$childrenWrap && mn(this.$childrenWrap);
      }
      playFadeAnim() {
        Gt(this.comment.getRender().$el);
      }
      playFadeAnimForBody() {
        Gt(this.comment.getRender().$body);
      }
      playFlashAnim() {
        this.$el.classList.remove("atk-flash-once"), window.setTimeout((() => {
          this.$el.classList.add("atk-flash-once");
        }), 150);
      }
      getChildrenWrap() {
        return this.$childrenWrap || (this.$childrenWrap = wt('<div class="atk-comment-children"></div>'), this.$main.append(this.$childrenWrap)), this.$childrenWrap;
      }
      setUnread(e2) {
        e2 ? this.$el.classList.add("atk-unread") : this.$el.classList.remove("atk-unread");
      }
      setOpenable(e2) {
        e2 ? this.$el.classList.add("atk-openable") : this.$el.classList.remove("atk-openable");
      }
      setOpenURL(e2) {
        this.setOpenable(true), this.$el.onclick = (t2) => {
          t2.stopPropagation(), window.open(e2);
        };
      }
      setOpenAction(e2) {
        this.setOpenable(true), this.$el.onclick = (t2) => {
          t2.stopPropagation(), e2();
        };
      }
    }
    class Pn {
      constructor(e2) {
        d(this, "comment"), this.comment = e2;
      }
      get data() {
        return this.comment.getData();
      }
      get opts() {
        return this.comment.getOpts();
      }
      getApi() {
        return this.comment.getOpts().getApi();
      }
      vote(e2) {
        const t2 = "up" === e2 ? this.comment.getRender().voteBtnUp : this.comment.getRender().voteBtnDown;
        this.getApi().votes.vote(`comment_${e2}`, this.data.id, l({}, this.getApi().getUserFields())).then(((e3) => {
          var t3, n2;
          this.data.vote_up = e3.data.up, this.data.vote_down = e3.data.down, null == (t3 = this.comment.getRender().voteBtnUp) || t3.updateText(), null == (n2 = this.comment.getRender().voteBtnDown) || n2.updateText();
        })).catch(((e3) => {
          null == t2 || t2.setError(Ot("voteFail")), console.error(e3);
        }));
      }
      adminEdit(e2, t2) {
        if (t2.isLoading) return;
        t2.setLoading(true, `${Ot("editing")}...`);
        const n2 = l({}, this.data);
        "collapsed" === e2 ? n2.is_collapsed = !n2.is_collapsed : "pending" === e2 ? n2.is_pending = !n2.is_pending : "pinned" === e2 && (n2.is_pinned = !n2.is_pinned), this.getApi().comments.updateComment(this.data.id, l({}, n2)).then(((e3) => {
          t2.setLoading(false), this.comment.setData(e3.data);
        })).catch(((e3) => {
          console.error(e3), t2.setError(Ot("editFail"));
        }));
      }
      adminDelete(e2) {
        e2.isLoading || (e2.setLoading(true, `${Ot("deleting")}...`), this.getApi().comments.deleteComment(this.data.id).then((() => {
          e2.setLoading(false), this.opts.onDelete && this.opts.onDelete(this.comment);
        })).catch(((t2) => {
          console.error(t2), e2.setError(Ot("deleteFail"));
        })));
      }
      goToReplyComment() {
        const e2 = window.location.hash, t2 = `#atk-comment-${this.data.rid}`;
        window.location.hash = t2, t2 === e2 && window.dispatchEvent(new Event("hashchange"));
      }
    }
    class In {
      constructor(e2, t2) {
        d(this, "$el"), d(this, "renderInstance"), d(this, "actionInstance"), d(this, "data"), d(this, "opts"), d(this, "parent"), d(this, "children", []), d(this, "nestCurt"), this.opts = t2, this.data = l({}, e2), this.data.date = this.data.date.replace(/-/g, "/"), this.parent = null, this.nestCurt = 1, this.actionInstance = new Pn(this), this.renderInstance = new Mn(this);
      }
      render() {
        const e2 = this.renderInstance.render();
        this.$el && this.$el.replaceWith(e2), this.$el = e2, this.opts.onAfterRender && this.opts.onAfterRender();
      }
      getActions() {
        return this.actionInstance;
      }
      getRender() {
        return this.renderInstance;
      }
      getData() {
        return this.data;
      }
      setData(e2) {
        this.data = e2, this.render(), this.getRender().playFadeAnimForBody();
      }
      getParent() {
        return this.parent;
      }
      getChildren() {
        return this.children;
      }
      getNestCurt() {
        return this.nestCurt;
      }
      getIsRoot() {
        return 0 === this.data.rid;
      }
      getID() {
        return this.data.id;
      }
      putChild(e2, t2 = "append") {
        e2.parent = this, e2.nestCurt = this.nestCurt + 1, this.children.push(e2);
        const n2 = this.getChildrenWrapEl(), s2 = e2.getEl();
        "append" === t2 ? n2.append(s2) : "prepend" === t2 && n2.prepend(s2), e2.getRender().playFadeAnim(), e2.getRender().checkHeightLimit();
      }
      getChildrenWrapEl() {
        return this.nestCurt >= this.opts.nestMax ? this.parent.getChildrenWrapEl() : this.getRender().getChildrenWrap();
      }
      getParents() {
        const e2 = [];
        let t2 = this.parent;
        for (; t2; ) e2.push(t2), t2 = t2.getParent();
        return e2;
      }
      getEl() {
        if (!this.$el) throw new Error("comment element not initialized before `getEl()`");
        return this.$el;
      }
      focus() {
        if (!this.$el) throw new Error("comment element not initialized before `focus()`");
        this.getParents().forEach(((e2) => {
          e2.getRender().heightLimitRemoveForChildren();
        })), this.scrollIntoView(), this.getRender().playFlashAnim();
      }
      scrollIntoView() {
        this.$el && Vt(this.$el, false, this.opts.scrollRelativeTo && this.opts.scrollRelativeTo());
      }
      remove() {
        var e2;
        null == (e2 = this.$el) || e2.remove();
      }
      getGravatarURL() {
        return `${(e2 = { mirror: this.opts.gravatar.mirror, params: this.opts.gravatar.params, emailHash: this.data.email_encrypted }).mirror.replace(/\/$/, "")}/${e2.emailHash}?${e2.params.replace(/^\?/, "")}`;
        var e2;
      }
      getContentMarked() {
        return yt(this.data.content);
      }
      getDateFormatted() {
        var e2, t2;
        const n2 = new Date(this.data.date);
        return (null == (t2 = (e2 = this.opts).dateFormatter) ? void 0 : t2.call(e2, n2)) || St(n2, Ot);
      }
      getUserUA() {
        const e2 = (function(e3) {
          const t2 = window || {}, n2 = navigator || {}, s2 = String(e3 || n2.userAgent), i2 = { os: "", osVersion: "", engine: "", browser: "", device: "", language: "", version: "" }, r2 = { Trident: s2.includes("Trident") || s2.includes("NET CLR"), Presto: s2.includes("Presto"), WebKit: s2.includes("AppleWebKit"), Gecko: s2.includes("Gecko/") }, o2 = { Safari: s2.includes("Safari"), Chrome: s2.includes("Chrome") || s2.includes("CriOS"), IE: s2.includes("MSIE") || s2.includes("Trident"), Edge: s2.includes("Edge") || s2.includes("Edg"), Firefox: s2.includes("Firefox") || s2.includes("FxiOS"), "Firefox Focus": s2.includes("Focus"), Chromium: s2.includes("Chromium"), Opera: s2.includes("Opera") || s2.includes("OPR"), Vivaldi: s2.includes("Vivaldi"), Yandex: s2.includes("YaBrowser"), Kindle: s2.includes("Kindle") || s2.includes("Silk/"), 360: s2.includes("360EE") || s2.includes("360SE"), UC: s2.includes("UC") || s2.includes(" UBrowser"), QQBrowser: s2.includes("QQBrowser"), QQ: s2.includes("QQ/"), Baidu: s2.includes("Baidu") || s2.includes("BIDUBrowser"), Maxthon: s2.includes("Maxthon"), Sogou: s2.includes("MetaSr") || s2.includes("Sogou"), LBBROWSER: s2.includes("LBBROWSER"), "2345Explorer": s2.includes("2345Explorer"), TheWorld: s2.includes("TheWorld"), MIUI: s2.includes("MiuiBrowser"), Quark: s2.includes("Quark"), Qiyu: s2.includes("Qiyu"), Wechat: s2.includes("MicroMessenger"), Taobao: s2.includes("AliApp(TB"), Alipay: s2.includes("AliApp(AP"), Weibo: s2.includes("Weibo"), Douban: s2.includes("com.douban.frodo"), Suning: s2.includes("SNEBUY-APP"), iQiYi: s2.includes("IqiyiApp") }, a2 = { Windows: s2.includes("Windows"), Linux: s2.includes("Linux") || s2.includes("X11"), macOS: s2.includes("Macintosh"), Android: s2.includes("Android") || s2.includes("Adr"), Ubuntu: s2.includes("Ubuntu"), FreeBSD: s2.includes("FreeBSD"), Debian: s2.includes("Debian"), "Windows Phone": s2.includes("IEMobile") || s2.includes("Windows Phone"), BlackBerry: s2.includes("BlackBerry") || s2.includes("RIM"), MeeGo: s2.includes("MeeGo"), Symbian: s2.includes("Symbian"), iOS: s2.includes("like Mac OS X"), "Chrome OS": s2.includes("CrOS"), WebOS: s2.includes("hpwOS") }, l2 = { Mobile: s2.includes("Mobi") || s2.includes("iPh") || s2.includes("480"), Tablet: s2.includes("Tablet") || s2.includes("Pad") || s2.includes("Nexus 7") };
          l2.Mobile ? l2.Mobile = !s2.includes("iPad") : o2.Chrome && s2.includes("Edg") ? (o2.Chrome = false, o2.Edge = true) : t2.showModalDialog && t2.chrome && (o2.Chrome = false, o2[360] = true), i2.device = "PC", i2.language = (() => {
            const e4 = (n2.browserLanguage || n2.language).split("-");
            return e4[1] && (e4[1] = e4[1].toUpperCase()), e4.join("_");
          })();
          const c2 = { engine: r2, browser: o2, os: a2, device: l2 };
          Object.entries(c2).forEach((([e4, t3]) => {
            Object.entries(t3).forEach((([t4, n3]) => {
              true === n3 && (i2[e4] = t4);
            }));
          }));
          const d2 = { Windows: () => {
            const e4 = s2.replace(/^.*Windows NT ([\d.]+);.*$/, "$1");
            return { 6.4: "10", 6.3: "8.1", 6.2: "8", 6.1: "7", "6.0": "Vista", 5.2: "XP", 5.1: "XP", "5.0": "2000", "10.0": "10", "11.0": "11" }[e4] || e4;
          }, Android: () => s2.replace(/^.*Android ([\d.]+);.*$/, "$1"), iOS: () => s2.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, "."), Debian: () => s2.replace(/^.*Debian\/([\d.]+).*$/, "$1"), "Windows Phone": () => s2.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2"), macOS: () => s2.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, "."), WebOS: () => s2.replace(/^.*hpwOS\/([\d.]+);.*$/, "$1") };
          i2.osVersion = "", d2[i2.os] && (i2.osVersion = d2[i2.os](), i2.osVersion === s2 && (i2.osVersion = ""));
          const h2 = { Safari: () => s2.replace(/^.*Version\/([\d.]+).*$/, "$1"), Chrome: () => s2.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1"), IE: () => s2.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1"), Edge: () => s2.replace(/^.*(Edge|Edg|Edg[A-Z]{1})\/([\d.]+).*$/, "$2"), Firefox: () => s2.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1"), "Firefox Focus": () => s2.replace(/^.*Focus\/([\d.]+).*$/, "$1"), Chromium: () => s2.replace(/^.*Chromium\/([\d.]+).*$/, "$1"), Opera: () => s2.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1"), Vivaldi: () => s2.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1"), Yandex: () => s2.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1"), Kindle: () => s2.replace(/^.*Version\/([\d.]+).*$/, "$1"), Maxthon: () => s2.replace(/^.*Maxthon\/([\d.]+).*$/, "$1"), QQBrowser: () => s2.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1"), QQ: () => s2.replace(/^.*QQ\/([\d.]+).*$/, "$1"), Baidu: () => s2.replace(/^.*BIDUBrowser[\s/]([\d.]+).*$/, "$1"), UC: () => s2.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1"), Sogou: () => s2.replace(/^.*SE ([\d.X]+).*$/, "$1").replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1"), "2345Explorer": () => s2.replace(/^.*2345Explorer\/([\d.]+).*$/, "$1"), TheWorld: () => s2.replace(/^.*TheWorld ([\d.]+).*$/, "$1"), MIUI: () => s2.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1"), Quark: () => s2.replace(/^.*Quark\/([\d.]+).*$/, "$1"), Qiyu: () => s2.replace(/^.*Qiyu\/([\d.]+).*$/, "$1"), Wechat: () => s2.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1"), Taobao: () => s2.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1"), Alipay: () => s2.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1"), Weibo: () => s2.replace(/^.*weibo__([\d.]+).*$/, "$1"), Douban: () => s2.replace(/^.*com.douban.frodo\/([\d.]+).*$/, "$1"), Suning: () => s2.replace(/^.*SNEBUY-APP([\d.]+).*$/, "$1"), iQiYi: () => s2.replace(/^.*IqiyiVersion\/([\d.]+).*$/, "$1") };
          return i2.version = "", h2[i2.browser] && (i2.version = h2[i2.browser](), i2.version === s2 && (i2.version = "")), i2.version.indexOf(".") && (i2.version = i2.version.substring(0, i2.version.indexOf("."))), "iOS" === i2.os && s2.includes("iPad") ? i2.os = "iPadOS" : "Edge" !== i2.browser || s2.includes("Edg") ? "MIUI" === i2.browser ? i2.os = "Android" : "Chrome" === i2.browser && Number(i2.version) > 27 || "Opera" === i2.browser && Number(i2.version) > 12 || "Yandex" === i2.browser ? i2.engine = "Blink" : void 0 === i2.browser && (i2.browser = "Unknow App") : i2.engine = "EdgeHTML", i2;
        })(this.data.ua);
        return { browser: `${e2.browser} ${e2.version}`, os: `${e2.os} ${e2.osVersion}` };
      }
      getOpts() {
        return this.opts;
      }
    }
    class Rn {
      constructor(e2) {
        d(this, "opts"), d(this, "$el"), d(this, "$loading"), d(this, "$text"), d(this, "offset", 0), d(this, "total", 0), d(this, "origText", "Load More"), this.opts = e2, this.origText = this.opts.text || this.origText, this.$el = wt(`<div class="atk-list-read-more" style="display: none;">
      <div class="atk-list-read-more-inner">
        <div class="atk-loading-icon" style="display: none;"></div>
        <span class="atk-text">${this.origText}</span>
      </div>
    </div>`), this.$loading = this.$el.querySelector(".atk-loading-icon"), this.$text = this.$el.querySelector(".atk-text"), this.$el.onclick = () => {
          this.click();
        };
      }
      get hasMore() {
        return this.total > this.offset + this.opts.pageSize;
      }
      click() {
        this.hasMore && this.opts.onClick(this.offset + this.opts.pageSize), this.checkDisabled();
      }
      show() {
        this.$el.style.display = "";
      }
      hide() {
        this.$el.style.display = "none";
      }
      setLoading(e2) {
        this.$loading.style.display = e2 ? "" : "none", this.$text.style.display = e2 ? "none" : "";
      }
      showErr(e2) {
        this.setLoading(false), this.$text.innerText = e2, this.$el.classList.add("atk-err"), window.setTimeout((() => {
          this.$text.innerText = this.origText, this.$el.classList.remove("atk-err");
        }), 2e3);
      }
      update(e2, t2) {
        this.offset = e2, this.total = t2, this.checkDisabled();
      }
      checkDisabled() {
        this.hasMore ? this.show() : this.hide();
      }
    }
    class Un {
      constructor() {
        d(this, "instance"), d(this, "onReachedBottom", null), d(this, "opt");
      }
      create(e2) {
        return this.opt = e2, this.instance = new Rn({ pageSize: e2.pageSize, onClick: (t2) => h(this, null, (function* () {
          e2.ctx.fetch({ offset: t2 });
        })), text: Ot("loadMore") }), e2.readMoreAutoLoad && (this.onReachedBottom = () => {
          this.instance.hasMore && !this.opt.ctx.getData().getLoading() && this.instance.click();
        }, this.opt.ctx.on("list-reach-bottom", this.onReachedBottom)), this.instance.$el;
      }
      setLoading(e2) {
        this.instance.setLoading(e2);
      }
      update(e2, t2) {
        this.instance.update(e2, t2);
      }
      showErr(e2) {
        this.instance.showErr(e2);
      }
      next() {
        this.instance.click();
      }
      getHasMore() {
        return this.instance.hasMore;
      }
      getIsClearComments(e2) {
        return 0 === e2.offset;
      }
      dispose() {
        this.onReachedBottom && this.opt.ctx.off("list-reach-bottom", this.onReachedBottom), this.instance.$el.remove();
      }
    }
    class qn {
      constructor(e2, t2) {
        d(this, "opts"), d(this, "total"), d(this, "$el"), d(this, "$input"), d(this, "inputTimer"), d(this, "$prevBtn"), d(this, "$nextBtn"), d(this, "page", 1), this.total = e2, this.opts = t2, this.$el = wt('<div class="atk-pagination-wrap">\n        <div class="atk-pagination">\n          <div class="atk-btn atk-btn-prev" aria-label="Previous page">\n            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>\n          </div>\n          <input type="text" class="atk-input" aria-label="Enter the number of page" />\n          <div class="atk-btn atk-btn-next" aria-label="Next page">\n            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>\n          </div>\n        </div>\n      </div>'), this.$input = this.$el.querySelector(".atk-input"), this.$input.value = `${this.page}`, this.$input.oninput = () => this.input(), this.$input.onkeydown = (e3) => this.keydown(e3), this.$prevBtn = this.$el.querySelector(".atk-btn-prev"), this.$nextBtn = this.$el.querySelector(".atk-btn-next"), this.$prevBtn.onclick = () => this.prev(), this.$nextBtn.onclick = () => this.next(), this.checkDisabled();
      }
      get pageSize() {
        return this.opts.pageSize;
      }
      get offset() {
        return this.pageSize * (this.page - 1);
      }
      get maxPage() {
        return Math.ceil(this.total / this.pageSize);
      }
      update(e2, t2) {
        this.page = Math.ceil(e2 / this.pageSize) + 1, this.total = t2, this.setInput(this.page), this.checkDisabled();
      }
      setInput(e2) {
        this.$input.value = `${e2}`;
      }
      input(e2 = false) {
        window.clearTimeout(this.inputTimer);
        const t2 = this.$input.value.trim(), n2 = () => {
          if ("" === t2) return void this.setInput(this.page);
          let e3 = Number(t2);
          Number.isNaN(e3) || e3 < 1 ? this.setInput(this.page) : (e3 > this.maxPage && (this.setInput(this.maxPage), e3 = this.maxPage), this.change(e3));
        };
        e2 ? n2() : this.inputTimer = window.setTimeout((() => n2()), 800);
      }
      prev() {
        const e2 = this.page - 1;
        e2 < 1 || this.change(e2);
      }
      next() {
        const e2 = this.page + 1;
        e2 > this.maxPage || this.change(e2);
      }
      getHasMore() {
        return this.page + 1 <= this.maxPage;
      }
      change(e2) {
        this.page = e2, this.opts.onChange(this.offset), this.setInput(e2), this.checkDisabled();
      }
      checkDisabled() {
        this.page + 1 > this.maxPage ? this.$nextBtn.classList.add("atk-disabled") : this.$nextBtn.classList.remove("atk-disabled"), this.page - 1 < 1 ? this.$prevBtn.classList.add("atk-disabled") : this.$prevBtn.classList.remove("atk-disabled");
      }
      keydown(e2) {
        const t2 = e2.keyCode || e2.which;
        if (38 === t2) {
          const e3 = Number(this.$input.value) + 1;
          if (e3 > this.maxPage) return;
          this.setInput(e3), this.input();
        } else if (40 === t2) {
          const e3 = Number(this.$input.value) - 1;
          if (e3 < 1) return;
          this.setInput(e3), this.input();
        } else 13 === t2 && this.input(true);
      }
      setLoading(e2) {
        e2 ? Nt(this.$el) : Ht(this.$el);
      }
    }
    class _n {
      constructor() {
        d(this, "instance");
      }
      create(e2) {
        return this.instance = new qn(e2.total, { pageSize: e2.pageSize, onChange: (t2) => h(this, null, (function* () {
          e2.ctx.editorResetState(), e2.ctx.fetch({ offset: t2, onSuccess: () => {
            e2.ctx.listGotoFirst();
          } });
        })) }), this.instance.$el;
      }
      setLoading(e2) {
        this.instance.setLoading(e2);
      }
      update(e2, t2) {
        this.instance.update(e2, t2);
      }
      next() {
        this.instance.next();
      }
      getHasMore() {
        return this.instance.getHasMore();
      }
      getIsClearComments() {
        return true;
      }
      dispose() {
        this.instance.$el.remove();
      }
    }
    function On(e2) {
      const t2 = e2.getData().getListLastFetch(), n2 = { offset: 0, total: 0 };
      return t2 ? (n2.offset = t2.params.offset, t2.data && (n2.total = t2.params.flatMode ? t2.data.count : t2.data.roots_count), n2) : n2;
    }
    const Dn = (e2) => {
      let t2 = null;
      e2.watchConf(["pagination", "locale"], ((n2) => {
        const s2 = e2.get("list");
        t2 && t2.dispose(), t2 = (function(e3) {
          return e3.pagination.readMore ? new Un() : new _n();
        })(n2);
        const { offset: i2, total: r2 } = On(e2), o2 = t2.create({ ctx: e2, pageSize: n2.pagination.pageSize, total: r2, readMoreAutoLoad: n2.pagination.autoLoad });
        s2.$commentsWrap.after(o2), null == t2 || t2.update(i2, r2);
      })), e2.on("list-loaded", ((n2) => {
        const { offset: s2, total: i2 } = On(e2);
        null == t2 || t2.update(s2, i2);
      })), e2.on("list-fetch", ((n2) => {
        e2.getData().getComments().length > 0 && (null == t2 ? void 0 : t2.getIsClearComments(n2)) && e2.getData().clearComments();
      })), e2.on("list-failed", (() => {
        var e3;
        null == (e3 = null == t2 ? void 0 : t2.showErr) || e3.call(t2, Ot("loadFail"));
      })), e2.on("list-fetch", ((e3) => {
        null == t2 || t2.setLoading(true);
      })), e2.on("list-fetched", (({ params: e3 }) => {
        null == t2 || t2.setLoading(false);
      }));
    };
    class Bn extends nn {
      constructor(e2) {
        super(e2), d(this, "$commentsWrap"), d(this, "commentNodes", []), this.$el = wt('<div class="atk-list">\n  <div class="atk-list-header">\n    <div class="atk-comment-count">\n      <div class="atk-text"></div>\n    </div>\n    <div class="atk-right-action">\n      <span data-action="admin-close-comment" class="atk-hide" atk-only-admin-show></span>\n      <span data-action="open-sidebar" class="atk-hide atk-on">\n        <span class="atk-unread-badge" style="display: none"></span>\n        <div class="atk-text"></div>\n      </span>\n    </div>\n  </div>\n  <div class="atk-list-body">\n    <div class="atk-list-comments-wrap"></div>\n  </div>\n  <div class="atk-list-footer">\n    <div class="atk-copyright"></div>\n  </div>\n</div>\n'), this.$commentsWrap = this.$el.querySelector(".atk-list-comments-wrap"), Dn(e2), this.initCrudEvents();
      }
      getCommentsWrapEl() {
        return this.$commentsWrap;
      }
      getCommentNodes() {
        return this.commentNodes;
      }
      getListLayout({ forceFlatMode: e2 } = {}) {
        return new un({ $commentsWrap: this.$commentsWrap, nestSortBy: this.ctx.conf.nestSort, nestMax: this.ctx.conf.nestMax, flatMode: "boolean" == typeof e2 ? e2 : this.ctx.conf.flatMode, createCommentNode: (t2, n2) => {
          const s2 = (function(e3, t3, n3, s3) {
            const i2 = new In(t3, { onAfterRender: () => {
              e3.trigger("comment-rendered", i2);
            }, onDelete: (t4) => {
              e3.getData().deleteComment(t4.getID());
            }, replyTo: n3, flatMode: "boolean" == typeof (null == s3 ? void 0 : s3.forceFlatMode) ? null == s3 ? void 0 : s3.forceFlatMode : e3.conf.flatMode, gravatar: e3.conf.gravatar, nestMax: e3.conf.nestMax, heightLimit: e3.conf.heightLimit, avatarURLBuilder: e3.conf.avatarURLBuilder, scrollRelativeTo: e3.conf.scrollRelativeTo, vote: e3.conf.vote, voteDown: e3.conf.voteDown, uaBadge: e3.conf.uaBadge, dateFormatter: e3.conf.dateFormatter, getApi: () => e3.getApi(), replyComment: (t4, n4) => e3.replyComment(t4, n4), editComment: (t4, n4) => e3.editComment(t4, n4) });
            return i2.render(), i2;
          })(this.ctx, t2, n2, { forceFlatMode: e2 });
          return this.commentNodes.push(s2), s2;
        }, findCommentNode: (e3) => this.commentNodes.find(((t2) => t2.getID() === e3)) });
      }
      initCrudEvents() {
        this.ctx.on("list-load", ((e2) => {
          this.getListLayout().import(e2);
        })), this.ctx.on("list-loaded", ((e2) => {
          0 === e2.length && (this.commentNodes = [], this.$commentsWrap.innerHTML = "");
        })), this.ctx.on("comment-inserted", ((e2) => {
          var t2;
          const n2 = e2.rid ? null == (t2 = this.commentNodes.find(((t3) => t3.getID() === e2.rid))) ? void 0 : t2.getData() : void 0;
          this.getListLayout().insert(e2, n2);
        })), this.ctx.on("comment-deleted", ((e2) => {
          const t2 = this.commentNodes.find(((t3) => t3.getID() === e2.id));
          t2 ? (t2.remove(), this.commentNodes = this.commentNodes.filter(((t3) => t3.getID() !== e2.id))) : console.error(`comment node id=${e2.id} not found`);
        })), this.ctx.on("comment-updated", ((e2) => {
          const t2 = this.commentNodes.find(((t3) => t3.getID() === e2.id));
          t2 && t2.setData(e2);
        }));
      }
    }
    let jn, Fn;
    function Wn() {
      return { init() {
        jn = document.body.style.overflow, Fn = document.body.style.paddingRight;
      }, unlock() {
        document.body.style.overflow = jn, document.body.style.paddingRight = Fn;
      }, lock() {
        document.body.style.overflow = "hidden";
        const e2 = parseInt(window.getComputedStyle(document.body, null).getPropertyValue("padding-right"), 10);
        document.body.style.paddingRight = `${(function() {
          const e3 = document.createElement("p");
          e3.style.width = "100%", e3.style.height = "200px";
          const t2 = document.createElement("div");
          t2.style.position = "absolute", t2.style.top = "0px", t2.style.left = "0px", t2.style.visibility = "hidden", t2.style.width = "200px", t2.style.height = "150px", t2.style.overflow = "hidden", t2.appendChild(e3), document.body.appendChild(t2);
          const n2 = e3.offsetWidth;
          t2.style.overflow = "scroll";
          let s2 = e3.offsetWidth;
          return n2 === s2 && (s2 = t2.clientWidth), document.body.removeChild(t2), n2 - s2;
        })() + e2 || 0}px`;
      } };
    }
    class zn {
      constructor(e2, t2) {
        d(this, "allowMaskClose", true), d(this, "onAfterHide"), this.$el = e2, this.opts = t2;
      }
      setOnAfterHide(e2) {
        this.onAfterHide = e2;
      }
      setAllowMaskClose(e2) {
        this.allowMaskClose = e2;
      }
      getAllowMaskClose() {
        return this.allowMaskClose;
      }
      getEl() {
        return this.$el;
      }
      show() {
        this.opts.onShow(), this.$el.style.display = "";
      }
      hide() {
        this.opts.onHide(), this.$el.style.display = "none", this.onAfterHide && this.onAfterHide();
      }
      destroy() {
        this.opts.onHide(), this.$el.remove(), this.onAfterHide && this.onAfterHide();
      }
    }
    class Nn {
      constructor() {
        d(this, "$wrap"), d(this, "$mask"), d(this, "items", []), this.$wrap = wt('<div class="atk-layer-wrap" style="display: none;"><div class="atk-layer-mask"></div></div>'), this.$mask = this.$wrap.querySelector(".atk-layer-mask");
      }
      createItem(e2, t2) {
        (t2 = t2 || this.createItemElement(e2)).setAttribute("data-layer-name", e2), this.$wrap.appendChild(t2);
        const n2 = new zn(t2, { onHide: () => this.hideWrap(t2), onShow: () => this.showWrap() });
        return this.getMask().addEventListener("click", (() => {
          n2.getAllowMaskClose() && n2.hide();
        })), this.items.push(n2), n2;
      }
      createItemElement(e2) {
        const t2 = document.createElement("div");
        return t2.classList.add("atk-layer-item"), t2.style.display = "none", this.$wrap.appendChild(t2), t2;
      }
      getWrap() {
        return this.$wrap;
      }
      getMask() {
        return this.$mask;
      }
      showWrap() {
        this.$wrap.style.display = "block", this.$mask.style.display = "block", this.$mask.classList.add("atk-fade-in"), Wn().lock();
      }
      hideWrap(e2) {
        this.items.map(((e3) => e3.getEl())).filter(((t2) => t2 !== e2 && t2.isConnected && "none" !== t2.style.display)).length > 0 || (this.$wrap.style.display = "none", Wn().unlock());
      }
    }
    class Hn {
      constructor(e2) {
        d(this, "wrap"), this.wrap = new Nn(), document.body.appendChild(this.wrap.getWrap()), e2.on("unmounted", (() => {
          this.wrap.getWrap().remove();
        })), Wn().init();
      }
      getEl() {
        return this.wrap.getWrap();
      }
      create(e2, t2) {
        return this.wrap.createItem(e2, t2);
      }
    }
    const Qn = "ArtalkUser";
    class Vn {
      constructor(e2) {
        d(this, "data"), this.opts = e2;
        const t2 = JSON.parse(window.localStorage.getItem(Qn) || "{}");
        this.data = { name: t2.name || t2.nick || "", email: t2.email || "", link: t2.link || "", token: t2.token || "", is_admin: t2.is_admin || t2.isAdmin || false };
      }
      getData() {
        return this.data;
      }
      update(e2 = {}) {
        Object.entries(e2).forEach((([e3, t2]) => {
          this.data[e3] = t2;
        })), window.localStorage.setItem(Qn, JSON.stringify(this.data)), this.opts.onUserChanged && this.opts.onUserChanged(this.data);
      }
      logout() {
        this.update({ token: "", is_admin: false });
      }
      checkHasBasicUserInfo() {
        return !!this.data.name && !!this.data.email;
      }
    }
    const Gn = { i18n(e2) {
      _t(e2.conf.locale), e2.watchConf(["locale"], ((e3) => {
        _t(e3.locale);
      }));
    }, user: (e2) => new Vn({ onUserChanged: (t2) => {
      e2.trigger("user-changed", t2);
    } }), layerManager: (e2) => new Hn(e2), checkerLauncher: (e2) => new tn({ getCtx: () => e2, getApi: () => e2.getApi(), onReload: () => e2.reload(), getCaptchaIframeURL: () => `${e2.conf.server}/api/v2/captcha/?t=${+/* @__PURE__ */ new Date()}` }), editor(e2) {
      const t2 = new ln(e2);
      return e2.$root.appendChild(t2.$el), t2;
    }, list(e2) {
      const t2 = new Bn(e2);
      return e2.$root.appendChild(t2.$el), t2;
    }, sidebarLayer: (e2) => new cn(e2), editorPlugs() {
    } };
    function Kn(e2) {
      return h(this, null, (function* () {
        yield (function(e3) {
          return h(this, null, (function* () {
            yield Zn({ opt: e3, query: "page_comment", containers: [e3.countEl, "#ArtalkCount"] });
          }));
        })(e2);
        const t2 = yield (function(e3) {
          return h(this, null, (function* () {
            if (!e3.pvAdd || !e3.pageKey) return;
            const t3 = (yield e3.getApi().pages.logPv({ page_key: e3.pageKey, page_title: e3.pageTitle, site_name: e3.siteName })).data.pv;
            return { [e3.pageKey]: t3 };
          }));
        })(e2);
        yield (function(e3, t3) {
          return h(this, null, (function* () {
            yield Zn({ opt: e3, query: "page_pv", containers: [e3.pvEl, "#ArtalkPV"], cache: t3 });
          }));
        })(e2, t2);
      }));
    }
    function Zn(e2) {
      return h(this, null, (function* () {
        const { opt: t2 } = e2;
        let n2 = e2.cache || {};
        const s2 = (function(e3) {
          const t3 = /* @__PURE__ */ new Set();
          return new Set(e3).forEach(((e4) => {
            document.querySelectorAll(e4).forEach(((e5) => t3.add(e5)));
          })), t3;
        })(e2.containers), i2 = (function(e3, t3, n3, s3) {
          const i3 = Array.from(e3).map(((e4) => e4.getAttribute(t3) || n3)).filter(((e4) => e4 && "number" != typeof s3[e4]));
          return [...new Set(i3)];
        })(s2, t2.pageKeyAttr, t2.pageKey, n2);
        if (i2.length > 0) {
          const s3 = (yield t2.getApi().stats.getStats(e2.query, { page_keys: i2.join(","), site_name: t2.siteName })).data.data;
          n2 = l(l({}, n2), s3);
        }
        !(function(e3, t3, n3) {
          e3.forEach(((e4) => {
            const s3 = e4.getAttribute("data-page-key"), i3 = s3 && t3[s3] || n3 && t3[n3] || 0;
            e4.innerText = `${Number(i3)}`;
          }));
        })(s2, n2, t2.pageKey);
      }));
    }
    const Yn = "ArtalkContent";
    class Xn {
      constructor(e2) {
        this.kit = e2;
      }
      reqAdd() {
        return h(this, null, (function* () {
          return (yield this.kit.useApi().comments.createComment(l({}, yield this.getSubmitAddParams()))).data;
        }));
      }
      getSubmitAddParams() {
        return h(this, null, (function* () {
          const { name: e2, email: t2, link: n2 } = this.kit.useUser().getData(), s2 = this.kit.useConf();
          return { content: this.kit.useEditor().getContentFinal(), name: e2, email: t2, link: n2, rid: 0, page_key: s2.pageKey, page_title: s2.pageTitle, site_name: s2.site, ua: yield Tt() };
        }));
      }
      postSubmitAdd(e2) {
        this.kit.useGlobalCtx().getData().insertComment(e2);
      }
    }
    class Jn extends rn {
      constructor(e2) {
        super(e2), d(this, "customs", []), d(this, "defaultPreset"), this.defaultPreset = new Xn(this.kit);
        const t2 = () => this.do();
        this.kit.useMounted((() => {
          this.kit.useGlobalCtx().on("editor-submit", t2);
        })), this.kit.useUnmounted((() => {
          this.kit.useGlobalCtx().off("editor-submit", t2);
        }));
      }
      registerCustom(e2) {
        this.customs.push(e2);
      }
      do() {
        return h(this, null, (function* () {
          if ("" === this.kit.useEditor().getContentFinal().trim()) return void this.kit.useEditor().focus();
          const e2 = this.customs.find(((e3) => e3.activeCond()));
          this.kit.useEditor().showLoading();
          try {
            let t2;
            (null == e2 ? void 0 : e2.pre) && e2.pre(), t2 = (null == e2 ? void 0 : e2.req) ? yield e2.req() : yield this.defaultPreset.reqAdd(), (null == e2 ? void 0 : e2.post) ? e2.post(t2) : this.defaultPreset.postSubmitAdd(t2);
          } catch (t2) {
            return console.error(t2), void this.kit.useEditor().showNotify(`${Ot("commentFail")}: ${t2.message || String(t2)}`, "e");
          } finally {
            this.kit.useEditor().hideLoading();
          }
          this.kit.useEditor().reset(), this.kit.useGlobalCtx().trigger("editor-submitted");
        }));
      }
    }
    class es extends rn {
      constructor(e2) {
        super(e2), d(this, "emoticons", []), d(this, "loadingTask", null), d(this, "$grpWrap"), d(this, "$grpSwitcher"), d(this, "isListLoaded", false), d(this, "isImgLoaded", false), this.kit.useMounted((() => {
          this.usePanel('<div class="atk-editor-plug-emoticons"></div>'), this.useBtn(`<i aria-label="${Ot("emoticon")}"><svg fill="currentColor" aria-hidden="true" height="14" viewBox="0 0 14 14" width="14"><path d="m4.26829 5.29294c0-.94317.45893-1.7074 1.02439-1.7074.56547 0 1.02439.76423 1.02439 1.7074s-.45892 1.7074-1.02439 1.7074c-.56546 0-1.02439-.76423-1.02439-1.7074zm4.43903 1.7074c.56546 0 1.02439-.76423 1.02439-1.7074s-.45893-1.7074-1.02439-1.7074c-.56547 0-1.02439.76423-1.02439 1.7074s.45892 1.7074 1.02439 1.7074zm-1.70732 2.73184c-1.51883 0-2.06312-1.52095-2.08361-1.58173l-1.29551.43231c.03414.10244.868 2.51604 3.3798 2.51604 2.51181 0 3.34502-2.41291 3.37982-2.51604l-1.29484-.43573c-.02254.06488-.56683 1.58583-2.08498 1.58583zm7-2.73252c0 3.86004-3.1401 7.00034-7 7.00034s-7-3.1396-7-6.99966c0-3.86009 3.1401-7.00034 7-7.00034s7 3.14025 7 7.00034zm-1.3659 0c0-3.10679-2.5275-5.63442-5.6341-5.63442-3.10663 0-5.63415 2.52832-5.63415 5.6351 0 3.10676 2.52752 5.63446 5.63415 5.63446 3.1066 0 5.6341-2.5277 5.6341-5.63446z"/></svg></i>`);
        })), this.kit.useUnmounted((() => {
        })), this.useContentTransformer(((e3) => this.transEmoticonImageText(e3))), this.usePanelShow((() => {
          (() => {
            h(this, null, (function* () {
              yield this.loadEmoticonsData(), this.isImgLoaded || (this.initEmoticonsList(), this.isImgLoaded = true), setTimeout((() => {
                this.changeListHeight();
              }), 30);
            }));
          })();
        })), this.usePanelHide((() => {
          this.$panel.parentElement.style.height = "";
        })), window.setTimeout((() => {
          this.loadEmoticonsData();
        }), 1e3);
      }
      loadEmoticonsData() {
        return h(this, null, (function* () {
          this.isListLoaded || (null === this.loadingTask ? (this.loadingTask = (() => h(this, null, (function* () {
            Nt(this.$panel), this.emoticons = yield this.handleData(this.kit.useConf().emoticons), Ht(this.$panel), this.loadingTask = null, this.isListLoaded = true;
          })))(), yield this.loadingTask) : yield this.loadingTask);
        }));
      }
      handleData(e2) {
        return h(this, null, (function* () {
          if (!Array.isArray(e2) && ["object", "string"].includes(typeof e2) && (e2 = [e2]), !Array.isArray(e2)) return Kt(this.$panel, `[${Ot("emoticon")}] Data must be of Array/Object/String type`), Ht(this.$panel), [];
          const t2 = (t3) => {
            "object" == typeof t3 && (t3.name && e2.find(((e3) => e3.name === t3.name)) || e2.push(t3));
          }, n2 = (e3) => h(this, null, (function* () {
            yield Promise.all(e3.map(((e4, s2) => h(this, null, (function* () {
              if ("object" != typeof e4 || Array.isArray(e4)) {
                if (Array.isArray(e4)) yield n2(e4);
                else if ("string" == typeof e4) {
                  const s3 = yield this.remoteLoad(e4);
                  Array.isArray(s3) ? yield n2(s3) : "object" == typeof s3 && t2(s3);
                }
              } else t2(e4);
            })))));
          }));
          return yield n2(e2), e2.forEach(((e3) => {
            if (this.isOwOFormat(e3)) {
              this.convertOwO(e3).forEach(((e4) => {
                t2(e4);
              }));
            } else Array.isArray(e3) && e3.forEach(((e4) => {
              t2(e4);
            }));
          })), e2 = e2.filter(((e3) => "object" == typeof e3 && !Array.isArray(e3) && !!e3 && !!e3.name)), this.solveNullKey(e2), this.solveSameKey(e2), e2;
        }));
      }
      remoteLoad(e2) {
        return h(this, null, (function* () {
          if (!e2) return [];
          try {
            const t2 = yield fetch(e2);
            return yield t2.json();
          } catch (t2) {
            return Ht(this.$panel), console.error("[Emoticons] Load Failed:", t2), Kt(this.$panel, `[${Ot("emoticon")}] ${Ot("loadFail")}: ${String(t2)}`), [];
          }
        }));
      }
      solveNullKey(e2) {
        e2.forEach(((e3) => {
          e3.items.forEach(((t2, n2) => {
            t2.key || (t2.key = `${e3.name} ${n2 + 1}`);
          }));
        }));
      }
      solveSameKey(e2) {
        const t2 = {};
        e2.forEach(((e3) => {
          e3.items.forEach(((e4) => {
            e4.key && "" !== String(e4.key).trim() && (t2[e4.key] ? t2[e4.key]++ : t2[e4.key] = 1, t2[e4.key] > 1 && (e4.key = `${e4.key} ${t2[e4.key]}`));
          }));
        }));
      }
      isOwOFormat(e2) {
        try {
          return "object" == typeof e2 && !!Object.values(e2).length && Array.isArray(Object.keys(Object.values(e2)[0].container)) && Object.keys(Object.values(e2)[0].container[0]).includes("icon");
        } catch (t2) {
          return false;
        }
      }
      convertOwO(e2) {
        const t2 = [];
        return Object.entries(e2).forEach((([e3, n2]) => {
          const s2 = { name: e3, type: n2.type, items: [] };
          n2.container.forEach(((t3, n3) => {
            const i2 = t3.icon;
            if (/<(img|IMG)/.test(i2)) {
              const e4 = /src=["'](.*?)["']/.exec(i2);
              e4 && e4.length > 1 && (t3.icon = e4[1]);
            }
            s2.items.push({ key: t3.text || `${e3} ${n3 + 1}`, val: t3.icon });
          })), t2.push(s2);
        })), t2;
      }
      initEmoticonsList() {
        this.$grpWrap = wt('<div class="atk-grp-wrap"></div>'), this.$panel.append(this.$grpWrap), this.emoticons.forEach(((e2, t2) => {
          const n2 = wt('<div class="atk-grp" style="display: none;"></div>');
          this.$grpWrap.append(n2), n2.setAttribute("data-index", String(t2)), n2.setAttribute("data-grp-name", e2.name), n2.setAttribute("data-type", e2.type), e2.items.forEach(((t3) => {
            const s2 = wt('<span class="atk-item"></span>');
            if (n2.append(s2), t3.key && !new RegExp(`^(${e2.name})?\\s?[0-9]+$`).test(t3.key) && s2.setAttribute("title", t3.key), "image" === e2.type) {
              const e3 = document.createElement("img");
              e3.src = t3.val, e3.alt = t3.key, s2.append(e3);
            } else s2.innerText = t3.val;
            s2.onclick = () => {
              "image" === e2.type ? this.kit.useEditor().insertContent(`:[${t3.key}]`) : this.kit.useEditor().insertContent(t3.val || "");
            };
          }));
        })), this.emoticons.length > 1 && (this.$grpSwitcher = wt('<div class="atk-grp-switcher"></div>'), this.$panel.append(this.$grpSwitcher), this.emoticons.forEach(((e2, t2) => {
          const n2 = wt("<span />");
          n2.innerText = e2.name, n2.setAttribute("data-index", String(t2)), n2.onclick = () => this.openGrp(t2), this.$grpSwitcher.append(n2);
        }))), this.emoticons.length > 0 && this.openGrp(0);
      }
      openGrp(e2) {
        var t2, n2, s2;
        Array.from(this.$grpWrap.children).forEach(((t3) => {
          const n3 = t3;
          n3.getAttribute("data-index") !== String(e2) ? n3.style.display = "none" : n3.style.display = "";
        })), null == (t2 = this.$grpSwitcher) || t2.querySelectorAll("span.active").forEach(((e3) => e3.classList.remove("active"))), null == (s2 = null == (n2 = this.$grpSwitcher) ? void 0 : n2.querySelector(`span[data-index="${e2}"]`)) || s2.classList.add("active"), this.changeListHeight();
      }
      changeListHeight() {
      }
      transEmoticonImageText(e2) {
        return this.emoticons && Array.isArray(this.emoticons) ? (this.emoticons.forEach(((t2) => {
          "image" === t2.type && Object.entries(t2.items).forEach((([t3, n2]) => {
            e2 = e2.split(`:[${n2.key}]`).join(`<img src="${n2.val}" atk-emoticon="${n2.key}">`);
          }));
        })), e2) : e2;
      }
    }
    const ts = ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"];
    class ns extends rn {
      constructor(e2) {
        super(e2), d(this, "$imgUploadInput"), this.kit.useMounted((() => this.init())), this.initDragImg();
      }
      init() {
        this.$imgUploadInput = document.createElement("input"), this.$imgUploadInput.type = "file", this.$imgUploadInput.style.display = "none", this.$imgUploadInput.accept = ts.map(((e3) => `.${e3}`)).join(",");
        const e2 = this.useBtn(`<i aria-label="${Ot("uploadImage")}"><svg fill="currentColor" aria-hidden="true" height="14" viewBox="0 0 14 14" width="14"><path d="m0 1.94444c0-1.074107.870333-1.94444 1.94444-1.94444h10.11116c1.0741 0 1.9444.870333 1.9444 1.94444v10.11116c0 1.0741-.8703 1.9444-1.9444 1.9444h-10.11116c-1.074107 0-1.94444-.8703-1.94444-1.9444zm1.94444-.38888c-.21466 0-.38888.17422-.38888.38888v7.06689l2.33333-2.33333 2.33333 2.33333 3.88888-3.88889 2.3333 2.33334v-5.51134c0-.21466-.1742-.38888-.3888-.38888zm10.49996 8.09977-2.3333-2.33333-3.88888 3.8889-2.33333-2.33334-2.33333 2.33334v.8447c0 .2146.17422.3888.38888.3888h10.11116c.2146 0 .3888-.1742.3888-.3888zm-7.1944-6.54422c-.75133 0-1.36111.60978-1.36111 1.36111 0 .75134.60978 1.36111 1.36111 1.36111s1.36111-.60977 1.36111-1.36111c0-.75133-.60978-1.36111-1.36111-1.36111z"/></svg></i>`);
        e2.after(this.$imgUploadInput), e2.onclick = () => {
          const e3 = this.$imgUploadInput;
          e3.onchange = () => {
            (() => {
              h(this, null, (function* () {
                if (!e3.files || 0 === e3.files.length) return;
                const t2 = e3.files[0];
                this.uploadImg(t2);
              }));
            })();
          }, e3.click();
        }, this.kit.useConf().imgUpload || this.$btn.setAttribute("atk-only-admin-show", "");
      }
      initDragImg() {
        const e2 = (e3) => {
          if (e3) for (let t3 = 0; t3 < e3.length; t3++) {
            const n3 = e3[t3];
            this.uploadImg(n3);
          }
        }, t2 = (e3) => {
          e3.stopPropagation(), e3.preventDefault();
        }, n2 = (t3) => {
          var n3;
          const s3 = null == (n3 = t3.dataTransfer) ? void 0 : n3.files;
          (null == s3 ? void 0 : s3.length) && (t3.preventDefault(), e2(s3));
        }, s2 = (t3) => {
          var n3;
          const s3 = null == (n3 = t3.clipboardData) ? void 0 : n3.files;
          (null == s3 ? void 0 : s3.length) && (t3.preventDefault(), e2(s3));
        };
        this.kit.useMounted((() => {
          this.kit.useUI().$textarea.addEventListener("dragover", t2), this.kit.useUI().$textarea.addEventListener("drop", n2), this.kit.useUI().$textarea.addEventListener("paste", s2);
        })), this.kit.useUnmounted((() => {
          this.kit.useUI().$textarea.removeEventListener("dragover", t2), this.kit.useUI().$textarea.removeEventListener("drop", n2), this.kit.useUI().$textarea.removeEventListener("paste", s2);
        }));
      }
      uploadImg(e2) {
        return h(this, null, (function* () {
          const t2 = /[^.]+$/.exec(e2.name);
          if (!t2 || !ts.includes(String(t2[0]).toLowerCase())) return;
          if (!this.kit.useUser().checkHasBasicUserInfo()) return void this.kit.useEditor().showNotify(Ot("uploadLoginMsg"), "w");
          let n2 = "\n";
          "" === this.kit.useUI().$textarea.value.trim() && (n2 = "");
          const s2 = `${n2}![](Uploading ${e2.name}...)`;
          let i2;
          this.kit.useEditor().insertContent(s2);
          try {
            const t3 = this.kit.useConf().imgUploader;
            i2 = t3 ? { public_url: yield t3(e2) } : (yield this.kit.useApi().upload.upload({ file: e2 })).data;
          } catch (r2) {
            console.error(r2), this.kit.useEditor().showNotify(`${Ot("uploadFail")}: ${r2.message}`, "e");
          }
          if (i2 && i2.public_url) {
            let e3 = i2.public_url;
            At(e3) || (e3 = Lt({ base: this.kit.useConf().server, path: e3 })), this.kit.useEditor().setContent(this.kit.useUI().$textarea.value.replace(s2, `${n2}![](${e3})`));
          } else this.kit.useEditor().setContent(this.kit.useUI().$textarea.value.replace(s2, ""));
        }));
      }
    }
    class ss extends rn {
      constructor(e2) {
        super(e2), d(this, "isPlugPanelShow", false), this.kit.useMounted((() => {
          this.usePanel('<div class="atk-editor-plug-preview"></div>'), this.useBtn(`<i aria-label="${Ot("preview")}"><svg fill="currentColor" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></i>`);
        })), this.kit.useUnmounted((() => {
        })), this.kit.useEvents().on("content-updated", ((e3) => {
          this.isPlugPanelShow && this.updateContent();
        })), this.usePanelShow((() => {
          this.isPlugPanelShow = true, this.updateContent();
        })), this.usePanelHide((() => {
          this.isPlugPanelShow = false;
        }));
      }
      updateContent() {
        this.$panel.innerHTML = this.kit.useEditor().getContentMarked();
      }
    }
    const is = [class extends rn {
      constructor(e2) {
        super(e2);
        const t2 = () => {
          this.save();
        };
        this.kit.useMounted((() => {
          const e3 = window.localStorage.getItem(Yn) || "";
          "" !== e3.trim() && (this.kit.useEditor().showNotify(Ot("restoredMsg"), "i"), this.kit.useEditor().setContent(e3)), this.kit.useEvents().on("content-updated", t2);
        })), this.kit.useUnmounted((() => {
          this.kit.useEvents().off("content-updated", t2);
        }));
      }
      save() {
        window.localStorage.setItem(Yn, this.kit.useEditor().getContentRaw().trim());
      }
    }, class extends rn {
      get $inputs() {
        return this.kit.useEditor().getHeaderInputEls();
      }
      constructor(e2) {
        super(e2);
        const t2 = {}, n2 = {}, s2 = (e3, t3, n3) => () => {
          this.kit.useEvents().trigger(e3, { field: n3, $input: t3 });
        };
        this.kit.useMounted((() => {
          Object.entries(this.$inputs).forEach((([e3, i2]) => {
            i2.addEventListener("input", t2[e3] = s2("header-input", i2, e3)), i2.addEventListener("change", n2[e3] = s2("header-change", i2, e3));
          }));
        })), this.kit.useUnmounted((() => {
          Object.entries(this.$inputs).forEach((([e3, s3]) => {
            s3.removeEventListener("input", t2[e3]), s3.removeEventListener("change", n2[e3]);
          }));
        }));
      }
    }, class extends rn {
      constructor(e2) {
        super(e2), d(this, "query", { timer: null, abortFn: null });
        const t2 = ({ $input: e3, field: t3 }) => {
          "edit" !== this.kit.useEditor().getState() && (this.kit.useUser().update({ [t3]: e3.value.trim() }), "name" !== t3 && "email" !== t3 || this.fetchUserInfo());
        }, n2 = { name: Ot("nick"), email: Ot("email"), link: Ot("link") };
        this.kit.useMounted((() => {
          Object.entries(this.kit.useEditor().getHeaderInputEls()).forEach((([e3, t3]) => {
            t3.placeholder = n2[e3], t3.value = this.kit.useUser().getData()[e3] || "";
          })), this.kit.useEvents().on("header-input", t2);
        })), this.kit.useUnmounted((() => {
          this.kit.useEvents().off("header-input", t2);
        }));
      }
      fetchUserInfo() {
        this.kit.useUser().logout(), this.query.timer && window.clearTimeout(this.query.timer), this.query.abortFn && this.query.abortFn(), this.query.timer = window.setTimeout((() => {
          this.query.timer = null;
          const e2 = this.kit.useApi(), t2 = "getUserCancelToken";
          this.query.abortFn = () => e2.abortRequest(t2), e2.user.getUser(l({}, e2.getUserFields()), { cancelToken: t2 }).then(((e3) => this.onUserInfoFetched(e3.data))).catch(((e3) => {
          })).finally((() => {
            this.query.abortFn = null;
          }));
        }), 400);
      }
      onUserInfoFetched(e2) {
        var t2;
        e2.is_login || this.kit.useUser().logout(), this.kit.useGlobalCtx().getData().updateNotifies(e2.notifies), this.kit.useUser().checkHasBasicUserInfo() && !e2.is_login && (null == (t2 = e2.user) ? void 0 : t2.is_admin) && this.kit.useGlobalCtx().checkAdmin({ onSuccess: () => {
        } }), e2.user && e2.user.link && (this.kit.useUI().$link.value = e2.user.link, this.kit.useUser().update({ link: e2.user.link }));
      }
    }, class extends rn {
      constructor(e2) {
        super(e2);
        const t2 = ({ field: e3 }) => {
          "link" === e3 && this.onLinkInputChange();
        };
        this.kit.useMounted((() => {
          this.kit.useEvents().on("header-change", t2);
        })), this.kit.useUnmounted((() => {
          this.kit.useEvents().off("header-change", t2);
        }));
      }
      onLinkInputChange() {
        const e2 = this.kit.useUI().$link.value.trim();
        e2 && !/^(http|https):\/\//.test(e2) && (this.kit.useUI().$link.value = `https://${e2}`, this.kit.useUser().update({ link: this.kit.useUI().$link.value }));
      }
    }, class extends rn {
      constructor(e2) {
        super(e2);
        const t2 = (e3) => this.onKeydown(e3), n2 = () => this.onInput();
        this.kit.useMounted((() => {
          this.kit.useUI().$textarea.placeholder = this.kit.useConf().placeholder || Ot("placeholder"), this.kit.useUI().$textarea.addEventListener("keydown", t2), this.kit.useUI().$textarea.addEventListener("input", n2);
        })), this.kit.useUnmounted((() => {
          this.kit.useUI().$textarea.removeEventListener("keydown", t2), this.kit.useUI().$textarea.removeEventListener("input", n2);
        })), this.kit.useEvents().on("content-updated", (() => {
          window.setTimeout((() => {
            this.adaptiveHeightByContent();
          }), 80);
        }));
      }
      onKeydown(e2) {
        9 === (e2.keyCode || e2.which) && (e2.preventDefault(), this.kit.useEditor().insertContent("	"));
      }
      onInput() {
        this.kit.useEvents().trigger("content-updated", this.kit.useEditor().getContentRaw());
      }
      adaptiveHeightByContent() {
        const e2 = this.kit.useUI().$textarea.offsetHeight - this.kit.useUI().$textarea.clientHeight;
        this.kit.useUI().$textarea.style.height = "0px", this.kit.useUI().$textarea.style.height = `${this.kit.useUI().$textarea.scrollHeight + e2}px`;
      }
    }, Jn, class extends rn {
      constructor(e2) {
        super(e2);
        const t2 = () => {
          this.kit.useEditor().submit();
        };
        this.kit.useMounted((() => {
          this.kit.useUI().$submitBtn.innerText = this.kit.useConf().sendBtn || Ot("send"), this.kit.useUI().$submitBtn.addEventListener("click", t2);
        })), this.kit.useUnmounted((() => {
          this.kit.useUI().$submitBtn.removeEventListener("click", t2);
        }));
      }
    }, on, class extends rn {
      constructor(e2) {
        super(e2), d(this, "comment"), this.useEditorStateEffect("reply", ((e3) => (this.setReply(e3), () => {
          this.cancelReply();
        }))), this.kit.useEvents().on("mounted", (() => {
          const e3 = this.kit.useDeps(Jn);
          if (!e3) throw Error("SubmitPlug not initialized");
          const t2 = new Xn(this.kit);
          e3.registerCustom({ activeCond: () => !!this.comment, req: () => h(this, null, (function* () {
            if (!this.comment) throw new Error("reply comment cannot be empty");
            return (yield this.kit.useApi().comments.createComment(c(l({}, yield t2.getSubmitAddParams()), { rid: this.comment.id, page_key: this.comment.page_key, page_title: void 0, site_name: this.comment.site_name }))).data;
          })), post: (e4) => {
            const n2 = this.kit.useConf();
            e4.page_key !== n2.pageKey && window.open(`${e4.page_url}#atk-comment-${e4.id}`), t2.postSubmitAdd(e4);
          } });
        }));
      }
      setReply(e2) {
        const t2 = this.kit.useUI();
        if (!t2.$sendReplyBtn) {
          const n2 = wt(`<span class="atk-state-btn"><span class="atk-text-wrap">${Ot("reply")} <span class="atk-text"></span></span><span class="atk-cancel atk-icon-close atk-icon"></span></span>`);
          n2.querySelector(".atk-text").innerText = `@${e2.nick}`, n2.addEventListener("click", (() => {
            this.kit.useEditor().resetState();
          })), t2.$stateWrap.append(n2), t2.$sendReplyBtn = n2;
        }
        this.comment = e2, t2.$textarea.focus();
      }
      cancelReply() {
        if (!this.comment) return;
        const e2 = this.kit.useUI();
        e2.$sendReplyBtn && (e2.$sendReplyBtn.remove(), e2.$sendReplyBtn = void 0), this.comment = void 0;
      }
    }, class extends rn {
      constructor(e2) {
        super(e2), d(this, "comment"), d(this, "originalSubmitBtnText", "Send"), this.useEditorStateEffect("edit", ((e3) => (this.edit(e3), () => {
          this.cancelEdit();
        }))), this.kit.useMounted((() => {
          const e3 = this.kit.useDeps(Jn);
          if (!e3) throw Error("SubmitPlug not initialized");
          e3.registerCustom({ activeCond: () => !!this.comment, req: () => h(this, null, (function* () {
            const e4 = { content: this.kit.useEditor().getContentFinal(), nick: this.kit.useUI().$name.value, email: this.kit.useUI().$email.value, link: this.kit.useUI().$link.value }, t2 = this.comment;
            return (yield this.kit.useApi().comments.updateComment(t2.id, l(l({}, t2), e4))).data;
          })), post: (e4) => {
            this.kit.useGlobalCtx().getData().updateComment(e4);
          } });
        }));
      }
      edit(e2) {
        const t2 = this.kit.useUI();
        if (!t2.$editCancelBtn) {
          const e3 = wt(`<span class="atk-state-btn"><span class="atk-text-wrap">${Ot("editCancel")}</span><span class="atk-cancel atk-icon-close atk-icon"></span></span>`);
          e3.onclick = () => {
            this.kit.useEditor().resetState();
          }, t2.$stateWrap.append(e3), t2.$editCancelBtn = e3;
        }
        this.comment = e2, t2.$header.style.display = "none", t2.$name.value = e2.nick || "", t2.$email.value = e2.email || "", t2.$link.value = e2.link || "", this.kit.useEditor().setContent(e2.content), t2.$textarea.focus(), this.updateSubmitBtnText(Ot("save"));
      }
      cancelEdit() {
        if (!this.comment) return;
        const e2 = this.kit.useUI();
        e2.$editCancelBtn && (e2.$editCancelBtn.remove(), e2.$editCancelBtn = void 0), this.comment = void 0;
        const { name: t2, email: n2, link: s2 } = this.kit.useUser().getData();
        e2.$name.value = t2, e2.$email.value = n2, e2.$link.value = s2, this.kit.useEditor().setContent(""), this.restoreSubmitBtnText(), e2.$header.style.display = "";
      }
      updateSubmitBtnText(e2) {
        this.originalSubmitBtnText = this.kit.useUI().$submitBtn.innerText, this.kit.useUI().$submitBtn.innerText = e2;
      }
      restoreSubmitBtnText() {
        this.kit.useUI().$submitBtn.innerText = this.originalSubmitBtnText;
      }
    }, class extends rn {
      constructor(e2) {
        super(e2);
        const t2 = () => this.open(), n2 = () => this.close();
        this.kit.useMounted((() => {
          this.kit.useEvents().on("editor-open", t2), this.kit.useEvents().on("editor-close", n2);
        })), this.kit.useUnmounted((() => {
          this.kit.useEvents().off("editor-open", t2), this.kit.useEvents().off("editor-close", n2);
        }));
      }
      open() {
        var e2;
        null == (e2 = this.kit.useUI().$textareaWrap.querySelector(".atk-comment-closed")) || e2.remove(), this.kit.useUI().$textarea.style.display = "", this.kit.useUI().$bottom.style.display = "";
      }
      close() {
        this.kit.useUI().$textareaWrap.querySelector(".atk-comment-closed") || this.kit.useUI().$textareaWrap.prepend(wt(`<div class="atk-comment-closed">${Ot("onlyAdminCanReply")}</div>`)), this.kit.useUser().getData().is_admin ? (this.kit.useUI().$textarea.style.display = "", this.kit.useUI().$bottom.style.display = "") : (this.kit.useUI().$textarea.style.display = "none", this.kit.useEvents().trigger("panel-close"), this.kit.useUI().$bottom.style.display = "none");
      }
    }, es, ns, ss];
    class rs {
      constructor(e2) {
        this.plugs = e2;
      }
      useEditor() {
        return this.plugs.editor;
      }
      useGlobalCtx() {
        return this.plugs.editor.ctx;
      }
      useConf() {
        return this.plugs.editor.ctx.conf;
      }
      useApi() {
        return this.plugs.editor.ctx.getApi();
      }
      useUser() {
        return this.plugs.editor.ctx.get("user");
      }
      useUI() {
        return this.plugs.editor.getUI();
      }
      useEvents() {
        return this.plugs.getEvents();
      }
      useMounted(e2) {
        this.useEvents().on("mounted", e2);
      }
      useUnmounted(e2) {
        this.useEvents().on("unmounted", e2);
      }
      useDeps(e2) {
        return this.plugs.get(e2);
      }
    }
    class os {
      constructor(e2) {
        d(this, "plugs", []), d(this, "openedPlug", null), d(this, "events", new Dt()), this.editor = e2;
        let t2 = false;
        this.editor.ctx.watchConf(["imgUpload", "emoticons", "preview", "editorTravel", "locale"], ((e3) => {
          t2 && this.getEvents().trigger("unmounted"), this.clear(), (function(e4) {
            const t3 = /* @__PURE__ */ new Map();
            return t3.set(ns, e4.imgUpload), t3.set(es, e4.emoticons), t3.set(ss, e4.preview), t3.set(on, e4.editorTravel), is.filter(((e5) => !t3.has(e5) || !!t3.get(e5)));
          })(e3).forEach(((e4) => {
            const t3 = new rs(this);
            this.plugs.push(new e4(t3));
          })), this.getEvents().trigger("mounted"), t2 = true, this.loadPluginUI();
        })), this.events.on("panel-close", (() => this.closePlugPanel()));
      }
      getPlugs() {
        return this.plugs;
      }
      getEvents() {
        return this.events;
      }
      clear() {
        this.plugs = [], this.events = new Dt(), this.openedPlug && this.closePlugPanel();
      }
      loadPluginUI() {
        this.editor.getUI().$plugPanelWrap.innerHTML = "", this.editor.getUI().$plugPanelWrap.style.display = "none", this.editor.getUI().$plugBtnWrap.innerHTML = "", this.plugs.forEach(((e2) => this.loadPluginItem(e2)));
      }
      loadPluginItem(e2) {
        const t2 = e2.$btn;
        if (!t2) return;
        this.editor.getUI().$plugBtnWrap.appendChild(t2), !t2.onclick && (t2.onclick = () => {
          this.editor.getUI().$plugBtnWrap.querySelectorAll(".active").forEach(((e3) => e3.classList.remove("active"))), e2 !== this.openedPlug ? (this.openPlugPanel(e2), t2.classList.add("active")) : this.closePlugPanel();
        });
        const n2 = e2.$panel;
        n2 && (n2.style.display = "none", this.editor.getUI().$plugPanelWrap.appendChild(n2));
      }
      get(e2) {
        return this.plugs.find(((t2) => t2 instanceof e2));
      }
      openPlugPanel(e2) {
        this.plugs.forEach(((t2) => {
          const n2 = t2.$panel;
          n2 && (t2 === e2 ? (n2.style.display = "", this.events.trigger("panel-show", e2)) : (n2.style.display = "none", this.events.trigger("panel-hide", e2)));
        })), this.editor.getUI().$plugPanelWrap.style.display = "", this.openedPlug = e2;
      }
      closePlugPanel() {
        this.openedPlug && (this.editor.getUI().$plugPanelWrap.style.display = "none", this.events.trigger("panel-hide", this.openedPlug), this.openedPlug = null);
      }
      getTransformedContent(e2) {
        let t2 = e2;
        return this.plugs.forEach(((e3) => {
          e3.contentTransformer && (t2 = e3.contentTransformer(t2));
        })), t2;
      }
    }
    const as = "2.9.1";
    function ls(e2) {
      const t2 = wt('<span><span class="error-message"></span><br/><br/></span>');
      if (t2.querySelector(".error-message").innerText = `${Ot("listLoadFailMsg")}
${e2.errMsg}`, e2.retryFn) {
        const n2 = wt(`<span style="cursor:pointer;">${Ot("listRetry")}</span>`);
        n2.onclick = () => e2.retryFn && e2.retryFn(), t2.appendChild(n2);
      }
      if (e2.onOpenSidebar) {
        const n2 = wt(`<span atk-only-admin-show> | <span style="cursor:pointer;">${Ot("openName", { name: Ot("ctrlCenter") })}</span></span>`);
        t2.appendChild(n2), n2.onclick = () => e2.onOpenSidebar && e2.onOpenSidebar();
      }
      Kt(e2.$err, t2);
    }
    let cs = false;
    let ds;
    function hs(e2, t2) {
      const n2 = "atk-dark-mode";
      e2.forEach(((e3) => {
        t2 ? e3.classList.add(n2) : e3.classList.remove(n2);
      }));
    }
    const us = [(e2) => {
      e2.watchConf(["imgLazyLoad", "markedOptions"], ((t2) => {
        !(function(e3) {
          try {
            if (!be.name) return;
          } catch (n2) {
            return;
          }
          const t3 = new be();
          t3.setOptions(l(l({ renderer: dt({ imgLazyLoad: e3.imgLazyLoad }) }, ft), e3.markedOptions)), gt = t3;
        })({ markedOptions: e2.getConf().markedOptions, imgLazyLoad: e2.getConf().imgLazyLoad });
      })), e2.watchConf(["markedReplacers"], ((e3) => {
        var t2;
        e3.markedReplacers && (t2 = e3.markedReplacers, mt = t2);
      }));
    }, (e2) => {
      const t2 = e2.get("editor"), n2 = new os(t2);
      e2.inject("editorPlugs", n2);
    }, (e2) => {
      const t2 = () => {
        var t3;
        t3 = e2.get("user").getData().is_admin, (function(e3) {
          const t4 = [];
          e3.$root.querySelectorAll("[atk-only-admin-show]").forEach(((e4) => t4.push(e4)));
          const n2 = document.querySelector(".atk-sidebar");
          return n2 && n2.querySelectorAll("[atk-only-admin-show]").forEach(((e4) => t4.push(e4))), t4;
        })({ $root: e2.$root }).forEach(((e3) => {
          t3 ? e3.classList.remove("atk-hide") : e3.classList.add("atk-hide");
        }));
      };
      e2.on("list-loaded", (() => {
        t2();
      })), e2.on("user-changed", ((e3) => {
        t2();
      }));
    }, ...[(e2) => {
      e2.on("list-fetch", ((t2) => {
        if (e2.getData().getLoading()) return;
        e2.getData().setLoading(true);
        const n2 = l({ offset: 0, limit: e2.conf.pagination.pageSize, flatMode: e2.conf.flatMode, paramsModifier: e2.conf.listFetchParamsModifier }, t2);
        e2.getData().setListLastFetch({ params: n2 });
        const s2 = { limit: n2.limit, offset: n2.offset, flat_mode: n2.flatMode, page_key: e2.getConf().pageKey, site_name: e2.getConf().site };
        n2.paramsModifier && n2.paramsModifier(s2), e2.getApi().comments.getComments(l(l({}, s2), e2.getApi().getUserFields())).then((({ data: t3 }) => {
          e2.getData().setListLastFetch({ params: n2, data: t3 }), e2.getData().loadComments(t3.comments), e2.getData().updatePage(t3.page), n2.onSuccess && n2.onSuccess(t3), e2.trigger("list-fetched", { params: n2, data: t3 });
        })).catch(((t3) => {
          const s3 = { msg: t3.msg || String(t3), data: t3.data };
          throw n2.onError && n2.onError(s3), e2.trigger("list-failed", s3), e2.trigger("list-fetched", { params: n2, error: s3 }), t3;
        })).finally((() => {
          e2.getData().setLoading(false);
        }));
      }));
    }, (e2) => {
      e2.on("list-fetch", ((t2) => {
        const n2 = e2.get("list");
        0 === t2.offset && Qt(true, n2.$el);
      })), e2.on("list-fetched", (() => {
        Qt(false, e2.get("list").$el);
      }));
    }, (e2) => {
      e2.on("comment-rendered", ((t2) => {
        if (true === e2.conf.listUnreadHighlight) {
          const n2 = e2.getData().getNotifies(), s2 = n2.find(((e3) => e3.comment_id === t2.getID()));
          s2 ? (t2.getRender().setUnread(true), t2.getRender().setOpenAction((() => {
            window.open(s2.read_link), e2.getData().updateNotifies(n2.filter(((e3) => e3.comment_id !== t2.getID())));
          }))) : t2.getRender().setUnread(false);
        }
      })), e2.on("list-goto", ((t2) => {
        const n2 = xt("atk_notify_key");
        n2 && e2.getApi().notifies.markNotifyRead(t2, n2).then((() => {
          e2.getData().updateNotifies(e2.getData().getNotifies().filter(((e3) => e3.comment_id !== t2)));
        }));
      }));
    }, (e2) => {
      let t2;
      e2.on("mounted", (() => {
        const n2 = e2.get("list");
        t2 = n2.$el.querySelector('[data-action="admin-close-comment"]'), t2.addEventListener("click", (() => {
          const t3 = e2.getData().getPage();
          if (!t3) throw new Error("Page data not found");
          t3.admin_only = !t3.admin_only, (function(e3, t4) {
            e3.editorShowLoading(), e3.getApi().pages.updatePage(t4.id, t4).then((({ data: t5 }) => {
              e3.getData().updatePage(t5);
            })).catch(((t5) => {
              e3.editorShowNotify(`${Ot("editFail")}: ${t5.message || String(t5)}`, "e");
            })).finally((() => {
              e3.editorHideLoading();
            }));
          })(e2, t3);
        }));
      })), e2.on("page-loaded", ((n2) => {
        var s2, i2;
        const r2 = e2.get("editor");
        true === (null == n2 ? void 0 : n2.admin_only) ? (null == (s2 = r2.getPlugs()) || s2.getEvents().trigger("editor-close"), t2 && (t2.innerText = Ot("openComment"))) : (null == (i2 = r2.getPlugs()) || i2.getEvents().trigger("editor-open"), t2 && (t2.innerText = Ot("closeComment")));
      })), e2.on("list-loaded", ((t3) => {
        e2.editorResetState();
      }));
    }, (e2) => {
      e2.on("list-loaded", (() => {
        (() => {
          var t2, n2;
          const s2 = e2.get("list").$el.querySelector(".atk-comment-count .atk-text");
          if (!s2) return;
          const i2 = bt(Ot("counter", { count: `${Number(null == (n2 = null == (t2 = e2.getData().getListLastFetch()) ? void 0 : t2.data) ? void 0 : n2.count) || 0}` }));
          s2.innerHTML = i2.replace(/(\d+)/, '<span class="atk-comment-count-num">$1</span>');
        })();
      })), e2.on("comment-inserted", (() => {
        const t2 = e2.getData().getListLastFetch();
        (null == t2 ? void 0 : t2.data) && (t2.data.count += 1);
      })), e2.on("comment-deleted", (() => {
        const t2 = e2.getData().getListLastFetch();
        (null == t2 ? void 0 : t2.data) && (t2.data.count -= 1);
      }));
    }, (e2) => {
      let t2 = null;
      const n2 = () => {
        if (!t2) return;
        const n3 = e2.get("user").getData();
        if (n3.name && n3.email) {
          t2.classList.remove("atk-hide");
          const e3 = t2.querySelector(".atk-text");
          e3 && (e3.innerText = n3.is_admin ? Ot("ctrlCenter") : Ot("msgCenter"));
        } else t2.classList.add("atk-hide");
      };
      e2.watchConf(["locale"], ((s2) => {
        const i2 = e2.get("list");
        t2 = i2.$el.querySelector('[data-action="open-sidebar"]'), t2 && (t2.onclick = () => {
          e2.showSidebar();
        }, n2());
      })), e2.on("user-changed", ((e3) => {
        n2();
      }));
    }, (e2) => {
      let t2 = null;
      e2.on("mounted", (() => {
        const n2 = e2.get("list");
        t2 = n2.$el.querySelector(".atk-unread-badge");
      })), e2.on("notifies-updated", ((e3) => {
        var n2;
        n2 = e3.length || 0, t2 && (n2 > 0 ? (t2.innerText = `${Number(n2 || 0)}`, t2.style.display = "block") : t2.style.display = "none");
      }));
    }, (e2) => {
      const t2 = (t3) => {
        e2.conf.listFetchParamsModifier = t3, e2.reload();
      }, n2 = (e3) => {
        !(function(e4) {
          const { $dropdownWrap: t3, dropdownList: n3 } = e4;
          if (t3.querySelector(".atk-dropdown")) return;
          t3.classList.add("atk-dropdown-wrap"), t3.append(wt('<span class="atk-arrow-down-icon"></span>'));
          let s2 = 0;
          const i2 = (e5, t4, n4, i3) => {
            i3(), s2 = e5, r2.querySelectorAll(".active").forEach(((e6) => {
              e6.classList.remove("active");
            })), t4.classList.add("active"), r2.style.display = "none", setTimeout((() => {
              r2.style.display = "";
            }), 80);
          }, r2 = wt('<ul class="atk-dropdown atk-fade-in"></ul>');
          n3.forEach(((e5, t4) => {
            const [n4, o2] = e5, a2 = wt('<li class="atk-dropdown-item"><span></span></li>'), l2 = a2.querySelector("span");
            l2.innerText = n4, l2.onclick = () => {
              i2(t4, a2, n4, o2);
            }, r2.append(a2), t4 === s2 && a2.classList.add("active");
          })), t3.append(r2);
        })({ $dropdownWrap: e3, dropdownList: [[Ot("sortLatest"), () => {
          t2(((e4) => {
            e4.sort_by = "date_desc";
          }));
        }], [Ot("sortBest"), () => {
          t2(((e4) => {
            e4.sort_by = "vote";
          }));
        }], [Ot("sortOldest"), () => {
          t2(((e4) => {
            e4.sort_by = "date_asc";
          }));
        }], [Ot("sortAuthor"), () => {
          t2(((e4) => {
            e4.view_only_admin = true;
          }));
        }]] });
      };
      e2.watchConf(["listSort", "locale"], ((t3) => {
        const s2 = e2.get("list").$el.querySelector(".atk-comment-count");
        s2 && (t3.listSort ? n2(s2) : (function(e3) {
          var t4, n3;
          const { $dropdownWrap: s3 } = e3;
          s3.classList.remove("atk-dropdown-wrap"), null == (t4 = s3.querySelector(".atk-arrow-down-icon")) || t4.remove(), null == (n3 = s3.querySelector(".atk-dropdown")) || n3.remove();
        })({ $dropdownWrap: s2 }));
      }));
    }, (e2) => {
      let t2 = 0;
      const n2 = ({ locker: n3 }) => {
        const s3 = (function() {
          const e3 = window.location.hash.match(/#atk-comment-([0-9]+)/);
          let t3 = e3 && e3[1] && !Number.isNaN(parseFloat(e3[1])) ? parseFloat(e3[1]) : null;
          t3 || (t3 = Number(xt("atk_comment")));
          return t3 || null;
        })();
        s3 && (n3 && t2 === s3 || (t2 = s3, e2.trigger("list-goto", s3)));
      }, s2 = () => n2({ locker: false }), i2 = () => n2({ locker: true });
      e2.on("mounted", (() => {
        window.addEventListener("hashchange", s2), e2.on("list-loaded", i2);
      })), e2.on("unmounted", (() => {
        window.removeEventListener("hashchange", s2), e2.off("list-loaded", i2);
      }));
    }, (e2) => {
      e2.on("list-goto", ((t2) => h(this, null, (function* () {
        let n2 = e2.getCommentNodes().find(((e3) => e3.getID() === t2));
        if (!n2) {
          const s2 = (yield e2.getApi().comments.getComment(t2)).data;
          e2.get("list").getListLayout({ forceFlatMode: true }).insert(s2.comment, s2.reply_comment), n2 = e2.getCommentNodes().find(((e3) => e3.getID() === t2));
        }
        n2 && n2.focus();
      }))));
    }, (e2) => {
      e2.on("list-loaded", ((t2) => {
        const n2 = e2.get("list"), s2 = t2.length <= 0;
        let i2 = n2.getCommentsWrapEl().querySelector(".atk-list-no-comment");
        s2 ? i2 || (i2 = wt('<div class="atk-list-no-comment"></div>'), i2.innerHTML = ot(n2.ctx.conf.noComment || n2.ctx.$t("noComment")), n2.getCommentsWrapEl().appendChild(i2)) : null == i2 || i2.remove();
      }));
    }, (e2) => {
      e2.on("mounted", (() => {
        const t2 = e2.get("list").$el.querySelector(".atk-copyright");
        t2 && (t2.innerHTML = `Powered By <a href="https://artalk.js.org" target="_blank" title="Artalk v${as}">Artalk</a>`);
      }));
    }, (e2) => {
      let t2 = null;
      e2.on("mounted", (() => {
        t2 = window.setInterval((() => {
          e2.get("list").$el.querySelectorAll("[data-atk-comment-date]").forEach(((t3) => {
            var n2, s2;
            const i2 = new Date(Number(t3.getAttribute("data-atk-comment-date")));
            t3.innerText = (null == (s2 = (n2 = e2.getConf()).dateFormatter) ? void 0 : s2.call(n2, i2)) || St(i2, e2.$t);
          }));
        }), 3e4);
      })), e2.on("unmounted", (() => {
        t2 && window.clearInterval(t2);
      }));
    }, (e2) => {
      e2.on("list-fetch", (() => {
        Kt(e2.get("list").$el, null);
      })), e2.on("list-failed", ((t2) => {
        ls({ $err: e2.get("list").$el, errMsg: t2.msg, errData: t2.data, retryFn: () => e2.fetch({ offset: 0 }) });
      }));
    }, (e2) => {
      let t2 = null;
      const n2 = () => {
        null == t2 || t2.disconnect(), t2 = null;
      };
      e2.on("list-loaded", (() => {
        n2();
        const s2 = e2.get("list").getCommentsWrapEl().childNodes, i2 = s2.length > 2 ? s2[s2.length - 2] : null;
        i2 && ("IntersectionObserver" in window ? ((s3) => {
          const i3 = e2.conf.scrollRelativeTo && e2.conf.scrollRelativeTo() || null;
          t2 = new IntersectionObserver((([t3]) => {
            t3.isIntersecting && (n2(), e2.trigger("list-reach-bottom"));
          }), { threshold: 0.9, root: i3 }), t2.observe(s3);
        })(i2) : console.warn("IntersectionObserver api not supported"));
      })), e2.on("unmounted", (() => {
        n2();
      }));
    }, (e2) => {
      const t2 = () => {
        const t3 = e2.get("list"), n2 = e2.conf.scrollRelativeTo && e2.conf.scrollRelativeTo();
        (n2 || window).scroll({ top: Ct(t3.$el, n2).top, left: 0 });
      };
      e2.on("mounted", (() => {
        e2.on("list-goto-first", t2);
      })), e2.on("unmounted", (() => {
        e2.off("list-goto-first", t2);
      }));
    }], (e2) => {
      e2.on("list-fetch", ((t2) => {
        if (0 !== t2.offset) return;
        const n2 = e2.getApi().getUserFields();
        n2 && e2.getApi().notifies.getNotifies(n2).then(((t3) => {
          e2.getData().updateNotifies(t3.data.notifies);
        }));
      }));
    }, (e2) => {
      e2.watchConf(["site", "pageKey", "pageTitle", "countEl", "pvEl", "statPageKeyAttr"], ((t2) => {
        Kn({ getApi: () => e2.getApi(), siteName: t2.site, pageKey: t2.pageKey, pageTitle: t2.pageTitle, countEl: t2.countEl, pvEl: t2.pvEl, pageKeyAttr: t2.statPageKeyAttr, pvAdd: "boolean" != typeof e2.conf.pvAdd || e2.conf.pvAdd });
      }));
    }, (e2) => {
      e2.watchConf(["apiVersion", "versionCheck"], ((t2) => {
        const n2 = e2.get("list");
        t2.apiVersion && t2.versionCheck && !cs && (function(e3, t3, n3) {
          const s2 = (function(e4, t4) {
            const n4 = e4.split("."), s3 = t4.split(".");
            for (let i3 = 0; i3 < 3; i3++) {
              const e5 = Number(n4[i3]), t5 = Number(s3[i3]);
              if (e5 > t5) return 1;
              if (t5 > e5) return -1;
              if (!Number.isNaN(e5) && Number.isNaN(t5)) return 1;
              if (Number.isNaN(e5) && !Number.isNaN(t5)) return -1;
            }
            return 0;
          })(t3, n3);
          if (0 === s2) return;
          const i2 = wt(`<div class="atk-version-check-notice">${Ot("updateMsg", { name: Ot(s2 < 0 ? "frontend" : "backend") })} <span class="atk-info">${Ot("currentVersion")}: ${Ot("frontend")} ${t3} / ${Ot("backend")} ${n3}</span></div>`), r2 = wt(`<span class="atk-ignore-btn">${Ot("ignore")}</span>`);
          r2.onclick = () => {
            i2.remove(), cs = true;
          }, i2.append(r2), e3.$el.parentElement.prepend(i2);
        })(n2, as, t2.apiVersion);
      }));
    }, (e2) => {
      let t2;
      const n2 = (n3) => {
        const s2 = [e2.$root, e2.get("layerManager").getEl()];
        ds || (ds = window.matchMedia("(prefers-color-scheme: dark)")), "auto" === n3 ? (t2 || (t2 = (e3) => hs(s2, e3.matches), ds.addEventListener("change", t2)), hs(s2, ds.matches)) : (t2 && (ds.removeEventListener("change", t2), t2 = void 0), hs(s2, n3));
      };
      e2.watchConf(["darkMode"], ((e3) => n2(e3.darkMode))), e2.on("created", (() => n2(e2.conf.darkMode))), e2.on("unmounted", (() => {
        t2 && (null == ds || ds.removeEventListener("change", t2)), t2 = void 0;
      }));
    }], ps = /* @__PURE__ */ new Set([...us]), gs = /* @__PURE__ */ new WeakMap();
    function ms(e2) {
      return h(this, null, (function* () {
        var t2;
        const n2 = /* @__PURE__ */ new Set(), s2 = (t3) => {
          t3.forEach(((t4) => {
            "function" != typeof t4 || n2.has(t4) || (t4(e2, gs.get(t4)), n2.add(t4));
          }));
        };
        s2(ps);
        const { data: i2 } = yield e2.getApi().conf.conf().catch(((t3) => {
          throw (function(e3, t4) {
            var n3;
            let s3 = "";
            if (null == (n3 = t4.data) ? void 0 : n3.err_no_site) {
              const t5 = { create_name: e3.conf.site, create_urls: `${window.location.protocol}//${window.location.host}` };
              s3 = `sites|${JSON.stringify(t5)}`;
            }
            ls({ $err: e3.get("list").$el, errMsg: t4.msg || String(t4), errData: t4.data, retryFn: () => ms(e3), onOpenSidebar: e3.get("user").getData().is_admin ? () => e3.showSidebar({ view: s3 }) : void 0 });
          })(e2, t3), t3;
        }));
        let r2 = { apiVersion: null == (t2 = i2.version) ? void 0 : t2.version };
        if (e2.conf.useBackendConf) {
          if (!i2.frontend_conf) throw new Error("The remote backend does not respond to the frontend conf, but `useBackendConf` conf is enabled");
          r2 = l(l({}, r2), (function(e3) {
            const t3 = ["el", "pageKey", "pageTitle", "server", "site", "pvEl", "countEl", "statPageKeyAttr"];
            return Object.keys(e3).forEach(((n3) => {
              t3.includes(n3) && delete e3[n3], "darkMode" === n3 && "auto" !== e3[n3] && delete e3[n3];
            })), e3.emoticons && "string" == typeof e3.emoticons && (e3.emoticons = e3.emoticons.trim(), e3.emoticons.startsWith("[") || e3.emoticons.startsWith("{") ? e3.emoticons = JSON.parse(e3.emoticons) : "false" === e3.emoticons && (e3.emoticons = false)), e3;
          })(i2.frontend_conf));
        }
        e2.conf.remoteConfModifier && e2.conf.remoteConfModifier(r2), r2.pluginURLs && (yield (function(e3, t3) {
          return h(this, null, (function* () {
            const n3 = /* @__PURE__ */ new Set();
            if (!e3 || !Array.isArray(e3)) return n3;
            const s3 = [];
            return e3.forEach(((e4) => {
              /^(http|https):\/\//.test(e4) || (e4 = `${t3.replace(/\/$/, "")}/${e4.replace(/^\//, "")}`), s3.push(new Promise(((t4) => {
                if (document.querySelector(`script[src="${e4}"]`)) return void t4();
                const n4 = document.createElement("script");
                n4.src = e4, document.head.appendChild(n4), n4.onload = () => t4(), n4.onerror = (e5) => {
                  console.error("[artalk] Failed to load plugin", e5), t4();
                };
              })));
            })), yield Promise.all(s3), Object.values(window.ArtalkPlugins || {}).forEach(((e4) => {
              "function" == typeof e4 && n3.add(e4);
            })), n3;
          }));
        })(r2.pluginURLs, e2.conf.server).then(((e3) => {
          s2(e3);
        })).catch(((e3) => {
          console.error("Failed to load plugin", e3);
        }))), e2.trigger("created"), e2.updateConf(r2), e2.trigger("mounted"), e2.conf.remoteConfModifier || e2.fetch({ offset: 0 });
      }));
    }
    class fs {
      constructor(e2) {
        d(this, "ctx");
        const t2 = jt(e2, true);
        this.ctx = new zt(t2), Object.entries(Gn).forEach((([e3, t3]) => {
          const n2 = t3(this.ctx);
          n2 && this.ctx.inject(e3, n2);
        })), ms(this.ctx);
      }
      getConf() {
        return this.ctx.getConf();
      }
      getEl() {
        return this.ctx.$root;
      }
      update(e2) {
        return this.ctx.updateConf(e2), this;
      }
      reload() {
        this.ctx.reload();
      }
      destroy() {
        for (this.ctx.trigger("unmounted"); this.ctx.$root.firstChild; ) this.ctx.$root.removeChild(this.ctx.$root.firstChild);
      }
      on(e2, t2) {
        this.ctx.on(e2, t2);
      }
      off(e2, t2) {
        this.ctx.off(e2, t2);
      }
      trigger(e2, t2) {
        this.ctx.trigger(e2, t2);
      }
      setDarkMode(e2) {
        this.ctx.setDarkMode(e2);
      }
      static init(e2) {
        return new fs(e2);
      }
      static use(e2, t2) {
        ps.add(e2), gs.set(e2, t2);
      }
      static loadCountWidget(e2) {
        const t2 = jt(e2, true);
        Kn({ getApi: () => new f(Ft(t2)), siteName: t2.site, countEl: t2.countEl, pvEl: t2.pvEl, pageKeyAttr: t2.statPageKeyAttr, pvAdd: false });
      }
      get $root() {
        return this.ctx.$root;
      }
      get conf() {
        return this.ctx.getConf();
      }
    }
    const ks = fs.init, ys = fs.use, $s = fs.loadCountWidget;
    e.default = fs, e.init = ks, e.loadCountWidget = $s, e.use = ys, Object.defineProperties(e, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  }));
})();
