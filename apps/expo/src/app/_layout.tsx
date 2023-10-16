import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";



import { IdsProvider } from "~/stores/ids";
import { TRPCProvider } from "~/utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <TRPCProvider>
      <IdsProvider>
        {/*
        The Stack component displays the current page.
        It also allows you to configure your screens 
      */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#AE1D55",
            },
            contentStyle: {
              backgroundColor: "#005596",
            }
          }}
        />
        <StatusBar />
      </IdsProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
