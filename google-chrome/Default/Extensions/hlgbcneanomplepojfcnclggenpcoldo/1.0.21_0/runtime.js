(()=>{"use strict";var r,a,e,t,g,h={},_={};function i(r){var a=_[r];if(void 0!==a)return a.exports;var e=_[r]={id:r,loaded:!1,exports:{}};return h[r].call(e.exports,e,e.exports,i),e.loaded=!0,e.exports}i.m=h,r=[],i.O=(a,e,t,g)=>{if(!e){var h=1/0;for(s=0;s<r.length;s++){for(var[e,t,g]=r[s],_=!0,n=0;n<e.length;n++)(!1&g||h>=g)&&Object.keys(i.O).every((r=>i.O[r](e[n])))?e.splice(n--,1):(_=!1,g<h&&(h=g));if(_){r.splice(s--,1);var l=t();void 0!==l&&(a=l)}}return a}g=g||0;for(var s=r.length;s>0&&r[s-1][2]>g;s--)r[s]=r[s-1];r[s]=[e,t,g]},i.n=r=>{var a=r&&r.__esModule?()=>r.default:()=>r;return i.d(a,{a}),a},e=Object.getPrototypeOf?r=>Object.getPrototypeOf(r):r=>r.__proto__,i.t=function(r,t){if(1&t&&(r=this(r)),8&t)return r;if("object"==typeof r&&r){if(4&t&&r.__esModule)return r;if(16&t&&"function"==typeof r.then)return r}var g=Object.create(null);i.r(g);var h={};a=a||[null,e({}),e([]),e(e)];for(var _=2&t&&r;"object"==typeof _&&!~a.indexOf(_);_=e(_))Object.getOwnPropertyNames(_).forEach((a=>h[a]=()=>r[a]));return h.default=()=>r,i.d(g,h),g},i.d=(r,a)=>{for(var e in a)i.o(a,e)&&!i.o(r,e)&&Object.defineProperty(r,e,{enumerable:!0,get:a[e]})},i.f={},i.e=r=>Promise.all(Object.keys(i.f).reduce(((a,e)=>(i.f[e](r,a),a)),[])),i.u=r=>(({81:"react-syntax-highlighter_languages_refractor_properties",131:"react-syntax-highlighter_languages_refractor_clike",158:"react-syntax-highlighter_languages_refractor_glsl",206:"react-syntax-highlighter_languages_refractor_wasm",226:"react-syntax-highlighter_languages_refractor_mel",342:"react-syntax-highlighter_languages_refractor_powershell",369:"react-syntax-highlighter_languages_refractor_ruby",400:"react-syntax-highlighter_languages_refractor_batch",672:"react-syntax-highlighter_languages_refractor_parser",741:"react-syntax-highlighter_languages_refractor_fsharp",849:"react-syntax-highlighter_languages_refractor_smarty",948:"react-syntax-highlighter_languages_refractor_bison",979:"react-syntax-highlighter_languages_refractor_protobuf",982:"react-syntax-highlighter_languages_refractor_xquery",1001:"react-syntax-highlighter_languages_refractor_rust",1007:"react-syntax-highlighter_languages_refractor_haskell",1130:"react-syntax-highlighter_languages_refractor_crystal",1167:"react-syntax-highlighter_languages_refractor_vhdl",1253:"react-syntax-highlighter_languages_refractor_wiki",1323:"react-syntax-highlighter_languages_refractor_liquid",1423:"react-syntax-highlighter_languages_refractor_soy",1438:"react-syntax-highlighter_languages_refractor_arff",1554:"react-syntax-highlighter_languages_refractor_asciidoc",1621:"react-syntax-highlighter_languages_refractor_stylus",1751:"react-syntax-highlighter_languages_refractor_q",1768:"react-syntax-highlighter_languages_refractor_rip",1929:"react-syntax-highlighter_languages_refractor_vim",2013:"react-syntax-highlighter_languages_refractor_erlang",2044:"react-syntax-highlighter_languages_refractor_fortran",2051:"react-syntax-highlighter_languages_refractor_docker",2065:"react-syntax-highlighter_languages_refractor_autohotkey",2182:"react-syntax-highlighter_languages_refractor_eiffel",2227:"react-syntax-highlighter_languages_refractor_php",2348:"react-syntax-highlighter_languages_refractor_rest",2413:"react-syntax-highlighter_languages_refractor_icon",2496:"react-syntax-highlighter_languages_refractor_markup",2509:"react-syntax-highlighter_languages_refractor_tsx",2547:"react-syntax-highlighter_languages_refractor_qore",2564:"react-syntax-highlighter_languages_refractor_git",2584:"react-syntax-highlighter_languages_refractor_erb",2822:"react-syntax-highlighter_languages_refractor_smalltalk",2891:"react-syntax-highlighter_languages_refractor_python",2980:"react-syntax-highlighter_languages_refractor_velocity",2996:"react-syntax-highlighter_languages_refractor_inform7",3025:"react-syntax-highlighter_languages_refractor_nim",3047:"react-syntax-highlighter_languages_refractor_markupTemplating",3116:"react-syntax-highlighter_languages_refractor_xojo",3140:"react-syntax-highlighter_languages_refractor_hsts",3224:"react-syntax-highlighter_languages_refractor_haxe",3236:"react-syntax-highlighter_languages_refractor_roboconf",3318:"react-syntax-highlighter_languages_refractor_csharp",3327:"react-syntax-highlighter_languages_refractor_swift",3384:"react-syntax-highlighter_languages_refractor_arduino",3412:"react-syntax-highlighter_languages_refractor_abap",3444:"react-syntax-highlighter_languages_refractor_tt2",3502:"react-syntax-highlighter_languages_refractor_nsis",3520:"react-syntax-highlighter_languages_refractor_lisp",3657:"react-syntax-highlighter_languages_refractor_json",3694:"react-syntax-highlighter_languages_refractor_bro",3717:"react-syntax-highlighter_languages_refractor_d",3818:"react-syntax-highlighter_languages_refractor_scala",3819:"react-syntax-highlighter_languages_refractor_keyman",3821:"react-syntax-highlighter_languages_refractor_nix",3846:"react-syntax-highlighter_languages_refractor_handlebars",3971:"react-syntax-highlighter_languages_refractor_actionscript",3980:"react-syntax-highlighter_languages_refractor_java",4045:"react-syntax-highlighter_languages_refractor_prolog",4052:"react-syntax-highlighter_languages_refractor_nginx",4069:"react-syntax-highlighter_languages_refractor_mizar",4098:"react-syntax-highlighter_languages_refractor_applescript",4157:"react-syntax-highlighter_languages_refractor_perl",4630:"react-syntax-highlighter_languages_refractor_kotlin",4657:"react-syntax-highlighter_languages_refractor_jsx",4698:"react-syntax-highlighter_languages_refractor_livescript",4701:"react-syntax-highlighter_languages_refractor_j",4732:"react-syntax-highlighter_languages_refractor_latex",5008:"react-syntax-highlighter_languages_refractor_css",5014:"react-syntax-highlighter_languages_refractor_n4js",5056:"react-syntax-highlighter_languages_refractor_ichigojam",5082:"react-syntax-highlighter/refractor-core-import",5085:"react-syntax-highlighter_languages_refractor_scheme",5165:"react-syntax-highlighter_languages_refractor_tcl",5259:"react-syntax-highlighter_languages_refractor_groovy",5299:"react-syntax-highlighter_languages_refractor_csp",5508:"react-syntax-highlighter_languages_refractor_julia",5524:"react-syntax-highlighter_languages_refractor_apacheconf",5539:"react-syntax-highlighter_languages_refractor_brainfuck",5696:"react-syntax-highlighter_languages_refractor_asm6502",5793:"react-syntax-highlighter_languages_refractor_phpExtras",5867:"react-syntax-highlighter_languages_refractor_gedcom",5896:"react-syntax-highlighter_languages_refractor_vbnet",5951:"react-syntax-highlighter_languages_refractor_less",5983:"react-syntax-highlighter_languages_refractor_yaml",6051:"react-syntax-highlighter_languages_refractor_gherkin",6084:"react-syntax-highlighter_languages_refractor_ada",6118:"react-syntax-highlighter_languages_refractor_coffeescript",6247:"react-syntax-highlighter_languages_refractor_diff",6343:"react-syntax-highlighter_languages_refractor_elixir",6487:"react-syntax-highlighter_languages_refractor_haml",6495:"react-syntax-highlighter_languages_refractor_ini",6508:"react-syntax-highlighter_languages_refractor_http",6558:"react-syntax-highlighter_languages_refractor_visualBasic",6574:"react-syntax-highlighter_languages_refractor_xeora",6626:"react-syntax-highlighter_languages_refractor_go",6670:"react-syntax-highlighter_languages_refractor_apl",6749:"react-syntax-highlighter_languages_refractor_hpkp",6861:"react-syntax-highlighter_languages_refractor_puppet",6975:"react-syntax-highlighter_languages_refractor_tap",7055:"react-syntax-highlighter_languages_refractor_sql",7097:"react-syntax-highlighter_languages_refractor_textile",7253:"react-syntax-highlighter_languages_refractor_nasm",7279:"react-syntax-highlighter_languages_refractor_javascript",7286:"react-syntax-highlighter_languages_refractor_scss",7475:"react-syntax-highlighter_languages_refractor_cssExtras",7504:"react-syntax-highlighter_languages_refractor_basic",7576:"react-syntax-highlighter_languages_refractor_makefile",7658:"react-syntax-highlighter_languages_refractor_oz",7719:"react-syntax-highlighter_languages_refractor_lolcode",7769:"react-syntax-highlighter_languages_refractor_dart",7801:"react-syntax-highlighter_languages_refractor_io",7833:"react-syntax-highlighter_languages_refractor_pascal",7838:"react-syntax-highlighter_languages_refractor_elm",7882:"react-syntax-highlighter_languages_refractor_r",7899:"react-syntax-highlighter_languages_refractor_django",7966:"react-syntax-highlighter_languages_refractor_clojure",8e3:"react-syntax-highlighter_languages_refractor_opencl",8030:"react-syntax-highlighter_languages_refractor_aspnet",8067:"react-syntax-highlighter_languages_refractor_sas",8119:"react-syntax-highlighter_languages_refractor_lua",8333:"react-syntax-highlighter_languages_refractor_autoit",8336:"react-syntax-highlighter_languages_refractor_objectivec",8404:"react-syntax-highlighter_languages_refractor_matlab",8458:"react-syntax-highlighter_languages_refractor_jolie",8513:"react-syntax-highlighter_languages_refractor_monkey",8765:"react-syntax-highlighter_languages_refractor_bash",8811:"react-syntax-highlighter_languages_refractor_reason",8819:"react-syntax-highlighter_languages_refractor_verilog",8827:"react-syntax-highlighter_languages_refractor_twig",8840:"react-syntax-highlighter_languages_refractor_plsql",8921:"react-syntax-highlighter_languages_refractor_graphql",8950:"react-syntax-highlighter_languages_refractor_c",8992:"react-syntax-highlighter_languages_refractor_ocaml",9291:"react-syntax-highlighter_languages_refractor_renpy",9315:"react-syntax-highlighter_languages_refractor_pure",9461:"react-syntax-highlighter_languages_refractor_typescript",9692:"react-syntax-highlighter_languages_refractor_cpp",9742:"react-syntax-highlighter_languages_refractor_flow",9770:"react-syntax-highlighter_languages_refractor_processing",9797:"react-syntax-highlighter_languages_refractor_sass",9835:"react-syntax-highlighter_languages_refractor_markdown",9851:"react-syntax-highlighter_languages_refractor_pug",9979:"react-syntax-highlighter_languages_refractor_parigp"}[r]||r)+".js"),i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(r){if("object"==typeof window)return window}}(),i.o=(r,a)=>Object.prototype.hasOwnProperty.call(r,a),t={},g="perplexity-extension:",i.l=(r,a,e,h)=>{if(t[r])t[r].push(a);else{var _,n;if(void 0!==e)for(var l=document.getElementsByTagName("script"),s=0;s<l.length;s++){var c=l[s];if(c.getAttribute("src")==r||c.getAttribute("data-webpack")==g+e){_=c;break}}_||(n=!0,(_=document.createElement("script")).charset="utf-8",_.timeout=120,i.nc&&_.setAttribute("nonce",i.nc),_.setAttribute("data-webpack",g+e),_.src=r),t[r]=[a];var o=(a,e)=>{_.onerror=_.onload=null,clearTimeout(u);var g=t[r];if(delete t[r],_.parentNode&&_.parentNode.removeChild(_),g&&g.forEach((r=>r(e))),a)return a(e)},u=setTimeout(o.bind(null,void 0,{type:"timeout",target:_}),12e4);_.onerror=o.bind(null,_.onerror),_.onload=o.bind(null,_.onload),n&&document.head.appendChild(_)}},i.r=r=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},i.nmd=r=>(r.paths=[],r.children||(r.children=[]),r),(()=>{var r;i.g.importScripts&&(r=i.g.location+"");var a=i.g.document;if(!r&&a&&(a.currentScript&&(r=a.currentScript.src),!r)){var e=a.getElementsByTagName("script");e.length&&(r=e[e.length-1].src)}if(!r)throw new Error("Automatic publicPath is not supported in this browser");r=r.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=r})(),(()=>{var r={3666:0};i.f.j=(a,e)=>{var t=i.o(r,a)?r[a]:void 0;if(0!==t)if(t)e.push(t[2]);else if(3666!=a){var g=new Promise(((e,g)=>t=r[a]=[e,g]));e.push(t[2]=g);var h=i.p+i.u(a),_=new Error;i.l(h,(e=>{if(i.o(r,a)&&(0!==(t=r[a])&&(r[a]=void 0),t)){var g=e&&("load"===e.type?"missing":e.type),h=e&&e.target&&e.target.src;_.message="Loading chunk "+a+" failed.\n("+g+": "+h+")",_.name="ChunkLoadError",_.type=g,_.request=h,t[1](_)}}),"chunk-"+a,a)}else r[a]=0},i.O.j=a=>0===r[a];var a=(a,e)=>{var t,g,[h,_,n]=e,l=0;if(h.some((a=>0!==r[a]))){for(t in _)i.o(_,t)&&(i.m[t]=_[t]);if(n)var s=n(i)}for(a&&a(e);l<h.length;l++)g=h[l],i.o(r,g)&&r[g]&&r[g][0](),r[g]=0;return i.O(s)},e=self.webpackChunkperplexity_extension=self.webpackChunkperplexity_extension||[];e.forEach(a.bind(null,0)),e.push=a.bind(null,e.push.bind(e))})(),i.nc=void 0})();