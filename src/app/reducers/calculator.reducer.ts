import { CalculatorState } from "../states/calculator.state";
import * as CalculatorActions from '../actions/calculator.action';
import { createReducer, on } from '@ngrx/store';


let initialState = <CalculatorState> {
    number1: '',
    number2: '',
    total: 0,
    operator: ''
}

export const calculatorReducer = createReducer(
    initialState,

    on(CalculatorActions.enterNumber, (state, action) => {
        let newState = {...state};
        if (state.number1 == "") {
            newState = {
                ...state,
                number1: action.number,
                total: Number(action.number),
            }
        } else {
            if (state.operator == "") {
                newState = {
                    ...state,
                    number1: state.number1 + action.number,
                    total: Number(state.number1 + action.number),
                }
            } else if (state.operator == "+") {
                if (state.number2 == "") {
                    newState = {
                        ...state,
                        number2: action.number,
                        total: state.total + Number(action.number),
                    }
                } else {
                    newState = {
                        ...state,
                        number2: state.number2 + action.number,
                        total: Number(state.number1) + Number(state.number2 + action.number),
                    }
                }
            } else if (state.operator == "-") {
                if (state.number2 == "") {
                    newState = {
                        ...state,
                        number2: action.number,
                        total: state.total - Number(action.number),
                    }
                } else {
                    newState = {
                        ...state,
                        number2: state.number2 + action.number,
                        total: Number(state.number1) - Number(state.number2 + action.number),
                    }
                }
            } else if (state.operator == "*") {
                if (state.number2 == "") {
                    newState = {
                        ...state,
                        number2: action.number,
                        total: state.total * Number(action.number),
                    }
                } else {
                    newState = {
                        ...state,
                        number2: state.number2 + action.number,
                        total: Number(state.number1) * Number(state.number2 + action.number),
                    }
                }
            } else if (state.operator == "/") {
                if (state.number2 == "") {
                    newState = {
                        ...state,
                        number2: action.number,
                        total: state.total / Number(action.number),
                    }
                } else {
                    newState = {
                        ...state,
                        number2: state.number2 + action.number,
                        total: Number(state.number1) / Number(state.number2 + action.number),
                    }
                }
            }
        }
        return newState;
    }),

    on(CalculatorActions.enterOperator, (state, action)=> {
        let newState = {...state};
        if (action.operator == "C") {
            newState = {
                ...state,
                number1: '',
                number2: '',
                total: 0,
                operator: ''
            }
            return newState;
        }
        // k cho nhập phép tính khi chưa có số
        if (state.number1 == "") {
            newState = {
                ...state,
            }
        } else {
            // nếu không tồn tại số thứ 2 thì chỉ việc gán operator
            if (state.number2 == "") {
                newState = {
                    ...state,
                    operator: action.operator
                }
            } else {  // nếu đã tồn tại số thứ 2 thì phải update lại biến number1 = total, number2 = 0 và operator mới
                newState = {
                    ...state,
                    number1: state.total.toString(),
                    number2: "",
                    operator: action.operator,
                }
            }
        }
        return newState;
    })
)