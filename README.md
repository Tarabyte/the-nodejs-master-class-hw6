# the-nodejs-master-class-hw1

The NodeJS Masterclass homework assignment #1

# The Assignment:

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice.

1. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.

# Implementation Details

Sends server date time when asked for `/hello`

```json
// ANY /hello
{
  "message": "Hi there!",
  "now": "<ISO DateTime>"
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
