/**
 * @param {string[]} scriptName 
 * @returns {string} Userscript link layout
 */
function createScriptLink(scriptName) {
    return `
        <li>
            <a href="/${scriptName}.proxy.user.js">${scriptName}</a>
        </li>
    `;
}

module.exports = {
    /**
     * @param {string[]} scriptNamesList 
     * @returns {string} Userscripts list layout
     */
    createIndexContent(scriptNamesList) {
        return `
            <ul>
                ${scriptNamesList.map(createScriptLink).join('')}
            </ul>
        `.replace(/(\r\n|\n|\r)/gm, '').replace(/ {2,}/g, '');
    }
}
