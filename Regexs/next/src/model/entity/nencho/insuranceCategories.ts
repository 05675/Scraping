import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class InsuranceCategories {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 14 })
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: 36 })
  name!: string;
}
