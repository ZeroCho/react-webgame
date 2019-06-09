import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo(({ onClickCell, turn, tableData }) => {
  return (
    <table>
      {tableData.map((row, i) => {
        return <Tr key={i} index={i} onClickCell={onClickCell} row={row} />;
      })}
    </table>
  );
});

export default Table;
