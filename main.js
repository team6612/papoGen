#! /usr/bin/env node

var program = require('commander');
var pug = require('pug');
var path = require('path');
var chalk = require('chalk');

// module
const compile_engine = require('./lib/compile_engine');
const template_api = require('./lib/template');

program
.version('0.0.1')
.option('-h, --help', 'Helper manual')
.option('-s, --src [dir]', 'Input Directory [dir]', __dirname)
.option('-o, --out [dir]', 'Output Directory [dir]', __dirname)
.option('-t, --title [name]', 'Specify the title name [name]', 'Power by papoGen')
.option('-g, --gen [type]', 'Specify the generating mechanism [type]', 'json')
.option('-m, --model [name]', 'Specify the model/template of result [name] (Default will be `doc`)', 'doc')
.parse(process.argv);

console.log('\nWelcome using toolbuddy@papoGen!\n');
if(!program.help){
    console.log(
        chalk.red('Usage: papogen -s[--src] <src_path> -o[--out] <out_path> -t[--title] <title> -g[--gen] <type> -m[--model] <name> -h[--help]\n'),
        chalk.red('    -s[--src] : specify the source files directory(using multiple configure files)\n'),
        chalk.red('    -o[--out] : specify the output destination directory(will generate website for u!)\n'),
        chalk.red('    -t[--title] : specify the title name of your website\n'),
        chalk.red('    -g[--gen] : specify the generating mechanism of result, user can pick from several types. default value is "json"\n'),
        chalk.red('    -m[--model] : specify the model/template of result\n'),
        chalk.red('    -h : list out usage of papoGen\n'),
        chalk.red('=====================================\n'),
    );
    console.log(
        chalk.red('Usage/Detail of papoGen:\n'),
        chalk.blue('    default value of each parameter:\n'),
        chalk.red('        src: current working directory\n'),
        chalk.red('        out: current working directory\n'),
        chalk.red('        title: "Powered by papoGen"\n'),
        chalk.red('        gen: "json"\n'),
        chalk.red('        model: "doc"\n'),
        chalk.red('=====================================\n'),
        chalk.red('If specified "-h" in command, then program will only list out usage, without any generation.\n'),
    );
    console.log(
        chalk.red('List all template support by papoGen:')
    );
    template_api.list();

    return;
}
else{
    console.log(chalk.blue('   - src is %s', program.src));
    console.log(chalk.blue('   - out is %s', program.out));
    console.log(chalk.green('   - title is %s', program.title));
    console.log(chalk.green('   - gen is %s', program.gen));
    console.log(chalk.green('   - model is %s', program.model));
    console.log('\n');
    // Get all the .json with specify src
    switch(program.model){
        case 'doc':
            compile_engine.gen_doc(
                path.resolve(__dirname,program.src),
                program.title,
                path.resolve(__dirname,program.out),
                program.gen
            );   
        break;
        default:
            console.log(chalk.red(`[Error] Model specification "${program.model}" not found`));
    }
}