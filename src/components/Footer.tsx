import React from "react";

const Footer = () => {
  return (
    <footer className="py-2 w-5/6 flex mx-auto justify-center">
      <p>Next ECommerce | {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
