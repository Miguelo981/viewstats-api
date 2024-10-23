import type { ChannelAdvancedSearchParams, ChannelAdvancedSearchResponse, ChannelAverageResponse, ChannelFeaturedVideoResponse, ChannelLongAndShortResponse, ChannelRankingResponse, ChannelResponse, ChannelStatsParams, ChannelStatsResponse, PopularChannelsResponse, RankingChannelsParams } from "@/types.ts";

export interface IViewStatsAPI {
    getChannel(channelId: string): Promise<ChannelResponse>;
    getChannelStats(channelId: string, params: ChannelStatsParams): Promise<ChannelStatsResponse[]>;
    getChannelLongAndShort(channelId: string): Promise<ChannelLongAndShortResponse>;
    getChannelAverage(channelId: string): Promise<ChannelAverageResponse>;
    getChannelFeaturedVideo(channelId: string): Promise<ChannelFeaturedVideoResponse>;
    getPopularChannels(length: number): Promise<PopularChannelsResponse[]>
    advancedChannelSearch(params: ChannelAdvancedSearchParams): Promise<ChannelAdvancedSearchResponse>
    getRankingChannels(params: RankingChannelsParams): Promise<ChannelRankingResponse[]>
}