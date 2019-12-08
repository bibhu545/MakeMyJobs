using MakeMyJobsAPI.Business;
using MakeMyJobsAPI.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static MakeMyJobsAPI.Utils.Constants;

namespace MakeMyJobsAPI.Controllers
{
    public class CommonController : Controller
    {
        [HttpGet]
        public JsonResult GetStateAndCountries()
        {
            try
            {
                var states = CommonBusiness.GetStates();
                var countries = CommonBusiness.GetCountries();
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { states, countries } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}