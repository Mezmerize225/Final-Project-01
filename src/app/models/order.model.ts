export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  phone?: string;
  [key: string]: any;
}

export interface OrderItem {
  id: number | string;
  title: string;
  price: number;
  quantity: number;
  discountPercent?: number;
  newPrice?: number;
  [key: string]: any;
}

export interface Order {
  id?: number | string;
  items: OrderItem[];
  personalInfo: PersonalInfo;
  total: number;
  createdAt: string;
  [key: string]: any;
}