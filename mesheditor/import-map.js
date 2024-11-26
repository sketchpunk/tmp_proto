// in the future can prob do : <script type="importmap" src="/import-map.json"></script>
const prepend = ( document.location.hostname.indexOf( 'localhost' ) === -1 )? '/mesheditor/' : '/mesheditor/';

document.body.appendChild(Object.assign(document.createElement('script'), {
type		: 'importmap',
innerHTML	: `
    {"imports":{
        "three"                 : "${prepend}thirdparty/three.module.js",
        "OrbitControls"	        : "${prepend}thirdparty/OrbitControls.js",
        "TransformControls"	    : "${prepend}thirdparty/TransformControls.js",
        "tp/"                   : "${prepend}thirdparty/",
        "earcut"                : "${prepend}thirdparty/earcut.js",
        "tweakpane"             : "${prepend}thirdparty/tweakpane-4.0.4.min.js",
        "tweakpane/essentials"  : "${prepend}thirdparty/tweakpane-plugin-essentials-0.2.1.min.js"
    }}
`}));