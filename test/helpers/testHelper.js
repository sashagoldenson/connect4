// require('jsdom-global')()
// const jsdom = require("jsdom");
// // var fixture = setFixtures('index.html')

// const { JSDOM } = jsdom;
// const dom = new JSDOM(`<body><p id="player-name></p></body>`, {
//     contentType: "text/html",
// });
// const win = dom.defaultView;

// global.document = dom;
// global.window = win;

// console.log(dom.window.document.querySelector("p").textContent);

// Object.keys(window).forEach((key) => {
//   if (!(key in global)) {
//     global[key] = window[key];
//   }
// });