//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MakeMyJobsAPI.EDMX
{
    using System;
    using System.Collections.Generic;
    
    public partial class Job
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Job()
        {
            this.JobCities = new HashSet<JobCity>();
            this.JobQuestions = new HashSet<JobQuestion>();
            this.JobTags = new HashSet<JobTag>();
            this.JobSkills = new HashSet<JobSkill>();
            this.JobApplications = new HashSet<JobApplication>();
            this.JobAnswers = new HashSet<JobAnswer>();
        }
    
        public int JobId { get; set; }
        public int userId { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public int MinExperience { get; set; }
        public int MinSalary { get; set; }
        public Nullable<int> MaxSalary { get; set; }
        public Nullable<int> NumberOfPosts { get; set; }
        public Nullable<int> IsActive { get; set; }
        public System.DateTime PostedOn { get; set; }
        public System.DateTime LastUpdatedOn { get; set; }
        public System.DateTime ExpiaryDate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobCity> JobCities { get; set; }
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobQuestion> JobQuestions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobTag> JobTags { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobSkill> JobSkills { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobApplication> JobApplications { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<JobAnswer> JobAnswers { get; set; }
    }
}
