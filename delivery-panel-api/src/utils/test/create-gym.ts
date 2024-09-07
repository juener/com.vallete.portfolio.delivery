import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

interface GymTestInputs {
  title?: string;
  description?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
}

export async function createGymTest({
  title,
  description,
  phone,
  latitude,
  longitude,
}: GymTestInputs) {
  const gym = await prisma.gym.create({
    data: {
      title: title ?? `Gym Test - ${randomUUID()}`,
      description,
      phone,
      latitude: latitude ?? 51.9279573,
      longitude: longitude ?? 4.4084285,
    },
  });

    return {
    gym,
  };
}
