export function formatDate(timestamp) {
    if (!timestamp) return '' // 데이터가 없거나 유효하지 않을 때

    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
        return '' // 유효하지 않은 날짜 처리
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
}
