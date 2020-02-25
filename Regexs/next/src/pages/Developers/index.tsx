import * as React from 'react';
import { NextPage } from 'next';
import { withAuthSync } from '@src/util/auth';

const linkList: string[] = [
  '/login',
  '/tasks',
  '/nencho/index',
  '/nencho/insurances',
  '/nencho/insuranceTypes',
  '/nencho/lifeInsuranceInputs',
  '/Developers/createTask',
  '/Developers/demoTask',
];

const devIndex: NextPage = () => {
  return (
    <div>
      <ul className='list-style'>
        {linkList.map(link => {
          return (
            <div key={link}>
              <li className='listItem-style'>
                <a href={link} className='Anchor-style'>
                  {link}
                </a>
              </li>
            </div>
          );
        })}
      </ul>
      <style jsx>
        {`
          .list-style {
            margin: 0;
            padding: 0;
            position: relative;
          }
          .listItem-style {
            color: black;
            border-left: solid 8px orange;
            background: whitesmoke;
            margin-bottom: 5px;
            line-height: 1.5;
            border-radius: 0 15px 15px 0;
            padding: 0.5em;
            list-style-type: none !important;
          }
          .anchor-style {
            display: block;
            padding: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default withAuthSync(devIndex);
