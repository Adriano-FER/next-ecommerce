import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TourCustomizations {
  date: string;
  time: string;
  people: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  customizations: TourCustomizations;
  finalPrice: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeItem: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'cart-storage';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isLoading: false,
      isOpen: false,

      addToCart: (item) =>
        set((state) => {
          // Obtener el estado actual del localStorage
          const currentStorage = localStorage.getItem(STORAGE_KEY);
          const persistedState = currentStorage ? JSON.parse(currentStorage).state : { items: [], total: 0 };
          
          const existingItem = persistedState.items.find((i: CartItem) => i.id === item.id);
          
          const updatedItems = existingItem
            ? persistedState.items.map((i: CartItem) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            : [...persistedState.items, item];

          const newTotal = updatedItems.reduce(
            (sum: number, item: CartItem) => sum + item.finalPrice,
            0
          );

          // Guardar explícitamente en localStorage
          const newState = { items: updatedItems, total: newTotal };
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: newState }));

          return newState;
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          const newState = {
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + item.finalPrice, 0),
          };
          
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: newState }));

          return newState;
        }),

      setIsLoading: (loading) => set({ isLoading: loading }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, total: state.total }),
    }
  )
);