import { getMapData, show3dMap } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/index.css";

// See Demo API key Terms and Conditions
// https://developer.mappedin.com/v6/demo-keys-and-maps/
const options = {
  key: 'mik_jLcoTTRYFT3O05Su152e306f6',
  secret: 'mis_0rSTYuJi6ivxlsbRb8P157jwriG1xVU8IocaK0YldqI94881083',
  mapId: '66e50265af770b000b90802d'
};

async function init() {
  const mapData = await getMapData(options);
  // const mapView = await show3dMap(document.getElementById('mappedin-map') as HTMLDivElement, mapData);

  // mapData.getByType('space').forEach(space => {
  //   hoverColor:   'orange'
  // })

  // const firstSpace = mapData.getByType('space').find((s) => s.name === "4434") as Space
  // const secondSpace = mapData.getByType('space').find((s) => s.name === "4338") as Space
  
  // mapView.Labels.add(firstSpace, firstSpace.name)
  // mapView.Labels.add(secondSpace, secondSpace.name)

  // if (firstSpace && secondSpace) {
  //   const directions = mapView.getDirections(firstSpace, secondSpace)

  //   if (directions) {
  //     mapView.Paths.add(directions.coordinates, {
  //       nearRadius: 0.5,
  //       farRadius: 0.5
  //     })
  //   }
  // }

  //Display the default map in the mappedin-map div.
  const mapView = await show3dMap(
    document.getElementById("mappedin-map") as HTMLDivElement,
    mapData
  );

  // Get a departure and arrival space.
  mapData.getByType("space").forEach(space => {
    if (space.name) {
      console.log(`${space.name}`)
    }
  })
  const room = window.prompt("Enter a room","4437");

  const depart = mapData
    .getByType("space")
    .find((space) => space.name === room)!;
  const arrive = mapData
    .getByType("space")
    .find((space) => space.name === "3106")!;

  // Get directions between the two spaces.
  const directions = mapView.getDirections(depart, arrive)!;

    // Draw the directions on the map.
    mapView.Navigation.draw(directions);
}


init();