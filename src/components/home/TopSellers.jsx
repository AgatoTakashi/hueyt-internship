import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

  const[loading, setLoading] = useState(false);
  const[response, setResponse] = useState([]);

  async function getData() {
    setLoading(true)
    const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)

    setResponse(res.data || [])
    setLoading(false);
  }

  useEffect(()=>{
    getData();
  },[])


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ?
                  new Array(12).fill(0).map((_, index) => (
                    <div className="nft__item3 skeleton3" key={index}>
                      <div className="skeleton-circle3" />
                      <div className="nft__item_info3">
                        <div className="skeleton-text3" />
                        <div className="skeleton-text3 short3" />
                      </div>
                    </div>
                  ))
                :
                  response.map((elem, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${elem.authorId || elem.id || 1}`}>
                          <img
                            className="lazy pp-author"
                            src={elem.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{elem.authorName}</Link>
                        <span>{elem.price} ETH</span>
                      </div>
                    </li>
                  ))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
