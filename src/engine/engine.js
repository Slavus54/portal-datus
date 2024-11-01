import {Datus} from 'datus.js'

const datus = new Datus()

export const onRunMethod = (title = '', args = []) => JSON.stringify(datus[title](...args))

export const onCompileCode = (code = '') => eval(code)