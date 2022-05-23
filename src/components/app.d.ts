import { ExtendGlobalProps } from "ojs/ojvcomponent";
import { Component, ComponentChild } from "preact";
declare type Props = {
    appName?: string;
    userLogin?: string;
};
export declare class App extends Component<ExtendGlobalProps<Props>> {
    static defaultProps: Props;
    render(props: ExtendGlobalProps<Props>): ComponentChild;
    componentDidMount(): void;
}
export {};
