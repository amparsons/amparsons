export interface NavigationEntry {
  id: string;
  title: string;
  slug: string;
  url: string;
}

export interface GetSettings {
  hireMeEmail: string;
  hireMeLabel: string;
  hireMeSubject: string;
  linkedinUrl: {
    url: string;
  }
  githubUrl: {
    url: string;
  };
  
}

export interface GetNavigationPagesResponse {
  entries: NavigationEntry[];
}

export interface GetSettingsPageResponse {
  siteSettingsEntries: GetSettings[];
}

export interface Asset {
  id: string;
  url: string;
  filename: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroProps {
  heading: string;
  headingTwo: string;
  heroDesc: string;
  image: {
    url: string;
    filename: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
}

export interface ColumnsProps {
  title: string;
  editor: string;
  image: {
    url: string;
    filename: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
  hireemail: string;
  linkedin: string;
}

export interface PageBuilderBlock {
  __typename: string;
  heroheading?: string;
  heroHeadingTwo?: string;
  heroDesc?: string;
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