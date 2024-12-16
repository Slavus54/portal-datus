export const routes = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'Documentation',
        url: '/documentation'
    }
]

export const METHOD_TYPES = ['date', 'time', 'day', 'year', 'number']

export const STORE_VISIT_KEY = 'latest-visit'
export const STORE_SESSION_DISTANCE_KEY = 'session-distance'
export const STORE_STATS_KEY = 'methods-statistics'
export const STORE_REVIEWS_KEY = 'methods-reviews'
export const STORE_CODE_KEY = 'code-using'
export const STORE_LOCATION_KEY = 'location'
export const STORE_METHODS_USING_KEY = 'using'
export const STORE_METHOD_KEY = 'latest-method'
export const STORE_SELECTED_METHODS_KEY = 'selected-methods'

export const LOCATION_URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=4799bf2d4642434aa73b4eeafc72ae0d'
export const SELECTED_ICON = 'https://img.icons8.com/color/48/bookmark-ribbon--v1.png'

export const STORE_STATS_LIMIT = 5
export const STORE_REVIEW_DEFAULT_RATE = 5e1

export const short = text => text.split('').slice(0, 22)

export const IMPORT_TEXT = `
    import {Datus, weekdaysTitles, weekdaysTags, dayParts, months, minutesMin, minutesMax, periods, seasons, timeMeasures} from 'datus.js' 
`

export const LINKS = [
    {
        url: 'https://www.npmjs.com/package/datus.js',
        icon: 'https://img.icons8.com/color/48/npm.png'
    },
    {
        url: ' https://github.com/Slavus54/datus.js',
        icon: 'https://img.icons8.com/ios-filled/50/github.png'
    }
]

export const INITIAL_METHODS_TYPES = ['date', 'time', 'day', 'year', 'number']

export const USING_COLORS = [
    {
        value: 0,
        color: '#9be9a8'
    },
    {
        value: 25,
        color: '#40c463'
    },
    {
        value: 50,
        color: '#30a14e'
    },
    {
        value: 75,
        color: '#216e39'
    }
]