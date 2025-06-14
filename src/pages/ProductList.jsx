import { Link } from "react-router"
import Card from "../components/Card"
import { products } from "../database"

export default function ProductList() {

  const cardElements = products.map(product => {
    return (
      <Card 
        key={product.id}
        author={product.author}
        title={product.title}
        price={product.price.lei}
        image={product.image}
      />
    )
  })

  return (
    <>
      {cardElements}
    </>
  );
}

