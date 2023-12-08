import { readInput } from '../utils/readInput';

function sortByHandStrength(a: string, b: string) {
    const handCards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    const aHand = a.split('');
    const bHand = b.split('');
    
    for(let i=0; i<aHand.length; i++) {
        if(handCards.indexOf(aHand[i]) == handCards.indexOf(bHand[i])) {
            continue;
        } else if(handCards.indexOf(aHand[i]) > handCards.indexOf(bHand[i])) {
            return 1
        } else if (handCards.indexOf(aHand[i]) < handCards.indexOf(bHand[i])) {
            return -1
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

async function part1() {
    const input = (await readInput('7')).split('\n');
    const startTime = Date.now();
    const handBidMap = new Map<string, number>();
    const totalRanks = input.length;
    const handScore = {
        'fiveOfAKind': 6,
        'fourOfAKind': 5,
        'fullHouse': 4,
        'threeOfAKind': 3,
        'twoPair': 2,
        'onePair': 1,
        'default': 0
    }

    input.forEach((line) => {
        const [hand, bid] = line.split(' ');
        handBidMap.set(hand, parseInt(bid));
    })

    const handTypes = new Map<string, number[]>();

    handBidMap.forEach((bid, hand) => {
        const handUniqueCards = new Set(hand.split(''));
        let handStrength: number[] = [];

        handUniqueCards.forEach((card, index) => {
            // console.log('card:', card, 'index:', index, 'hand:', hand)
            const handRegex = new RegExp(`[${card}]`, 'g');
            const matches = hand.split("").sort().join("").match(handRegex);
            // console.log('matches:', matches, 'hand:', hand);
            switch(matches?.length) {
                case 5: { //five of a kind
                    handStrength.push(handScore.fiveOfAKind);
                    handTypes.set(hand, handStrength);
                    break;
                }
                case 4: { //four of a kind
                    handStrength.push(handScore.fourOfAKind);
                    handTypes.set(hand, handStrength)
                    break;
                }
                case 3: { //three of a kind
                    if(handStrength[0] === handScore.onePair) {
                        handStrength[0] = handScore.fullHouse;
                    } else {
                        handStrength.push(handScore.threeOfAKind);
                    }
                    handTypes.set(hand, handStrength)
                    break;
                }
                case 2: { //one pair
                    handStrength.push(handScore.onePair);
                    handTypes.set(hand, handStrength)
                    break;
                }
                default: {
                    handStrength.push(handScore.default);
                    handTypes.set(hand, handStrength)
                    break;
                }
            }
        })
    })
    const finalHands: {hand: string, score: number}[] = [];
    let finalScore = 0;
    handTypes.forEach((score, hand) => {
        finalHands.push({hand, score: score.reduce((a, b) => a + b, 0)});
    })

    finalHands.sort(rankHands);
    
    finalHands.forEach((card, i) => {
        finalScore += handBidMap.get(card.hand) * (totalRanks-i);
    });

    return finalScore;
    
    const endTime = Date.now();
    console.log(`Time: ${endTime - startTime}ms`);
}

console.log(await part1());