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
    process.exit(7383);
  }
  tip.suc(chalk.grees('template delete success!'));

  if (JSON.stringify(tpls) !== '{}') {
    table(tpls);
  } else {
    tip.info('No templates have been added!');
  }

  process.exit();
};

const resolve = (tplName) => {
  if (tpls[tplName]) {
    delete tpls[tplName];
  } else {
    tip.fail('Template does not exist!');
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
    // 分步接收用户输入的参数
    const tplName = yield prompt('Please enter tempalte name: ');
    return new Promise((resolve) => {
      resolve(tplName);
    });
  }).then(resolve);
};
