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
    
    public partial class EmployeeDocument
    {
        public int DocumentId { get; set; }
        public int EmployeeId { get; set; }
        public string DocumentName { get; set; }
        public string DocumentNameOnDisk { get; set; }
        public long DocumentSize { get; set; }
        public int DocumentType { get; set; }
        public System.DateTime LastUpdatedOn { get; set; }
        public int IsActive { get; set; }
    
        public virtual Employee Employee { get; set; }
    }
}
