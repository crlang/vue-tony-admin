module.exports = {
  extends: [
    'stylelint-config-html/html',
    'stylelint-config-html/vue',
    'stylelint-config-recommended-vue',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
    'css-properties-sorting',
  ],
  overrides: [
    {
      files: ['*.html', '**/*.html', '*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  plugins: ['stylelint-scss', 'stylelint-order'], // stylelint-order是CSS属性排序插件
  rules: {
    'scss/at-import-partial-extension': 'always', // 允许 sass @import
    'color-hex-case': 'lower', // 颜色值为小写字母
    'color-no-invalid-hex': true, // 颜色值不能为无效值
    'font-family-name-quotes': 'always-unless-keyword', // 字体系列中命名时带引号
    'function-url-quotes': 'always', // 地址一定要写引号
    'number-leading-zero': 'always', // 要求或分数低于1的数字需要前导零
    'number-no-trailing-zeros': true, // 禁止在数量尾随零
    'string-quotes': 'single', // 指定字串，单引号
    'length-zero-no-unit': true, // 禁止单位零长度。
    'value-keyword-case': 'lower', // 指定小写关键字的值
    // 'value-list-comma-newline-after': 'always-multi-line', // 在值列表的逗号后指定一个换行符或禁止留有空格
    'shorthand-property-no-redundant-values': true, // 不允许在简写属性冗余值
    // "property-case": "lower", // 为属性指定小写
    'keyframe-declaration-no-important': true, // 不允许!important在关键帧声明
    'declaration-colon-space-after': 'always', // 冒号后的声明需要一个空格
    'declaration-colon-space-before': 'never', // 冒号之前的声明不允许空白
    'custom-property-empty-line-before': 'never', // 禁止在自定义属性之前有一行空行
    // "block-closing-brace-empty-line-before": "never", // 不允许关闭括号前空一行
    // "block-closing-brace-newline-after": "always", // 需要一个换行符关闭括号后的空白
    // "block-opening-brace-newline-after": "always-multi-line", // 开括号的块之后需要新的一行
    'selector-class-pattern': '^[a-z-]+([a-z0-9]?|[a-z0-9\\-\\_]*[a-z0-9])$', // 指定一个模式class选择符，限制选择器名称写法
    'selector-id-pattern': '^[a-z]+([a-z0-9]?|[a-z0-9\\-\\_]*[a-z0-9])$', // 指定一个模式id选择器，限制选择器名称写法
    'no-empty-source': null, // 不允许空的来源
    'no-descending-specificity': true, // 禁止低优先级的选择器出现在高优先级的选择器之后
    'keyframes-name-pattern': null, // 不校验 keyframes 名称
    'color-function-notation': 'legacy', // 使用旧legacy(新/modern)版颜色规则
    'unit-no-unknown': true, // 禁止未知的单位
    indentation: 2, // 指定缩进
    'max-nesting-depth': 4, // 允许嵌套的深度为4
    'max-empty-lines': 1, // 限制方法中相邻的空行数
    'no-duplicate-selectors': true, // 不允许重复的选择器
    'no-eol-whitespace': true, // 不允许行尾空白
    'no-invalid-double-slash-comments': null, // 不允许双斜杠注释(/ /…)不支持CSS
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep', 'slotted'],
      },
    ], // 不允许未知的伪类选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ], // 不允许未知的伪元素选择器
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'for',
          'include',
          'mixin',
          'use',
        ],
      },
    ], // 不允许未知的 @rule
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ], // 需要 @rules 前空一行
    'order/order': [
      [
        // 'at-rules',
        'dollar-variables',
        'custom-properties',
        // 'declarations',
        // {
        //   type: 'at-rule',
        //   name: 'supports',
        // },
        // {
        //   type: 'at-rule',
        //   name: 'media',
        // },
        // 'rules',
      ],
      { severity: 'warning' },
    ], // 指定声明块内的内容顺序
    'order/properties-order': [

      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak',
    ],
  }, // 指定声明块内属性的顺序
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'], // 忽略校验指定类型文件
}
