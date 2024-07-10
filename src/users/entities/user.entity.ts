import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  roles: string; 

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // Salt factor of 10
  }
}