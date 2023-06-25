import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import "./styles/style.css";
type Props = {};

export default function Repositories({}: Props) {
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [perPage] = useState(10);
  const { user } = useAuth();

  const fetchRepositories = async () => {
    console.log("NEW DAATTAA");
    try {
      const token = user?.authToken;
      if (token) {
        const fetchUrl = `https://api.github.com/user/repos?page=${currentPage}&per_page=${perPage}`;
        const response = await fetch(fetchUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setRepositories(data);
        setLoading(false);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Log from Effect...");
    fetchRepositories();
  }, [currentPage]);

  const prevPage = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage((prevPage) => prevPage - 1);
    console.log("prev", currentPage);
  };
  const nextPage = () => {
    if (repositories.length < perPage) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
    console.log("prev", currentPage);
  };

  const calculateSerialNumber = (index: any) => {
    return (currentPage - 1) * perPage + index + 1;
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{
        border: "1px solid green",
        // margin: "10px",
        padding: "20px",
        borderRadius: "10px",
        width: "70%",
        margin: "auto",

        // margin:"10px"
      }}
    >
      <table className="table">
        <thead className="table-head">
          <tr>
            <th scope="col">S.NO</th>
            <th scope="col">Repositories</th>
            <th scope="col">Description</th>
            <th scope="col">Created At</th>
            <th scope="col">Visibility</th>
          </tr>
        </thead>

        <tbody>
          {repositories.map((repo: any, index) => (
            <tr key={index}>
              <th scope="row">{calculateSerialNumber(index)}</th>
              <td>{repo.name}</td>
              <td>
                {repo.description === null
                  ? "Description Not Available"
                  : repo.description}
              </td>
              <td>{repo.updated_at}</td>
              <td>{repo.visibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className=" btn btn-prev" onClick={prevPage}>
        Previous Page
      </button>
      <button className="btn btn-next" onClick={nextPage}>
        Next Page
      </button>
    </div>
  );
}
