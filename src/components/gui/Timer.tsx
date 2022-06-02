import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import "ojs/ojprogress-bar";
import "ojs/ojslider";
import "ojs/ojbutton";

/*
 Due to how Preact update render, we need setTimeout() AND not recurse into it, because render() will
 update itself for the next setTimeout().

 NOTE: You can not use setInterval() this this example, since the repeated interval will not cause
 Preact states to change!
 */
export function Timer () {
    const [duration, durationSetter] = useState(15 * 1000); // 15 secs
    const [progress, progressSetter] = useState(0);
    const [updateInterval, updateIntervalSetter] = useState(duration / 100);

    const onSliderChanged = (event) => durationSetter(event.detail.value);
    const resetProgress = () => progressSetter(0);

    useEffect(() => {
        updateIntervalSetter(duration / 100);
        progressSetter(duration === 1 ? 100 : 0); // There is nothing work on if duration is 1
    }, [duration]);

    useEffect(() => {
        let timerId = null;
        if (progress < 100) {
            timerId = setTimeout(() => {
                progressSetter(progress + 1);
                timerId = null;
            }, updateInterval);
        }

        return () => {
            // Clear timer if there is any
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }, [progress, updateInterval]);

    return (
        <div class="oj-sm-width-1/3">
            <div class="oj-sm-margin-2x-bottom">
                <p>Elapsed Time: {(progress * (duration / 1000) / 100).toFixed(1)} secs</p>
                <oj-progress-bar value={progress}></oj-progress-bar>
            </div>
            <div class="oj-sm-margin-2x-bottom">
                <p>Duration: {(duration / 1000).toFixed(1)} secs</p>
                <oj-slider value={duration} min={1} max={30000} onvalueChanged={onSliderChanged}></oj-slider>
            </div>
            <div class="oj-sm-margin-2x-bottom">
                <oj-button onojAction={resetProgress}>Reset</oj-button>
            </div>
        </div>
    );
}
