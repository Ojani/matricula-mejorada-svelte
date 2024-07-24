// random hoops that have to be jumped to ge the directory name
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from 'dotenv'
dotenv.config({ path: __dirname+"/../.env" })

const { STUDENT_NUMBER, ACCESS_CODE, SS_LAST_FOUR, BIRTH_DATE } = process.env

export function* scrapeCurriculumSequence(stream, resolvePromise) {
    var text = ""

    stream.write("5")

    while(!text.includes("deseada:")) text += yield
    stream.write("2")
    text = ""    

    while(!text.includes("Identificaci")) text += yield
    stream.write(STUDENT_NUMBER);
    stream.write(ACCESS_CODE);
    stream.write(SS_LAST_FOUR);
    stream.write(BIRTH_DATE);
    text = ""    

    // waiting for the curriculum to show up to start scrolling through the pages
    while(!text.includes("HOJA DE EVALUACION")) text += yield
    stream.write("p")
    text = ""    

    while(!(/(Puntos de Honor)[\s\S]+Finalizar/).test(text)) {
        stream.write("p")
        text+= yield
    }

    // sending the scraped data back
    resolvePromise(text)
}