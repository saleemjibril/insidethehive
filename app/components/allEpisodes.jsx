import Image from "next/image";

export default function AllEpisodes() {
  return (
    <div className="episodes">
      <div className="episodes__title-group">
        <div>Browse All Episodes</div>
        <div>
            Sort<Image width={20} height={20} src="/assets/icons/upDown.svg" />
        </div>
      </div>

      <div className="episodes__filters">
        <div className="episodes__filters__title">Filters:</div>
        <div className="episodes__filters__group">
          <div>DeFi</div>
          <div>NFTs</div>
          <div>Ethereum</div>
          <div>Investing</div>
          <div>Regulation</div>
          <div>Bitcoin</div>
          <div>Vitalik</div>
        </div>
      </div>

      <div className="episodes__cards">
        <div className="episodes__cards__card">
        <div className="episodes__cards__card__inner">
          <div className="episodes__cards__card__inner__details">
            <div className="episodes__cards__card__inner__details__title">
              Introducing Inside The Hive!
            </div>
            <div className="episodes__cards__card__inner__details__subtitle">
              Home Benessere Lorem Ipsum is simply dummy text of the printing
              and typesetting industry A cura di Giusy Dente Condividi su
              Facebook Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
            </div>
            <div className="episodes__cards__card__inner__details__tags">
              <div>DeFi</div>
            </div>
          </div>

          <div className="episodes__cards__card__inner__preview">
            <div className="episodes__cards__card__inner__preview__image">
              <Image
                objectFit="cover"
                layout="fill"
                src={"/assets/podcast2.jpg"}
                alt=""
              />
            </div>

            <div className="episodes__cards__card__inner__preview__group">
              <div>Podcast title</div>
              <div>S1 . E3</div>
            </div>
          </div>
          </div>
        </div>
        <div className="episodes__cards__card">
        <div className="episodes__cards__card__inner">
          <div className="episodes__cards__card__inner__details">
            <div className="episodes__cards__card__inner__details__title">
              Introducing Inside The Hive!
            </div>
            <div className="episodes__cards__card__inner__details__subtitle">
              Home Benessere Lorem Ipsum is simply dummy text of the printing
              and typesetting industry A cura di Giusy Dente Condividi su
              Facebook Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
            </div>
            <div className="episodes__cards__card__inner__details__tags">
              <div>DeFi</div>
            </div>
          </div>

          <div className="episodes__cards__card__inner__preview">
            <div className="episodes__cards__card__inner__preview__image">
              <Image
                objectFit="cover"
                layout="fill"
                src={"/assets/podcast1.jpg"}
                alt=""
              />
            </div>

            <div className="episodes__cards__card__inner__preview__group">
              <div>Podcast title</div>
              <div>S1 . E3</div>
            </div>
          </div>
          </div>
        </div>
        <div className="episodes__cards__card">
        <div className="episodes__cards__card__inner">
          <div className="episodes__cards__card__inner__details">
            <div className="episodes__cards__card__inner__details__title">
              Introducing Inside The Hive!
            </div>
            <div className="episodes__cards__card__inner__details__subtitle">
              Home Benessere Lorem Ipsum is simply dummy text of the printing
              and typesetting industry A cura di Giusy Dente Condividi su
              Facebook Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
            </div>
            <div className="episodes__cards__card__inner__details__tags">
              <div>DeFi</div>
            </div>
          </div>

          <div className="episodes__cards__card__inner__preview">
            <div className="episodes__cards__card__inner__preview__image">
              <Image
                objectFit="cover"
                layout="fill"
                src={"/assets/podcast2.jpg"}
                alt=""
              />
            </div>

            <div className="episodes__cards__card__inner__preview__group">
              <div>Podcast title</div>
              <div>S1 . E3</div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </div>
  );
}
