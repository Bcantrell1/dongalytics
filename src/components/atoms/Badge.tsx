const Badge = ({ children, color }: {children: string, color: string}) => {
    return (
        <div
        className={`whitespace-nowrap rounded-full bg-${color}-100 px-2.5 py-0.5 text-sm text-${color}-700`}
        >
            {children}
        </div>
    );
};

export default Badge;
