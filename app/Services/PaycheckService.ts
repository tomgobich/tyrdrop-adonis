import Database from "@ioc:Adonis/Lucid/Database";
import Paycheck from "App/Models/Paycheck";
import User from "App/Models/User";
import Summary from "Contracts/Types/Summary";
import { DateTime } from "luxon";
import DateService from "./DateService";

export default class PaycheckService {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  /**
   * Gets the user's paychecks for the given year
   * @param year 
   * @returns 
   */
  public async getPaychecks(year: string | number) {
    const [from, to] = DateService.getYearStartAndEnd(year)
    return this.user.related('paychecks').query().whereBetween('date', [from, to]).orderBy('date', 'desc')
  }

  /**
   * Gets distinct list of years user has at least one paycheck record for
   * @param user 
   * @returns 
   */
  public async getPaycheckYears(): Promise<Array<number>> {
    const defaultYears = [DateTime.utc().year]

    const [years] = await Database.rawQuery('SELECT DISTINCT YEAR(date) as year FROM paychecks WHERE user_id = ? ORDER BY year DESC', [this.user.id])

    return years.length ? years.map(y => y.year) : defaultYears
  }

  public async getSummary(paycheck: Paycheck) {
    const priorYearPaycheck = await this.getMonthPaycheckFromPriorYear(paycheck)
    const yearsPaychecks = await this.getPaychecks(paycheck.date.year)
    const priorYearsPaychecks = await this.getPaychecks(paycheck.date.year - 1)

    /**
     * TODO
     * Currently priorYearsPaychecks is pulling the entirety of the prior year.
     * Need to change this to only pull UP TO the current month + day in that year
     */

    // 1. Net Worth
    const netWorth = this.getNetWorthSummary(paycheck, priorYearPaycheck)

    // 2. Gross Income
    const grossIncome = this.getGrossIncomeSummary(yearsPaychecks, priorYearsPaychecks)
    
    // 3. Net Income
    const netIncome = this.getNetIncomeSummary(yearsPaychecks, priorYearsPaychecks)

    // 4. Investment Balance
    const invBalance = this.getInvestmentBalanceSummary(paycheck, priorYearPaycheck)

    // 5. YTD Investment Contributions
    const invContributionsYTD = this.getInvestmentContributionYTDSummary(yearsPaychecks, priorYearsPaychecks)

    return {
      netWorth,
      grossIncome,
      netIncome,
      invBalance,
      invContributionsYTD
    }
  }

  private getNetWorthSummary(paycheck: Paycheck, previousPaycheck: Paycheck|null) {
    const summary = new Summary()
    summary.title = 'Net Worth'
    summary.current = paycheck.netWorth
    summary.previous = previousPaycheck?.netWorth
    return summary
  }

  private getGrossIncomeSummary(yearsPaychecks: Array<Paycheck>, previousYearsPaychecks: Array<Paycheck>|null) {
    const summary = new Summary()
    summary.title = 'Gross Income'
    summary.current = yearsPaychecks.reduce((prev, curr) => prev + curr.grossIncome, 0)
    summary.previous = previousYearsPaychecks?.reduce((prev, curr) => prev + curr.grossIncome, 0)
    return summary
  }

  private getNetIncomeSummary(yearsPaychecks: Array<Paycheck>, previousYearsPaychecks: Array<Paycheck>|null) {
    const summary = new Summary()
    summary.title = 'Net Income'
    summary.current = yearsPaychecks.reduce((prev, curr) => prev + curr.netIncome, 0)
    summary.previous = previousYearsPaychecks?.reduce((prev, curr) => prev + curr.netIncome, 0)
    return summary
  }

  private getInvestmentBalanceSummary(paycheck: Paycheck, previousPaycheck: Paycheck|null) {
    const summary = new Summary()
    summary.title = 'Investment Balance'
    summary.current = paycheck.investmentBalance
    summary.previous = previousPaycheck?.investmentBalance
    return summary
  }

  private getInvestmentContributionYTDSummary(yearsPaychecks: Array<Paycheck>, previousYearsPaychecks: Array<Paycheck>|null) {
    const summary = new Summary()
    summary.title = 'YTD Investment Contributions'
    summary.current = yearsPaychecks.reduce((prev, curr) => prev + curr.investmentContributions, 0)
    summary.previous = previousYearsPaychecks?.reduce((prev, curr) => prev + curr.investmentContributions, 0)
    return summary
  }

  public getPercentageChange(oldValue: number, newValue: number) {
    const decreaseValue = oldValue - newValue
    return (decreaseValue / oldValue) * 100
  }

  /**
   * Gets the first paycheck from the same month of the prior year
   * TODO: switch to find closest matching date within month
   * @param paycheck 
   * @returns 
   */
  public async getMonthPaycheckFromPriorYear(paycheck: Paycheck) {
    const [from, to] = DateService.getMonthStartAndEnd(paycheck.date.minus({ year: 1 }).toISO())
    return this.user.related('paychecks').query().whereBetween('date', [from, to]).orderBy('date', 'desc').first()
  }
}