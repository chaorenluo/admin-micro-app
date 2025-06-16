module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2022,
    sourceType: "module"
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    camelcase: "off",
    eqeqeq: "off",
    quotes: "off",
    semi: ["error", "always"],
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    "no-prototype-builtins": "off",
    "standard/no-callback-literal": "off",
    "prefer-promise-reject-errors": "off",
    "space-before-function-paren": ["error", "never"],
    "no-new": "off",
    "no-mixed-operators": "off",
    "no-useless-escape": "off",
    // "quote-props": "off",

    "vue/singleline-html-element-content-newline": "off",
    'vue/script-setup-uses-vars': 'error',
    "vue/max-attributes-per-line": 'off',
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "vue/no-v-html": "off"

    // "vue/component-tags-order": ["error", {
    //   order: [["template", "style"], "script"]
    // }]
  },
  globals: {

    useRoute: "readonly",
    useRouter: "readonly",
    isVue2: "readonly",
    isVue3: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    defineProps: "readonly",
    withCtx: "readonly",
    withDefaults: "readonly",
    withDirectives: "readonly",
    withKeys: "readonly",
    withMemo: "readonly",
    withModifiers: "readonly",
    withScopeId: "readonly",
    onActivated: "readonly",
    onBeforeMount: "readonly",
    onBeforeUnmount: "readonly",
    onBeforeUpdate: "readonly",
    onDeactivated: "readonly",
    onErrorCaptured: "readonly",
    onMounted: "readonly",
    onBeforeRouteLeave: "readonly",
    onRenderTracked: "readonly",
    onRenderTriggered: "readonly",
    onServerPrefetch: "readonly",
    onUnmounted: "readonly",
    onUpdated: "readonly",
    computed: "readonly",
    customRef: "readonly",
    isProxy: "readonly",
    isReactive: "readonly",
    isReadonly: "readonly",
    isRef: "readonly",
    markRaw: "readonly",
    proxyRefs: "readonly",
    reactive: "readonly",
    readonly: "readonly",
    ref: "readonly",
    shallowReactive: "readonly",
    shallowReadonly: "readonly",
    shallowRef: "readonly",
    stop: "readonly",
    toRaw: "readonly",
    toRef: "readonly",
    toRefs: "readonly",
    triggerRef: "readonly",
    unref: "readonly",
    watch: "readonly",
    watchEffect: "readonly",
    effect: "readonly",
    effectScope: "readonly",
    getCurrentScope: "readonly",
    onScopeDispose: "readonly",
    defineComponent: "readonly",
    defineAsyncComponent: "readonly",
    getCurrentInstance: "readonly",
    h: "readonly",
    inject: "readonly",
    nextTick: "readonly",
    provide: "readonly",
    useAttrs: "readonly",
    useCssModule: "readonly",
    useCssVars: "readonly",
    useSlots: "readonly"
  }
};
