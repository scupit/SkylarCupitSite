// Important! This is required for SCSS (CSS) to be loaded into the page.
// Each TS file acts as a Webpack "entrypoint". This imports SCSS into the entrypoint,
// where it is processed by the SCSS and CSS loaders and embedded into an HTML file which
// is configured to use this entrypoint.
import "home-page.scss";
import "../index.mustache"

let paletteIndex = 0;

function selectPalette(index: number) {
  const docRoot: HTMLElement = document.documentElement;
  const propertyList: string[] = [
    "primary",
    "secondary",
    "contact-box-color",
    "card-bg",
    "contrast-bg",
    "contrast-bg-dark",
    "accent",
    "dark-accent",
    "darkest-accent",
  ];

  for (const propertyName of propertyList) {
    docRoot.style.setProperty(`--${propertyName}`, `var(--${propertyName}${index})`);
  }
}

document.getElementById("site-options")!
  .addEventListener("click", () => {
    paletteIndex = (paletteIndex + 1) % 3;
    selectPalette(paletteIndex);
  })