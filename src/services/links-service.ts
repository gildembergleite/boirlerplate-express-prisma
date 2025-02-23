import { Link } from '@prisma/client'
import { LinkRepository } from '../repositories/link-repository'

export class LinksService {
  static async getAllLinks(userId: string) {
    return LinkRepository.findByUserId(userId)
  }

  static async getLinkById(id: string, userId: string) {
    const link = await LinkRepository.findById(id)
    if (!link || link.postedByUserId !== userId) {
      throw new Error('Link not found or unauthorized')
    }
    return link
  }

  static async createLink(data: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>): Promise<Link> {
    return LinkRepository.create(data)
  }

  static async updateLink(id: string, data: Partial<Omit<Link, 'id'>>, userId: string) {
    const link = await LinkRepository.findById(id)
    if (!link || link.postedByUserId !== userId) {
      throw new Error('Link not found or unauthorized')
    }

    return LinkRepository.update(id, data)
  }

  static async deleteLink(id: string, userId: string) {
    const link = await LinkRepository.findById(id)
    if (!link || link.postedByUserId !== userId) {
      throw new Error('Link not found or unauthorized')
    }

    return LinkRepository.delete(id)
  }
}