import Link from "next/link";

const Home = () => {
  return (
    <header className="home">
      <h1>Mango - Hiberus Test</h1>
      <nav>
        <ul>
          <li>
            <Link href="/exercise1">Exercise 1</Link>
          </li>
          <li>
            <Link href="/exercise2">Exercise 2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Home;
