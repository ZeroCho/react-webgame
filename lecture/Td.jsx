import React, { Component, useContext, useEffect, useCallback, useMemo, useRef, memo } from 'react';
import { CODE, TableContext } from './MineSearch';

const getTdStyle = (data) => {
  switch (data) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        backgroundColor: '#444',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        backgroundColor: 'white',
      };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        backgroundColor: 'red',
      };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        backgroundColor: 'yellow',
      };
    default:
      return {
        backgroundColor: 'white',
      };
  }
};

const getTdText = (data) => {
  switch (data) {
    case CODE.NORMAL:
    case CODE.OPENED:
      return '';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.MINE:
      return 'X';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    default:
      return data;
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, halted, dispatch } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;
      case CODE.NORMAL:
        dispatch({ type: 'OPEN_CELL', row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: 'CLICK_MINE', row: rowIndex, cell: cellIndex })
    }
  }, [halted]);

  const onContextMenu = useCallback((e) => {
    e.preventDefault();
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: 'QUESTION_CELL', row: rowIndex, cell: cellIndex });
        return;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({ type: 'NORMALIZE_CELL', row: rowIndex, cell: cellIndex });
        return;
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: 'FLAG_CELL', row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [halted, tableData]);

  console.log('td rendered');
  return useMemo(() => (
    <RealTd onContextMenu={onContextMenu} onClickTd={onClickTd} cell={tableData[rowIndex][cellIndex]} />
  ), [tableData[rowIndex][cellIndex]]);
};

const RealTd = memo(({ cell, onContextMenu, onClickTd }) => {
  console.log('rendered');
  return (
    <td
      onClick={onClickTd}
      style={getTdStyle(cell)}
      onContextMenu={onContextMenu}
    >{getTdText(cell)}</td>
  )
});

export default Td;
