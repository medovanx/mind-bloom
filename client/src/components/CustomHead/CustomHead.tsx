import { Helmet, HelmetProvider } from 'react-helmet-async';


type CustomHeadProps = {
    title?: string;
};

const CustomHead = ({ title }: CustomHeadProps) => {
    return (
        <HelmetProvider>

            <Helmet>
                <title>{title ? `Mind Bloom | ${title}` : 'Mind Bloom'}</title>
            </Helmet>
        </HelmetProvider>
    );
};

export default CustomHead;
