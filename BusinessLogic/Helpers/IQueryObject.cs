using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Helpers
{
    public interface IQueryObject
    {
        string SortBy { get; set; }
        bool IsSortAscending { get; set; }
    }
}

