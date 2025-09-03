import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'noticias' })
export class Noticia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column('varchar')
  imagenUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  fechaPublicacion: Date;
}