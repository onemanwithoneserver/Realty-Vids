import { page as feed } from "./feed/data";
import { page as discover } from "./discover/data";
import { page as opportunities } from "./opportunities/data";
import { page as insights } from "./insights/data";
import { page as lists } from "./lists/data";
import { page as search } from "./search/data";
import { page as primaryResults } from "./primary-results/data";
import { page as secondaryResults } from "./secondary-results/data";
import { page as project } from "./project/data";
import { page as property } from "./property/data";
import { page as opportunity } from "./opportunity/data";
import { page as expert } from "./expert/data";

export const pageRoutes = [
  feed,
  discover,
  opportunities,
  insights,
  lists,
  search,
  primaryResults,
  secondaryResults,
  project,
  property,
  opportunity,
  expert,
] as const;
