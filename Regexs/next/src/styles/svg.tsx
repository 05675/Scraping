import styled, { css } from 'styled-components';
import { LogoSVG } from '../../assets/images';

interface LogoProps {
  readonly width?: string;
  readonly height?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BaseLogoSvg = (logo: any) => styled(logo)<LogoProps>`
  ${props =>
    css`
      svg {
        width: ${props.width || '100%'};
        height: ${props.height || '100%'};
      }
    `}
`;

export const StyledLogoSvg = BaseLogoSvg(LogoSVG);
