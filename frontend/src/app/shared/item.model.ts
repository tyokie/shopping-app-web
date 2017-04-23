export interface IItem
{
  id: string; //should really be a number
  title: string;
  category: string;
  imageUrl: string;
  unitsInCartons: number;
  unitCost: number; //float or double
  packSize: number;
  secondaryCategory: string;
}
