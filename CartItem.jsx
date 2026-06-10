import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";

// ── CartItem Component ────────────────────────────────────────
function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // Get cart items and total amount from Redux store
  const cartItems    = useSelector((state) => state.cart.items);
  const totalAmount  = useSelector((state) => state.cart.totalAmount);

  // ── Handlers ──────────────────────────────────────────────

  // Increase quantity by 1
  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  // Decrease quantity by 1 — remove if reaches 0
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  // Remove item entirely from cart
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // Calculate subtotal for one item
  const calculateSubtotal = (item) =>
    (item.price * item.quantity).toFixed(2);

  // Calculate total number of items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ── Empty Cart State ───────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyWrap}>
        <div style={styles.emptyBox}>
          <span style={styles.emptyIcon}>🪴</span>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>
            Looks like you haven't added any plants yet.
          </p>
          <button
            style={styles.continueBtn}
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Cart With Items ────────────────────────────────────────
  return (
    <div style={styles.wrapper}>

      {/* Page Title */}
      <h2 style={styles.pageTitle}>🛒 Your Shopping Cart</h2>
      <p style={styles.itemCount}>
        {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
      </p>

      {/* Cart Items List */}
      <div style={styles.itemsList}>
        {cartItems.map((item) => (
          <div key={item.id} style={styles.cartRow}>

            {/* Plant Image */}
            <img
              src={item.image}
              alt={item.name}
              style={styles.itemImg}
            />

            {/* Plant Details */}
            <div style={styles.itemDetails}>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemPrice}>
                ${item.price.toFixed(2)} each
              </p>
              <p style={styles.itemSubtotal}>
                Subtotal: <strong>${calculateSubtotal(item)}</strong>
              </p>
            </div>

            {/* Quantity Controls */}
            <div style={styles.qtyControls}>
              <button
                style={styles.qtyBtn}
                onClick={() => handleDecrement(item)}
                title="Decrease quantity"
              >
                −
              </button>
              <span style={styles.qtyNum}>{item.quantity}</span>
              <button
                style={styles.qtyBtn}
                onClick={() => handleIncrement(item)}
                title="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Delete Button */}
            <button
              style={styles.deleteBtn}
              onClick={() => handleRemove(item.id)}
              title="Remove from cart"
            >
              🗑
            </button>

          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div style={styles.summary}>
        <div style={styles.summaryRow}>
          <span style={styles.summaryLabel}>Items ({totalItems})</span>
          <span>${Number(totalAmount).toFixed(2)}</span>
        </div>
        <div style={styles.summaryRow}>
          <span style={styles.summaryLabel}>Shipping</span>
          <span style={{ color: "#2d5a27", fontWeight: 500 }}>Free</span>
        </div>
        <div style={styles.divider} />
        <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
          <span>Total</span>
          <strong style={styles.totalAmount}>
            ${Number(totalAmount).toFixed(2)}
          </strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button
          style={styles.continueBtn}
          onClick={onContinueShopping}
        >
          ← Continue Shopping
        </button>
        <button style={styles.checkoutBtn}>
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = {
  // Empty state
  emptyWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    padding: "2rem",
  },
  emptyBox: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
  },
  emptyIcon:  { fontSize: "3.5rem" },
  emptyTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#1a2e1a",
  },
  emptyText: { color: "#777", fontSize: "0.95rem" },

  // Main wrapper
  wrapper: {
    maxWidth: "780px",
    margin: "0 auto",
    padding: "2rem 1.5rem 4rem",
    fontFamily: "'DM Sans', sans-serif",
  },
  pageTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1a2e1a",
    marginBottom: "0.3rem",
  },
  itemCount: {
    color: "#888",
    fontSize: "0.9rem",
    marginBottom: "1.75rem",
  },

  // Items list
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  cartRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  itemImg: {
    width: "72px",
    height: "72px",
    borderRadius: "10px",
    objectFit: "cover",
    background: "#e8f0e4",
    flexShrink: 0,
  },
  itemDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
  },
  itemName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#1a2e1a",
  },
  itemPrice:    { fontSize: "0.82rem", color: "#888" },
  itemSubtotal: { fontSize: "0.85rem", color: "#555" },

  // Quantity controls
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#e8f0e4",
    borderRadius: "8px",
    padding: "0.2rem 0.4rem",
  },
  qtyBtn: {
    background: "none",
    border: "none",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#2d5a27",
    cursor: "pointer",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "background 0.15s",
  },
  qtyNum: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#1a2e1a",
    minWidth: "22px",
    textAlign: "center",
  },

  // Delete button
  deleteBtn: {
    background: "none",
    border: "none",
    fontSize: "1.1rem",
    cursor: "pointer",
    opacity: 0.6,
    transition: "opacity 0.2s",
    padding: "0.3rem",
  },

  // Summary box
  summary: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "1.5rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.95rem",
    color: "#444",
  },
  summaryLabel: { color: "#777" },
  divider: {
    height: "1px",
    background: "rgba(0,0,0,0.07)",
    margin: "0.25rem 0",
  },
  totalRow: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#1a2e1a",
  },
  totalAmount: {
    fontSize: "1.25rem",
    color: "#2d5a27",
  },

  // Action buttons
  actions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  continueBtn: {
    flex: 1,
    padding: "0.85rem",
    background: "none",
    border: "1.5px solid #2d5a27",
    borderRadius: "10px",
    color: "#2d5a27",
    fontSize: "0.92rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s",
    minWidth: "160px",
  },
  checkoutBtn: {
    flex: 1,
    padding: "0.85rem",
    background: "#2d5a27",
    border: "none",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "0.92rem",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s",
    minWidth: "160px",
  },
};

export default CartItem;
