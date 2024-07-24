import getSemestersFromHtml from './curriculumFromHtml.cjs'
import https from 'https'

async function scrapeHtml(sessionCookies) {
  return new Promise((resolve, reject) => {
    const url = 'https://home.uprm.edu/matricula/curriculum.php?'

    // adding the necessary cookies to be authenticated into the portal

    // formatting the cookies
    const cookies = sessionCookies
      .reduce((accumulator, cookie) => {
        accumulator.push(`${cookie.name}=${cookie.value}`)
        return accumulator
      }, [])
      .join('; ')

    const options = {
      headers: {
        Cookie: cookies,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      }
    }

    // making the http request
    https.get(url, options, (res) => {
      var data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => resolve(data))
      res.on('error', () => reject('An error occurred'))
    })
  })
}

export default async function getUserCurriculum(sessionCookies) {
  const html = await scrapeHtml(sessionCookies)
  const semesters = getSemestersFromHtml(html)
  return semesters
}

// Cookies that are used for authenticating

// [
//   {
//     name: 'REAK',
//     value: 'roqa3ac448ldmfn69kslpsvlu3',
//     domain: '.uprm.edu',
//     hostOnly: false,
//     path: '/',
//     secure: false,
//     httpOnly: false,
//     session: false,
//     expirationDate: 1720625444.005251,
//     sameSite: 'unspecified'
//   },
//   {
//     name: 'colegioid',
//     value: 'ojani.figueroa',
//     domain: '.uprm.edu',
//     hostOnly: false,
//     path: '/',
//     secure: false,
//     httpOnly: false,
//     session: true,
//     sameSite: 'unspecified'
//   },
//   {
//     name: 'colegiot',
//     value: 'on',
//     domain: '.uprm.edu',
//     hostOnly: false,
//     path: '/',
//     secure: false,
//     httpOnly: false,
//     session: true,
//     sameSite: 'unspecified'
//   }
// ]
