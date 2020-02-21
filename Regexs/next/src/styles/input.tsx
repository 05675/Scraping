import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 1rem;
  color: #525252;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  font-family: Noto Sans JP;
  line-height: 180%;
  background: #fafafa;
  letter-spacing: 0.06em;
  border: 1px solid #ebebeb;

  :focus {
    outline: none;
    background: #ffffff;
    border: 1px solid #0f84ec;
  }

  :disabled {
    background: #dedede;
    color: #b3b3b3;
  }
`;

export default StyledInput;
