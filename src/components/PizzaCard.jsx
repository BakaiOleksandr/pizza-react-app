import './PizzaCard.css';

export default function PizzaCard({pizza}) {
  return (
    <div className="pizza-container">
      <div className="pizza-img-container">
        <img src={pizza.image} alt={pizza.name} className="pizza-img" />
      </div>
      <div className="pizza-items-container">
        <h2 className="izza-h2">{pizza.name}</h2>
        <p className="pizza-ingredients">{pizza.ingredients.join(', ')}</p>
        <p className="pizza-price">{pizza.price} $</p>
        <button className="pizza-button">Add to Cart</button>
      </div>
    </div>
  );
}
