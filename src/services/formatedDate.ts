import moment from 'moment'

export const formatedDateFull = fetchDate => {
  return String(moment(fetchDate).format('YYYY年MM月DD日HH:MM'))
}

export const formatedDateMonthDate = fetchDate => {
  return String(moment(fetchDate).format('MM月DD日'))
}
