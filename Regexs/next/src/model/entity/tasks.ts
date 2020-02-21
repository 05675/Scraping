import { Entity, Column, CreateDateColumn, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export default class Tasks {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: '36', nullable: false })
  @Generated('uuid')
  id!: string;

  @Column({ name: 'title', type: 'varchar', length: '45', nullable: false })
  title!: string;

  @Column({ name: 'summary', type: 'varchar', nullable: true })
  summary?: string;

  @Column({ name: 'explanation', type: 'varchar', nullable: true })
  explanation?: string;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate?: string;

  @Column({ name: 'emp_id', type: 'varchar', nullable: false })
  empId!: string;

  @Column({ name: 'status', type: 'int', nullable: false })
  status!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: string;
}
