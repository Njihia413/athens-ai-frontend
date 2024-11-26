import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import fetchWithAuth from "../../../../utils/FetchWithAuth";
import {format} from "date-fns";
import {userContext} from "../../../../InitialPage/context/UserContext";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await fetchWithAuth(
            "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/staff",
            {}, user.token
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, []);

  // Filter to get only unverified users and limit to 4
  const unverifiedUsers = users
      .filter((user) => user.roles.includes("UnverifiedUser"))
      .slice(0, 4);

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
                  <th>Date Joined</th>
                  <th>Role</th>
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
                      <td>
                        {format(new Date(user.createdOn), 'MMMM dd, yyyy')}
                      </td>
                      <td>
                        <span
                            className="badge bg-inverse-primary"
                        >
                          {user.roles}
                        </span>
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
