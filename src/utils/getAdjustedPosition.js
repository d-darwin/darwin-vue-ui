import getHTMLElementBoxModel from "./getHTMLElementBoxModel";
import getOppositePosition from "./getOppositePosition";

/**
 * Adjust position of the tooltip component if there is no space for default (user defined) position
 *
 * @param elementContainer
 * @param element
 * @param windowWidth
 * @param windowHeight
 * @param defaultHorizontalPosition
 * @param defaultVerticalPosition
 * @returns {{}}
 */
export default function(
  elementContainer,
  element,
  windowWidth,
  windowHeight,
  defaultHorizontalPosition,
  defaultVerticalPosition
) {
  const adjustedPosition = {};

  const elementContainerClientRect =
    elementContainer.value && elementContainer.value.getBoundingClientRect();

  if (elementContainerClientRect) {
    // hold how many space there is around the container
    const elementContainerClientSpace = {
      top: elementContainerClientRect.top,
      right: windowWidth.value - elementContainerClientRect.right,
      bottom: windowHeight.value - elementContainerClientRect.bottom,
      left: elementContainerClientRect.left
    };

    // hold size and margin of the element
    const elementBoxModel = getHTMLElementBoxModel(
      element.value && element.value.$el
    );
    const spaceForTooltip = {
      top: elementBoxModel.offsetHeight + elementBoxModel.marginBottom,
      right: elementBoxModel.offsetWidth + elementBoxModel.marginLeft,
      bottom: elementBoxModel.offsetHeight + elementBoxModel.marginTop,
      left: elementBoxModel.offsetWidth + elementBoxModel.marginRight
    };

    adjustedPosition.vertical = getAdjustedAxePosition(
      elementContainerClientSpace,
      spaceForTooltip,
      defaultVerticalPosition
    );
    adjustedPosition.horizontal = getAdjustedAxePosition(
      elementContainerClientSpace,
      spaceForTooltip,
      defaultHorizontalPosition
    );
  }

  return adjustedPosition;
}

function getAdjustedAxePosition(
  elementContainerClientSpace,
  spaceForTooltip,
  axeDefaultPosition
) {
  if (axeDefaultPosition) {
    const oppositeAxePosition = getOppositePosition(axeDefaultPosition);

    if (
      elementContainerClientSpace[axeDefaultPosition] >
      spaceForTooltip[axeDefaultPosition]
    ) {
      // there is enough space in the default position (user defined)
      return axeDefaultPosition;
    } else if (
      elementContainerClientSpace[oppositeAxePosition] >
      spaceForTooltip[oppositeAxePosition]
    ) {
      // there is in the opposite position
      return oppositeAxePosition;
    }
  }

  // there in no space at all => remove axe positioning (center)
  return "";
}
