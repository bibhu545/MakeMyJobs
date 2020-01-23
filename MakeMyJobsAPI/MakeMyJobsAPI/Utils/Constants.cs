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
        public class PostType
        {
            public const int Job = 1;
            public const int Internship = 2;
        }
        public class UserTypes
        {
            public const int Admin = 0;
            public const int Student = 1;
            public const int Employee = 2;
            public const int Corporate = 3;
        }
        public class ApplyStatus
        {
            public const int Pending = 0;
            public const int Viewed = 1;
            public const int Approved = 2;
            public const int Rejected = 3;
        }
        public class FilterConstants
        {
            public const int RecordsPerPage = 3;
        }
        public class StudentDocumentTypes
        {
            public const int Resume = 1;
        }
        public class EmployeeDocumentTypes
        {
            public const int Resume = 1;
        }
        public class CorporateDocumentTypes
        {
            public const int Logo = 1;
        }
    }
}