import {useEffect, useMemo, useState} from 'react';
import PizzaCard from '../components/PizzaCard';
import './Menu.css';

export default function Menu({pizzas}) {
  //get list of all igredients
  const listOfIngredients = useMemo(() => {
    const newArrayOfIngredients = [].concat(
      ...pizzas.map((el) => el.ingredients)
    );
    console.log(`NEW ARRAY ${newArrayOfIngredients}`);
    const countItems = {};
    for (const item of newArrayOfIngredients) {
      countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
    }

    return Object.keys(countItems).filter((item) => countItems[item] > 1);
  }, [pizzas]);
  ////

  console.log(`INGREDIENTS ${listOfIngredients}`);
  //////

  //State
  const [pizzasState, setPizzasState] = useState([]);
  const [priceState, setPriceState] = useState(false);
  const [ingredientOfPizza, setIngredientOfPizza] = useState([]);
  const [priceActive, setPriceActive] = useState(false);

  ///

  // sorting Price High Low
  function PriceLow() {
    const sortedLow = [...pizzasState].sort((a, b) => a.price - b.price);
    setPizzasState(sortedLow);
  }
  function PriceHigh() {
    const sortedHigh = [...pizzasState].sort((a, b) => b.price - a.price);
    setPizzasState(sortedHigh);
  }
  ///

  //Price toggle
  const PriceOnToggle = () => {
    priceState ? PriceLow() : PriceHigh();
    setPriceState(!priceState);
    setPriceActive(true);
  };

  //Changing pizzas State on event
  useEffect(() => {
    setPizzasState(pizzas);
  }, [pizzas]);

  //MAPPED
  const mapped = pizzasState.map((pizza) => (
    <PizzaCard key={pizza.id} pizza={pizza} />
  ));

  //ToggleIngredient
  const ToggleIngredient = (ingredient) => {
    setIngredientOfPizza((prev) => {
      return prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient];
    });
  };
  //Filtering pizzas by ingredients
  useEffect(() => {
    let filtered = pizzas;

    if (ingredientOfPizza.length > 0) {
      filtered = pizzas.filter((pizza) =>
        ingredientOfPizza.every((ing) => pizza.ingredients.includes(ing))
      );
    }

    if (priceActive) {
      filtered = [...filtered].sort((a, b) =>
        priceState ? a.price - b.price : b.price - a.price
      );
    }

    setPizzasState(filtered);
  }, [ingredientOfPizza, pizzas, priceState, priceActive]);

  //////////////////////
  return (
    <>
      <div className="filters">Filters</div>

      <button className="btn price" onClick={PriceOnToggle}>
        Price {priceState ? 'Low→High' : 'High→Low'}
      </button>

      {/* REFRESH */}
      <button
        className="btn refresh"
        onClick={() => {
          setPizzasState([...pizzas]);
          setIngredientOfPizza([]);
          setPriceActive(false);
          setPriceState(false);
        }}
      >
        Refresh
      </button>
      {/* ///// */}

      <br></br>

      <div className="ingredients">Ingredients</div>
      {listOfIngredients.map((ingredient) => (
        <button
          className={`btn ${
            ingredientOfPizza.includes(ingredient) ? 'active' : ''
          }`}
          key={ingredient}
          onClick={() => ToggleIngredient(ingredient)}
        >
          {ingredient}
        </button>
      ))}
      <div className="found">Pizzas found: {pizzasState.length}</div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pizzasState.length > 0 ? (
          mapped
        ) : (
          <div className="found">Not found</div>
        )}
      </div>
    </>
  );
}
