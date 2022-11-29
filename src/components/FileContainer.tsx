import createContextMenu from "@/MenuItem/createContextMenu";
import {
  finishChangeType,
  finishMoveTo,
  finishRename,
  selectFileSystem,
  selectHighestChildren,
  selectToChangeType,
  selectToMove,
  selectToRename,
} from "@/redux/fileSystemSlice";
import { selectPath } from "@/redux/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import toTitleCase from "@/util/toTitleCase";
import { Popover, Select, TextInput, Title } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import { FileType, MenuOptions, MockFileContent } from "common/types";
import { useEffect, useRef, useState } from "react";
import FileIcon from "./FileIcon";
import MoveTo from "./MoveTo";

type FileContainerProps = {
  name: string;
  file: MockFileContent;
  handleClick: (key: string, file: MockFileContent) => void;
  handlePin: (key: string, file: MockFileContent) => void;
};

const FileContainer = ({
  name,
  file,
  handleClick,
  handlePin,
}: FileContainerProps) => {
  const path = useAppSelector(selectPath);
  const fs = useAppSelector(selectFileSystem);
  console.log(fs);

  const myPath = [...path, name];
  const toRename = useAppSelector(selectToRename);
  const toChangeType = useAppSelector(selectToChangeType);
  const toMove = useAppSelector(selectToMove);
  const [newName, setNewName] = useState(name);
  const beingRenamed = toRename?.join("") === myPath.join("");
  const beingTypeChanged = toChangeType?.join("") === myPath.join("");
  const beingMoved = toMove?.join("") === myPath.join("");
  const textInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const siblings = useAppSelector(selectHighestChildren);

  const handleSelectType = (type: string) => {
    dispatch(finishChangeType({ path: myPath, type }));
  };
  // Select the existing name on rename
  useEffect(() => {
    if (!beingRenamed) return;
    textInputRef.current?.select();
  }, [beingRenamed]);

  const cancelRename = () => {
    dispatch(finishRename({ name, newName: name, path }));
    setNewName(name);
  };

  const cancelMoveTo = () => {
    dispatch(finishMoveTo({ srcPath: path, destPath: path }));
  };

  const handleSubmitText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(finishRename({ name, newName, path }));
    } else if (e.key === "Escape") {
      cancelRename();
    }
  };
  return (
    <Popover
      trapFocus
      onClose={cancelMoveTo}
      opened={beingMoved}
      withArrow
      shadow={"md"}
    >
      <tr
        onContextMenu={() => {
          createContextMenu(
            [MenuOptions.RENAME, MenuOptions.CHANGE_TYPE, MenuOptions.MOVE_TO],
            myPath
          );
        }}
      >
        <Popover.Target>
          <td
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              if (!beingRenamed) handleClick(name, file);
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FileIcon file={file} />

              {beingRenamed ? (
                <TextInput
                  onKeyUp={handleSubmitText}
                  ref={textInputRef}
                  autoFocus
                  onBlur={cancelRename}
                  onClickCapture={(e) => e.stopPropagation()}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              ) : (
                <Title ml={10} order={6}>
                  {name}
                </Title>
              )}
            </div>
          </td>
        </Popover.Target>

        <td>
          {beingTypeChanged ? (
            <Select
              value={file.type}
              onChange={handleSelectType}
              data={Object.keys(FileType)
                .filter((el) => {
                  return isNaN(Number(el));
                })
                .map((name) => ({ value: name, label: toTitleCase(name) }))}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {toTitleCase(file.type)}
            </div>
          )}
        </td>
      </tr>
      <Popover.Dropdown>
        <MoveTo srcPath={toMove} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default FileContainer;
