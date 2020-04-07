import { NextPage } from 'next';
import React, { useState, FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Employees, Tasks, Nencho, NenchoInsuranceLifeInput2020 } from '@src/model/entity';
import { allEmployeeId } from '@src/util/allEmployeeId';
import useSWR from 'swr';

const DemoControl: NextPage = () => {
  return (
    <>
      <h3>HY demo 管理機能</h3>{' '}
      <div style={{ display: 'flex' }}>
        <ConfirmLoginEmployeesNum />
        <ConfirmTasksNum />
      </div>
      <ConfirmInsuranceInput />
      <AddNewEmployee />
      <PublishTaskForEachEmployee />
      <ResetAllEmployeeLoginDateTime />
      <DeleteAllTask />
      <RegistAllEmployee />
    </>
  );
};

// 機能ごとにコンポーネントに分割

// 全タスク削除機能
const DeleteAllTask: FC = () => {
  const [deleteResult, setDeleteResult] = useState<string>('未実行');

  const deleteAllTaskHandle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDeleteResult('実行中');
    e.preventDefault();
    const result = await axios.delete('/api/tasks');
    if (result.status === 204) {
      setDeleteResult('削除完了');
      return;
    }
    setDeleteResult('削除失敗');
  };
  return (
    <FunctionDiv>
      <div>
        <h4>タスク全削除</h4>発行されているタスクを全て削除します。
      </div>
      <div>
        <span>実行結果：</span>
        <span id='allDeleteResult'>{deleteResult}</span>
      </div>
      <ExecuteButton
        id='deleteAllTaskButton'
        onClick={deleteAllTaskHandle}
        style={{ float: 'right' }}>
        実行
      </ExecuteButton>
    </FunctionDiv>
  );
};

// 全従業員ログイン時間リセット機能
const ResetAllEmployeeLoginDateTime: FC = () => {
  const [resetLoginResult, setResetLoginResult] = useState<string>('未実行');

  const resetAllEmployeesLoginTime = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setResetLoginResult('実行中');
    e.preventDefault();
    try {
      await axios.post('/api/employees/resetAllLoginAt');
    } catch (error) {
      console.error(error);
      setResetLoginResult('変更失敗');
    }
    setResetLoginResult('変更完了');
  };

  return (
    <FunctionDiv>
      <h4>全従業員ログイン時刻リセット</h4>
      <div>全従業員のログイン時刻の情報をテーブルから削除します。</div>
      <div>
        <span>実行結果：</span>
        <span id='resetAllEmployeeLoginTimeResult'>{resetLoginResult}</span>
      </div>
      <ExecuteButton
        id='resetAllEmployeeLoginTimeButton'
        onClick={resetAllEmployeesLoginTime}
        style={{ float: 'right' }}>
        実行
      </ExecuteButton>
    </FunctionDiv>
  );
};

// ログイン済み従業員の数を取得
const ConfirmLoginEmployeesNum: FC = () => {
  const fetchFilterLoginedEmployees = async (url: string) => {
    try {
      // ログイン済みの従業員の情報を取得する
      const response = await axios.get(url);
      const { employeeList } = response.data;
      return employeeList.length;
    } catch (error) {
      console.log(error.response.data.message);
    }
    return 0;
  };

  const { data } = useSWR('/api/employees/logined', fetchFilterLoginedEmployees, {
    refreshInterval: 5000,
  });

  return (
    <FunctionDiv style={{ flex: '1' }}>
      <h4>ログイン状況確認</h4>
      <div>
        ログイン済みの従業員数：<NumberSpan>{data}</NumberSpan>
      </div>
    </FunctionDiv>
  );
};

