import React, { useEffect, useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import api from "../constants/api";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setPath } from "../app/slices/flightSlice";
import formatDate from "../utils/formatDate";

const SideDetail = ({ detailId, setShowDetail }) => {
  const dispatch = useDispatch();
  //* Uçak detay bilgilerini state alma;(Bu veriyi sadece burada kullanacağımız için storeda tutmaya gerek duymadık)
  const [d, setDetail] = useState(null);

  //* uçuş detaylarına istek atma;
  useEffect(() => {
    //* önceki uçuşun detaylarını sıfırla;
    setDetail(null);

    api.get(`/flights/detail?flight=${detailId}`).then((res) => {
      //*state'i güncelle;
      setDetail(res.data);
      //* Harita sayfasın da kullanabilmek için uçuş yolunu slice'a aktar.
      dispatch(setPath(res.data.trail));
    });
  }, [detailId]);
  console.log(d);
  return (
    <div className="detail">
      <div className="detail_inner ">
        <div className="ms-auto mb-1">
          <span
            onClick={() => setShowDetail(false)}
            className="close-icon fw-bold fs-5 btn bg-black text-light"
          >
            <VscEyeClosed />
          </span>
        </div>

        {!d ? (
          <Loader />
        ) : (
          <>
            <h3>{d.aircraft.model?.text}</h3>
            <h3>{d.aircraft.model?.code}</h3>
            <p>
              Tail Number: <span>{d.aircraft?.registration}</span>
            </p>
            {d.aircraft?.images ? (
              <img
                src={
                  d.aircraft?.images?.large
                    ? d.aircraft?.images?.large[0].src
                    : d.aircraft?.images?.thumbnails[0].src
                }
              />
            ) : (
              "Photo No Found"
            )}
            <p>
              Company: <span>{d.airline?.short}</span>{" "}
            </p>
            <p>
              <span>Departure: </span>
              <a href={d.airport?.origin?.website} target="_blank">
                {d.airport?.origin?.name}
              </a>
            </p>
            <p>
              <span>Destination: </span>
              <a href={d.airport?.destination?.website} target="_blank">
                {d.airport?.destination?.name}
              </a>
            </p>

            <p>
              <span>Departure Time:</span>
              <span>
                {d.time?.scheduled?.departure > 0
                  ? formatDate(d.time?.scheduled?.departure)
                  : "Unknown"}
              </span>
            </p>
            <p>
              <span>Arrival Time:</span>
              <span>
                {d.time?.scheduled?.arrival > 0
                  ? formatDate(d.time?.scheduled?.arrival)
                  : "Unknown"}
              </span>
            </p>
            <p className={d.status?.icon}>{d.status?.text}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SideDetail;
