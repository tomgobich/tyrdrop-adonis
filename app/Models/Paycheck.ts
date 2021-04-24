import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Paycheck extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column.dateTime()
  public date: DateTime

  @column()
  public grossIncome: number

  @column()
  public taxableIncome: number

  @column()
  public netIncome: number

  @column()
  public taxFederal: number

  @column()
  public taxState: number

  @column()
  public taxCity: number

  @column()
  public socialSecurity: number

  @column()
  public medicare: number

  @column()
  public healthInsurance: number

  @column({ columnName: '401k_contribution' })
  public kContribution: number

  @column({ columnName: '401k_balance' })
  public kBalance: number

  @column()
  public iraContribution: number

  @column()
  public iraBalance: number

  @column()
  public taxableInvContribution: number

  @column()
  public taxableInvBalance: number

  @column()
  public hsaContribution: number

  @column()
  public hsaBalance: number

  @column()
  public debt: number

  @column()
  public homeMortgage: number

  @column()
  public homeEquity: number

  @column()
  public homeEquityContribution: number

  @column()
  public homeValue: number

  @column()
  public savingsBalance: number

  @column()
  public notes: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @computed()
  public get netWorth() {
    const assets = this.kBalance + this.iraBalance + this.taxableInvBalance + this.savingsBalance + this.hsaBalance + this.homeValue
    const liabilities = this.debt + this.homeMortgage
    return assets - liabilities
  }

  @computed()
  public get investmentBalance() {
    return this.kBalance + this.iraBalance + this.taxableInvBalance
  }

  @computed()
  public get investmentContributions() {
    return this.kContribution + this.iraContribution + this.taxableInvContribution
  }
}
