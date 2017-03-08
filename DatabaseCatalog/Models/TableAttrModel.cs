using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DatabaseCatalog.Models
{
    
        public class TableAttributes
    {
        public string cardinality { get; set; }
        public string noOfColumns { get; set; }
        public string noOfKeyColumns { get; set; }
        public int recordLength { get; set; }
        public int noOfPages { get; set; }
        public int percentagePages { get; set; }
        public int noOfParents { get; set; }
        public int noOfChildren { get; set; }
        public string dbName { get; set; }
        public string tsName { get; set; }
        public string createdTime { get; set; }
        public string lastAltered { get; set; }
        public string lastStatistics { get; set; }
        public string remarks { get; set; }
    }

    public class ColumnSchema
    {
        public string name { get; set; }
        public object remarks { get; set; }
        public string colNo { get; set; }
        public string type { get; set; }
        public string length { get; set; }
        public string scale { get; set; }
        public string nulls { get; set; }
        public string keySeq { get; set; }
        public string cardinality { get; set; }
    }

    public class Index
    {
        public string name { get; set; }
        public string clustering { get; set; }
        public object clustered { get; set; }
        public string createdTime { get; set; }
        public object lastStatsTime { get; set; }
        public string clusterRatio { get; set; }
        public object indexColumnInfoList { get; set; }
        public string ruleType { get; set; }
        public string colNames { get; set; }
    }

    public class RelationShip
    {
        public string tableName { get; set; }
        public string refTableName { get; set; }
        public string refSchemaName { get; set; }
        public string deleteRule { get; set; }
        public string createdTime { get; set; }
        public string fkColNames { get; set; }
    }

    public class TableModel
    {
        public string tableName { get; set; }
        public TableAttributes tableAttributes { get; set; }
        public List<ColumnSchema> columnSchema { get; set; }
        public List<Index> indices { get; set; }
        public List<object> views { get; set; }
        public List<RelationShip> relationShips { get; set; }
        public object queryNotes { get; set; }
    }
}