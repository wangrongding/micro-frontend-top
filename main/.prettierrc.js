/**
 * 参考 https://prettier.io/docs/en/options.html
 */
module.exports = {
    printWidth: 100, // 换行的宽度
    tabWidth: 4, // 空格数
    useTabs: false, // 是否开启tab
    semi: true, // 是否在语句末尾打印分号
    singleQuote: false, // 是否使用单引号
    quoteProps: "as-needed", // 对象的key仅在需要时用引号
    jsxSingleQuote: false, // 在JSX中是否使用单引号
    trailingComma: "es5", // 多行时尽可能打印尾随逗号
    bracketSpacing: true, // 对象文字中的括号之间打印空格
    jsxBracketSameLine: false,
    arrowParens: "always",
    // rangeStart: 0,
    // rangeEnd: Infinity,
    // parser: "",
    // filepath: "",
    // requirePragma: false,
    // insertPragma: false,
    // proseWrap: "presserve",
    htmlWhitespaceSensitivity: "ignore", // html中换行规则
    vueIndentScriptAndStyle: false, // vue中script与style里的第一条语句是否空格
    endOfLine: "crlf", // 换行符
    embeddedLanguageFormatting: "auto",
};
