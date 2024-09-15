import { useMap, Label, useEvent } from "@mappedin/react-sdk";

export function Labels() {
  const { mapData } = useMap();

  useEvent("click", (event) => {
    const { labels } = event;

    if (labels.length > 0) {
      labels.forEach(() => {});
    }
  });

  return (
    <>
      {mapData.getByType("space").map((space, idx) => {
        return (
          <Label
            key={idx}
            target={space.center}
            text={space.name}
            options={{
              interactive: true,
              appearance: {
                marker: {
                  foregroundColor: {
                    active: "purple",
                  },
                },
                text: {
                  foregroundColor: "purple",
                },
              },
            }}
          />
        );
      })}
      {mapData.getByType("point-of-interest").map((poi, idx) => {
        return (
          <Label
            key={idx}
            target={poi.coordinate}
            text={poi.name}
            options={{
              interactive: true,
              appearance: {
                marker: {
                  foregroundColor: {
                    active: "dodgerblue",
                  },
                },
                text: {
                  foregroundColor: "dodgerblue",
                },
              },
            }}
          />
        );
      })}
    </>
  );
}