// 発行済みのタスクの数を確認
const ConfirmTasksNum: FC = () => {
  const fetchGetTasks = async (url: string) => {
    try {
      const tasks: { taskList: Tasks[] } = (await axios.get(url)).data;
      return tasks.taskList.length;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
  const { data } = useSWR('/api/tasks', fetchGetTasks, { refreshInterval: 5000 });

  return (
    <FunctionDiv style={{ flex: '1' }}>
      <h4>発行済みタスク数の確認</h4>
      <div>
        発行済みタスク数：<NumberSpan>{data}</NumberSpan>
      </div>
    </FunctionDiv>
  );
};

// 全従業員登録処理
const RegistAllEmployee: FC = () => {
  const [process, setProcess] = useState<string>('未実行');

  const registAllEmployee = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setProcess('実行中・・・');
    e.preventDefault();
    const employees: Employees[] = [];
    allEmployeeId.forEach((id) => {
      const employee: Employees = new Employees();
      employee.empId = id;
      employee.empName = id;
      employee.empPassword = id;
      employees.push(employee);
    });
    try {
      // 一度全ての従業員を削除します。
      setProcess('全従業員削除中・・・');
      await axios.delete('/api/employees');
      setProcess('従業員登録中・・・');
      await axios.post('/api/employees/createMany', employees);
    } catch (err) {
      setProcess(`エラーが起きました。：${err}`);
      console.log(err);
      return;
    }
    setProcess('登録完了');
  };
  return (
    <FunctionDiv>
      <h4>全従業員登録処理</h4>
      <p>全従業員を削除し、全従業員を再度登録し直します。</p>
      <p>
        <span>実行結果：</span>
        <span id='resultOfRegistAllEmployee'>{process}</span>
      </p>
      <ExecuteButton style={{ float: 'right' }} onClick={registAllEmployee}>
        登録
      </ExecuteButton>
    </FunctionDiv>
  );
};

// 狙った従業員にタスクを発行します。
const PublishTaskForEachEmployee: FC = () => {
  const [publishResult, setPublishResult] = useState<string>('未実行');
  const [task, setTask] = useState<Tasks>(new Tasks());

  const publishTask = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPublishResult('発行中');
    e.preventDefault();
    console.log(JSON.stringify(task));
    try {
      // タスクを発行します。
      const data = await (await axios.post('/api/tasks', { task, empIdList: [task.empId] })).data;
      // 発行したタスクIDをプライマリーキーとする年末調整データを作成します。
      const { taskIdList } = data;
      const nencho: Nencho = new Nencho();
      nencho.nenchoInsuranceStatus = 0;
      await axios.post('/api/nencho', { nencho, taskIdList });
    } catch (err) {
      setPublishResult(`エラーが起きました。${err}`);
      return;
    }
    setPublishResult('発行完了');
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setTask({ ...task, [e.target.name]: value });
  };

  return (
    <FunctionDiv>
      <h4>入力したIDの従業員に、タスクを個別に発行します。</h4>
      <div>ID：</div>
      <input onChange={handleTaskChange} name='empId' />
      <div>タスク名：</div>
      <input onChange={handleTaskChange} name='title' />
      <div>期日：</div>
      <input onChange={handleTaskChange} type='date' name='dueDate' />
      <div style={{ marginTop: '16px' }}>
        <span>実行結果：</span>
        <span id='publishTaskResult'>{publishResult}</span>
      </div>
      <ExecuteButton onClick={publishTask} style={{ float: 'right' }}>
        発行
      </ExecuteButton>
    </FunctionDiv>
  );
};

// 保険料控除申告書の保存が完了している従業員数を確認します。
const ConfirmInsuranceInput: FC = () => {
  const fetchConfirmInputInsurances = async (url: string) => {
    try {
      const result: { insuranceInputs: NenchoInsuranceLifeInput2020[] } = await (
        await axios.get(url)
      ).data;
      // 重複無しのタスクIDの配列を生成する
      const ids: string[] = [];
      result.insuranceInputs.forEach((input) => ids.push(input.nenchoId));
      const filterdIds: string[] = ids.filter((x, i, self) => {
        return self.indexOf(x) === i;
      });
      const empIds: string[] = [];

      // 全タスクを取得する
      const allTasks: Tasks[] = await (await axios.get('/api/tasks')).data.taskList;

      // 全タスクのうち、保険料控除が保存済みのものに絞り込む
      const filteredTask: Tasks[] = allTasks.filter((task) => filterdIds.includes(task.id));

      filteredTask.forEach((task) => empIds.push(task.empId));
      const filterdEmpIds: string[] = empIds.filter((x, i, self) => {
        return self.indexOf(x) === i;
      });
      return filterdEmpIds.length;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const { data } = useSWR('/api/insurances', fetchConfirmInputInsurances, {
    refreshInterval: 5000,
  });

  return (
    <FunctionDiv>
      <h4>保険料控除申告書入力状況</h4>
      <div>
        保険料控除保存済み人数：<NumberSpan>{data}</NumberSpan>
      </div>
    </FunctionDiv>
  );
};

// 従業員を追加します。
const AddNewEmployee: FC = () => {
  const [newEmployee, setNewEmployee] = useState<Employees>(new Employees());

  // empId入力時にempName、empPasswordも同時にも同時に値を代入する
  const inputEmpIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewEmployee({ ...newEmployee, empId: value, empName: value, empPassword: value });
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const buttonHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // 従業員IDの入力は必須
    if (!newEmployee.empId) {
      window.alert('IDが入力されていません。');
      return;
    }
    try {
      await axios.post('/api/employees', newEmployee);
      window.alert('新規従業員データが追加されました。');
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  return (
    <FunctionDiv>
      <h4>新規従業員追加</h4>
      <p>新しい従業員を追加します。</p>
      <p>※IDの入力欄に入力した値が、パスワードの入力欄にも反映されます。</p>
      <div>ID：</div>
      <input name='empId' type='text' onChange={inputEmpIdHandler} />
      <div>password：</div>
      <input
        name='empPassword'
        type='text'
        onChange={inputHandler}
        value={newEmployee.empPassword}
      />
      <ExecuteButton style={{ float: 'right' }} onClick={buttonHandler}>
        登録
      </ExecuteButton>
    </FunctionDiv>
  );
};

// styled-component

// 機能単位で分割するコントロール
const FunctionDiv = styled.div`
  overflow: hidden;
  padding: 16px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  margin-bottom: 10px;
`;

// 機能を実行するボタン
const ExecuteButton = styled.button`
  border-radius: 16px;
  color: #666;
  padding: 8px 16px 8px 16px;
  box-shadow: 0 2px 6px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  border: none;
  background-color: #fcfcfc;
  cursor: pointer;
  cursor: hand;
  &:hover {
    box-shadow: 0 2px 6px rgba(10, 10, 10, 0.1) inset, 0 0 0 1px rgba(10, 10, 10, 0.1);
    background-color: #fff;
  }
`;
// 数字を目立たせるためのspan
const NumberSpan = styled.span`
  font-size: 32px;
`;

export default DemoControl;
