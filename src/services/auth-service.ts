import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/user-repository'

export class AuthService {
  static async authenticateUser(email: string, password: string): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> {
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
