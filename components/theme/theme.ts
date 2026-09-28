/**
 * Theme preference: "light" | "dark" | "system". The resolved theme lives on <html data-theme>.
 * THEME_SCRIPT runs in <head> before paint (no flash); setThemePref() is used by the toggle.
 */

export type ThemePref = "light" | "dark" | "system";
export const THEME_KEY = "kodesec-theme";
export const THEME_EVENT = "kodesec:theme";

export const THEME_SCRIPT = `(function(){try{var k='${THEME_KEY}',p=localStorage.getItem(k);if(p!=='light'&&p!=='dark')p='system';var m=window.matchMedia('(prefers-color-scheme: light)');var a=function(){var t=p==='system'?(m.matches?'light':'dark'):p;var r=document.documentElement;r.setAttribute('data-theme',t);r.setAttribute('data-theme-pref',p);r.style.colorScheme=t;};a();window.__kdTheme={get:function(){return p},set:function(n){p=n;try{localStorage.setItem(k,n)}catch(e){}a();window.dispatchEvent(new Event('${THEME_EVENT}'))}};m.addEventListener&&m.addEventListener('change',function(){if(p==='system'){a();window.dispatchEvent(new Event('${THEME_EVENT}'))}});}catch(e){}})();`;

type ThemeApi = { get: () => ThemePref; set: (p: ThemePref) => void };

export function getThemePref(): ThemePref {
  const api = (window as unknown as { __kdTheme?: ThemeApi }).__kdTheme;
  return api?.get() ?? "system";
}

export function setThemePref(pref: ThemePref) {
  const api = (window as unknown as { __kdTheme?: ThemeApi }).__kdTheme;
  const root = document.documentElement;
  root.classList.add("theme-anim");
  api?.set(pref);
  window.setTimeout(() => root.classList.remove("theme-anim"), 300);
}

export function subscribeTheme(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}
