import { h } from "preact";
import { useState } from "preact/hooks";

import "ojs/ojinputtext";

export function TemperatureConverter () {
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(32);
    const onCelsiusChanged = (event: CustomEvent) => {
        const newValue = event.detail.value;
        setCelsius(newValue);
        const newF = newValue * (9 / 5) + 32;
        setFahrenheit(newF);
    }
    const onFahrenheitChanged = (event: CustomEvent) => {
        const newValue = event.detail.value;
        setFahrenheit(newValue);
        const newC = (newValue - 32) * (5 / 9);
        setCelsius(newC);
    }
    const CelsiusInputText = () =>
        <oj-input-text value={celsius} onvalueChanged={onCelsiusChanged}></oj-input-text>;
    const FahrenheitInputText = () =>
        <oj-input-text value={fahrenheit} onvalueChanged={onFahrenheitChanged}></oj-input-text>;

    return (
        <div class="oj-sm-width-1/3">
            <p>Enter value the press Tab</p>
            <p>Celsius:</p>
            <CelsiusInputText></CelsiusInputText>

            <p>Fahrenheit:</p>
            <FahrenheitInputText></FahrenheitInputText>
        </div>
    );
}
