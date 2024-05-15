import Banner from "../components/Banner";
import JoinOurWishList from "../components/JoinOurWishList";
import VolunterNeedSection from "../components/VolunterNeedSection";
import FreequentlyAsk from "../components/FreequentlyAsk";

export default function Home() {
    return (
        <div>
            <Banner></Banner>
            <VolunterNeedSection></VolunterNeedSection>
            <JoinOurWishList></JoinOurWishList>
            <FreequentlyAsk></FreequentlyAsk>

        </div>
    )
}
