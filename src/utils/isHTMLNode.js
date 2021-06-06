/**
 * Returns true if it is a DOM node
 * @param obj
 * @returns {boolean}
 */
export default function isHTMLNode(obj) {
  return typeof Node === "object"
    ? obj instanceof Node
    : obj &&
        typeof obj === "object" &&
        typeof obj.nodeType === "number" &&
        typeof obj.nodeName === "string";
}
