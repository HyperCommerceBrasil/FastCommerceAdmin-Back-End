import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Customer from './Customer';

@Entity('adresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Customer, customer => customer.adresses)
  customer: Customer;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Address;
