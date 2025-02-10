import { prisma } from '../config/prisma-client'
import { IUser } from '../interfaces/user-interface'
import { UserRepository } from '../repositories/user-repository'
import bcrypt from 'bcrypt'

export class UserService {
  static async getAllUsers() {
    return UserRepository.findAll()
  }

  static async getUserById(id: string) {
    const user = await UserRepository.findById(id)
    if (!user) throw new Error('User not found')
    return user
  }

  static async createUser(data: Omit<IUser, 'id'>): Promise<Omit<IUser, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    })
    return { id: user.id, name: user.name, username: user.username, avatar: user.avatar }
  }

  static async updateUser(id: string, data: Partial<Omit<IUser, 'id' | 'password'>>) {
    return UserRepository.update(id, data)
  }

  static async deleteUser(id: string) {
    return UserRepository.delete(id)
  }

  static async authenticateUser(username: string, password: string): Promise<Omit<IUser, 'password'>> {
    const user = await UserRepository.findByUsername(username)
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid username or password')
    }
    
    return { id: user.id, name: user.name, username: user.username, avatar: user.avatar }
  }
}
