import Welcome from "../components/Welcome";
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div>
      <Welcome />
      <Veggie />
      <Popular />
    </motion.div>
  );
}
export default Home;
