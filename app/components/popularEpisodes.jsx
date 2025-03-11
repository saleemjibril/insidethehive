"use client";
// Maybe use people's tweets?
import { useEffect, useState } from "react";
import Image from "next/image";

const testimonialsLeft = [
  {
  testimonial:
      "TweetScraper has been a gamechanger for our email outreach - we've seen amazing results for our client's campaigns & it has allowed us to get data that we previously thought was impossible. 100% Recommend.",
    name: "Matt Lucero",
    role: "Founder AnevoMarketing.com",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "A lot of people fail with cold email because they use leads that have been scraped a million times over. Scraping Twitter gets you untouched lead lists. Getting a 79.5% open rate and 15.5% reply rate with TweetScraper.",
    name: "Kidous Mahteme",
    role: "Founder Inframail.io",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "Just upgraded my plan. Tool is incredible, used it to create a lookalike audience on Facebook - Acquired 66 SaaS clients for $7 each.",
    name: "Tye Howatt",
    role: "Creative Director GymLaunch.com",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "This is an amazing new way for lead generation that is way more efficient and productive than other tools because it leads you directly to the audiences of your dream customers. I couldn't be happier to have found TweetScraper!",
    name: "Elena Nikiforia",
    role: "Founder supercharged.beehiiv.com",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "TweetScraper lets you get creative and scrape audiences no one else is emailing. Plus, the customer service is next level!",
    name: "Martin Adey",
    role: "Founder Leadosaurus.com",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "TweetScraper got me a 23% response rate compared to 5% with everything else being exactly the same. Just the fact that these inboxes are generally less-crowded makes it a no-brainer option.",
    name: "Harvey Harris",
    role: "Founder InboxFlow.net",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "With Tweetscraper, we've tapped into fresh audiences that haven't been exhausted by countless emails. For those who need a smart, efficient solution that can enhance their marketing efforts, consider this.",
    name: "Niek Giavedoni",
    role: "Founder SpotOnWiFi.com",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "I was tired of cold DM'ing people on Twitter as part of my lead gen strategy. With TweetScraper I can export valid email addresses from accounts on twitter and set them up in my email marketing funnels.",
    name: "Corey Nicholson",
    role: "Founder theDTCHouse.com",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "Saving at least 2-4 hours each week from searching manually for leads. Marko's amazing support, fast communication, and commitment to adding new features quickly has been incredible to work with",
    name: "Greg Madder",
    role: "Founder SovereignHustler.com",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "TweetScraper has been my best source of cold email leads so far. They helped me dial in my sources and keywords and I was able to achieve a 3.5% reply rate(mostly positive) as a cold email noob.",
    name: "Carson",
    role: "Founder ColdDMs.com",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "What impressed me the most was the ability to reach highly specific and quality clients within a certain niche. If you're someone who's involved in marketing strategy and growth, then I highly recommend giving it a try.",
    name: "Nicola Mihaita",
    role: "Founder ZionBuilder.io",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "TweetScraper has really improved our Twitter marketing, boosting our ROAS by allowing precise targeting of engaged users and those with similar interests. We recommend it to any marketer seeking efficiency and impact.",
    name: "Jonathan R. Bikoff",
    role: "Head of Strategy Personal.ai",
    image: "/assets/podcast2.jpg",
  },
]
const testimonialsRight = [
  {
    testimonial:
      "Tweetscraper is our platform of choice for scraping all things Twitter and we recommend it to all of our clients.",
    name: "Frank Sondors",
    role: "Founder Salesforge.ai",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "I've been consistently achieving open rates of over 70% on each dataset. Twitter outreach isn't widely adopted at the moment, making it an excellent avenue for lead generation. Plus, Marko's support has been exceptional.",
    name: "Vivek Vardhan",
    role: "Co-Founder BLKNS.co",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "It's let me extract valuable information from Twitter, making lead gen easy and efficient. Their customer service are always quick to respond and provide great support. I no longer need to rely on any other lead services.",
    name: "Venkat Ghanta",
    role: "Founder Dema.shop",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "As a startup, we're always looking for ways to get a competitive edge. TweetScraper has become our secret weapon. We're able to uncover leads that our competitors aren't reaching and craft hyper-personalized outreach based on Twitter activity.",
    name: "Toli",
    role: "Founder BadBears.io",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "TweetScraper is a great tool that I recommend to anyone doing outreach. The team is very helpful and responsive if you need any help.",
    name: "Marc Lewin",
    role: "Founder getsalemaker.com",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "I booked a call the first day I used leads from tweetscraper, and I'm excited to do more. It feels like an infinite leads source, with great targeting.",
    name: "Stuart Brent",
    role: "Founder saasyDB.com",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "I've been using TweetScraper for quite a while now. It's the best solution for scraping Twitter accounts at the moment. With its convenient filters and impressive speed, it's been a game-changer for me!",
    name: "Marat Kanashkin",
    role: "Founder crftvideo.com",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "Shoutout to Marko - Love using TweetScraper for all my Twitter scraping needs. Extremely easy to use, filtering with keywords and quality leads used for cold emailing.",
    name: "Miles Lin",
    role: "Founder LeadStatic.com",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "This is an insane tool. Makes it really easy to target your ICP on twitter. Also has great resources to dial in your ICP.",
    name: "Antonio Velasquez",
    role: "Founder Velacopy.com",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "TweetScraper has been a game-changer for my clients and our venture studio. Using competitor-based audience targeting, I've achieved CPCs as low as $0.15, significantly reducing our Cost per lead. This tool has consistently helped me create lookalike audiences that drive results across various industries.",
    name: "Hussein Saab",
    role: "Founder StrategyXweb.com",
    image: "/assets/podcast2.jpg",
  },
  {
    testimonial:
      "Been using TweetScraper to scrape more leads for my appointment setter - finally removing myself from the boring tasks of building an agency, highly recommend it if you're tryna scale.",
    name: "Philani Hlatshwayo",
    role: "Founder KMF Digital",
    image: "/assets/podcast1.jpg",
  },
  {
    testimonial:
      "TweetScraper has been an invaluable treasure trove of new customers. By using keywords to identify high-intent leads, we've discovered a whole new source of revenue requiring very little time & effort to mine.",
    name: "Steven p",
    role: "Co-Founder Centered.app",
    image: "/assets/podcast2.jpg",
  },
];

