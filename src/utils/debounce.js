/**
 * Simple implementation of the debounce technique
 *  which allows us to “group” multiple sequential calls in a single one after X milliseconds of “silence“.
 *
 * @param func
 * @param ms
 * @returns {function(): undefined}
 */
export default function debounce(func, ms) {
  // TODO: move to compositions ???
  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    func.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
}
