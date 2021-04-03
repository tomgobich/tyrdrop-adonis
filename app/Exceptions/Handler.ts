/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '404': 'errors.not-found',
    '500..599': 'errors.server-error',
  };

  public async handle(error: any, ctx: HttpContextContract) {
    const { inertia, session } = ctx;

    this.logger.error(error);

    if (error.code === 'E_VALIDATION_FAILURE' && inertia.isInertia()) {
      session.flash('errors', error);
      return inertia.redirectBack(); // This ensures that the response has the correct HTTP code
    }

    return super.handle(error, ctx);
  }

  constructor() {
    super(Logger);
  }
}