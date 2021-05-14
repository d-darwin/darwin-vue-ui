/**
 * Returns true if it is a DOM node
 * @param o
 * @returns {boolean}
 */
export default function isHTMLNode(o) {
  return typeof Node === "object"
    ? o instanceof Node
    : o &&
        typeof o === "object" &&
        typeof o.nodeType === "number" &&
        typeof o.nodeName === "string";
}
