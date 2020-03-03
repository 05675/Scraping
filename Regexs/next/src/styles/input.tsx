import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 1rem;
  color: #525252;
  box-sizing: border-box;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  font-family: Noto Sans JP, sans-serif;
  line-height: 180%;
  background: rgba(0, 0, 0, 0);
  letter-spacing: 0.06em;
  border: none;
  border-bottom: 1px solid #ebebeb;

  :focus {
    outline: none;
  }

  :disabled {
    color: #b3b3b3;
  }
`;
