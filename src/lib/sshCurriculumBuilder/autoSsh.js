import { Client } from 'ssh2'

export default function(inputSequence) {
    return new Promise((resolve, reject) => {
        const ssh = new Client()
        
        // Activate trace mode when the -t flag when executing
        // this simply console.logs the outputs of the ssh stream
        const TRACING = process.argv.includes('-t')
        
        ssh.on('ready', () => {
            ssh.shell((err, stream) => {
                if (err) reject(err)
                
                const sequence = inputSequence(stream, resolve)
                
                stream.on('data', data => {
                    const text = data.toString()
                    
                    if(TRACING) console.log(text)
                        
                        // calling the next part of the generator sequence
                        // and ending the session if the sequence is done
                        if(sequence.next(text).done) {
                            ssh.end()
                        }
                    })
                    
                    stream.on('close', () => {
                        ssh.end()
                        // closing the generator    
                        sequence.return()
                    })
                })
        })
        .connect({
            host: "rumad.uprm.edu",
            username: "estudiante",
            password: "",
            port: 22,
        })
    })
}