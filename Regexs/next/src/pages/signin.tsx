import * as React from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import { signin } from '@src/util/auth';
import { StyledButton, StyledLabel, StyledInput } from '@src/styles';
import { withPreventDefault } from '@src/util/withPreventDefault';
import { StyledLogoWhiteSVG } from '@src/styles/svg';
import { PasswordInput } from '@src/components/passwordInput';
import { Error } from '@src/components/error';
import { msg } from '@src/util/constantMsg';
import { PageInfo } from '@src/interfaces/pageInfo';

interface Credential {
  empId: string;
  empPassword: string;
}

const Signin: NextPage = () => {
  const [errorMessage, setErrorMessage] = React.useState('');

  const validateForm = (credential: Credential) => {
    let isValid = true;
    if (!credential.empId) {
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = withPreventDefault(async (event: React.FormEvent<HTMLFormElement>) => {
    const credential: Credential = {
      empId: event.currentTarget.empId.value,
      empPassword: event.currentTarget.empPassword.value,
    };
    if (!validateForm(credential)) {
      setErrorMessage(msg.ENTER_ID_OR_EMAIL);
      return;
    }
    try {
      const token = (await axios.post('/api/token', credential)).data;
      signin(token);
    } catch (error) {
      const { message } = error.response.data;
      setErrorMessage(message ?? msg.WRONG_EMAIL_OR_PASSWORD);
    }
  });

  const handleChange = () => {
    setErrorMessage('');
  };

  return (
    <div style={{ margin: '0px' }}>
      {/* header */}
      <header
        style={{
          textAlign: 'center',
          backgroundColor: '#005BAC',
          height: '148px',
          paddingTop: '44px',
        }}>
        <StyledLogoWhiteSVG color='white' />
      </header>

      {/* form */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#FFFFFF',
          margin: '0 auto',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          position: 'absolute',
          top: '128px',
          left: '4.27%',
          right: '4.27%',
          padding: '16px',
          zIndex: 200,
        }}>
        {/* error */}
        {errorMessage && <Error message={errorMessage} />}

        {/* id */}
        <div>
          <StyledLabel>弥生ID または メールアドレス</StyledLabel>
          <div style={{ margin: '6px auto 32px auto' }}>
            <StyledInput name='empId' type='text' onChange={handleChange} />
          </div>
        </div>

        {/* password */}
        <div>
          <StyledLabel>パスワード</StyledLabel>
          <div style={{ margin: '6px auto 32px auto' }}>
            <PasswordInput name='empPassword' onChange={handleChange} />
          </div>
        </div>

        {/* button */}
        <div style={{ marginTop: '32px' }}>
          <StyledButton important noShadow width='100%'>
            サインイン
          </StyledButton>
        </div>
      </form>
    </div>
  );
};

Signin.getInitialProps = () => {
  const pageInfo: PageInfo = { currentPageName: 'サインイン' };

  return { pageInfo };
};

export default Signin;
