import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";
import { DateTime } from "luxon";

export default class PaycheckService {
  public static getYearStartAndEnd(year: string = DateTime.utc().year.toString()): { yearStart: string, yearEnd: string } {
    const yearStart = DateTime.fromISO(year).startOf('year').toSQLDate()
    const yearEnd = DateTime.fromISO(year).endOf('year').toSQLDate()
    return { yearStart, yearEnd }
  }

  public static async getPaycheckYears(user: User | undefined) {
    const defaultYears = [DateTime.utc().year]
    
    if (!user) return defaultYears

    const [years] = await Database.rawQuery('SELECT DISTINCT YEAR(date) as year FROM paychecks WHERE user_id = ? ORDER BY year DESC', [user.id])
    
    return years.length ? years.map(y => y.year) : defaultYears
  }
}