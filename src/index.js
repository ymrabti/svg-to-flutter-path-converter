#! /usr/bin/env node
// svg-to-flutter convert C:\Users\y.mrabti\Documents\a-fifa.svg --output=C:\Users\y.mrabti\Documents --name=TheAinFIFA
const { program } = require('commander');
const SvgToFlutterPathConverter = require('./convert');
const fs = require('fs');

/* const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

String.prototype.to_snake_case = camelToSnakeCase; */


function toCamelCase(str) {
    let STR = str.toLowerCase()
      .trim()
      .split(/[ -_]/g)
      .map(word => word.replace(word[0], word[0].toString().toUpperCase()))
      .join('');
    return STR.replace(STR[0], STR[0].toLowerCase());
  }


function to_snake_case(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }


program
  .command('convert')
  .description('Convert svg file to Flutter path')
  .argument('<svgFilePath>')
  .option('-o --output <outputPath>', 'Where to store the output file')
  .option('-n --className <className>', 'The name of the class resulted')
  .option('-f --outFileName <outFileName>', 'The name of the file resulted')
  .option('--path-tracing <pathTracing>', 'Calculate path metrics and expose progress property. Default to false')
  .option('--path-tracing-all <pathTracingAll>', 'Calculate path metrics and expose progress property. Draw all path segments at once. Default to false')
  .action(function (filePath, options) {
    converter = new SvgToFlutterPathConverter();
    let tracing = options.pathTracing;
    let tracingAll = options.pathTracingAll;
    let className = options.className;
    let outFileName = options.outFileName;

    let config = {
      pathTracing: tracing,
      pathTracingAll: tracingAll,
      className: className,
      outFileName: outFileName,
    }

    flutterPathString = converter.convertFromFilePath(filePath, config);
    let outputPath = options.output;
    console.log(outputPath);
    if (!outputPath) {
      console.log(flutterPathString);
      return;
    }

    var outputPathFs = !fs.existsSync(outputPath) ? null : fs.lstatSync(outputPath);
    
    if (outputPathFs !== null && outputPathFs.isDirectory()) {
      const fichernom = className ?? 'output';
      const fileSnakeName = to_snake_case(toCamelCase(`${fichernom}`));
      console.log(`fichernom : ${fileSnakeName}`);
      outputPath += `/${outFileName ?? fileSnakeName}.dart`;
    }

    try {
      fs.writeFileSync(outputPath, flutterPathString);
    } catch (err) {
      console.error(err);
    }
  })

program.parse()
