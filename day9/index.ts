import { readInput } from '../utils/readInput';

const expandRecursion = (seq: number[], seqExpanded: number[][]) => {
    const nextSeq = [];
    for(let i=0; i<(seq.length-1); i++){
        const diff: number = seq[i+1] - seq[i];
        nextSeq.push(diff);
    }
    seqExpanded.push(nextSeq);
    if(nextSeq.some(x => x !== 0)){
        expandRecursion(nextSeq, seqExpanded);
    }
    return seqExpanded;
}

const predictNextNumberInSeq = (seq: number[][]) => {
    for(let i = seq.length-1; i>0; i--){
        const nextNumber = seq[i-1][seq[i-1].length-1] + seq[i][seq[i].length-1];
        seq[i-1].push(nextNumber);
    }
    return seq;
}

const part1 = async () => {
    const input = (await readInput('9')).split('\n');
    const startTime = Date.now();

    const reports = input.map(line => line.split(" ").map(x=> parseInt(x)));
    const expandedSeqs = reports.map(report  => expandRecursion(report, [report]));
    // console.log('-----------------',expandedSeqs);

    const finalSeqs  = expandedSeqs.map(predictNextNumberInSeq);
    return finalSeqs.map(seq => seq[0][seq[0].length-1]).reduce((ele, acc) => ele+acc);

}

console.log(await part1());