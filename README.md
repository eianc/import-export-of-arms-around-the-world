
## Project structure

    .
    ├── /dist                // production build, created by `npm run build`
    ├── /images
    ├── /javascript          // app.js entry + /modules
    ├── /node_modules        // created and managed by npm
    ├── /public              // copied as-is to the site root
    │   ├── /fonts
    │   ├── /images
    │   ├── /json            // world_arms_import_export_by_year_R.json
    │   ├── favicon.ico
    │   └── manifest.json
    ├── /styles              // Sass, imported from javascript/app.js
    ├── .editorconfig
    ├── .nvmrc
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    └── vite.config.js

## Overview

The visualisation is built with [D3 v7](https://d3js.org/). [Vite](https://vite.dev/) serves and bundles the JavaScript and Sass: `index.html` loads `javascript/app.js` as an ES module, which in turn imports `styles/app.scss`.

Styles are compiled with [Dart Sass](https://sass-lang.com/dart-sass/) and [Autoprefixer](https://github.com/postcss/autoprefixer) (configured in `postcss.config.js`; target browsers are set by `browserslist` in `package.json`).

Everything in `/public` is served from the site root, so the data is fetched from `/json/...`.

## Requirements

Node 26 (LTS). With [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in this folder to pick up the version from `.nvmrc`.

## Installation

    npm install

## Development

    npm run dev

Then visit http://localhost:3000. Changes to JavaScript and Sass reload automatically.

Lint the JavaScript with:

    npm run lint

## Production

    npm run build

The minified, cache-busted site is written to `/dist`. Preview it locally with `npm run preview`.
