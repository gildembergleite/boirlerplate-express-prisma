import bcrypt from 'bcrypt'
import { IUser } from '../interfaces/user-interface'
import { UserRepository } from '../repositories/user-repository'

export class AuthService {
  static async authenticateUser(email: string, password: string): Promise<Omit<IUser, 'password'>> {
    const user = await UserRepository.findByEmail(email)
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password')
    }
    
    return {
      id: user.id, 
      name: user.name, 
      username: user.username, 
      avatar: user.avatar,
      email: user.email,
    }
  }
}
