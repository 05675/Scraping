import * as React from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import { login } from '@src/util/auth';
import { StyledButton, StyledLabel, StyledInput } from '@src/styles';
import { withPreventDefault } from '@src/util/withPreventDefault';
import { LogoWhiteSVG } from '@assets/images';
import { PasswordInput } from '@src/components/passwordInput';

interface Credential {
  empId: string;
  empPassword: string;
}

const Login: NextPage = () => {
  const [credential, setCredential] = React.useState<Credential>({ empId: '', empPassword: '' });

  // TODO: Lintのルール見直しが必要
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit = withPreventDefault(async () => {
    try {
      const token = (await axios.post('/api/token', credential)).data;
      login(token);
    } catch (error) {
      // TODO: error種類ごとにerror messageを出す。
      console.error(error.message);
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredential({ ...credential, [name]: value });
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
        <LogoWhiteSVG />
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
        {/* id */}
        <div>
          <StyledLabel>弥生ID または メールアドレス</StyledLabel>
          <StyledInput
            style={{ margin: '6px auto 24px auto' }}
            name='empId'
            type='text'
            onChange={handleChange}
            placeholder='テキスト'
          />
        </div>

        {/* password */}
        <div>
          <StyledLabel>パスワード</StyledLabel>
          <div style={{ margin: '6px auto 24px auto' }}>
            <PasswordInput name='empPassword' onChange={handleChange} placeholder='テキスト' />
          </div>
        </div>

        {/* button */}
        <div style={{ marginTop: '32px' }}>
          <StyledButton important width='100%'>
            サインイン
          </StyledButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
