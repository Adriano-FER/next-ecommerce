export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface CartContextType {
    items: CartItem[];
    addItem: (item: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
  }
  
  