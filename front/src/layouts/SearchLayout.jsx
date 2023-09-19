import { Outlet } from "react-router-dom";
import Category from "../components/Category";
import Search from "../components/Search";

const SearchLayout = () => {
  return (
    <>
      <Search />
      <Category />
      <Outlet />
    </>
  );
};
export default SearchLayout;
