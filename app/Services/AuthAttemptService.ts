import AuthAttemptPurpose from "Contracts/Enums/AuthAttemptPurpose";
import AuthAttempt from "App/Models/AuthAttempt";
import { DateTime } from "luxon";

export default class AuthAttemptService {
  public static allowedAttempts: number = 3;

  /**
   * Returns number of authentication attempts in past 48 hours
   * @param email 
   */
  public static async attempts(email: string): Promise<number> {
    const period = DateTime.local().minus({ days: 2 }).toSQL();
    const attempts = await AuthAttempt.query().where('created_at', '>', period).where('email', email).whereNull('deleted_at');
    return attempts.length;
  }

  /**
   * Returns the number of remaining authentication attempts in 48 hour period
   * @param email 
   */
  public static async remainingAttempts(email: string): Promise<number> {
    const attempts = await AuthAttemptService.attempts(email);
    return AuthAttemptService.allowedAttempts - attempts;
  }

  /**
   * Deletes all bad auth attempts for email
   * @param email 
   */
  public static async deleteBadAttempts(email: string): Promise<void> {
    await AuthAttempt.query().where('email', email).whereNull('deleted_at').update({ deleted_at: DateTime.utc().toFormat('yyyy-MM-dd hh:mm:ss') })
  }

  /**
   * Add a bad authentication attempt on login
   * @param email 
   */
  public static async login(email: string): Promise<void> {
    await AuthAttempt.create({
      email,
      purpose_id: AuthAttemptPurpose.CHANGE_EMAIL
    });
  }

  /**
   * Add a bad authentication attempt on change email
   * @param email 
   */
  public static async changeEmail(email: string): Promise<void> {
    await AuthAttempt.create({
      email,
      purpose_id: AuthAttemptPurpose.CHANGE_EMAIL
    });
  }
}