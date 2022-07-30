import { NextRouter } from "next/router";
import HR from '../ui/HR';
import { Search } from "./Search";
import { LeftSidebarLink } from "./LeftSidebarLink";
import { LogoutButton } from "./LogoutButton";
import Button from "../ui/Button";

export function MobileDropDownNav(navOut: boolean, router: NextRouter, userLoggedIn: boolean, sidebarLinks) {
    return <div className={` ${!navOut ? 'hidden' : 'p-4 border-b-2 rounded border-gray-200'}`}>
        <Search className="mb-2" />
        {sidebarLinks.map((props, i) => <LeftSidebarLink {...props} active={router.pathname === props.href} key={i} />)}
        <HR />
        {
            userLoggedIn ? <LogoutButton /> :
                <Button stretch onClick={() => router.push("/login")} title="Log in" />
        }
    </div>;
}
