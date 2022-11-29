import { FileType, MockFileContent } from "common/types";
import {
  IconBook2,
  IconListCheck,
  IconFileInfo,
  IconFile,
  IconFolder,
  IconNotes,
  IconFileText,
  IconTools,
  IconHexagons,
} from "@tabler/icons";
type FileIconProps = {
  file: MockFileContent;
};

const FileIcon = ({ file }: FileIconProps) => {
  switch (file.type) {
    case FileType.PROJECT:
      return <IconTools />;
    case FileType.COURSE:
      return <IconBook2 />;
    case FileType.COURSE:
      return <IconFileInfo />;
    case FileType.FOLDER:
      return <IconFolder />;
    case FileType.NOTES:
      return <IconNotes />;
    case FileType.PDF:
      return <IconFileText />;
    case FileType.ASSIGNMENT:
      return <IconListCheck />;
    case FileType.MODULES:
      return <IconHexagons />;
    default:
      return <IconFile />;
  }
};

export default FileIcon;
1;
