import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AddInsurancesButton } from '@src/components/addInsurancesbutton';
import { StyledButton } from '@src/styles';

storiesOf('Button props', module).add('New Insurances Add', () => (
  <AddInsurancesButton important onClick={action('新しい保険を追加する')}>
    新しい保険を追加する
  </AddInsurancesButton>
));

storiesOf('Button props', module).add('Save', () => (
  <StyledButton important smallSize width='62px' onClick={action('保存')}>
    保存
  </StyledButton>
));

storiesOf('Button props', module).add('Signin', () => (
  <div style={{ marginTop: '32px' }}>
    <StyledButton important noShadow width='100%'>
      サインイン
    </StyledButton>
  </div>
));
