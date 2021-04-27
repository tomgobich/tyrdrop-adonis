import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Settings extends BaseSchema {
  protected tableName = 'settings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('retirement_age_traditional')
      table.integer('retirement_age_goal')
      table.integer('life_expectancy')
      table.float('growth_rate').defaultTo(6.0)
      table.float('safe_withdrawl_rate').defaultTo(4.0)
      table.float('goal_yearly_retirement_payout').defaultTo(50000)
      table.float('goal_total_invested_balance').defaultTo(1250000)
      table.float('goal_net_worth').defaultTo(1500000)
      table.float('goal_401k_contribution').defaultTo(19500)
      table.float('goal_ira_contribution').defaultTo(6000)
      table.float('goal_taxable_inv_contribution').defaultTo(6000)
      table.float('goal_hsa_contribution').defaultTo(3600)
      table.float('goal_savings_balance').defaultTo(10000)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
