----------STACK, WEBAPI, EVENT LOOP, TASK QUEUE (seminar version)----------

Javascript has an execution stack that holds the function calls ('function contexts'), whenever we do some async task, the stack holds the function for a moment and then lets it go, so that the webapi (or node in the backend) finishes or waits for the action to be complete. When it is, the callback asociated with that action is pushed onto the task queue, and when the stack is empty, the event loop will push the callback to the stack and execute it.

Loupe --> app that allows to visualize all the process.

For example, if you attach an event listener to a button, the code that does that stays in the webapi (until it is retired), and with each click, the handler for that button will be put in the callback queue, and the event loop will put them IN ORDER into the stack.

Note: setTimeout(f, n) --> n is the minimum time you'll' have to wait until f is executed, it can be delayed by other callbacks in the callback queue

The browser also has a render queue, but it can only render things when the stack is empty, otherwise it will keep on adding things.

Summary: Don't' put slow shit on the stack, becase it will make the rendering of the webpage slow.

---https://www.youtube.com/watch?v=dX2lThXc0p4---

setTimeout() is a function provided by the Web API, in other words, the browser (o node).
los onClick y otros atributos designados para callbacks tambien son manejados por la Web API. Es decir, cuando se registra un callback asociado a un elemento HTML por ejemplo, la Web API retiene la función callback asociada.

Event queues (by priority):
-Microtasks --> promises
-Render 
-DOM modification 
-User Interaction
-Timer