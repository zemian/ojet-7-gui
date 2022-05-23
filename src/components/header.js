define(["require", "exports", "preact", "ojs/ojresponsiveutils", "ojs/ojtoolbar", "ojs/ojmenu", "ojs/ojbutton"], function (require, exports, preact_1, ResponsiveUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Header = void 0;
    class Header extends preact_1.Component {
        constructor(props) {
            super(props);
            const smallOnlyQuery = ResponsiveUtils.getFrameworkQuery("sm-only");
            this.mediaQuery = window.matchMedia(smallOnlyQuery);
            this._mediaQueryChangeListener = this._mediaQueryChangeListener.bind(this);
            const displayType = this._getDisplayTypeFromMediaQuery(this.mediaQuery);
            const endIconClass = this._getEndIconClassFromDisplayType(displayType);
            this.state = {
                displayType,
                endIconClass
            };
        }
        render(props, state) {
            return ((0, preact_1.h)("header", { role: "banner", class: "oj-web-applayout-header" },
                (0, preact_1.h)("div", { class: "oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center" },
                    (0, preact_1.h)("div", { class: "oj-flex-bar-middle oj-sm-align-items-baseline" },
                        (0, preact_1.h)("span", { role: "img", class: "oj-icon demo-oracle-icon", title: "Oracle Logo", alt: "Oracle Logo" }),
                        (0, preact_1.h)("h1", { class: "oj-sm-only-hide oj-web-applayout-header-title", title: "Application Name" }, props.appName)),
                    (0, preact_1.h)("div", { class: "oj-flex-bar-end" },
                        (0, preact_1.h)("oj-toolbar", null,
                            (0, preact_1.h)("oj-menu-button", { id: "userMenu", display: state.displayType, chroming: "borderless" },
                                (0, preact_1.h)("span", null, props.userLogin),
                                (0, preact_1.h)("span", { slot: "endIcon", class: state.endIconClass }),
                                (0, preact_1.h)("oj-menu", { id: "menu1", slot: "menu" },
                                    (0, preact_1.h)("oj-option", { id: "pref", value: "pref" }, "Preferences"),
                                    (0, preact_1.h)("oj-option", { id: "help", value: "help" }, "Help"),
                                    (0, preact_1.h)("oj-option", { id: "about", value: "about" }, "About"),
                                    (0, preact_1.h)("oj-option", { id: "out", value: "out" }, "Sign Out"))))))));
        }
        componentDidMount() {
            this.mediaQuery.addEventListener("change", this._mediaQueryChangeListener);
        }
        componentWillUnmount() {
            this.mediaQuery.removeEventListener("change", this._mediaQueryChangeListener);
        }
        _mediaQueryChangeListener(mediaQuery) {
            const displayType = this._getDisplayTypeFromMediaQuery(mediaQuery);
            const endIconClass = this._getEndIconClassFromDisplayType(displayType);
            this.setState({
                displayType,
                endIconClass
            });
        }
        _getDisplayTypeFromMediaQuery(mediaQuery) {
            return mediaQuery.matches ? "icons" : "all";
        }
        _getEndIconClassFromDisplayType(displayType) {
            return displayType === "icons" ?
                "oj-icon demo-appheader-avatar" :
                "oj-component-icon oj-button-menu-dropdown-icon";
        }
    }
    exports.Header = Header;
});
