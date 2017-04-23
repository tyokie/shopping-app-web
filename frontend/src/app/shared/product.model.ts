/**
 * Created by Tawanda Kamuzonde on 22/4/17.
 */

import { IItem } from './item.model';
import { IRecommendation } from './recommendation.model';

export interface IProduct
{
  recommendation: IRecommendation;
  items: IItem[];
}
