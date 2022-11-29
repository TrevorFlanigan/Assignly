import { selectFileSystem } from "@/redux/fileSystemSlice";
import { popTo, setPath } from "@/redux/pathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import type { SpotlightAction } from "@mantine/spotlight";
import { SpotlightProvider } from "@mantine/spotlight";
import { IconHome, IconSearch } from "@tabler/icons";
import { FileType, MockDirectory, MockFileContent } from "common/types";
import { ReactNode, useEffect, useState } from "react";
import Fuse from "fuse.js";
import FileIcon from "@/components/FileIcon";
import openPDF from "@/util/openPDF";
type SpotlightContextProps = {
  children: ReactNode;
};

const SEARCH_LIMIT = 7;

const SpotlightContext = ({ children }: SpotlightContextProps) => {
  const files = useAppSelector(selectFileSystem);
  const dispatch = useAppDispatch();
  const [actions, setActions] = useState<SpotlightAction[]>([]);
  const [fuse] = useState<Fuse<SpotlightAction>>(
    new Fuse([], { keys: ["title", "keywords", "description", "group"] })
  );
  const indexFileTree = (currFile: MockDirectory): SpotlightAction[] => {
    const stack = [["", currFile]] as [string, MockDirectory][];
    const ret = [] as SpotlightAction[];
    const handleFileAction = (path: string, file: MockFileContent) => {
      if (file.type === FileType.PDF) {
        openPDF(file.leaf!);
        return;
      }
      dispatch(setPath(path.split("/")));
    };
    while (stack.length) {
      const [path, currItem] = stack.pop() as [string, MockDirectory];
      for (const [key, value] of Object.entries(currItem)) {
        const currPath = `${path}${key}`;
        ret.push({
          title: value.id,
          group: value.type,
          keywords: currPath,
          description: path,
          icon: <FileIcon file={value} />,
          onTrigger: () => {
            handleFileAction(currPath, value);
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
      onTrigger: () => dispatch(popTo(0)),
      icon: <IconHome size={18} />,
    };
    const newActions = indexFileTree(files);
    const allActions = [homeAction, ...newActions];
    fuse.setCollection(allActions);
    setActions([homeAction, ...newActions]);
  }, [files]);

  if (!fuse)
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

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search your files"
      shortcut={["mod + P", "mod + K", "/"]}
      highlightQuery
      filter={(query, actions) => {
        const res = fuse
          .search(query, { limit: SEARCH_LIMIT })
          .map((res) => res.item);
        return res;
      }}
      nothingFoundMessage="Nothing found..."
      limit={SEARCH_LIMIT}
    >
      {children}
    </SpotlightProvider>
  );
};

export default SpotlightContext;
