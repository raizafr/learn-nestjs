import { Followed } from './entities/followed.entity';

export const followedsProviders = [
  {
    provide: 'FOLLOWEDS_REPOSITORY',
    useValue: Followed,
  },
];
