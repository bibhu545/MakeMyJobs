using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Models
{
    public class SignupModel
    {
        public String email { get; set; }
        public String password { get; set; }
        public int userType { get; set; }
    }
}