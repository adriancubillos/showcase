import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

const AccessibilityDemo = () => {
    const [selectedSection, setSelectedSection] = useState('article');
    const [hoveredExample, setHoveredExample] = useState(null);
    
    const contrastExamples = [
        { bg: 'bg-gray-900', text: 'text-gray-100', ratio: '16:1', pass: true },
        { bg: 'bg-blue-600', text: 'text-white', ratio: '4.5:1', pass: true },
        { bg: 'bg-red-200', text: 'text-red-800', ratio: '7:1', pass: true },
        { bg: 'bg-yellow-100', text: 'text-gray-700', ratio: '4.8:1', pass: true },
        { bg: 'bg-gray-100', text: 'text-gray-400', ratio: '2.5:1', pass: false },
        { bg: 'bg-blue-200', text: 'text-blue-300', ratio: '1.5:1', pass: false },
    ];

    // Bad example (div soup)
    const BadExample = () => (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-bold mb-2">Blog Post Title</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                By John Doe • 5 min read
            </div>
            <div className="space-y-4">
                <div>This is a paragraph of text that should be semantic...</div>
                <div onClick={() => {}} className="cursor-pointer text-blue-500">
                    Click me
                </div>
            </div>
            <div className="mt-4 flex gap-2">
                <div onClick={() => {}} className="cursor-pointer">👍</div>
                <div onClick={() => {}} className="cursor-pointer">💬</div>
            </div>
        </div>
    );

    // Good example (semantic HTML)
    const GoodExample = () => (
        <article className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <header>
                <h2 className="text-lg font-bold mb-2">Blog Post Title</h2>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                    <span>By</span>
                    <address className="inline font-normal m-0">John Doe</address>
                    <span>•</span>
                    <time dateTime="PT5M">5 min read</time>
                </div>
            </header>
            <main className="space-y-4">
                <p>This is a paragraph of text that should be semantic...</p>
                <button 
                    className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    onClick={() => {}}
                >
                    Click me
                </button>
            </main>
            <footer className="mt-4 flex gap-2">
                <button
                    aria-label="Like post"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {}}
                >
                    👍
                </button>
                <button
                    aria-label="Comment on post"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {}}
                >
                    💬
                </button>
            </footer>
        </article>
    );

    return (
        <div className="space-y-8">
            {/* Section Tabs */}
            <nav className="flex gap-4" role="tablist" aria-label="Accessibility examples">
                <button
                    role="tab"
                    aria-selected={selectedSection === 'article'}
                    aria-controls="article-panel"
                    id="article-tab"
                    className={`px-4 py-2 rounded-lg transition-colors ${selectedSection === 'article' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
                    onClick={() => setSelectedSection('article')}
                >
                    Semantic HTML
                </button>
                <button
                    role="tab"
                    aria-selected={selectedSection === 'contrast'}
                    aria-controls="contrast-panel"
                    id="contrast-tab"
                    className={`px-4 py-2 rounded-lg transition-colors ${selectedSection === 'contrast' ? 'bg-primary text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
                    onClick={() => setSelectedSection('contrast')}
                >
                    Contrast Ratios
                </button>
            </nav>

            {/* Semantic HTML Section */}
            <section
                role="tabpanel"
                id="article-panel"
                aria-labelledby="article-tab"
                className={selectedSection === 'article' ? 'block' : 'hidden'}
            >
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Bad Example */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-red-500">
                            <ExclamationTriangleIcon className="w-5 h-5" />
                            <h3 className="font-medium">Non-Semantic Example</h3>
                        </div>
                        <BadExample />
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                            <li>• Excessive use of div elements</li>
                            <li>• Missing semantic structure</li>
                            <li>• Poor keyboard accessibility</li>
                            <li>• No ARIA attributes</li>
                        </ul>
                    </div>

                    {/* Good Example */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-500">
                            <CheckCircleIcon className="w-5 h-5" />
                            <h3 className="font-medium">Semantic Example</h3>
                        </div>
                        <GoodExample />
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                            <li>• Proper HTML5 semantic elements</li>
                            <li>• Clear document structure</li>
                            <li>• Keyboard accessible</li>
                            <li>• Proper ARIA labels</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Contrast Section */}
            <section
                role="tabpanel"
                id="contrast-panel"
                aria-labelledby="contrast-tab"
                className={selectedSection === 'contrast' ? 'block' : 'hidden'}
            >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {contrastExamples.map((example, index) => (
                        <div
                            key={index}
                            className={example.bg + ' rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px]'}
                        >
                            <p className={example.text + ' text-center mb-2'}>
                                Sample Text
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={example.text + ' text-sm'}>
                                    {example.ratio}
                                </span>
                                {example.pass ? (
                                    <CheckCircleIcon className={example.text + ' w-4 h-4'} />
                                ) : (
                                    <ExclamationTriangleIcon className={example.text + ' w-4 h-4'} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                        <InformationCircleIcon className="w-5 h-5 text-blue-500" />
                        <h3 className="font-medium text-gray-900 dark:text-white">
                            WCAG Contrast Requirements
                        </h3>
                    </div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li>• Normal text: minimum 4.5:1 ratio</li>
                        <li>• Large text: minimum 3:1 ratio</li>
                        <li>• UI components and graphics: minimum 3:1 ratio</li>
                        <li>• AAA level requires 7:1 for normal text</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default AccessibilityDemo;
