import React from "react";
import GoogleMapReact from "google-map-react";
import treeImage from "../assets/planting-tree.jpg";
import TreeMarker from "./TreeMarker";

function TreeInfo(props) {

  if (props.tree === undefined) {
    return <React.Fragment />
  }

  const { description, owner, specie, fruitful, lat, lng } = props.tree

  return (
    <React.Fragment>
      <div className="flex flex-row h-1/2 w-full">
        <div className="w-1/2 flex flex-col justify-between m-1">
          <div>
            <b>{description}</b>
            <h1>Tree planted by {owner.nickname}</h1>
          </div>
          <div>
            <b>Specie:</b>
            <h1>{specie}</h1>
          </div>
          <div>
            <b>Fruitful?</b>
            <h1>{fruitful.toString().charAt(0).toUpperCase() + fruitful.toString().slice(1)}</h1>
          </div>
        </div>
        <div className="w-1/2">
          <img className="object-cover w-full h-full" src={treeImage} alt="planting-tree" />
        </div>
      </div>
      <div className="w-full h-1/2">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          defaultZoom={16}
        >

          <TreeMarker
            lat={parseFloat(lat)}
            lng={parseFloat(lng)}
          />

        </GoogleMapReact>
      </div>
    </React.Fragment>
  );
}

export default TreeInfo;
