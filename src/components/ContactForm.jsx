import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const ContactInfo = () => {
  const contactDetails = {
    email: 'adriancubcru@gmail.com',
    phone: '+1 (626) 888-2374',
    socials: [
      {
        name: 'GitHub',
        url: 'https://github.com/adriancubillos',
        icon: CodeBracketIcon
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/adrian-cubillos',
        icon: UserCircleIcon
      },
      {
        name: 'Portfolio',
        url: 'https://portfolio-snowy-seven-70.vercel.app',
        icon: GlobeAltIcon
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Contact Methods */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
          <EnvelopeIcon className="w-6 h-6" />
          <a href={`mailto:${contactDetails.email}`} className="hover:text-primary transition-colors">
            {contactDetails.email}
          </a>
        </div>
        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
          <PhoneIcon className="w-6 h-6" />
          <a href={`tel:${contactDetails.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-primary transition-colors">
            {contactDetails.phone}
          </a>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-8">
        {contactDetails.socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
              aria-label={social.name}
            >
              <Icon className="w-8 h-8 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors" />
              <span className="mt-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>

      <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
        Feel free to reach out through any of these channels!
      </p>
    </motion.div>
  );
};

export default ContactInfo;
