import { selectFileSystem } from "@/redux/fileSystemSlice";
import { popTo, setPath } from "@/redux/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import type { SpotlightAction } from "@mantine/spotlight";
import { SpotlightProvider } from "@mantine/spotlight";
import { IconHome, IconSearch } from "@tabler/icons";
import { MockFile } from "common/types";
import { ReactNode, useEffect, useState } from "react";
type SpotlightContextProps = {
  children: ReactNode;
};

const SpotlightContext = ({ children }: SpotlightContextProps) => {
  const files = useAppSelector(selectFileSystem);
  const dispatch = useAppDispatch();
  const [actions, setActions] = useState<SpotlightAction[]>([]);

  const indexFileTree = (currFile: MockFile): SpotlightAction[] => {
    const stack = [["", currFile]] as [string, MockFile][];
    const ret = [] as SpotlightAction[];
    const handleFileAction = (path: string) => {
      dispatch({ type: setPath.type, payload: path.split("/") });
    };
    while (stack.length) {
      const [path, currItem] = stack.pop() as [string, MockFile];
      for (const [key, value] of Object.entries(currItem)) {
        const currPath = `${path}${key}`;
        ret.push({
          title: value.id,
          group: value.type,
          onTrigger: () => {
            handleFileAction(currPath);
          },
        });
        if (value.items) {
          const items = value.items;
          stack.push([currPath + "/", items]);
        }
      }
    }
    return ret;
  };

  useEffect(() => {
    const homeAction = {
      title: "Home",
      description: "Go home",
      onTrigger: () => dispatch({ type: popTo.type, payload: 0 }),
      icon: <IconHome size={18} />,
    };
    const newActions = indexFileTree(files);
    setActions([homeAction, ...newActions]);
  }, []);

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search your files"
      shortcut={["mod + P", "mod + K", "/"]}
      highlightQuery
      filter={(query, actions) =>
        actions.filter(
          (action) =>
            action.title.toLowerCase().includes(query.toLowerCase()) ||
            action.description?.toLowerCase().includes(query.toLowerCase()) ||
            action.group?.toLowerCase().includes(query.toLowerCase()) ||
            action.keywords
              ?.toString()
              .toLowerCase()
              ?.includes(query.toLowerCase())
        )
      }
      nothingFoundMessage="Nothing found..."
      limit={7}
    >
      {children}
    </SpotlightProvider>
  );
};

export default SpotlightContext;
