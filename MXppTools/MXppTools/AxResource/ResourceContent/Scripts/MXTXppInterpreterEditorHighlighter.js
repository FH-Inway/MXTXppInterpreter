var keywords = [
    "if",
    "else",
    "while",
    "do",
    "for",
    "break",
    "breakpoint",
    "continue",
    "null",
    "throw",
    "switch",
    "case",
    "default",
    "new",
    "ttsbegin",
    "ttscommit",
    "ttsabort",
    "select",
    "from",
    "next",
    "where",
    "exists",
    "notexists",
    "join",
    "outer",
    "on",
    "group",
    "order",
    "by",
    "desc",
    "asc",
    "sum",
    "avg",
    "maxof",
    "minof",
    "count",
    "update_recordset",
    "insert_recordset",
    "delete_recordset",
    "setting",
    "firstfast",
    "firstonly",
    "firstonly10",
    "firstonly100",
    "firstonly1000",
    "forceliterals",
    "forcenestedloops",
    "forceselectorder",
    "forupdate",
    "nofetch",
    "optimisticlock",
    "pessimisticlock",
    "repeatableread",
    "reverse",
    "validtimestate",
    "changecompany",
    "crosscompany",
    "generateonly",
    "index",
    "var",
    "container",
    "date",
    "utcdatetime",
    "int",
    "real",
    "str",
    "boolean",
    "in",
    "like"
];

var keywordString = keywords.join("|");

ace.define('ace/mode/xpp', function (require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextMode = require("./text").Mode;
    var Tokenizer = require("ace/tokenizer").Tokenizer;
    this.HighlightRules = require("ace/mode/xpp_highlight_rules").CustomScriptHighlightRules;

    var Mode = function () {
        this.$tokenizer = new Tokenizer(new HighlightRules().getRules());
    };
    oop.inherits(Mode, TextMode);

    exports.Mode = Mode;
});

ace.define('ace/mode/xpp_highlight_rules', function (require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var CustomScriptHighlightRules = function () {
        
    var keywordMapper = this.createKeywordMapper({
            "keyword": keywordString,
            "constant.language": "null|true|false"
        },
        "identifier",
        true /* Ignore case */);

        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: "\\/\\/.*$"
                },
                {
                    token: "comment", // multi line comment
                    regex: "\\/\\*",
                    next: "comment"
                }, {
                    token: "string", // character
                    regex: /'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/
                }, {
                    token: "string", start: '"', end: '"|$', next: [
                        { token: "constant.language.escape", regex: /\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/ },
                        { token: "invalid", regex: /\\./ }
                    ]
                }, {
                    token: "string", start: /\$"/, end: '"|$', next: [
                        { token: "constant.language.escape", regex: /\\(:?$)|{{/ },
                        { token: "constant.language.escape", regex: /\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/ },
                        { token: "invalid", regex: /\\./ }
                    ]
                }, {
                    token: "constant.numeric", // hex
                    regex: "0[xX][0-9a-fA-F]+\\b"
                }, {
                    token: "constant.numeric", // float
                    regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                }, {
                    token: "constant.language.boolean",
                    regex: "(?:true|false)\\b"
                }, {
                    token: keywordMapper,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                    token: "keyword.operator",
                    regex: "!|%|div|\\*|\\-\\-|\\-|\\+\\+|\\+|=|==|!=|<=|>=|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:new)"
                }, {
                    token: "keyword",
                    regex: "^\\s*#(if|else)"
                }, {
                    token: "punctuation.operator",
                    regex: "\\?|\\:|\\,|\\;|\\."
                }, {
                    token: "paren.lparen",
                    regex: "[[({]"
                }, {
                    token: "paren.rparen", 
                    regex: "[\\])}]"
                }, {
                    token: "text",
                    regex: "\\s+"
                }
            ],
            "comment": [
                {
                    token: "comment", // closing comment
                    regex: "\\*\\/",
                    next: "start"
                }, {
                    defaultToken: "comment"
                }
            ]
        };
    };

    oop.inherits(CustomScriptHighlightRules, TextHighlightRules);

    exports.CustomScriptHighlightRules = CustomScriptHighlightRules;
});