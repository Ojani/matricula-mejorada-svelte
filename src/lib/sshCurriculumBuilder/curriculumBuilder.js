import fs from 'fs/promises'
import { scrapeCurriculumSequence } from './sequences.js'
import autoSsh from './autoSsh.js'
import formatCurriculum from './scrapedCurriculumFormatter.js'
import ora from 'ora'

// random hoops that have to be jumped to ge the directory name
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The aim here is to create a save file that can be used in courseplanner.ojani.dev

// creating courses
function createCourses(years) {
    class Course {
        constructor ({ courseCode, name, credits, taken=false }) {
            this.courseCode = courseCode
            
            this.credits = credits
            this.taken = taken
            this.name = name
        }
    }
    
    const courses = {}

    for(let year of years) {
        for(let [courseCodeLeft, courseCodeRight, credits] of [...year[0], ...year[1]]) {
            const courseCode = courseCodeLeft + courseCodeRight
            
            // name is an empty string because scraping courses does not provide us with the names
            courses[courseCode] = new Course({ courseCode, name: "[name unavailable]", credits })
        }
    }
    return courses
}


// creating semesters
function createSemesters(years) {
    const semesters = []

    for(let year of years) {
        for(let semester of year) {
            const currentSemester = []

            for(let [courseCodeLeft, courseCodeRight] of semester) {
                const courseCode = courseCodeLeft + courseCodeRight
                currentSemester.push(courseCode)
            }
            semesters.push(currentSemester)
        }
    }
    return semesters
}


// starting console spinner animation while the curriculum data is scraped
console.log();
const spinner = ora('Retrieving curriculum').start();

// scraping and formatting the curriculum
// const scrapedCurriculum = String(await fs.readFile("./logs.log"))
const scrapedCurriculum = await autoSsh(scrapeCurriculumSequence)
const formattedCurriculum = formatCurriculum(scrapedCurriculum)

// creating the save file
const coursePlannerSaveFileVersion = 1
    
const saveObject = 
{
    isCoursePlannerSaveFile: true, // value. it checks that this exists and is set to true to make sure it is a valid save file
    coursePlannerSaveFileVersion: coursePlannerSaveFileVersion, // integer. used to convert old save file formats into new ones in case the format changes
    semesters: createSemesters(formattedCurriculum), // contains the array of semesters
    summers: [], // contains the array of summers
    courses: createCourses(formattedCurriculum), // contains the object of courses

}

// creating the save file itself from the save object
const savePilePath = __dirname + "/scraped-course-planner-save-file.json"
const stringifiedSaveObject = JSON.stringify(saveObject) 
fs.writeFile(savePilePath, stringifiedSaveObject)

spinner.succeed(`Saved curriculum at ${savePilePath}\n`)