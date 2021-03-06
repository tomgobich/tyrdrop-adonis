import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Paycheck from 'App/Models/Paycheck'
import PaycheckService from 'App/Services/PaycheckService'
import PaycheckValidator from 'App/Validators/PaycheckValidator'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class PaychecksController {
  public async index({ inertia, auth, params }: HttpContextContract) {
    const paycheckService = new PaycheckService(<User>auth.user)
    const year = params.year ?? DateTime.utc().year
    const years = await paycheckService.getPaycheckYears()
    const paychecks = await paycheckService.getPaychecks(year)
    
    let summary;
    if (paychecks.length) {
      summary = await paycheckService.getSummary(paychecks[0])
    }

    return inertia.render('Paychecks/Index', { paychecks, years, year, summary })
  }

  public async create({ inertia, auth }: HttpContextContract) {
    const lastPaycheck = auth.user?.related('paychecks').query().orderBy('date', 'desc').first()

    return inertia.render('Paychecks/New', { lastPaycheck })
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = await request.validate(PaycheckValidator)
    await Paycheck.create({ ...data, userId: auth.user?.id })

    session.flash('success', 'Your new paycheck has been saved')

    return response.redirect().toRoute('paychecks.index')
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ inertia, params }: HttpContextContract) {
    const paycheck = await Paycheck.findOrFail(params.id)

    return inertia.render('Paychecks/New', { paycheck })
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const data = await request.validate(PaycheckValidator)
    const paycheck = await Paycheck.findOrFail(params.id)

    paycheck.merge(data)
    await paycheck.save()

    session.flash('success', 'Your paycheck has been successfully updated')

    response.redirect().status(303).toRoute('paychecks.index')
  }

  public async destroy({ response, params, session }: HttpContextContract) {
    const paycheck = await Paycheck.findOrFail(params.id)

    await paycheck.delete()

    session.flash('success', 'Your paycheck has been deleted')

    return response.redirect().status(303).toRoute('paychecks.index')
  }
}
