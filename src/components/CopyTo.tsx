import { selectToCopyFile } from "@/redux/canvasFileSystemSlice";
import {
  finishCopyTo,
  highestChildrenHelper,
  selectFileSystem,
} from "@/redux/fileSystemSlice";
import { selectPath } from "@/redux/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ActionIcon, Button, Group, Text, Title, Tooltip } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import { useMemo, useState } from "react";

type CopyToProps = {
  canvasPath: string[];
};

const CopyTo = ({ canvasPath }: CopyToProps) => {
  const fileSystem = useAppSelector(selectFileSystem);
  const currPath = useAppSelector(selectPath);
  const [localPath, setLocalPath] = useState(currPath || []);
  const fileToCopy = useAppSelector(selectToCopyFile);
  const [selectedPath, setSelectedPath] = useState<string[]>(currPath || []);
  const dispatch = useAppDispatch();
  const currDir = useMemo(() => {
    console.log(localPath, fileSystem);

    return highestChildrenHelper(fileSystem, localPath);
  }, [localPath]);
  const handleFinish = (selectedPath: string[]) => {
    if (!fileToCopy) return;
    dispatch(
      finishCopyTo({
        file: Object.assign(fileToCopy, {}),
        path: selectedPath,
        name: canvasPath[canvasPath.length - 1],
      })
    );
  };

  return (
    <div>
      <>
        <Title order={6} color="gray">
          {localPath.slice(-1).length ? localPath.slice(-1) : "Home"}
        </Title>
        <Group>
          <ActionIcon
            style={{ visibility: localPath.length ? "visible" : "hidden" }}
            onClick={() => {
              setSelectedPath((old) => old?.slice(0, -1) || []);
              setLocalPath((old) => old.slice(0, -1));
            }}
          >
            <IconArrowLeft />
          </ActionIcon>
          <Title order={6}>Copy File to...</Title>
        </Group>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Object.keys(currDir).length === 0 && (
            <Text>There&apos;s nothing here.</Text>
          )}
          {Object.keys(currDir).map((key) => {
            if (canvasPath.join("/") === [...localPath, key].join("/"))
              return (
                <Text my={2} color={"gray"} key={key}>
                  {key}
                </Text>
              );
            if (selectedPath?.join("/") === [...localPath, key].join("/"))
              return (
                <Group my={2} position="apart" key={key}>
                  <Button
                    style={{ flex: 1 }}
                    variant="filled"
                    key={key}
                    onClick={() => {
                      setSelectedPath([...localPath, key]);
                    }}
                  >
                    <Title order={6}>{key}</Title>
                  </Button>
                  <Tooltip label={`Go to ${key}`}>
                    <ActionIcon
                      onClick={() => {
                        setSelectedPath([...localPath, key]);
                        setLocalPath((old) => [...old, key]);
                      }}
                    >
                      <IconArrowRight />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              );
            return (
              <Group my={2} position="apart" key={key}>
                <Button
                  style={{ flex: 1 }}
                  variant="subtle"
                  key={key}
                  onClick={() => {
                    setSelectedPath([...localPath, key]);
                  }}
                >
                  <Title order={6}>{key}</Title>
                </Button>
                <Tooltip label={`Go to ${key}`}>
                  <ActionIcon
                    onClick={() => {
                      setSelectedPath([...localPath, key]);
                      setLocalPath((old) => [...old, key]);
                    }}
                  >
                    <IconArrowRight />
                  </ActionIcon>
                </Tooltip>
              </Group>
            );
          })}
        </div>
        <Group mt={10} position="right">
          <Tooltip
            disabled={!selectedPath}
            label={`Move ${canvasPath.slice(-1)} to ${
              selectedPath?.length ? selectedPath?.slice(-1) : "Home"
            }`}
          >
            <Button
              onClick={() => {
                if (selectedPath) handleFinish(selectedPath);
              }}
              disabled={!selectedPath}
            >
              {Object.keys(currDir).length === 0 ? "Move Here" : "Move"}
            </Button>
          </Tooltip>
        </Group>
      </>
    </div>
  );
};

export default CopyTo;
