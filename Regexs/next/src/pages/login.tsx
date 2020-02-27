import * as React from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import { login } from '@src/util/auth';
import { StyledButton, StyledLabel, StyledInput } from '@src/styles';
import { withPreventDefault } from '@src/util/withPreventDefault';
import { LogoSVG } from '@assets/images';
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
    <div style={{ margin: '0px 16px' }}>
      {/* header */}
      <header style={{ textAlign: 'center', margin: '80px 0px' }}>
        <LogoSVG />
      </header>

      {/* form */}
      <form onSubmit={handleSubmit}>
        {/* id */}
        <div>
          <StyledLabel>弥生ID または メールアドレス</StyledLabel>
          <StyledInput
            style={{ margin: '6px auto 24px auto' }}
            name='empId'
            type='text'
            onChange={handleChange}
          />
        </div>

        {/* password */}
        <div>
          <StyledLabel>パスワード</StyledLabel>
          <div style={{ margin: '6px auto 24px auto' }}>
            <PasswordInput name='empPassword' onChange={handleChange} />
          </div>
        </div>

        {/* button */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <StyledButton important>サインイン</StyledButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
