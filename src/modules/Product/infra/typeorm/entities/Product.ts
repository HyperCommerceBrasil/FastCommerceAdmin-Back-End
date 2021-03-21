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

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  trending: boolean;

  @OneToOne(() => Collection, {eager: true})
  @JoinColumn()
  collection: Collection;

  @OneToMany(() => ProductImage, images => images.product, {
    eager: true,
  })
  images: ProductImage[];

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
