import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma-client'
import { UserRepository } from '../repositories/user-repository'

export class UserService {
  static async getAllUsers() {
    return UserRepository.findAll()
  }

  static async getUserById(id: string) {
    const user = await UserRepository.findById(id)
    if (!user) throw new Error('User not found')
    return user
  }

  static async createUser(data: Omit<User, 'id'>)
    : Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> {
    const isExistUsername = await UserRepository.findByUsername(data.username)

    if (isExistUsername) {
      throw new Error('Username is exist')
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10)
    
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    })
    
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      email: user.email,
    }
  }

  static async updateUser(id: string, data: Partial<Omit<User, 'id' | 'password'>>) {
    return UserRepository.update(id, data)
  }

  static async deleteUser(id: string) {
    return UserRepository.delete(id)
  }
}
