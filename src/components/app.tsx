import {customElement, ExtendGlobalProps} from "ojs/ojvcomponent";
import {h, Component, ComponentChild} from "preact";
import {Footer} from "./footer";
import {Header} from "./header";
import {Content} from "./content/index";
import Context = require("ojs/ojcontext");
import CoreRouter = require("ojs/ojcorerouter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");

type Props = {
    appName?: string;
    userLogin?: string;
}

@customElement("app-root")
export class App extends Component<ExtendGlobalProps<Props>> {
    static defaultProps: Props = {
        appName: '7 GUIs - A GUI Programming Benchmark',
        userLogin: "zemian.deng@oracle.com"
    };

    routes = [
        { path: "", redirect: "counter" },
        {
            path: "counter",
            detail: {
                label: "Counter",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-mouse"
            }
        },
        {
            path: "flightbooker",
            detail: {
                label: "Flight Booker",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-airport"
            }
        },
        {
            path: "tempconverter",
            detail: {
                label: "Tempature Converter",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-weather-thermometer"
            }
        },
        {
            path: "timer",
            detail: {
                label: "Timer",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-timer"
            }
        },
        {
            path: "crud",
            detail: {
                label: "CRUD",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-add-edit-page"
            }
        },
        {
            path: "circledrawer",
            detail: {
                label: "Circle Drawer",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-circle"
            }
        },
        {
            path: "cells",
            detail: {
                label: "Cells",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-file-spreadsheet"
            }
        }
    ];

    router = new CoreRouter<CoreRouter.DetailedRouteConfig>(this.routes, {
        urlAdapter: new UrlParamAdapter()
    });

    state = { currentRoutePath: "" };

    changeRoute = (routePath: string) => {
        this.router.go({ path: routePath });
    };

    constructor(props: ExtendGlobalProps<Props>) {
        super(props);
        this.router.currentState.subscribe(this.onRouteChanged.bind(this));
        this.router.sync();
    }

    onRouteChanged(actionable: CoreRouter.ActionableState<CoreRouter.DetailedRouteConfig>): void {
        // Update our state based on new router state
        const routePath = actionable.state?.path;
        this.setState({ currentRoutePath: routePath });
    }

    render(props: ExtendGlobalProps<Props>): ComponentChild {
        return (
            <div id="appContainer" class="oj-web-applayout-page">
                <Header
                    appName={props.appName}
                    userLogin={props.userLogin}
                />
                <Content page={this.state.currentRoutePath} changeRoute={this.changeRoute} routes={this.routes}/>
                <Footer/>
            </div>
        );
    }

    componentDidMount() {
        Context.getPageContext().getBusyContext().applicationBootstrapComplete();
    }
}
