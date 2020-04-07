import React, { useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import Modal from 'react-modal';
import { PageInfo } from '@src/interfaces/pageInfo';
import { Doughnut } from 'react-chartjs-2';
import { withAuthSync } from '@src/util/auth';
import { apiUrl } from '@src/util/apiUrl';
import useSWR from 'swr';
import { StyledCloseSVG } from '@src/styles/svg';
import bgdemo from '@assets/images/bgdemo.jpg';
import { TaskManageHeader } from '@src/components/taskManageHeader';
import { StyledButton } from '@src/styles';
import axios from 'axios';
import { TaskManageData } from '@src/pages/api/demo';

interface TaskManageProps {
  taskManageData?: TaskManageData;
}

const fetchEmployeesTask = async (url: string) => {
  const { taskManageData } = (await axios.get(url)).data;
  return taskManageData;
};

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const chartOption = {
  legend: {
    display: false,
  },
  cutoutPercentage: 75,
  title: {
    display: true,
    position: 'top',
    text: '年末調整提出状況',
    fontSize: 48,
    fontColor: '#525252',
  },
};

const TaskManage: NextPage<TaskManageProps> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskError, setTaskError] = useState(false);
  const [chart, setChart] = useState(0);

  const { data: taskManageData }: { data?: TaskManageData } = useSWR(
    `/api/demo`,
    fetchEmployeesTask,
    {
      initialData: props.taskManageData,
      refreshInterval: 5000,
    }
  );

  const handleClick = async (e: { preventDefault: () => void }) => {
    /* eslint-disable */
    setChart((chart) => chart + 1);
    e.preventDefault();
    const deadlineDate = new Date();
    deadlineDate.setMonth(deadlineDate.getMonth() + 1);

    const data = {
      task: { title: '2020年分年末調整', dueDate: deadlineDate },
    };

    setModalIsOpen(true);
    try {
      if (chart === 0) {
        await axios.post('/api/demo', data);
      }
    } catch (error) {
      setTaskError(true);
      console.error(`registation failed.(${error.response.data.message})`);
    }
  };

  const getChartSubmittedColor = () => {
    const compEmps = taskManageData?.taskCompleteEmployeesNum ?? 0;
    const allEmps = taskManageData?.allEmployeesNum ?? 0;
    const completePersent = Math.floor((compEmps / allEmps) * 100);

    if (completePersent < 25) return '#5CB1FC';
    else if (completePersent < 50) return '#3AA0FA';
    else if (completePersent < 75) return '#1184EA';
    else if (completePersent < 100) return '#0071D3';
    else return '#005BAC';
  };

  const chartData = {
    labels: ['提出済', '未提出'],
    datasets: [
      {
        data: [
          taskManageData?.taskCompleteEmployeesNum,
          taskManageData?.taskNotCompleteEmployeesNum,
        ],
        backgroundColor: [getChartSubmittedColor(), '#EBEBEB'],
      },
    ],
  };

  return (
    <>
      <TaskManageHeader />
      <div className='nencho-container'>
        <div className='request-button-area'>
          <StyledButton important fontSize='24px' width='454px' height='64px' onClick={handleClick}>
            申告書の記入をWebで依頼
          </StyledButton>
        </div>

        {/* modal */}
        {modalIsOpen && (
          <Modal
            isOpen={!!modalIsOpen}
            style={modalStyle}
            ariaHideApp={false}
            contentLabel='年末調整提出状況'>
            <div className='close-button-area'>
              <StyledCloseSVG
                width='48'
                height='48'
                color='#949494'
                onClick={() => setModalIsOpen(false)}
              />
            </div>

            {/* chart */}
            <div className='chart-container'>
              <Doughnut width={500} height={558} data={chartData} options={chartOption} />
              <div className='chart-legend'>
                <p className='chart-legend-top'>{taskManageData?.taskCompleteEmployeesNum}</p>
                <p className='chart-legend-middle' />
                <p className='chart-legend-bottom'>
                  {taskManageData?.allEmployeesNum}
                  <span>人</span>
                </p>
              </div>
            </div>

            {/* star icon for warning */}
            {taskError && <div className='star-icon-area'>★</div>}
          </Modal>
        )}
      </div>
      <style jsx>
        {`
          .nencho-container {
            width: 100%;
            height: 90vh;
            background-image: url(${bgdemo});
            background-repeat: no-repeat;
            background-position: top center;
          }
          .chart-container {
            margin-top: 20px;
          }
          .chart-legend {
            display: flex;
            flex-direction: column;
            top: 40%;
            left: 0;
            right: 0;
            position: absolute;
            align-items: center;
          }
          .chart-legend p {
            margin: 0;
            text-align: center;
          }
          .chart-legend-top {
            font-style: normal;
            font-weight: bold;
            font-size: 150px;
            line-height: 100%;
            letter-spacing: -0.04em;
            color: #005bac;
          }
          .chart-legend-middle {
            width: 155px;
            border: 8px solid #dedede;
          }
          .chart-legend-bottom {
            font-style: normal;
            font-weight: bold;
            font-size: 72px;
            letter-spacing: -0.02em;
            color: #525252;
          }
          .chart-legend-bottom span {
            font-family: Meiryo;
            font-size: 36px;
            letter-spacing: 0.1em;
          }
          .close-button-area {
            margin-right: 20px;
            position: absolute;
            right: 0;
          }
          .star-icon-area {
            text-align: right;
            color: #949494;
            font-style: normal;
            font-weight: normal;
            font-size: 30px;
            line-height: 100%;
          }
          .request-button-area {
            opacity: 0;
            display: flex;
            justify-content: center;
            position: absolute;
            top: 558px;
            left: 0;
            right: 0;
          }
        `}
      </style>
    </>
  );
};

TaskManage.getInitialProps = async (ctx: NextPageContext) => {
  const pageInfo: PageInfo = { currentPageName: '年末調整' };
  try {
    return {
      taskManageData: await fetchEmployeesTask(apiUrl(ctx, `/api/demo`)),
      pageInfo,
    };
  } catch (error) {
    const { response } = error;

    return {
      error: {
        status: response.status,
        message: response.data.message ?? response.statusText,
      },
    };
  }
};

export default withAuthSync(TaskManage);
