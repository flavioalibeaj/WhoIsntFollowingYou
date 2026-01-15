import { UserData } from './user-data.type';

export type StateData = {
  data: UserData[];
  tabLabel: string;
  tabParagraph: string;
  dataType: DataType;
};

export enum DataType {
  UNFOLLOWERS,
  FOLLOWERS,
}
