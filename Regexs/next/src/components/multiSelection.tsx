import React, { useState } from 'react';
import Select from 'react-select';

type OptionType = {
  label: string;
  value: string;
};

/**
 * react-selectの複数選択ドロップダウンメニュー用インターフェース
 *
 * @interface MultiSelectionProps
 */
interface MultiSelectionProps {
  options: OptionType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  value: OptionType[];
}

/**
 * react-selectを利用した複数選択ドロップダウンメニューの共通コンポーネント
 *
 * @param {MultiSelectionProps} props {
 *     options
 *     onChange
 *     value
 * }
 * @returns {*} Reactコンポーネント
 */
export const MultiSelectComponent: React.FC<MultiSelectionProps> = props => {
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
