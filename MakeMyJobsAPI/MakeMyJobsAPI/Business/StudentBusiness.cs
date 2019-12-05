using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MakeMyJobsAPI.Models;
using MakeMyJobsAPI.EDMX;

namespace MakeMyJobsAPI.Business
{
    public class StudentBusiness
    {
        public static StudentInfoModel GetStudentInfo(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                if (context.Students.Any(x => x.UserId == id))
                {
                    StudentInfoModel studentInfo = context.Students.Join(context.Users, s => s.UserId, u => u.UserId, (s, u) => new StudentInfoModel
                    {
                        studentId = s.StudentId,
                        userId = s.UserId,
                        firstName = s.FirstName,
                        lastName = s.LastName,
                        collegeName = s.CollegeName,
                        contactNumber = s.ContactNumber,
                        dateOfBirth = s.DateOfBirth,
                        resume = s.Resume,
                        dateJoined = s.DateJoined,
                        address = s.Address,
                        state = s.State,
                        country = s.Country,
                        email = u.Email
                    }).FirstOrDefault(x => x.userId == id);
                    return studentInfo;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}