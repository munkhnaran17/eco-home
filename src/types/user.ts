import { RankType } from './rank';

interface UserRank {
  type: RankType;
  progress: number;
  step: number;
}

export interface User {
  id: string;
  rank: UserRank;
}
