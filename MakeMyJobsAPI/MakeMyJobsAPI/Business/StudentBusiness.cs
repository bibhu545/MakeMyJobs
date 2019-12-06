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
                    context.StudentDocuments.Add(new StudentDocument() {
                        
                    });
                }
                return 1;
            }
        }
    }
}