import * as P from 'ts-prime'

require("./beautify.js")
const hls = require('highlight.js')

import marked from 'marked'
import "highlight.js/styles/github.css"

export function renderMarkdown(content: string) {
    return marked.setOptions({
        highlight: function (code, lang) {
            const res = P.canFail(() => hls.highlight(lang, code).value)
            if (P.isError(res)) {
                console.log(res)
                return code
            }

            return res
        }
    })(content)
}


export function beautify(code: string): string {
    return (window as any).js_beautify(code, {
        "indent_size": "4",
        "indent_char": " ",
        "max_preserve_newlines": "5",
        "preserve_newlines": true,
        "keep_array_indentation": false,
        "break_chained_methods": false,
        "indent_scripts": "normal",
        "brace_style": "collapse",
        "space_before_conditional": true,
        "unescape_strings": false,
        "jslint_happy": false,
        "end_with_newline": false,
        "wrap_line_length": "200",
        "indent_inner_html": false,
        "comma_first": false,
        "e4x": false,
        "indent_empty_lines": false
    })
}