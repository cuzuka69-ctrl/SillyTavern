#!/usr/bin/env node
import { CommandLineParser } from './src/command-line.js';
import { serverDirectory } from './src/server-directory.js';

// 解析命令行参数（如果有）
const cliArgsRaw = process.argv.length > 2 ? process.argv : [];
const cliArgs = new CommandLineParser().parse(cliArgsRaw);

// Railway 适配
cliArgs.listen = true;
cliArgs.port = parseInt(process.env.PORT) || 5000;
cliArgs.enableIPv4 = true;
cliArgs.enableIPv6 = false;

globalThis.COMMAND_LINE_ARGS = cliArgs;
globalThis.DATA_ROOT = cliArgs.dataRoot || serverDirectory;
process.chdir(serverDirectory);

// 启动 SillyTavern
await import('./src/server-main.js');
