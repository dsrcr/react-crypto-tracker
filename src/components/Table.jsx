import React from "react";
import PropTypes from "prop-types";

const Table = ({ data, columns, loadingMessage }) => {
  const {
    currentData,
    pageCount,
    currentPage,
    itemsPerPage,
    sortedData,
    handlePageChange,
    handleItemsPerPageChange,
    requestSort,
    sortConfig,
  } = useTable(data, columns);

  return (
    <div className="overflow-x-auto mt-4 lg:mx-12 overflow-y-hidden">
      {loadingMessage && data.length === 0 && <p>{loadingMessage}</p>}
      {data.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Prices by Market Cap 📈</h1>
          <table className="min-w-full bg-white border border-gray-200 table-auto">
            {/* Table header */}
            <thead>
              <tr>
                {columns.map(({ label, key, render }) => (
                  <TableHeaderCell
                    key={key}
                    label={label}
                    sortKey={key}
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                    render={render}
                  />
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {columns.map(({ key, render }) => (
                    <td key={key} className="py-5 px-4 border-b">
                      {key === "name" && render ? render(item) : item[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination bar */}
          <div className="flex flex-col items-center mt-8 gap-8">
            <div className="text-sm flex gap-8 items-center justify-center">
              <button
                className={`border rounded px-3 py-1 mx-1 ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-600 text-white"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2">
                {currentPage} of {pageCount}
              </span>
              <button
                className={`border rounded px-3 py-1 mx-1 ${
                  currentPage === pageCount
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-600 text-white"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
              >
                Next
              </button>
            </div>
            <div className="text-sm flex items-center justify-center">
              <label className="mx-2">Items per Page:</label>
              <select
                className="border rounded px-2 py-1"
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func,
    }),
  ).isRequired,
  loadingMessage: PropTypes.string,
};

const useTable = (data, columns) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: "desc",
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    const sortableData = [...currentData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [currentData, sortConfig]);

  return {
    currentData,
    pageCount,
    currentPage,
    itemsPerPage,
    sortedData,
    handlePageChange,
    handleItemsPerPageChange,
    requestSort,
    sortConfig,
  };
};

const TableHeaderCell = ({
  label,
  sortKey,
  sortConfig,
  requestSort,
  render,
}) => {
  const isSorted = sortConfig.key === sortKey;
  const arrowIcon = isSorted ? (
    <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
  ) : null;

  return (
    <th
      className="py-2 px-4 border-b cursor-pointer"
      onClick={() => requestSort(sortKey)}
    >
      {label} {arrowIcon}
    </th>
  );
};

export default Table;
