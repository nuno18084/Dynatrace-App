import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../store/dataSlice";
import DataTable from "../../components/DataTable/DataTable";
import "./DataExport.css";

function DataExport() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entities, columns, env, api, loading, error, hasMore, currentPage } =
    useSelector((state) => state.data);

  // Handle load more (pagination)
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(
        fetchData({
          page: currentPage + 1,
          columns,
          env,
          apiList: api,
        })
      );
    }
  }, [dispatch, loading, hasMore, currentPage, columns, env, api]);

  if (error) return <div className="error">{error}</div>;
  if (loading && (!entities || entities.length === 0))
    return <div className="loading">{t("Loading data...")}</div>;

  return (
    <div className="home">
      <h1 className="title">{t("Data Export")}</h1>
      <DataTable
        data={entities || []}
        selectedColumns={columns || []}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}

export default DataExport;
