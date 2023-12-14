import { Drawer, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const navigationRoutes = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Search",
      route: "/search",
    },
    {
      name: "My List",
      route: "/my-list",
    },
  ];

  const router = useRouter();

  const list = () => (
    <div
      className="mx-10"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {navigationRoutes.map(({ name, route }, index) => (
        <Typography
          key={index}
          variant="body1"
          className="cursor-pointer"
          style={{ margin: "20px 30px" }}
          onClick={() => {
            router.push(route);
          }}
        >
          {name}
        </Typography>
      ))}
    </div>
  );

  return (
    <>
      <IconButton>
        <MenuIcon onClick={toggleDrawer(true)} />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}

export default Navbar;
