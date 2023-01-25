import "styles/index.scss";

let paletteIndex: number = loadPaletteIndex();

if (document.readyState === "loading") {
  initPage();
}
else {
  window.addEventListener("DOMContentLoaded", initPage);
}

function initPage() {
  const body = document.getElementsByTagName("body")[0];
  selectPalette(paletteIndex);

  body.style.visibility = "visible";

  document.getElementById("site-options")
    ?.addEventListener("click", () => {
      paletteIndex = (paletteIndex + 1) % 3;
      selectPalette(paletteIndex);
    });
}

function loadPaletteIndex(): number {
  const storedIndex = localStorage.getItem("paletteIndex");

  if (!storedIndex) {
    return 0;
  }

  const parsed = parseInt(storedIndex, 10);
  return isNaN(parsed) ? 0 : parsed;
}

function storePaletteIndex(index: number): void {
  localStorage.setItem("paletteIndex", index.toString());
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

  storePaletteIndex(index);
}
