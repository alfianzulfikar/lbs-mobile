import {useState} from 'react';
import {useAPI} from '../services/api';
import {FAQType} from '../constants/Types';

export const useFAQ = () => {
  const {apiRequest} = useAPI();
  const [FAQList, setFAQList] = useState<FAQType[]>([]);
  const [FAQLoading, setFAQLoading] = useState(false);

  const getFAQList = async () => {
    setFAQLoading(true);
    try {
      const res: [] = await apiRequest({
        endpoint: '/faqs',
        baseUrl: 'https://uda-news.lbs.id',
      });
      const faqPemodal: any = res.find((item: any) => item.title === 'PEMODAL');
      console.log('faqPemodal', faqPemodal);
      if (faqPemodal?.items) {
        const newArray: FAQType[] = [];
        // newArray.push({
        //   question: 'Apa itu LBS Urun Dana?',
        //   answer:
        //     'LBS Urun Dana adalah platform urun dana (securities crowdfunding) yang mengedepankan nilai kehalalan dan kenyamanan dalam setiap transaksinya. Didirikan pada tahun 2021, LBS Urun Dana telah berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK) sehingga memenuhi standar keamanan dan kredibilitas yang tinggi. Sebagai platform yang amanah dan transparan, LBS Urun Dana menjembatani para investor dengan bisnis-bisnis potensial melalui saham & sukuk yang bebas dari riba, gharar dan dzhalim.',
        // });
        faqPemodal?.items.map((item: any) => {
          newArray.push({
            question: item.question,
            answer: item.answer,
          });
        });
        setFAQList(newArray);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFAQLoading(false);
    }
  };

  return {FAQList, getFAQList, FAQLoading};
};
