import { h } from "preact";
import { useState } from "preact/hooks";

import "ojs/ojbutton";

export function Cells () {
    const [count, countSetter] = useState(0);
    const onAction = () => countSetter(count + 1);
    return (
        <div>
            Cells
        </div>
    );
}
