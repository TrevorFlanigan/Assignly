export enum FileType {
  PROJECT = "PROJECT",
  COURSE = "COURSE",
  NOTES = "NOTES",
  FOLDER = "FOLDER",
  PDF = "PDF",
  MODULES = "MODULES",
  ASSIGNMENT = "ASSIGNMENT",
}

export type MockDirectory = {
  [fileName: string]: MockFileContent;
};

export type MockFileContent = {
  pinned: boolean | undefined;
  id: string;
  items: MockDirectory;
  type: FileType;
  leaf?: string;
};

// ENUM to Label Name
export enum MenuOptions {
  NEW_FOLDER = "New Folder",
  NEW_PROJECT = "New Project",
  NEW_COURSE = "New Course",
  NEW_NOTES = "New Notes",
  RENAME = "Rename",
  CHANGE_TYPE = "Change File Type",
  MOVE_TO = "Move To...",
  COPY_TO = "Copy to Assignly Cloud...",
}
