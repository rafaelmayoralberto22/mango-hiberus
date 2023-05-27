import Link from "next/link";
import { FC } from "react";

const Home: FC<{ title: string }> = ({ title }) => {
  return (
    <header className="home">
      <h1>{title}</h1>
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
