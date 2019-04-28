import React, { useState, useEffect, useRef, useMemo } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) =>  i + 1 );
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => { // componentDidMount와 componentDidUpdate 역할 수행
    console.log('로또 숫자를 생성합니다');
  }, [winNumbers]);

  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      // var j = i;
      timeouts.current[i] = setTimeout(function () {
        setWinBalls((b) => [...b, winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    if (!timeouts.current[6]) {
      timeouts.current[6] = setTimeout(() => {
        setBonus(winNumbers[6]);
        setRedo(true);
      }, 7000);
    }
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);

  const onClickRedo = () => {
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
    setWinNumbers(getWinNumbers());
  };

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      <button onClick={redo ? onClickRedo : () => {}}>한 번 더!</button>
    </>
  );
};

export default Lotto;
