import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class EvilStudentsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: evilStudent => <Link to={`/evilStudents/${evilStudent._id}`}>{evilStudent.name}</Link>
    },
    { path: "abilities", label: "Abilities" },
    { path: "whoToHelp", label: "Who you are helping" },
    { path: "isEvil", label: "Evil" },
    {
      key: "delete",
      content: evilStudent => (
        <button
          onClick={() => this.props.onDelete(evilStudent)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { evilStudents, /*onSort, sortColumn*/ } = this.props;

    return (
      <Table
        columns={this.columns}
        data={evilStudents}
        /*sortColumn={sortColumn}
        onSort={onSort}*/
      />
    );
  }
}

export default EvilStudentsTable;
