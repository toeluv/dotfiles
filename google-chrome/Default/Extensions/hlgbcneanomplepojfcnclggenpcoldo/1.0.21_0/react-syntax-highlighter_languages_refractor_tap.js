"use strict";(self.webpackChunkperplexity_extension=self.webpackChunkperplexity_extension||[]).push([[6975],{75651:a=>{function e(a){a.languages.tap={fail:/not ok[^#{\n\r]*/,pass:/ok[^#{\n\r]*/,pragma:/pragma [+-][a-z]+/,bailout:/bail out!.*/i,version:/TAP version \d+/i,plan:/\d+\.\.\d+(?: +#.*)?/,subtest:{pattern:/# Subtest(?:: .*)?/,greedy:!0},punctuation:/[{}]/,directive:/#.*/,yamlish:{pattern:/(^[^\S\r\n]*)---(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?[^\S\r\n]*\.\.\.$/m,lookbehind:!0,inside:a.languages.yaml,alias:"language-yaml"}}}a.exports=e,e.displayName="tap",e.aliases=[]}}]);