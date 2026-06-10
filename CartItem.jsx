import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping, onProceedToCheckout }) {
  const dispatch    = useDispatch();
  const cartItems   = useSelector((state) => state.cart.items);

  // ── Total number of items in cart ──────────────────────────
  const calculateTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  // ── Total cost of all items ────────────────────────────────
  const calculateTotalAmount = () =>
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  // ── Cost for a single item (price × quantity) ──────────────
  const calculateTotalCost = (item) =>
    (item.price * item.quantity).toFixed(2);

  // ── Increment quantity ─────────────────────────────────────
  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  // ── Decrement quantity (remove if quantity reaches 0) ──────
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  // ── Remove item completely ─────────────────────────────────
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // ── Continue Shopping ──────────────────────────────────────
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) onContinueShopping(e);
  };

  // ── Checkout ───────────────────────────────────────────────
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert("Functionality to be added for future reference");
  };

  // ── Empty cart ─────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyWrapper}>
        <div style={styles.emptyBox}>
          <span style={styles.emptyIcon}>🪴</span>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>
            Looks like you haven't added any plants yet.
          </p>
          <button
            style={styles.continueBtn}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>

      {/* ── Page Heading ── */}
      <h2 style={styles.pageTitle}>Shopping Cart</h2>

      {/* ── Cart Items ── */}
      <div style={styles.itemsList}>
        {cartItems.map((item) => (
          <div key={item.id} style={styles.cartItem}>

            {/* Plant image */}
            <img
              src={item.image}
              alt={item.name}
              style={styles.itemImg}
            />

            {/* Plant details */}
            <div style={styles.itemDetails}>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemUnitPrice}>
                Unit Price: <strong>${item.price.toFixed(2)}</strong>
              </p>

              {/* Quantity controls */}
              <div style={styles.qtyRow}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span style={styles.qtyValue}>{item.quantity}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* Total cost for this item */}
              <p style={styles.itemTotal}>
                Total: <strong>${calculateTotalCost(item)}</strong>
              </p>

              {/* Delete button */}
              <button
                style={styles.deleteBtn}
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ── Cart Summary ── */}
      <div style={styles.summary}>
        <h3 style={styles.summaryTitle}>
          Total Items in Cart:{" "}
          <span style={styles.summaryValue}>{calculateTotalQuantity()}</span>
        </h3>
        <h3 style={styles.summaryTitle}>
          Total Amount:{" "}
          <span style={styles.summaryValue}>${calculateTotalAmount()}</span>
        </h3>
      </div>

      {/* ── Action Buttons ── */}
      <div style={styles.actions}>
        <button
          style={styles.continueBtn}
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button
          style={styles.checkoutBtn}
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>

    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = {
  emptyWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    padding: "2rem",
    fontFamily: "'DM Sans', sans-serif",
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

  wrapper: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "2rem 1.5rem 4rem",
    fontFamily: "'DM Sans', sans-serif",
  },
  pageTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2.2rem",
    fontWeight: 700,
    color: "#1a2e1a",
    marginBottom: "1.75rem",
  },

  // Items list
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    marginBottom: "2rem",
  },
  cartItem: {
    display: "flex",
    gap: "1.25rem",
    background: "#ffffff",
    borderRadius: "14px",
    padding: "1.1rem",
    boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
    alignItems: "flex-start",
  },
  itemImg: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    objectFit: "cover",
    background: "#e8f0e4",
    flexShrink: 0,
  },
  itemDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  itemName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#1a2e1a",
    margin: 0,
  },
  itemUnitPrice: {
    fontSize: "0.88rem",
    color: "#666",
    margin: 0,
  },

  // Quantity row
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  qtyBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    border: "1.5px solid #2d5a27",
    background: "none",
    color: "#2d5a27",
    fontSize: "1.1rem",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  },
  qtyValue: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#1a2e1a",
    minWidth: "24px",
    textAlign: "center",
  },

  itemTotal: {
    fontSize: "0.9rem",
    color: "#444",
    margin: 0,
  },
  deleteBtn: {
    alignSelf: "flex-start",
    background: "#fff0ee",
    border: "1px solid #e8624a",
    color: "#e8624a",
    borderRadius: "6px",
    padding: "0.3rem 0.85rem",
    fontSize: "0.82rem",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: "0.2rem",
  },

  // Summary
  summary: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "1.25rem 1.5rem",
    boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  summaryTitle: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#444",
    margin: 0,
  },
  summaryValue: {
    color: "#2d5a27",
    fontWeight: 700,
  },

  // Buttons
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
    minWidth: "160px",
  },
};

export default CartItem;
