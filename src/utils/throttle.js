/**
 * Simple implementation of the throttle technique
 *  which doesn't allow to our function to execute more than once every X milliseconds.
 * See example usage in '@dariwn-studio/ui-vue/compositions/windowSize.js'.
 *
 * @param func
 * @param ms
 * @returns {function(): undefined}
 */
export default function throttle(func, ms) {
  // TODO: move to compositions ???
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
