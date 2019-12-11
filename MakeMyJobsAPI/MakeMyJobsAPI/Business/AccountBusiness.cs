using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MakeMyJobsAPI.Models;
using MakeMyJobsAPI.EDMX;
using static MakeMyJobsAPI.Utils.Constants;

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
                if(model.userType == UserTypes.Student)
                {
                    created += AccountBusiness.CreateStudent(model, user.UserId);
                }
                else if(model.userType == UserTypes.Employee)
                {
                    created += AccountBusiness.CreateEmployee(model, user.UserId);
                }
                else
                {
                    created += AccountBusiness.CreateCorporate(model, user.UserId);
                }
                return created;
            }
        }

        public static int CreateCorporate(SignupModel model, int userId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                context.Corporates.Add(new Corporate()
                {
                    FirstName = model.firstName,
                    LastName = model.lastName,
                    UserId = userId,
                    State = 0,
                    Country = 0,
                    DateJoined = DateTime.Now,
                    IsActive = 1
                });
                return context.SaveChanges();
            }
        }

        public static int CreateEmployee(SignupModel model, int userId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                context.Employees.Add(new Employee() {
                    FirstName = model.firstName,
                    LastName = model.lastName,
                    UserId = userId,
                    State = 0,
                    Country = 0,
                    DateJoined = DateTime.Now,
                    IsActive = 1
                });
                return context.SaveChanges();
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
                    DateJoined = DateTime.Now,
                    IsActive = 1
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
                    if(user.UserType == UserTypes.Student)
                    {
                        Student student = context.Students.FirstOrDefault(x => x.UserId == user.UserId);
                        loginResponse.firstName = student.FirstName;
                        loginResponse.lastName = student.LastName;
                        loginResponse.userId = student.UserId;
                        loginResponse.email = user.Email;
                        loginResponse.userType = user.UserType;
                    }
                    else if(user.UserType == UserTypes.Employee)
                    {
                        Employee employee = context.Employees.FirstOrDefault(x => x.UserId == user.UserId);
                        loginResponse.firstName = employee.FirstName;
                        loginResponse.lastName = employee.LastName;
                        loginResponse.userId = employee.UserId;
                        loginResponse.email = user.Email;
                        loginResponse.userType = user.UserType;
                    }
                    else
                    {
                        Corporate corporate = context.Corporates.FirstOrDefault(x => x.UserId == user.UserId);
                        loginResponse.firstName = corporate.FirstName;
                        loginResponse.lastName = corporate.LastName;
                        loginResponse.userId = corporate.UserId;
                        loginResponse.email = user.Email;
                        loginResponse.userType = user.UserType;
                    }
                }
                else
                {
                    loginResponse.loggedIn = 0;
                }
                return loginResponse;
            }
        }

        public static int ChangePassword(ChangePasswordModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var user = context.Users.FirstOrDefault(x => x.UserId == model.userId && x.IsActive == 1 && x.Password == model.currentPassword);
                if(user == null)
                {
                    return 0;
                }
                else
                {
                    user.Password = model.updatedPassword;
                    int updated = context.SaveChanges();
                    if(updated > 0)
                    {
                        return updated;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
        }
    }
}