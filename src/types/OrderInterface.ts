enum OrderType {
  Standard,
  SaleOrder,
}

export default interface Order {
  orderId: number;
  orderType: OrderType;
  customerName: string;
  createdDate: string;
  createdByUserName: string;
}
