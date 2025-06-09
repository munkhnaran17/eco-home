import Mature from '../components/svgs/Mature';
import Sapling from '../components/svgs/Sapling';
import Seedling from '../components/svgs/Seedling';
import { Rank, RankType } from '../types/rank';

const getTree = (rank: RankType, step: number) => {
  switch (rank) {
    case RankType.NB:
      return <Seedling />;
    case RankType.SP:
      return (
        <Sapling
          disabled={step < Rank.getRankById(RankType.SP)!.requiredStep}
        />
      );
    case RankType.FE:
      return (
        <Mature disabled={step < Rank.getRankById(RankType.FE)!.requiredStep} />
      );
    default:
      return null;
  }
};

export const rankUtils = {
  getTree,
};
