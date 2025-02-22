import { IUser } from '../interfaces/user-interface'
import { UserRepository } from '../repositories/user-repository'
import bcrypt from 'bcrypt'

export class AuthService {
  static async authenticateUser(username: string, password: string): Promise<Omit<IUser, 'password'>> {
    const user = await UserRepository.findByUsername(username)
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid username or password')
    }
    
    return { id: user.id, name: user.name, username: user.username, avatar: user.avatar }
  }
}
