const co = require('co');
const prompt = require('co-prompt');
const ck = require('chalk');

co(function* () {
  // 处理用户输入
  const tplName = yield prompt(ck.green('模板名字：'));
  const projectName = yield prompt(ck.green('项目名字：'));

});
