import { h } from "preact";
import { useState } from "preact/hooks";

import "ojs/ojinputtext";

/*
 * We are using JET 'event.detail.updatedFrom' to tell whether to update or not in order to avoid duplicated
 * invocation where there could be extra call by 'external' during re-render().
 *
 * You may also workaround above issue by simply creating a wrapper components on "oj-input-text"
 * to avoid the re-render() based on external change.
 */
export function TemperatureConverter () {
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(32);

    const onCelsiusChanged = (event: CustomEvent) => {
        console.log("onCelsiusChanged", event);
        if (event.detail.updatedFrom === 'internal') {
            const newValue = event.detail.value;
            setCelsius(newValue);
            const newF = newValue * (9 / 5) + 32;
            setFahrenheit(newF);
        }
    }

    const onFahrenheitChanged = (event: CustomEvent) => {
        console.log("onFahrenheitChanged", event);
        if (event.detail.updatedFrom === 'internal') {
            const newValue = event.detail.value;
            setFahrenheit(newValue);
            const newC = (newValue - 32) * (5 / 9);
            setCelsius(newC);
        }
    }


    return (
        <div>
            <p>Enter a value into either input and then press Tab to convert it.</p>
            <div class="oj-sm-width-1/3">
                <p>Celsius:</p>
                <oj-input-text value={celsius} onvalueChanged={onCelsiusChanged}></oj-input-text>

                <p>Fahrenheit:</p>
                <oj-input-text value={fahrenheit} onvalueChanged={onFahrenheitChanged}></oj-input-text>
            </div>
        </div>
    );
}
