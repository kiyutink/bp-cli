#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const Git = require('nodegit');
const minimist = require('minimist');
const rimraf = require('rimraf');
const chalk = require('chalk');
const ora = require('ora');
const boilerplateRepoUrl = 'https://github.com/kiyutink/frontend-boilerplate.git';
const args = minimist(process.argv.slice(2));

if (!args._[0]) {
  console.log(chalk.red('Please specify the name of the created project'));
  process.exit(1);
}
const dirName = args._[0];
const dirPath = path.join(process.cwd(), dirName);
if (fs.existsSync(dirPath)) {
  console.log(
    chalk.red(
      'Error: the specified directory already exists. You can only initiate the boilerplate in a new directory'
    )
  );
  process.exit(1);
}
else {
  const spinner = ora(chalk.cyan(`Initializing a boilerplate project in ${dirPath}`));
  spinner.start();

  Git.Clone.clone(boilerplateRepoUrl, dirPath).then(
    () => {
      rimraf('.git', {}, () => {
        console.log(chalk.green('\nDone!'));
      });
      spinner.stop();
    },
    () => {
      console.log(chalk.green('Unexpected error'));
      spinner.stop();
    }
  );
}