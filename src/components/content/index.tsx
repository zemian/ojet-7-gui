import { h } from "preact";

import {FlightBooker} from "../gui/FlightBooker";

export function Content() {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <FlightBooker></FlightBooker>
    </div>
  );
};
