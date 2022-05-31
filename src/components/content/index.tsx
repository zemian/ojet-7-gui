import {h} from "preact";
import {useMemo} from "preact/hooks";

import {Counter} from "../gui/Counter";
import {FlightBooker} from "../gui/FlightBooker";
import {TemperatureConverter} from "../gui/TemperatureConverter";

import "ojs/ojnavigationlist";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import {ojNavigationList} from "ojs/ojnavigationlist";
import {Route} from "ojs/ojcorerouter";

export function Content(props) {
    const routesDP = useMemo(() =>
        new ArrayDataProvider(props.routes.slice(1), {keyAttributes: "path"}), []);

    const navItemTemplate = (item) =>
        <li id={item.data.path}>
            <a href="#">
                <span class={item.data.detail.iconClass} />
                {item.data.detail.label}
            </a>
        </li>;

    const onNavItemChanged = (event: ojNavigationList.selectionChanged<string, Route>) => {
        props.changeRoute(event.detail.value);
    };

    const getPageElement = (page) => {
        switch(page) {
            case "counter":
                return <Counter />;
            case "flightbooker":
                return <FlightBooker />;
            case "tempconverter":
                return <TemperatureConverter />;
            default:
                return <Counter />;
        }
    }

    return (
        <div class="oj-web-applayout-max-width oj-web-applayout-content">
            <div class="oj-flex">
                <div class="oj-flex-item oj-sm-width-1/4">
                    <oj-navigation-list data={routesDP} onselectionChanged={onNavItemChanged}>
                        <template slot="itemTemplate" render={navItemTemplate}></template>
                    </oj-navigation-list>
                </div>
                <div class="oj-flex-item oj-sm-width-3/4">
                    <div class="oj-panel">
                        {getPageElement(props.page)}
                    </div>
                </div>
            </div>
        </div>
    );
};
