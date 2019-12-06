using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static MakeMyJobsAPI.Utils.Constants;
using MakeMyJobsAPI.Business;
using MakeMyJobsAPI.Models;
using MakeMyJobsAPI.Utils;
using System.Collections;
using System.IO;

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
        public JsonResult UploadStudentResume()
        {
            try
            {
                int studentId = 0;
                if (!int.TryParse(Request.Params["staffId"], out studentId))
                {
                    return CommonBusiness.GetErrorResponse();
                }
                var folderPath = CommonFunctions.GetConfigValue("studentFilePath");
                List<string> documentExtensions = new List<string>() { ".pdf", ".doc", ".docx" };
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var fileName = Path.GetFileName(Request.Files[i].FileName);
                    var fileExtension = Path.GetExtension(Request.Files[i].FileName);
                    var fileNameOnDisk = string.Empty;
                    if(documentExtensions.IndexOf(fileExtension) < 0)
                    {
                        return Json(false);
                    }
                    fileNameOnDisk = fileNameOnDisk = "STP-" + studentId + "-" + Guid.NewGuid().ToString().Replace("-", "") + documentExtensions;
                    Request.Files[i].SaveAs(folderPath + fileNameOnDisk);
                    if (StudentBusiness.SaveStudentDocument(studentId, fileName, fileNameOnDisk, Request.Files[i].ContentLength) > 0)
                    {
                        return Json(true);
                    }
                    else
                    {
                        return Json(false);
                    }
                }
                return Json(true);
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}