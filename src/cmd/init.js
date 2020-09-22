'use strict';

const exec = require('child_process').exec;
const co = require('co');
const ora = require('ora');
const prompt = require('co-prompt');
const ck = require('chalk');

const tip = require('../tip');
const tpls = require('../../templates');

const spinner = ora('generating...');

const execRm = (err, projectName) => {
  spinner.stop();

  if (err) {
    console.log(err);
    tip.fail('Please retry!');
    process.exit(7380);
  }

  tip.suc('Project init success!');

  tip.info(`cd ${projectName} && npm install`);
  process.exit(0);
};

const download = (err, projectName) => {
  if (err) {
    console.log(err);
    tip.fail('Please retry!');
    process.exit(7381);
  }
  exec(`cd ${projectName} && rm -rf .git`, (err) => {
    execRm(err, projectName);
  });
};

const resolve = (result) => {
  const { url, branch, projectName } = result;

  const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`;

  spinner.start();

  exec(cmdStr, (err) => {
    download(err, projectName);
  });
};

module.exports = () => {
  co(function* () {
    // 处理用户输入
    const tplName = yield prompt(ck.green('Please enter template name: '));
    const projectName = yield prompt(ck.green('Please enter project name: '));

    if (!tpls[tplName]) {
      tip.fail(``);
      process.exit();
    }

    return new Promise((resolve) => {
      resolve({
        tplName,
        projectName,
        ...tpls[tplName],
      });
    }).then(resolve);
  });
};
