// recomended vscode ext: vitest.explorer
// you can run 'pnpm run test' to test
// you can click test label to test when vitest.explorer installing

import { LikeArgv } from "./main";
// import { jest } from '@jest/globals'
// //
// // npm i --save-dev @types/jest
// // pnpm add -D  @types/jest
// test('adds 1 + 2 to equal 3', () => {
//   nanoargs(`ns cmd -a -b -c -- -a -b -c`)
//   expect(sum(1, 2)).toBe(3);
// });

// - test(core): the base test env
function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// console.log(LikeArgv(`you say -hi --name 'ye mian cheng' --first-name ye --old-name "ye min cong"`))
test("nano argv mock", () => {
  const cmdstylestr = `you say -hi --name 'ye mian cheng' --first-name ye --old-name "ye min cong"`;
  const argv = LikeArgv(cmdstylestr);
  const exp = [
    "you",
    "say",
    "-hi",
    "--name",
    "ye mian cheng",
    "--first-name",
    "ye",
    "--old-name",
    "ye min cong",
  ];
  expect(argv.join(" ")).toBe(exp.join(" "));
  argv.forEach((k, index) => {
    expect(k).toBe(exp[index]);
  });
});
