import type { RankingChannelsParams } from "@/types.ts";

export const VIEWSTATS_API_URL = 'https://api.viewstats.com';
export const a = "Wzk3LCAxMDksIC0xMDAsIC05MCwgMTIyLCAtMTI0LCAxMSwgLTY5LCAtNDIsIDExNSwgLTU4LCAtNjcsIDQzLCAtNzUsIDMxLCA3NF0=";
export const l = "Wy0zLCAtMTEyLCAxNSwgLTEyNCwgLTcxLCAzMywgLTg0LCAxMDksIDU3LCAtMTI3LCAxMDcsIC00NiwgMTIyLCA0OCwgODIsIC0xMjYsIDQ3LCA3NiwgLTEyNywgNjUsIDc1LCAxMTMsIC0xMjEsIDg5LCAtNzEsIDUwLCAtODMsIDg2LCA5MiwgLTQ2LCA0OSwgNTZd"
export const decryptAlgorithm = 'AES-GCM'
export const DEFAULT_RANKING_PARAMS: RankingChannelsParams = { country: null, category_id: null, interval: 'all_time', made_for_kids: true, show_movies: true, show_music: true, sortBy: 'subs' }