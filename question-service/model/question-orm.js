import { getQuestionsByDifficulty } from './repository.js';
import { NotFoundError } from '../exceptions/exceptions.js';

export async function ormGetRandomQuestion(difficulty) {
    const listOfQuestions = await getQuestionsByDifficulty({difficulty})
    if (listOfQuestions.length === 0) {
        throw new NotFoundError(`No questions of ${difficulty} difficulty`);
    }
    const numberOfQuestions = listOfQuestions.length
    const randomNumber = Math.floor(Math.random() * numberOfQuestions)
    return listOfQuestions[randomNumber]
}