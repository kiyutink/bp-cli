const chalk = require('chalk');

const printBadArgumentsError = () => {
  console.log(chalk.red('Please pass the correct command'));
  console.log('Available commands are:');
  console.log('g <name> - generate boilerplate in <name> folder');
  process.exit(1);
};

module.exports = printBadArgumentsError;