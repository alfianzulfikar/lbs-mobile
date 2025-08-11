import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface ArticleType {
  slug: string;
  category: string;
}

const initialState: ArticleType = {
  slug: '',
  category: '',
};

export const articleSlice = createSlice({
  name: 'articleSlice',
  initialState,
  reducers: {
    setArticle: (state, action: PayloadAction<ArticleType>) => {
      state.slug = action.payload.slug;
      state.category = action.payload.category;
    },
  },
});

export const {setArticle} = articleSlice.actions;

export default articleSlice.reducer;
