/**
 * Eliminate orphans from the end of a string, replacing spaces with &nbsp;
 * @param {string} string - The string to be de-orphaned
 * @param {string} [count = 12] - Total char count from end of string in which to replace spaces
 */
function eliminateOrphans(string, count) {
  const charArray = string.split(""),
    charArrayEnd = charArray.splice(-(count || 12)).map((char) => {
      return char.match(/\s/) ? "&nbsp;" : char;
    });

  return charArray.concat(charArrayEnd).join("");
}

module.exports = eliminateOrphans;
