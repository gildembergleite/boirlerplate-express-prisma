import { IUser } from '../interfaces/user-interface'
import { UserRepository } from '../repositories/user-repository'

export class UserService {
  static async getAllUsers(): Promise<IUser[]> {
    return UserRepository.findAll()
  }

  static async getUserById(id: string): Promise<IUser> {
    const user = await UserRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  static async createUser(data: Omit<IUser, 'id'>): Promise<IUser> {
    return UserRepository.create(data)
  }

  static async updateUser(id: string, data: Partial<Omit<IUser, 'id'>>): Promise<IUser> {
    return UserRepository.update(id, data)
  }

  static async deleteUser(id: string): Promise<void> {
    await UserRepository.delete(id)
  }
}
