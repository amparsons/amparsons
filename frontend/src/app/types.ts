export interface NavigationEntry {
  id: string;
  title: string;
  slug: string;
  url: string;
}

export interface GetNavigationPagesResponse {
  entries: NavigationEntry[];
}

export interface Asset {
  id: string;
  filename: string;
  alt: string;
}

export interface HeroProps {
  heading: string;
  images: Asset[];
}

export interface ColumnsProps {
  title: string;
  editor: string;
  images: Asset[];
}

export interface PageBuilderBlock {
  __typename: string;
  heroheading?: string;
  heroimage?: Asset[];
  columnsTitle?: string;
  columnsEditor?: string;
  columnsImage?: Asset[];
}

export interface GetPageBySlugResponse {
  entries: Array<{
    id: string;
    title: string;
    slug: string;
    pageBuilder: PageBuilderBlock[];
  }>;
}