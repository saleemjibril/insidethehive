import { Suspense } from "react";
import { Tweet } from "react-tweet";
import { tweetIdFromUrl } from "../../lib/tweetUtils";
import { TWEET_PREVIEW_URLS } from "../../lib/tweetsConfig";

function TweetSkeleton() {
  return <div className="tweets-preview__skeleton" aria-hidden />;
}

function TweetCell({ id }) {
  return (
    <div className="tweets-preview__cell">
      <Suspense fallback={<TweetSkeleton />}>
        <Tweet id={id} />
      </Suspense>
    </div>
  );
}

export default function TwitterTweetsPreview({
  intro = "What we’re sharing with the community.",
  tweetUrls = TWEET_PREVIEW_URLS,
}) {
  const ids = [...new Set(tweetUrls.map(tweetIdFromUrl).filter(Boolean))];
  if (ids.length === 0) return null;

  return (
    <section className="tweets-preview" id="tweets">
      <div className="tweets-preview__inner">
        <div className="tweets-preview__header">
          <h2 className="tweets-preview__title"><span>ON</span> X</h2>
          {intro ? <p className="tweets-preview__intro">{intro}</p> : null}
        </div>

        <div data-theme="dark" className="tweets-preview__theme-wrap">
          <div className="tweets-preview__grid">
            {ids.map((id) => (
              <TweetCell key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
