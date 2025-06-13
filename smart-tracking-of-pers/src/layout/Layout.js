import React from "react";
import IBMHeader from "./IBMHeader";
import IBMFooter from "./IBMFooter";
import { Content } from "@carbon/react";

const Layout = ({ children }) => (
  <>
    <IBMHeader />
    <Content>{children}</Content>
    <IBMFooter />
  </>
);

export default Layout;
