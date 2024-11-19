import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersTable = () => {
  const [datasources, setDatasources] = useState([]);

  useEffect(() => {
    fetch("https://athens-ai-json-server-vercel.vercel.app/datasources")
        .then((response) => response.json())
        .then((data) => {
          setDatasources(data);
          console.log(data);
        });
  }, []);

  const displayedDatasources = datasources.slice(0, 4);

  return (
      <div className="col-md-6 d-flex">
        <div className="card card-table flex-fill">
          <div className="card-header">
            <h3 className="card-title mb-0">Recent Datasources</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table custom-table mb-0">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {displayedDatasources.map((datasource) => (
                    <tr key={datasource.id}>
                      <td>
                        <h2 className="table-avatar">
                          {datasource.name}
                        </h2>
                      </td>
                      <td>{datasource.type}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <Link to="/admin/datasources">View all datasources</Link>
          </div>
        </div>
      </div>
  );
};

export default UsersTable;
