import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WelcomesController {

    public async index({ view }: HttpContextContract) {
      return view.render('home')
    }
  }