'use strict';

const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');

const table = require('../table');
const tip = require('../tip');
const tpls = require('../../templates');
const chalk = require('chalk');

const writeFile = (err) => {
  if (err) {
    console.log(err);
    tip.fail('Please retry!');
    process.exit(7382);
  }

  table(tpls);
  tip.suc('The new template was added successfully!');
  process.exit();
};

const resolve = (result) => {
  const { tplName, gitUrl, branch, description } = result;
  if (!tpls[tplName]) {
    tpls[tplName] = {};
    tpls[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');
    tpls[tplName]['branch'] = branch;
    tpls[tplName]['description'] = description;
  } else {
    tip.fail(`Template:${tplName} already exists`);
    process.exit();
  }

  fs.writeFile(
    __dirname + '/../../templates.json',
    JSON.stringify(tpls),
    'utf-8',
    writeFile
  );
};

module.exports = () => {
  co(function* () {
    const tplName = yield prompt(chalk.green('Please enter template name: '));
    const gitUrl = yield prompt(chalk.green('Please enter git repository url (https): '))
    const branch = yield prompt(chalk.green('Please enter the target branch to pull: '))
    const description = yield prompt(chalk.green('Please enter the template description: '))
    return new Promise((resolve,reject) => {
      resolve({tplName,gitUrl,branch,description})
    })
  }).then(resolve)
};
