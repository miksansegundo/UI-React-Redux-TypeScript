import { combineEpics } from 'redux-observable'
import * as epics from './epics'

const epicList = Object.keys(epics).map(epic => epics[epic])

export const rootEpic = combineEpics(epics.getSuggestionsEpic)
