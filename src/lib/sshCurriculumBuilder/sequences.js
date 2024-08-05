// random hoops that have to be jumped to ge the directory name
// import { fileURLToPath } from 'url'
// import { dirname } from 'path'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)
// import path from 'path'

// import dotenv from 'dotenv'
// dotenv.config({ path: path.join(__dirname, '/../.env') })

// const { STUDENT_NUMBER, ACCESS_CODE, SS_LAST_FOUR, BIRTH_DATE } = process.env

// export function* scrapeCurriculumSequence(stream, resolvePromise) {
//   var text = ''

//   stream.write('5')

//   while (!text.includes('deseada:')) text += yield
//   stream.write('2')
//   text = ''

//   while (!text.includes('Identificaci')) text += yield
//   stream.write(STUDENT_NUMBER)
//   stream.write(ACCESS_CODE)
//   stream.write(SS_LAST_FOUR)
//   stream.write(BIRTH_DATE)
//   text = ''

//   // waiting for the curriculum to show up to start scrolling through the pages
//   while (!text.includes('HOJA DE EVALUACION')) text += yield
//   stream.write('p')
//   text = ''

//   while (!/(Puntos de Honor)[\s\S]+Finalizar/.test(text)) {
//     stream.write('p')
//     text += yield
//   }

//   // sending the scraped data back
//   resolvePromise(text)
// }

export function* watchCoursesSequence(stream, resolvePromise, { courseCode, semester }) {
  var buffer = ''

  function send(s) {
    stream.write(s)
    buffer = ''
  }

  while (!buffer.includes('deseada:')) buffer += yield
  stream.write('5')

  while (!buffer.includes('deseada:')) buffer += yield
  send('6')

  while (!buffer.includes('Indique semestre')) {
    buffer += yield
    if (/Cuenta.+ESTUDIANTE.+NO.+esta.+disponible/.test(buffer)) {
      resolvePromise({
        error: 'El sistema de estudiante@rumad.upr.edu no está disponible en este momento'
      })
    }
  }
  send(semester)

  const result = {}
  while (!buffer.includes('Puede indicar solo MATERIA')) buffer += yield
  send(courseCode + '\r')

  while (!buffer.includes('S e c c i o n')) {
    buffer += yield

    if (/Curso.+incorrecto/.test(buffer)) {
      return resolvePromise({ error: `"${courseCode}" no es un curso válido` })
    }
  }
  send('\r')

  // when it is asking for the course again, it means it is done, wether it was because
  // there were no courses or because it finished looking through
  while (!buffer.includes('Puede indicar solo MATERIA')) {
    // Returning error when there is an error, this usually means that the the semester being accessed is not available
    if (buffer.includes('Terminamos?')) {
      return resolvePromise({
        error: `Hubo un error buscando la información\nProbablemente escogiste un semestre o verano que no está disponible`
      })
    }

    // this happens when it failed to find the course (it prompts you to search again)
    if (buffer.includes('Oprima Enter')) {
      stream.write('\r')
    } else if (/Curso.+NO.+Existe/.test(buffer)) {
      return resolvePromise({ error: `"${courseCode}" no es un curso válido` })
    }

    buffer += yield
  }

  result[courseCode] = buffer

  resolvePromise({ buffer, error: null })
}
