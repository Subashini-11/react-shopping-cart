import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 1999, emoji: "⌚" },
  { id: 3, name: "Running Shoes", price: 2499, emoji: "👟" },
  { id: 4, name: "Backpack", price: 999, emoji: "🎒" },
  { id: 5, name: "Sunglasses", price: 599, emoji: "🕶️" },
  { id: 6, name: "Camera", price: 4999, emoji: "📷" }
];

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function changeQuantity(id, amount) {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="navbar">
        <h1>🛍️ ShopEase</h1>
        <a href="#cart">My Cart ({totalItems})</a>
      </header>

      <section className="hero">
        <p className="tagline">YOUR EVERYDAY SHOPPING DESTINATION</p>
        <h2>Find Your Favorites</h2>
        <p>Discover great products at great prices.</p>
      </section>

      <main className="content">
        <section className="products-section">
          <h2>Featured Products</h2>

          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">{product.emoji}</div>
                <h3>{product.name}</h3>
                <p className="price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="cart-section" id="cart">
          <h2>🛒 Your Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Add a product!</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>₹{item.price.toLocaleString("en-IN")} each</p>
                </div>

                <div className="quantity">
                  <button onClick={() => changeQuantity(item.id, -1)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="total">
            <span>Total Amount</span>
            <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
          </div>

          <button
            className="checkout"
            disabled={cart.length === 0}
            onClick={() => alert("Thank you for shopping with ShopEase!")}
          >
            Proceed to Checkout
          </button>
        </section>
      </main>

      <footer>© 2026 ShopEase | React Shopping Cart Project</footer>
    </div>
  );
}

export default App;