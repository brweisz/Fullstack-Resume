In an npm project: $npm install --save-dev jest  <-- Installs jest as a devDependency
	1) In package.json add a script --> "test": "jest" 
		Run $npm test
	2) In package.json add a script --> "watch": "jest --watch *.js"

In an npm project using Webpack:
	(not necessary for now)

Exporting and importing:

- In the 'model.js' file:
	module.exports = objectToBeTested;

- In the 'model.test.js' file:
	const objectToBeTested = require('./model.js');


Ways of setting a test:
	1) it('test name', functionTest)
	2) test('test name', functionTest)


Matchers for the test functions:

	expect(resultObj).toBe(expectedObj) --> .toBe() uses === comparison
					 .toEqual(expectedObj) --> .toEqual() uses == comparison recursively on every field of an object.

	expect(result).not.to___(expectedResult);

	expect(resultObj).toBeNull()
					 .toBeUndefined()
					 .toBeDefined()
					 .toBeTruthy()
					 .toBeFalsy()

	expect(resultValue).toBeGreaterThan(aNumber)
					   .toBeGreaterThanOrEqual(aNumber)
					   .toBeLessThan(aNumber)
					   .toBeLessThanOrEqual(aNumber)

	expect(resultFloatingPoint).toBeCloseTo(aTargetNumber)					  

	expect(resultString).toMatch(/regExp/)

	expect(resultIterable).toContain(anElement)

	Errors:

		expect(()=>{aFunction(...)}).toThrow( *nothing* |ErrorObject|'errorMessage'| /regExp/)


Unit testing concepts: how to make good tests.
---------------------

- Thorough tests: we want to prove that a single object under test is behaving correctly.
- Stable tests: we dont want the test to break every time we change the implementation of the model.
				Test the interface, not the implementation.
- Fast tests: there can be many test.
- Few tests: reflect the behaviour of the model in as litle tests as possible.

* Dont ever let the tests see the inside of the objects they are testing.

Message origin: 
1) Incoming
2) Sent to self (private messages?)
3) Outgoing

Message type:
A) Query Message   --> No side effects, returns something but doesnt change anything
B) Command Message --> Side efects, returns nothing but changes something
C) Both            --> Change something and return a result (Ej: pop from a list), they are tested differently


How to test:
1)A) Incoming query messages --> making assertions about what they send back
1)B) Incomming command messages --> making assertions about direct public side effects

2)A,B) Private messages --> Do not test from the outside, do not test that the private message will be sent.
							Simply do not test.
3)A) Same as 2)A,B)

3)B) Outgoing command message --> We have to test that the message was sent, not its side effect. Use a mock. (Expect to send).

	A mock plays the role of some object in the real app. They have to be in sync with the app/API (there are tools for that).

---- Pure Functions ----
Pure functions are functions that dont depend on any state, only its input arguments, and do not produce any side effect.
A pure function can call another pure function and still be pure. 
Pure functions are very easy to test. Change a pure function's' implementation does not affect its tests.

---- Mocking ----
Face objects that behave exactly how you want. 
Example: if a function takes some text from an html element, you can change that function for one that returns the text it is supossed to.

Custom mock functions let you check after the test if they were called in the way we expected.

Example of a manual mock use: 
Suposse we want to test a call to an API. From the unit tests, we want to ensure:
1) We are calling the API
2) We are calling the API correctly
The function we are testing wont use the 'fetch' method directly, but call a function/module/object to do so. One parameter to the 
function can be this object we are using to call the API, so when the program works normally, it can use an object to actually call
the API, but when we are testing, we can pass an object that BEHAVES like we want the API to behave. This object can also include a
way to know if it has been called, and with which parameters, so that we can check that in the tests.  

----- Jest Mock Functions -----
Mock functions erase the actual implementation of a function. It captures the calls to a function and its parameters.

1) Using a mock function: 

-------------------------------------------------------------------------------------------------------------------------------
Code example of testing a forEach implementation.
Declaration of 'forEach' ==> forEach(array, functionCallback)

const mockCallback = jest.fn(x => x + 42); // We create a mock function from a function.
forEach([0,1], mockCallback); // We call the actual function we are testing with the mock function as a parameter.

expect(mockCallback.mock.calls.length).toBe(2);
expect(mockCallback.mock.calls[0][0]).toBe(0);
expect(mockCallback.mock.calls[1][0]).toBe(1);
expect(mockCallback.mock.results[0].value).toBe(42);
--------------------------------------------------------------------------------------------------------------------------------

The .mock property of mock functions store data about how the function has been called and its results.

mockCallback.mock.calls     --> array of calls to the function. Each position contains an array with the values of the arguments.
				 .lastCall  --> similar to .calls[length-1]
				 .results   --> array of results of the calls. Each result is an object that contains the 
				 		 .value property: the value of the result.
				 .instances --> array of the object binded to 'this' on each call.


We can set what result we want the mock to be each time it is called, for example:

| const myMock = jest.fn();
| myMock.mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValue(3)
| console.log(myMock(),myMock(),myMock(), myMock()) // prints 1, 2, 3 and 3


2) Using mocks for modules: 
-----------------------------------
import axios from 'axios';

class Users{
	all(){
		return axios.get('/users.json').then(resp => resp.data);
	}
}

jest.mock('axios');
test('should fetch users', ()=>{
	let users = [{name: 'Bob'}];
	let resp = {data: users};
	axios.get.mockResolvedValue(resp) // We override the method 'get' from the axios module, and set it to return 'resp'.

	return Users.all().then(data => expect(data).toEqual(users));
})
-----------------------------------