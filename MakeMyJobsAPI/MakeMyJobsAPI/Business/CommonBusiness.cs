using MakeMyJobsAPI.EDMX;
using MakeMyJobsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MakeMyJobsAPI.Utils.Constants;

namespace MakeMyJobsAPI.Business
{
    public class CommonBusiness
    {
        public static System.Web.Mvc.JsonResult GetErrorResponse(string errorMessage = "")
        {
            return new System.Web.Mvc.JsonResult
            {
                Data = new ApiRespnoseWrapper
                {
                    status = ApiRespnoseStatus.Failed,
                    errorMessage = errorMessage
                }
            };
        }
        public static List<DropdownModel> GetStates()
        {
            using (var context = new MakeMyJobsEntities())
            {
                return context.States.Select(x => new DropdownModel() {
                    value = x.StateId,
                    text = x.StateName
                }).ToList();
            }
        }
        public static List<DropdownModel> GetCountries()
        {
            using (var context = new MakeMyJobsEntities())
            {
                return context.Countries.Select(x => new DropdownModel()
                {
                    value = x.CountryId,
                    text = x.CountryName
                }).ToList();
            }
        }
    }
}