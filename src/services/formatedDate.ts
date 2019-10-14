import moment from 'moment'

export const formatedDate = fetchDate => {
  return String(moment(fetchDate).format('YYYY年MM月DD日HH:MM'))
}
