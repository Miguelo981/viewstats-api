export type RequestMethod = 'GET' | 'POST';

export type ViewStatsResponse<T> = { data: T }

export interface ChannelResponse {
    id: string;
    displayName: string;
    handle: string;
    subscriberCount: number;
    viewCount: number;
    videoCount: number;
    verified: boolean;
    totalFollowing: number;
    country: ChannelCountry;
    bannerUrl: string;
    avatarUrl: string;
    globalViewsRanking: number;
    globalSubscribersRanking: number;
    countrySubscriberRanking: number;
    categorySubscriberRanking: number;
    vpv90: number;
    recentTests: number;
    totalTests: number;
}

export interface ChannelStatsResponse {
    id: string;
    insertedAt: string;
    subscriberCount: number;
    subscriberCountDelta: number;
    viewCount: number;
    viewCountDelta: number;
    videoCount: number;
    videoCountDelta: number;
    date: string;
    estimatedLowRevenueUsd: number;
    estimatedHighRevenueUsd: number;
    estimatedRevenueUsd: number;
    longViews: number;
    shortViews: number;
    dayOfWeek: string;
    isToday: boolean;
}
type StatsRange = 7 | 28 | 30 | 90 | 365 | 'alltime'
type StatsGroupBy = 'daily' | 'weekly' | 'monthly'
type StatsSort = 'ASC' | 'DESC'

export interface ChannelStatsParams {
    range: StatsRange
    groupBy?: StatsGroupBy
    sortOrder?: StatsSort
    withRevenue?: boolean
    withEvents?: boolean
    withBreakdown?: boolean
    withToday?: boolean
}

export interface LongShortStats {
    videos: number
    shorts: number
    long: number
    views: number
    shortViews: number
    longViews: number
}

export interface ChannelLongAndShortResponse {
    weekly: LongShortStats
    monthly: LongShortStats
    ninetyDays: LongShortStats
    yearly: LongShortStats
    allTime: LongShortStats
}

export interface AverageStats {
    viewsAverage: number,
    estimatedRevenueLowUsd: number,
    estimatedRevenueHighUsd: number,
    subsAverage: number
}

export interface ChannelAverageResponse {
    daily: AverageStats
    weekly: AverageStats
    monthly: AverageStats
    uploadFrequency: number
}

export interface ChannelFeaturedVideoResponse {
    id: string
    channelId: string
    channelName: string
    channelAvatarUrl: string
    title: string
    description: string
    viewCount: number
    likeCount: number
    commentCount: number
    uploadDate: string
    duration: string
    shorts: boolean
    viewsPerHour: number
    outlierScore: number
}

export interface PopularChannelsResponse {
    id: string,
    displayName: string,
    handle: string,
    subscriberCount: number,
    viewCount: number,
    verified: boolean,
    totalFollowing: number,
    avatarUrl: string,
    recentTests: number,
    totalTests: number
}

export interface Pagination {
    totalPages: number,
    pageSize: number,
    currentPage: number,
    totalCount: number
}

export interface AdvancedSearchChannel {
    id: string,
    displayName: string,
    handle: string,
    avatarUrl: string,
    country: string,
    description: string,
    videoCount: number,
    category: number,
    viewCount: number,
    subscriberCount: number
}

export type ChannelAdvancedSearchResponse = {
    data: AdvancedSearchChannel[]
} & Pagination

type ChannelAdvancedSearchSort = 'relevance'

export interface ChannelAdvancedSearchParams {
    q: string
    pageSize: number
    currentPage: number
    sortBy?: ChannelAdvancedSearchSort
}

export interface ChannelRankingResponse {
    channel: PopularChannelsResponse
    subRankingAbs: number
    subscriberCountDelta: number
}

export type RankingSortBy = 'subs' | 'views'
export type RankingInterval = 'quarterly' | 'semiannually' | 'monthly' | 'weekly' | 'annually' | 'all_time' | 'yesterday'

export interface RankingChannelsParams {
    category_id?: ChannelCategory | null
    country: ChannelCountry | null
    interval: RankingInterval
    made_for_kids: boolean
    show_movies: boolean
    show_music: boolean
    sortBy: RankingSortBy
}

export enum ChannelCountry {
    UnitedStates = "US",
    Australia = "AU",
    Brazil = "BR",
    Canada = "CA",
    France = "FR",
    Germany = "DE",
    India = "IN",
    Indonesia = "ID",
    Japan = "JP",
    NewZealand = "NZ",
    Russia = "RU",
    SouthKorea = "KR",
    Spain = "ES",
    Turkey = "TR",
    UnitedKingdom = "GB"
}

export enum ChannelCategory {
    FilmAndAnimation = 1,
    AutosAndVehicles = 2,
    Music = 10,
    PetsAndAnimals = 15,
    Sports = 17,
    TravelAndEvents = 19,
    Gaming = 20,
    PeopleAndBlogs = 22,
    Comedy = 23,
    Entertainment = 24,
    NewsAndPolitics = 25,
    HowtoAndStyle = 26,
    Education = 27,
    ScienceAndTechnology = 28,
    NonprofitsAndActivism = 29
}
