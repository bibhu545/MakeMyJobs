using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Utils
{
    public class Constants
    {
        public class ApiRespnoseStatus
        {
            public const int Success = 1;
            public const int Failed = 2;
            public const int AuthenticationFailed = 3;
            public const int Duplicate = 4;

        }
    }
}