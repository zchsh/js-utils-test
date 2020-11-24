const eliminateOrphans = require("./eliminate-orphans");
const mitigateWidows = require("./mitigate-widows");

const string1 = "Some headline with the words infrastructure as code";
const string2 = "Some headline with the words infrastructure automation";

/**
 * eliminateOrphan's implementation is simpler,
 * but it can result in long unbreakable strings
 */
console.log(eliminateOrphans(string1));
// "Some headline with the words infrastructure&nbsp;as&nbsp;code"
console.log(eliminateOrphans(string2));
// "Some headline with the words infrastructure&nbsp;automation"

/**
 * mitigateWidows' implementation is more complex,
 * but it protects against long unbreakable strings,
 * while still mitigating small words that end up
 * "alone at the end" of strings
 */
console.log(mitigateWidows(string1));
// "Some headline with the words infrastructure as&nbsp;code"
console.log(mitigateWidows(string2));
// "Some headline with the words infrastructure automation"
