a library package to mock process.argv of node

a library package to pasre prompt to command-line style string


## File size

file | size | gzip | brotli
:---- | :---- | :---- | :----
dist/main.cjs | 3.95kb | 1.20kb | 1.08kb
dist/main.js | 3.45kb | 1.07kb | 0.95kb
dist/main.min.cjs | 2.77kb | 0.97kb | 0.86kb
dist/main.min.js | 2.29kb | 0.84kb | 0.75kb
dist/main.umd.cjs | 4.52kb | 1.34kb | 1.20kb
dist/main.umd.min.cjs | 2.17kb | 0.99kb | 0.86kb

## Background

There has been a requirement to parse command-line style string.

I have written about a command line tool, and I want to write a web version of it, requiring that its command line input be directly used in the web version, that is, it can be directly used in other libraries.

For the developer, I don't want to design its user interface anymore; for the user, the user can use it directly elsewhere, not necessarily in the command line window.

But for the user's input, I am not at ease. Because the user's input does not necessarily meet the entry requirements of the program. Therefore, I need an 'it' to convert user input into a "standardized" command line style string.

## Features

- parse prompt to command-line style string
- use string as prompt input

## User installing

- You can import directly via npm cdn
```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/nano-argv-mock@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- You can install it via the npm library tool
```bash
npm i nano-argv-mock
```

```bash
yarn add nano-argv-mock
```

```bash
pnpm add nano-argv-mock
```

```ts
import {LikeArgv} from 'nano-argv-mock'
console.log(LikeArgv(`you say -hi --name 'ye mian cheng' --first-name ye --old-name "ye min cong"`))
// ["you","say","-hi","--name","ye mian cheng","--first-name","ye","--old-name","ye min cong"]
```


## Product Closed Loop

Small, single function, only do one thing - parse prompt to command-line style string

## Product operation and maintenance

Because the function is simple, it determines its development speed, update speed, problem speed will not be slow

## Product plans

Because the function is simple, the function has been basically completed. In the later stage, small patches will be updated mainly according to the needs of binary packages or other library packages. There will be no major changes in functions. The architecture may change with the update of technology.

## License certificate

You can do anything with it, but please do not violate the laws of your area. I will not accept any responsibility for your actions.


## Concluding remarks

> I am proud to be a programmer, and although I don't leave home, I have the power to change the world (maybe a little big) at my fingertips. Even if it can't be achieved, it's a good goal to strive for. -- from lencx

It is a blank sheet of paper, you have any ideas, you can directly code out, how to compile, how to set the rules, you decide.

