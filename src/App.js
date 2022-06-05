import React, { useEffect } from "react";
import { Route, Routes } from "react-router"
import './App.css';
import Home from "./components/home/home";
import FinanceMain from "./components/finance/FinanceMain";
import NomenclatureTable from "./components/nomenclature/NomenclatureTable";
import StockTable from "./components/stock/StockTable";
import RevisionTable from "./components/revision/RevisionTable";
import OperationsTable from "./components/operations/OperationsTable";
import SalesTable from "./components/sales/SalesTable";
import Login from "./components/login/index";
import PrivateRoute from "./components/privateRoute";
import ProductView from "./components/nomenclature/ProductView";
import { useLocalState } from "./util/useLocalStorage";

const App = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    if(!jwt){
      const ReqBody = {
        username: "RamWhite",
        password: "1234",
      }
    
      fetch("api/auth/login", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(ReqBody),
      })
      .then((response) => Promise.all([response.json(), response.headers]))
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
      });
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="Nomenclature" element={
          <PrivateRoute>
            <NomenclatureTable />
          </PrivateRoute>
        } />
        {/* <Route path="Operations" element={<OperationsTable />} /> */}
        {/* <Route path="Revision" element={<RevisionTable />} /> */}
        {/* <Route path="Sales" element={<SalesTable />} /> */}
        <Route path="Finance" element={<FinanceMain />} />
        <Route path="Stock" element={<StockTable />} />
        <Route path="Login" element={<Login />} />
        <Route
          path="/nomenclature/:id"
          element={
            <PrivateRoute>
              <ProductView />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
