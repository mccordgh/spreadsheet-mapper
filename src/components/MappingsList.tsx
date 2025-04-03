import React, { useContext } from "react";

import "../styles/MappingsList.css";

import { MappingItem } from "./MappingItem";
import {
  MappingsContext,
  MappingsContextType,
} from "../context/MappingsContext";
import { HeaderMapping } from "../models/HeaderMapping";

// const dummyMapping: HeaderMapping[] = [
//     { mapFromColumn: 'Item', mapToColumn: 'Product' },
//     { mapFromColumn: 'Date', mapToColumn: 'Time' },
//     { mapFromColumn: 'One Thing', mapToColumn: 'Another' },
// ];

const MappingsList = () => {
  const { mappings } = useContext<MappingsContextType>(MappingsContext);

  const getListContainer = () => {
    console.log({ mappings: mappings });
    return (
      <div className="mappings-list--items">
        {mappings?.map((mapping: HeaderMapping, index) => (
          <MappingItem key={index} headerMapping={mapping} />
        ))}
        {/* <MappingItem headerMapping={{id: -1, mapFromColumn: '', mapToColumn: '', confirmed: false}} /> */}
      </div>
    );
  };

  return (
    <div className="mappings-list">
      <span className="mappings-list--title">Mappings:</span>
      {getListContainer()}
    </div>
  );
};

export { MappingsList };
