import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'Welcome',
  component: Welcome,
};

storiesOf('Welcome Page', module);

export const ToStorybook = () => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
  name: 'to Storybook',
};
