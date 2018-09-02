'use strict'

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  
  /**
   * 
   */
  async login ({ request, response, auth }) {
    
    const {email, password} = request.all();
    const user = await auth.attempt(email, password);
    return response.json(user);
  }

  /**
   * 
   */
  async register ({ auth, request, response }) {
    const user = new User;
    user.username = request.input('username');
    user.password = request.input('password');
    user.email = request.input('email');

    await user.save();
    return response.json(user);
  }


  async profile({auth, response}) {
    const user = await auth.getUser()

    return response.json(user);
  }

  async revokeUserToken({auth, response}) {
    const user = await auth.getUser();
    await user.tokens().update({is_revoked:true})

    return response.status(204).json(null);
  }
}

module.exports = AuthController
