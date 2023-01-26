import Link from "next/link";

const NavButton = ({ children, href, ...props }:{children: any, href: string}) => {

    return (
        <Link
            href={href}
            {...props}
            className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-indigo-600"
        >
            {children}
        </Link>
    );
};

export default NavButton;
