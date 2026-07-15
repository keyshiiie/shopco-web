// generate-importmap.ts
import { generateImportMap } from 'payload';
import config from './payload.config.ts';

await generateImportMap({
  config,
  output: './src/importMap.js',
});