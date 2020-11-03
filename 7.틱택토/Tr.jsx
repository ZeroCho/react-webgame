import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
      ))}
    </tr>
  );
});

export default Tr;
