import { getQuestionsByDifficulty } from './repository.js';

export async function ormGetRandomQuestion(difficulty) {
    try {
        const listOfQuestions = await getQuestionsByDifficulty({difficulty})
        if (listOfQuestions.length < 1) {
            throw new Error(`No questions of ${difficulty} difficulty`);
        }
        const numberOfQuestions = listOfQuestions.length
        const randomNumber = Math.floor(Math.random() * numberOfQuestions)
        return listOfQuestions[randomNumber]
    } catch (err) {
        console.log('ERROR: Could not fetch Questions')
        return { err }
    }
}