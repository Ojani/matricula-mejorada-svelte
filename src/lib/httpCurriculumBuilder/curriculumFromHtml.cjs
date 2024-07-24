import * as cheerio from 'cheerio'

function getYears($) {
  return $("[style='border: solid 1px #dddddd']")
}

function getSemesters(year) {
  return year.find('table table')
}

function getCourses(semester) {
  return semester.find('tr')
}

function getCourseInfo(course) {
  const cells = course.find('span')

  const courseCodeAndSection = cells.eq(0).text().split('-')
  const courseCode = courseCodeAndSection[0]
  const courseSection = courseCodeAndSection[1] || ''

  const courseName = cells.eq(1).text()
  const courseCredits = cells.eq(2).text()
  const courseGrade = cells.eq(3).text()

  return { courseCodeAndSection, courseCode, courseSection, courseName, courseCredits, courseGrade }
}

function forEachElem(elementList, cb) {
  for (let i = 0; i < elementList.length; i++) {
    cb(elementList.eq(i))
  }
}

export default function getSemestersFromHtml(html) {
  const $ = cheerio.load(html, { decodeEntities: true })

  const semestersArray = []

  const years = getYears($)

  forEachElem(years, (year) => {
    const semesters = getSemesters(year)

    forEachElem(semesters, (semester) => {
      const courses = getCourses(semester)
      const semesterArray = []

      forEachElem(courses, (course) => {
        const courseInfo = getCourseInfo(course)
        semesterArray.push(courseInfo)
      })

      semestersArray.push(semesterArray)
    })
  })

  return semestersArray
}
