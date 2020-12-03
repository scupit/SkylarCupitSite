--------------------------------------------------------------------------------
Setting up this project locally
--------------------------------------------------------------------------------

You need to have NodeJS already installed, and 'npm' should already be in your path.

* Run `npm install` to install everything necessary.

--------------------------------------------------------------------------------
Running the dev server
--------------------------------------------------------------------------------

* From the project root directory, run `npm run serve`. This will start the webpack-dev-server
  and open the page in your default browser automatically. Hot module reload is enabled in the
  webpack config, so any changes to styles (css, scss, etc.) or JS will automatically cause your
  code to be recompiled and repackaged. JS changes will cause the broswer to reload immediately.
  while most css changes will require a manual page refresh.

This command is in the package.json 'scripts' attribute. "serve" will run whatever
command it is mapped to in package.json, but that script will also have access to
any local packages in node_modules. That is why you can't just run 'webpack-dev-server'
from the command line unless it is installed globally.

NOTE: Running the dev server will not actually save any of the produced files. Webpack passes them
to the browser and probably stores the intermediate step in ram, so when developing you will not see
any actual distribution files in this project tree.

--------------------------------------------------------------------------------
Creating/building actual files
--------------------------------------------------------------------------------

If you want to run webpack just once to build all your files, run `npm run build`. This is another
script I wrote into package.json so configure it however you want.

* Files will be output into a /dist directory.

--------------------------------------------------------------------------------
Other useful info
--------------------------------------------------------------------------------

* webpack.config.js is where you will configure whay webpack does, and how it works.

* If you want source maps (already on since I put the option 'devtool: "inline-source-map"'), use
  the 'devtool' option in the config. Source maps can be put into separate files too if you want,
  they don't have to be inline. More info on that here: https://webpack.js.org/configuration/devtool/

* To enable production mode (minification, etc.), set the config "mode" option to the string 'production'.
  You'll also want to comment out the "devtool" option in this case since you probably don't want
  source maps in production.