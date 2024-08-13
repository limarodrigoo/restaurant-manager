export interface CreateOrderInput {
  billId: number;
  OrderItens: {
    itemId: number;
    quantity: number;
  }[];
}
