import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [timeOut, setTimeOut] = useState(0);
  const [result, setResult] = useState([]);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      setTimeOut(setTimeout(() => {
        setState('now');
        setMessage('지금 클릭!');
        startTime.current = new Date();
        console.log('start', startTime);
      }, Math.floor(Math.random() * 1000) + 2000));
    } else if (state === 'ready') {
      clearTimeout(timeOut);
      setState('waiting');
      setMessage('너무 성급하시군요!');
    } else if (state === 'now') {
      setState('waiting');
      endTime.current = new Date();
      console.log('end', endTime);
      setResult((r) => [...r, endTime.current - startTime.current]);
      setMessage('클릭해서 시작하세요.');
    }
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>{message}</div>
      {result.length ? <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div> : null}
    </>
  );
};

export default ResponseCheck;
