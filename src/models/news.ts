export interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image: string;
  source: string;
  category_within_source: string;
  source_domain: string;
  topics: {
    topic: string;
    relevance_score: number;
  }[];
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  ticker_sentiment: {
    ticker: string;
    relevance_score: number;
    ticker_sentiment_score: number;
    ticker_sentiment_label: string;
  }[];
}
