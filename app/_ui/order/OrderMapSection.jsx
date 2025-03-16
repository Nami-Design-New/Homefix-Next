"use client";
import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
export default function OrderMapSection({ lat, lng }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  return (
    <>
      {" "}
      {isLoaded ? (
        <GoogleMap
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            disableDefaultUI: true,
            clickableIcons: false,
            gestureHandling: "greedy",
          }}
          zoom={16}
          center={{
            lat,
            lng,
          }}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          <Marker
            icon="/images/map-pin.svg"
            position={{
              lat,
              lng,
            }}
          />
        </GoogleMap>
      ) : (
        <div className="map_loader">
          <i className="fa-regular fa-spinner fa-spin"></i>
        </div>
      )}
    </>
  );
}
