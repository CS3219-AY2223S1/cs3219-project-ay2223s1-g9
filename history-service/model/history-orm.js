import { createHistory, getHistoryByUsername } from './repository.js'
import { NotFoundError } from '../exceptions/exceptions.js'

export async function ormCreateHistory(params) {
    const newHistory = await createHistory(params)
    newHistory.save()
    return newHistory
}

export async function ormGetHistoryByUsername(username) {
    const listOfHistory = await getHistoryByUsername({username})
    if (listOfHistory.length === 0) {
        throw new NotFoundError(`No history for ${username}`)
    }
    return listOfHistory
}