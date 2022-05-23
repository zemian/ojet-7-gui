import { h } from "preact";

import {TemperatureConverter} from "../gui/TemperatureConverter";

export function Content() {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <TemperatureConverter></TemperatureConverter>
    </div>
  );
};
