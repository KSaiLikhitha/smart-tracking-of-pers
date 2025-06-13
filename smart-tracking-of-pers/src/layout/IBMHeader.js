import React from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import { Search, Chat, UserAvatar } from "@carbon/icons-react";

const IBMHeader = () => (
  <Header aria-label="IBM Platform Name">
    <HeaderName href="/" prefix="IBM">
      &nbsp;
    </HeaderName>
    <HeaderNavigation aria-label="IBM Navigation">
      <HeaderMenu aria-label="AI" menuLinkName="AI">
        <HeaderMenuItem href="#">Watson</HeaderMenuItem>
      </HeaderMenu>
      <HeaderMenu aria-label="Hybrid Cloud" menuLinkName="Hybrid Cloud">
        <HeaderMenuItem href="#">Red Hat</HeaderMenuItem>
      </HeaderMenu>
      <HeaderMenu aria-label="Products" menuLinkName="Products">
        <HeaderMenuItem href="#">All Products</HeaderMenuItem>
      </HeaderMenu>
      <HeaderMenuItem href="#">Consulting</HeaderMenuItem>
      <HeaderMenu aria-label="Support" menuLinkName="Support">
        <HeaderMenuItem href="#">Tech Support</HeaderMenuItem>
      </HeaderMenu>
      <HeaderMenuItem href="#">Think</HeaderMenuItem>
    </HeaderNavigation>
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="Search">
        <Search />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="Messages">
        <Chat />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="Account">
        <UserAvatar />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </Header>
);

export default IBMHeader;
