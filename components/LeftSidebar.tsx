import HR from '../ui/HR';
import { Logo } from "./Logo";
import { LeftSidebarLink } from './LeftSidebarLink';
import { LogoutButton } from './LogoutButton';
import Button from '../ui/Button';
import { useRouter } from 'next/router';

export function LeftSidebar({ router, links, userLoggedIn }) {
    return <div className="flex flex-col justify-between h-screen p-4 border-r border-gray-200 dark:border-gray-700 w-80">
        <div>
            <div className="flex items-center h-14">
                <Logo />
            </div>
            <HR />
            <div>
                {links.map((props, i) => <LeftSidebarLink {...props} active={router.pathname === props.href} key={i} />)}
            </div>
        </div>
        <div>
            <HR />
            <div>
                {
                    userLoggedIn ? <LogoutButton /> :
                        <Button stretch onClick={() => router.push("/login")} title="Log in" />
                }
            </div>
        </div>
    </div>;
}


