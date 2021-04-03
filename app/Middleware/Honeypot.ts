import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from '@ioc:Adonis/Core/Config'

export default class Honeypot {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    const honeyFields = Config.get('app.honeyFields');
    const honeyValues = request.only(honeyFields);
    let wasFlagged = false;

    for (let key in honeyValues) {
      if (honeyValues[key]) {
        wasFlagged = true;
        session.flash('error', 'You were flagged as a bot.');
        response.redirect('/');
      }
    }

    if (!wasFlagged) {
      // code for middleware goes here. ABOVE THE NEXT CALL
      await next()
    }
  }
}
