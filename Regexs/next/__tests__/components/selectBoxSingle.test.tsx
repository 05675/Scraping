import React from 'react';
import renderer from 'react-test-renderer';
import { SelectBoxSingle } from '@src/components/selectBoxSingle';
import { OptionType } from '@src/interfaces/lifeInsuranceInputs';

describe('SelectBoxSingle', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange: (value: any) => void = jest.fn();
  const option: OptionType[] = [];

  test('snapshot isError', () => {
    const snapshot = renderer
      .create(
        <SelectBoxSingle
          placeholder='label'
          options={option}
          value='value'
          onChange={handleChange}
          isError
        />
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  test('snapshot isNotError', () => {
    const snapshot = renderer
      .create(
        <SelectBoxSingle
          placeholder='label'
          options={option}
          value='value'
          onChange={handleChange}
          isError={false}
        />
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
