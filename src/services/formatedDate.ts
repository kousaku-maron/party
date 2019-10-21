import moment from 'moment'

export const formatedDateFull = (fetchDate: Date) => {
  return String(moment(fetchDate).format('YYYY年MM月DD日HH:MM'))
}

export const formatedDateMonthDateHour = (fetchDate: Date) => {
  return String(moment(fetchDate).format('MM月DD日HH:MM'))
}
