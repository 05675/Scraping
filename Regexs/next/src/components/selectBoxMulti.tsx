import React, { useState } from 'react';
import Select from 'react-select';

type OptionType = {
  key: string;
  label: string;
  value: string | boolean;
};

/**
 * react-selectの複数選択ドロップダウンメニュー用インターフェース
 *
 * @interface SelectBoxMultiProps
 */
interface SelectBoxMultiProps {
  options: OptionType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  value: OptionType[];
}

/**
 * react-selectを利用した複数選択ドロップダウンメニューの共通コンポーネント
 *
 * @param {SelectBoxMultiProps} props {
 *     options
 *     onChange
 *     value
 * }
 * @returns {*} Reactコンポーネント
 */
export const SelectBoxMulti: React.FC<SelectBoxMultiProps> = props => {
  const [inpuVal, setInpuVal] = useState('');

  const onInputChange = (inputValue: string): void => {
    setInpuVal(inputValue);
  };

  return (
    <Select
      options={props.options}
      inputValue={inpuVal}
      isMulti
      onChange={props.onChange}
      onInputChange={onInputChange}
      value={props.value}
    />
  );
};
