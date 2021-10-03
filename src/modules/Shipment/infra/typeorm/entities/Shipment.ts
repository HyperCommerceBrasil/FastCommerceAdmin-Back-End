import Order from '@modules/Order/infra/typeorm/entities/Order';
import ShipmentItem from './ShipmentItem';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shipments')
class Shipment {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  shipmentNumber: string;

  @Column()
  tracking: string;

  @Column()
  orderId: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @OneToMany(() => ShipmentItem, shipemntItem => shipemntItem.shipment, {
    eager: true,
  })
  shipmentItems: ShipmentItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Shipment;
