import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationStack = () => {
    const [notifications, setNotifications] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const maxVisibleNotifications = 2;
    const timeoutDuration = 10000;

    // Generate a new notification
    const addNotification = () => {
        const types = ['message', 'reminder', 'alert', 'other'];
        const type = types[Math.floor(Math.random() * types.length)];
        const notification = {
            id: Date.now(),
            type,
            title: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
            message: `This is a sample ${type} notification`,
            timestamp: new Date().toLocaleTimeString(),
        };

        setNotifications(prev => [notification, ...prev].slice(0, 10)); // Keep max 10 notifications
    };

    // Remove a notification by id
    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Auto-remove notifications after 8 seconds
    useEffect(() => {
        const timeouts = notifications.map(notification =>
            setTimeout(() => removeNotification(notification.id), timeoutDuration)
        );
        return () => timeouts.forEach(clearTimeout);
    }, [notifications]);

    // Get icon based on notification type
    const getIcon = (type) => {
        switch (type) {
            case 'message':
                return '💬';
            case 'reminder':
                return '⏰';
            case 'alert':
                return '⚠️';
            default:
                return '📱';
        }
    };

    return (
        <div className="relative w-full max-w-sm mx-auto">
            {/* Add Notification Button */}
            <button
                onClick={addNotification}
                className="mb-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
                Add Notification
            </button>

            {/* Collapse Toggle (shows when there are 3+ notifications) */}
            {notifications.length > maxVisibleNotifications && (
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="ml-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                >
                    {isCollapsed ? 'Show All' : 'Collapse'}
                </button>
            )}

            {/* Notifications Stack */}
            <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {notifications
                        .slice(0, isCollapsed ? maxVisibleNotifications : undefined)
                        .map((notification, index) => (
                            <motion.div
                                key={notification.id}
                                layout
                                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30
                                }}
                                className="relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl" role="img" aria-label={notification.type}>
                                        {getIcon(notification.type)}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {notification.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {notification.message}
                                        </p>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {notification.timestamp}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeNotification(notification.id)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>

                {/* Collapsed Indicator */}
                {isCollapsed && notifications.length > maxVisibleNotifications && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                        +{notifications.length - maxVisibleNotifications} more notifications
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default NotificationStack;
