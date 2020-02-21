import React from 'react';
import Select, { components, Styles } from 'react-select';
import { NextPage } from 'next';

type OptionType = {
  label: string;
  value: string;
};

/**
 * コンボボックスのデザイン指定
 */
const customStyles: Styles = {
  control: styles => ({
    ...styles,
    width: '100%',
    height: '48px',
    color: '#525252',
    borderRadius: '4px',
    fontSize: '16px',
    fontStyle: 'normal',
    fontFamily: 'Noto Sans JP',
    lineHeight: '180%',
    background: '#fafafa',
    letterSpacing: '0.06em',
    border: '1px solid #ebebeb',
    margin: '6px auto 16px auto',
  }),
};

/**
 * ドロップダウンのコンポーネント指定
 *
 * @param {any} props ドロップダウンインジケータの情報
 * @returns {*} ドロップダウンコンポーネント
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <div
        style={{
          borderTop: '5px solid #525252',
          borderRight: '5px solid transparent',
          borderLeft: '5px solid transparent',
        }}
      />
    </components.DropdownIndicator>
  );
};

/**
 * セパレータのコンポーネント指定
 * セパレータは非表示にしたいので、空のdivを返す
 *
 * @returns {*} セパレータコンポーネント
 */
const IndicatorSeparator = () => {
  return <div />;
};

/**
 * react-selectの単一選択ドロップダウンメニュー用インターフェース
 *
 * @interface SingleSelectionProps
 */
interface SingleSelectionProps {
  options: OptionType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
}

/**
 * react-selectを利用した単一選択ドロップダウンメニューの共通コンポーネント
 *
 * @param {SingleSelectionProps} props {
 *     label
 *     value
 * }
 * @returns {*} Reactコンポーネント
 */
const SingleSelectComponent: NextPage<SingleSelectionProps> = props => {
  return (
    <Select
      styles={customStyles}
      components={{ DropdownIndicator, IndicatorSeparator }}
      isClearable
      options={props.options}
      onChange={props.onChange}
    />
  );
};

export default SingleSelectComponent;
