import { createSlice } from "@reduxjs/toolkit";

// ── Initial State ─────────────────────────────────────────────
const initialState = {
  items: [],            // Array of cart items
  totalQuantity: 0,     // Total number of items in cart
  totalAmount: 0,       // Total cost of all items
};

// ── Cart Slice ────────────────────────────────────────────────
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    // ── 1. addItem() ────────────────────────────────────────
    // Adds a plant to the cart.
    // If the item already exists, increments its quantity.
    // If it's new, adds it with quantity 1.
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Item already in cart → just increase quantity
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        // New item → push to items array
        state.items.push({
          id:         newItem.id,
          name:       newItem.name,
          price:      newItem.price,
          image:      newItem.image,
          description: newItem.description,
          quantity:   1,
          totalPrice: newItem.price,
        });
      }

      // Recalculate totals
      state.totalQuantity += 1;
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    // ── 2. removeItem() ─────────────────────────────────────
    // Completely removes an item from the cart by its id,
    // regardless of quantity.
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Subtract this item's quantity from the total before removing
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);

        // Recalculate total amount
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },

    // ── 3. updateQuantity() ─────────────────────────────────
    // Updates the quantity of a specific item in the cart.
    // Payload: { id, quantity }
    // If the new quantity is 0 or less, the item is removed.
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (quantity <= 0) {
          // Remove item if quantity drops to zero
          state.totalQuantity -= existingItem.quantity;
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          // Update totalQuantity by the difference
          state.totalQuantity += quantity - existingItem.quantity;
          existingItem.quantity   = quantity;
          existingItem.totalPrice = quantity * existingItem.price;
        }

        // Recalculate total amount
        state.totalAmount = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },
  },
});

// ── Export actions & reducer ───────────────────────────────────
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
