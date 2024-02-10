import { Follower } from './entities/follower.entity';

export const followersProviders = [
  {
    provide: 'FOLLOWERS_REPOSITORY',
    useValue: Follower,
  },
];
