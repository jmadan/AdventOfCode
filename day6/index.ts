import { readInput } from '../utils/readInput';

async function part1() {
    const input = (await readInput('6')).split('\n');
    const timeToDistance: Map<number, number> = new Map();
    // let time: number = 0
    // let distance: number = 0
    input.forEach((line) => {
        line.split(":")[1].split(" ").filter((x) => x !== "").map((x) => parseInt(x, 10)).join("")
        
    })
    timeToDistance.set(35696887, 213116810861248);
    const start = Date.now();

    const possibleCombinations: number[] = [];
    timeToDistance.forEach((distance, time) => {
        let buttonPressed = 0;
        let count = 0;
        for(let i=0; i<time; i++){
            const distanceTravelled = i * (time - i);
            if(distanceTravelled > distance){
                count++;
            }
        }
        possibleCombinations.push(count)
    })

    console.log(possibleCombinations);
    const end = Date.now();
    console.log(`Time: ${end - start}ms`)
    
}

console.log(await part1());