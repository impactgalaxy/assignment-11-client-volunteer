import { Helmet } from "react-helmet";
import Banner from "../components/Banner";

export default function Home() {
    return (
        <div>
            <Helmet>
                <title>Volunify</title>
            </Helmet>
            <Banner></Banner>

        </div>
    )
}
