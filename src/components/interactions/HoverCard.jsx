import { motion } from "framer-motion";

const HoverCard = ({ children }) => {
    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.div>
    );
};

export default HoverCard;