----------------JSON----------------
JSON (JavaScript Object Notation) --> Format for structuring data. Is the universal format for transmiting data on the web (client-server).
JSON exists as a string. If you want to access its data, it has to be converted, so javascript provides a global JSON object with methods for 
converting the string into a native js object and vice-versa.

Deserialization: Converting a string to a js object.
Serialization: Converting a js object into a string.

json --> MIME type: application/json
	 --> extension: .json

--Format--
Exactly like a js object literal but without functions.

{
	"name": "Bruno",
	"house": {
		"address" : "zabala 3759"
		"habitants": [
			{"name":"Bruno"},
			{"name":"ivo"}

		]
	},
	"age": 21 
}

...also possible...

[
	{
		...
	},
	{
		...
	}
]

...
it also allows only a string or a number.

Notes:
*Contains only properties, not methods.
*Requires double quotes for strings AND property names.
*Only quoted strings may be used as property selectors.

----Methods----
--JSON.parse--
let jsonObjectString = '{"name":"bruno", "age":30}';
let jsonArrayString = '["name","bruno","age",30]';
let obj = JSON.parse(jsonObjectString);
let arr = JSON.parse(jsonArrayString);

--JSON.stringfy--
let object = {"name":"bruno", "age":30};
let array = ["name","bruno","age",30];
let jsonObjectString = JSON.stringfy(object);
let jsonArrayString = JSON.stringfy(array);


----------------ASYNCHRONIC JAVASCRIPT----------------
----Now & Later----
A difficult concept in JavaScript is how to express and manipulate program behaviour spread across time, some code that executes NOW and other 
code that executes LATER. Programs usually have to manage state across time. For example:
let data = retrieveAsync('./data');
console.log(data)
...this wont work, just because even tho we execute the asyncFunction NOW the result will be obtained LATER, and possibly after the execution of
the console.log(data). Any time you wrap some code inside a function and somehow you state that the function should be called in response to some
event, we are creating a LATER chunk of code.

----Event Loop----
Until ES6, javascript didnt have any notion of asynchrony built in: the js engine just executed one thing at a time, when asked to. Who asks? 
The JS engine runs inside a HOSTING ENVIROMENT (like node or the web browser). These enviroments have one thing in common: they have a mechanism
that allows you to handle executing multiple chunks of the program over time, invoking the js engine, called the EVENT LOOP.
(seguir despues).


Asynchronic functions: functions that excecute 'in the background' while the rest of the code executes.
----Callbacks----
A callback function (A) is a function that is passed as a parameter to another function (B), so that (A) is invoked inside (B) to complete some
kind of routine or action.

A callback function can by synchronous or asynchronous. 
Synchronous example: [1,2,3].forEach(n=>console.log(n))
Asynchronous example: button.addEventListener("click", ()=>console.log("hola"))
					  $.get("./file.json", ()=> console.log("Archivo cargado"))

When we program asynchronously, the order of the declarations is not necesairly the order of excecution, so be carefull.

----Promises----
A promise is an object that may produce a value in the future. Is a future value that can be manipulated and passed just like any other value.
But the value may not be returned due to an error, so that is a possibility. Regular operations assume that its operands are already resolved,
NOW. How can we reason about a statement if a part of it is not completed yet? 

Promises, once resolved, are inmutable values.
Completion event => event 'triggered' when a function completes its execution. 

Wrong example:
const myData =fetchData("./file");
processData(myData);
^
|_ fetchData may be asynchronous so myData will be undefined when processData(myData) is executed. 

Possible solution:
const myData = fetchData("./file"); // fetchData returns a promise
myData.then((data)=> {processData(data)})

--Using Promises--

let promise = new Promise(function(resolve, reject){
	//Do an async task
	if(...){
		resolve(result); // --> executes .then(result){...} and .finally(){...}
	} else {
		reject(error); // --> executes .catch(error){...} and .finally(){...}
	}
});
//The above code (A) could be replaced with function(){ return A } --> so that the promise is returned.


promise.then(function(result){
	/*Do something with the result*/
}).catch(function(error){
	/*If the async task raised an error*/
}).finally(function(){
	/*Executes either way*/
})

--Another way--
There are cases where you won't' necesairly use asynchronous code (for example, checking first for a cache and if absent use async code).
In that cases, you can use this format, so that the function 'doSomething' allways returns a promise, keeping consistency:

