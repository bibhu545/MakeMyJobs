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
                if(context.Users.Any(x => x.Email == model.email))
                {
                    return -1;
                }
                int created = 0;
                User user = new User();
                user.Email = model.email;
                user.Password = model.password;
                user.UserType = model.userType;
                user.IsActive = 1;
                context.Users.Add(user);
                created += context.SaveChanges();
                if(model.userType == 1)
                {
                    created += AccountBusiness.CreateStudent(model, user.UserId);
                }
                else if(model.userType == 2)
                {

                }
                else
                {

                }
                return created;
            }
        }
        public static int CreateStudent(SignupModel model, int userId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                context.Students.Add(new Student() {
                    FirstName = model.firstName,
                    LastName = model.lastName,
                    UserId = userId,
                    State = 0,
                    Country = 0,
                    DateJoined = DateTime.Now
                });
                return context.SaveChanges();
            }
        }
        public static LoginResponseModel Login(LoginModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                User user = context.Users.FirstOrDefault(x => x.Email == model.email && x.Password == model.password && x.IsActive == 1);
                LoginResponseModel loginResponse = new LoginResponseModel();
                if(user != null)
                {
                    loginResponse.loggedIn = 1;
                    if(user.UserType == 1)
                    {
                        Student student = context.Students.FirstOrDefault(x => x.UserId == user.UserId);
                        loginResponse.firstName = student.FirstName;
                        loginResponse.lastName = student.LastName;
                        loginResponse.userId = student.UserId;
                        loginResponse.email = user.Email;
                        loginResponse.userType = user.UserType;
                    }
                    else if(user.UserType == 2)
                    {

                    }
                    else
                    {

                    }
                }
                else
                {
                    loginResponse.loggedIn = 0;
                }
                return loginResponse;
            }
        }
    }
}