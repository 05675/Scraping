import styled from 'styled-components';

interface StyledBurgerProps {
  open?: boolean;
}

export const StyledBurger = styled.button`
  position: absolute;
  top: 12px;
  right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 1.5rem;
    height: 0.25rem;
    background: #797979;
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
