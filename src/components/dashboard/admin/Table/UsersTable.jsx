import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          console.log(data);
        });
  }, []);

  // Filter to get only inactive users and limit to 4
  const unverifiedUsers = users.filter((user) => user.roles === "UnverifiedUser").slice(0, 4);

  return (
      <div className="col-md-6 d-flex">
        <div className="card card-table flex-fill">
          <div className="card-header">
            <h3 className="card-title mb-0">New Unverified Users</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table custom-table mb-0">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {unverifiedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <h2 className="table-avatar">
                          {user.firstName} {user.lastName}
                        </h2>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <div className="dropdown action-label">
                          <Link
                              to="#"
                              className="btn btn-white btn-sm btn-rounded"
                              aria-expanded="false"
                          >
                            <i className={`fa-regular fa-circle-dot text-${user.status === 'active' ? 'success' : 'danger'}`}></i>
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                          </Link>
                        </div>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <Link to="/admin/users">View all users</Link>
          </div>
        </div>
      </div>
  );
};

export default UsersTable;
