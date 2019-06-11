import React, { memo, useContext } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
  return (
    <tr>
      {Array(tableData[0].length).fill().map((cell, i) => {
        return <Td key={i} rowIndex={rowIndex} cellIndex={i} />;
      })}
    </tr>
  )
});

export default Tr;
