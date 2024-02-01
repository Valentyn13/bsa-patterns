# Importan notes

## \* Observer pattern task

In this task, I have created 2 observers (ErrorLogObserver and InfoLogObserver) and 1 publisher (Subject). The code associated with this task is located in the `/server/src/observer` folder.

I have created a logging system with `info` and `error` levels. The `Info` level logs are written to the `/server/src/logs` folder, a log file is created when the first log appears.

Error handling in the application is done in the handler layer. To show how the `error` logs work, I throw an error when methods receive empty strings (I know that such validation is better done on the frontend and not allow sending requests with invalid data to the server, also I realize that my handlers are too big, if I had more time I would rewrite this code, please don't downgrade me if you see such small errors). On the frontend, when a user submits a request with an empty string, I just return the previous title or description.

## \* Proxy pattern task

The code associated with this task is in the `server/src/proxy` folder. In the log file I record the time and parameters that come to the reordering methods on the backend.

## \* Prototype pattern task

To implement this pattern I add the `clone` method to `Card` class. Location: `server/data/models`.

## \* Frontend ReorderService task(Functional programming)

As I understand it, the challenge was to find duplicate code and make them reusable (create a small function and then build methods that use that function). In the reorder.service file on the frontend, I left the object with 2 methods, just for the convenience of calling them in the Workspace.tsx file. I moved all the small functions to the `/client/src/helpers/reorder` folder.

## \* Eslint

I added airbnb eslint rules to the project. It might have been a mistake, because I had to fix all the linter bugs and the code style was changed a lot because of those rules. But I hope you add some points to my result 😆😅

## To Sum Up

I am not sure that i made all task perfectly, but I can say that this home assignment was quite difficul for me but i tried to do this hw efficiently and on time. Hope I save some your time.

Thank you for your work!

## Start the application

1. Install dependencies

```
npm i
```

2. Start backend

```
npm start -w server
```

3. Start client

```
npm start -w client
```
