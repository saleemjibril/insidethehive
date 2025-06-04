import Image from "next/image";
import AllEpisodes from "../components/allEpisodes";

export default function Season() {
    return (
        <div className="season">
            <div className="season__title-group">
                
                <Image width={218} height={272.5} src="/assets/podcast1.jpg" className="season__title-group__img" />
                <div className="season__title-group__title">
                    Inside The Hive <br />
                    <span>Season 1</span>
                </div>
            </div>

            <AllEpisodes />
        </div>
    )
}