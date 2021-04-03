import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
	public async index({ inertia }: HttpContextContract) {
		return inertia.render('Dashboard')
	}
}
