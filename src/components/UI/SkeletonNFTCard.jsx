const SkeletonNftCard = () => {
  return (
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
  );
};

export default SkeletonNftCard;
