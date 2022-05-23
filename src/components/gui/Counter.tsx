import { h } from "preact";
import { useState } from "preact/hooks";

import "ojs/ojbutton";

export function Counter () {
    const [count, setCount] = useState(0);
    const onAction = () => setCount(count + 1);
    return (
        <div>
            <p>{count}</p>
            <oj-button onojAction={onAction}>Count</oj-button>
        </div>
    );
}
