//only 12 red cubes, 13 green cubes, and 14 blue cubes
import { get } from 'http';
import { readInput } from '../utils/readInput';

// export type ScratchCard = { card: string, winningNumbers?: Number[], cardNumbers?: Number[], score: number, count: number };
export type ScratchCard = 
    {
        card: number,
        winningNumbers?: number[],
        cardNumbers?: number[],
        score: number,
        count?: number
    }

async function part1() {
    const input = (await readInput('4', false)).split('\n');
    let numberRegex = /\d+/g;
    let match: RegExpExecArray | null;
    // const winningNumbers: Number[] = [];
    let winningCards: ScratchCard[] = [];

    input.forEach((line, indx) => {
        const card = indx+1;//line.split(":")[0];
        let winningNumbers: number[] = [];
        let myNumbers: number[] = [];
        let cardNumbers: number[] = [];
        while ((match = numberRegex.exec(line.split(": ")[1].split(" | ")[0])) !== null) {
            let numberValue = parseInt(match[0]);
            winningNumbers.push(numberValue);
        }

        while ((match = numberRegex.exec(line.split(": ")[1].split(" | ")[1])) !== null) {
            let numberValue = parseInt(match[0]);
            myNumbers.push(numberValue);
        }
        
        myNumbers.forEach(n => {
            const num = winningNumbers.find(num => num === n);
            if(num){
                cardNumbers.push(num);
            }
        })
        if(cardNumbers.length > 0){
            winningCards.push({ card, winningNumbers: cardNumbers, score: 0 });
        }
    })

    let totalSum = 0;
    winningCards = winningCards.filter((card: ScratchCard) => {
        if(card.winningNumbers && card.winningNumbers.length > 0){
            let tSum = 0
            card.winningNumbers.forEach((n,i) => {
                if(i === 0){
                    tSum += 1;
                } else {
                    tSum += tSum;
                }
            })
            // console.log(card, tSum);
            card.score = tSum;
            // card.count += 1;
            totalSum += tSum;
            return card;
        }
    })
    // console.log('totalSum', totalSum);
    return {
        totalSum,
        winningCards: winningCards.filter((card: ScratchCard) => card && card.winningNumbers && card.winningNumbers.length > 0)
    };
}

const getCopies = (cardId: number, winningCards: ScratchCard[], copies: number[] = []): number[] => {
    const scratchCard = winningCards.find(c => Number(c.card) === cardId)
    if(scratchCard){
        copies.push(cardId);
        const wCard = winningCards.find(c => Number(c.card) === cardId);
        // console.log('wCard', wCard);
        wCard?.winningNumbers?.forEach((_, i) => {
            const additionalCardId = cardId+(i+1);
            return (additionalCardId> 202) ? [...copies] : [...copies, getCopies(additionalCardId, winningCards, copies)];
        })
    }
    return [...copies, cardId];
}

