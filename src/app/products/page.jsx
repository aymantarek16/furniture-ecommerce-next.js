import Products from "./Products"

export const metadata = {
  title: "Products",
  description: "Browse our collection of products",
};


export default function ServerWrapper() {
  return <Products />;
}
