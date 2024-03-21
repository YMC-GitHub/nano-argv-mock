import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { builtinModules } from 'node:module'
import { defineConfig } from 'vite'
// import plainText from 'vite-plugin-plain-text';
import banner from 'vite-plugin-banner'
import eslint from "vite-plugin-eslint";

import pkg from './package.json'
// import fg from 'fast-glob';

const isDevEnv = process.argv.slice(2).includes('--watch')
const jsfileOutDir: string = "dist"
const tsTypeOutDir: string = "types"

const jsfileSrcDir='lib'
// const tsentryloc = path.join(__dirname,jsfileSrcDir)
// const ignoretest=['test.ts','__test__.ts']
// const tsentryfiles = fs.readdirSync(tsentryloc).filter(n => n.endsWith('.ts')).filter(n => !ignoretest.some(label=>n.endsWith(label)))
// console.log(tsentryfiles)
// const {log}=console


// 'min'

let  plugins =[
  isDevEnv?eslint({ lintOnStart: true, cache: false }):undefined,
  // allow all *.md files can be import as es module
  // plainText(['*.md'], { namedExport: false, dtsAutoGen: true, distAutoClean: true },),
  {
      name: 'generate-types',
      async closeBundle() {
          if (process.env.NODE_ENV === 'test') return

          removeTypes()
          await generateTypes()
          moveTypesToDist()
          removeTypes()
      },
  },
  banner(
    `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
  )
]

export default defineConfig({
    build: {
        minify: false,
        outDir: jsfileOutDir,
        emptyOutDir: !isDevEnv,
        // target: 'node14',
        lib: {
            entry: [jsfileSrcDir,'main.ts'].join("/"),
            // formats: ['cjs', 'es','umd'],
            name: 'nanoargvmock',
            formats: ['cjs', 'es','umd'],
            // fileName: format => format === 'es' ? '[name].mjs' : '[name].js',
            fileName: format => format === 'es' ? '[name].js' : format === 'umd' ?'[name].umd.cjs':'[name].cjs',
        },
        rollupOptions: {
            external: [
                'vite',
                ...builtinModules,
                ...builtinModules.map(m => `node:${m}`),
                ...Object.keys('dependencies' in pkg ? pkg.dependencies as object : {}),
            ],
            output: {
                exports: 'named',
            },
        },
    },
    plugins: plugins.filter(v=>v)
})

// eslint-disable-next-line
function makeLibFileName(format){
  const res =  format === 'es' ? '[name].js' : format === 'umd' ?'[name].umd.cjs':'[name].cjs'
  return res
}

function removeTypes() {
    console.log(`[types] declaration remove`)
    fs.rmSync(path.join(__dirname, tsTypeOutDir), { recursive: true, force: true })
}

function generateTypes() {
    return new Promise(resolve => {
        const cp = spawn(
            process.platform === 'win32' ? 'npm.cmd' : 'npm',
            ['run', 'types'],
            { stdio: 'inherit' },
        )
        cp.on('exit', code => {
            !code && console.log('[types]', 'declaration generated')
            resolve(code)
        })
        cp.on('error', process.exit)
    })
}

function moveTypesToDist() {
    const types = path.join(__dirname, tsTypeOutDir,jsfileSrcDir)
    const dist = path.join(__dirname, jsfileOutDir)
    // if(!fs.existsSync(types)) return
    const files = fs.readdirSync(types).filter(n => n.endsWith('.d.ts'))
    for (const file of files) {
        fs.copyFileSync(path.join(types, file), path.join(dist, file))
        console.log('[types]', `${tsTypeOutDir}/${file} -> ${jsfileOutDir}/${file}`)
    }
}