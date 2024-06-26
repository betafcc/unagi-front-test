/**
 * Formats the date to locale specific format
 *
 * @example
 * const d = new Date('2024-06-25')
 *
 * console.log(formatDate(d, 'en-us')) // June 25, 2024
 * console.log(formatDate(d, 'en-gb')) // 25 June 2024
 * console.log(formatDate(d, 'fr')) // 25 juin 2024
 */
export const formatDate = (date: Date, locale = 'default') =>
  date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