export default function PopularEpisodes() {
  const [duplicateCount, setDuplicateCount] = useState(2);

  useEffect(() => {
    const calculateDuplicates = () => {
      const viewportWidth = window.innerWidth;
      const newDuplicateCount = Math.ceil((viewportWidth * 3) / (300 + 20)) + 1;
      setDuplicateCount(newDuplicateCount);
    };

    calculateDuplicates();
    window.addEventListener("resize", calculateDuplicates);
    return () => window.removeEventListener("resize", calculateDuplicates);
  }, []);

  const duplicatedItemsLeft = Array(duplicateCount).fill(testimonialsLeft).flat();
  const duplicatedItemsRight = Array(duplicateCount).fill(testimonialsRight).flat();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--item-count",
      testimonialsLeft.length
    );
  }, [testimonialsLeft.length]);

  return (
    <div className="pop-episodes">
      <div className="pop-episodes__title">
        Popular <span>Episodes</span>
      </div>
      <div className="pop-episodes__slider pop-episodes__slider-left">
        {duplicatedItemsLeft?.map((testimonial, index) => (
          <div className="pop-episodes__slider__card" key={index}>

            <div className="pop-episodes__slider__card__image">
            <Image objectFit="cover" layout="fill" src={testimonial?.image} alt="" />
            </div>

            <div className="pop-episodes__slider__card__group">
              <div>Podcast title</div>
              <div>S1 . E3</div>
            </div>
          </div>
        ))}
      </div>
      <div className="pop-episodes__slider pop-episodes__slider-right">
        {duplicatedItemsRight?.map((testimonial, index) => (
          <div className="pop-episodes__slider__card" key={index}>

          <div className="pop-episodes__slider__card__image">
          <Image objectFit="cover" layout="fill" src={testimonial?.image} alt="" />
          </div>

          <div className="pop-episodes__slider__card__group">
            <div>Podcast title</div>
            <div>S1 . E3</div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
