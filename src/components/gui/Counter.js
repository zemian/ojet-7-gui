define(["require", "exports", "preact", "preact/hooks", "ojs/ojbutton"], function (require, exports, preact_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Counter = void 0;
    function Counter() {
        const [count, setCount] = (0, hooks_1.useState)(0);
        const onAction = () => setCount(count + 1);
        return ((0, preact_1.h)("div", null,
            (0, preact_1.h)("p", null, count),
            (0, preact_1.h)("oj-button", { onojAction: onAction }, "Count")));
    }
    exports.Counter = Counter;
});
