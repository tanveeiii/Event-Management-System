import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import '../static/Table.css';
import { Form } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Table = ({ tableData }) => {

    const data = tableData["data"]
    const api = tableData["api"]
    const team = tableData["team"]
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const [newRow, setNewRow] = useState(null);
    const [searchStates, setSearchStates] = useState({});
    const [filteredData, setFilteredData] = useState(data);
    const [imageFile, setImageFile] = useState(null);
    console.log(data)
    const isCoreTeam = team === 'Core';

    console.log(api)
    useEffect(() => {
        let result = [...editedData];
        Object.entries(searchStates).forEach(([column, state]) => {
            if (state?.value) {
                result = result.filter((item) => {
                    const itemValue = item[column]?.toString().toLowerCase();
                    const searchValue = state.value.toLowerCase();
                    return itemValue?.includes(searchValue);
                });
            }
        });

        setFilteredData(result);
    }, [searchStates, editedData]);

    useEffect(() => {
        setEditedData(data);
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
    }, [editedData])
    

    const notify = (message)=>{
        toast(message) 
    }

    const deleteRowFromServer = async (id) => {
        try {
            console.log(api)
            const body = {
                "id": id,
            }
            console.log(body)
            const res = await fetch(api, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            console.log(res)

            if (res.ok) {
                setEditedData((prevData) => prevData.filter((item) => item.id !== id));
            } else {
                console.error("Failed to delete row from server.");
            }
        } catch (error) {
            console.error("Failed to delete row:", error);
        }
    };

    const addRowToServer = async () => {
        setIsEditing(false);
        console.log(editedData)
        const newId = Math.max(...editedData.map((item, index) => {
            return index
        }), 0) + 1;
        let emptyRow = {};
        for (let key in editedData[0]) emptyRow[key] = '';
        setNewRow(emptyRow);
        if (!newRow) {
            console.log("no new row found")
            return
        };
    };

    const toggleSearch = (column) => {
        setSearchStates(prev => ({
            ...prev,
            [column]: {
                isSearching: !prev[column]?.isSearching,
                value: !prev[column]?.isSearching ? '' : prev[column]?.value
            }
        }));

        if (!searchStates[column]?.isSearching) {

            setTimeout(() => {
                const input = document.getElementById(`search-${column}`);
                if (input) input.focus();
            }, 0);
        }
    };

    const handleSearch = (column, value) => {
        setSearchStates(prev => ({
            ...prev,
            [column]: { ...prev[column], value }
        }));
    };
    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setNewRow(null);
        }
    };
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


    const saveNewRow = async () => {
        console.log(newRow)
        if (newRow && Object.values(newRow).every(value => value !== '')) {
            console.log(newRow)
            let res;
            try {

                if (imageFile) {
                    const formData = new FormData();
                    Object.keys(newRow).forEach(key => {
                        formData.append(key, newRow[key]);
                    });
                    console.log(formData)
                    res = await fetch(api, {
                        method: "POST",
                        body: formData
                    })
                    const resData = await res.json()
                    console.log(resData)
                    if(resData['status'] = 'failure'){
                        const message = resData['message']
                        notify(message)
                        return (
                            <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition:Bounce
                        />
                        )
                    }
                } else {
                    res = await fetch(api, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newRow)
                    })
                    const resData = await res.json()
                    console.log(resData)
                    if(resData['status'] = 'failure'){
                        const message = resData['message']
                        notify(message)
                        return (
                            <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition:Bounce
                        />
                        )
                    }
                }
            } catch (e) {
                console.log(e)
            }
            const updatedData = [...editedData, newRow];
            setEditedData(updatedData);
            setNewRow(null);
            setImageFile(false)
        } else {
            const message = "Please fill in all fields before saving"
            notify(message)
            return(
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            )
        }
    };


    const cancelNewRow = () => {
        setNewRow(null);
    };

    const renderCell = (item, field) => {
        const value = item[field];
        if (field === 'image') {
            if (value && (!isEditing || (newRow && item.id !== newRow.id))) {
                return <img src={value} alt="row-image" style={{ width: '50px', height: '50px' }} />;
            }
            console.log(isEditing, newRow, item.id)
            console.log("hello")
            return (
                <input
                    type="file"
                    accept='image/*'
                    placeholder='choose image'
                    onChange={(e) => {
                        console.log('File selected', e.target.files[0]);
                        handleImageChange(item.id, field, e.target.files[0])
                    }}
                    className="editable-cell"
                />
            );
        }

        if (typeof value === 'object' && value !== null) {
            return (
                <div>
                    {Object.entries(value).map(([key, val]) => (
                        <div key={key}>
                            <strong>{key}:</strong> {val}
                        </div>
                    ))}
                </div>
            );
        }

        if ((isEditing && !newRow) || (newRow && item.id === newRow.id)) {
            return (
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleCellChange(item.id, field, e.target.value)}
                    className="editable-cell"
                    placeholder={`Enter ${field}`}
                />
            );
        }
        return item[field];
    };

    const handleImageChange = (id, field, file) => {
        setImageFile(true)
        newRow['image'] = file
    };

    const downloadCSV = () => {
        const headers = Object.keys(data[0]);
        const rows = filteredData.map(row => headers.map(header => `"${row[header] || ''}"`).join(','));

        // Combine headers and rows
        const csvContent = [headers.join(','), ...rows].join('\n');

        // Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create a link to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "table_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderColumnHeader = (column, label) => {
        if (searchStates[column]?.isSearching) {
            return (
                <div className="header-search-container">
                    <input
                        id={`search-${column}`}
                        type="text"
                        value={searchStates[column]?.value || ''}
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

                <button style={{ fontSize: "18px", fontWeight: "bolder", position: "relative" }} className="toolbar-button" title="Download" onClick={() => downloadCSV()}>
                    ⤓
                </button>
                {isCoreTeam && (
                    <>
                        <button
                            className={`toolbar-button ${isEditing ? 'active' : ''}`}
                            title={isEditing ? "Save" : "Edit"}
                            onClick={toggleEdit}
                        >
                            {isEditing ? '✓' : '✘'}
                        </button>

                        <button
                            className="toolbar-button"
                            title="Add Row"
                            onClick={() => addRowToServer()}
                            disabled={newRow !== null} style={{ fontSize: "26px" }}
                        >
                            +
                        </button>
                    </>)}

            </div>

            {/* Table */}
            <div className="table1">
                <table className="table">
                    <thead>
                        <tr>
                            {Object.keys(data[0] || {}).map((column) => (
                                <th key={column}>{renderColumnHeader(column, column.charAt(0).toUpperCase() + column.slice(1))}</th>
                            ))}
                            {(isEditing || newRow) && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id}>
                                {Object.keys(item).map((field) => (
                                    <td key={field}>{renderCell(item, field)}</td>
                                ))}
                                {isEditing && (
                                    <td>
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteRowFromServer(item.id)}
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
                                {Object.keys(newRow).map((field) => (
                                    <td key={field}>
                                        {field === 'image' ? (
                                            <input
                                                type="file"
                                                onChange={(e) => handleImageChange(newRow.id, field, e.target.files[0])}
                                                accept='image/*'
                                            />
                                        ) : (
                                            renderCell(newRow, field)
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <button className="save-button" onClick={saveNewRow}>✓</button>
                                    <button className="cancel-button" onClick={cancelNewRow}>×</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;


