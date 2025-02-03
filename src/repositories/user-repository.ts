import { prisma } from '../config/prisma-client'
import { IUser } from '../interfaces/user-interface'

export class UserRepository {
  static async findAll(): Promise<IUser[]> {
    return prisma.user.findMany()
  }

  static async findById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  static async create(data: Omit<IUser, 'id'>): Promise<IUser> {
    return prisma.user.create({ data })
  }

  static async update(id: string, data: Partial<Omit<IUser, 'id'>>): Promise<IUser> {
    return prisma.user.update({ where: { id }, data })
  }

  static async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
