import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import InsuranceCategories from '@src/model/entity/nencho/insuranceCategories';

@Entity('nencho_insurance_life_input_2020')
export default class NenchoInsuranceLifeInput2020 {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id?: number;

  @Column({ name: 'nencho_id', type: 'varchar', length: 36 })
  nenchoId!: string;

  @OneToOne(
    () => InsuranceCategories,
    insuranceCategory => insuranceCategory.id
  )
  @JoinColumn({ name: 'category' })
  category?: InsuranceCategories;

  @Column({ name: 'firm_name', type: 'varchar', length: 36 })
  firmName?: string;

  @Column({ name: 'category_detail', type: 'varchar', length: 36 })
  categoryDetail?: string;

  @Column({ name: 'period', type: 'varchar', length: 36 })
  period?: string;

  @Column({ name: 'contractor_name', type: 'varchar', length: 36 })
  contractorName?: string;

  @Column({ name: 'receiver_name', type: 'varchar', length: 36 })
  receiverName?: string;

  @Column({ name: 'relation', type: 'varchar', length: 6 })
  relation?: string;

  @Column({ name: 'payment', type: 'int', unsigned: true })
  payment?: number;
}
