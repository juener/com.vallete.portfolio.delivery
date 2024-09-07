import { prisma } from '@/lib/prisma';

interface CreateCheckInInterface {
  userId: string;
  gymId: string;
}

export async function createCheckInTest({
  userId,
  gymId,
}: CreateCheckInInterface) {
  const checkIn = await prisma.checkIn.create({
    data: {
      user_id: userId,
      gym_id: gymId,
    },
  });

    return {
    checkIn,
  };
}
