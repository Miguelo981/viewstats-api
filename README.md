# viewstats-api
 
`viewstats-api` is an unofficial wrapper for the ViewStats API, designed to work with both Node.js and Deno. It provides easy-to-use methods to interact with ViewStats, retrieve channel data, and perform advanced searches.

## Features

- Retrieve channel statistics, averages, and rankings
- Fetch featured videos and popular channels
- Advanced search capabilities for YouTube channels

## Installation

### Node.js

Install the package via npm:

```bash
npm install viewstats-api
```

### Deno

Import the package from your repository URL:

```typescript
import { ViewStatsAPI } from "https://github.com/Miguelo981/viewstats-api/mod.ts";
```

### API Key

To use the `viewstats-api`, you'll need to obtain an API key. This can be done by inspecting the network requests in your browser.

#### Steps to get your API Key:

1. Open your browser and navigate to the ViewStats website.
2. Open the **Developer Tools** (usually by pressing `F12` or `Ctrl+Shift+I`).
3. Go to the **Network** tab and perform any action that makes a request to the ViewStats API (e.g., searching for a channel).
4. Look for the request in the **Network** tab and select it.
5. Under the **Headers** section, find the **Authorization** header.
6. Copy the value of the **Bearer token**. This is your API key.

### Usage
#### Basic Example

```typescript
import { ViewStatsAPI } from "viewstats-api";

const apiToken = "your_api_token";
const api = new ViewStatsAPI(apiToken);

// Retrieve channel data by ID
const channel = await api.getChannel("mrbeast");
```

## API Methods

| Method | Description |
|--------|-------------|
| `getChannel(channelId: string): Promise<ChannelResponse>` | Fetch channel details by channel ID. |
| `getChannelStats(channelId: string, params: ChannelStatsParams): Promise<ChannelStatsResponse[]>` | Retrieve detailed statistics for a channel, including views, subscribers, and video counts. |
| `getChannelAverage(channelId: string): Promise<ChannelAverageResponse>` | Get average stats such as views and estimated revenue over a period of time. |
| `getChannelLongAndShort(channelId: string): Promise<ChannelLongAndShortResponse>` | Retrieve long and short video statistics for a channel. |
| `getChannelFeaturedVideo(channelId: string): Promise<ChannelFeaturedVideoResponse>` | Fetch the featured video of a channel. |
| `advancedChannelSearch(params: ChannelAdvancedSearchParams): Promise<ChannelAdvancedSearchResponse>` | Perform an advanced search for channels based on specific criteria. |
| `getRankingChannels(params: RankingChannelsParams): Promise<ChannelRankingResponse[]>` | Fetch the rankings of channels based on subscribers or views. |
| `getPopularChannels(length: number = 10): Promise<PopularChannelsResponse[]>` | Retrieve a list of popular channels. |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to open issues and pull requests on the [GitHub repository](https://github.com/Miguelo981/viewstats-api/issues).
