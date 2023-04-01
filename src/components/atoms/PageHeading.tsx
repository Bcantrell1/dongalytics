
const PageHeading = ({ title, subtitle }:{ title: string, subtitle?: string}) => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-indigo-500 sm:text-4xl">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-4 text-gray-500 sm:text-xl">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHeading;
