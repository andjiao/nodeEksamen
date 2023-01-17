import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class GoodStudentsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: goodStudent => <Link to={`/goodStudents/${goodStudent._id}`}>{goodStudent.name}</Link>
    },
    { path: "abilities", label: "Abilities" },
    { path: "whoToHelp", label: "Who you are helping" },
    { path: "isEvil", label: "Good" },
    {
      key: "delete",
      content: goodStudent => (
        <button
          onClick={() => this.props.onDelete(goodStudent)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { goodStudents, /*onSort, sortColumn*/ } = this.props;

    return (
      <Table
        columns={this.columns}
        data={goodStudents}
        /*sortColumn={sortColumn}
        onSort={onSort}*/
      />
    );
  }
}

export default GoodStudentsTable;
