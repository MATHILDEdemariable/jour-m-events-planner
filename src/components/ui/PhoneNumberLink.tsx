
import React from 'react';
import { Phone } from 'lucide-react';

interface PhoneNumberLinkProps {
  phoneNumber: string;
  className?: string;
}

const PhoneNumberLink: React.FC<PhoneNumberLinkProps> = ({ phoneNumber, className = '' }) => {
  const phoneRegex = /(\+33|0)[1-9](?:[. -]?\d{2}){4}/g;
  
  const formatPhoneForTel = (phone: string) => {
    return phone.replace(/[. -]/g, '');
  };

  const renderWithPhoneLinks = (text: string) => {
    const parts = text.split(phoneRegex);
    const matches = text.match(phoneRegex) || [];
    
    return parts.reduce((acc, part, index) => {
      acc.push(part);
      if (matches[index]) {
        const phoneNumber = matches[index];
        const telLink = `tel:${formatPhoneForTel(phoneNumber)}`;
        acc.push(
          <a
            key={index}
            href={telLink}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 hover:underline"
            title="Appeler ce numéro"
          >
            <Phone className="w-3 h-3" />
            {phoneNumber}
          </a>
        );
      }
      return acc;
    }, [] as React.ReactNode[]);
  };

  return <span className={className}>{renderWithPhoneLinks(phoneNumber)}</span>;
};

export default PhoneNumberLink;
