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
    
    public partial class PostApplication
    {
        public int PostApplicationId { get; set; }
        public int UserId { get; set; }
        public int PostId { get; set; }
        public int ApplyStatus { get; set; }
        public System.DateTime ApplyDate { get; set; }
        public string Message { get; set; }
    
        public virtual User User { get; set; }
        public virtual Post Post { get; set; }
    }
}
