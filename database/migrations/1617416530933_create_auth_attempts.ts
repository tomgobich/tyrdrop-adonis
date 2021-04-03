import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateAuthAttempts extends BaseSchema {
  protected tableName = 'auth_attempts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').notNullable();
      table.integer('purpose_id').notNullable().defaultTo(1);
      table.timestamp('deleted_at').nullable();
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
