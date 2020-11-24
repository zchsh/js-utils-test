/**
 * Mitigate widows at the end of a string, replacing spaces with &nbsp;
 * @param {string} string - The string to modify
 * @param {string} [unbreakLimit = 12] - Unbroken part won't exceed this length
 * @returns {string} - String with final spaces up to unbreakLimit replaced
 */
function mitigateWidows(string, unbreakLimit = 12) {
  const parts = string.split(" ");
  const reversedParts = parts.reduce((acc, part) => {
    acc.unshift(part);
    return acc;
  }, []);
  const { breakGroup, unbreakGroup } = reversedParts.reduce(
    (acc, part) => {
      const { breakGroup, unbreakGroup } = acc;
      const newUnbreakLen = [part].concat(unbreakGroup).join(" ").length;
      const limitExceeded = breakGroup.length || newUnbreakLen > unbreakLimit;
      if (limitExceeded) {
        breakGroup.unshift(part);
      } else {
        unbreakGroup.unshift(part);
      }
      return acc;
    },
    { breakGroup: [], unbreakGroup: [] }
  );
  const breakString = breakGroup.join(" ");
  const unbreakString = unbreakGroup.join("&nbsp;");
  const bothNonEmpty = breakString && unbreakString;
  return [breakString, unbreakString].join(bothNonEmpty ? " " : "");
}

module.exports = mitigateWidows;
