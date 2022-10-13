import { ormGetRandomQuestion as _getRandomQuestion} from "../model/question-orm.js";
import pythonShell, { PythonShell } from 'python-shell'
import { MissingFieldError } from "../exceptions/Exceptions.js";

export async function getRandomQuestionByDifficulty(req, res, next) {
    try {
        const { difficulty } = req.query
        if (difficulty) {
            const resp = await _getRandomQuestion(difficulty)
            console.log(`Get random coding question of ${difficulty} successfully!`)
            return res.status(200).json({
                message: `Get random coding question of ${difficulty} successfully!`,
                data: resp
            })
        } else {
            throw new MissingFieldError("Missing coding question difficulty!")
        }
    } catch (err) {
        next(err)
    }
}

export async function fetchQuestionsFromLeetcode(req, res, next) {
    try {
        const uri = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI
        const pyshell = new PythonShell('./utils/leetcode_scrapper.py', { mode:'text', args:[uri]})
        pyshell.on('message', (message) => {
            console.log(message)
        })

        pyshell.end((err) => {
            if (err) {
                throw err
            }
        })

        return res.status(200).json({message: "Fetched successfully"})
    } catch (err) {
        next(err)
    }
}