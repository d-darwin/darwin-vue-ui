/**
 * Returns true if it is a DOM element
 * @param obj
 * @returns {boolean}
 */
export default function isHTMLElement(obj) {
  return typeof HTMLElement === "object"
    ? obj instanceof HTMLElement //DOM2
    : obj &&
        typeof obj === "object" &&
        true &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === "string";
}
