import "styles/index.scss";

let paletteIndex = 0;

if (document.readyState === "loading") {
  initPage();
}
else {
  window.addEventListener("DOMContentLoaded", initPage);
}

function initPage() {
  const body = document.getElementsByTagName("body")[0];

  body.style.visibility = "visible";

  document.getElementById("site-options")
    ?.addEventListener("click", () => {
      paletteIndex = (paletteIndex + 1) % 3;
      selectPalette(paletteIndex);
    });
}

function selectPalette(index: number) {
  const docRoot: HTMLElement = document.documentElement;
  const propertyList: string[] = [
    "primary",
    "secondary",
    "tertiary",
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
