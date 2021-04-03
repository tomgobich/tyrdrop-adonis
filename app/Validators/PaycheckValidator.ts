import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PaycheckValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
  public schema = schema.create({
  	date: schema.date({ format: 'yyyy-MM-dd' }),
    gross_income: schema.number([rules.unsigned()]),
    taxable_income: schema.number([rules.unsigned()]),
    net_income: schema.number([rules.unsigned()]),
    tax_federal: schema.number([rules.unsigned()]),
    tax_state: schema.number([rules.unsigned()]),
    tax_city: schema.number([rules.unsigned()]),
    social_security: schema.number([rules.unsigned()]),
    medicare: schema.number([rules.unsigned()]),
    health_insurance: schema.number([rules.unsigned()]),
    '401k_contribution': schema.number([rules.unsigned()]),
    '401k_balance': schema.number([rules.unsigned()]),
    ira_contribution: schema.number([rules.unsigned()]),
    ira_balance: schema.number([rules.unsigned()]),
    taxable_inv_contribution: schema.number([rules.unsigned()]),
    taxable_inv_balance: schema.number([rules.unsigned()]),
    hsa_contribution: schema.number([rules.unsigned()]),
    hsa_balance: schema.number([rules.unsigned()]),
    savings_balance: schema.number([rules.unsigned()]),
    debt: schema.number([rules.unsigned()]),
    home_mortgage: schema.number([rules.unsigned()]),
    home_equity: schema.number([rules.unsigned()]),
    home_equity_contribution: schema.number([rules.unsigned()]),
    home_value: schema.number([rules.unsigned()]),
    notes: schema.string.optional({ trim: true })
  })

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
  public messages = {}
}
