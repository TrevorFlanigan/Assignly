import { AppShell, Divider, Grid, Group } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import FileView from "./components/FileView";
import HeaderWithPath from "./components/HeaderWithPath";
import Sidebar from "./components/Sidebar";
import SpotlightContext from "./context/SpotlightContext";
import "./MenuItem/contextMenuHandler";
import useContextEvents from "./MenuItem/contextMenuHandler";
import "./styles.css";
import CanvasView from "./components/CanvasView";
import CanvasHeader from "./components/CanvasHeader";
const App: React.FC = () => {
  useContextEvents();
  return (
    <NotificationsProvider>
      <SpotlightContext>
        <Grid columns={2} style={{ height: "100%" }}>
          <Grid.Col style={{ borderRight: "1px solid black" }} span={1}>
            {/* <AppShell
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            > */}
            <CanvasHeader />
            <CanvasView />
            {/* </AppShell> */}
          </Grid.Col>
          {/* <Divider orientation="vertical" /> */}
          <Grid.Col
            span={1}
            style={{ borderLeft: "1px solid black", height: "100%" }}
          >
            {/* <AppShell
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            > */}
            <HeaderWithPath />
            <FileView />
            {/* </AppShell> */}
          </Grid.Col>
        </Grid>
      </SpotlightContext>
    </NotificationsProvider>
  );
};

export default App;
