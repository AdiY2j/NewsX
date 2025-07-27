import React from 'react'

const Card = ({ data }) => {
    return (
        <div>
            {
                <div className="container mt-4">
                    <div className="row">
                        {data.map((article, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card h-100">
                                    <img src={article.urlToImage} className="card-img-top" alt="News" />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.description}</p>
                                        <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

        </div>

    )
}

export default Card