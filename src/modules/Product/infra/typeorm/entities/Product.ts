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

import Collection from '@modules/Collection/infra/typeorm/entities/Collection';
import ProductImage from './ProductImage';
import Supplier from '@modules/Supplier/infra/typeorm/entities/Supplier';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  @Column()
  price: number;

  @Column()
  supplierId: string;

  @OneToOne(() => Supplier)
  @JoinColumn()
  supplier: Supplier;

  @Column()
  trending: boolean;

  @OneToOne(() => Collection, { eager: true })
  @JoinColumn()
  collection: Collection;

  @OneToMany(() => ProductImage, images => images.product, {
    eager: true,
    cascade: true,
  })
  images: ProductImage[];

  @Column()
  ean: string;

  @Column()
  description: string;

  @Column()
  price_promotional: string;

  @Column()
  details: string;

  @Column()
  quantity: number;

  @Column()
  isFreeShipping: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
