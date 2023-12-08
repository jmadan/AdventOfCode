import { readInput } from '../utils/readInput';

function isNumber(character: any) {
  const regex = new RegExp('^[0-9]+$');
  return regex.test(character);
}

function arrayTotal(array: any[]) {
  return array.reduce((a, b) => a + b, 0);
}

function extractCordinates(line: string) {
  return line.split('').filter(char => isNumber(char));
}
async function part1() {
  const input = await readInput('1');
  // and then optionally, depending on the input
  const lines = input.split('\n')
  const cordinates = lines.map(line => {
    console.log(line);
    return extractCordinates(line);
  }).map(cordinate => {
    if(cordinate.length > 0) {
      const num = `${cordinate[0]}${cordinate.pop()}`
      return parseInt(num)
    }
  });

  console.log(arrayTotal(cordinates));

};

// part1();


async function part2() {
  // ans is 54019
  const numberInWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  
  const input = await readInput('1');
  // and then optionally, depending on the input
  let lines = input.split('\n')
  const cordinates = lines.map(line => {
    numberInWords.forEach((x, i) => line = line.replaceAll(x, x[0] + (i + 1).toString() + x));
    return line;
  }).map(extractCordinates).map(cordinate => {
    if(cordinate.length > 0) {
      const num = `${cordinate[0]}${cordinate.pop()}`
      return parseInt(num)
    }
  });
  console.log(arrayTotal(cordinates))
};

 part2();
