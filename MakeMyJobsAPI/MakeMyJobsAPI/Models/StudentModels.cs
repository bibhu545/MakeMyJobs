using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Models
{
    public class StudentInfoModel
    {
        public int studentId { get; set; }
        public int userId { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String collegeName { get; set; }
        public String contactNumber { get; set; }
        public DateTime? dateOfBirth { get; set; }
        public DateTime dateJoined { get; set; }
        public String resume { get; set; }
        public String address { get; set; }
        public int state { get; set; }
        public int country { get; set; }
        public String zipCode { get; set; }
        public String email { get; set; }
    }
}