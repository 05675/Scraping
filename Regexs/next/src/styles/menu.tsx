import styled from 'styled-components';

interface StyledMenuProps {
  open?: boolean;
}

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  opacity: ${(props: StyledMenuProps) => (props.open ? '1' : '0')};
  pointer-events: ${(props: StyledMenuProps) => (props.open ? 'auto' : 'none')};
  height: 100%;
  text-align: center;
  position: fixed;
  top: 48px;
  right: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
  width: 100%;
  background: #fafafa;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  align-items: center;

  a {
    font-size: 16px;
    font-family: Noto Sans JP, sans-serif;
    font-style: normal;
    font-weight: normal;
    color: #ed463e;
    text-decoration: none;
    letter-spacing: 0.06em;
    transition: color 0.3s linear;
    border-bottom: 1px solid #ebebeb;
    padding: 11px 0;
    width: 95%;

    &:hover {
      color: #343078;
    }
  }
`;
