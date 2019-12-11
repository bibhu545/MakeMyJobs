using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Models
{
    public class CorporateInfoModel
    {
        public int corporateId { get; set; }
        public int userId { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String city { get; set; }
        public String companyInfo { get; set; }
        public String companyName { get; set; }
        public String contactNumber { get; set; }
        public DateTime? dateOfBirth { get; set; }
        public DateTime dateJoined { get; set; }
        public String logo { get; set; }
        public String address { get; set; }
        public int state { get; set; }
        public int country { get; set; }
        public String zipCode { get; set; }
        public String email { get; set; }
        public int isActive { get; set; }
        public List<JobModel> corporateJobs { get; set; }
        public List<InternshipModel> corporateInternships { get; set; }
    }
    public class JobModel
    {

    }

    public class InternshipModel
    {

    }
}