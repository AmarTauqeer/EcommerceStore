using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EcommerceStore.Data;
using EcommerceStore.Dtos;
using EcommerceStore.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        DataContextDapper _dapper;
        public UserController(IConfiguration config)
        {
            _dapper = new DataContextDapper(config);

        }
        // test db connection
        [HttpGet("TestConnection")]
        public DateTime TestConnection()
        {
            return _dapper.LoadDataSingle<DateTime>("select getdate()");
        }
        // get request
        [HttpGet("GetUsers")]
        public IEnumerable<User> GetUsers()
        {
            string sql = @"SELECT  [UserId]
                            ,[FirstName]
                            ,[LastName]
                            ,[Email]
                            ,[Gender]
                            ,[Active]
                        FROM [UdemyDotnetCoreCourse].[TutorialAppSchema].[Users]";
            IEnumerable<User> users = _dapper.LoadData<User>(sql);
            return users;
        }
        // get request with parameter
        [HttpGet("GetSingleUser/{userId}")]
        public User GetSingleUser(int userId)
        {
            string sql = @"SELECT  [UserId]
                            ,[FirstName]
                            ,[LastName]
                            ,[Email]
                            ,[Gender]
                            ,[Active]
                        FROM [UdemyDotnetCoreCourse].[TutorialAppSchema].[Users]
                        where [UserId] = " + userId.ToString();
            User user = _dapper.LoadDataSingle<User>(sql);
            return user;
        }
        [HttpPut("EditUser")]
        public IActionResult EditUser(User user)
        {
            string sql = @"
            UPDATE TutorialAppSchema.Users
                SET [FirstName] = '" + user.FirstName +
                    "', [LastName] = '" + user.LastName +
                    "', [Email] = '" + user.Email +
                    "', [Gender] = '" + user.Gender +
                    "', [Active] = '" + user.Active +
                "' where UserId = " + user.UserId;

            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Update User.");
        }
        [HttpPost("AddUser")]
        public IActionResult AddUser(UserToAddDto user)
        {
            string sql = @"INSERT Into TutorialAppSchema.Users(
                [FirstName],
                [LastName],
                [Email],
                [Gender],
                [Active]) VALUES(" +
                    "'" + user.FirstName +
                    "', '" + user.LastName +
                    "', '" + user.Email +
                    "', '" + user.Gender +
                    "', '" + user.Active +
                "')";
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Add a User.");
        }
        
        [HttpDelete("DeleteUser/{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            string sql=@"delete from TutorialAppSchema.Users where UserId = '" + userId + "'";
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a User.");
        }
        // User Job info

           // get request
        [HttpGet("GetUsersJobInfo")]
        public IEnumerable<UserJobInfo> GetUserJobInfo()
        {
            string sql = @"SELECT  [UserId]
                            ,[JobTitle]
                            ,[Department]
                        FROM [UdemyDotnetCoreCourse].[TutorialAppSchema].[UserJobInfo]";
            IEnumerable<UserJobInfo> userJobInfos = _dapper.LoadData<UserJobInfo>(sql);
            return userJobInfos;
        }
        // get request with parameter
        [HttpGet("GetSingleUserJobInfo/{userId}")]
        public UserJobInfo GetSingleUserJobInfo(int userId)
        {
            string sql = @"SELECT  [UserId]
                            ,[JobTitle]
                            ,[Department]
                        FROM [UdemyDotnetCoreCourse].[TutorialAppSchema].[UserJobInfo]
                        where [UserId] = " + userId.ToString();
            UserJobInfo userJobInfo = _dapper.LoadDataSingle<UserJobInfo>(sql);
            return userJobInfo;
        }
        [HttpPut("EditUserJobInfo")]
        public IActionResult EditUserJobInfo(UserJobInfo userJobInfo)
        {
            string sql = @"
            UPDATE TutorialAppSchema.UserJobInfo
                SET [JobTitle] = '" + userJobInfo.JobTitle +
                    "', [Department] = '" + userJobInfo.Department +
                    "', [UserId] = '" + userJobInfo.UserId +
                "' where UserId = " + userJobInfo.UserId;

            // Console.WriteLine(sql);
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Update UserJobInfo.");
        }
        [HttpPost("AddUserJobInfo")]
        public IActionResult AddUserJobInfo(UserJobInfo userJobInfo)
        {
            string sql = @"INSERT Into TutorialAppSchema.UserJobInfo(
                [JobTitle],
                [Department],
                [UserId]) VALUES(" +
                    "'" + userJobInfo.JobTitle +
                    "', '" + userJobInfo.Department +
                    "', '" + userJobInfo.UserId +
                "')";
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Add a UserJobInfo.");
        }
        [HttpDelete("DeleteUserJobInfo/{userId}")]
        public IActionResult DeleteUserJobInfo(int userId)
        {
            string sql=@"delete from TutorialAppSchema.UserJobInfo where UserId = '" + userId + "'";
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a UserJobInfo.");
        }
        // user salary
           // get request
        [HttpGet("GetUsersSalary")]
        public IEnumerable<UserSalary> GetUserSalaries()
        {
            string sql = @"SELECT  [UserId]
                            ,[Salary]
                        FROM [UdemyDotnetCoreCourse].[TutorialAppSchema].[UserSalary]";
            IEnumerable<UserSalary> userSalaries = _dapper.LoadData<UserSalary>(sql);
            return userSalaries;
        }
        // get request with parameter
        [HttpGet("GetSingleUserSalary/{userId}")]
        public UserSalary GetSingleUserSalary(int userId)
        {
            string sql = @"SELECT  [UserId]
                            ,[Salary]
                        FROM [UdemyDotnetCoreCourse].[TutorialAppSchema].[UserSalary]
                        where [UserId] = " + userId.ToString();
            UserSalary userSalary = _dapper.LoadDataSingle<UserSalary>(sql);
            return userSalary;
        }
        [HttpPut("EditUserSalary")]
        public IActionResult EditUserSalary(UserSalary userSalary)
        {
            string sql = @"
            UPDATE TutorialAppSchema.UserSalary
                SET [Salary] = '" + userSalary.Salary +
                    "', [UserId] = '" + userSalary.UserId +
                "' where UserId = " + userSalary.UserId;

            // Console.WriteLine(sql);
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Update User Salary.");
        }
        [HttpPost("AddUserSalary")]
        public IActionResult AddUserSalary(UserSalary userSalary)
        {
            string sql = @"INSERT Into TutorialAppSchema.UserSalary(
                [Salary],
                [UserId]) VALUES(" +
                    "'" + userSalary.Salary +
                    "', '" + userSalary.UserId +
                "')";
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Add a User Salary.");
        }
        [HttpDelete("DeleteUserSalary/{userId}")]
        public IActionResult DeleteUserSalary(int userId)
        {
            string sql=@"delete from TutorialAppSchema.UserSalary where UserId = '" + userId + "'";
            if (_dapper.ExecuteSql(sql))
            {
                return Ok();
            }

            throw new Exception("Faild to Delete a User Salary.");
        }

        
    }
}