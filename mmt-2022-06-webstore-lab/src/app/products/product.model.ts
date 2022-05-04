import { IdType } from './../shared/common-types';
import { Identifiable } from "../shared/common-types";

export class Product implements Identifiable {
  static typeId = 'Product';
  id: IdType;

  constructor(
    public name: string,
    public price: string,
    public description: string,
    public imageUrl?: string,
  ){}

}
