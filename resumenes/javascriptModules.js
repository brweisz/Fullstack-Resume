-----HISTORY----
1) Import a module downloading the source file and linking it in the html file with the <script> tag.
	***problem*** it is hard to keep track of updates of the packages and download each one.

2) Using npm:
	$npm init --> creates a 'package.json' file with all the project information, includin dependencies
	$npm install package --save --> downloads the code of the package into a folder 'node_modules'
								--> modifies the 'package.json' to add the package as a dependency
	***solves*** now it is easy to download and update the packages, and share your project with others thanks to 'package.json'
	***problem***  It is still inconvenient to find the path to the package files to link them in the html file.

3) Node's inetervention ': 
	node.js is a javascript runtime designed to run on the server, with access to the file system.
	It allows you to import modules in the .js files, without turning to the html file to load all the scripts.
			Example: var myModule = require('myModule'), without even specifying the path to the module (node already knows it).
	***problem*** The example code cannot be used in the browser ('require' is not defined). The browser does not have access to 
				  the file system.

4) Using a module bundler (like Webpack):
	Creates an output browser-compatible. Basically finds every 'require' in the source code and replaces it with the actual code.
	The result is an unique .js file with no requierements.
	(See webpack example below)
	***solves*** No longer loading external scripts, easy to add new dependencies, adds a build step.
	


-------------NPM-------------
NPM = Node Packet Manager.

It is composed of 3 main parts: 
-The website
-The Command Line Interface (CLI)
-Te Registry

It is used for:
-Adapt packages of code to your apps or incorporate packages as they are.
- ...

--Use--
$npm install <package_name> --> this creates the node_modules directory in your pwd (if it doesnt exist) and download the package 
								in that directory.

--package.json--
If there is a package.json file in the pwd, then npm installs the lastest version of the package that satisfies the 
semantic versioning rule declared in the file. This file is like a requierements file: lists the packages a project depends on,
specifying its versions.

{
	"name": "my package",
	"version": "1.0.0"
}

-Ways of creating the file-

1) With a CLI questionnaire, running the 'npm init' command.
	Note: can be customized.

2) Creating a default package.json file (see how later).

------WEBPACK------
Webpack is a tool for bundling and compile javascript modules. When webpack processes an application, it builds a dependency graph and then 
combine every module the project needs into one or more bundles (static assets to serve your content from).

Name of the file: webpack.config.js

---Key Concepts--

-Entry-
An entry point indeicates which module webpack should use to start building its dependency graph. Then, webpack will figure out which modules that
entry point depends on (direct and indirectly).
* Default is ./src/index.js *

Example of a custom setup: 
module.exports = {
	entry: 'path/file.js',
}

-Output-
Indicates where to emit the bundles it creates and its names
* Default is ./dist/main.js for the main output file, and ./dist/ for the others*

Example of a custom setup:
const path = require('path');
module.exports = {
	entry: ...,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'my_first_webpack.bundle.js',
	},
};

-Loaders-
Webpack only understands javascript and json files. Loaders allow webpack to process other type of files and convert them into valid modules
that can be consumed by your app and added to the dependency graph.
-test: identifies which file should be transformed.
-use: indicates what loader should be used to do the transforming.

Example of a custom setup:
const path = require('path');
module.exports = {
	entry: ...,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'my_first_webpack.bundle.js',
	},
	module: {
		rules: [{test: /\.txt$/, use: 'raw-loader'}],
	},
};

-Plugins- Another day

-Mode-
Mode --> development / production / none 
Enables optimizations for each enviroment. Default: production

module.exports = {
	mode: 'production',
};

CODE ALONG: /home/bruno/Documentos/TheOdinProject/other/webpack-demo
(seguir cuando sea relevante)

----Setting up a project using Webpack----
1) npm init -y
2) npm install webpack webpack-cli --save-dev
3) create folders /src /dist
4) create src/index.js
5) create dist/index.html
6) In package.json change ' "main":"index.js" ' for ' "private":true'
7) install dependencies with 'npm install --save <dependency_name>'
8) In src/index.js import whatever you want to use from the dependencies
9) In dist/index.html import a script with 'src = "main.js" '
10) Run 'npx webpack' in the root folder of the project
--(optional)--
11) Create a configuration file 'webpack.config.js' in the root folder, for this example...
"
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
"
12) Bundle the project with 'npx webpack --config webpack.config.js'
--(shortcut)--
13) add a script in package.json like so '"build": "webpack"'
14) step 13) allows you to bundle the project using 'npm run build'

----------------ES6 MODULES----------------------
----import----
The static 'inport' statement is used to import read only live bindings which are exported by other module.
Imported modules are in strict mode.
The inport statement can not be used in embedded script unless the script has a type="module".
There is also a dynamic 'inport()' function that does not require the type="module" statement.

--Ways of importing--
import defaultImport from "module-name"; // a module might have a 'default import', we can refer to that
import * as name from "module-name"; // imports all exports from "module-name"
	name.doAThing();
import {export1 as alias, export2, ...} from "module-name";
import defaultImport {export1, ...} from "module-name";
import defaultImport, * as name from "module-name";
import "module-name";
let promise = import("module-name");

---Dynamic import---
In a static import all the code in the imported module is evaluated at load time. If you want to load a module on-demand or 
conditionally, use a dynamic import.

import('./modules/my-module.js').then((module) => { /* do things */ });


----export----
The 'export' statement is used when creating javascript modules to export live bindings to functions so they can be used.
-Types of exports-
There are named exports and the default export. There can be many named exports but only one default one.
1) Named exports:
	export {myFunction, myVariable}
	export let variableExportada = 3;
	export function myFunc(){...}
2) Default exports:
	export {myFunc as default};
	export default function myFunc(){...}
	export default class {...}
	

----Usage----
// in a file called functionOne.js
const functionOne = function(){...}
export {functionOne}

// in another js file
import { functionOne } from './functionOne'
functionOne();
