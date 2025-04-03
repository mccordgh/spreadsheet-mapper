import React, { useContext } from "react";

import "../styles/MappingItem.css";

import { Button } from "./Button";
import {
  MappingsContext,
  MappingsContextType,
} from "../context/MappingsContext";
import { HeaderMapping } from "../models/HeaderMapping";
import StringHelper from "../helpers/StringHelper";

type MappingItemProps = {
  headerMapping: HeaderMapping;
};

const MappingItem = (props: MappingItemProps) => {
  const { confirmMapping, deleteMapping } =
    useContext<MappingsContextType>(MappingsContext);
  const { mapFromColumn, mapToColumn, confirmed, id } = props?.headerMapping;

  const iconName = confirmed ? "x" : "checkmark";

  const onClickCallback = () => {
    if (confirmed) {
      deleteMapping(id);
    } else {
      confirmMapping(id);
    }
  };

  const shouldHideButton =
    !confirmed &&
    (StringHelper.isEmpty(mapFromColumn) || StringHelper.isEmpty(mapToColumn));

  return (
    <div className="mapping-item-wrapper">
      <div className="mapping-item mapping-item-from">{mapFromColumn}</div>

      <div className="mapping-item mapping-item-arrow">&rarr;</div>

      <div className="mapping-item mapping-item-to">{mapToColumn}</div>

      {!shouldHideButton && (
        <Button isDisabled={false} icon={iconName} onClick={onClickCallback} />
      )}
    </div>
  );
};

export { MappingItem };
