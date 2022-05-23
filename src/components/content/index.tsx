import { h } from "preact";

import {Counter} from "../gui/Counter";

export function Content() {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <Counter></Counter>
    </div>
  );
};