async function part2(){
    const input = (await readInput('4', false)).split('\n');
    let numberRegex = /\d+/g;
    let match: RegExpExecArray | null;

    const allCards: number[]= [];
    input.forEach((_, index) => {
        // const cardNumbers: Number[] = [];
        // while ((match = numberRegex.exec(line.split(" | ")[1])) !== null) {
        //     let numberValue = parseInt(match[0]);
        //     cardNumbers.push(numberValue);
        // }
        allCards.push(index+1);
    })
    console.log('allCards', allCards.length);

    const { winningCards } = await part1();
    const wCards: number[] = [...allCards];
    console.log('winningCards', winningCards.length);

    winningCards.forEach((card: ScratchCard) => {
        const cardNumber = Number(card.card);
        console.log('cardNumber', cardNumber);
        wCards.push(cardNumber);
        const wNumbers = card.winningNumbers?.length ?? 0;
        console.log('wNumbers', wNumbers)
        for(let i=0; i < wNumbers; i++){
            console.log('*********', (cardNumber + i+1));
            if((cardNumber + i+1) > 202){
                return;
           }
            wCards.push(cardNumber + (i+1));
            const copies = getCopies(cardNumber + (i+1), winningCards);
            wCards.push(...copies);
        }
        // card.winningNumbers?.forEach((_, i) => {
        //     console.log('*********', (cardNumber + i+1));
        //     if((cardNumber + i+1) > 202){
        //          return;
        //     }
        //     const winningCard = winningCards.find(c => Number(c.card) === (cardNumber + i+1));
        //     if(winningCard && winningCard.winningNumbers && winningCard.winningNumbers.length > 0){
        //         const copies = getCopies(winningCard.card, winningCards);
        //         // console.log('copies', copies);
        //         wCards.push(...copies);
        //     } else {
        //         // console.log('pushing', (cardNumber + i+1));
        //         wCards.push(cardNumber + (i+1));
        //     }
        
        // })
    });
    console.log('wCards', wCards.length);
    

    // console.log('wCards', wCards.length);
    // winningCards.forEach((card: ScratchCard) => {
    //     const cardNumber = Number(card.card);
    //     scratchCards.set(cardNumber, { card: cardNumber, score: 0, count: 1 });
    // });

    // winningCards.forEach((card: ScratchCard) => {
    //     const winCount = card.winningNumbers?.length ?? 0;

    //     card.winningNumbers?.forEach((_, i) => {
    //         const cardNumber = Number(card.card.split(" ")[1]) + 1 + Number(i);
    //         console.log('cardNumber', cardNumber);
    //         const latestcount = scratchCards.get(Number(cardNumber))?.count ?? 0;
    //         scratchCards.set(Number(cardNumber), { card: cardNumber, score: 0, count: latestcount + 1 });
    //         // if(scratchCards.has(Number(cardNumber))){
    //         //     scratchCards.get(Number(cardNumber)).count += 1;
    //         // } else {
    //         //     scratchCards.set(Number(cardNumber), { card: card.card, score: 0, count: 1 });
    //         // }
    //     });
    // })

    // scratchCards.forEach((card: ScratchCard) => {

    // });

    // console.log('scratchCards', scratchCards);
    

    // winningCards.forEach(card => {
    //     if(scratchCards.has(Number(card.card.split(" ")[1]))){
    //         scratchCards.get(Number(card.card.split(" ")[1])).count += 1;
    //     }
    //     scratchCards.set(Number(card.card.split(" ")[1]), { card: card.card, score: 0, count: 1 });
    //     if(card.winningNumbers.length > 0){
    //         let cardScore = 0;
    //         card.winningNumbers.forEach((_, i) => {
    //             const cardNumber = Number(`${Number(card.card.split(" ")[1]) + 1+ Number(i)}`);
    //             console.log('cardNumber', cardNumber);
    //             cardScore += i==0 ? 1 : cardScore;
    //             if(scratchCards.has(cardNumber)){
    //                 scratchCards.get(cardNumber).count += 1;
    //             } else {
    //                 scratchCards.set(cardNumber, { card: card.card, score: 0, count: 1 });
    //             }
    //         })
    //         scratchCards.get(Number(card.card.split(" ")[1])).score = cardScore;
    //     }
    // });

    // const allCards: object[] = [];
    // input.forEach(line => {
    //     const card = line.split(":")[0].split(" ")[1];
    //     const cardNumbers: Number[] = [];
    //     while ((match = numberRegex.exec(line.split(" | ")[1])) !== null) {
    //         let numberValue = parseInt(match[0]);
    //         cardNumbers.push(numberValue);
    //     }
    //     allCards.push({card, cardNumbers});
    // })


    // input.forEach(line => {
    //     const card = line.split(":")[0].split(" ")[1];
    //     scratchCards.set(card, { card: card, score: 0, count: 0 });
    //     // scratchCards.push([card, { card: card, score: 0, count: 0 }]);
    //     console.log('card:', card);
    //     let winningNumbers: Number[] = [];
    //     let myNumbers: Number[] = [];
    //     let cardNumbers: Number[] = [];
    //     while ((match = numberRegex.exec(line.split(": ")[1].split(" | ")[0])) !== null) {
    //         let numberValue = parseInt(match[0]);
    //         winningNumbers.push(numberValue);
    //     }

    //     while ((match = numberRegex.exec(line.split(": ")[1].split(" | ")[1])) !== null) {
    //         let numberValue = parseInt(match[0]);
    //         myNumbers.push(numberValue);
    //     }

    //     let scratchCardcore = 0;
        
    //     myNumbers.forEach((n, i) => {
    //         if(winningNumbers.some(num => num === n)){
    //             if(i === 0){
    //                 scratchCardcore += 1;
    //             } else {
    //                 scratchCardcore += scratchCardcore;
    //             }
    //             cardNumbers.push(n);
    //         }
    //     })
    //     if(cardNumbers.length > 0){
    //         scratchCards.get(card).score = scratchCardcore;
    //         scratchCards.get(card).count += 1;
    //         // const sCard: ScratchCard = scratchCards.find(({card: c}) => c === card) ?? { card: card, score: 0, count: 0 };
    //         // sCard.score = scratchCardcore;
    //         // sCard.count += 1;
    //     }

    //     cardNumbers.forEach((_,i) => {
    //         const cardNumber = `${Number(card) + Number(i)}`;
    //         if(scratchCards.has(cardNumber)){
    //             scratchCards.get(cardNumber).count += 1;
    //         } else {
    //             scratchCards.set(cardNumber, { card: card, score: 0, count: 1 });
    //         }
    //     });

    // });

    // WinningCards.forEach(({card, winningNumbers}) => {
    //     if(winningNumbers.length > 0){
    //         let tSum = 0
    //         winningNumbers.forEach((n,i) => {
    //             if(i === 0){
    //                 tSum += 1;
    //             } else {
    //                 tSum += tSum;
    //             }
    //         })
    //         console.log(card, tSum);
    //         totalSum += tSum;
    //     }
    // });
    
    // console.log('allCards', allCards);
    // console.log('WinningCards', WinningCards);
    // console.log(scratchCards);
}

await part2();