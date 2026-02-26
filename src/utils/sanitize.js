/**
 * sanitize.js
 * Strips all HTML tags except safe inline formatting ones.
 * Use before any dangerouslySetInnerHTML to prevent XSS.
 */

const ALLOWED_TAGS = /^(b|i|em|strong|span|u|mark|code)$/i;

export function sanitize(html) {
  if (!html || typeof html !== 'string') return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  tmp.querySelectorAll('*').forEach(el => {
    if (!ALLOWED_TAGS.test(el.tagName)) {
      el.replaceWith(document.createTextNode(el.textContent));
    }
  });
  return tmp.innerHTML;
}
