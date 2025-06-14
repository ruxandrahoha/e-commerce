import { useParams } from "react-router";

const ProductDetail = () => {
  const { productId } = useParams();
  return (
    <div className="bg-amber-800">
      <h1>Details for product {productId}</h1>
    </div>
  );
};

export default ProductDetail;
