interface ItemShipping {
  productId: string;
  orderItemId: string;
}

export default interface IShipmentDTO {
  orderId: string;
  items: ItemShipping[];
  shipmentNumber: string;
}
