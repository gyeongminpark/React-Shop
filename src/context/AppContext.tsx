import { createContext, useReducer, useContext, Dispatch } from 'react';
import { Product } from '../model';

// 타입을 지정
type State = {
  products: Product[];
  colorMode: string;
  cart: { product: Product; count: number }[];
  total: number;
};

type Action =
  | { type: 'CHANGE_MODE'; color: string }
  | { type: 'SET_PRODUCTS'; products: Product[] }
  | { type: 'ADD_CART'; product: Product }
  | { type: 'DECREASE'; product: Product }
  | { type: 'INCREASE'; product: Product }
  | { type: 'REMOVEALL' };

type AppDispatch = Dispatch<Action>;

// context 생성
const AppStateContext = createContext<State | null>(null);
const AppDispatchContext = createContext<AppDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state, colorMode: action.color };
    case 'SET_PRODUCTS':
      return { ...state, products: [...action.products] };
    case 'REMOVEALL':
      localStorage.setItem('cart', JSON.stringify([]));
      return { ...state, cart: [], total: 0 };
    case 'ADD_CART':
      const len = state.cart.filter(
        ({ product }) => product.id === action.product.id,
      ).length;
      if (len === 0) {
        let newCart = [...state.cart, { product: action.product, count: 1 }];
        localStorage.setItem('cart', JSON.stringify(newCart));
        return {
          ...state,
          cart: [...newCart],
          total: state.total + 1,
        };
      } else {
        let newCart = state.cart.map(({ product, count }) =>
          product.id === action.product.id
            ? { product, count: count + 1 }
            : { product, count },
        );
        localStorage.setItem('cart', JSON.stringify(newCart));
        return {
          ...state,
          cart: [...newCart],
          total: state.total + 1,
        };
      }
    case 'DECREASE':
      const deCart = state.cart
        .map(({ product, count }) =>
          product.id === action.product.id
            ? { product, count: count - 1 }
            : { product, count },
        )
        .filter(({ count }) => count >= 1);
      localStorage.setItem('cart', JSON.stringify(deCart));
      return { ...state, cart: [...deCart], total: state.total - 1 };
    case 'INCREASE':
      const inCart = state.cart.map(({ product, count }) =>
        product.id === action.product.id
          ? { product, count: count + 1 }
          : { product, count },
      );
      localStorage.setItem('cart', JSON.stringify(inCart));
      return { ...state, cart: [...inCart], total: state.total + 1 };
    default:
      return state;
  }
}

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem('color-mode');

  if (persistedColorPreference) {
    return persistedColorPreference;
  }

  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

  if (systemPreference.matches) {
    return 'dark';
  }
  return 'light';
}

const storage: { product: Product; count: number }[] = JSON.parse(
  localStorage.getItem('cart') || '[]',
);
const storage_total = storage.reduce((acc, cur) => acc + cur.count, 0);

const initialState = {
  colorMode: getInitialColorMode(),
  products: [],
  cart: [...storage],
  total: storage_total,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) throw new Error('Cannot find StateContext');
  return state;
}

export function useAppDispatch() {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) throw new Error('Cannot find DispatchContext');
  return dispatch;
}
