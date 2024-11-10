import React from 'react';
import '../static/Table.css';


const Table = () => {
    const data = [
        { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
        { id: 3, name: 'Michael Johnson', age: 35, email: 'michael@example.com' }
    ];

    return (
        <div className="table-container">
            {/* Toolbar */}
            <div className="toolbar">
                <button className="toolbar-button" title="Download">
                    ↓
                </button>
                <button className="toolbar-button" title="Edit">
                    ✎
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
