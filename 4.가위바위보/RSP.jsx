import React, { useState, useEffect, useRef } from 'react';

// 가위: 1, 바위: 0, 보: -1
// 나\컴퓨터    가위   바위    보
//       가위   1 1    1 0   1 -1
//       바위   0 1    0 0   0 -1
//         보  -1 1   -1 0  -1 -1

const rspCoords = { // 딕셔너리 자료구조
  바위: '0',
  가위: '-142px',
  보: '-284px'
};
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const RSP = () => {
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState('0');

  useInterval(() => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      console.log('here');
      setImgCoord(rspCoords.보);
    } else {
      setImgCoord(rspCoords.바위);
    }
  }, 100);

  const onClickBtn = (choice) => {
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      console.log('비겼습니다');
    } else if ([-1, 2].includes(diff)) {
      console.log('이겼습니다!!');
    } else {
      console.log('졌습니다 ㅠㅠ.');
    }
    setScore(score + diff);
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
      </div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
