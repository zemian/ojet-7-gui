import { h } from "preact";
import {useEffect, useState} from "preact/hooks";

import "ojs/ojbutton";
import "ojs/ojpopup";
import "ojs/ojslider";
import {PopupElement} from "ojs/ojpopup";

type Circle = {
    id: number
    x: number,
    y: number,
    r: number
}

type Action = {
    type: string,
    circle: Circle,
    radius?: number
}

// History tracking needs to be outside of the component states
let undoIndex = 0;
let actionHistories = new Array<Action>();

export function CircleDrawer () {
    const [updateCount, updateCountSetter] = useState<number>(0);
    const [idCounter, idCounterSetter] = useState<number>(0);
    const [circles, circlesSetter] = useState<Array<Circle>>([]);
    const [selectedCircle, selectedCircleSetter] = useState<Circle>(null);

    const onClick = (event) => {
        // Add new circle
        const id = idCounter + 1;
        idCounterSetter(id);

        const {offsetX: x, offsetY: y} = event;
        const radius = 70;
        const circle = {id, x, y, r: radius};
        circlesSetter([...circles, circle]);

        // Track history
        if (undoIndex < actionHistories.length) {
            // If user did some undo then create new circle, we need to chop off the history
            actionHistories = actionHistories.slice(0, undoIndex);
        }
        actionHistories.push({type: 'circle', circle: circle});
        undoIndex = undoIndex + 1;
    };
    const onContextMenu = (event, circle) => {
        event.preventDefault(); // prevent native browser context menu to display.
        selectedCircleSetter(circle);
    };

    const onRadiusChanged = (event) => {
        const radius = event.detail.value;
        selectedCircle.r = radius;
        updateCountSetter(updateCount + 1);

        // Track history
        actionHistories.push({type: 'radius', circle: selectedCircle, radius: radius});
    };

    const onUndo = () => {
        // Undo should work on previous index value, but
        // undoIndex is holding the next index value! So undo should work on previous (or -1)
        const undoIndexValue = undoIndex - 1;
        if (undoIndex > 0 && undoIndexValue < actionHistories.length) {
            const action = actionHistories[undoIndexValue];
            undoIndex = undoIndexValue;

            if (action.type === 'circle') {
                circles.pop();
                circlesSetter([...circles]);
            } else {
                const circle = circles.find(e => e.id === action.circle.id);
                if (circle) {
                    circle.r = action.radius;
                    updateCountSetter(updateCount + 1);
                }
            }
        }
    };
    const onRedo = () => {
        // Redo should use the next index value, which is just undoIndex
        if (undoIndex > 0 && undoIndex < actionHistories.length) {
            const action = actionHistories[undoIndex];
            undoIndex = undoIndex + 1;

            if (action.type === 'circle') {
                circlesSetter([...circles, action.circle]);
            }
        }
    };

    return (
        <div>
            <p>Click to drawer circle</p>
            <oj-button onojAction={onUndo}>Undo</oj-button>
            <oj-button onojAction={onRedo}>Redo</oj-button>
            <div id="drawing-canvas" style="height: 75vh; width: 100%; border: 1px solid black;">
                <svg style="width: 100%; height: 100%;" onClick={onClick} onContextMenu={event => event.preventDefault()}>
                    {circles.map(circle =>
                        <circle cx={circle.x} cy={circle.y} r={circle.r} fill={'yellow'}
                                onContextMenu={event => onContextMenu(event, circle)}>
                        </circle>
                    )}
                </svg>
            </div>

            {selectedCircle ?
                <div id="radius-adjustment">
                    <div class="oj-panel">
                        <p>Adjust the circle radius:</p>
                        <oj-slider min={10} max={200}
                                   value={selectedCircle.r}
                                   ontransientValueChanged={onRadiusChanged}></oj-slider>
                    </div>
                </div> : '' }
        </div>
    );
}
