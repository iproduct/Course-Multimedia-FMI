import { Identifiable, IdType } from '../shared/shared-types';

export class Product implements Identifiable {
  static typeId = 'Product';

  constructor(
    public id: IdType,
    public name: string,
    public price: number,
    public description?: string,
    public imageUrl?: string,
  ) {}
}
