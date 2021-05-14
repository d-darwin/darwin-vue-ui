/**
 * Returns true if it is a DOM element
 * @param o
 * @returns {boolean}
 */
export default function isHTMLElement(o) {
  return typeof HTMLElement === "object"
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === "object" &&
        true &&
        o.nodeType === 1 &&
        typeof o.nodeName === "string";
}
