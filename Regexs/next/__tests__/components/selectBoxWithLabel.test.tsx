/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { SelectBoxWithLabel, SelectBoxWithLabelBoxProps } from '@src/components/selectBoxWithLabel';
import { StyledLabel, StyledErrorText } from '@src/styles';
import { StyledErrorSVG } from '@src/styles/svg';
import { SelectBoxSingle } from '@src/components/selectBoxSingle';
import { OptionType } from '@src/interfaces/lifeInsuranceInputs';

const handleChange: (value: any) => void = jest.fn();

const categoryOptions: OptionType[] = [
  { key: 'category', label: '一般の生命保険：新制度', value: 'insurance_0001' },
  { key: 'category', label: '一般の生命保険：旧制度', value: 'insurance_0002' },
  { key: 'category', label: '介護医療保険：新制度', value: 'insurance_0003' },
  { key: 'category', label: '個人年金保険：新制度', value: 'insurance_0004' },
  { key: 'category', label: '個人年金保険：旧制度', value: 'insurance_0005' },
];

const propsDefault: SelectBoxWithLabelBoxProps = {
  label: 'labelData',
  name: 'nameData',
  placeholder: 'placeholderData',
  options: categoryOptions,
  value: 'valueData',
  onChange: handleChange,
  errorMessage: 'errerMessageData',
  isError: true,
};

const propsBlank: SelectBoxWithLabelBoxProps = {
  label: '',
  name: '',
  placeholder: '',
  options: categoryOptions,
  value: '',
  onChange: handleChange,
  errorMessage: '',
  isError: false,
};

describe('snapshot', () => {
  test('default', () => {
    const snapshot = renderer.create(<SelectBoxWithLabel {...propsDefault} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

describe('StyledLabel タイトルラベル', () => {
  test('初期表示', () => {
    const nextPage = shallow(<SelectBoxWithLabel {...propsDefault} />);
    const target = nextPage.find(StyledLabel).find('#titleLabel');
    expect(target.length).toBe(1);

    expect(target.text()).toMatch('labelData');
  });
});

describe('SelectBoxSingle セレクトボックス', () => {
  test('初期表示', () => {
    const nextPage = shallow(<SelectBoxWithLabel {...propsDefault} />);
    const target = nextPage.find(SelectBoxSingle).find('#selectBoxSingle');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('labelData');
    expect(target.prop('name')).toMatch('nameData');
    expect(target.prop('placeholder')).toMatch('placeholderData');
    expect(target.prop('options')).toEqual(categoryOptions);
    expect(target.prop('value')).toMatch('valueData');
    expect(target.prop('onChange')).toEqual(handleChange);
    expect(target.prop('errorMessage')).toMatch('errerMessageData');
    expect(target.prop('isError')).toBeTruthy();
  });
});

describe('StyledErrorSVG エラーアイコン', () => {
  test('初期表示：isError=true', () => {
    const nextPage = shallow(<SelectBoxWithLabel {...propsDefault} />);
    const target = nextPage.find(StyledErrorSVG).find('#errorIcon');
    expect(target.length).toBe(1);
  });
  test('初期表示：isError=false', () => {
    const nextPage = shallow(<SelectBoxWithLabel {...propsBlank} />);
    const target = nextPage.find(StyledErrorSVG).find('#errorIcon');
    expect(target.length).toBe(0);
  });
});

describe('StyledErrorText エラーテキスト', () => {
  test('初期表示：isError=true', () => {
    const nextPage = shallow(<SelectBoxWithLabel {...propsDefault} />);
    const target = nextPage.find(StyledErrorText).find('#errorText');
    expect(target.length).toBe(1);

    expect(target.text()).toMatch('errerMessageData');
  });
  test('初期表示：isError=false', () => {
    const nextPage = shallow(<SelectBoxWithLabel {...propsBlank} />);
    const target = nextPage.find(StyledErrorText).find('#errorText');
    expect(target.length).toBe(0);
  });
});
