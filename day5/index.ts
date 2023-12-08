//only 12 red cubes, 13 green cubes, and 14 blue cubes
import { readInput } from '../utils/readInput';

type FarmingMap = {
    destination: number,
    source: number,
    range: number,
}

async function part1() {
    const input = (await readInput('5')).split('\n');;
    const numberRegex = /\d+/g;
    const stringRegex = /[a-zA-Z]+/g;
    let match: RegExpExecArray | null;
    let numRow: number[] = []
    const farmingMap = {
        seeds: [] as number[],
        seedtosoilmap: [] as FarmingMap[],
        soiltofertilizermap: [] as FarmingMap[],
        fertilizertowatermap: [] as FarmingMap[],
        watertolightmap: [] as FarmingMap[],
        lighttotemperaturemap: [] as FarmingMap[],
        temperaturetohumiditymap: [] as FarmingMap[],
        humiditytolocationmap: [] as FarmingMap[],
    }

    let str = "";
    let seedsToPlant = [];
    // for(let i=0; i<2; i++){
    //     while((match = numberRegex.exec(input[i])) !== null){
    //         const num = parseInt(match[0]);
    //         seedsToPlant.push(num);
    //     }
    // }
    // const seedMap: Map<number,number> = new Map<number,number>();
    // for (let seedIndex = 0; seedIndex < seedsToPlant.length; seedIndex += 2) {
    //     seedMap.set(seedsToPlant[seedIndex], seedsToPlant[seedIndex] + seedsToPlant[seedIndex + 1]);
    // }

    for(let i = 2; i < input.length; i++){
        if(input[i] === ""){
            str = "";
            continue;
        }

        while((match = stringRegex.exec(input[i])) !== null){
            str += match[0];
        }
        numRow = [];
        while((match = numberRegex.exec(input[i])) !== null){
            const num = parseInt(match[0]);
            numRow.push(num);
        }
        if(numRow.length === 0) continue;
        switch(str){
            case "seeds":
                farmingMap.seeds.push(...numRow);
                break;
            case "seedtosoilmap":
                farmingMap.seedtosoilmap.push({destination: numRow[0], source: numRow[1], range: numRow[2]});
                break;
            case "soiltofertilizermap":
                farmingMap.soiltofertilizermap.push({destination: numRow[0], source: numRow[1], range: numRow[2]});
                break;
            case "fertilizertowatermap":
                farmingMap.fertilizertowatermap.push({destination: numRow[0], source: numRow[1], range: numRow[2]});
                break;
            case "watertolightmap":
                farmingMap.watertolightmap.push({destination: numRow[0], source: numRow[1], range: numRow[2]});
                break;
            case "lighttotemperaturemap":
                farmingMap.lighttotemperaturemap.push({destination: numRow[0], source: numRow[1], range: numRow[2]});
                break;
            case "temperaturetohumiditymap":
                farmingMap.temperaturetohumiditymap.push({destination: numRow[0], source: numRow[1], range: numRow[2]});
                break;
            case "humiditytolocationmap":
                farmingMap.humiditytolocationmap.push({destination: numRow[0], source: numRow[1], range: numRow[2]});
                break;
            default:
                break;
        
        }
    };

    // console.log(farmingMap);
    const minLocation = [];

    for (let [startSeed, endSeed] of seedMap.entries()) {
        for(let i = startSeed; i <= endSeed; i++){
            let min=0;
            min = await getSeedLink(farmingMap.seedtosoilmap, i);
            min = await getSeedLink(farmingMap.soiltofertilizermap, min);
            min = await getSeedLink(farmingMap.fertilizertowatermap, min);
            min = await getSeedLink(farmingMap.watertolightmap, min);
            min = await getSeedLink(farmingMap.lighttotemperaturemap, min);
            min = await getSeedLink(farmingMap.temperaturetohumiditymap, min);
            min = await getSeedLink(farmingMap.humiditytolocationmap, min);
            minLocation.push(min);    
        }
    }

    // const minLocation = await Promise.all(farmingMap.seeds.map(async (seed) => {
    //     let min=0;
    //     min = await getSeedLink(farmingMap.seedtosoilmap, seed);
    //     min = await getSeedLink(farmingMap.soiltofertilizermap, min);
    //     min = await getSeedLink(farmingMap.fertilizertowatermap, min);
    //     min = await getSeedLink(farmingMap.watertolightmap, min);
    //     min = await getSeedLink(farmingMap.lighttotemperaturemap, min);
    //     min = await getSeedLink(farmingMap.temperaturetohumiditymap, min);
    //     min = await getSeedLink(farmingMap.humiditytolocationmap, min);
    //     return min;
    // }))

    return minLocation.sort((a,b) => a - b)[0];
}

console.log(await part1());

async function getSeedLink(fMap: FarmingMap[], seed: number ) {
    let min =seed;
    fMap.forEach((fmaps) => {
        if(seed < fmaps.source || seed > (fmaps.source + fmaps.range)) return min;
        for (let i = 0; i < fmaps.range; i++) {
            if (seed === (i + fmaps.source)) {
               min = fmaps.destination + i;
               break;
            }
        }
    });
    return min;
}
