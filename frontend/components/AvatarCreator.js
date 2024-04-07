'use client'

import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import { Avatar } from "@readyplayerme/visage";
import { useState } from "react";

const config = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100vh', border: 'none' };

export default function AvatarMaker( { setAvatarUrl }) {
  const handleOnAvatarExported = (event) => {
    setAvatarUrl(event.data.url);
    console.log(event.data.url)
  };

  return (
      <>
        <AvatarCreator subdomain="neel" config={config} style={style} onAvatarExported={handleOnAvatarExported} />
      </>
  );
}