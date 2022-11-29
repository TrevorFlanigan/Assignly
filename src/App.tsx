import { Grid } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import CanvasHeader from "./components/CanvasHeader";
import CanvasView from "./components/CanvasView";
import FileView from "./components/FileView";
import HeaderWithPath from "./components/HeaderWithPath";
import SpotlightContext from "./context/SpotlightContext";
import "./MenuItem/contextMenuHandler";
import useContextEvents from "./MenuItem/contextMenuHandler";
import "./styles.css";

export const CANVAS_TEST = false;

const App: React.FC = () => {
  useContextEvents();
  return (
    <NotificationsProvider>
      <SpotlightContext>
        <Grid columns={2} style={{ height: "100%" }}>
          <Grid.Col
            style={{ borderRight: "1px solid black" }}
            span={CANVAS_TEST ? 2 : 1}
          >
            <CanvasHeader />
            <CanvasView />
          </Grid.Col>
          {!CANVAS_TEST && (
            <Grid.Col
              span={1}
              style={{ borderLeft: "1px solid black", height: "100%" }}
            >
              <HeaderWithPath />
              <FileView />
            </Grid.Col>
          )}
        </Grid>
      </SpotlightContext>
    </NotificationsProvider>
  );
};

export default App;
