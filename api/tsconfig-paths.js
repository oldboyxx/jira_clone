const tsConfigPaths = require('tsconfig-paths');

const tsConfig = require('./tsconfig.json');

// Typescript compiler doesn't rewrite absolute paths back to relative
// when compiling production code to /build. Instead we have to use
// tsconfig-paths to do that job when we run our production start script.
// https://github.com/microsoft/TypeScript/issues/10866
tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: tsConfig.compilerOptions.paths,
});
