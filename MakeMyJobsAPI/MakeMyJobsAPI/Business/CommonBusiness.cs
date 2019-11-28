﻿using MakeMyJobsAPI.Models;
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
    }
}