using Microsoft.AspNetCore.Authorization;

namespace QandA.Authorization
{
    public class MustBeQuestionAuthorRequirement : IAuthorizationRequirement
    {
        public MustBeQuestionAuthorRequirement()
        {
        }
    }
}