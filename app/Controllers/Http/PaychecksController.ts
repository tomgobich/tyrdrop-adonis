import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Paycheck from 'App/Models/Paycheck';
import PaycheckService from 'App/Services/PaycheckService';
import PaycheckValidator from 'App/Validators/PaycheckValidator';
import { DateTime } from 'luxon';

export default class PaychecksController {
  public async index ({ inertia, auth, params }: HttpContextContract) {
    const year = params.year ?? DateTime.utc().year
    const { yearStart, yearEnd } = PaycheckService.getYearStartAndEnd(year);
    const years = await PaycheckService.getPaycheckYears(auth.user)
    const paychecks = auth.user?.related('paychecks').query().where('date', '>=', yearStart).where('date', '<=', yearEnd)

    return inertia.render('Paychecks/Index', { paychecks, years, year })
  }

  public async create ({ inertia, auth }: HttpContextContract) {
    const lastPaycheck = auth.user?.related('paychecks').query().orderBy('date', 'desc').first()

    return inertia.render('Paychecks/New', { lastPaycheck })
  }

  public async store ({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(PaycheckValidator)
    await Paycheck.create({ ...data, userId: auth.user?.id })

    return response.redirect('/paychecks')
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
