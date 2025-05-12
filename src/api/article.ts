import {ArticleType, BusinessType} from '../constants/Types';
import {useAPI} from '../services/api';
import {useRef, useState} from 'react';

export const useArticle = () => {
  const {apiRequest} = useAPI();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [article, setArticle] = useState<ArticleType>({
    title: '',
    category: '',
    categorySlug: '',
    image: '',
    slug: '',
    body: '',
    date: '',
  });
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesMoreLoading, setArticlesMoreLoading] = useState(false);
  // const [isLastPage, setIsLastPage] = useState(false);
  const isFetchingArticles = useRef(false);
  const isLastPage = useRef(false);

  const composeData = (res: any) => {
    return {
      title: res.title,
      slug: res.slug,
      category: res.category.title,
      categorySlug: res.category.slug,
      image: res.thumbnail,
      body: res.body,
      date: res.created_at,
    };
  };

  const getArticles = async (
    page?: number,
    perpage?: number,
    category?: string,
    keyword?: string,
  ) => {
    isFetchingArticles.current = true;
    if (page && page > 1) {
      setArticlesMoreLoading(true);
    } else {
      setArticlesLoading(true);
    }
    try {
      const res = await apiRequest({
        // endpoint: `/cms/blog?page=${page || 1}&per_page=${perpage || 10}`,
        endpoint: `/cms/blog${category ? '/' + category : ''}?page=${
          page ? page : 1
        }&per_page=${perpage || 10}&search=${keyword ? keyword : ''}`,
      });
      if (res.result && res.result.length > 0) {
        let newArray: ArticleType[] = [];
        res.result.map((item: any) => {
          newArray.push(composeData(item));
        });
        if (page && page > 1) {
          //
          setArticles(prev => [...prev, ...newArray]);
        } else {
          setArticles(newArray);
        }
      } else if (res.result && res.result.length === 0) {
        isLastPage.current = true;
      }
    } catch {
    } finally {
      isFetchingArticles.current = false;
      if (page && page > 1) {
        setArticlesMoreLoading(false);
      } else {
        setArticlesLoading(false);
      }
    }
  };

  const getArticle = async (slug: string, category: string) => {
    try {
      const res = await apiRequest({
        endpoint: `/cms/blog/${category.toLowerCase()}/${slug}`,
      });
      if (res.result) {
        setArticle(composeData(res.result));
      }
    } catch {}
  };

  return {
    articles,
    article,
    getArticles,
    getArticle,
    articlesLoading,
    isLastPage,
    articlesMoreLoading,
    isFetchingArticles,
  };
};
