using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static MakeMyJobsAPI.Utils.Constants;
using MakeMyJobsAPI.Business;
using MakeMyJobsAPI.Models;
using System.Collections;

namespace MakeMyJobsAPI.Controllers
{
    public class StudentController : Controller
    {
        public JsonResult GetStudentInfo(int id)
        {
            try
            {
                var result = StudentBusiness.GetStudentInfo(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}