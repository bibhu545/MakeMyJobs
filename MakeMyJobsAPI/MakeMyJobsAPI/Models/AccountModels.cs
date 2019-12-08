using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Models
{
    public class SignupModel
    {
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String email { get; set; }
        public String password { get; set; }
        public int userType { get; set; }
    }
    public class LoginModel
    {
        public String email { get; set; }
        public String password { get; set; }
    }
    public class LoginResponseModel
    {
        public int loggedIn { get; set; }
        public int userId { get; set; }
        public String email { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public int userType { get; set; }
    }
    public class ChangePasswordModel
    {
        public int userId { get; set; }
        public String currentPassword { get; set; }
        public String updatedPassword { get; set; }
    }
}