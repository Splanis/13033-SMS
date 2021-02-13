export type Action = ReturnType<
  | typeof loadProfile
  | typeof changeAddress
  | typeof changeFirstName
  | typeof changeLastName
  | typeof loadAddress
  | typeof saveAddress
  | typeof removeAddress
>;

export const loadProfile = (profile: State) =>
  <const>{ type: 'LOAD_PROFILE', payload: { profile } };
export const changeAddress = (text: string) =>
  <const>{ type: 'CHANGE_ADDRESS', payload: { text } };
export const changeFirstName = (text: string) =>
  <const>{ type: 'CHANGE_FIRST_NAME', payload: { text } };
export const changeLastName = (text: string) =>
  <const>{ type: 'CHANGE_LAST_NAME', payload: { text } };
export const loadAddress = (address: string) =>
  <const>{ type: 'LOAD_ADDRESS', payload: { address } };
export const saveAddress = () => <const>{ type: 'SAVE_ADDRESS' };
export const removeAddress = (address: string) =>
  <const>{ type: 'REMOVE_ADDRESS', payload: { address } };

export type Reducer = (state: State, action: Action) => State;

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE':
      return action.payload.profile;
    case 'CHANGE_ADDRESS':
      return { ...state, address: action.payload.text };
    case 'CHANGE_FIRST_NAME':
      return { ...state, firstName: action.payload.text };
    case 'CHANGE_LAST_NAME':
      return { ...state, lastName: action.payload.text };
    case 'LOAD_ADDRESS':
      return { ...state, address: action.payload.address };
    case 'SAVE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.includes(state.address)
          ? state.addresses
          : [state.address, ...state.addresses]
      };
    case 'REMOVE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter((add) => add !== action.payload.address)
      };
    default:
      return state;
  }
};

export type State = {
  firstName: string;
  lastName: string;
  addresses: string[];
  address: string;
};

export const initialState = {
  firstName: '',
  lastName: '',
  addresses: [],
  address: ''
};
