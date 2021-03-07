// require two functions from date fns
var parseJSON = require('date-fns/parseJSON')
var format = require('date-fns/format')


//var date = '2021-03-07T12:41:30.778Z'

function dateFormat(unformatedDate){

    var parsedDate = (parseJSON(unformatedDate))

    return (format(parsedDate, 'yyyy-MM-dd'))


// make the date a string 
// split(-)
    // take unformated date and split it at "-" so it returns an array with 3 indexes 
    // const year = array[0], parse into to make it a number
    //const month = array[1]
    // make month string into an array of characters if first character is zero, get rid of the zero
    // if (array[1].charAt(0) === 0)
        // array[1].splice(1)
    // then parse int string back to number
    // subtract 1 from the number to get the monthIndex 
    // const day = first two characters in array[2], partse int to turn day to a number


    // return format(newDate(year, monthIndex, day), 'yyyy-MM-dd')

}

//dateFormat(date)

module.exports = dateFormat