import Inertia from '@ioc:EidelLev/Inertia';

Inertia.share({
  page: (ctx) => {
    return {
      user: ctx.auth.user,
      flash: ctx.session.flashMessages.all(),
      errors: ctx.session.flashMessages.get('errors')
    }
  }
});