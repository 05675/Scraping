import React from 'react';
import { MessageBox, MessageBoxText } from '@src/components/messageBox';
import { shallow } from 'enzyme';

describe('MessageBox', () => {
  it('can render MessageBox', () => {
    const messageBox = shallow(<MessageBox />);
    expect(messageBox).toMatchSnapshot();
  });

  it('can receive text as children of props', () => {
    const messageBox = shallow(<MessageBox>dummy text</MessageBox>);
    const messageBoxText = messageBox.find(MessageBoxText);
    expect(messageBoxText.childAt(0).text()).toBe('dummy text');
  });
});
