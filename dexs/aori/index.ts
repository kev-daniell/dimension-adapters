import fetchURL from "../../utils/fetchURL";
import type { SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";

type VolumeData = {
    total_volume: number;
    daily_volume: number;
};

const fetch = (chain: string) => async (timestamp: number) => {
    const stats: VolumeData = (
        await fetchURL(
            `http://localhost:8080/analytics/volume/${chain}?timestamp=${timestamp}`
        )
    ).data;
    return {
        totalVolume: `${stats.total_volume}`,
        dailyVolume: `${stats.daily_volume}`,
        timestamp,
    };
};

const adapter: SimpleAdapter = {
    adapter: {
        [CHAIN.ETHEREUM]: {
            fetch: fetch("1"),
            start: async () => 1679309404,
        }
    },
};

export default adapter;
