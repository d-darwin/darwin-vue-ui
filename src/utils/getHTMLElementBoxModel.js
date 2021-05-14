import isHTMLElement from "./isHTMLElement";

/**
 * Return current sizes and margins of the tooltipElement.
 * @param tooltipElement
 * @returns {{
 *  offsetHeight: number,
        offsetWidth: number,
        marginTop: number,
        marginRight: number,
        marginBottom: number,
        marginLeft: number} || {}}
 */
export default function(tooltipElement) {
  let tooltipBoxModel = {};
  if (isHTMLElement(tooltipElement)) {
    const {
      marginBottom,
      marginTop,
      marginLeft,
      marginRight
    } = getComputedStyle(tooltipElement);

    tooltipBoxModel = {
      offsetHeight: tooltipElement.offsetHeight,
      offsetWidth: tooltipElement.offsetWidth,
      marginTop: parseFloat(marginTop),
      marginRight: parseFloat(marginRight),
      marginBottom: parseFloat(marginBottom),
      marginLeft: parseFloat(marginLeft)
    };
  }

  return tooltipBoxModel;
}
