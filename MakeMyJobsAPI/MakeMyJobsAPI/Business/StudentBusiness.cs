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
                    StudentInfoModel studentInfoModel = context.Students.Join(context.States, s => s.State, st => st.StateId, (s, st) => new
                    {
                        StateName = st.StateName,
                        student = s
                    }).Join(context.Countries, s => s.student.Country, c => c.CountryId, (s, c) => new
                    {
                        student = s,
                        stateName = s.StateName,
                        countryName = c.CountryName
                    }).Join(context.Users, s => s.student.student.UserId, u => u.UserId, (s, u) => new StudentInfoModel()
                    {
                        studentId = s.student.student.StudentId,
                        userId = s.student.student.UserId,
                        firstName = s.student.student.FirstName,
                        lastName = s.student.student.LastName,
                        collegeName = s.student.student.CollegeName,
                        contactNumber = s.student.student.ContactNumber,
                        dateOfBirth = s.student.student.DateOfBirth,
                        resume = s.student.student.Resume,
                        dateJoined = s.student.student.DateJoined,
                        address = s.student.student.Address + ", " + s.student.StateName + ", " + s.countryName,
                        state = s.student.student.State,
                        country = s.student.student.Country,
                        email = u.Email,
                        zipCode = s.student.student.ZipCode
                    }).FirstOrDefault(x => x.userId == id);
                    return studentInfoModel;
                }
                else
                {
                    return null;
                }
            }
        }
        public static StudentInfoModel GetStudentInfoForEdit(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                if (context.Students.Any(x => x.UserId == id))
                {
                    StudentInfoModel studentInfoModel = context.Students.Join(context.Users, s => s.UserId, u => u.UserId, (s, u) => new StudentInfoModel()
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
                        email = u.Email,
                        zipCode = s.ZipCode
                    }).FirstOrDefault(x => x.userId == id);
                    return studentInfoModel;
                }
                else
                {
                    return null;
                }
            }
        }

        public static StudentInfoModel UpdateStudentInfo(StudentInfoModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                StudentInfoModel studentInfo = new StudentInfoModel();
                int updated = 0;
                var user = context.Users.FirstOrDefault(x => x.UserId == model.userId && x.IsActive == 1);
                var student = context.Students.FirstOrDefault(x => x.StudentId == model.studentId);
                if (user == null || student == null)
                {
                    return null;
                }
                else
                {
                    user.Email = model.email;
                    updated += context.SaveChanges();
                    student.FirstName = model.firstName;
                    student.LastName = model.lastName;
                    student.ContactNumber = model.contactNumber;
                    student.DateOfBirth = model.dateOfBirth;
                    student.CollegeName = model.collegeName;
                    student.Address = model.address;
                    student.State = model.state;
                    student.Country = model.country;
                    student.ZipCode = model.zipCode;
                    updated += context.SaveChanges();
                }
                if (updated > 0)
                {
                    return GetUpdatedStudentInfo(user.UserId, student.StudentId);
                }
                else
                {
                    return null;
                }
            }
        }

        private static StudentInfoModel GetUpdatedStudentInfo(int userId, int studentId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var user = context.Users.FirstOrDefault(x => x.UserId == userId && x.IsActive == 1);
                var student = context.Students.FirstOrDefault(x => x.StudentId == studentId);
                if (user == null || student == null)
                {
                    return null;
                }
                else
                {
                    return new StudentInfoModel()
                    {
                        userId = userId,
                        studentId = studentId,
                        email = user.Email,
                        firstName = student.FirstName,
                        lastName = student.LastName,
                        contactNumber = student.ContactNumber,
                        address = student.Address,
                        state = student.State,
                        country = student.Country,
                        dateOfBirth = student.DateOfBirth,
                        zipCode = student.ZipCode
                    };
                }
            }
        }

        public static int SaveStudentDocument(int studentId, String fileName, String fileNameOnDisk, long fileSize)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var previousResume = context.StudentDocuments.FirstOrDefault(x => x.StudentId == studentId && x.DosumentType == 1);
                if (previousResume != null)
                {
                    context.Entry(previousResume).State = System.Data.Entity.EntityState.Deleted;
                    context.SaveChanges();
                }
                else
                {
                    context.StudentDocuments.Add(new StudentDocument()
                    {

                    });
                }
                return 1;
            }
        }
    }
}