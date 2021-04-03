import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema as Schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
import Event from '@ioc:Adonis/Core/Event'
import Logger from 'App/Logger/DiscordLogger';
import AuthAttemptService from 'App/Services/AuthAttemptService';

export default class AuthController {
  public showRegister({ view }: HttpContextContract) {
    return view.render('auth/register');
  }

  public async register({ request, response, auth, session }: HttpContextContract) {
    const schema = Schema.create({
      email: Schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
      password: Schema.string({}, [rules.minLength(8)])
    });

    const messages = {
      'required': "Please provide a {{ field }}",
      'email.unique': "An account with this email already exists",
      'password.minLength': "Your password must be at least 8 characters long",
    };

    const data = await request.validate({ schema, messages });

    try {
      const user = new User();
      user.email = data.email;
      user.password = data.password;
      await user.save();

      await auth.login(user);

      Event.emit('welcome', { user })
      session.flash('success', `Welcome to TyrDrop, start by entering in your latest paycheck`);

      return response.redirect('/paychecks/new');
    } catch (error) {
      Logger.error('AuthController.register', error);

      session.flash('error', "An error occurred.");
      return response.redirect().back();
    }
  }

  public showLogin({ view }: HttpContextContract) {
    return view.render('auth/login');
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const { email, password, remember_me } = request.all();

    const authAttemptsRemaining = await AuthAttemptService.remainingAttempts(email);
    if (authAttemptsRemaining <= 0) {
      session.flash('error', "Your account has been locked due to repeated bad login attempts. Please reset your password.");
      return response.redirect('/forgot-password');
    }

    try {
      await auth.attempt(email, password, !!remember_me);
      await AuthAttemptService.deleteBadAttempts(email);
      return response.redirect('/dashboard');
    } catch (error) {
      await AuthAttemptService.login(email);
      const message = authAttemptsRemaining < 2
        ? `The provided email or password is incorrect. ${authAttemptsRemaining} attempt${authAttemptsRemaining === 1 ? '' : 's'} remaining.`
        : `The provided email or password is incorrect.`

      session.flash('errors', { form: message });
      return response.redirect().back();
    }
  }

  public async logout({ response, auth, session }: HttpContextContract) {
    await auth.logout();

    session.flash('success', "Have a great day!");

    return response.redirect('/')
  }
}
