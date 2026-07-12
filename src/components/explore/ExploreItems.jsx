import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NFTCard from "../UI/NFTCard";
import SkeletonNftCard from "../UI/SkeletonNFTCard";

const ExploreItems = () => {
  
  const[loading, setLoading] = useState(false);
  const[items, setItems] = useState([]);
  const[visibleCount, setVisibleCount] = useState(8);
  const[filter, setFilter] = useState("")

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      );

      setItems(res.data || []);
      setLoading(false);
    };

    getData();
  }, [filter]);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" value={filter} onChange={(e) => setFilter(e.target.value)}>
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
             <SkeletonNftCard />
            </div>
          ))
        :
          items.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NFTCard item={item} />  
            </div>
          ))
      }
      {visibleCount < items.length 
        ? 
          <div className="col-md-12 text-center">
            <Link to="" id="loadmore" className="btn-main lead" onClick={() => setVisibleCount(prev => prev + 4)}>
              Load more
            </Link>
          </div>
        :
        ""
      }
      
    </>
  );
};

export default ExploreItems;
