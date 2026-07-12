import React from "react";
import NftCard from "../UI/NFTCard";
import SkeletonNftCard from "../UI/SkeletonNFTCard";

const AuthorItems = ({ authorId, authorData, nftCollection }) => {
  const items = Array.isArray(nftCollection) ? nftCollection : [];

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.length === 0
            ? new Array(4).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <SkeletonNftCard />
                </div>
              ))
            : items.map((item, index) => (
                <div
                  key={item.id || index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  <NftCard item={item} authorImage={authorData?.authorImage} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
