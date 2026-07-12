import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!authorId || authorId === "1") return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        const data = response.data?.[0] || response.data || {};
        setAuthorData(data);
        setFollowers((Number(data?.followers) || 0) + 1);
      } catch (error) {
        console.error("Failed to fetch author data", error);
        setAuthorData(null);
        setFollowers(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const profileLabel = loading ? "Loading..." : authorData?.authorName;
  const followerLabel = loading ? "Loading followers..." : `${followers} followers`;

  const handleClick = (event) => {
    event.preventDefault();
    if(!following) {
      setFollowers((prev) => prev + 1);
      setFollowing(!following);
    } else {
      setFollowers((prev) => prev - 1);
      setFollowing(!following);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex author-profile-skeleton">
                    <div className="de-flex-col">
                      <div className="profile_avatar author-profile-skeleton__avatar">
                        <div className="skeleton-circle"></div>

                        <div className="profile_name author-profile-skeleton__meta">
                          <div className="skeleton skeleton-title"></div>
                          <div className="skeleton skeleton-code"></div>
                          <div className="skeleton skeleton-code"></div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex author-profile-skeleton__follow">
                      <div className="de-flex-col">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-code"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData?.authorImage || AuthorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {profileLabel}
                            <span className="profile_username">{loading ? "" : authorData?.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {loading ? "" : authorData?.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{followerLabel}</div>
                        <Link to="#" className="btn-main" onClick={handleClick}>
                          {following? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} authorData={authorData} nftCollection={authorData?.nftCollection} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
