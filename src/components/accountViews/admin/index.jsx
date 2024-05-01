import React from 'react'

const AdminView = ({ handleOpen }) => {
    const options = [
        { value: 'news', label: 'News' },
        { value: 'team', label: 'Teams' },
        { value: 'partners', label: 'Partners' },
        { value: 'portfolio', label: 'Portfolio' },
        { value: 'workedWith', label: 'Worked With' },
        { value: 'createNews', label: 'Create News' },
        { value: 'createTeam', label: 'Create Team' },
        { value: 'createPartner', label: 'Create Partner' },
        { value: 'createPortfolio', label: 'Create Portfolio' },
        { value: 'createWorkedWith', label: 'Create Worked With' },
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