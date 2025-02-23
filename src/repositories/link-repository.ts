import { Link } from '@prisma/client'
import { prisma } from '../config/prisma-client'

export class LinkRepository {
  static async findByUserId(userId: string) {
    return prisma.link.findMany({
      where: { postedByUserId: userId },
    })
  }

  static async findById(id: string) {
    return prisma.link.findUnique({ where: { id } })
  }

  static async create(data: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>): Promise<Link> {
    return prisma.link.create({ data })
  }

  static async update(id: string, data: Partial<Omit<Link, 'id'>>) {
    return prisma.link.update({ where: { id }, data })
  }

  static async delete(id: string) {
    return prisma.link.delete({ where: { id } })
  }
}