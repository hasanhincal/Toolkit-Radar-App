import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../constants/api";

/*
//*? createAsynkThunk
* Hem asenkron işlemler (apı istekleri) yapabilen, 
* Hem de bunların sonucu "store" aktarabilen,
* asenkron aksiyonu oluşturmamızı sağlayan methoddur.
*createAsyncThunk >> string ifade >> async fonksiyon
*/

export const getFlights = createAsyncThunk("flights/getFlight", async () => {
  //* Apı'ye istek atma işlemi;
  const newData = await api
    .get("/flights/list-in-boundary")
    .then((res) =>
      //* Dizi olarak gelen cevabı objeye aktarma;
      res.data.aircraft.map((flight) => ({
        id: flight[0],
        code: flight[1],
        lat: flight[2],
        lan: flight[3],
      }))
    )
    .catch((err) => console.error(err.message));

  //* elde edilen veriyi slice aktarma;
  return newData;
});
