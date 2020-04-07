import styled from 'styled-components';

interface StyledBurgerProps {
  open?: boolean;
}

export const StyledBurger = styled.button`
  position: absolute;
  top: 50%;
  margin-top: -9px;
  right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 1.2rem;
    height: 0.13rem;
    background: #ffffff;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${(props: StyledBurgerProps) => (props.open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${(props: StyledBurgerProps) => (props.open ? '0' : '1')};
      transform: ${(props: StyledBurgerProps) =>
        props.open ? 'translateX(15px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${(props: StyledBurgerProps) => (props.open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;
