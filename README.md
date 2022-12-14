# Skylar Cupit Site

My personal website. See the finished product at [skylarcupit.com](https://skylarcupit.com/).

## Requirements

- [Yarn](https://yarnpkg.com/getting-started/install), ideally Yarn 3 or higher.
- [7Zip](https://www.7-zip.org/) is only required when running the site packager scripts.

## Initial Setup

1. `git clone git@github.com:scupit/SkylarCupitSite.git`
2. `cd SkylarCupitSite`
3. Run `yarn install` to install all needed dependencies.
4. Run the correct [editor setup command](https://yarnpkg.com/getting-started/editor-sdks). For VSCode, `yarn sdks vscode` is what you want.
5. Do the setup steps for the *resume/* submodule as described in the [resume module README](./resume/README.md)

> **NOTE:** Steps 3 through 5 can also be done by running the `initial-vscode-setup.{ps1|sh}` convenience script.

## Build and Run

`yarn run dev` starts a local dev server on port 3000.

## Production Build

1. Make sure both [7Zip](https://www.7-zip.org/) and [Yarn](https://yarnpkg.com/getting-started/install)
  are available.
2. **With the project root as the current working directory**, run `./package-site.ps1`
  (Windows + PowerShell) or `./package-site.sh` (everywhere else).

Upon success, the final build will be in the *dist/* directory, and will be compressed into
*my_site.tar.gz* in the project root.
