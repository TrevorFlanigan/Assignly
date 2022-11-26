import { PinnedItemType } from "@/redux/pinnedSlice";
import { MockFileContent } from "common/types";

type SidebarItemProps = {
  name: string;
  file: MockFileContent | PinnedItemType;
};

const SidebarItem = ({ file, name }: SidebarItemProps) => {
  return <div>{name}</div>;
};

export default SidebarItem;
