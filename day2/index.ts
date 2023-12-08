//only 12 red cubes, 13 green cubes, and 14 blue cubes
import { readInput } from '../utils/readInput';

type Game = {
    title: string;
    gameData: string[];
}

function parseGame(game: string) {
    const [title, draws] = game.split(': ');
    const gameData = draws.split('; ');
    return {
        title,
        gameData
    }
}

function sumOfGameIds(gameTitles: string[]) {
    return gameTitles.reduce((acc, game) => {
        const gameNumber = game.split(' ')[1];
        return acc + parseInt(gameNumber);
    }, 0)
}

async function part1() {

    const cubesInBag = {
         red: 12,
        green: 13,
        blue: 14
    };

    const input = (await readInput('2', true)).split('\n');

    const games = input.map(parseGame);
    
    const possibleGames = games.map(game => {
        const possibleGame = game.gameData.every(data => {
            const rounds = data.split(', ');
            const gameRound = {
                red: 0,
                green: 0,
                blue: 0
            }
            rounds.forEach(round => {
                const [count, color] = round.split(' ') as [
                    number,
                    "green" | "red" | "blue"
                  ];;
                gameRound[color] = Number(count);
            })
            if(gameRound.red <= cubesInBag.red && gameRound.green <= cubesInBag.green && gameRound.blue <= cubesInBag.blue) {
                return true;
            }
        });

        if(possibleGame) {
            return {
                title: game.title,
                gameData: game.gameData
            }
        }

        return undefined;
    }).filter(game => game !== undefined);

    return {
        // sumOfPossibleGames: sumOfGameIds(possibleGames.filter(game => game.title !== undefined).map(game => game.title)),
        sumOfGameIds: possibleGames.length ? sumOfGameIds(possibleGames.map(game => game.title)) : 0,
        possibleGames
    }
}


async function part2 () {
    // const { possibleGames } = await part1();
    const input = (await readInput('2', false)).split('\n');

    const games = input.map(parseGame);
    const sumOfPower = games.filter(game => game !== undefined).map(game => {
        const minimumCubesRequired = {
            red: 0,
            green: 0,
            blue: 0
        };
        console.log(game);
        game && game.gameData.forEach(round => {
            const draw = round.split(', ');
            draw.forEach(d => {
                const [count, color] = d.split(' ') as [
                    number,
                    "green" | "red" | "blue"
                  ];
                if(count > Number(minimumCubesRequired[color])) {
                    minimumCubesRequired[color] = count;
                }
            })
        });
        return  minimumCubesRequired.red * minimumCubesRequired.green * minimumCubesRequired.blue;
    }).reduce((acc, p) => {
        return acc + p;
    },0);

    console.log(sumOfPower);
}

console.log(await part2());
