import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';
import { env } from '@/env';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkIn);

        return checkIn;
    }

  async countByUserId(userId: string) {
    const countCheckIns = this.items.filter(
      (checkIn) => checkIn.user_id === userId,
    ).length;

        return countCheckIns;
    }

  async findById(checkInId: string) {
    const checkIn = this.items.find((item) => item.id === checkInId);

        if (!checkIn) {
      return null;
        }

    return checkIn;
    }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * env.APP_ROWS_PER_PAGE, page * env.APP_ROWS_PER_PAGE);

        return checkIns;
    }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDay = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
            const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

            return checkIn.user_id === userId && isOnSameDay;
        });

        if (!checkInOnSameDay) {
      return null;
        }

    return checkInOnSameDay;
    }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

        if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
        }

    return checkIn;
    }
}
