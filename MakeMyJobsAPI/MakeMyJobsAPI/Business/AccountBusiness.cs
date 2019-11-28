using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MakeMyJobsAPI.Models;
using MakeMyJobsAPI.EDMX;

namespace MakeMyJobsAPI.Business
{
    public class AccountBusiness
    {
        public static int CreateUser(SignupModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                context.Users.Add(new User() {
                    Email = model.email,
                    Password = model.password,
                    UserType = model.userType,
                    IsActive = 1
                });
                return context.SaveChanges();
            }
        }
    }
}