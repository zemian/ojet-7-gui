import { Component, ComponentChild } from "preact";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import "ojs/ojbutton";
declare type Props = {
    appName: string;
    userLogin: string;
};
declare type State = {
    displayType: "all" | "icons";
    endIconClass: string;
};
export declare class Header extends Component<Props, State> {
    private mediaQuery;
    constructor(props: Props);
    render(props: Readonly<Props>, state: Readonly<State>): ComponentChild;
    componentDidMount(): void;
    componentWillUnmount(): void;
    _mediaQueryChangeListener(mediaQuery: any): void;
    _getDisplayTypeFromMediaQuery(mediaQuery: any): "all" | "icons";
    _getEndIconClassFromDisplayType(displayType: any): "oj-icon demo-appheader-avatar" | "oj-component-icon oj-button-menu-dropdown-icon";
}
export {};
