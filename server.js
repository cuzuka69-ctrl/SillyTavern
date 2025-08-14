// server.js
import { CommandLineParser } from './src/command-line.js';
import { serverDirectory } from './src/server-directory.js';

const cliArgsRaw = process.argv.length > 2 ? process.argv : [];
const cliArgs = new CommandLineParser().parse(cliArgsRaw);

// Render 适配
cliArgs.listen = true; // 确保服务器启动
cliArgs.port = parseInt(process.env.PORT) || 5000;
cliArgs.enableIPv4 = true;
cliArgs.enableIPv6 = false;

globalThis.COMMAND_LINE_ARGS = cliArgs;
globalThis.DATA_ROOT = cliArgs.dataRoot || serverDirectory;
process.chdir(serverDirectory);

await import('./src/server-main.js');
