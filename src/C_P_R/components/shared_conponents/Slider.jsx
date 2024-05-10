// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import "../../../App.css"
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider() {

    const images = [
        "https://i.ibb.co/hX0VNh2/markus-spiske-phvqs-Mbxt-TY-unsplash.jpg",
        "https://i.ibb.co/12rwN88/tony-mucci-kj-Op-ODAb-JA-unsplash.jpg",
        "https://i.ibb.co/qJ3xQG7/joshua-coleman-WTrfvtoe3y-M-unsplash.jpg",
        "https://i.ibb.co/jM1kpks/at-infinity-fl6pb3-E-z-S8-unsplash.jpg",
        "https://i.ibb.co/jyhSN3K/daniel-curran-Mt-v-DBy-RI44-unsplash.jpg",
        "https://i.ibb.co/b7yPJwz/riccardo-ginevri-h-Uj-SO5d-ZA-E-unsplash.jpg"
    ]
    return (
        <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">

            {images.map((img, idx) => <SwiperSlide key={idx}><img src={img} alt="" /></SwiperSlide>)}

        </Swiper>
    )
}
