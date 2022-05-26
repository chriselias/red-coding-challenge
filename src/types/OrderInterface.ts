export default interface Order {
  orderId: number;
  orderType: "Standard" | "SaleOrder";
  customerName: string;
  createdDate: string;
  createdByUserName: string;
}
