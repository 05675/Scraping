import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('nencho_2020')
export default class Nencho {
  @PrimaryColumn({ name: 'task_id', type: 'varchar', length: 36 })
  id!: string;

  @Column({ name: 'nencho_insurance_status', type: 'tinyint' })
  nenchoInsuranceStatus!: NenchoInsuranceStatus;
}

export enum NenchoInsuranceStatus {
  NOT_COMPLETED,
  COMPLETED,
  NOT_SUBMITTED,
}
