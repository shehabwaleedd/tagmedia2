'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminView = ({ handleOpen }) => {
    const categories = {
        News: [
            { value: 'news', label: 'Manage News' },
            { value: 'createNews', label: 'Create News' },
        ],
        Teams: [
            { value: 'team', label: 'Manage Teams' },
            { value: 'createTeam', label: 'Create Team' },
        ],
        Partners: [
            { value: 'partners', label: 'Manage Partners' },
            { value: 'createPartner', label: 'Create Partner' },
        ],
        Portfolio: [
            { value: 'portfolio', label: 'Manage Portfolio' },
            { value: 'createPortfolio', label: 'Create Portfolio' },
        ],
        Series: [
            { value: 'workedWith', label: 'Manage Series' },
            { value: 'createWorkedWith', label: 'Create Worked With' },
        ],
        Services: [
            { value: 'services', label: 'Manage Services' },
            { value: 'createService', label: 'Create Service' },
        ],
        SEO: [
            { value: 'aboutPageSEO', label: 'About Page SEO' },
            { value: 'homePageSEO', label: 'Home Page SEO' },
            { value: 'servicesPageSEO', label: 'Services Page SEO' },
            { value: 'contactPageSEO', label: 'Contact Page SEO' },
            { value: 'newsPageSEO', label: 'News Page SEO' },
        ]
    };

    const [expanded, setExpanded] = useState(null);

    const handleItemClick = (value) => {
        handleOpen(value)();
    };

    const toggleCategory = (category) => {
        setExpanded(expanded === category ? null : category);
    };

    return (
        <div>
            {Object.entries(categories).map(([category, options]) => (
                <div key={category}>
                    <h2 onClick={() => toggleCategory(category)} style={{ cursor: 'pointer', padding: '8px' }}>
                        {category}
                    </h2>
                    <AnimatePresence>
                        {expanded === category && (
                            <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: 'hidden', listStyleType: 'none', padding: 0 }}
                            >
                                {options.map(option => (
                                    <li
                                        key={option.value}
                                        onClick={() => handleItemClick(option.value)}
                                        style={{ cursor: 'pointer', padding: '8px' }}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default AdminView;
