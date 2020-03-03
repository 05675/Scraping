import React, { useState } from 'react';
import { NextPage } from 'next';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { withAuthSync } from '@src/util/auth';

const DemoTask: NextPage = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      task: { title, dueDate },
    };

    try {
      const res = await axios.post('/api/demo', data);
      // eslint-disable-next-line no-console
      console.log(`registation success.(${res.status})`);
      // eslint-disable-next-line no-alert
      alert(`登録完了しました`);
    } catch (error) {
      console.error(`registation failed.(${error.response.data.message})`);
    }
  };

  return (
    <>
      <form action='' onSubmit={handleSubmit}>
        <div className='task-area'>
          <div>
            <h3 className=''>タスク入力(全従業員)</h3>
          </div>
          <article className='box is-rounded'>
            <div className='field'>
              <label className='label'>件名</label>
              <input
                className='input'
                name='title'
                placeholder='件名を入力してください'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className='field'>
              <label className='label'>期日</label>
              <DatePicker
                className='input'
                selected={dueDate}
                onChange={date => setDueDate(date)}
                placeholderText='Select a date'
              />
            </div>
            <div className='field'>
              <p className=''>
                <button type='submit' className='button is-medium is-info'>
                  一括登録
                </button>
              </p>
            </div>
          </article>
        </div>
      </form>
      <style jsx>
        {`
          .field {
            margin-bottom: 20px;
          }
          .input,
          textarea {
            box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
            max-width: 100%;
            width: 100%;
          }
          .input,
          select,
          textarea {
            background-color: #fff;
            border-radius: 4px;
            color: #363636;
            border: 1px solid #dbdbdb;
            font-size: 1rem;
            height: 2em;
            justify-content: flex-start;
            line-height: 1.5;
            padding-bottom: calc(0.375em - 1px);
            padding-left: calc(0.625em - 1px);
            padding-right: calc(0.625em - 1px);
            padding-top: calc(0.375em - 1px);
          }
          .is-rounded {
            background-color: #fff;
            border-radius: 6px;
            box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
            color: #4a4a4a;
            display: block;
            padding: 1.25rem;
          }
        `}
      </style>
    </>
  );
};

export default withAuthSync(DemoTask);
