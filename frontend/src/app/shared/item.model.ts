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

export class Item implements IItem
{
  id;
  title;
  category;
  imageUrl;
  unitsInCartons;
  unitCost;
  packSize;
  secondaryCategory;


  constructor (item) {
    this.id = item.id;
    this.title = item.title;
    this.category = item.category;
    this.imageUrl = item.imageUrl;
    this.unitsInCartons = item.unitsInCartons;
    this.unitCost = item.unitCost;
    this.packSize = item.packSize;
    this.secondaryCategory = item.secondaryCategory;
  }

}
