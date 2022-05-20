import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { GiCancel } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

const Github = () => {
  const [githubRepo, setgithubRepo] = useState([]);
  const [changePage, setchangePage] = useState(0);
  const [search, setsearch] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.github.com/search/repositories?q=created:%3E2021-08-13&sort=stars&order=desc&page=${changePage}`
      )
      .then((response) => {
        console.log(response.data["items"]);
        setgithubRepo(response.data["items"]);
      });
  }, []);
  const increment = () => {
    return setchangePage(changePage + 1);
  };
  console.log(changePage);
  return (
    <div>
      <center>
        <div className="navbar-header">Trending Repos</div>
      </center>
      <div className="navbar">
        <div className="pagination">
          <BsFillArrowLeftSquareFill className="react-icon" />{" "}
          <BsFillArrowRightSquareFill
            className="react-icon"
            onClick={increment}
          />
        </div>
        <div className="other-icons">
          <FaHome className="react-icon-home" />
        </div>
        <div className="search">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search this page"
            className="search-input"
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="repo-container">
        {githubRepo
          .filter((repository) => {
            if (search === "") {
              return repository;
            } else if (
              repository.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return repository;
            }
          })
          .map((repository) => {
            return (
              <>
                <div className="repo-list">
                  <img src={repository.owner.avatar_url} alt="User Image" />
                  <div className="repo-info">
                    <div className="repo-name">{repository.name}</div>
                    <div className="repo-description">
                      {repository.description}
                    </div>
                    <div className="repo-dets">
                      <div className="repo-stars">
                        Watchers: {repository.watchers}
                      </div>
                      <div className="repo-issues">
                        Forks: {repository.forks}
                      </div>
                      <div className="repo-time-interval">
                        Submitted {repository.created_at}
                      </div>
                    </div>
                  </div>
                </div>
                ;
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Github;
