import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Detail from "./Pages/Detail";
import Headers from "./Pages/components/Headers";
import Buttons from "./Pages/components/Buttons";
export default function StaffPage() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <div
              style={{
                boxShadow: "0px 0px 3px 0px",
                position: "fixed",
                zIndex: 1000,
                width: "100%",
              }}
            >
              <Headers></Headers>
              <Buttons></Buttons>
            </div>
            <div style={{ paddingTop: "15%" }}>
              {" "}
              <Product />
            </div>
          </>
        }
      ></Route>
      <Route path="/detail/:id" element={<Detail />}></Route>
    </Routes>
  );
}
