import { prisma } from '../config/prisma-client'
import { IUser } from '../interfaces/user-interface'
import bcrypt from 'bcrypt'

export class UserRepository {
  static async findAll(): Promise<Omit<IUser, 'password'>[]> {
    return prisma.user.findMany({ select: { id: true, name: true, username: true, avatar: true } })
  }

  static async findById(id: string): Promise<Omit<IUser, 'password'> | null> {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, username: true, avatar: true },
    })
  }

  static async findByUsername(username: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { username } })
  }

  static async create(data: Omit<IUser, 'id'>): Promise<Omit<IUser, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    })
    return { id: user.id, name: user.name, username: user.username, avatar: user.avatar }
  }

  static async update(id: string, data: Partial<Omit<IUser, 'id' | 'password'>>): Promise<Omit<IUser, 'password'>> {
    return prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, username: true, avatar: true },
    })
  }

  static async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