function doSomething(){
	if(something is cached){
		return Promise.resolve('parameters to the .then');
	} else {
		return somePromise.then(f(){...}).catch(e(...){...});
	}
}

----then----
.then(f(e){...}) is a method all promise instances have that lets you react to the promise. The 'e' argument is the parameter of the
resolve() inside the body of the function passed to the promise. The '.then()' callback is triggered whenever the promise is resolved.

Chaining:
promise.then(...).then(...).then(...).then(...)

----catch----
.catch(f(e){...}) is executed whenever the promise is rejected (with reject() inside the promise). 

----finally----
.finally(f(){...}) is executed regardless succes or failure.

----Promise.all----
// Wait for all the promises to finish before executing
Promise.all([promise_1, promise_2, ..., promise_n]).then(function(results){
	//results is an array with all the results.
}).catch(function(error){
	//if one or more promises are rejected. 'error' is the argument in the reject(.) of the first promise that fails.
});

----Promise.race----
//Attend only the first promise that finishes
Promise.race([promise_1, promise_2]).then(function(finished_result){...}).catch(function(error_1, error_2){...});

----------STACK, WEBAPI, EVENT LOOP, TASK QUEUE (seminar version)----------

Javascript has an execution stack that holds the function calls ('function contexts'), whenever we do some async task, the stack holds the
function for a moment and then lets it go, so that the webapi (or node in the backend) finishes or waits for the action to be complete. When
it is, the callback asociated with that action is pushed onto the task queue, and when the stack is empty, the event loop will push the callback
to the stack and execute it.

Loupe --> app that allows to visualize all the process.

For example, if you attach an event listener to a button, the code that does that stays in the webapi (until it is retired), and with each click,
the handler for that button will be put in the callback queue, and the event loop will put them IN ORDER into the stack.

Note: setTimeout(f, n) --> n is the minimum time you'll' have to wait until f is executed, it can be delayed by other callbacks in the 
callback queue

The browser also has a render queue, but it can only render things when the stack is empty, otherwise it will keep on adding things.
Summary: Don't' put slow shit on the stack, becase it will make the rendering of the webpage slow.

------------APIs------------
APIs (Application Programming Interfaces) are servers created for serving data for external use in websites or apps. In general, APIs are 
accessed through URLs and a string parameter. How to use each specific API is documented in the API's' website. In most cases, we have to
create and account on the API's site' and get an API key from the API service.

----Fetching Data----
fetch('https://url.com/sumeUrl?par1=...', {mode: 'cors'})
	.then(response => response.json())
	.then(data => {...});

For security reasons, browsers restrict HTTP requests to outside sources, CORS -Cross Origin Resource Sharing-.

'fetch' returns a promise that will not reject on HTTP error status, instead it will resolve normally. The response has an 'ok' property
that will be set to false in that case.

The response object does not contain the requested file either but a representation of the entire HTTP response (a Response object). 
Then, with the .json() method we obtain a promise that resolves with the result of parsing the response body with JSON. 

The response promise only rejects on network failure. 

------------- ASYNC AND AWAIT -----------------
-----ASYNC-----
async functions are syntactical sugar for promises.

async function(){...} --> allows to use the await keyword inside the function.

A function with 'async' in its declaration allways returns a promise. Returning in an async function is the same as resolving a promise, and
throwing an error will reject the promise.

--uses--
*async function(){...}
*const f = async () => {}
*array.forEach(async item => {})

-----AWAIT-----
The 'await' keyword tells js to wait for an asynchrnous action to finish before continuing the function, it is a 'pause until done'. 
The asynchrnous action, instead of returning a promise will return the value of the promise acceptance.

Example:
async function getPersonInfo(name){
	const people = await server.getPeople();
	return people.find(person);
}

...instead of...

function getPersonInfo(name){
	return server.getPeople()
					.then(people => {
						return people.find(person)
					});
}

-----Errors-----
If you want to handle the error for that specific function call, since async functions return a promise you can just:
getPersonInfo("juan").catch(err => console.log(err));

If you want to handle errors the same way for every function call, use try-catch inside the function:
async function a(){
	try{
		//function content
	} catch {
		//handle error
	}
}

