# Jira clone API built with Node/TypeScript

The API codebase is fairly simple and should be easy enough to understand.

### Project structure

<br>

<!-- prettier-ignore-start -->
| File or folder  | Description                                                                                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.ts`    | The entry file. This is where we setup middleware, attach routes, initialize database and express.                                                                                |
| `src/routes.ts`   | This is where we define all routes, both public and private.                                                                                                                      |
| `src/constants`   | Constants are values that never change and are used in multiple places across the codebase.                                                                                       |
| `src/controllers` | Controllers listen to client's requests and work with entities and the database to fetch, add, update, or delete data.                                                            |
| `src/database`    | Database related code and seeds go here.                                                                                                                                          |
| `src/entities`    | This is where we put TypeORM entities, you could think of them as models. We define columns, relations, validations for each database entity.                                     |
| `src/errors`      | This is where we define custom errors. The `catchErrors` function helps us avoid repetitive `try/catch` blocks within controllers.                                                |
| `src/middleware`  | Middleware functions can modify request and response objects, end the request-response cycle, etc. For example `authenticateUser` method verifies the authorization token and attaches `currentUser` to the request object.                                                                                                                             |
| `src/serializers` | Serializers transform the data fetched from the database before it's sent to the client.                                                                                          |
| `src/utils`       | Utility(helper) functions that are used in multiple places across the codebase. For example `utils/typeorm.ts` functions help us validate data and avoid writing repetitive code. |
<!-- prettier-ignore-end -->

<br>

### What's missing?

There are features missing from this showcase API which should exist in a real product:

#### Migrations

We're currently using TypeORM's `synchronize` feature which auto creates the database schema on every application launch. It's fine to do this in a showcase product or during early development while the product is not used by anyone, but before going live with a real product, we should [introduce migrations](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md).

#### Proper authentication system

We currently auto create an auth token and seed a project with issues and users for anyone who visits the API without valid credentials. In a real product we'd want to implement a proper [email and password authentication system](https://www.google.com/search?q=email+and+password+authentication+node+js&oq=email+and+password+authentication+node+js).

#### Unit/Integration tests

This API is currently tested by the Client through [end-to-end Cypress tests](https://github.com/oldboyxx/jira_clone/tree/master/client/cypress/integration). That's good enough for a relatively simple application such as this, even if it was a real product. However, as the API grows in complexity, it might be wise to start writing additional API-specific unit/integration tests.
