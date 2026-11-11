import { createContext, useContext, useEffect, useMemo, useReducer, useCallback } from 'react';
import { cartReducer } from './cartReducer';
import { readJSON, writeJSON, STORAGE_KEYS } from '../../services/storageService';
import { getTestsByIds } from '../../services/testService';
import { sumPrices } from '../../utils/priceUtils';
import { tests as allTests } from '../../data/tests';

/**
 * Shared cart interface
 *   selectedTestIds: string[]   selectedTests: Test[]   indicativeTotal: number
 *   add(id) remove(id) toggle(id) clear() has(id)
 */
const CartContext = createContext(null);

const validIds = new Set(allTests.map((t) => t.id));

export function CartProvider({ children }) {
  const [ids, dispatch] = useReducer(cartReducer, [], () =>
    cartReducer([], { type: 'hydrate', ids: readJSON(STORAGE_KEYS.cart, []).filter((i) => validIds.has(i)) }),
  );

  useEffect(() => { writeJSON(STORAGE_KEYS.cart, ids); }, [ids]);

  const add = useCallback((id) => dispatch({ type: 'add', id }), []);
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const toggle = useCallback((id) => dispatch({ type: 'toggle', id }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo(() => {
    const selectedTests = getTestsByIds(ids);
    return {
      selectedTestIds: ids,
      selectedTests,
      indicativeTotal: sumPrices(selectedTests),
      count: ids.length,
      has: (id) => ids.includes(id),
      add, remove, toggle, clear,
    };
  }, [ids, add, remove, toggle, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
