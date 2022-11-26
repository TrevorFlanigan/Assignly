import { MockFileContent } from "common/types";
import { IconPin } from "@tabler/icons";
import { Group, Paper, Title } from "@mantine/core";
import FileIcon from "./FileIcon";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

type FileContainerProps = {
  name: string;
  file: MockFileContent;
  handleClick: (key: string) => void;
  handlePin: (key: string, file: MockFileContent) => void;
};

const FileContainer = ({
  name,
  file,
  handleClick,
  handlePin,
}: FileContainerProps) => {
  return (
    <tr
    // component="tr"
    // style={
    //   {
    //     // flex: 1,
    //     // display: "flex",
    //     // flexDirection: "row",
    //     // justifyContent: "space-between",
    //     // alignItems: "center",
    //   }
    // }
    >
      <td
        style={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => handleClick(name)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FileIcon file={file} />
          <Title ml={10} order={6}>
            {name}
          </Title>
        </div>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {toTitleCase(file.type)}
        </div>
      </td>
      <td>
        <IconPin onClick={() => handlePin(name, file)} />
      </td>
    </tr>
  );
};

export default FileContainer;
