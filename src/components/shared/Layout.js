import Header from "./Header";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
