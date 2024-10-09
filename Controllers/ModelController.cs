using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using EcommerceStore.Data;
using EcommerceStore.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModelController : ControllerBase
    {
        private readonly DataContextDapper _dapper;
        private readonly IConfiguration _config;

        public ModelController(IConfiguration config)
        {
            _config = config;
            _dapper = new DataContextDapper(config);
            
        }

        [HttpGet("Model/{modelId}/{searchParam}")]
        public IEnumerable<Model> GetModels(int modelId = 0, string searchParam = "None")
        {
            string sql = @"EXEC [TutorialAppSchema].[spModel_Get]";
            string parameters = "";

            DynamicParameters sqlParameters = new DynamicParameters();

            if (modelId !=0)
            {
                parameters += ", @ModelId=@ModelIdParameter";
                sqlParameters.Add("@ModelIdParameter", modelId, DbType.Int32);
            }

            if (searchParam != "None")
            {
                parameters += ", @SearchValue=@SearchValueParameter";
                sqlParameters.Add("@SearchValueParameter", searchParam, DbType.String);
            }

            if (parameters.Length > 0)
            {
                sql += parameters.Substring(1);
            }


            return _dapper.LoadDataWithParameters<Model>(sql, sqlParameters);
        }

        [HttpPut("UpsertModel")]
        public IActionResult AddModel(Model modelToUpsert)
        {
            
            string sql = @"EXEC [TutorialAppSchema].[spModel_Upsert]
                @title=@ModelTitleParameter";
            

            DynamicParameters sqlParameters = new DynamicParameters();
            sqlParameters.Add("@ModelTitleParameter", modelToUpsert.title, DbType.String);

            if (modelToUpsert.id>0)
            {
                 sql += ", @ModelId=@ModelIdParameter" ;
                 sqlParameters.Add("@ModelIdParameter", modelToUpsert.id, DbType.Int32);
            }
            // Console.WriteLine(sql);
            // return Ok();
           

            if (_dapper.ExecuteSqlWithParameters(sql, sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to upsert a Model.");
        }
        
        [HttpDelete("Model/{modelId}")]
        public IActionResult DeleteModel(int modelId)
        {
            string sql=@"EXEC [TutorialAppSchema].[spModel_Delete] @ModelId=@ModelIdParameter";
            
            DynamicParameters sqlParameters = new DynamicParameters();

            sqlParameters.Add("@ModelIdParameter", modelId, DbType.Int32);

            if (_dapper.ExecuteSqlWithParameters(sql,sqlParameters))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a Model.");
        }

    }
}