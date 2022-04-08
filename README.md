# autoSA-frontend
Vue.js frontend for autoSA

## Requirements
- node

Install with:
```cmd
npm install
```
or
```cmd
yarn install
```

### Technologies Used
- Netlify
- Vue.js (Vue 3)
- [TailwindCSS](https://tailwindcss.com/)
- [Element-Plus](https://element-plus.org/en-US/component/button.html)

For testing, we are using:
- Vitest
- jsdom (to mock dom elements)
- Mock Service Worker (msw, to mock requests)

### Useful Extensions for editing

| Extension name | URL | Description |
| -------------- | --- | ----------- |
| Tailwind CSS Intellisense | https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss | Useful linting for easier time editing with Tailwind CSS. |
| Volar | https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar | Useful linting for Vue.js |
| es6-string-html | https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html | Allows for html linting in JavaScript code |

## Getting Started

### How to start the Development Server

If using npm:
```cmd
npm run dev
```
If using yarn:
```cmd
yarn dev
```

By default, the server will be served at `http://localhost:3000/` when you run it.
You will need the backend server to run in another terminal. By default, a proxy is created and all requests to `http://localhost:3000/api/` will automatically be forwarded to the backend running at `http://localhost:8000`. 

### Frequently used commands

For linting, run:
```cmd
npm run lint
```

For testing, you can either do a single run:
```cmd
npm run test
```

Or continuously watch the tests:
```cmd
npm run watch-tests
```

You can further checkout the coverage of the tests with:
```cmd
npm run coverage
```
...this will create a new folder called `coverage`. 


Furthermore, a proxy is created to our backend served at `http://localhost:3000/api/`. When you run requests against `./api/`, they will automatically be forwarded to backend.


### Before you commit: Linting & Testing!
Please make sure to run 

```cmd
npm run lint
npm run test
```
or

```cmd
yarn lint
yarn test
```

before commiting things / creating a PR, so that all code looks pretty & is tested!

### Static files
Add static images to the `./public/` directory, then access them in your html like this:
```html
<template>
    <img src="/image.png" />
</template>
```