import { Helmet } from "react-helmet";
import Banner from "../components/Banner";
import JoinOurWishList from "../components/JoinOurWishList";
import VolunterNeedSection from "../components/VolunterNeedSection";
import FreequentlyAsk from "../components/FreequentlyAsk";

export default function Home() {
    return (
        <div>
            <Helmet>
                <title>Volunify</title>
            </Helmet>
            <Banner></Banner>
            <VolunterNeedSection></VolunterNeedSection>
            <JoinOurWishList></JoinOurWishList>
            <FreequentlyAsk></FreequentlyAsk>

        </div>
    )
}
