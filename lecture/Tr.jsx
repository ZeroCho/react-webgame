import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ index, onClickCell, row }) => {
  console.log('tr', index, 'rendered');
  return (
    <tr>
      {row.map((cell, i) => {
        return <Td key={i} rowIndex={index} index={i} onClickCell={onClickCell} cell={cell} />
      })}
    </tr>
  )
});

export default Tr;
