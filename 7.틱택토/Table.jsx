import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo(({ tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        {Array(tableData.length).fill().map((tr, i) => (
          <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
        ))}
      </tbody>
    </table>
  );
});
Table.displayName = 'Table';

export default Table;
