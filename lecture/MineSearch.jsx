import React, { createContext, useCallback, useEffect, useReducer, useMemo } from 'react';
import Table from './Table';

export const CODE = {
  OPENED: 0, // 0 이상
  QUESTION: -2,
  FLAG: -3,
  FLAG_MINE: -4,
  QUESTION_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
  NORMAL: -1,
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map(function (arr, i) {
    return i;
  });
  const shuffle = [];

  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  console.log(data);
  console.log(shuffle);

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  return data;
};

const initialState = {
  row: 0,
  cell: 0,
  mine: 0,
  tableData: [],
  timer: 0,
  result: '',
  started: false,
  halted: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_TIMER':
      return {
        ...state,
        timer: state.timer + 1,
      };
    case 'SET_CELL':
      return {
        ...state,
        cell: action.cell,
      };
    case 'SET_ROW':
      return {
        ...state,
        row: action.row,
      };
    case 'SET_MINE':
      return {
        ...state,
        mine: action.mine,
      };
    case 'START_GAME':
      return {
        ...state,
        tableData: plantMine(state.row, state.cell, state.mine),
        started: true,
        halted: false,
      };
    case 'OPEN_CELL': {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      const checkAround = (row, cell) => {
        if (row < 0 || row > tableData.length || cell < 0 || cell > tableData[0].length) {
          return;
        }
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        }
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell);
        }
        let around = [
          tableData[row][cell - 1], tableData[row][cell + 1],
        ];
        if (tableData[row - 1]) {
          around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
        }
        if (tableData[row + 1]) {
          around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
        }
        const count = around.filter(function (v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;
        if (count === 0) { // 주변칸 오픈
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row -1, cell - 1]);
              near.push([row -1, cell]);
              near.push([row -1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.filter(v => !!v).forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            })
          }
        }
        tableData[row][cell] = count;
      };
      checkAround(action.row, action.cell);
      return {
        ...state,
        tableData,
      };
    }
    case 'CLICK_MINE': {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case 'QUESTION_CELL': {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case 'FLAG_CELL': {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case 'NORMALIZE_CELL': {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    default:
      return state;
  }
};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {
  },
});

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'INCREMENT_TIMER' });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, [state.cell, state.row, state.mine]);

  const onChangeCell = useCallback((e) => {
    if (state.halted) {
      dispatch({ type: 'SET_CELL', cell: parseInt(e.target.value, 10) });
    }
  }, [state.halted]);

  const onChangeRow = useCallback((e) => {
    if (state.halted) {
      dispatch({ type: 'SET_ROW', row: parseInt(e.target.value, 10) });
    }
  }, [state.halted]);

  const onChangeMine = useCallback((e) => {
    if (state.halted) {
      dispatch({ type: 'SET_MINE', mine: parseInt(e.target.value, 10) });
    }
  }, [state.halted]);

  const value = useMemo(() => ({ tableData: state.tableData, halted: state.halted, dispatch }), [state.tableData, state.halted]);

  return (
    <TableContext.Provider value={value}>
      <div>
        <label htmlFor="">
          가로
          <input type="number" value={state.cell} onChange={onChangeCell} />
        </label>
        <label htmlFor="">
          세로
          <input type="number" value={state.row} onChange={onChangeRow} />
        </label>
        <label htmlFor="">
          지뢰
          <input type="number" value={state.mine} onChange={onChangeMine} />
        </label>
        <button onClick={onClickBtn}>버튼</button>
      </div>
      <div>시간: {state.timer}</div>
      <Table rowCount={state.row} started={state.started} />
      <div>
        {state.result}
        <button onClick={onClickBtn}>재시작</button>
      </div>
    </TableContext.Provider>
  );
};

export default MineSearch;
