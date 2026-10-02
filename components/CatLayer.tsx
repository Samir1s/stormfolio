"use client";

import Oneko from "@/components/oneko";

export default function CatLayer() {
  return (
    <Oneko
      meow={false}
      bubbleText={["purr patrol", "ship it", "clean code", "vibes only"]}
      skin="classic"
      followCursor={true}
      sleepEnabled={true}
      paused={false}
      zIndex={9999}
    />
  );
}