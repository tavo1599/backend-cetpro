import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' }) // <-- Asegúrate de que @Entity() esté aquí
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}