import { h } from "preact";
declare type Props = {
    links?: FooterLink[];
};
declare type FooterLink = {
    name: string;
    linkId: string;
    linkTarget: string;
};
export declare function Footer({ links }: Props): h.JSX.Element;
export {};
