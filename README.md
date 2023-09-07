# Skylar Cupit Site

My personal website. See the finished product at [skylarcupit.com](https://skylarcupit.com/).

## TODO

- Add a fallback .mp4 for the gcmake example .webm video.

## Build Requirements

- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install), ideally Yarn 3 or higher.
- [7Zip](https://www.7-zip.org/) (**only required when running the site packager scripts**).

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

## Reducing Image Size

I downscale images using [imagemagick](https://imagemagick.org/) before adding them to the
*resources/* folder. This script is just for reference:

``` bash
# NOTE that to convert 'heif' format files (including HEIC and heic), you must first build
# imagemagick from source with HEIC support enabled.
for file in *.{HEIC,heic,JPG}; do
  magick convert "$file" -resize '30%' "${file%.*}.webp"
done
```

The range between 15% and 30% seems to be an ideal middle ground between resolution and file size.

## Fonts

- [Quicksand](https://fonts.google.com/specimen/Quicksand)
