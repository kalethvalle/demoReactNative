import {createState} from 'redux'
import { mainReducer } from './reducers'

export const  store = createState(mainReducer);