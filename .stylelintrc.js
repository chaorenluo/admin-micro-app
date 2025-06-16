module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss","stylelint-config-recess-order"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "mixin",
          "extend",
          "content",
          "include",
          "for",
          "function",
          "return",
        ],
      },
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["export"],
      },
    ],
    indentation: 2,
    "no-descending-specificity": null,
    "declaration-colon-newline-after": null,
    "declaration-block-semicolon-space-after": "always-single-line",
    "rule-empty-line-before": "never",
    "selector-list-comma-newline-after": "always-multi-line",
    "declaration-block-single-line-max-declarations": 1,
    "number-leading-zero": "never",
    "keyframes-name-pattern": null,
    "selector-id-pattern": null, 
    "selector-class-pattern": null,
    "scss/double-slash-comment-whitespace-inside": null,
    "at-rule-no-unknown": null,
    "scss/operator-no-unspaced": null,
    "scss/at-mixin-pattern": null,
    "selector-pseudo-element-no-unknown": null,
    "scss/dollar-variable-pattern": null,
    "at-rule-no-vendor-prefix": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "selector-no-vendor-prefix": null,
    "scss/at-import-partial-extension": null,
    "font-family-no-missing-generic-family-keyword": null,
    "function-linear-gradient-no-nonstandard-direction": null,
    "property-no-vendor-prefix": null,
    "shorthand-property-no-redundant-values": null,
    "declaration-block-no-redundant-longhand-properties":null
  },
  ignoreFiles: ["**/*.js"],
};