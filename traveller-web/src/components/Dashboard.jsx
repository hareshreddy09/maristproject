import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  VStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  useDisclosure,
  CircularProgress,
  Progress,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { FaLocationArrow, FaSun, FaTimes } from "react-icons/fa";
import { Geolocation } from "@capacitor/geolocation";

import Weather from "./Weather";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  TrafficLayer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import { icon } from "@fortawesome/fontawesome-svg-core";

const center = { lat: 48.8584, lng: 2.2945 };
const REACT_APP_API_URL = "https://api.openweathermap.org/data/2.5";
const REACT_APP_API_KEY = "ba740b7456684cb8d90955612d044920";

function Dashboard() {
  let count = 0;
  const authToken = useSelector((state) => state.token);
  const notifications = useSelector((state) => state.notifications);
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA8kf7v3pJof6_w6_Pr9y0zwcCrkQCK4l8",
    libraries: ["places"],
  });

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    return coordinates;
  };
  const dispatch = useDispatch();

  const size = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  // weather
  const [loading, setLoading] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [srcPlace, setSrcPlace] = useState("");
  const [dstPlace, setDstPlace] = useState("");
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const [forecast, setForecast] = useState([]);

  async function onDrawerOpen() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    setLoading(true);
    let src_lat;
    let src_lng;
    let dst_lat;
    let dst_lng;

    const getWeatherNotification = (weatherData) => {
      let n = { type: "info", msg: "" };
      if (weatherData.weather[0].main === "Thunderstorm") {
        n.msg = `Thunderstorm|${weatherData.name}`;
        n.type = "warn";
      } else if (weatherData.weather[0].main === "Drizzle") {
        n.msg = `Drizzle|${weatherData.name}`;
        n.type = "warn";
      } else if (weatherData.weather[0].main === "Rain") {
        n.msg = `Rain|${weatherData.name}`;
        n.type = "warn";
      } else if (weatherData.weather[0].main === "Snow") {
        n.msg = `Snow|${weatherData.name}`;
        n.type = "warn";
      } else if (weatherData.weather[0].main === "Clear") {
        n.msg = `Clear|${weatherData.name}`;
        n.type = "info";
      } else if (weatherData.weather[0].main === "Clouds") {
        n.msg = `Clouds|${weatherData.name}`;
        n.type = "warn";
      } else {
        n.msg = `Clear|${weatherData.name}`;
        n.type = "info";
      }
      return n;
    };
    try {
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });

      src_lat = results.routes[0].legs[0].start_location.lat();
      src_lng = results.routes[0].legs[0].start_location.lng();
      dst_lat = results.routes[0].legs[0].end_location.lat();
      dst_lng = results.routes[0].legs[0].end_location.lng();
      setSrcPlace(results.routes[0].legs[0].start_address);
      setDstPlace(results.routes[0].legs[0].end_address);

      let wDetails = [];
      let notifications = [];
      let srcw = await getWeather(
        results.routes[0].legs[0].start_location.lat(),
        results.routes[0].legs[0].start_location.lng()
      );
      srcw.name = results.routes[0].legs[0].start_address;
      notifications.push(getWeatherNotification(srcw));
      wDetails.push(srcw);

      for (let step of results.routes[0].legs[0].steps) {
        let wdata = await getWeather(
          step.start_location.lat(),
          step.end_location.lng()
        );
        // wdata.name = `${step.start_location.lat()}|${ step.end_location.lng()}`
        notifications.push(getWeatherNotification(wdata));
        wDetails.push(wdata);
      }
      let dstw = await getWeather(
        results.routes[0].legs[0].end_location.lat(),
        results.routes[0].legs[0].end_location.lng()
      );
      dstw.name = results.routes[0].legs[0].end_address;
      notifications.push(getWeatherNotification(dstw));
      wDetails.push(dstw);

      setWeatherDetails(wDetails);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: [...notifications],
      });
      setLoading(false);
      onOpen();
    } catch (e) {
      alert(
        "Failed to get Weather data.Try setting source and destination again"
      );
      return;
    }

    /** 
    getWeather(src_lat, src_lng).then(w => {
      setWeatherData(w);
      // let source_w = `${srcPlace} weather : ${w.weather[0].main}, Temp:${w.main.temp} Humidity:${w.main.humidity}` 
      // dispatch({
      //   type: 'SET_NOTIFICATION',
      //   payload: [source_w],
      // });
      getWeather(dst_lat, dst_lng).then(w => {
        setWeatherData2(w);
        let dest_w = `weather : ${w.weather[0].main}, Temp:${w.main.temp} Humidity:${w.main.humidity}`
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: [...notifications, dest_w],
        });
        setLoading(false)
        onOpen();

      }).catch(err => {
        setLoading(false);
        alert("Failed to get Weather data.")
      });


    }).catch(err => {
      setLoading(false);
      alert("Failed to get Weather data.")
    });
**/
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("latitude & longitude", lat, long);
    });
  }, [lat, long]);

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  }

  function getWeather(lat, long) {
    return fetch(
      `${REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`
    )
      .then((res) => handleResponse(res))
      .then((weather) => {
        return weather;

        // if (Object.entries(weather).length) {
        //   const mappedData = mapDataToWeatherInterface(weather);
        //   return mappedData;
        // }
      });
  }

  function getForecast(lat, long) {
    return fetch(
      `${REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`
    )
      .then((res) => handleResponse(res))
      .then((forecastData) => {
        if (Object.entries(forecastData).length) {
          return forecastData.list
            .filter((forecast) => forecast.dt_txt.match(/09:00:00/))
            .map(mapDataToWeatherInterface);
        }
      });
  }

  function mapDataToWeatherInterface(data) {
    const mapped = {
      date: data.dt * 1000, // convert from seconds to milliseconds
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
    };

    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }

    return mapped;
  }

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <>Loading Map...</>;
  }

  async function calculateRoute() {
    const getStepColor = (step, avgSpeed) => {
      let speed = step.distance.value / step.duration.value;
      // speed = speed + (20/100*speed);
      console.log("avgspeed,speed", avgSpeed, ",", speed);
      return speed <= avgSpeed ? "#00ff00" : "#ff0000";
    };

    const getTitle = (str) => {
      return str.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi, "");
    };

    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    count = count + 1;

    // eslint-disable-next-line no-undef
    // const trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(map);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(Date.now()),
        // eslint-disable-next-line no-undef
        trafficModel: google.maps.TrafficModel.BEST_GUESS,
      },
    });
    console.log(results.routes);

    const route = results.routes[0];

    const isJam = (step, avgSpeed) => {
      let speed = step.distance.value / step.duration.value;

      console.log("Jam avgspeed,speed", avgSpeed, ",", speed);
      return speed <= 0.1 ? true : false;
    };

    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({
      lat: route.legs[0].start_location.lat(),
      lng: route.legs[0].start_location.lng(),
    });
    bounds.extend({
      lat: route.legs[0].end_location.lat(),
      lng: route.legs[0].end_location.lng(),
    });
    map.fitBounds(bounds);
    let n = [];
    // trafficLayer.setMap(map);
    route.legs.forEach((leg) => {
      leg.steps.forEach((step) => {
        const p = [
          { lat: step.start_location.lat(), lng: step.start_location.lng() },
          { lat: step.end_location.lat(), lng: step.end_location.lng() },
        ];
        // eslint-disable-next-line no-undef
        const path = google.maps.geometry.encoding.decodePath(
          step.polyline.points
        );
        // eslint-disable-next-line no-undef
        const polyline = new google.maps.Polyline({
          path: path,
          strokeColor: getStepColor(
            step,
            route.legs[0].distance.value / route.legs[0].duration.value
          ),
          strokeOpacity: 1.0,
          strokeWeight: 5,
        });
        polyline.setMap(map);
        //eslint-disable-next-line no-undef

        if (
          isJam(
            step,
            route.legs[0].distance.value / route.legs[0].duration.value
          )
        ) {
          n.push({
            type: "warn",
            msg: "Road Blockage" + "|" + step.start_location,
          });

          // eslint-disable-next-line no-undef
          const block = new google.maps.Marker({
            position: {
              lat: parseFloat(step.start_location.lat()),
              lng: parseFloat(step.start_location.lng()),
            },
            map: map,
            title: getTitle(step.instructions),
            icon: {
              // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxDSuWbsL-i9FbA4Y562pM2csgXuCTAz1Dw&usqp=CAU
              // https://maps.google.com/mapfiles/kml/shapes/placemark_circle.png

              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxDSuWbsL-i9FbA4Y562pM2csgXuCTAz1Dw&usqp=CAU",
              //eslint-disable-next-line no-undef
              scaledSize: new google.maps.Size(30, 30),
            },
            zIndex: 999,
          });
          block.setMap(map);
        } else {
          n.push({
            type: "info",
            msg: "Light Traffic" + "|" + step.start_location,
          });
          if (step.distance.value > 200) {
            // eslint-disable-next-line no-undef
            const marker = new google.maps.Marker({
              position: {
                lat: parseFloat(step.start_location.lat()),
                lng: parseFloat(step.start_location.lng()),
              },
              map: map,
              title: getTitle(step.instructions),
              icon: {
                // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxDSuWbsL-i9FbA4Y562pM2csgXuCTAz1Dw&usqp=CAU
                // https://maps.google.com/mapfiles/kml/shapes/placemark_circle.png

                url: "https://maps.google.com/mapfiles/kml/shapes/placemark_circle.png",
                //eslint-disable-next-line no-undef
                scaledSize: new google.maps.Size(30, 30),
              },
              zIndex: 999,
            });
            // Set the marker on the map
            marker.setMap(map);
          }
        }
      });
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    let notificationMsg = `${dstPlace.substring(0, 8) + "..."} distance:${
      results.routes[0].legs[0].distance.text
    } duration:${results.routes[0].legs[0].duration.text}`;
    dispatch({
      type: "SET_NOTIFICATION",
      payload: [...n],
    });
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  if (!authToken) {
    navigate("/login");
  }

  if (count > 200) {
    return <div>Maximum request limit reached</div>;
  }
  if (size === "sm") {
    return (
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          {loading ? <>loading</> : <></>}
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
              weatherControl: true,
            }}
            onLoad={(map) => {
              setMap(map);
            }}
          >
            {/* <Marker position={center} />
            <TrafficLayer ></TrafficLayer> */}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
        <Box
          p={[2, 4]} /* adjust padding based on screen size */
          borderRadius="lg"
          m={[16, 4]} /* adjust margin based on screen size */
          bgColor="white"
          width="380px"
          shadow="base"
          zIndex="1"
        >
          <VStack
            spacing={2}
            justifyContent="center"
            alignItems={[
              "stretch",
              "center",
            ]} /* adjust alignItems based on screen size */
          >
            <Box w={["100%", "auto"]} /* adjust width based on screen size */>
              <Autocomplete>
                <Input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </Box>
            <Box w={["100%", "auto"]} /* adjust width based on screen size */>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>

            <ButtonGroup>
              <Button
                colorScheme="blue"
                type="submit"
                onClick={calculateRoute}
                w={["100%", "auto"]} /* adjust width based on screen size */
              >
                Find Route
              </Button>
              <IconButton
                aria-label="center back"
                icon={<FaSun />}
                isRound
                onClick={onDrawerOpen}
              />
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>

            <HStack
              spacing={4}
              mt={4}
              justifyContent={[
                "center",
                "space-between",
              ]} /* adjust justifyContent based on screen size */
            >
              <Text>Distance: {distance} </Text>
              <Text>Duration: {duration} </Text>
            </HStack>
          </VStack>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          blockScrollOnMount={true}
          isFullHeight={true}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Weather Details</DrawerHeader>

            <DrawerBody>
              <Weather weatherDetails={weatherDetails}></Weather>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  } else {
    return (
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          {loading ? <Progress size="xs" isIndeterminate /> : <></>}

          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
              weatherControl: true,
            }}
            onLoad={(map) => setMap(map)}
          >
            {/* <Marker position={center} /> */}
            {/* <Marker position={ { lat: lat, lng: long }} icon={RoadblockIcon} visible={true}></Marker> */}
            {/* <TrafficLayer autoUpdate></TrafficLayer> */}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>

        <Box
          p={4}
          borderRadius="lg"
          m={4}
          bgColor="white"
          shadow="base"
          minW="container.md"
          zIndex="1"
        >
          <HStack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              <Autocomplete>
                <Input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>

            <ButtonGroup>
              <Button colorScheme="blue" type="submit" onClick={calculateRoute}>
                Find Route
              </Button>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
              <IconButton
                aria-label="center back"
                icon={<FaSun />}
                isRound
                onClick={onDrawerOpen}
              />
              <IconButton
                aria-label="center back"
                icon={<FaLocationArrow />}
                isRound
                onClick={async () => {
                  let coord = await getCurrentPosition();
                  console.log(coord, "@@");
                  //eslint-disable-next-line no-undef
                  const mark = new google.maps.Marker({
                    position: {
                      lat: parseFloat(coord.coords.latitude),
                      lng: parseFloat(coord.coords.longitude),
                    },
                    map: map,
                    zIndex: 999,
                  });
                  mark.setMap(map);
                  map.panTo({
                    lat: coord.coords.latitude,
                    lng: coord.coords.longitude,
                  });
                  map.setZoom(15);
                }}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent="space-between">
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
          </HStack>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          blockScrollOnMount={true}
          isFullHeight={true}
          size={"lg"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Weather Details</DrawerHeader>

            <DrawerBody>
              <Weather weatherDetails={weatherDetails}></Weather>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  }
}

export default Dashboard;
