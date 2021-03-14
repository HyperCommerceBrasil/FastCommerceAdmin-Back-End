import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('users')
  class User {
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn()
    id: string;
  
    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default User;
  