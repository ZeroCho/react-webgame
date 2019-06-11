import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo(({ rowCount, started }) => {
  return (
    <table>
      {started
        ? Array(rowCount).fill().map((row, i) => {
          return <Tr key={i} rowIndex={i} />;
        })
        : null}
    </table>
  );
});

export default Table;
