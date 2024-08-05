import { Client } from 'ssh2'
import dns from 'dns'

const TIMEOUT_MILLISECONDS = 10000
const timeOutMessage =
  'La conexión con estudiante@estudiante@rumad.upr.edu no está respondiendo\nVerifique su internet'

export default function (inputSequence, data = null) {
  return new Promise((resolve) => {
    var timeout = null
    function restartTimeout(cb) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        resolve({ error: timeOutMessage })

        if (cb) cb()
      }, TIMEOUT_MILLISECONDS)
    }

    restartTimeout()

    // Checking if there is an internet connection
    dns.lookup('rumad.uprm.edu', function (err) {
      if (err) {
        clearTimeout(timeout)
        resolve({
          error:
            'No se pudo establecer la conexión con estudiante@rumad.upr.edu\nVerifique su internet'
        })
      } else {
        const ssh = new Client()

        // Activate trace mode when the -t flag when executing
        // this simply console.logs the outputs of the ssh stream
        const TRACING = process.argv.includes('-t')

        ssh
          .on('ready', () => {
            ssh.shell((err, stream) => {
              if (err) {
                console.log(err)
                clearTimeout(timeout)
                resolve({ error: 'Hubo un error con la conexión a estudiante@rumad.uprm.edu' })
              }

              const sequence = inputSequence(stream, resolve, data)

              stream.on('data', (data) => {
                restartTimeout(() => ssh.end())

                const text = data.toString()

                if (TRACING) console.log(text)

                // calling the next part of the generator sequence
                // and ending the session if the sequence is done
                if (sequence.next(text).done) {
                  ssh.end()
                }
              })

              stream.on('close', () => {
                ssh.end()
                // closing the generator
                sequence.return()

                // resolving with an error if the stream closes before expected
                clearTimeout(timeout)
                resolve({
                  error: 'La conexión con estudiante@rumad.upr.edu se cerró inesperadamente'
                })
              })
            })
          })
          .connect({
            host: 'rumad.uprm.edu',
            username: 'estudiante',
            password: '',
            port: 22,
            readyTimeout: TIMEOUT_MILLISECONDS
          })
      }
    })
  })
}
