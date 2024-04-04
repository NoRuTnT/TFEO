export function getYear(datetime: string) {
  return datetime.split('T')[0].split('-')[0];
}
export function getMonth(datetime: string) {
  return datetime.split('T')[0].split('-')[1];
}
export function getDay(datetime: string) {
  return datetime.split('T')[0].split('-')[2];
}

export function getKoreanDate() {
  const now = new Date();
  now.setHours(now.getHours() + 9); // 현재 시간에 9시간을 더해줌
  const koreanTimeString = now.toISOString().split('T')[0];
  return koreanTimeString;
}
