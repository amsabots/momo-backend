export interface AbstractDataEntity {
  createdAt?: Date;
  updateAt?: Date;
  id?: number;
}

export interface SystemUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface ScraperOutput {
  name: string;
  source: string;
  url: string;
}
