import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreatePaychecks extends BaseSchema {
  protected tableName = 'paychecks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.timestamp('date').notNullable()
      table.float('gross_income').nullable().defaultTo(0)
      table.float('taxable_income').nullable().defaultTo(0)
      table.float('net_income').nullable().defaultTo(0)
      table.float('tax_federal').nullable().defaultTo(0)
      table.float('tax_state').nullable().defaultTo(0)
      table.float('tax_city').nullable().defaultTo(0)
      table.float('social_security').nullable().defaultTo(0)
      table.float('medicare').nullable().defaultTo(0)
      table.float('health_insurance').nullable().defaultTo(0)
      table.float('401k_contribution').nullable().defaultTo(0)
      table.float('401k_balance').nullable().defaultTo(0)
      table.float('ira_contribution').nullable().defaultTo(0)
      table.float('ira_balance').nullable().defaultTo(0)
      table.float('taxable_inv_contribution').nullable().defaultTo(0)
      table.float('taxable_inv_balance').nullable().defaultTo(0)
      table.float('hsa_contribution').nullable().defaultTo(0)
      table.float('hsa_balance').nullable().defaultTo(0)
      table.float('debt').nullable().defaultTo(0)
      table.float('home_mortgage').nullable().defaultTo(0)
      table.float('home_equity').nullable().defaultTo(0)
      table.float('home_equity_contribution').nullable().defaultTo(0)
      table.float('home_value').nullable().defaultTo(0)
      table.float('savings_balance').nullable().defaultTo(0)
      table.text('notes').nullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
