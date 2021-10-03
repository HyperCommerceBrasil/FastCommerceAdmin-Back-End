import Order from '@modules/Order/infra/typeorm/entities/Order';
import OrderItems from '@modules/Order/infra/typeorm/entities/OrderItems';
import Product from '@modules/Product/infra/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shipmentsItems')
class Shipment {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  shipmentId: string;

  @Column()
  productId: string;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn({
    name: 'productId',
    referencedColumnName: 'id',
  })
  product: Product;

  @Column()
  orderId: string;

  @Column()
  orderItemId: string;

  @OneToOne(() => OrderItems, { eager: true })
  @JoinColumn({
    name: 'orderItemId',
    referencedColumnName: 'id',
  })
  detailsItem: OrderItems;

  @OneToOne(() => Shipment)
  @JoinColumn()
  shipment: Shipment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Shipment;
