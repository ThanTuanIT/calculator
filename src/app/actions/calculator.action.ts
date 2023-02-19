import { createAction, props } from "@ngrx/store";

export const enterNumber = createAction('[calculatorState] EnterNumber', props<{number: string}>())
export const enterOperator = createAction('[calculatorState] EnterOperator', props<{operator: string}>())