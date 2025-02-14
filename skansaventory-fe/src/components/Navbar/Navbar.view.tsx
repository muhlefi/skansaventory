import { FC, memo } from "react";
import SkansaventoryLogo from "../../assets/skansaventory-logo.png";
import UserContent from "./UserContent";

const NavbarView: FC = () => (
    <div data-theme="light" className="navbar bg-base-100 pb-3 pt-4 px-9 shadow-sm items-center justify-center">
        <div className="flex-1 w-16">
            <img src={SkansaventoryLogo} className="h-12" alt="skansaventory-logo" />
        </div>
        <UserContent/>
    </div>
);

export default memo(NavbarView);