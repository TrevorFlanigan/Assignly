import { popToIndex, selectPath } from "@/redux/canvasPathSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Anchor, Breadcrumbs, Button, Group, Header, Kbd } from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons";

const CanvasHeader = () => {
  const dispatch = useAppDispatch();
  const path = useAppSelector(selectPath);

  const handleClick = (index: number) => {
    dispatch(popToIndex(index));
  };

  return (
    <Header
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      height={60}
      p="xs"
    >
      <div> Canvas </div>
      <Breadcrumbs>
        {path.length === 0 ? (
          <div onClick={() => handleClick(0)}>Home</div>
        ) : (
          <Anchor onClick={() => handleClick(0)}>Home</Anchor>
        )}
        {path.map((title, index) => {
          if (index === path.length - 1) {
            return <div key={index}>{title}</div>;
          }
          return (
            <Anchor key={index} onClick={() => handleClick(index + 1)}>
              {path.length > 4 && index < path.length - 2
                ? title[0].toUpperCase()
                : title}
            </Anchor>
          );
        })}
      </Breadcrumbs>
      {/* <Button
        p={10}
        leftIcon={<IconSearch />}
        variant="outline"
        onClick={() => openSpotlight()}
        rightIcon={<Kbd m={10}>⌘ + P</Kbd>}
      >
        Search
      </Button> */}
    </Header>
  );
};

export default CanvasHeader;
