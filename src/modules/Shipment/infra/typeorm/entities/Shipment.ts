import Order from '@modules/Order/infra/typeorm/entities/Order';
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Shipment;
