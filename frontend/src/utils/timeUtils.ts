export function getYear(datetime: string) {
  return datetime.split('T')[0].split('-')[0];
}
export function getMonth(datetime: string) {
  return datetime.split('T')[0].split('-')[1];
}
export function getDay(datetime: string) {
  return datetime.split('T')[0].split('-')[2];
}
