// Important! This is required for SCSS (CSS) to be loaded into the page.
// Each TS file acts as a Webpack "entrypoint". This imports SCSS into the entrypoint,
// where it is processed by the SCSS and CSS loaders and embedded into an HTML file which
// is configured to use this entrypoint.
import "home-page.scss";
import "../index.mustache"
