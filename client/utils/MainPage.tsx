"use client"
import { Provider } from "react-redux";
import { ReactNode } from "react";
import RentalRedux from "../store/index";

interface MainPageProps {
  children: ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <Provider store={RentalRedux}>{children}</Provider>
  );
}

export default MainPage;
