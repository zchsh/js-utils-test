const eliminateOrphans = require("./eliminate-orphans");

describe("eliminateOrphans", () => {
  test("returns an empty string unmodified", () => {
    expect(eliminateOrphans("")).toBe("");
  });

  test("does not modify a string with no spaces", () => {
    expect(eliminateOrphans("thisIsAStringWithNoSpaces")).toBe(
      "thisIsAStringWithNoSpaces"
    );
  });

  test("replaces the last space in a basic example", () => {
    expect(eliminateOrphans("This is a basic widow.")).toBe(
      "This is a basic&nbsp;widow."
    );
  });

  test("does not replace a space between a long word and short widow.", () => {
    expect(
      eliminateOrphans("Some headline with the words infrastructure code")
    ).toBe("Some headline with the words infrastructure code");
  });

  test("does not replace a space between a long word and long widow.", () => {
    expect(
      eliminateOrphans("Some headline with the words infrastructure automation")
    ).toBe("Some headline with the words infrastructure automation");
  });
});
