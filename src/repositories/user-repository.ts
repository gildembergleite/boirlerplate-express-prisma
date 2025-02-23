import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma-client'
export class UserRepository {
  static async findAll(): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>[]> {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        email: true,
      }
    })
  }

  static async findById(id: string): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'> | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        email: true,
      },
    })
  }

  static async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } })
  }

  static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } })
  }

  static async create(data: Omit<User, 'id'>): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> {
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

  static async update(id: string, data: Partial<Omit<User, 'id' | 'password'>>): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true, 
        name: true, 
        username: true, 
        avatar: true, 
        email: true },
    })
  }

  static async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
