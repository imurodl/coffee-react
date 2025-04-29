import { Box, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";
import Divider from "../../components/divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <Typography className="info-subt">everybody welcome</Typography>
          <Typography className="info-title">Our Events</Typography>
          <Divider width="2" height="40" bg="#DB9457" />
        </Box>

        <Swiper
          className={"events-info swiper-wrapper"}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={48}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
        >
          {plans.map((value, number) => {
            return (
              <SwiperSlide key={number} className={"events-info-frame"}>
                <div className={"events-img"}>
                  <img
                    src={`${process.env.PUBLIC_URL}${value.img}`}
                    alt="Event"
                    className={"events-img"}
                  />
                </div>
                <Box className={"events-desc"}>
                  <Box className={"events-bott"}>
                    <Box className={"bott-left"}>
                      <div className={"bott-info"}>
                        <Stack className={"bott-info-main"}>
                          on {value.date}
                        </Stack>
                        <Stack className={"bott-info-main"}>
                          <LocationOnIcon />
                          {value.location}
                        </Stack>
                      </div>

                      <div className={"event-title-speaker"}>
                        <div className={"event-organizator"}>
                          <p className={"spec-text-author"}>{value.author}</p>
                        </div>
                        <strong className="spec-text-title">
                          {value.title}
                        </strong>
                      </div>

                      <p className={"text-desc"}> {value.desc} </p>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Box className={"prev-next-frame"}>
          <ArrowBackIcon className={"swiper-button-prev"} />
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <ArrowForwardIcon className={"swiper-button-next"} />
        </Box>
      </Stack>
    </div>
  );
}
