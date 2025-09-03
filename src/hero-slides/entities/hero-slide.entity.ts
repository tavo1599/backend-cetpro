import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hero_slides' })
export class HeroSlide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  imagenUrl: string; // La imagen es obligatoria

  @Column('varchar', { nullable: true })
  titulo: string; // El resto de campos son opcionales

  @Column('varchar', { nullable: true })
  subtitulo: string;

  @Column('varchar', { nullable: true })
  textoBoton: string;

  @Column('varchar', { nullable: true })
  enlaceBoton: string;

  @Column('int', { default: 0 })
  orden: number; // Para ordenar los slides
}