import * as React from "react";
import { NextPage } from "next";
import Router from "next/router";
import { StyledButton } from "../styles/button";
import { NenchoListItem } from "../components/nenchoList";
import { NenchoHeader } from "../components/nenchoHeader";
import * as listCommon from "../styles/listCommon";

const Nencho: NextPage = () => {
  const statusNum: { [key: string]: number } = {
    EMPTY: 0,
    FINISHED: 1,
    TBC: 2
  };

  // FIXME: 実データに入れ替えてください。
  const nenchoList = [
    { id: "uuid1", title: "本人情報", status: statusNum.FINISHED },
    { id: "uuid2", title: "配偶者情報", status: statusNum.FINISHED },
    { id: "uuid3", title: "家族情報", status: statusNum.FINISHED },
    { id: "uuid4", title: "保険料控除", status: statusNum.EMPTY },
    { id: "uuid5", title: "住宅ローン控除", status: statusNum.TBC }
  ];

  return (
    <>
      <NenchoHeader />
      <listCommon.StyledListBody>
        <div className="page-background">
          <listCommon.StyledListNencho>
            {nenchoList.map(nencho => (
              <div
                key={nencho.id}
                onClick={() => Router.push("/nencho/insurances")}
                role="button"
              >
                <NenchoListItem title={nencho.title} status={nencho.status} />
              </div>
            ))}
          </listCommon.StyledListNencho>
        </div>
        <footer className="page-footer">
          <div className="submission-button">
            <StyledButton important onClick={() => Router.push("/tasks")}>
              提出する
            </StyledButton>
          </div>
          <style jsx>
            {`
              .submission-button {
                position: fixed;
                right: 16px;
                left: 16px;
                bottom: 16px;
                text-align: center;
                padding: 93px 0px 16px 0px;
                background: #ffffff;
                border-radius: 0px 0px 8px 8px;
                width: (97% - 37.984px);
                //height: 93px;
              }
              .page-footer {
              }
            `}
          </style>
        </footer>
      </listCommon.StyledListBody>
    </>
  );
};

export default Nencho;
