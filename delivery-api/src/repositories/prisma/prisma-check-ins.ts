import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { env } from '@/env'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async countByUserId(userId: string) {
    const countCheckIns = await prisma.checkIn.count({
      where: {
        userId: userId,
      },
    })

    return countCheckIns
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId: userId,
      },
      take: env.APP_ROWS_PER_PAGE,
      skip: (page - 1) * env.APP_ROWS_PER_PAGE,
    })
    return checkIns
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId: userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}
