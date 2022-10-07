import { ormGetRandomQuestion as _getRandomQuestion} from "../model/question-orm.js";

export async function getRandomQuestionByDifficulty(req, res, next) {
    try {
        const { difficulty } = req.query
        if (difficulty) {
            const resp = await _getRandomQuestion(difficulty)
            console.log(resp)
            if (resp.err) {
                return res.status(500).json({
                    message: "Could not get coding question!",
                    error: resp.err.message,
                })
            } else {
                console.log(`Get random coding question of ${difficulty} successfully!`)
                return res.status(200).json({
                    message: `Get random coding question of ${difficulty} successfully!`,
                    data: resp
                })
            }
        } else {
            return res
                .status(400)
                .json({ message: "Missing coding question difficulty!"})
        }
    } catch (err) {
        next(err)
    }
}