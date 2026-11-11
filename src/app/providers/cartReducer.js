/** Pure cart logic – shared "cart interface" agreed with Dhanu. State = array of unique test ids. */
export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': return state.includes(action.id) ? state : [...state, action.id];
    case 'remove': return state.filter((id) => id !== action.id);
    case 'toggle': return state.includes(action.id) ? state.filter((id) => id !== action.id) : [...state, action.id];
    case 'clear': return [];
    case 'hydrate': return Array.isArray(action.ids) ? [...new Set(action.ids.filter((i) => typeof i === 'string'))] : [];
    default: return state;
  }
}
