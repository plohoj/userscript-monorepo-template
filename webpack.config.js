const WebpackUserscript = require('webpack-userscript');
const { readdirSync, existsSync } = require('fs');
const path = require("path");
const { BannerPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createIndexContent } = require('./index-content');
const url = require('url')

const SCRIPTS_FOLDER = './scripts'
const scriptNamesList = readdirSync(path.resolve(SCRIPTS_FOLDER), {withFileTypes: true})
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const entries = {};
for (const scriptName of scriptNamesList) {
  const scriptMainPath = path.resolve(SCRIPTS_FOLDER, scriptName, 'index.ts');
  if (existsSync(scriptMainPath)) {
    entries[scriptName] = scriptMainPath;
  }
}

/**
 * @return {import('webpack').Configuration}
 */
module.exports = (args, options) => {
  const isDevelopmentMode = options.mode === 'development';
  return {
    entry: entries,
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    output: {
      clean: true,
    },
    plugins: [
      isDevelopmentMode ? new BannerPlugin({
        raw: true,
        banner: (data) =>
          `console.log(\`Start userscript: "${data.chunk.name}". Build time: \${new Date(${Date.now()}).toLocaleString()}\`);`,
      }) : undefined,
      new WebpackUserscript({
        proxyScript: {
          enable: true,
          baseUrl: url.pathToFileURL(path.resolve('dist')).href,
        },
        headers: data => {
          const headersFile = path.resolve(SCRIPTS_FOLDER, data.basename, 'headers.json');
          console.log(headersFile, existsSync(headersFile))
          if (existsSync(headersFile)) {
            return require(headersFile);
          }
        }
      }),
      new HtmlWebpackPlugin({
        inject: false,
        title: 'Userscript list',
        templateContent: createIndexContent(scriptNamesList),
      }),
    ].filter(Boolean),
    devtool: 'inline-source-map',
    devServer: {
      client: false,
      hot: false,
      devMiddleware: {
        writeToDisk: true,
      }
    },
  };
};
