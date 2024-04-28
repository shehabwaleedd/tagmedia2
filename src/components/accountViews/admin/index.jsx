import React from 'react'

const AdminView = ({ handleOpen }) => {
    const options = [
        { value: 'news', label: 'News' },
        { value: 'createNews', label: 'Create News' },
    ];

    const handleSelectChange = (e) => {
        const value = e.target.value;
        handleOpen(value)();
    }

    return (
        <select onChange={handleSelectChange}>
            <option value="">Select View</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default AdminView