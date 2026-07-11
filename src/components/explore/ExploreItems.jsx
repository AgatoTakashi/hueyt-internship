import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  
  const[loading, setLoading] = useState(false);
  const[response, setResponse] = useState([]);

  async function getData() {
    setLoading(true)
    const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)

    setResponse(res.data || [])
    setLoading(false)
  }

  useEffect(()=>{
      getData();
    },[])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ?
          new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
             <div className="nft__item skeleton">
                <div className="author_list_pp">
                  <div className="skeleton-circle"></div>
                </div>

                <div className="nft__item_wrap">
                  <div className="skeleton-rect"></div>
                </div>

                <div className="nft__item_info">
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                </div>
              </div>
            </div>
          ))
        :
          response.map((elem, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={elem.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {!elem.expiryDate? "" : <Countdown expiry={elem.expiryDate} /> }

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img src={elem.nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{elem.title}</h4>
                  </Link>
                  <div className="nft__item_price">{elem.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{elem.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
      }
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
