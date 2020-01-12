# Project structure 🏗

I've used this architecture on multiple larger projects in the past and it performed really well.

There are two special root folders in `src`: `App` and `shared` (described below). All other root folders in `src` (in our case only two: `Auth` and `Project`) should follow the structure of the routes. We can call these folders modules.

The main rule to follow: **Files from one module can only import from ancestor folders within the same module or from `src/shared`.** This makes the codebase easier to understand, and if you're fiddling with code in one module, you will never introduce a bug in another module.

<br>

| File or folder   | Description                                                                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.jsx`  | The entry file. This is where we import babel polyfills and render the App into the root DOM node.                                                                                                   |
| `src/index.html` | The only HTML file in our App. All scripts and styles will be injected here by Webpack.                                                                                                              |
| `src/App`        | Main application routes, components that need to be mounted at all times regardless of current route, global css styles, fonts, etc. Basically anything considered global / ancestor of all modules. |
| `src/Auth`       | Authentication module                                                                                                                                                                                |
| `src/Project`    | Project module                                                                                                                                                                                       |
| `src/shared`     | Components, constants, utils, hooks, styles etc. that can be used anywhere in the codebase. Any module is allowed to import from shared.                                                             |
