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
    
    public partial class PostSkill
    {
        public int PostSkillId { get; set; }
        public int PostId { get; set; }
        public int SkillId { get; set; }
    
        public virtual Skill Skill { get; set; }
        public virtual Post Post { get; set; }
    }
}