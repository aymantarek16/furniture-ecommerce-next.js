import HomePage from "./home/page.jsx";

export const metadata = {
  title: "Furniture Store",
  description: "A simple furniture ecommerce application built with Next.js",
  icons: {
    icon: '/favicon.ico', 
  },
};


const Home = () => {
  return <HomePage />;
};

export default Home;

