# autoSA-frontend
Vue.js frontend for autoSA

## Requirements
- node

### Technologies Used
- Netlify
- Vue.js (Vue 3)
- [TailwindCSS](https://tailwindcss.com/)
- [Element-Plus](https://element-plus.org/en-US/component/button.html)

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

**IMPORTANT NOTE:** When the dev server is running, whatever change you make will
be live updated in your browser window when you open the link it provides :) 

By default, the server will be served at `http://localhost:3000/` when you run it.

Furthermore, a proxy is created to our backend served at `http://localhost:3000/api/`. When you run requests again `./api/`, they will automatically be forwarded to our (production!) backend.

### How to Add a Webpage

1. Inside of `./src/views/` create a `PageName.vue` file.

Inside of the the file, to add HTML, write a `<template></template>` tag and put your html inside of this.
```html
<template>
    <h1>Hello World!</h1>
</template>
```
If you want to add CSS to that file:
```html
<template>
    <h1 class="red">Hello World!</h1>
</template>

<style>
.red { color: red }
</style>
```
If you want to add JavaScript:
```html
<template>
    <!-- Render variables onto the page like this -->
    <h1 class="red">{{ text }}</h1>
</template>

<script setup> <!-- Noice the "setup" in this tag -->

const text = 'Hello'

</script>

<style>
.red { color: red }
</style>
```

### How to Add Images
Add static images to the `./public/` directory, then access them in your html like this:
```html
<template>
    <img src="/image.png" />
</template>
```


### Before you commit: Linting!
Please make sure to run 

```cmd
npm run lint
```
or

```cmd
yarn lint
```

before commiting anything, so that all code looks pretty!