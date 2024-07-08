import React, { useState } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { appRoutes } from "@/routes/appRoutes";
import { Button, ConfigProvider, Drawer, theme } from "antd";

const Home = ({ children }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="min-h-screen w-full flex">
      <div className="left">
        {/* side menu */}
        <Button type="primary" onClick={showDrawer} className="bg-blue-500">
          Open
        </Button>
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          <div className="flex flex-col gap-4">
            {appRoutes.map((app) => {
              return (
                <Link key={app.path} to={app.path}>
                  <div className="rounded-lg p-4 bg-slate-200 font-semibold">
                    {app.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </Drawer>
      </div>
      <div className="right">
        {/* header */}
        <div className="top">
          <h1 className="flex justify-center items-center w-full text-lg font-medium my-4">
            Machine Round Projects
          </h1>
        </div>
        {/* content */}
        <div className="bottom flex-1"></div>
        {/* footer */}
        <div className="footer"></div>
      </div>
    </div>
  );
};

export default Home;

Home.propTypes = {
  children: propTypes.node,
};
