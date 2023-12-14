import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { setUserStatus } from "@/app/slices/AppSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Image from "next/image";
import pokeballIcon from "@/public/assets/pokeball-icon.png";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

interface PageLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const PageLayout = ({ children, pageTitle }: PageLayoutProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserStatus({ email: currentUser.email as string }));
      } else {
        router.push("/login");
      }
    });
  }, [dispatch]);

  const logOutUser = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="main-container">
        <div className="app">
          <div
            className="flex items-center bg-white"
            style={{
              justifyContent: "space-between",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Image
              src={pokeballIcon}
              alt={"pokeball Icon"}
              className="cursor-pointer"
              height={48}
              width={48}
              onClick={() => {
                router.push("/");
              }}
            />
            <Navbar />
            <IconButton onClick={handleClick}>
              <Avatar />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  router.push("/userProfile");
                }}
              >
                My account
              </MenuItem>
              <MenuItem onClick={logOutUser}>Logout</MenuItem>
            </Menu>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
