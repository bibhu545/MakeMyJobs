using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MakeMyJobsAPI.Models;
using MakeMyJobsAPI.Business;
using static MakeMyJobsAPI.Utils.Constants;
using System.Collections;

namespace MakeMyJobsAPI.Controllers
{
    public class AccountController : Controller
    {
        public JsonResult Signup(SignupModel model)
        {
            try
            {
                var result = AccountBusiness.CreateUser(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public string test()
        {
            return "hello world";
        }
    }
}