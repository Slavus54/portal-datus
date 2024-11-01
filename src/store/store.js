'use client'

import {Datus} from 'datus.js'
import {STORE_VISIT_KEY, STORE_SESSION_DISTANCE_KEY, STORE_STATS_KEY, STORE_STATS_LIMIT, STORE_REVIEWS_KEY, STORE_REVIEW_DEFAULT_RATE, STORE_CODE_KEY, STORE_LOCATION_KEY, LOCATION_URL} from '../env/env'

export const datus = new Datus()

// localstorage functions, which cannot be running in Next.js 

const onGetStorageValue = (title = '', value = null) => localStorage.getItem(title) !== null ? JSON.parse(localStorage.getItem(title)) : value

const onInitVisit = (dateUp = '') => localStorage.setItem(STORE_VISIT_KEY, JSON.stringify(dateUp))

const onCountSessionDistance = () => {
    let from = onGetStorageValue(STORE_VISIT_KEY)
    let to = datus.now('time')
  
    let distance = '00:00'

    if (from) {
        distance = datus.timeDistance(from.split(' ')[2], to)
    }

    localStorage.setItem(STORE_SESSION_DISTANCE_KEY, JSON.stringify(distance))
}

const onInitStatistics = () => localStorage.setItem(STORE_STATS_KEY, JSON.stringify([]))

const onImproveStatitics = (method = '', category = 'date', args = [], timestamp = '') => {
    let items = onGetStorageValue(STORE_STATS_KEY)

    if (items) {
        items = items.slice(0, STORE_STATS_LIMIT)

        localStorage.setItem(STORE_STATS_KEY, JSON.stringify([{method, category, args: args.join(' | '), timestamp}, ...items]))
    }
}

const onInitMethodsReview = length => localStorage.setItem(STORE_REVIEWS_KEY, JSON.stringify(new Array(length).fill({title: '', rate: STORE_REVIEW_DEFAULT_RATE})))

const onUpdateMethodReview = (title = '', rate = STORE_REVIEW_DEFAULT_RATE, index = 0) => {
    let data = onGetStorageValue(STORE_REVIEWS_KEY)

    if (data) {
        data[index] = {title, rate}

        localStorage.setItem(STORE_REVIEWS_KEY, JSON.stringify(data))
    }
}

const onInitCodeUsing = () => localStorage.setItem(STORE_CODE_KEY, JSON.stringify(0))

const onUpdateCodeUsing = size => {
    let data = onGetStorageValue(STORE_CODE_KEY)

    if (data !== null) {
        let result = data + size
       
        localStorage.setItem(STORE_CODE_KEY, JSON.stringify(result))
    }
}

const onGetLocationData = async () => {
    let data = await fetch(LOCATION_URL)

    data = await data.json()

    if (!data.error) {
        localStorage.setItem(STORE_LOCATION_KEY, JSON.stringify(data))
    }
}