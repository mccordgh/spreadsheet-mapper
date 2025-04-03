import React, { useContext } from "react";

import "../styles/ListItem.css";
import { HeaderItem } from "../models/HeaderItem";
import { HeadersContext } from "../context/HeadersContext";

type ListItemProps = {
  header: HeaderItem;
  type: "from" | "to";
};

const ListItem = (props: ListItemProps) => {
  const { header, type } = props;
  const { id, text } = header;
  const { headerClicked } = useContext(HeadersContext);

  return (
    <div
      className="list-item"
      onClick={() => {
        headerClicked(id, type);
      }}
    >
      <span>{text}</span>
    </div>
  );
};

export { ListItem };
