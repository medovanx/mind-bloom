import { useState, useEffect } from 'react';
import api from '../../utils/api';
import './CertificateList.css';

interface Certificate {
    title: string;
    date: string;  // Adjust the type if your date format is different, such as Date or number
}


const CertificatesList = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await api.get('/user/getUserCertificates', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '').token}`,
                    },
                });
                // Assuming response.data is the array of certificates
                const sortedData = response.data.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => {
                    const yearA = new Date(a.date).getFullYear();
                    const yearB = new Date(b.date).getFullYear();
                    return yearA - yearB;  // Sorts in ascending order of year
                });
                setCertificates(sortedData);
            } catch (error) {
                console.error('Error fetching certificates:', error);
                setCertificates([]);
            }
        };

        fetchCertificates();
    }, []);

    return (
        <div className='certificateCard'>
            <h2>Certificates</h2>
            {certificates.length > 0 ? (
                certificates.map((certificate, index) => (
                    <div key={index} className='certificateItem'>
                        <p className='certificateYear'>{new Date(certificate.date).getFullYear()}</p>
                        <p className='certificateTitle'>{certificate.title}</p>
                    </div>
                ))
            ) : (
                <p>No certificates yet.</p>
            )}
        </div>
    );
};

export default CertificatesList;
