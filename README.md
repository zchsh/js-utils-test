# Overview

This repo is a quick reproduction of minor nit-picky issues with a small javascript utility used to mitigate windows<sup id="a1">[1](#f1)</sup>.

The difference between `mitigateWidows` and `eliminateOrphans` can be illustrated by running the tests contained in this repo:

1. Clone this repo
2. Run `npm i`
3. Run `npm test`

Further details below...

---

The rationale for adopting the more complex `mitigateWidows` function is that it handles relatively common "edge case" where there are multiple long words at the end of a string of text (such as a headline or paragraph).

## Example

```
Some headline with the words infrastructure automation
```

### Result with `eliminateOrphans`

In this case, the straightforward approach in `eliminateOrphans` of replacing all spaces in the last 12 characters of the word results in a very long "unbreakable" string at the end of the headline. This can result in headlines which overflow the edge of smaller viewports, breaking our layouts.

For example, the last part of the headline above becomes `infrastructure&nbsp;automation`, and we get:

```
| -- viewport -- |
| Some headline  |
| with the words |
| infrastructure |automation  <-- "unbroken" word is long, and overflows
```

### Result with `mitigateWidows`

The `mitigateWidows` function works a bit differently than `eliminateOrphans`. It uses its second argument, named `unbreakLimit`, to set the limit for the **longest unbroken string the layout can tolerate**.

This is similar to what a designer might do when typesetting. In the case of a headline with a large point size, we can only tolerate a relatively short unbroken "word" at the end of the string, otherwise it risks overflowing the layout. But, we still want to ensure very short words like at the end of a headline are grouped together (for example, `as code` should become `as&nbsp;code`).

So, the `mitigateWidows` function works by making the "unbreakable" part at the end of the string as long as possible, _without exceeding_ the `unbreakLimit`. By default, the `unbreakLimit` is 12.

This way, we protect against layout-breaking headline overflows, while safely prevent smaller word groups from being "alone at the end" of a headline or paragraph:

```
| -- viewport -- |
| Some headline  |
| with the words |
| infrastructure |
| automation     |
```

Admittedly, the function as it is is rather complex, and could likely be cleaned up or rewritten in a clearer way. However, it does provide different functionality, so the complexity may be worth it as it likely means avoiding broken layouts.

---

<sup id="f1">[1](#a1)</sup> Note: it seems the definitions of [widows and orphans](https://en.wikipedia.org/wiki/Widows_and_orphans) are, for some reason, relatively ill-defined and not really agreed upon, even within the design community. This is likely somewhat attributable to differences in whether people see layouts as sets of "strings" or sets of "lines of text".

Personally I think of layouts as sets of "strings" - each string renders a headline, a paragraph, a label, and so on. I find the mnemonic `An orphan is alone from the beginning; a widow is alone at the end` to be helpful. With these interpretations, a `widow` is a short word group that is `alone at the end` of a string<sup id="a2">[2](#f2)</sup>. The functions in question here replace spaces with `&nbsp;` near the `end` of a string. So, it felt intuitive to use the term `window`.

<sup id="f2">[2](#a2)</sup> Admittedly, this entire rational can be flipped on its head by looking at a layout as a "set of lines". With this perspective, we're actually dealing with short word groups that are "alone at the beginning" of a line, so one might argue they should therefore be called "orphans"... But 🤷‍♂️... naming things is hard!
