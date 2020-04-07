import { InsuranceCategories } from '@src/model/entity';
import { ErrorInfo } from '@src/interfaces/errorInfo';
import { InputProps } from '@src/styles';

export interface NenchoInsuranceLifeInput2020 {
  id?: number;
  nenchoId: string;
  category: InsuranceCategories;
  firmName: string;
  categoryDetail: string;
  period: string;
  contractorName: string;
  receiverName: string;
  relation: string;
  payment: string;
}

type ValidateFormProps = {
  isError: boolean;
  errorMessage: string;
};

export interface NenchoInsuranceLifeInput2020Validate {
  category: ValidateFormProps;
  firmName: ValidateFormProps;
  categoryDetail: ValidateFormProps;
  period: ValidateFormProps;
  contractorName: ValidateFormProps;
  receiverName: ValidateFormProps;
  relation: ValidateFormProps;
  payment: ValidateFormProps;
}

export interface OptionType {
  key: string;
  label: string;
  value: string | boolean;
}

export interface InputWithLabelProps extends InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export interface SelectBoxProps {
  label: string;
  options: OptionType[];
  value: OptionType['value'];
  onChange: (selectedOption: OptionType) => void;
}

export interface LifeInsuranceInputsProps {
  isUpdatePage: boolean;
  nenchoId: string | string[];
  lifeInsuranceData?: NenchoInsuranceLifeInput2020;
  token?: string;
  errorInfo?: ErrorInfo;
}
