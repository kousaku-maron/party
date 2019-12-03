import moment from 'moment'

export const formatedDateFull = (fetchDate: Date) => {
  return String(moment(fetchDate).format('YYYY年MM月DD日HH:mm'))
}

export const formatedDateMonthDateHour = (fetchDate: Date) => {
  return String(moment(fetchDate).format('MM月DD日HH:mm'))
}

export const formattedDateForMessageCreatedAt = (date: Date) => {
  return moment(date).format('HH:mm')
}
