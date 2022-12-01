import React, { useState } from 'react';
import { bind } from '../../utils/bind';
import styles from './Home.module.css';
import { getBack } from '../../infrastructure/getBack';
import { ResponseBack } from '../../domain/ResponseBack';

const cx = bind(styles);

interface Props {}

export const Home: React.FunctionComponent<Props> = () => {
  const appBack = process.env.REACT_APP_BACK || 'www.google.es'

  const [calls, setCalls] = useState(1);
  const [callsInterval, setCallsInterval] = useState(1);

  const jumpLogTest: ResponseBack = {
    metadata: {
        version: "",
        colour: "",
    }
  };
  const [callLogs, setCallLogs] = useState({ ...jumpLogTest });

  const sendJumps = async () => {
    setCallLogs({ ...jumpLogTest });

    const timeout = async (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms * 1000));
    };

    for (let index = 0; index < calls; index++) {
      await timeout(callsInterval);

      var jump: ResponseBack = {} as any;

      jump = await getBack(appBack);

      setCallLogs({ ...jump });
    }
  };

  return (
    <>
      <div role='jump' className={cx('jumps')}>
        <div role='jumpselections' className={cx('jumps-buttons')}>
          <div>
            <h1>Calls Retries:</h1>
            <input
              type='number'
              id='calls'
              name='calls'
              required={true}
              placeholder='80'
              onChange={(event) => setCalls(parseInt(event.target.value))}
              value={calls}
              className={cx('jumps-buttons-calls')}
            />
          </div>
          <div>
            <h1>Calls Interval:</h1>
            <input
              type='number'
              id='callsInterval'
              name='callsInterval'
              required={true}
              placeholder='80'
              onChange={(event) =>
                setCallsInterval(parseInt(event.target.value))
              }
              value={callsInterval}
              className={cx('jumps-buttons-calls')}
            />
          </div>
        </div>
        <div role='jumpaction' className={cx('jumps-actions')}>
          <button onClick={sendJumps} className={cx('jumps-actions-button')}>
            <img
              src='./rocket.png'
              alt='Jump!'
              className={cx('jumps-actions-button-img')}
            />
            <p>- JUMP -</p>
          </button>
        </div>
      </div>
      <div role='jumplog' className={cx('logs')}>
        <div className={cx('logs-items')}>
          <p>
            {callLogs.metadata.colour} {callLogs.metadata.version}
          </p>
        </div>
      </div>
    </>
  );
};
