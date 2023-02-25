import { Service, Inject } from "typedi";
import axios from "axios";
import config from "config";

const BUS_API_URL = "http://ws.bus.go.kr/api/rest";

interface IBusRoute {
  busRouteId: string;
}

interface IBusStop {
  routeId: string;
  stopId: string;
}

interface IBusETA {
  routeId: string;
  busNumber: string;
  plateNumber: string;
  eta: number;
}

@Service()
export default class BusService {
  constructor(@Inject("logger") private logger) {}

  public async getRandomRoutes(): Promise<IBusRoute[]> {
    this.logger.silly("Get busRoutes");
    try {
      const url = `${BUS_API_URL}/busRouteInfo/getBusRouteList?ServiceKey=${config.accessKey}&strSrch=`;
      const response = await axios.get(url);
      const busRoutes = response.data.msgBody.busRouteList;

      const selectedRoutes: IBusRoute[] = [];
      while (selectedRoutes.length < 3) {
        const randomIndex = Math.floor(Math.random() * busRoutes.length);
        const selectedRoute = busRoutes[randomIndex];
        if (!selectedRoutes.includes(selectedRoute)) {
          selectedRoutes.push(selectedRoute);
        }
      }
      return selectedRoutes;
    } catch (e) {
      this.logger.error("🔥 Fail to get busRoutes: %o", e);
      throw e;
    }
  }

  public async getBusStops(busRoutes: string[]): Promise<IBusStop[]> {
    this.logger.silly("Get busStops");
    try {
      const busStops: IBusStop[] = [];

      for (const routeId of busRoutes) {
        const url = `${BUS_API_URL}/arrive/getArrInfoByRouteAll?ServiceKey=${config.accessKey}&busRouteId=${routeId}`;
        const response = await axios.get(url);
        const stops = response.data.msgBody.stations;

        // Get bus stop with most scheduled buses to arrive in 5 minutes
        const selectedStop = stops.reduce(
          (prev, curr) => {
            const currBuses =
              Number(curr.traTime1) + Number(curr.traTime2) <= 5
                ? Number(curr.arrmsg1) + Number(curr.arrmsg2)
                : 0;
            return currBuses > prev.buses
              ? { stopId: curr.station, buses: currBuses }
              : prev;
          },
          { stopId: "", buses: 0 }
        );

        busStops.push({ routeId, stopId: selectedStop.stopId });
      }

      return busStops;
    } catch (e) {
      this.logger.error("🔥 Fail to get busStops: %o", e);
      throw e;
    }
  }

  public async getFastestBusArrivals(busStops: IBusStop[]): Promise<IBusETA[]> {
    this.logger.silly("Get busArrivals");
    try {
      const busArrivals: IBusETA[] = [];

      for (const stop of busStops) {
        const url = `${BUS_API_URL}/arrive/getArrInfoByRouteList?ServiceKey=${config.accessKey}&stId=${stop.stopId}&busRouteId=${stop.routeId}&ord=1`;
        const response = await axios.get(url);
        const arrivals = response.data.msgBody.itemList;

        arrivals.forEach((arrival) => {
          busArrivals.push({
            routeId: stop.routeId,
            busNumber: arrival.rtNm,
            plateNumber: arrival.plainNo1,
            eta: arrival.traTime1,
          });
        });
      }

      return busArrivals.sort((a, b) => a.eta - b.eta);
    } catch (e) {
      this.logger.error("🔥 Fail to get busArrivals: %o", e);
      throw e;
    }
  }
}
