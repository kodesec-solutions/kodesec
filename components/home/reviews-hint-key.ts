/** sessionStorage key for a dismissed reviews hint, shared by the hint and the pre-paint script. */
export const HINT_KEY = "kd-reviews-hint-closed";

/** Runs in <head> before paint: hides the reviews hint (html.kd-hint-off) if it was dismissed this session. */
export const HINT_SCRIPT = `try{sessionStorage.getItem('${HINT_KEY}')&&document.documentElement.classList.add('kd-hint-off')}catch(e){}`;
