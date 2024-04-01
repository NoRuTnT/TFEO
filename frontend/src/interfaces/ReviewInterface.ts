import { IReviewKeyword } from './ReviewKeywordInterface';

export interface IReview {
  reviewNo: number;
  memberName: string;
  memberProfileUrl: string;
  createdAt: string;
  homeContent: string;
  keywordValues: IReviewKeyword;
}

export interface IWriteReview {
  homeContent: string;
  keywordValues: IReviewKeyword;
}
