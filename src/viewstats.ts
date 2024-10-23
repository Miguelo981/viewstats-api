import type { ChannelAdvancedSearchParams, ChannelAdvancedSearchResponse, ChannelAverageResponse, ChannelFeaturedVideoResponse, ChannelLongAndShortResponse, ChannelRankingResponse, ChannelResponse, ChannelStatsParams, ChannelStatsResponse, PopularChannelsResponse, RankingChannelsParams, RequestMethod, ViewStatsResponse } from "@/types.ts";
import { a, decryptAlgorithm, DEFAULT_RANKING_PARAMS, l, VIEWSTATS_API_URL } from "@/constants.ts";
import { subtle } from 'node:crypto'
import type { IViewStatsAPI } from "./interfaces/viewstats-api.ts";

export class ViewStatsAPI implements IViewStatsAPI {
    private apiToken: string;
    private baseUrl: string;

    constructor(apiToken: string, baseUrl = VIEWSTATS_API_URL) {
        this.apiToken = apiToken;
        this.baseUrl = baseUrl;
    }

    private async request(method: RequestMethod, endpoint: string, data = {}) {
        try {
            let url = `${this.baseUrl}${endpoint}`;
            const headers = this.getHeaders();

            if (method === 'GET' && Object.keys(data).length) {
                const queryParams = new URLSearchParams(data).toString();
                url += `?${queryParams}`;
            }

            const response = await this.sendRequest(method, url, headers, data);
            return this.processResponse(response);
        } catch (error: any) {
            throw new Error(`Failed to make request: ${error.message}`);
        }
    }

    private get<T>(endpoint: string, params = {}): Promise<T> {
        return this.request('GET', endpoint, params);
    }

    private post<T>(endpoint: string, data = {}): Promise<T> {
        return this.request('POST', endpoint, data);
    }

    private getHeaders(): Headers {
        return new Headers({
            'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            'Referer': 'https://www.viewstats.com/',
            'sec-ch-ua-mobile': '?0',
            'Authorization': `Bearer ${this.apiToken}`,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            'sec-ch-ua-platform': '"macOS"',
            'Content-Type': 'application/json',
        });
    }

    private async sendRequest(method: RequestMethod, url: string, headers: Headers, data = {}) {
        const options: RequestInit = {
            method,
            headers,
        };

        if (method === 'POST' && Object.keys(data).length) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');

        return {
            response,
            contentType: contentType || '',
        };
    }

    private async processResponse({ contentType, response }: { response: Response, contentType: string }) {
        if (contentType.includes('application/json')) {
            return await response.json();
        } 
        
        return this.decryptResponse(response);
    }

    private async decryptResponse(response: Response) {
        const n = new Uint8Array(JSON.parse(atob(l)));
        const i = new Uint8Array(JSON.parse(atob(a)));
        const s = await response.arrayBuffer()

        const key = await subtle.importKey("raw", n, { name: decryptAlgorithm }, false, ["decrypt"]);
        const decryptedData = await subtle.decrypt({ name: decryptAlgorithm, iv: i }, key, s);

        const decodedText = new TextDecoder("utf-8").decode(decryptedData);
        return JSON.parse(decodedText);
    }

    async getChannel(channelId: string): Promise<ChannelResponse> {
        const data = await this.get<ViewStatsResponse<ChannelResponse>>(`/channels/${channelId}`);

        return data.data
    }

    async getChannelStats(channelId: string, params: ChannelStatsParams): Promise<ChannelStatsResponse[]> {
        const data = await this.get<ViewStatsResponse<ChannelStatsResponse[]>>(`/channels/${channelId}/stats`, params);

        return data.data
    }

    async getChannelLongAndShort(channelId: string): Promise<ChannelLongAndShortResponse> {
        const data = await this.get<ViewStatsResponse<ChannelLongAndShortResponse>>(`/channels/${channelId}/longsAndShorts`);

        return data.data
    }

    async getChannelAverage(channelId: string): Promise<ChannelAverageResponse> {
        const data = await this.get<ViewStatsResponse<ChannelAverageResponse>>(`/channels/${channelId}/averages`);

        return data.data
    }

    async getChannelFeaturedVideo(channelId: string): Promise<ChannelFeaturedVideoResponse> {
        const data = await this.get<ViewStatsResponse<ChannelFeaturedVideoResponse>>(`/channels/${channelId}/featuredVideo`);

        return data.data
    }

    async getPopularChannels(length: number = 10): Promise<PopularChannelsResponse[]> {
        const data = await this.get<ViewStatsResponse<PopularChannelsResponse[]>>(`/channels/popular`, { total: length });

        return data.data
    }

    async advancedChannelSearch(params: ChannelAdvancedSearchParams): Promise<ChannelAdvancedSearchResponse> {
        const data = await this.get<ViewStatsResponse<ChannelAdvancedSearchResponse>>('/channels/search/advanced', params);

        return data.data
    }

    async getRankingChannels(params: RankingChannelsParams = DEFAULT_RANKING_PARAMS): Promise<ChannelRankingResponse[]> {
      const data = await this.post<ViewStatsResponse<ChannelRankingResponse[]>>(`/rankings/channels`, params);

      return data.data
    }
}
