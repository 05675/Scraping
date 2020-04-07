import styled from 'styled-components';

interface StyledMenuProps {
  open?: boolean;
}

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  height: ${(props: StyledMenuProps) => (props.open ? 'calc(100vh - 49px)' : '0%')};
  pointer-events: ${(props: StyledMenuProps) => (props.open ? 'auto' : 'none')};
  text-align: center;
  position: fixed;
  top: 48px;
  right: 0;
  transition: height 0.3s cubic-bezier(0, 0.01, 0, 1);
  z-index: 1;
  width: 100%;
  background: #005bac;
  border-top: 1px solid #006ac7;
  align-items: center;

  a {
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    line-height: 100%;
    opacity: ${(props: StyledMenuProps) => (props.open ? '1' : '0')};
    color: #ffffff;
    text-decoration: none;
    letter-spacing: 0.06em;
    transition: opacity 0.1s linear 0.06s;
    border-bottom: 1px solid #006ac7;
    padding: 32px 0 15px;
    width: calc(100% - 32px);

    &:hover {
      color: #ffffff;
    }
  }
`;
