import { motion } from 'framer-motion';

const SkillCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="card hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-12 h-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default SkillCard;
