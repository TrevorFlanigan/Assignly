export enum FileType {
  ASSIGNMENT = "ASSIGNMENT",
  COURSE = "COURSE",
  NOTE = "NOTE",
}

export type MockDirectory = {
  [fileName: string]: MockFileContent;
};

export type MockFileContent = {
  pinned: boolean | undefined;
  id: string;
  items: MockDirectory;
  type: FileType;
};
