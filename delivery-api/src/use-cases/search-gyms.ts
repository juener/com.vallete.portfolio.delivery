import { GymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);
        if (!gyms) {
      throw new ResourceNotFoundError();
        }

    return { gyms };
    }
}
