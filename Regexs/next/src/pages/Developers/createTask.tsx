import React, { useState } from 'react';
import { NextPage } from 'next';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { MultiSelectComponent } from '@src/components/multiSelection';
import { withAuthSync } from '@src/util/auth';
import { SingleSelectComponent } from '@src/components/singleSelection';
import { apiUrl } from '@src/util/apiUrl';

type OptionType = {
  label: string;
  value: string;
  groupId?: string;
};

interface CreateTaskProps {
  optionGroup: OptionType[];
  optionUser: OptionType[];
  status: number;
  message: string;
}

const CreateTask: NextPage<CreateTaskProps> = props => {
  const [title, setTitle] = useState('');
  const [employeeList, setEmployeeList] = useState<OptionType[]>([]);
  const [explanation, setExplanation] = useState('');
  const [summary, setSummary] = useState('');
  const [dueDate, setDueDate] = useState();
  const [optionUser, setOptionUser] = useState(props.optionUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      task: { title, dueDate, explanation, summary },
      empIdList: employeeList.map(employee => employee.value),
    };
    try {
      const res = await axios.post('/api/tasks', data);
      // eslint-disable-next-line no-console
      console.log(`registation success.(${res.status})`);
    } catch (error) {
      console.error(`registation failed.(${error.response.data.message})`);
    }
  };

  const handleChange = (value: React.SetStateAction<string>) => {
    setEmployeeList([]);
    if (value === undefined || value === null) {
      setOptionUser(props.optionUser);
    } else {
      const groupedOptionUser = props.optionUser.filter(d => d.groupId === Object.values(value)[0]);
      setOptionUser(groupedOptionUser);
    }
  };

  return (
    <>
      <form action='' onSubmit={handleSubmit}>
        <div className='task-area'>
          <div>
            <h3 className=''>タスク情報入力</h3>
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
              <label className='label'>概要</label>
              <textarea
                className='form-control'
                id='taskSummary'
                name='taskSummary'
                value={summary}
                onChange={e => setSummary(e.target.value)}
              />
            </div>
            <div className='field'>
              <label className='label'>組織</label>
              <SingleSelectComponent
                options={props.optionGroup}
                onChange={handleChange}
                // onChange={(value: React.SetStateAction<string>) => setTaskOrganization(value)}
              />
            </div>
            <div className='field'>
              <label className='label'>担当者</label>
              <MultiSelectComponent
                options={optionUser}
                value={employeeList}
                onChange={(value: React.SetStateAction<OptionType[]>) => setEmployeeList(value)}
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
              <label className='label'>詳細</label>
              <textarea
                className='input'
                id='taskDetail'
                name='taskDetail'
                value={explanation}
                onChange={e => setExplanation(e.target.value)}
              />
            </div>
            <div className='field'>
              <p className=''>
                <button type='submit' className='button is-medium is-info'>
                  登録
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

CreateTask.getInitialProps = async ctx => {
  const response: CreateTaskProps = {
    optionGroup: [],
    optionUser: [],
    status: 200,
    message: '',
  };
  try {
    const resGroups = await axios.get(apiUrl(ctx, '/api/groups'));
    const resUsers = await axios.get(apiUrl(ctx, '/api/employees'));

    const { groupList } = resGroups.data;
    const { employeeList } = resUsers.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.optionGroup = groupList.map((d: any) => ({ value: d.id, label: d.name }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.optionUser = employeeList.map((d: any) => ({
      value: d.empId,
      label: d.empName,
      groupId: d.groupId,
    }));

    response.status = resGroups.status;
    response.message = resGroups.statusText;

    return response;
  } catch (error) {
    response.status = error.response.status;
    response.message = error.response.data.message ?? error.response.statusText;

    return response;
  }
};

export default withAuthSync(CreateTask);
