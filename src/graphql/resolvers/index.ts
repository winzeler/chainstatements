// import { Queries } from "./common";
// import sentryHelper from "../../helpers/sentry.helper";


const rootResolver = sentryHelper.objectMap(
  {
    /** all queries */
    Query: {
      ...Queries,
    },
    /** all mutations */
    Mutation: {
      ...Mutations,
    },
  },
  sentryHelper.resolversWrapper
);

export default rootResolver;
