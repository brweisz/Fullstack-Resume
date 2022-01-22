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

--Webpack--
Webpack is a tool for bundling and compile javascript modules.

