import { program } from 'commander';
import { BuildCommand } from './models/commands/build';
import { DevCommand } from './models/commands/dev';
import { ArcoCommand } from './models/commands/arcoCommand';

import { log } from './utils/log';

import type { Command } from './models/commands/command';

function errorHandler(error: Error) {
  log.error(error.message);
  if (error.stack) {
    log.error(error.stack);
  }

  process.exit(1);
}

process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);
program.command('build').action(createAction(BuildCommand));
program.command('dev').action(createAction(DevCommand));
program.command('arcoDesign').action(ArcoCommand);
program.showHelpAfterError();
program.usage('<command> [options]').parse(process.argv);

function createAction(CommandConstructor: new (...args: any[]) => Command) {
  return async(...args: any[]) => {
    await new CommandConstructor(...args).execute();
  };
}
