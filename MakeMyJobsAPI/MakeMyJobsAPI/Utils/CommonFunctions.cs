using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Utils
{
    public class CommonFunctions
    {
        public static string GetConfigValue(string configKey)
        {
            return string.IsNullOrWhiteSpace(ConfigurationSettings.AppSettings[configKey]) ? string.Empty : ConfigurationSettings.AppSettings[configKey].Trim();
        }
    }
}