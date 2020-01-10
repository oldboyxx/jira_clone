<h1 align="center">A simplified Jira clone built with React and Node</h1>

<div align="center">Auto formatted with Prettier, tested with Cypress 🎗</div>

<h3 align="center">
  <a href="https://www.codetree.co">Visit the live app</a> |
  <a href="https://github.com/oldboyxx/jira_clone/tree/master/client">View client</a> |
  <a href="https://github.com/oldboyxx/jira_clone/tree/master/api">View API</a>
</h3>

![Tech logos](https://i.ibb.co/w4Y9K8Z/tech.jpg)

![App screenshot](https://i.ibb.co/HDwwh6L/jira-clone-optimized.jpg)

## Setting up development environment

1. Install postgreSQL if you don't have it already and create a database named `jira_development`.
2. `git clone https://github.com/oldboyxx/jira_clone.git`
3. Create an empty `.env` file in `/api`, copy `/api/.env.example` contents into it, and fill in your database username and password.
4. `npm run install-dependencies`
5. `cd api && npm start`
6. `cd client && npm start` in another terminal tab
7. App should now be running on `http://localhost:8080/`

## Running cypress end-to-end tests

1. Set up development environment
2. Create a database named `jira_test` and start the api with `cd api && npm run start:test`
3. `cd client && npm run test:cypress`

<hr>

<h3>
  <a href="https://www.codetree.co">Visit the live app</a> |
  <a href="https://github.com/oldboyxx/jira_clone/tree/master/client">View client</a> |
  <a href="https://github.com/oldboyxx/jira_clone/tree/master/api">View API</a>
</h3>
