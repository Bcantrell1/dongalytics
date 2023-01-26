import Link from "next/link";

const ButtonBlue = ({ children, route, ...props }: { children: any, route: string }) => (
    <Link className="group relative inline-block focus:outline-none focus:ring" href={route} {...props}>
        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-indigo-400 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
        <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
            {children}
        </span>
    </Link>
);

export default ButtonBlue;
