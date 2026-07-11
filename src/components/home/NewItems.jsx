import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Countdown from '../UI/Countdown'

const NewItems = () => {

  const[loading2, setLoading2] = useState(false);
  const[response, setResponse] = useState([]);

    async function getData() {
    setLoading2(true)
    const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)

    setResponse(res.data || [])
    setLoading2(false);
  }

  useEffect(()=>{
    getData();
  },[])


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading2
            ?
                  new Array(4).fill(0).map((_, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
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
              <OwlCarousel className='owl-theme' loop nav lazyLoad items={4} dots={false} margin={10}
                responsive={{
                  400: {
                    items: 1,
                  },
                  640: {
                    items: 2,
                  },
                  768: {
                    items: 3,
                  },
                  1000: {
                    items: 4,
                  },
                }} >
                {response.map((elem, index) => (
                  <div className="" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
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
                          <img
                            src={elem.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
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
                ))}
              </OwlCarousel>
          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;