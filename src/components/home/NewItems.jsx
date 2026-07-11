import { useState, useEffect } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import NftCard from "../UI/NFTCard";
import SkeletonNftCard from "../UI/SkeletonNFTCard";

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  async function getData() {
    const res = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(res.data || []);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          {loading ? (
            <div className="row">
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <SkeletonNftCard />
                </div>
              ))}
            </div>
          ) : (
            <OwlCarousel
              className="owl-theme"
              loop
              nav
              lazyLoad
              items={4}
              dots={false}
              margin={10}
              responsive={{
                400: { items: 1 },
                640: { items: 2 },
                768: { items: 3 },
                1000: { items: 4 },
              }}
            >
              {items.map((item, index) => (
                <div key={index}>
                  <NftCard item={item} />
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
