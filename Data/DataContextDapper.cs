using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace EcommerceStore.Data
{
    public class DataContextDapper
    {
        private IConfiguration _config;
        // private string? _connectionString;
        public DataContextDapper(IConfiguration config)
        {
            _config = config;
            // _connectionString=config.GetConnectionString("DefaultConnection");
        }

        public IEnumerable<T> LoadData<T>(string sql)
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.Query<T>(sql);
        }

        public T LoadDataSingle<T>(string sql)
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.QuerySingle<T>(sql);
        }

        public bool ExecuteSql(string sql)
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return (dbConnection.Execute(sql) > 0);
        }

        public int ExecuteSqlWithCount(string sql)
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.Execute(sql);
        }

        public void ExecuteProcedureMulti(string sql, IDbConnection dbConnection)
        {
            dbConnection.Execute(sql);
        }

        public bool ExecuteSqlWithParameters(string sql, DynamicParameters parameters)
        {
            // for dynamic parameters

            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.Execute(sql, parameters)>0;


            // these are for sql parameters
            // SqlCommand commandWithParameter = new SqlCommand(sql);
            // foreach (SqlParameter parameter in parameters)
            // {
            //     commandWithParameter.Parameters.Add(parameter);
                
            // }
            // SqlConnection dbConnection= new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            // dbConnection.Open();

            // commandWithParameter.Connection = dbConnection;

            // int rowsAffected = commandWithParameter.ExecuteNonQuery();

            // dbConnection.Close();

            // return rowsAffected > 0;

        }

        public IEnumerable<T> LoadDataWithParameters<T>(string sql, DynamicParameters parameters)
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.Query<T>(sql,parameters);
        }

        public T LoadDataSingleWithParameters<T>(string sql, DynamicParameters parameters)
        {
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.QuerySingle<T>(sql,parameters);
        }

    }
}