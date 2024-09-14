import { writable } from 'svelte/store'

export const currentPage = writable('Home')
export const currentTheme = writable(localStorage.getItem('theme') || 0)
export const watchedCourses = writable(JSON.parse(localStorage.getItem('watchedCourses')) || {})
