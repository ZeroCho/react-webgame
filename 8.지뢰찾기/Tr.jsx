import React, { useContext, memo } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {tableData[0] && Array(tableData[0].length).fill().map((td, i) =>
        <Td key={i} rowIndex={rowIndex} cellIndex={i} />
      )}
    </tr>
  )
});
Tr.displayName = 'Tr';

export default Tr;
