import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import Product from '@modules/Product/infra/typeorm/entities/Product';

@Entity('ordersItems')
class Order {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  productId: string;

  @Column()
  orderId: string;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn({
    name: 'productId',
    referencedColumnName: 'id',
  })
  product: Product;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @Column()
  value: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
