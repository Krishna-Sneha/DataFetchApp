import React from "react";
import { Typography } from "@mui/material/";

const Convert = (props) => {
  const jsonNotes = props.props;
  const cleanedNotes = jsonNotes.replace(/\n/g, "");
  const parsedData = JSON.parse(JSON.stringify(cleanedNotes));
  const data = parsedData && JSON.parse(parsedData);
  const actualData = data.content;

  const fData = actualData && actualData[0].content;
  console.log("fData");

  const getStyleFromAttrs = (attrs) => {
    // Define your custom mapping of JSON attributes to CSS styles here
    const styles = {
      color: attrs.textColor,
      backgroundColor: attrs.backgroundColor,
      textAlign: attrs.textAlignment || "center",
    };
    return styles;
  };

  const renderData = (each_fData) => {
    return (
      Array.isArray(each_fData) &&
      each_fData.map((item, index) => {
        const styles = item.attrs && getStyleFromAttrs(item.attrs);
        console.log("item: ");
        console.log(item);
        if (item.type === "paragraph") {
          return (
            <div key={index} style={styles}>
              <Typography variant="body2" key={index}>
                {item.content && item.content[0].text}
              </Typography>
            </div>
          );
        } else if (item.type === "heading") {
          const styles = getStyleFromAttrs(item.attrs);
          return (
            <div key={index} style={styles}>
              <Typography variant="h6" key={index}>
                {item.content && item.content[0].text}
              </Typography>
            </div>
          );
        } else if (item.content) {
          return <div key={index}>{renderData(item.content)}</div>;
        }
        return null;
      })
    );
  };

  return <div>{renderData(fData)}</div>;
};

export default Convert;
