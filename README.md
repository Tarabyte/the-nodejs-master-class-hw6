# The NodeJS Masterclass Homework Assignment #6

The NodeJS Masterclass homework assignment #6

# The Assignment:

Of all the modules we just explored, the Cluster module is likely the most important for performance. In this homework assignment, please return to your "Hello World" API from the first homework assignment, and refactor it to run across all the cores of your machine (using the cluster module).

When a request comes in, it should respond to it just as normal (only once).

# Implementation Details

Sends server date time when asked for `/hello`

```json
// ANY /hello
{
  "message": "Hi there!",
  "now": "<ISO DateTime>",
  "pid": <Responder process id>
}
```

Supports environment based configuration via `.env.<NODE_ENV>.json` files.

- Staging (default)

```
PORT = 3000
```

- Production

```
PORT = 5000
```
