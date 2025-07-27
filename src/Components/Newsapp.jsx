import React, { useEffect, useState } from 'react'
import Card from './Card'

const Newsapp = () => {

    const API_KEY = '14c307e9c0cd4cddb8eaf33750ee3801';
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("home");
    const [loading, setLoading] = useState(false); // 👈 loading state

    useEffect(() => {
        getData(search)
    }, [])

    const getData = async (query) => {
    setLoading(true);
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        setNewsData(jsonData.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    } finally {
        setLoading(false);
    }
};


    const handleInput = (e) => {
        setSearch(e.target.value);
    }

    const handleCategoryClick = (category) => {
        console.log(category);
        setSearch(category);
        setSelectedCategory(category);
        getData(category);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">NewsX</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className={`nav-link ${selectedCategory === "home" ? "active" : ""}`} onClick={() => handleCategoryClick("india")}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${selectedCategory === "sports" ? "active" : ""}`} onClick={() => handleCategoryClick("sports")}>Sports</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${selectedCategory === "politics" ? "active" : ""}`} onClick={() => handleCategoryClick("politics")}>Politics</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${selectedCategory === "technology" ? "active" : ""}`} onClick={() => handleCategoryClick("technology")}>Tech</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${selectedCategory === "fashion" ? "active" : ""}`} onClick={() => handleCategoryClick("fashion")}>Fashion</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${selectedCategory === "health" ? "active" : ""}`} onClick={() => handleCategoryClick("health")}>Health</a>
                        </li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0">
                        <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={handleInput}
                        />
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="button"
                            onClick={() => {
                                setSelectedCategory(""); // clear nav highlight
                                getData(search);
                            }}
                        >
                            Search
                        </button>
                    </form>
                </div>
            </nav>

            <div className="container mt-4">
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div>Fetching news...</div>
                    </div>
                ) : (
                    newsData && <Card data={newsData} />
                )}
            </div>
        </div>
    )
}

export default Newsapp
