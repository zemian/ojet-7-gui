define(["require", "exports", "preact", "../gui/Counter"], function (require, exports, preact_1, Counter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Content = void 0;
    function Content() {
        return ((0, preact_1.h)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content" },
            (0, preact_1.h)(Counter_1.Counter, null)));
    }
    exports.Content = Content;
    ;
});
