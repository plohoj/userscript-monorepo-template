# Userscript monorepo template
The repository contains a set of userscript

## Usage
* To install all required dependencies use the `npm install` command
* To build the project and debug it, run the `npm start` command. The command will launch the dev server where you can see a list of your userscript.

## Adding a new usercript
* Create a new folder. The folder name will be used as the name of the generated file. For example, for a folder named `my-scripts`, the file `my-scripts.user.js` will be generated.
* Add the `index.ts` file to the new folder. This file will be used as an entry point.
* If you need to override the userscript parameters *(which are specified as a JSDoc directive)*, then you need to add `the headers.json` file to your folder.   
Example of headers.json content:
    ```json
    {
        "name": "test-userscript",
        "match": ["https://mysite.com/*", "https://mysite2.com/*"]
    }
    ```
## Building
To build the entire list of scripts, use the `npm run build:prod` or `npm build:dev` command, depending on your need.

To instantly download the new version of the script, you need to give permission "Allow access to file URLs" on the page "Extension details"
