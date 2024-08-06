import autoSsh from '../sshCurriculumBuilder/autoSsh.js'
import { watchCoursesSequence } from '../sshCurriculumBuilder/sequences.js'
import { ansiToPre } from 'ansi-to-pre'
import * as cheerio from 'cheerio'
// import fs from 'fs'

function formatWatchedSections(txt) {
  const output = txt
    .replace(/(?<=\[1m\D.\[22m).\[\d+;\d+H.\[0m.\[\d+;\d+H(?=.\[1m\D.\[22m)/g, '') // removing the move cursor and clear styles ansi codes between the days of the week so they don't get separated when parsing
    .replace(/.\[(j|J|K|k|27m|7m)/g, '') // removing the ansi code that clear the screen (needed because otherwise, some sections would be skipped)
    .replace(/.\[\d+;\d+(H|f)?/g, '') // removing the ansi code that moves the cursor
    .replace(/\[0m/g, '') // removing the ansi code "[0m" that clears all styles (needed because it would cause the course name and the section to get combined)
    .split('--->')
    .slice(1)
  const sections = []

  for (let section of output) {
    const html = ansiToPre(section)
    const $ = cheerio.load(html, { decodeEntities: true })
    const elements = $('span')

    const data = Array(10)
    for (let i = 0; i < 10; i++) {
      const cell = elements
        .eq(i)
        .text()
        .replace(/\s{2,}/g, ' ') // converting excessive spaces into a single space
        .replace(/(^\s|\s$)/g, '') // removing leading and trailing spaces

      data[i] = cell
    }
    sections.push(data)
  }

  return sections
}

function getSectionObject(sectionArray) {
  return sectionArray[3].toLowerCase() == 'por acuerdo'
    ? {
        courseName: sectionArray[0],
        section: sectionArray[1],
        room: sectionArray[2],
        credits: sectionArray[4],
        professor: sectionArray[5],
        spacesAvailable: sectionArray[6],
        spacesTaken: sectionArray[7],
        spacesLeft: sectionArray[8],
        byAgreement: true
      }
    : {
        courseName: sectionArray[0],
        section: sectionArray[1],
        room: sectionArray[2],
        days: sectionArray[3],
        hours: sectionArray[4].replace(/\s/g, ''),
        credits: sectionArray[5],
        professor: sectionArray[6],
        spacesAvailable: sectionArray[7],
        spacesTaken: sectionArray[8],
        spacesLeft: sectionArray[9],
        byAgreement: false
      }
}

export default async function getWatchedCourseSections({ courseCode, semester }) {
  const { error, buffer } = await autoSsh(watchCoursesSequence, {
    courseCode,
    semester: String(semester)
  })

  if (error) {
    return { error }
  }

  const formattedSections = formatWatchedSections(buffer)
  const sectionsObjects = []

  for (let sectionArray of formattedSections) {
    sectionsObjects.push(getSectionObject(sectionArray))
  }

  return { sectionsObjects, error: null }
}

// ;(async () => {
//   console.log(await getWatchedCourseSections({ courseCode: 'quim3131', semester: 3 }))
// })()
