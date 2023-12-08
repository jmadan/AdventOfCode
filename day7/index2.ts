import { readInput } from '../utils/readInput';

function sortByHandStrength(a: string, b: string) {
    const cardRanks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse();
    const aHand = a.split('');
    const bHand = b.split('');
    
    for(let i=0; i<aHand.length; i++) {
        if(cardRanks.indexOf(aHand[i]) == cardRanks.indexOf(bHand[i])) {
            continue;
        } else if(cardRanks.indexOf(aHand[i]) > cardRanks.indexOf(bHand[i])) {
            return -1
        } else if (cardRanks.indexOf(aHand[i]) < cardRanks.indexOf(bHand[i])) {
            return 1
        }
        return 0
    }
}

const rankHands = (a: {hand: string, score: number}, b: {hand: string, score: number}) => {
    if (a.score === b.score) {
        return sortByHandStrength(a.hand, b.hand);
    }
    return b.score - a.score;
}
const handScore = {
    'fiveOfAKind': 6,
    'fourOfAKind': 5,
    'fullHouse': 4,
    'threeOfAKind': 3,
    'twoPair': 2,
    'onePair': 1,
    'highCard': 0
}

function getHandType(hand: string ) {
    let handStrength: number[] = [];
    const handUniqueCards = new Set(hand.split(''));
    Array.from(handUniqueCards).forEach((card) => {
        console.log('card:', card)
        const handRegex = new RegExp(`[${card}]`, 'g');
        const sortedHand = hand.split("").sort().join("");
        const jokerCount = sortedHand.split("").filter(x => x === "J").length;
        const matches = sortedHand.match(handRegex);
        switch (matches?.length) {
            case 5: { //five of a kind
                handStrength.push(handScore.fiveOfAKind);
                break;
            }
            case 4: { //four of a kind
                if(jokerCount === 0 && card !== 'J'){
                    handStrength.push(handScore.fourOfAKind);
                } else if(jokerCount === 1 && card !== 'J') {
                    handStrength.push(handScore.fiveOfAKind);
                } else {
                    handStrength.push(handScore.fourOfAKind);
                }
                break;
            }
            case 3: { //three of a kind
                if(jokerCount === 0 && card !== 'J'){
                    handStrength.push(handScore.threeOfAKind);
                } else if (jokerCount === 1 && card !== 'J') {
                    handStrength.push(handScore.fourOfAKind);
                } else if (jokerCount === 2 && card !== 'J') {
                    handStrength[0] = handScore.fiveOfAKind;
                } else {
                    handStrength.push(handScore.threeOfAKind);
                }
                break;
            }
            case 2: { //one pair
                if (jokerCount === 0 && card !== 'J') {
                    handStrength.push(handScore.onePair);
                } else if (jokerCount === 1 && card !== 'J' && (handStrength[0] === 0 || handStrength.length === 0)) {
                    handStrength[0] = handScore.threeOfAKind
                } else if(jokerCount === 1 && card !== 'J') {
                    handStrength.push(handScore.onePair);
                } else if(jokerCount === 2 && card !== 'J'){
                    handStrength[0] = handScore.fourOfAKind;
                } else if(jokerCount === 2 && card === 'J' && handStrength[0] !== handScore.fourOfAKind){
                    handStrength.push(0);
                } else if (jokerCount === 2 && card === 'J' && handStrength[0] !== handScore.fourOfAKind) {
                    console.log('here', hand)
                    handStrength.push(handScore.onePair);
                } else if (jokerCount === 2 && card === 'J' && handStrength[0] !== 0) {
                    console.log('here', hand)
                    handStrength.push(0);
                } else {
                    handStrength.push(handScore.onePair);
                }
                break;
            }
            default: {                
                handStrength.push(handScore.highCard);
                break;
            }
        }
    });
    console.log('here', hand, handStrength)
    return handStrength;
}

async function part2() {
    const input = (await readInput('7', true)).split('\n');
    const startTime = Date.now();
    // const hand/BidMap: [string, number] = []
    const totalRanks = input.length;
    const handScore = {
        'fiveOfAKind': 6,
        'fourOfAKind': 5,
        'fullHouse': 4,
        'threeOfAKind': 3,
        'twoPair': 2,
        'onePair': 1,
        'highCard': 0
    }

    const handBid = input.map((line) => {
        const [hand, bid] = line.split(' ');
        return {hand, bid };
    });

    const handRankScore = handBid.map((hand) => {
        return {hand: hand.hand, score: getHandType(hand.hand)};
    })

    const finalHandsWithScore = handRankScore.map((hand) => ({hand: hand.hand, score: hand.score.reduce((a, b) => Number(a) + Number(b), 0)}));

    // console.log(finalHandsWithScore);

    finalHandsWithScore.sort(rankHands);

    console.log(finalHandsWithScore);

    let finalScore = 0;
    finalHandsWithScore.forEach((card, i) => {
        const bid = handBid.find(h => h.hand === card.hand).bid;
        finalScore += bid * (totalRanks-i);
    });
    

    const endTime = Date.now();
    console.log(`Time: ${endTime - startTime}ms`);
    return finalScore;
}

console.log(await part2());