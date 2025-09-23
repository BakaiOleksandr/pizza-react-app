import {useEffect, useState} from 'react';
import PizzaCard from '../components/PizzaCard';
import './Menu.css';

export default function Menu({pizzas}) {
  //get list of all igredients
  const newArrayOfIngredients = [].concat(
    ...pizzas.map((el) => el.ingredients)
  );
  const countItems = {};
  for (const item of newArrayOfIngredients) {
    countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
  }
  const listOfIngredients = Object.keys(countItems).filter(
    (item) => countItems[item] > 1
  );
  console.log(`NEW ARRAY ${newArrayOfIngredients}`);
  console.log(`INGREDIENTS ${listOfIngredients}`);
  //////

  //State
  const [pizzasState, setPizzasState] = useState([]);
  const [priceState, setPriceState] = useState(true);
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

  const PriceOnToggle = () => {
    priceState ? PriceLow() : PriceHigh();
    setPriceState(!priceState);
  };

  //Changing pizzas State on event
  useEffect(() => {
    setPizzasState(pizzas);
  }, [pizzas]);

  //MAPPED
  const mapped = pizzasState.map((pizza) => (
    <PizzaCard key={pizza.id} pizza={pizza} />
  ));

  //FilterIngredient
  const FilterIngredient = (ingredient) => {
    const filterIngredient = pizzas.filter((pizza) => {
      return pizza.ingredients.includes(ingredient);
    });
    setPizzasState(filterIngredient);
  };

  ////

  //////////////////////
  return (
    <>
      <div className="filters">Filters</div>

      <button className="btn price" onClick={PriceOnToggle}>
        Price {priceState ? 'Low→High' : 'High→Low'}
      </button>

      {/* REFRESH */}
      <button className="btn refresh" onClick={() => setPizzasState(pizzas)}>
        Refresh
      </button>
      {/* ///// */}

      <br></br>

      <div className="ingredients">Ingredients</div>
      {listOfIngredients.map((ingredient, index) => (
        <button
          className="btn"
          key={index}
          onClick={() => FilterIngredient(ingredient)}
        >
          {ingredient}
        </button>
      ))}

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mapped}
      </div>
    </>
  );
}
