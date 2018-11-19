#!/usr/bin/env node

const Git = require('nodegit');
const minimist = require('minimist');
const rimraf = require('rimraf');
const chalk = require('chalk');
const curPath = process.cwd();
const boilerplateRepoUrl = 'https://github.com/kiyutink/frontend-boilerplate.git';
const args = minimist(process.argv.slice(2));

if (!args._.length) {
  console.log(chalk.red('Please pass the command'));
  console.log('Available commands are:');
  console.log('g - generate boilerplate');
  process.exit(0);
}
else if (args._.length === 1 && args._[0] === 'g') {
  console.log(chalk.cyan(`Initializing a boilerplate project in ${curPath} ...`));

  Git.Clone.clone(boilerplateRepoUrl, curPath).then(
    () => {
      rimraf('.git', {}, () => {
        console.log(chalk.green('Done!'));
      });
    },
    () => {
      console.log(chalk.green('Unexpected error'));
    }
  );
}
