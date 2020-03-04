import React from "react";
import { StyledTitle } from "../styles/label";

export const NenchoHeader: React.FC = () => {
  return (
    <>
      <header className="page-header">
        <StyledTitle>
          <div className="page-title">2020年分年末調整</div>
        </StyledTitle>
        <style jsx>
          {`
            .page-header {
              background: #edf4fa;
              position: fixed;
              width: 100%;
              height: 72px;
              margin: 0;
              z-index: 1;
            }
            .page-title {
              position: absolute;
              top: 16px;
              right: 16px;
              left: 16px;
              padding-top: 20px;
              padding-bottom: 12px;
              width: (97% - 37.984px);
              border-radius: 8px 8px 0px 0px;
              background: #ffffff;
              // height: 93px;
            }
          `}
        </style>
      </header>
      <div style={{ width: "100%", height: "72px" }} />
    </>
  );
};

export default NenchoHeader;
