export enum RankType {
  NB,
  SP,
  FE,
}

type RankData = {
  id: RankType;
  name: string;
  description: string;
  amount: number;
  requiredStep: number;
};

export class Rank {
  id: RankType;
  name: string;
  description: string;
  amount: number;
  requiredStep: number;

  private static readonly ranks: RankData[] = [
    {
      id: RankType.NB,
      name: 'Newbie',
      description: 'Let’s keep reducing the CO2',
      amount: 0,
      requiredStep: 0,
    },
    {
      id: RankType.SP,
      name: 'Solar powered',
      description: 'Reduce 20kg of CO2 to grow this tree.',
      amount: 1000,
      requiredStep: 4,
    },
    {
      id: RankType.FE,
      name: 'Fully eco',
      description: 'Reduce 1500kg of CO2 to grow this tree.',
      amount: 5000,
      requiredStep: 7,
    },
  ];

  constructor(data: RankData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.amount = data.amount;
    this.requiredStep = data.requiredStep;
  }

  static getRankById(id: RankType): Rank | undefined {
    const data = Rank.ranks.find((rank) => rank.id === id);
    return data ? new Rank(data) : undefined;
  }
}
