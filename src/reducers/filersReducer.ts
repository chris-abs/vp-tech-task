import { FiltersState, FiltersAction } from '../types';

export const initialState: FiltersState = {
  selectedFilters: {},
  formattedFilters: {},
};

export const filtersReducer = (
  state: FiltersState,
  action: FiltersAction,
): FiltersState => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        selectedFilters: action.payload,
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        selectedFilters: {},
      };
    case 'UPDATE_FORMATTED_FILTERS':
      return {
        ...state,
        formattedFilters: action.payload,
      };
    default:
      return state;
  }
};
