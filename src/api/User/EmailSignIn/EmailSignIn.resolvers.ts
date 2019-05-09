import createJWT from "../../../utils/createJWT";
import User from "../../../entities/User";
import { Resolvers } from "src/types/resolvers";
import { EmailSignInMutationArgs, EmailSignInResponse } from "src/types/graph";

const resolvers : Resolvers = {
    Mutation : {
        EmailSignIn: async(_, 
            args: EmailSignInMutationArgs
            ) :Promise<EmailSignInResponse> => {
                const {email, password } = args;
            try{
                const user = await User.findOne({ email });
                if(!user){
                    return {
                        ok : false,
                        error : "No User found with that email",
                        token : null
                    };
                }
                const checkPassword = await user.comparePassword(password);
                if(checkPassword){
                    const token = createJWT(user.id);
                    return {
                        ok : true,
                        error : null,
                        token
                    };
                } else{
                    return {
                        ok : false,
                        error : "Wrong password",
                        token : null
                    };
                }
            }catch(error){
                return {
                    ok : false,
                    error : error.message,
                    token : null
                };
            }
        }
    }
};

export default resolvers;