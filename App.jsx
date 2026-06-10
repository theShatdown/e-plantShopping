import React, { useState } from "react";
import "./App.css";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showAbout, setShowAbout]       = useState(false);
  const [cartOpen, setCartOpen]         = useState(false);
  const [cartItems, setCartItems]       = useState([]);

  // ── Cart helpers ──────────────────────────────────
  const totalQty = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = (plant) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === plant.id);
      if (existing) {
        return prev.map((i) =>
          i.id === plant.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const totalCost = cartItems
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  // ── Navigation helpers ────────────────────────────
  const goHome = () => {
    setShowProducts(false);
    setShowAbout(false);
  };

  return (
    <div className="App">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a className="navbar-brand" href="#top" onClick={goHome}>
          <span>🌿</span> Paradise Nursery
        </a>

        <ul className="navbar-links">
          <li>
            <a href="#top" onClick={(e) => { e.preventDefault(); goHome(); }}>
              Home
            </a>
          </li>
          <li>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                setShowProducts(true);
                setShowAbout(false);
              }}
            >
              Plants
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                setShowAbout(true);
                setShowProducts(false);
              }}
            >
              About Us
            </a>
          </li>
        </ul>

        <button className="cart-icon-btn" onClick={() => setCartOpen(true)}>
          🛒 <span className="cart-badge">{totalQty}</span>
        </button>
      </nav>

      {/* ── LANDING PAGE ── */}
      {!showProducts && !showAbout && (
        <section className="landing-page" id="top">
          <div className="landing-content">
            <p className="landing-eyebrow">Welcome to</p>

            {/* Company Name */}
            <h1 className="landing-title">
              Paradise<br />Nursery
            </h1>

            <p className="landing-subtitle">
              Rare &amp; everyday plants, thoughtfully grown.<br />
              Find your perfect green companion today.
            </p>

            {/* Get Started button */}
            <button
              className="landing-cta"
              onClick={() => {
                setShowProducts(true);
                setShowAbout(false);
              }}
            >
              Get Started
            </button>
          </div>
        </section>
      )}

      {/* ── PRODUCTS PAGE ── */}
      {showProducts && (
        <section className="products-section" id="products">
          <h2 className="products-heading">Our Collection</h2>
          <p className="products-subheading">
            Hand-picked plants for every space and skill level
          </p>
          <ProductList cartItems={cartItems} onAddToCart={addToCart} />
        </section>
      )}

      {/* ── ABOUT PAGE ── */}
      {showAbout && <AboutUs />}

      {/* ── CART SIDEBAR ── */}
      {cartOpen && (
        <>
          <div
            className="cart-overlay open"
            onClick={() => setCartOpen(false)}
          />
          <div className="cart-sidebar open">
            <div className="cart-header">
              <h3>🛒 Your Basket</h3>
              <button
                className="cart-close"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <span>🪴</span>
                  <p>Your basket is empty</p>
                  <small>Add some plants to get started!</small>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={() => increaseQty(item.id)}
                    onDecrease={() => decreaseQty(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <strong>${totalCost}</strong>
                </div>
                <button className="checkout-btn">
                  Proceed to Checkout
                </button>
                <button
                  className="continue-btn"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default App;
