import Database from "@ioc:Adonis/Lucid/Database";
import Paycheck from "App/Models/Paycheck";
import User from "App/Models/User";
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
    const priorYearPaycheck = this.getMonthPaycheckFromPriorYear(paycheck);
    const yearsPaychecks = this.getPaychecks(paycheck.date.year)
    const priorYearsPaychecks = this.getPaychecks(paycheck.date.year - 1)

    // // 1. Net Worth
    // $netWorth = $this->getNetWorthSummary($paycheck, $previousPaycheck);

    // // 2. Gross Income
    // $grossIncome = $this->getGrossIncomeSummary($yearsPaychecks, $previousYearsPaychecks);

    // // 3. Net Income
    // $netIncome = $this->getNetIncomeSummary($yearsPaychecks, $previousYearsPaychecks);

    // // 4. Investment Balance
    // $investmentBalance = $this->getInvestmentBalanceSummary($paycheck, $previousPaycheck);

    // // 5. Investment Contribution
    // $investmentContribution = $this->getInvestmentContributionSummary($yearsPaychecks, $previousYearsPaychecks);

    // // 6. Home Equity
    // $homeEquityBalance = $this->getHomeEquitySummary($paycheck, $previousPaycheck);
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