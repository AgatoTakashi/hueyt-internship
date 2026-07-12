import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonItemDetails = () => {
  return (
    <>
      {/* Left: NFT Image */}
      <div className="col-md-6 text-center">
        <Skeleton height={450} borderRadius={12} />
      </div>

      {/* Right: NFT Info */}
      <div className="col-md-6">
        <div className="item_info">

          {/* Title */}
          <h2>
            <Skeleton width={280} height={32} />
          </h2>

          {/* Views + Likes */}
          <div className="item_info_counts d-flex gap-3 mb-3">
            <Skeleton width={90} height={22} />
            <Skeleton width={90} height={22} />
          </div>

          {/* Description */}
          <Skeleton count={4} height={18} />

          {/* Owner */}
          <div className="d-flex flex-row mt-4">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author d-flex align-items-center gap-3">
                <Skeleton circle width={55} height={55} />
                <Skeleton width={140} height={20} />
              </div>
            </div>
          </div>

          {/* Creator */}
          <div className="mt-4">
            <h6>Creator</h6>
            <div className="item_author d-flex align-items-center gap-3">
              <Skeleton circle width={55} height={55} />
              <Skeleton width={140} height={20} />
            </div>
          </div>

          {/* Price */}
          <div className="mt-4">
            <h6>Price</h6>
            <Skeleton width={120} height={35} />
          </div>

        </div>
      </div>
    </>
  );
};

export default SkeletonItemDetails;
