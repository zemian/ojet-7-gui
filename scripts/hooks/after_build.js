/**
 Copyright (c) 2015, 2022, Oracle and/or its affiliates.
 Licensed under The Universal Permissive License (UPL), Version 1.0
 as shown at https://oss.oracle.com/licenses/upl/

 */

'use strict';

// We want to load bundle.js in index.html with a unique build number to avoid web server caching after deployment.
const fs = require('fs');

function timestamp() {
    const padZero = (s) => ('' + s).length === 1 ? ('0' + s) : s;
    const date = new Date();
    return '' +
        date.getFullYear() +
        padZero(date.getMonth() + 1) +
        padZero(date.getDate()) +
        '.' +
        padZero(date.getHours()) +
        padZero(date.getMinutes()) +
        padZero(date.getSeconds());
}

function addBuildNumberToBundle() {
    try {
        const buildNumber = process.env.BUILD_NUMBER || timestamp();
        const indexFile = `web/index.html`;
        const indexContent = fs.readFileSync(indexFile, `utf8`);
        const regex = /(js\/bundle\.js|\.\/bundle\.js)/gi;
        const newString = indexContent.replace(regex, `$1?v=${buildNumber}`);
        fs.writeFileSync(indexFile, newString);
        return buildNumber;
    } catch (error) {
        console.log(error);
    }
}


module.exports = function (configObj) {
    return new Promise((resolve, reject) => {
        console.log("Running after_build hook.");

        if (configObj.buildType === `release`) {
            console.log("Replacing release bundle url in index.html with build number.");
            const buildNumber = addBuildNumberToBundle();
            console.log("Build number = " + buildNumber + " added.");
        }

        resolve(configObj);
    });
};
