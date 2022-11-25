export enum FileType {
  ASSIGNMENT = "ASSIGNMENT",
  COURSE = "COURSE",
  NOTE = "NOTE",
}

export type MockFile = {
  [fileName: string]: {
    id: string;
    items: MockFile;
    type: FileType;
  };
};
