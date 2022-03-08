export const BASE_URL = '/api'

export const CREATE_USER = `${BASE_URL}/users`
export const UPDATE_SESSION = `${BASE_URL}/refresh`
export const CREATE_SESSION = `${BASE_URL}/sessions`
export const DELETE_SESSION = `${BASE_URL}/sessions/:session_id`

export const SHOW_USER_PROFILE = `${BASE_URL}/profile`
export const UPDATE_USER_PROFILE = `${BASE_URL}/profile`

export const LIST_ACCOUNTS = `${BASE_URL}/accounts`
export const CREATE_ACCOUNT = `${BASE_URL}/accounts`

export const LIST_CATEGORIES = `${BASE_URL}/categories`
export const CREATE_CATEGORY = `${BASE_URL}/categories`
export const DELETE_CATEGORY = `${BASE_URL}/categories/:category_id`

export const LIST_BANKING_INSTITUTIONS = `${BASE_URL}/banking_institutions`
