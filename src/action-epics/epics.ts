
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/merge'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/throttleTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import * as api from '../apis/http.api'
import {setUserAction, loginAction, setSuggestionsAction, getSuggestionsAction} from '../actions/data.actions'
import {authenticating, setLoginErrorAction, loadingSuggestionsAction} from '../actions/global.actions'

interface IPayload {
 name: string
}

export const fetchUserEpic = (action$) =>
  action$.ofType(loginAction.type)
    .switchMap(action => {
      const {user, pwd} = action.payload
      return Observable.merge(
        Observable.of(authenticating(true)),
        Observable.ajax
          .getJSON(`https://api.github.com/users/${user}?pwd=${pwd}`)
          .switchMap((payload: IPayload) => {
            if (!payload.name) {
              return Observable.of(setLoginErrorAction({msg: 'User or password incorrect'}), authenticating(false))
            }
            return Observable.of(setUserAction(payload), authenticating(false))
          })
          .catch(() => Observable.of(setLoginErrorAction({msg: 'User is not registered'}), authenticating(false)))
        )
    })

export const getSuggestionsEpic = (action$, store) => {
  debugger
  return action$.ofType(getSuggestionsAction.type)
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(action => {
      console.log('pasa')
      const search = action.payload
      debugger
      const observable = new Subject()
      setTimeout(() => observable.next(loadingSuggestionsAction(true)), 0)
      api.getSuggestions(search)
        .then((data) => {
          observable.next(setSuggestionsAction(data.results))
          observable.next(loadingSuggestionsAction(false))
        })
      return observable
    })
}
