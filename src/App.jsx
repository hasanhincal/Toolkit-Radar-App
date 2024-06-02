import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ListView from "./pages/ListView";
import MapView from "./pages/MapView";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFlights } from "./app/actions/flightAction";
import SideDetail from "./components/SideDetail";

function App() {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(null);

  //* uçuşları getirir.
  useEffect(() => {
    dispatch(getFlights());
  }, []);

  //* Haritayı açar ve uçuşlarını getireceğiniz uçağın "ıd" 'sini alir.
  const openDetail = (id) => {
    //* detay kısmını açar
    setShowDetail(true);
    //* uçağın id 'sini getirir.
    setDetailId(id);
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        {/* yan detay alanı */}
        {showDetail && (
          <SideDetail detailId={detailId} setShowDetail={setShowDetail} />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <MapView openDetail={openDetail} setShowDetail={setShowDetail} />
            }
          />
          <Route
            path="/list"
            element={
              <ListView openDetail={openDetail} setShowDetail={setShowDetail} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
