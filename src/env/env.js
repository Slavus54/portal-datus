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
export const STORE_CODE_METHOD_KEY = 'code-method'

export const LOCATION_URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=4799bf2d4642434aa73b4eeafc72ae0d'
export const SELECTED_ICON = './marked.png'
export const SELECTED_LINK = 'https://img.icons8.com/color/48/bookmark-ribbon--v1.png'

export const CODE_ICON = 'https://img.icons8.com/nolan/64/code--v2.png'
export const GMAIL_ICON = 'https://img.icons8.com/color/48/gmail-new.png'

export const STORE_STATS_LIMIT = 5
export const STORE_REVIEW_DEFAULT_RATE = 5e1

export const short = text => text.split('').slice(0, 22)

export const IMPORT_TEXT = '{Datus, weekdaysTitles, weekdaysTags, dayParts, months, minutesMin, minutesMax, periods, seasons, timeMeasures}'

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

export const NOTIFICATION_BORDERS = [
    {
        lines: 0,
        emoji: '📍'
    },
    {
        lines: 1e1,
        emoji: '⭐'
    },
    {
        lines: 25,
        emoji: '🔥'
    },
    {
        lines: 5e1,
        emoji: '❤️'
    },
    {
        lines: 1e2,
        emoji: '💥'
    },
    {
        lines: 25e1,
        emoji: '💥'
    },
    {
        lines: 5e2,
        emoji: '💗'
    },
    {
        lines: 1e3,
        emoji: '💖'
    }
]

export const CODE_SHARE_ICONS = [
    {
        link: 'https://web.telegram.org/k/#@slavus54',
        icon: 'https://img.icons8.com/color/48/telegram-app--v1.png'
    },
    {
        link: 'https://github.com/Slavus54',
        icon: 'https://img.icons8.com/ios-filled/50/github.png'
    }
]

export const CODE_SIZE_COLORS = [
    {
        code: '#19a600',
        coefficient: 0
    },
    {
        code: '#decb00',
        coefficient: .5
    },
    {
        code: '#de7300',
        coefficient: .7
    },
    {
        code: '#de2100',
        coefficient: 1
    }
]