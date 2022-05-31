import { h } from "preact";

type Props = {
  links?: FooterLink[]
}

type FooterLink = {
  name: string;
  linkId: string;
  linkTarget: string;
}

const _DEFAULT_LINKS: FooterLink[] = [
  {
    name: "7GUIs - A GUI Programming Benchmark",
    linkId: "7GUIs",
    linkTarget: "https://eugenkiss.github.io/7guis/"
  }
]

export function Footer({ links = _DEFAULT_LINKS } : Props ) {
  return (
    <footer class="oj-web-applayout-footer" role="contentinfo">
      <div class="oj-web-applayout-footer-item oj-web-applayout-max-width">
        <ul>
          {links.map((item) => (
            <li>
              <a id={item.linkId} href={item.linkTarget} target="_blank">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div class="oj-web-applayout-footer-item oj-web-applayout-max-width oj-text-secondary-color oj-text-sm">
        A OracleJET implementation of the 7 GUIs for Learning Purpose.
      </div>
    </footer>
  );
}
