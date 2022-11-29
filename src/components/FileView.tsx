import createContextMenu from "@/MenuItem/createContextMenu";
import { selectHighestChildren, selectMe } from "@/redux/fileSystemSlice";
import { push, selectPath } from "@/redux/pathSlice";
import { pin } from "@/redux/pinnedSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import openPDF from "@/util/openPDF";
import { Button, Col, Flex, Group, Table, Title } from "@mantine/core";
import { FileType, MenuOptions, MockFileContent } from "common/types";
import AssignmentHeader from "./AssignmentHeader";
import FileContainer from "./FileContainer";
const FileView = () => {
  const dispatch = useAppDispatch();
  const path = useAppSelector(selectPath);
  const highestChildren = useAppSelector(selectHighestChildren);
  const me = useAppSelector(selectMe);

  const isAssignment = me.type === FileType.ASSIGNMENT;

  const handleClick = (key: string, file: MockFileContent) => {
    if (file.type === FileType.PDF) {
      openPDF(file.leaf!);
      return;
    }

    dispatch(push(key));
  };

  const handlePin = (key: string, file: MockFileContent) => {
    dispatch(
      pin({
        path: [...path, key],
        name: key,
        type: file.type,
      })
    );
  };

  const files = Object.entries(highestChildren).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  const createNewThingContextMenu = () => {
    createContextMenu(
      [
        MenuOptions.NEW_FOLDER,
        MenuOptions.NEW_PROJECT,
        MenuOptions.NEW_COURSE,
        MenuOptions.NEW_NOTES,
      ],
      path
    );
  };

  return (
    <div
      onContextMenu={createNewThingContextMenu}
      style={{ userSelect: "none" }}
    >
      {isAssignment && <AssignmentHeader assignment={me} />}
      {files.length == 0 ? (
        <>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Title align="center" order={2}>
              There&apos;s nothing here...
            </Title>
            <Button onClick={createNewThingContextMenu}>
              Add a new container!
            </Button>
          </Flex>
        </>
      ) : (
        <Table striped withColumnBorders withBorder>
          <thead>
            <tr>
              <th style={{ width: "content" }}>Name</th>
              <th style={{ width: "content" }}>Type</th>
              <th style={{ width: "0px" }}></th>
            </tr>
          </thead>
          <tbody>
            {files.map(([name, file]) => (
              <FileContainer
                key={name}
                name={name}
                file={file}
                handleClick={handleClick}
                handlePin={handlePin}
              />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FileView;
