import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Product from '@modules/Product/infra/typeorm/entities/Product';

@Entity('product_images')
class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
  id: string;

  @Column()
  image: string;

  @ManyToOne(() => Product, product => product.images)
  product: Product;

  @Column()
  productId: string;

  @Column()
  key: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductImage;
