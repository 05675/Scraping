import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export default class Employees {
  @PrimaryColumn({ name: 'emp_id', type: 'varchar', length: '20', nullable: false })
  empId!: string;

  @Column({ name: 'emp_name', type: 'varchar', length: '30', nullable: false })
  empName!: string;

  @Column({ name: 'emp_password', type: 'varchar', length: '30', nullable: false })
  empPassword!: string;

  @Column({ name: 'group_id', type: 'int', nullable: false })
  groupId!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: string;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt!: string;
}
