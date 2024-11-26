import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import fetchWithAuth from "../../../../utils/FetchWithAuth";
import {userContext} from "../../../../InitialPage/context/UserContext";

const UsersTable = () => {
  const [datasources, setDataSources] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    const fetchDataSources = async () => {
      try {
        const data = await fetchWithAuth(
            "https://ragorganizationdev-buajg8e6bfcubwbq.canadacentral-01.azurewebsites.net/api/dataSources",
            {}, user.token
        );
        setDataSources(data);
      } catch (error) {
        console.error("Failed to fetch data sources:", error);
      }
    };

    fetchDataSources();
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
                  <th>Description</th>
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
                      <td>{datasource.description}</td>
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
