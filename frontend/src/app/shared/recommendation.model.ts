export interface IRecommendation
{
  currentLevel: number;
  maxLevel: number;
}

export class Recommendation implements IRecommendation
{
  currentLevel: number;
  maxLevel: number;

  constructor (recommendation) {
    this.currentLevel = recommendation.currentLevel;
    this.maxLevel = recommendation.maxLevel;
  }

}
