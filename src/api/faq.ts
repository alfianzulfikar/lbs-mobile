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
      if (faqPemodal?.items) {
        const newArray: FAQType[] = [];
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
