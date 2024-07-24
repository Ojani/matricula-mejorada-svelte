export default function(str) {
    // dividing each section of the string
    const data = str.toString().split("802").slice(1)

    const years = []

    // iterating over sections in order to extract the courses from them
    for(let section of data) {
        // for each year, the second line containing "||" and onwards contain the courses
        const courseLines = section.split("\n").filter(line => line.includes("||")).slice(1)

        // if it doesn't contain this string, then it is some other section that isn't needed here
        const isYear = section.includes("ANO")

        if(!isYear) continue

        const semester1 = []
        const semester2 = []

        // the left side of each line corresponds to the first semester of the year.
        // the right side corresponds to the second semester
        for(let line of courseLines) {
            var [left, right] = line.split("||")

            left = left.split(/\s+/).slice(1, 4)
            // removing any markers placed in in front of the course codes
            // example: removing the "^" from ^CIIC
            left[0] = left[0].slice(left[0].search(/[a-zA-Z]/))
            
            // selecting the string after the "||" starting from the first letter
            right = right.slice(right.search(/[a-zA-Z]/)).split(/\s+/).slice(0, 3)

            // the if statements get rid of the empty lines
            if(left.length > 2) semester1.push(left)
            if(right.length > 2) semester2.push(right)
        }

        years.push([semester1, semester2])
    }

    return years
}