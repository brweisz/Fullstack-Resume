----------------JSON----------------
JSON (JavaScript Object Notation) --> Format for structuring data. Is the universal format for transmiting data on the web (client-server).
JSON exists as a string. If you want to access its data, it has to be converted, so javascript provides a global JSON object with methods for 
converting the string in a native js object and vice-versa.

Deserialization: Converting a string to a js object.
Serialization: Converting a js object into a string.

json --> MIME type: application/json
	 --> estension: .json

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


----------------ASYNCHRONIC JAVASCRIPT----------------
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

Wrong example:
const myData =fetchData("./file");
processData(myData);
^
|_ fetchData may be asynchronous so myData will be undefined when processData(myData) is executed. 

Possible solution:
const myData = fetchData("./file"); // fetchData returns a promise
myData.then((data)=> {processData(data)})

--Using Promises (legacy, don't' use it this way)--

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
}).catch(function(){
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

----------STACK, WEBAPI, EVENT LOOP, TASK QUEUE----------

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