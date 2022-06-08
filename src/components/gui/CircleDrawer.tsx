import { h } from "preact";
import {useMemo, useState} from "preact/hooks";

import "ojs/ojbutton";
import "ojs/ojtoolbar";
import "ojs/ojpopup";
import "ojs/ojslider";

type Circle = {
    id: number
    x: number,
    y: number,
    r: number
}

type Action = {
    type: string,
    circle: Circle,
    originalCircle?: Circle
}

export function CircleDrawer () {
    const [updateCount, updateCountSetter] = useState<number>(0);
    const [idCounter, idCounterSetter] = useState<number>(0);
    const [circles, circlesSetter] = useState<Array<Circle>>([]);
    const [selectedCircle, selectedCircleSetter] = useState<Circle>(null);

    const history = useMemo(() => {
        return {
            index: 0,
            stack: new Array<Action>()
        }
    }, []);

    const onClick = (event) => {
        // Add new circle
        const id = idCounter + 1;
        idCounterSetter(id);

        const {offsetX: x, offsetY: y} = event;
        const radius = 70;
        const circle = {id, x, y, r: radius};
        circlesSetter([...circles, circle]);

        // Track history
        if (history.index < history.stack.length) {
            // If user did some undo then create new circle, we need to chop off the history
            history.stack = history.stack.slice(0, history.index);
        }
        history.stack.push({type: 'circle', circle: Object.assign({}, circle)});
        history.index = history.index + 1;
    };

    const onContextMenu = (event, circle) => {
        event.preventDefault(); // prevent native browser context menu to display.
        selectedCircleSetter(circle);
    };

    const onTransientRadiusChanged = (event) => {
        const radius = event.detail.value;
        selectedCircle.r = radius;
        updateCountSetter(updateCount + 1);
    };

    const onRadiusChanged = () => {
        // Whe circle size is changed, we want to keep history of original Circle so we can Undo/Redo.
        const circle = Object.assign({}, selectedCircle);
        const originalCircleAction = history.stack.find(e => e.circle.id === selectedCircle.id);
        history.stack.push({type: 'resize', circle: circle, originalCircle: originalCircleAction.circle});
        history.index = history.index + 1;
        selectedCircleSetter(null);
    };

    const onUndo = () => {
        // Undo should work on previous index value, but
        // history.index is holding the next index value! So undo should work on previous (or -1)
        const undoIndexValue = history.index - 1;
        if (history.index > 0 && undoIndexValue < history.stack.length) {
            const action = history.stack[undoIndexValue];
            history.index = undoIndexValue;

            if (action.type === 'circle') {
                circles.pop();
                circlesSetter([...circles]);
            } else {
                const circle = circles.find(e => e.id === action.circle.id);
                circle.r = action.originalCircle.r;
                circlesSetter([...circles]);
            }
        }
    };

    const onRedo = () => {
        // Redo should use the next index value, which is just history.index
        if (history.index > 0 && history.index < history.stack.length) {
            const action = history.stack[history.index];
            history.index = history.index + 1;

            if (action.type === 'circle') {
                circlesSetter([...circles, action.circle]);
            } else {
                const circle = circles.find(e => e.id === action.circle.id);
                circle.r = action.circle.r;
                circlesSetter([...circles]);
            }
        }
    };

    return (
        <div>
            <p>Click to drawer circle</p>
            <oj-toolbar>
                <oj-button onojAction={onUndo}>Undo</oj-button>
                <oj-button onojAction={onRedo}>Redo</oj-button>
            </oj-toolbar>
            <div id="drawing-canvas" style="height: 50vh; width: 100%; border: 1px solid black;">
                <svg style="width: 100%; height: 100%;" onClick={onClick} onContextMenu={event => event.preventDefault()}>
                    {circles.map(circle =>
                        <circle key={circle.id} cx={circle.x} cy={circle.y} r={circle.r} fill={'yellow'}
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
                                   ontransientValueChanged={onTransientRadiusChanged}></oj-slider>
                        <oj-button onojAction={onRadiusChanged}>Save</oj-button>
                    </div>
                </div> : '' }
        </div>
    );
}
