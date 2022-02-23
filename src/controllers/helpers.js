const moment = require('moment');

const isDateValid = (date) => {
    return moment(date, 'DD/MM/YYYY', true).isValid()
        || moment(date, 'DD-MM-YYYY', true).isValid()
        || moment(date, 'YYYY/MM/DD', true).isValid()
        || moment(date, 'YYYY-MM-DD', true).isValid()
        || moment(date, 'MM/DD/YYYY', true).isValid()
        || moment(date, 'MM-DD-YYYY', true).isValid();
};

const getNumberOfDaysLeftForBirthday = (birthDate) => {
    const day = moment(birthDate, 'YYYY-MM-DD').date();
    const month = moment(birthDate, 'YYYY-MM-DD').month() + 1;

    const currentDate = moment().format('YYYY-MM-DD');
    const currentYear = moment().year();

    const birthdateForCurrentYear = moment(`${currentYear}-${month}-${day}`, 'YYYY-MM-DD');
    const birthDateForNextYear = moment(`${currentYear + 1}-${month}-${day}`, 'YYYY-MM-DD');

    const daysLeftForCurrentYearBirthday = birthdateForCurrentYear.diff(currentDate, 'days');
    const daysLeftForNextYearBirthday = birthDateForNextYear.diff(currentDate, 'days');

    let daysLeftForBirthday;
    if (daysLeftForCurrentYearBirthday > 0) {
        daysLeftForBirthday = daysLeftForCurrentYearBirthday;
    } else {
        daysLeftForBirthday = daysLeftForNextYearBirthday;
    }
    return daysLeftForBirthday;
}

module.exports = {
    isDateValid,
    getNumberOfDaysLeftForBirthday
}