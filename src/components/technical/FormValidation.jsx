import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircleIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/solid';

const FormValidation = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [touched, setTouched] = useState({});

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                if (!value) return 'Username is required';
                if (value.length < 3) return 'Username must be at least 3 characters';
                if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers and underscore';
                return '';

            case 'email':
                if (!value) return 'Email is required';
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email address';
                return '';

            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters';
                if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
                if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
                if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
                return '';

            case 'confirmPassword':
                if (!value) return 'Please confirm your password';
                if (value !== formData.password) return 'Passwords do not match';
                return '';

            default:
                return '';
        }
    };

    // Real-time validation
    useEffect(() => {
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            if (touched[field]) {
                const error = validateField(field, formData[field]);
                if (error) newErrors[field] = error;
            }
        });
        setErrors(newErrors);
    }, [formData, touched]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Touch all fields to show errors
        const touchAll = {};
        Object.keys(formData).forEach(field => {
            touchAll[field] = true;
        });
        setTouched(touchAll);

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Form is valid
            console.log('Form submitted:', formData);
            // Show success message
            setShowSuccess(true);
            // Reset form
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setTouched({});
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    };

    const inputClasses = (fieldName) => {
        return `w-full px-4 py-2 rounded-lg border-2 transition-colors duration-200 ${touched[fieldName] && errors[fieldName] ? 'border-red-500 focus:border-red-500' : touched[fieldName] && !errors[fieldName] ? 'border-green-500 focus:border-green-500' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'} bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none`;
    };

    const renderFieldIcon = (fieldName) => {
        if (!touched[fieldName]) return null;
        
        return errors[fieldName] ? (
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
        ) : (
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto relative">
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -top-12 left-0 right-0 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 p-3 rounded-lg text-center"
                    >
                        Form submitted successfully!
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Username field */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                </label>
                <div className="relative">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses('username')}
                        placeholder="Enter username"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {renderFieldIcon('username')}
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    {touched.username && errors.username && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.username}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Email field */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                </label>
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses('email')}
                        placeholder="Enter email"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {renderFieldIcon('email')}
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    {touched.email && errors.email && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.email}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Password field */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses('password')}
                        placeholder="Enter password"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {renderFieldIcon('password')}
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    {touched.password && errors.password && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.password}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Confirm Password field */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClasses('confirmPassword')}
                        placeholder="Confirm password"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {renderFieldIcon('confirmPassword')}
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    {touched.confirmPassword && errors.confirmPassword && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.confirmPassword}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg
                    hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    transition-colors duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Object.keys(errors).length > 0}
            >
                Submit
            </button>
        </form>
    );
};

export default FormValidation;
