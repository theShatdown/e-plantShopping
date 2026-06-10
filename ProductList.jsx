import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

// ── Plant Data ────────────────────────────────────────────────
const plantsArray = [
  // Air Purifying Plants
  {
    category: "Air Purifying Plants",
    plants: [
      {
        id: "a1",
        name: "Peace Lily",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80",
        description: "Elegant white blooms that filter toxins. Thrives in low light — perfect for offices and bedrooms.",
        price: 18.99,
      },
      {
        id: "a2",
        name: "Spider Plant",
        image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&q=80",
        description: "Nearly indestructible and fast-growing. Produces cascading baby plants great for hanging baskets.",
        price: 12.99,
      },
      {
        id: "a3",
        name: "Snake Plant",
        image: "https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=400&q=80",
        description: "Releases oxygen at night making it ideal for bedrooms. Extremely drought-tolerant.",
        price: 22.99,
      },
      {
        id: "a4",
        name: "Pothos",
        image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&q=80",
        description: "A forgiving trailing vine that thrives in almost any light condition. Ideal for beginners.",
        price: 9.99,
      },
    ],
  },
  // Tropical Plants
  {
    category: "Tropical Plants",
    plants: [
      {
        id: "t1",
        name: "Monstera Deliciosa",
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80",
        description: "The iconic split-leaf plant. Bold, dramatic, and statement-making in any room.",
        price: 34.99,
      },
      {
        id: "t2",
        name: "Bird of Paradise",
        image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&q=80",
        description: "Stunning large paddle leaves that evoke a tropical getaway. Loves bright indirect light.",
        price: 54.99,
      },
      {
        id: "t3",
        name: "Philodendron Brasil",
        image: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=400&q=80",
        description: "Heart-shaped leaves with vibrant green and yellow variegation. A cheerful climber.",
        price: 19.99,
      },
      {
        id: "t4",
        name: "Calathea Orbifolia",
        image: "https://images.unsplash.com/photo-1618048976430-52e189570e34?w=400&q=80",
        description: "Stunning silver-striped leaves that move with the light — nicknamed the prayer plant.",
        price: 27.99,
      },
    ],
  },
  // Succulents & Cacti
  {
    category: "Succulents & Cacti",
    plants: [
      {
        id: "s1",
        name: "Echeveria",
        image: "https://images.unsplash.com/photo-1565711561500-49678a10a63f?w=400&q=80",
        description: "Rosette-forming succulent in dusty rose and green. Incredibly low maintenance.",
        price: 7.99,
      },
      {
        id: "s2",
        name: "Aloe Vera",
        image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80",
        description: "Nature's first-aid kit. Soothing gel for skin, striking architectural form for shelves.",
        price: 11.99,
      },
      {
        id: "s3",
        name: "Prickly Pear Cactus",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80",
        description: "A bold sculptural cactus with paddle-shaped pads. Thrives on neglect and sunshine.",
        price: 14.99,
      },
      {
        id: "s4",
        name: "Haworthia",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80",
        description: "Compact, zebra-patterned succulent perfect for tiny spaces and low-light corners.",
        price: 8.99,
      },
    ],
  },
];

// ── ProductList Component ─────────────────────────────────────
function ProductList() {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Track which items have been added (for button state)
  const [addedItems, setAddedItems] = useState({});

  // Check if a plant is already in the cart
  const isInCart = (id) => cartItems.some((item) => item.id === id);

  // Handle Add to Cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => ({ ...prev, [plant.id]: true }));
  };

  return (
    <div style={styles.wrapper}>
      {plantsArray.map((category) => (
        <div key={category.category} style={styles.categoryBlock}>

          {/* Category Title */}
          <h2 style={styles.categoryTitle}>{category.category}</h2>

          {/* Plant Cards Grid */}
          <div style={styles.grid}>
            {category.plants.map((plant) => {
              const inCart = isInCart(plant.id);
              return (
                <div key={plant.id} style={styles.card}>

                  {/* Plant Image */}
                  <div style={styles.imgWrap}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={styles.img}
                    />
                  </div>

                  {/* Plant Info */}
                  <div style={styles.info}>
                    <h3 style={styles.plantName}>{plant.name}</h3>
                    <p style={styles.plantDesc}>{plant.description}</p>
                    <p style={styles.plantPrice}>${plant.price.toFixed(2)}</p>
                  </div>

                  {/* Add to Cart Button */}
                  <div style={styles.actions}>
                    <button
                      style={{
                        ...styles.addBtn,
                        ...(inCart ? styles.addedBtn : {}),
                      }}
                      onClick={() => handleAddToCart(plant)}
                      disabled={inCart}
                    >
                      {inCart ? "✓ Added to Cart" : "Add to Cart"}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = {
  wrapper: {
    padding: "1rem 0",
  },
  categoryBlock: {
    marginBottom: "3rem",
  },
  categoryTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.7rem",
    fontWeight: 700,
    color: "#2d5a27",
    marginBottom: "1.25rem",
    paddingBottom: "0.5rem",
    borderBottom: "2px solid #e8f0e4",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.25s, box-shadow 0.25s",
  },
  imgWrap: {
    height: "170px",
    overflow: "hidden",
    background: "#e8f0e4",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  info: {
    padding: "0.9rem 1rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  plantName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#1a2e1a",
  },
  plantDesc: {
    fontSize: "0.78rem",
    color: "#777",
    lineHeight: 1.55,
    flex: 1,
  },
  plantPrice: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#7c5c3a",
    marginTop: "0.25rem",
  },
  actions: {
    padding: "0 1rem 1rem",
  },
  addBtn: {
    width: "100%",
    padding: "0.6rem",
    background: "#2d5a27",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.88rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  addedBtn: {
    background: "#e8f0e4",
    color: "#2d5a27",
    cursor: "default",
  },
};

export default ProductList;
