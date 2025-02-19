import React from "react";
import { DiscordIcon, DocsIcon1, TelegramIcon, TwitterIcon } from "../icon/common";
// import { Twitter, FileText, Disc } from "lucide-react";

const NavixFooter = () => {
  return (
    <footer className="max-w-[1440px] bg-black text-white px-4 py-4 flex justify-between items-center text-sm mx-auto">
      <div>© 2025 Navix Lab Pte. Ltd.</div>

      <div className="flex items-center gap-4">
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          <TwitterIcon />
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          <TelegramIcon />
        </a>

        <a
          href="https://docs.navix.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          <DiscordIcon />
        </a>
        <a
          href="https://docs.navix.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          <DocsIcon1 />
        </a>
      </div>
    </footer>
  );
};

export default NavixFooter;
