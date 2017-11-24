import actionCreatorFactory from 'redux-typescript-actions'
const actionCreator = actionCreatorFactory()

export const loading = actionCreator<boolean>('SET_LOADING')
export const authenticating = actionCreator<boolean>('SET_AUTHENTICATING')
export const setLoginErrorAction = actionCreator<{}>('SET_LOGIN_ERROR')
export const showDestinationAction = actionCreator('SHOW_DESTINATION')
export const showOverlayAction = actionCreator<{type: string}>('SHOW_OVERLAY')
export const loadingSuggestionsAction = actionCreator<boolean>('LOADING_SUGGESTIONS')
export const setDestinationReadyAction = actionCreator<boolean>('DESTINATION_READY')

