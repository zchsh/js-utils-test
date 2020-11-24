/**
 * Mitigate widows at the end of a string, replacing spaces with &nbsp;
 * @param {string} string - The string to modify
 * @param {number} [unbreakLimit = 12] - Unbreakable end part won't exceed this length
 * @returns {string} - String with unbreakable end part
 */
function mitigateWidows(string, unbreakLimit = 12) {
  const parts = string.split(" ");
  //  Reversing the parts makes them easier to work with,
  //  since we're starting from the end of the string
  const reversedParts = parts.reduce((acc, part) => {
    acc.unshift(part);
    return acc;
  }, []);
  //  Set up arrays for the breakable parts (at the start of the string)
  //  and the unbreakable parts (at the end of the string)
  let breakableParts = [];
  let unbreakableParts = [];
  reversedParts.forEach((part) => {
    //  nextLength is how long the unbreakableParts would be
    //  if we were to add this part
    const nextLength = [part].concat(unbreakableParts).join(" ").length;
    //  the unbreakLimit has been exceeded if nextLength is too long,
    //  or if breakableParts already has items (ie we exceeded the limit earlier)
    const limitExceeded = nextLength > unbreakLimit || breakableParts.length;
    //  We're already working through items in reverse order;
    //  we use `unshift` to add to our "parts" arrays
    //  so they're built up back in their original order
    if (limitExceeded) {
      breakableParts.unshift(part);
    } else {
      unbreakableParts.unshift(part);
    }
  });
  //  Assemble the breakable and unbreakable parts into strings
  const breakString = breakableParts.join(" ");
  const unbreakString = unbreakableParts.join("&nbsp;");
  //  It's possible that either breakString and unbreakString are empty;
  //  we need to filter out empty strings before joining to avoid extra spaces
  return [breakString, unbreakString].filter((s) => s !== "").join(" ");
}

module.exports = mitigateWidows;
