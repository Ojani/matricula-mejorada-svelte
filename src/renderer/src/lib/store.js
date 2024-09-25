import { writable } from 'svelte/store'

function createPersistentStore(localStorageKey, initialValue) {
  // Getting the item from localstorage. Using intial value if it does not exist
  const store = writable(JSON.parse(localStorage.getItem(localStorageKey)) || initialValue)

  // Saving values to localstorage
  store.subscribe((value) => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  })

  return store
}

export const currentPage = createPersistentStore('currentPage', 'Home')
export const currentTheme = createPersistentStore('theme', 0)
export const coursesInCalendar = createPersistentStore('coursesInCalendar', [])
export const watchedCourses = createPersistentStore('watchedCourses', {})

// Making sure to remove courses from the coursesInCalendar
// store when it is removed from the watchedCourses store
watchedCourses.subscribe((watchedCourses) => {
  coursesInCalendar.update((calendarCourses) =>
    // removing the course from the calendar if it is not in the watched courses
    calendarCourses.filter((course) => Object.keys(watchedCourses).includes(course))
  )
})
