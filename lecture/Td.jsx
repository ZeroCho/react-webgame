import React, { useEffect, useState, useCallback, useRef, memo } from 'react';

const Td = memo(({ index, rowIndex, onClickCell, cell }) => {
  // console.log('td', rowIndex, index, 'rendered');
  const [hoverCell, setHoverCell] = useState(false);
  const ref = useRef([]);
  console.log('rendered');
  useEffect(() => {
    console.log(rowIndex, index, index === ref.current[0], rowIndex === ref.current[1], onClickCell === ref.current[2], cell === ref.current[3]);
    ref.current = [index, rowIndex, onClickCell, cell];
  }, [index, rowIndex, onClickCell, cell]);

  const onClickTd = useCallback(() => {
    console.log(rowIndex, index, cell);
    if (!cell) {
      onClickCell(rowIndex, index);
    }
  }, [cell]);

  const onMouseEnter = useCallback(() => {
    setHoverCell(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setHoverCell(false);
  }, []);

  return (
    <td
      onClick={onClickTd} onMouseEnter={onMouseEnter} onMouseOut={onMouseOut}
      style={{ color: cell ? 'black' : hoverCell ? 'lightgray' : 'black' }}
    >{cell || (hoverCell && '여기')}</td>
  )
});

export default Td;
