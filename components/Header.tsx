import dynamic from "next/dynamic";
import Container from "./Container";

const ThemeButton = dynamic(() => import("./ThemeButton").then((mod) => mod), {
  ssr: false,
});

const Header = () => {
  return (
    <header className="p-4">
      <Container>
        <ThemeButton />
      </Container>
    </header>
  );
};

export default Header;
