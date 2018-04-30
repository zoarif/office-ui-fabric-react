module.exports = function (options) {
  const path = require('path');
  const fs = require('fs');
  const execSync = require('../exec-sync');
  const findConfig = require('../find-config');

  const jestConfigPath = findConfig('jest.config.js');

  if (fs.existsSync(jestConfigPath)) {
    const jestPath = path.resolve(__dirname, '../node_modules/jest/bin/jest');
    const customArgs = options && options.argv ? options.argv.slice(3).join(' ') : '';

    const args = [
      // Specify the config file.
      `--config ${jestConfigPath}`,

      // Run tests in serial (parallel builds seem to hang rush.)
      `--runInBand`,

      // In production builds, produce coverage information.
      options.isProduction && '--coverage',

      // If the -u flag is passed, pass it through.
      (options.argv && options.argv.indexOf('-u') >= 0) ? '-u' : '',

      // Pass in custom arguments.
      options.args
    ].filter(arg => !!arg).join(' ');

    const command = `node ${jestPath} ${args}`;

    execSync(command, undefined, path.dirname(jestConfigPath));
  }
};
