import React, { useReducer, useCallback, useEffect, useState } from 'react';
import Table from './Table';

const initialState = {
  tableData: [['', '', ''], ['', '', ''], ['', '', '']],
  turn: 'O',
  winner: '',
  recentCell: [-1, -1],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLE_DATA':
      console.log(action);
      const newTableData = [...state.tableData];
      newTableData[action.row] = [...newTableData[action.row]];
      newTableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData: newTableData,
        recentCell: [action.row, action.cell],
      };
    case 'RESET_TABLE_DATA':
      return {
        ...state,
        tableData: [['', '', ''], ['', '', ''], ['', '', '']],
        recentCell: [-1, -1],
      };
    case 'CHANGE_TURN':
      return {
        ...state,
        turn: action.turn,
      };
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.winner,
      };
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  const onClickCell = useCallback((row, cell) => {
    console.log(row, cell);
    dispatch({ type: 'SET_TABLE_DATA', row, cell });
  }, [state]);

  const checkWinner = ([row, cell]) => {
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    return win;
  };

  const checkAllFilled = () => {
    let all = true;
    tableData.forEach((row) => {
      row.forEach((cell) => {
        if (!cell) {
          all = false;
        }
      });
    });
    return all;
  };

  useEffect(() => {
    console.log(state);
    if (recentCell[0] > -1) {
      console.log('a');
      if (checkWinner(recentCell)) {
        console.log('b');
        dispatch({ type: 'SET_WINNER', winner: turn });
        dispatch({ type: 'RESET_TABLE_DATA' });
        dispatch({ type: 'CHANGE_TURN', turn: 'O' });
      } else if (checkAllFilled()) {
        console.log('c');
        dispatch({ type: 'RESET_TABLE_DATA' });
        dispatch({ type: 'CHANGE_TURN', turn: 'O' });
      } else {
        console.log(state.turn === 'O' ? 'X' : 'O');
        dispatch({ type: 'CHANGE_TURN', turn: turn === 'O' ? 'X' : 'O' });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClickCell={onClickCell} turn={turn} tableData={tableData} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
