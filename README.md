![Zone](https://www.zonedigital.com/static/zone/assets/img/icons/zone-logo.png)

----

# Zone Boilerplate

## Project structure

    .
    ├── /javascript
    ├── /node_modules        // created and managed by Yarn
    ├── /public
    │   ├── /build           // created and managed by Webpack
    │   ├── /fonts
    │   ├── /images
    │   ├── favicon.ico
    │   └── manifest.json
    ├── /styles
    ├── .babelrc
    ├── .editorconfig
    ├── .eslintrc
    ├── .gitignore
    ├── .stylelintrc
    ├── CHANGELOG.md
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── webpack.config.js
    ├── webpack.parts.js
    └── yarn.lock

## Overview

### JavaScript

`/javascript`

All pre-compiled JavaScript source lives here. The root of the folder contains the bundles. If you need to add a new bundle, be sure to add it to the `webpack.config.js` file.

We use [Babel](https://babeljs.io/) to allow us to use the latest version of JavaScript through syntax transformers. The [ES2015](http://babeljs.io/docs/plugins/preset-es2015/) and [Stage 2](http://babeljs.io/docs/plugins/preset-stage-2/) presets are installed by default. This will provide you with all you need to compile ES2015 down to ES5 as well as support for class properties. If you plan to support [React/JSX](http://babeljs.io/docs/plugins/preset-react/) or something a little more experimental, [take a look at the transforms available](http://babeljs.io/docs/plugins/#transform-plugins). Babel config is found in `.babelrc`.

Webpack is used to run Babel and any other transforms, such as minification. The compiled JavaScript and source map file(s) will be saved to `/public/build` in production.

Prior to Babel, [ESLint](http://eslint.org/docs/rules/) is run to highlight any stylisitic and syntactical JavaScript issues. Rules used are listed in `.eslintrc`.

[StyleLint](http://stylelint.io/) is used to highlight stylistic and syntactic CSS issues. Rules are listed in `.stylelintrc`. A comprehensive list of all the available rules [can be found here](http://stylelint.io/user-guide/rules/).

In production the final JavaScript will be minified.

### Styles

`/styles`

We use [Sass](http://sass-lang.com/) and [Autoprefixer](https://autoprefixer.github.io/) to create CSS. The configuration for Autoprefixer can be found in `postcss.config.js`.

Webpack is used to run Sass and another transforms, such as Autoprefixer and minification. The compiled CSS and source map file(s) will be saved to `/public/build` in production.

In production the final CSS will be minified and extracted to a separate CSS file.

### Public

`/public`

This folder should contain all the files you would like to be available to the public (fonts, images, etc).

Ensure the site has a `favicon.ico`.

## Installation

*Run (in this directory):*

    yarn

This ensures the all the Node packages are installed. Any new packages should be installed with the `yarn add [package]`. The only exception to this is if the package will only ever be run on a developers machine (e.g. BrowserSync) - for this case, use `yarn add [package] --dev`. Follow the [Yarn guide](https://yarnpkg.com/en/docs/usage) for more information.

## Build

### Development

Sass and JavaScript will be processed and watched for changes. Scripts will be linted and Webpack dev server will be started. These assets will be served from memory via the dev server, no files are written to disk.

*Run (in this directory):*

    yarn run watch

Then visit http://localhost:3000

If you don't want to watch your files and just compile you can run:

    yarn run build

### Production

Sass and JavaScript will be processed and minified. CSS is extracted into separate files. File names contain a cache busting hash. The manifest.json in `/public/build` can be using by BE to map the file names.

*Run (in this directory):*

    yarn run build --production

## References

* [Zone CSS style guide](https://zonecode.codebasehq.com/projects/zone-tech-documentation/notebook/Zone%20CSS%20Style%20Guide.md) - for Zone CSS best practice and standards - [View default linting rules](https://github.com/zone/stylelint-config-zone/blob/master/index.js)
* [Zone JavaScript style guide](https://zonecode.codebasehq.com/projects/zone-tech-documentation/notebook/JS%20Style%20Guide.md) - for Zone JavaScript best practice and standards - [View default linting rules](https://github.com/zone/eslint-config-zone/blob/master/index.js)

## Editor plugins

### Atom

* [StyleLint - CSS/Sass linting](https://atom.io/packages/linter-stylelint)
* [ESLint - JavaScript linting](https://atom.io/packages/linter-eslint)
* [EditorConfig - Consistent editor config](https://atom.io/packages/editorconfig)
* [Pigments - Displays colours in real time](https://atom.io/packages/pigments)
