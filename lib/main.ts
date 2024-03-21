

// a library package to mock process.argv of node

// recommended-lib-name:node-argv-mock,nano-argv-mock

// argv -> nano

// const { log } = console

// categry:transform,check(is,detect)
// str-util-quotation
/**
 * @sample
 * ```ts
 * TrimQuotation(`"ye mian cheng"`)//'ye mian cheng'
 * TrimQuotation(`'ye mian cheng'`)//'ye mian cheng'
 * ```
 */
export function TrimQuotation(s: string) {
  return s.replace(/(^("|'))|(("|')$)/g, "");
}

/**
 * @sample
 * ```ts
 * EndsWithQuotation(`"ye min cong"`)//true
 * EndsWithQuotation(`'ye min cong'`)//true
 * EndsWithQuotation(`'ye min cong`)//false
 * EndsWithQuotation(`ye min cong`)//false
 * ```
 */
export function EndsWithQuotation(s: string) {
  return /("|')$/.test(s);
}

/**
 * @sample
 * ```ts
 * StartWithQuotation(`"ye min cong"`)//true
 * StartWithQuotation(`'ye min cong'`)//true
 * StartWithQuotation(`'ye min cong`)//false
 * StartWithQuotation(`ye min cong`)//false
 * ```
 */
export function StartWithQuotation(s: string) {
  return /^("|')/.test(s);
}

/**
 * is wraped with quotation or correct quotation
 * @sample
 * ```ts
 * WrapedQuotation(`"ye mian cheng"`)//true
 * WrapedQuotation(`'ye mian cheng'`)//true
 * WrapedQuotation(`ye min cong`)//false
 * WrapedQuotation(`'ye mian cheng"`)//false
 * ```
 */
export function WrapedQuotation(s: string) {
  return /(^"[^"]*"$)|(^'[^']*'$)/.test(s);
}

/**
 * @sample
 * ```ts
 * WrapQuotation(`"ye mian cheng"`,'"')//'"ye mian cheng"'
 * WrapQuotation(`ye mian cheng`,'"')//'"ye mian cheng"'
 * ```
 */
export function WrapQuotation(s: string, quote: string = '"') {
  return [quote, TrimQuotation(s), quote].join("");
}

/**
 * find text that wrap with correct quotation
 * @sample
 * ```ts
 * FindQuotationText('--name "ye mian cheng"')//['ye mian cheng']
 * // you can use it to get space item when use cli-args-like as input
 * // find , read . load or parse , which is the best name ?
 * ```
 */
export function FindQuotationText(s: string, trimQuote: boolean = false) {
  // feat(core): def regexp to match quotes space item
  // feat(core): support quotes with double quotes
  // feat(core): support quotes with single quotes
  const reg = /("[^"]*")|('[^']*')/g;

  // feat(core): get match of  quotes space item
  const spaceItemList: string[] | null = s.match(reg);
  // feat(core): trim quotation when match & enable trim-quote
  return spaceItemList
    ? trimQuote
      ? spaceItemList.map((v) => TrimQuotation(v))
      : spaceItemList
    : [];
}

/**
 * find text that not wrap with correct quotation
 * @sample
 * ```ts
 * FindNoQuotationText('--name "ye mian cheng"')//['--name']
 * ```
 */
export function FindNoQuotationText(s: string) {
  const otherItem = s.trim().replace(/("[^"]*")|('[^']*')/g, "");
  return otherItem.split(/ +/).filter((v) => v);
}

/**
 * trim quotation text
 * @sample
 * ```
 * let s = `-hi --name 'ye mian cheng'`
 * let input = TrimQuotationText(s.trim()) //`-hi --name ye mian cheng`
 * ```
 */
export function TrimQuotationText(s: string) {
  let res: string = s;
  // feat(core): trim quotation of args-oline
  const spaceItemList = FindQuotationText(res, false);
  for (let index = 0; index < spaceItemList.length; index++) {
    const spaceItem = spaceItemList[index];
    res = res.replace(spaceItem, TrimQuotation(spaceItem));
  }
  return res;
}

/**
 * make double or single quotation text
 * @sample
 * ```
 * let s = `-hi --name 'ye mian cheng'`
 * let input = NomalizeQuotationText(s.trim()) //`-hi --name "ye mian cheng"`
 * // why use ?
 * // trim quotation of args-oline
 * ```
 */
export function NomalizeQuotationText(
  s: string,
  quoteType: "single-quotation" | "double-quotation" = "double-quotation"
) {
  let res: string = s;
  // feat(core): trim quotation of args-oline
  const spaceItemList = FindQuotationText(res, false);
  for (let index = 0; index < spaceItemList.length; index++) {
    const spaceItem = spaceItemList[index];
    res = res.replace(
      spaceItem,
      WrapQuotation(spaceItem, quoteType === "double-quotation" ? `"` : `'`)
    );
  }
  return res;
}

// feat(core): mock process.argv
// feat(core): like using argv as func input
/**
 * argv stro to argv arro
 * @sample
 * ```ts
 * let input:string=''
 * input = `you say -hi --name 'ye mian cheng' --first-name ye --old-name "ye min cong"`
 * argv = MockProcessAgrv(input)
 * //["you","say","-hi","--name","ye mian cheng","--first-name","ye","--old-name","ye min cong"]
 * // why use ?
 * // mock process.argv
 * // like using argv as func input
 * ```
 */
export function LikeArgv(s: string) {
  const res: string[] = [];
  const input = s.trim();
  // code(core): no need to nomalize quotation text
  // input = NomalizeQuotationText(input)

  const list: string[] = input.split(/ /);
  let currIsItem: boolean = true;
  let cacheCurr: string[] = [];
  // /* eslint-disable no-plusplus */
  for (let i = 0; i < list.length; i++) {
    // const previous = list[i - 1]
    const curr = list[i];

    // const next = list[i + 1]
    // code(core): detect curr type
    // code(core): no to detect curr type when currIsItem false
    if (currIsItem) {
      currIsItem = StartWithQuotation(curr) ? false : true;
    }

    // case is [`"xx`,`xx"`]
    if (!currIsItem) {
      if (EndsWithQuotation(curr)) {
        // case is [`"xx"`] or [`'xx`]
        currIsItem = true;
        res.push(TrimQuotation([...cacheCurr, curr].join(" ")));
        cacheCurr = [];
      } else {
        // case is [`"xx`,`xx"`]
        cacheCurr.push(curr);
      }
    } else {
      // case is [`xx`] or [`xx`]
      res.push(TrimQuotation(curr));
    }
    // log middleware cache value
    // log(curr, currIsItem, cacheCurr)
  }
  return res;
}
export default LikeArgv;

/**
 *
 * @sample
 * ```ts
 * ArgvArro2ArgvStro(['--name','ye mincong']) // `--name "ye mincong"`
 * ArgvArro2ArgvStro(['--name','"ye mincong"']) // `--name "ye mincong"`
 * ArgvArro2ArgvStro(['--name',`'ye mincong'`]) // `--name "ye mincong"`
 * ArgvArro2ArgvStro(['--name','ye']) // `--name ye`
 * //ArgvArro2ArgvStro(['--name',`'ye'`]) // `--name 'ye'`
 * ```
 */
export function ArgvArro2ArgvStro(s: string[]) {
  let res = s
    .map((v) => {
      if (v.indexOf(" ") >= 0) {
        return WrapedQuotation(v) ? v : WrapQuotation(v, `"`);
      }
      return v;
    })
    .join(" ");
  res = NomalizeQuotationText(res, "double-quotation");
  return res;
}

export function ArgvStrify(s: string | string[]) {
  return Array.isArray(s)
    ? ArgvArro2ArgvStro(s)
    : NomalizeQuotationText(s, "double-quotation");
}

export function ArgvArrify(s: string | string[]) {
  return Array.isArray(s) ? s : LikeArgv(s);
}

/**
 *
 * @sample
 * ```ts
 * let lockPrefix : boolean = true
 * if(!lockPrefix || (lockPrefix && argvStroStartWithPrefix(input,'your code'))){main(input)}
 * ```
 */
export function argvStroStartWithPrefix(s: string | string[], prefix: string) {
  const str = Array.isArray(s) ? s.join(" ") : s;
  return str.trim().indexOf(prefix) == 0;
}

/**
 *
 * @sample
 * ```ts
 * // main will be called any time
 * argvStroTailCall(input,main)
 * // when lockPrefix pass, main will be only called when input start with prefix
 * argvStroTailCall(input,main,lockPrefix)
 * argvStroTailCall(input,main,'your code)
 * ```
 */
export function argvStroCallMain(
  input: string | string[],
  main: () => any, //eslint-disable-line
  prefix: string = ""
) {
  if (!prefix || (prefix && argvStroStartWithPrefix(input, prefix))) {
    return main();
  }
  return null;
}

/**
 *
 * @sample
 * ```ts
 * argvStroIndexOfKV(input,'--env-is-script true')
 * ```
 */
export function argvStroIndexOfKV(s: string | string[], kv: string) {
  const str = Array.isArray(s) ? s.join(" ") : s;
  return str.indexOf(kv) >= 0;
}

// argv slice from index two
//

// function ArgvStroHasPropTrue(name: string, s: string) {
//     let reg: RegExp = /(--help +true)|(-h)/i
//     if (reg.test(s)) {
//         return true
//     }
//     reg = /(--help +false)|--no-help/i
//     if (reg.test(s)) {
//         return false
//     }
//     // --help
// }

// function GetProcessArgv(startIndex: number = 2) {
//     return process.argv.slice(startIndex)
// }

// function JsonOlineify(json: any) {
//     return JSON.stringify(json, null, 0)
// }
// function JsonMlineify(json: any) {
//     return JSON.stringify(json, null, 2)
// }

// function InfoIt(argv: string[], format: string = '', msg: string = '') {
//     let res: string[] = []
//     if (msg) {
//         res.push(`[info] ${msg}:`)
//     }
//     let body: any = ''
//     switch (format) {
//         case 'oline':
//             body = JsonOlineify(argv)
//             break;
//         case 'mline':
//             body = JsonOlineify(argv)
//             break;
//         case 'raw':
//         default:
//             body = argv
//             break;
//     }
//     log(res.join('\n'))
//     log(body)
// }
// function main() {
//     let argv: string[] = []
//     let input: string = `-hi --name "ye mian cheng" --first-name ye --old-name "ye min cong" `
//     // mix quotation
//     input = `-hi --name 'ye mian cheng' --first-name ye --old-name "ye min cong" `

//     log(`[info] find quotation text:`, FindQuotationText(input))
//     log(`[info] nomalize quotation text:`, NomalizeQuotationText(input))

//     argv = LikeArgv(input)
//     InfoIt(argv, 'raw', `like argv:`)
//     // argv = GetProcessArgv(2)
//     // InfoIt(argv, 'raw', `load process argv`)
// }
// main()

// todo: hanzi to pinyin (js-project)
//

// tsx script/argv.ts
