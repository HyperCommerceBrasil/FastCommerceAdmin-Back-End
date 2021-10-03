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
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Customer from '@modules/Customer/infra/typeorm/entities/Customer';
import Status from '@modules/Order/infra/typeorm/entities/Status';
import Shipment from '@modules/Shipment/infra/typeorm/entities/Shipment';
import Product from '@modules/Product/infra/typeorm/entities/Product';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  numberOrder: string;

  @Column()
  statusCode: string;

  @OneToOne(() => Customer, {
    eager: true,
  })
  @JoinColumn()
  customer: Customer;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @OneToOne(() => Status, { eager: true })
  @JoinColumn({
    name: 'statusCode',
    referencedColumnName: 'code',
  })
  status: Status;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'ordersItems', // table name for the junction table of this relation
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
  })
  items: Product[];

  @OneToMany(() => Shipment, shipment => shipment.order, { eager: true })
  shipments: Shipment;

  @Column()
  cep: string;

  @Column()
  uf: string;

  @Column()
  numberHouse: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
