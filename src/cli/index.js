const program = require('commander');
const packageInfo = require('../../package.json');

program.version(packageInfo.version);

program
  .command('init') // wdwd init
  .description('Generate a project')
  .alias('i')
  .action(() => {
    require('../cmd/init')();
  });

program
  .command('add')
  .description('Add a new Template')
  .alias('a')
  .action(() => {
    require('../cmd/add')();
  });

program
  .command('list')
  .description('show templates list')
  .alias('ls')
  .action(() => {
    require('../cmd/list')();
  });

program
  .command('remove')
  .description('remove a template')
  .alias('rm')
  .action(() => {
    require('../cmd/delete')();
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
