import { readInput } from "../utils/readInput";

const getNextDestination = (id: number, startingLine: number, endingLine: number, lines: string[]) => {

    for (let lineNum = startingLine; lineNum < endingLine; lineNum++) {
        const [destStart, sourceStart, span] = lines[lineNum].split(/\s+/, 3).map(Number);

        if (id >= sourceStart && id < sourceStart + span) {
            return destStart + (id - sourceStart);
        }
    }
    return id;

}

const getPreviousSource  = (id: number, startingLine: number, endingLine: number, lines: string[]) => {

    for (let lineNum = startingLine; lineNum < endingLine; lineNum++) {
        const [destStart, sourceStart, span] = lines[lineNum].split(/\s+/, 3).map(Number);

        if (id >= destStart && id < destStart + span) {
            return sourceStart + (id - destStart);
        }
    }

    return id;

}
const part2 = async () => {
    const input = (await readInput('5'));
    const lines = input.trim().split(/\n/g);

    // seeds
    const seedArray = lines[0].split(': ')[1].split(/\s+/).map(Number);

    const seedMap: Map<number,number> = new Map<number,number>();
    for (let seedIndex = 0; seedIndex < seedArray.length; seedIndex += 2) {
        seedMap.set(seedArray[seedIndex], seedArray[seedIndex] + seedArray[seedIndex + 1]);
    }

    const startingLines = {
        "Seed": 0,
        "Soil": 0,
        "Fertilizer": 0,
        "Water": 0,
        "Light": 0,
        "Temp": 0,
        "Humidity": 0,
    };
    
    for (let lineNum = 1; lineNum < lines.length; lineNum++) {
        switch (lines[lineNum]) {
        case 'seed-to-soil map:':
            startingLines['Seed'] = lineNum;
            break;
        case 'soil-to-fertilizer map:':
            startingLines['Soil'] = lineNum;
            break;
        case 'fertilizer-to-water map:':
            startingLines['Fertilizer'] = lineNum;
            break;
        case 'water-to-light map:':
            startingLines['Water'] = lineNum;
            break;
        case 'light-to-temperature map:':
            startingLines['Light'] = lineNum;
            break;
        case 'temperature-to-humidity map:':
            startingLines['Temp'] = lineNum;
            break;
        case 'humidity-to-location map:':
            startingLines['Humidity'] = lineNum;
            break;
        }
    }

    for (let lineNum = startingLines['Humidity'] + 1; lineNum < lines.length; lineNum++) {
        const [destStart, sourceStart, span] = lines[lineNum].split(/\s+/, 3).map(Number);

        for (let currentLoc = destStart; currentLoc < destStart + span; currentLoc++) {

            let currentSource = sourceStart + (currentLoc - destStart);
            currentSource = getPreviousSource(currentSource, startingLines['Temp'] + 1, startingLines['Humidity'] - 1, lines);
            currentSource = getPreviousSource(currentSource, startingLines['Light'] + 1, startingLines['Temp'] - 1, lines);
            currentSource = getPreviousSource(currentSource, startingLines['Water'] + 1, startingLines['Light'] - 1, lines);
            currentSource = getPreviousSource(currentSource, startingLines['Fertilizer'] + 1, startingLines['Water'] - 1, lines);
            currentSource = getPreviousSource(currentSource, startingLines['Soil'] + 1, startingLines['Fertilizer'] - 1, lines);
            currentSource = getPreviousSource(currentSource, startingLines['Seed'] + 1, startingLines['Soil'] - 1, lines);

            for (let [startSeed, endSeed] of seedMap.entries()) {
                if (currentSource >= startSeed && currentSource <= endSeed) {
                    console.log(`Minimum Location = ${currentLoc}`);
                    return;
                }
            }

            if (currentLoc % 100000 === 0) { 
                console.log(`${currentLoc}`);
            }
        }

    }
    
};

console.log(await part2());