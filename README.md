# svg-to-flutter-path-converter

Convert your SVG file directly to Flutter paths and prevent all the messing with bezier curves.

# Usage as CLI Tool

To use this tool via CLI:  

* Clone this repository
* `cd` into cloned directory

## Use locally

If you want to install it locally to prevent pollution of your global node namespace, do this:

```
npm i
```

Then you can run the conversion using 

```
npm start convert <svgFilePath> [options]
```

## Use globally

If you want use it outside of the repository directory as well, use this:

```
npm i -g
```

The syntax to call the conversion via CLI is as follows:

```
svg-to-flutter convert <svgFilePath> [options]
```

The general usage looks like this:

```
Usage: svg-to-flutter [options] [command]

Commands:
  convert <filePath> [options]  Convert svg file to Flutter path
  help [command]      display help for command
```

## Store the result on the file system

When you run it without any options, it will directly return the output.
In order to store the result on the file system, use the optional `output` argument (`-o` or `--output`).
You can either provide a directory, which will create a file `output.dart` or a path to a file you want to have created.

```
svg-to-flutter convert input.svg -o .
```

```
svg-to-flutter convert input.svg -o my-output.dart
```

