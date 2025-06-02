function parseCalendarNumber(num: number): string {
  return num < 10 && !isNaN(num) ? '0' + num : String(num)
}

export function getDateMessage() {
  const date = new Date()
  const minutes = parseCalendarNumber(date.getMinutes())
  const hours = parseCalendarNumber(date.getHours())
  const fullYear = parseCalendarNumber(date.getFullYear())
  const month = parseCalendarNumber(date.getMonth() + 1)
  const day = parseCalendarNumber(date.getDate())
  return `${day}.${month}.${fullYear} ${hours}:${minutes}`
}
