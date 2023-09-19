import SearchLayout from "../layouts/SearchLayout";
import Welcome from "../components/Welcome";
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div>
      <SearchLayout />
      <Welcome />
      <Veggie />
      <Popular />
    </motion.div>
  );
}
export default Home;
