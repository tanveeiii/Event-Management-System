import React ,{useState,useEffect} from 'react';
import {Search, X} from 'lucide-react';
import '../static/Table.css';

const Table = ({data = [
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Michael Johnson', age: 35, email: 'michael@example.com' }
] }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const [newRow, setNewRow] = useState(null);
    const [searchStates, setSearchStates] = useState({
        name: { isSearching: false, value: '' },
        age: { isSearching: false, value: '' },
        email: { isSearching: false, value: '' }
    });
    const [filteredData, setFilteredData] = useState(data);

    // Update filtered data whenever search states or edited data changes
    useEffect(() => {
        let result = [...editedData];
        
        // Apply filters from all active search fields
        Object.entries(searchStates).forEach(([column, state]) => {
            if (state.value) {
                result = result.filter(item => {
                    const itemValue = item[column].toString().toLowerCase();
                    const searchValue = state.value.toLowerCase();
                    return itemValue.includes(searchValue);
                });
            }
        });
        
        setFilteredData(result);
    }, [searchStates, editedData]);

    // Toggle search for a specific column
    const toggleSearch = (column) => {
        setSearchStates(prev => ({
            ...prev,
            [column]: { 
                isSearching: !prev[column].isSearching,
                value: !prev[column].isSearching ? prev[column].value : ''
            }
        }));
        
        if (!searchStates[column].isSearching) {
            // Focus the input when opening search
            setTimeout(() => {
                const input = document.getElementById(`search-${column}`);
                if (input) input.focus();
            }, 0);
        }
    };

    // Handle search input changes
    const handleSearch = (column, value) => {
        setSearchStates(prev => ({
            ...prev,
            [column]: { ...prev[column], value }
        }));

        // // Filter the data based on all active searches
        // const newFilteredData = editedData.filter(item => {
        //     return Object.entries(searchStates).every(([col, state]) => {
        //         if (col === column) {
        //             // Use the new value for the current column
        //             return item[col].toString().toLowerCase().includes(value.toLowerCase());
        //         } else if (state.value) {
        //             // Use existing values for other columns
        //             return item[col].toString().toLowerCase().includes(state.value.toLowerCase());
        //         }
        //         return true;
        //     });
        // });

        // setFilteredData(newFilteredData);
    };

    // Handle edit button click
    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setNewRow(null);
        }
    };

    // Handle cell value changes
    const handleCellChange = (id, field, value) => {
        if (newRow && id === newRow.id) {
            setNewRow(prev => ({ ...prev, [field]: value }));
        } 
        else {
            setEditedData(prevData =>
                prevData.map(item =>
                    item.id === id ? { ...item, [field]: value } : item
                )
            );
        }
    };

    // Add new row
    const addRow = () => {
        setIsEditing(false);
        const newId = Math.max(...editedData.map(item => item.id),0) + 1;
        const emptyRow = {
            id: newId,
            name: '',
            age: '',
            email: ''
        };
        setNewRow(emptyRow);
    };

    // Save new row
    const saveNewRow = () => {
        if (newRow && newRow.name && newRow.age && newRow.email) {
            setEditedData([...editedData, newRow]);
            setEditedData(updatedData);
            setNewRow(null);
        }
    };

    // Cancel new row
    const cancelNewRow = () => {
        setNewRow(null);
    };

    // Delete row
    const deleteRow = (id) => {
        // setEditedData(editedData.filter(item => item.id !== id));
        const updatedData = editedData.filter(item => item.id !== id);
        setEditedData(updatedData);
    };

    // Render editable or static cell based on isEditing state
    const renderCell = (item, field) => {
        if ((isEditing && !newRow) || (newRow && item.id === newRow.id)) {
            return (
                <input
                    type={field === 'age' ? 'number' : 'text'}
                    value={item[field]}
                    onChange={(e) => handleCellChange(item.id, field, e.target.value)}
                    className="editable-cell"
                    // className="bg-transparent border-none border-b border-blue-400 text-gray-300 text-sm p-1 w-full outline-none"
                    placeholder={`Enter ${field}`}
                />
            );
        }
        return item[field];
    };

    // Render column header with search functionality
    const renderColumnHeader = (column, label) => {
        if (searchStates[column]?.isSearching) {
            return (
                <div className="header-search-container">
                    <input
                        id={`search-${column}`}
                        type="text"
                        value={searchStates[column].value}
                        onChange={(e) => handleSearch(column, e.target.value)}
                        className="header-search-input"
                        placeholder={`Search ${label}...`}
                    />
                    <button
                        className="header-search-close"
                        onClick={() => toggleSearch(column)}
                    >
                        <X size={16} />
                    </button>
                </div>
            );
        }
        return (
            <div className="header-content">
                <span>{label}</span>
                <button
                    className="header-search-icon"
                    onClick={() => toggleSearch(column)}
                >
                    <Search size={16} />
                </button>
            </div>
        );
    };

    return (
        <div className="table-container">
            {/* Toolbar */}
            <div className="toolbar">
            
                <button style={{fontSize:"18px", fontWeight:"bolder",position:"relative"}} className="toolbar-button" title="Download">
                    ⤓
                </button>
                <button 
                    className={`toolbar-button ${isEditing ? 'active' : ''}`} 
                    title={isEditing ? "Save" : "Edit"}
                    onClick={toggleEdit}
                >
                    {isEditing ? '✓' : '✎'}
                </button>
                
                <button 
                    className="toolbar-button" 
                    title="Add Row"
                    onClick={addRow}
                    disabled={newRow !== null} style={{fontSize:"26px"}}
                >
                    +
                </button>
                
            </div>

            {/* Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{renderColumnHeader('name','Name')}</th>
                        <th>{renderColumnHeader('age','Age')}</th>
                        <th>{renderColumnHeader('email','Email')}</th>
                        {(isEditing || newRow) && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{renderCell(item, 'name')}</td>
                            <td>{renderCell(item, 'age')}</td>
                            <td>{renderCell(item, 'email')}</td>
                            {isEditing && (
                                <td>
                                    <button 
                                        className="delete-button"
                                        onClick={() => deleteRow(item.id)}
                                        title="Delete Row"
                                    >
                                        ×
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    {newRow && (
                        <tr>
                            <td>{newRow.id}</td>
                            <td>{renderCell(newRow, 'name')}</td>
                            <td>{renderCell(newRow, 'age')}</td>
                            <td>{renderCell(newRow, 'email')}</td>
                            <td>
                                <button 
                                    className="save-button"
                                    onClick={saveNewRow}
                                    title="Save Row"
                                >
                                    ✓
                                </button>
                                <button 
                                    className="cancel-button"
                                    onClick={cancelNewRow}
                                    title="Cancel"
                                >
                                    ×
                                </button>
                            </td>
                        </tr>
                    )}      
                </tbody>
            </table>
        </div>
    );
};

export default Table;
