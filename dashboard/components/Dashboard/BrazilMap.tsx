import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
// Importe o geojson do Brasil conforme necessário
// import brazilGeoJson from '../../public/assets/brazil-geo.json';

type MapData = { name: string; value: number }[];

export default function BrazilMap({ data }: { data: MapData }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const chart = echarts.init(ref.current);
      // echarts.registerMap('BR', brazilGeoJson as any);
      chart.setOption({
        series: [{
          type: 'map',
          map: 'BR',
          data,
        }],
        visualMap: { min: 0, max: 500, left: 10, bottom: 10 },
      });
      return () => chart.dispose();
    }
  }, [data]);
  return <div ref={ref} style={{ width: '100%', height: 400 }} />;
}
