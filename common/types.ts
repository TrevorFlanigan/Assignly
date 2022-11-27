export enum FileType {
  ASSIGNMENT = "ASSIGNMENT",
  COURSE = "COURSE",
  NOTES = "NOTES",
  FOLDER = "FOLDER",
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

// ENUM to Label Name
export enum MenuOptions {
  NEW_FOLDER = "New Folder",
  RENAME = "Rename",
  CHANGE_TYPE = "Change File Type",
  MOVE_TO = "Move To...",
}
