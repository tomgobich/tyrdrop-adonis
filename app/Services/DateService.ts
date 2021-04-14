import { DateTime } from 'luxon'

export default class DateService {
  /**
   * Gets the year start and year end date for provided year
   * @param year 
   * @returns 
   */
  public static getYearStartAndEnd(year: string | number = DateTime.utc().year.toString()): Array<string> {
    const yearStart = DateTime.fromISO(year.toString()).startOf('year').toSQLDate()
    const yearEnd = DateTime.fromISO(year.toString()).endOf('year').toSQLDate()
    return [yearStart, yearEnd]
  }

  /**
   * Gets the month start and month end date for provided date
   * @param date 
   * @returns 
   */
  public static getMonthStartAndEnd(date: string | DateTime = DateTime.utc()): Array<string> {
    const dte = typeof date === "string" ? DateTime.fromISO(date.toString()) : date;
    const monthStart = dte.startOf('month').toSQLDate()
    const monthEnd = dte.endOf('month').toSQLDate()
    return [monthStart, monthEnd]
  }
}