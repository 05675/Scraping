import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Groups {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: '45', nullable: false })
  name!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: string;
}
