import React from 'react';
import Select, { components, Styles } from 'react-select';
import { StyledArrowDownSVG } from '@src/styles/svg';

/**
 * コンボボックスのデザイン指定
 */
const customStyles: Styles = {
  control: (styles, state) => ({
    ...styles,
    width: '100%',
    height: '48px',
    color: '#525252',
    background: 'rgba(1,1,1,0)',
    borderRadius: '0px',
    fontSize: '16px',
    fontStyle: 'normal',
    lineHeight: '180%',
    letterSpacing: '0.06em',
    border: 'none',
    borderBottom: '1px solid',
    borderBottomColor: (() => {
      if (state.selectProps.isError) {
        return '#fa3939';
      }
      if (state.isFocused) {
        return '#3aa0fa';
      }
      return '#ebebeb';
    })(),
    boxShadow: (() => {
      if (state.selectProps.isError && state.isFocused) {
        return '0px 1px 0px #fa3939';
      }
      if (state.isFocused) {
        return '0px 1px 0px #3aa0fa';
      }
      return 'none';
    })(),
  }),

  option: (styles, state) => ({
    ...styles,
    color: '#525252',
    backgroundColor: state.isSelected ? '#ffffff' : '#ffffff',
  }),

  indicatorSeparator: () => ({}),

  valueContainer: styles => ({
    ...styles,
    padding: '0',
  }),

  singleValue: styles => ({
    ...styles,
    margin: '0',
  }),
};

/**
 * ドロップダウンのコンポーネント指定
 *
 * @param {any} props ドロップダウンインジケータの情報
 * @returns {*} ドロップダウンコンポーネント
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator: React.FC<any> = props => {
  return (
    <>
      <div style={{ marginRight: props.selectProps.isError ? '40px' : '0' }}>
        <components.DropdownIndicator {...props}>
          <StyledArrowDownSVG color='#949494' width='12px' height='12px' />
        </components.DropdownIndicator>
      </div>
    </>
  );
};

type OptionType = {
  key: string;
  label: string;
  value: string | boolean;
};
/**
 * react-selectの単一選択ドロップダウンメニュー用インターフェース
 *
 * @interface SelectBoxSingleProps
 */
export interface SelectBoxSingleProps {
  id?: string;
  placeholder?: string;
  options: OptionType[];
  value: OptionType['value'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  isError?: boolean;
}

/**
 * react-selectを利用した単一選択ドロップダウンメニューの共通コンポーネント
 *
 * @param {SelectBoxSingleProps} props {
 *     placeholder
 *     value
 *     options
 *     onChange
 * }
 * @returns {*} Reactコンポーネント
 */
export const SelectBoxSingle: React.FC<SelectBoxSingleProps> = ({
  placeholder,
  options,
  value,
  ...props
}) => {
  return (
    <Select
      isSearchable={false}
      styles={customStyles}
      components={{ DropdownIndicator }}
      placeholder={placeholder || '選択してください'}
      value={options?.filter(option => option.value === value)}
      options={options}
      isError={props.isError}
      {...props}
    />
  );
};
