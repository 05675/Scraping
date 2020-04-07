/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { InputYenWithLabel } from '@src/components/inputYenWithLabel';
import { InputWithLabelProps } from '@src/interfaces/lifeInsuranceInputs';
import { StyledLabel, StyledErrorText, StyledInput } from '@src/styles';
import { StyledErrorSVG } from '@src/styles/svg';

const handleChange: (value: any) => void = jest.fn();

const propsDefault: InputWithLabelProps = {
  label: 'labelData',
  name: 'nameData',
  value: 'valueData',
  onChange: handleChange,
  errorMessage: 'errerMessageData',
  type: 'typeData',
  maxLength: 1234,
  isError: true,
  isPaddingRight: true,
};

const propsBlank: InputWithLabelProps = {
  label: '',
  name: '',
  value: '',
  onChange: handleChange,
  errorMessage: '',
  isError: false,
  isPaddingRight: false,
};

describe('snapshot', () => {
  test('default', () => {
    const snapshot = renderer.create(<InputYenWithLabel {...propsDefault} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

describe('StyledLabel タイトルラベル', () => {
  test('初期表示', () => {
    const nextPage = shallow(<InputYenWithLabel {...propsDefault} />);
    const target = nextPage.find(StyledLabel).find('#titleLabel');
    expect(target.length).toBe(1);

    expect(target.text()).toMatch('labelData');
  });
});

describe('StyledInput インプット', () => {
  test('初期表示', () => {
    const nextPage = shallow(<InputYenWithLabel {...propsDefault} />);
    const target = nextPage.find(StyledInput).find('#inputField');
    expect(target.length).toBe(1);

    expect(target.prop('label')).toMatch('labelData');
    expect(target.prop('name')).toMatch('nameData');
    expect(target.prop('value')).toMatch('valueData');
    expect(target.prop('onChange')).toEqual(handleChange);
    expect(target.prop('errorMessage')).toMatch('errerMessageData');
    expect(target.prop('type')).toMatch('typeData');
    expect(target.prop('maxLength')).toBe(1234);
    expect(target.prop('isError')).toBeTruthy();
    expect(target.prop('isPaddingRight')).toBeTruthy();
  });
});

describe('StyledLabel 円ラベル', () => {
  test('初期表示', () => {
    const nextPage = shallow(<InputYenWithLabel {...propsDefault} />);
    const target = nextPage.find(StyledLabel).find('#yenLabel');
    expect(target.length).toBe(1);

    expect(target.text()).toMatch('円');
  });
});

describe('StyledErrorSVG エラーアイコン', () => {
  test('初期表示：isError=true', () => {
    const nextPage = shallow(<InputYenWithLabel {...propsDefault} />);
    const target = nextPage.find(StyledErrorSVG).find('#errorIcon');
    expect(target.length).toBe(1);
  });
  test('初期表示：isError=false', () => {
    const nextPage = shallow(<InputYenWithLabel {...propsBlank} />);
    const target = nextPage.find(StyledErrorSVG).find('#errorIcon');
    expect(target.length).toBe(0);
  });
});

describe('StyledErrorText エラーテキスト', () => {
  test('初期表示：isError=true', () => {
    const nextPage = shallow(<InputYenWithLabel {...propsDefault} />);
    const target = nextPage.find(StyledErrorText).find('#errorText');
    expect(target.length).toBe(1);

    expect(target.text()).toMatch('errerMessageData');
  });
  test('初期表示：isError=false', () => {
    const nextPage = shallow(<InputYenWithLabel {...propsBlank} />);
    const target = nextPage.find(StyledErrorText).find('#errorText');
    expect(target.length).toBe(0);
  });
});
