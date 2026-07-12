import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {

  const[loading, setLoading] = useState(false);
  const[response, setResponse] = useState([]);

  async function getData() {
    setLoading(true)
    const res = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)

    setResponse(res.data || [])
    setLoading(false);
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading
            ? 
              new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft_coll skeleton-nft">
                      <div className="nft_wrap">
                        <div className="skeleton skeleton-img"></div>
                      </div>

                      <div className="nft_coll_pp">
                        <div className="skeleton skeleton-author"></div>
                        <i className="fa fa-check skeleton-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-code"></div>
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
                  <div className="" key={index} >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${elem.nftId}`}>
                          <img src={elem.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${elem.authorId || elem.id || 1}`}>
                          <img className="lazy pp-coll" src={elem.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{elem.title}</h4>
                        </Link>
                        <span>ERC-{elem.code}</span>
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

export default HotCollections;
