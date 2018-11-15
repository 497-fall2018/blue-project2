import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./material_title_panel";

const styles = {
  sidebar: {
    width: 150,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "white",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#46556F"
  },
  content: {
    padding: "8px",
    height: "100%",
    backgroundColor: "#46556F"
  },
  title : {
    backgroundColor: "#323B4B"
  }
};

const SidebarContent = props => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  const links = [];

  for (let ind = 0; ind < 10; ind++) {
    links.push(
      <a key={ind} href="#" style={styles.sidebarLink}>
        Mock menu item {ind}
      </a>
    );
  }

  return (
    <MaterialTitlePanel title="DJ Prudo" style={style}>
      <div style={styles.content}>
        <a href="index.html" style={styles.sidebarLink}>
          Home
        </a>
        <a href="responsive_example.html" style={styles.sidebarLink}>
          Responsive Example
        </a>
        <div style={styles.divider} />
        {links}
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;