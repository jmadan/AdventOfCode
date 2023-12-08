async function readInput(dayNumber: string, sample: boolean = false){
    let inputFile;
    if(sample){
        inputFile = Bun.file(`./day${dayNumber}/sample.txt`);
    } else {
        inputFile = Bun.file(`./day${dayNumber}/input.txt`);
    }
    const input = await inputFile.text();
    return input;
}

export {
    readInput
};