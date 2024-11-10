import React ,{useState} from 'react';
import '../static/Table.css';


const Table = ({data = [
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Michael Johnson', age: 35, email: 'michael@example.com' }
] }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const [newRow, setNewRow] = useState(null);

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
            setNewRow(null);
        }
    };

    // Cancel new row
    const cancelNewRow = () => {
        setNewRow(null);
    };

    // Delete row
    const deleteRow = (id) => {
        setEditedData(editedData.filter(item => item.id !== id));
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
                    placeholder={`Enter ${field}`}
                />
            );
        }
        return item[field];
    };

    return (
        <div className="table-container">
            {/* Toolbar */}
            <div className="toolbar">
                <button className="toolbar-button" title="Download">
                    ↓
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
                    disabled={newRow !== null}
                >
                    +
                </button>
                
            </div>

            {/* Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        {(isEditing || newRow) && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {editedData.map((item) => (
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
