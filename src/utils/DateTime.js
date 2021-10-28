import Moment from 'moment-timezone';
import moment from 'moment';
const MomentRange = require('moment-range')
const _moment = MomentRange.extendMoment(Moment)


export const getDateRanges = (start, end) => {
    const range = _moment.range(new Date(start), new Date(end))
    const available_dates = Array.from(range.by('day')).map(day => {
        return { title: day.format('YYYY-MM-DD'), day: day.format('YYYY-MM-DD') }
    })
    return available_dates
}


export const getCurrentTime = () => {

    var date, TimeType, hour, minutes, seconds, fullTime;
    date = Moment().tz('Asia/Dubai')//new Date();
    hour = parseInt(date.format('HH'))
    //hour = date.getHours();

    if (hour <= 11) {
        TimeType = 'AM';
    }
    else {
        TimeType = 'PM';
    }

    /*if (hour > 12) {
        hour = hour - 12;
    }

    if (hour == 0) {
        hour = 12;
    }*/

    minutes = parseInt(date.format('mm')) //date.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes.toString();
    }

    seconds = parseInt(date.format('ss')) //date.getSeconds();

    if (seconds < 10) {
        seconds = '0' + seconds.toString();
    }

    fullTime = hour.toString() + ':' + minutes.toString() + " " + TimeType.toString();
    return fullTime
}

export const isTimeEligableToMakeOrder = (time) => {

    const myCurrentTime = getCurrentTime()
    console.log(myCurrentTime)
    const orderTime = time.toString()
	console.log(orderTime)
    const isMyCurrentTimeisAM = myCurrentTime.slice(myCurrentTime.length - 2, myCurrentTime.length) == "AM" ? true : false
	console.log("isMyCurrentTimeisAM = " + isMyCurrentTimeisAM)
    const isMyorderTimeAM = orderTime.slice(orderTime.length - 2, orderTime.length) == "AM" ? true : false
	console.log("isMyorderTimeAM = " + isMyorderTimeAM)

    const myCurrentHour = parseInt(myCurrentTime.slice(0, 2))
    let orderTimetHour = parseInt(orderTime.slice(0, 2))

	if (!isMyorderTimeAM) {
		orderTimetHour += 12
	}

	console.log("myCurrentHour = " + myCurrentHour)
	console.log("orderTimetHour = " + orderTimetHour)

    const timeIsEligable = myCurrentHour < orderTimetHour ? true : false

	console.log("timeIsEligable = " + timeIsEligable)

    if (isMyCurrentTimeisAM && isMyorderTimeAM && timeIsEligable) {
		console.log("HERE")
        return true
    }
    if (!isMyCurrentTimeisAM && !isMyorderTimeAM && timeIsEligable) {
		console.log("HERE 2")
        return true
    }

    if (!isMyCurrentTimeisAM && isMyorderTimeAM) {
		console.log("HERE 3")
        return true
    }
    if (isMyCurrentTimeisAM && !isMyorderTimeAM) {
		console.log("HERE 4")
        return true
    }
	console.log("HERE 5")
    return false
}

export const convertTimeTo12 = (time = "") => {

    if (!time.includes("PM") || !time.includes("AM")) {
        const currentTime = moment(`${time}`, ["HH.mm"]).format(`hh:mm a`).toLocaleUpperCase();
        return currentTime
    } else {
        return time
    }

}
