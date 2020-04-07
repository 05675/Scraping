import styled, { css } from 'styled-components';
import * as svgs from '@assets/images';

interface StyledSVGProps {
  readonly color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const doStyleSVG = (svg: any) => styled(svg)<StyledSVGProps>`
  ${props =>
    css`
      path {
        fill: ${props.color || '#949494'};
      }
    `}
`;

const {
  ArrowDownSVG,
  ArrowLeftSVG,
  CheckBadgeSVG,
  CheckSVG,
  CloseSVG,
  ErrorSVG,
  EyeOffSVG,
  EyeSVG,
  LockSVG,
  LogoWhiteSVG,
  LogoSVG,
  MenuSVG,
  NotificationsSVG,
  VectorSVG,
  PlusSVG,
} = svgs;

export const StyledArrowDownSVG = doStyleSVG(ArrowDownSVG);
export const StyledArrowLeftSVG = doStyleSVG(ArrowLeftSVG);
export const StyledCheckBadgeSVG = doStyleSVG(CheckBadgeSVG);
export const StyledCheckSVG = doStyleSVG(CheckSVG);
export const StyledCloseSVG = doStyleSVG(CloseSVG);
export const StyledErrorSVG = doStyleSVG(ErrorSVG);
export const StyledEyeOffSVG = doStyleSVG(EyeOffSVG);
export const StyledEyeSVG = doStyleSVG(EyeSVG);
export const StyledLockSVG = doStyleSVG(LockSVG);
export const StyledLogoWhiteSVG = doStyleSVG(LogoWhiteSVG);
export const StyledLogoSVG = doStyleSVG(LogoSVG);
export const StyledMenuSVG = doStyleSVG(MenuSVG);
export const StyledNotificationsSVG = doStyleSVG(NotificationsSVG);
export const StyledVectorSVG = doStyleSVG(VectorSVG);
export const StyledPlusSVG = doStyleSVG(PlusSVG);
