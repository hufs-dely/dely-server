import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
  QuestStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("questUpdate"),
        (payload, _, { context }) => {//graphql부분에 rideId를 인자로 넣고 여기 가운데 _부분에 args를 받아오면 그 특정 rideId를 가진 사람만 수정 가능
          const user: User = context.currentUser;
          const {
            QuestStatusSubscription: { deliverId, customerId }
          } = payload;
          //만약 인자로 rideId를 받아왔다면 args.rideId와 ride의 id가 일치하는지 비교하면됌.
          return user.id === deliverId || user.id === customerId;
        }
      )
    }
  }
};

export default resolvers;