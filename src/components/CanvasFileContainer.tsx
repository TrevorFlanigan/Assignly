import createContextMenu from "@/MenuItem/createContextMenu";
import { selectToCopy } from "@/redux/canvasFileSystemSlice";
import { selectPath as selectCanvasPath } from "@/redux/canvasPathSlice";
import { finishCopyTo } from "@/redux/fileSystemSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Popover, Title } from "@mantine/core";
import { MenuOptions, MockFileContent } from "common/types";
import CopyTo from "./CopyTo";
import FileIcon from "./FileIcon";

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

type CanvasFileContainerProps = {
  name: string;
  file: MockFileContent;
  handleClick: (key: string, file: MockFileContent) => void;
};

const CanvasFileContainer = ({
  name,
  file,
  handleClick,
}: CanvasFileContainerProps) => {
  const canvasPath = useAppSelector(selectCanvasPath);
  const myPath = [...canvasPath, name];
  const toCopy = useAppSelector(selectToCopy);

  const beingCopied = toCopy?.join("") === myPath.join("");
  const dispatch = useAppDispatch();
  const cancelMoveTo = () => {
    dispatch(
      finishCopyTo({ cancel: true, file: undefined, path: [], name: "" })
    );
  };

  return (
    <Popover
      trapFocus
      onClose={cancelMoveTo}
      opened={beingCopied}
      withArrow
      shadow={"md"}
    >
      <tr
        onContextMenu={() => {
          createContextMenu([MenuOptions.COPY_TO], myPath);
        }}
      >
        <Popover.Target>
          <td
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => handleClick(name, file)}
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
        </Popover.Target>
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
      <Popover.Dropdown>
        {toCopy && <CopyTo canvasPath={toCopy} />}
      </Popover.Dropdown>
    </Popover>
  );
};

export default CanvasFileContainer;
