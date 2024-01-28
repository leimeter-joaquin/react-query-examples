export interface Heading {
  _id?: string;
  name: string;
  description?: string;
  onlyLiquidate: boolean;
  categories: any[];
  operation: any;
  currency: any;
  isActive: boolean;
  isDeleted: boolean;
}
