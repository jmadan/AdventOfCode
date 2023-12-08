//only 12 red cubes, 13 green cubes, and 14 blue cubes
import { readInput } from '../utils/readInput';

export type numberPositions = { value: number, positions: { x: number, y: number }[] }[];
async function part1() {
    const input = (await readInput('3', false)).split('\n');
    let { symbolPositions, numbers }: { symbolPositions: { x: number; y: number; }[]; numbers: numberPositions; } = GetSymbolPositions(input);

    const possibleNumbers = symbolPositions.flatMap(({ x, y }) => {
        let possibleNumbers = numbers.filter(({positions}) => {
            return positions.some(p => {
                if((p.x === (x-1) || p.x === (x+1) || p.x === x) && (p.y === y || p.y === (y-1) || p.y === (y+1))){
                    return true;
                }
            })
        })
        return possibleNumbers;
    });
    // filter out duplicates with same positions[0]
    const possibleNumbersSet = [...new Set(possibleNumbers.map(({ positions }) => positions[0]))
        .values()].map(p => possibleNumbers.find(({ positions }) => positions[0] === p)!);

    return possibleNumbersSet.reduce((acc, { value }) => acc + value, 0).toString();

}

function GetSymbolPositions(input: string[]) {
    let numbers: numberPositions = [];
    let symbolRegex = /[^\d\s\\.]/g;
    let numberRegex = /\d+/g;
    let symbolPositions: { x: number; y: number; }[] = [];

    const maxRows = input.length;

    for (let row = 0; row < maxRows; row++) {
        let line = input[row];
        let match: RegExpExecArray | null;
        while ((match = numberRegex.exec(line)) !== null) {
            let numberValue = parseInt(match[0]);
            numbers.push({ value: numberValue, positions: Array.from({ length: `${numberValue}`.length }, (_, i) => ({ x: match!.index + i, y: row })) });
        }
        let symbolMatch: RegExpExecArray | null;
        while ((symbolMatch = symbolRegex.exec(line)) !== null) {
            symbolPositions.push({ x: symbolMatch.index, y: row });
        }
    }
    return { symbolPositions, numbers };
}

async function part2(){
    const input = (await readInput('3', false)).split('\n');
    let { symbolPositions, numbers }: { symbolPositions: { x: number; y: number; }[]; numbers: numberPositions; } = GetSymbolPositions(input);

    const possibleNumbers = symbolPositions.flatMap(({ x, y }) => {
        let possibleNumbers = numbers.filter(({positions}) => {
            return positions.some(p => {
                if((p.x === (x-1) || p.x === (x+1) || p.x === x) && (p.y === y || p.y === (y-1) || p.y === (y+1))){
                    return true;
                }
            })
        })

        if (possibleNumbers.length !== 2) {
            return [];
        }
        return [possibleNumbers[0].value * possibleNumbers[1].value];
    });

    return possibleNumbers.reduce((acc, value ) => acc + value, 0).toString();

}

console.log(await part2());

