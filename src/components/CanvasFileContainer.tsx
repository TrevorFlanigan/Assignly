import { MockFileContent } from "common/types";
import { Title } from "@mantine/core";
import FileIcon from "./FileIcon";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

type CanvasFileContainerProps = {
  name: string;
  file: MockFileContent;
  handleClick: (key: string) => void;
};

const CanvasFileContainer = ({
  name,
  file,
  handleClick,
}: CanvasFileContainerProps) => {
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
    </tr>
  );
};

export default CanvasFileContainer;
