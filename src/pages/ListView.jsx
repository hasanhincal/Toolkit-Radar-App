import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const ListView = ({ setShowDetail, openDetail }) => {
  const { flights } = useSelector((store) => store);

  const [itemOffset, setItemOffset] = useState(0);

  //! sayfalama işlemi;

  //* sayfa başına eleman
  const itemsPerPage = 8;
  //* gösterilecek son item tespiti;
  const endOffset = itemOffset + itemsPerPage;
  //* belirli aralığı diziden alma
  const currentItems = flights?.slice(itemOffset, endOffset);
  //* toplam kaç sayfa old. hesaplıyor.
  const pageCount = Math.ceil(flights?.length / itemsPerPage);

  //* sayfalara tıklanınca çalışır.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % flights?.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="list-page">
      <table className="table table-dark table-striped table-hover table-responsive container">
        <thead>
          <tr>
            <th>id</th>
            <th>Tail code</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((fly) => (
            <tr key={fly.id}>
              <td>{fly.id}</td>
              <td>{fly.code}</td>
              <td>{fly.lat}</td>
              <td>{fly.lan}</td>
              <td>
                <button
                  onClick={() => openDetail(fly.id)}
                  className="btn text-white bg-black"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default ListView;
