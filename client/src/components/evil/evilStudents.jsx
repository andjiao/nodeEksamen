import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EvilStudentsTable from "./EvilStudentsTable";
import { getEvilStudents, deleteEvilStudent } from "../services/evilStudentService.js";
//import _ from "lodash";

class EvilStudents extends Component {
  state = {
    evilStudents: [],
    //sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: evilStudents } = await getEvilStudents();
    this.setState({ evilStudents });
  }

  handleDelete = async evilStudent => {
    const originalEvilStudents = this.state.evilStudents;
    const evilStudents = originalEvilStudents.filter(m => m._id !== evilStudent._id);
    this.setState({ evilStudents });

    try {
      await deleteEvilStudent(evilStudent._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This Evil students has already been deleted.");

      this.setState({ evilStudents: originalEvilStudents });
    }
  };

handleLike = evilStudent => {
    const evilStudentss = [...this.state.evilStudentss];
    const index = evilStudentss.indexOf(evilStudent);
    evilStudentss[index] = { ...evilStudentss[index] };
    evilStudentss[index].liked = !evilStudentss[index].liked;
    this.setState({ evilStudentss });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.evilStudents;

    if (count === 0) return <p>There are no evil students in the database.</p>;

    const { totalCount, data: evilStudents } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
        </div>
        <div className="col">
          <Link
            to="/evilStudents/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New evilStudent
          </Link>
          <p>Showing {totalCount} of Evil students in the database.</p>
         {/*  <SearchBox value={searchQuery} onChange={this.handleSearch} /> */}
          <EvilStudentsTable
            evilStudentss={evilStudents}
            //sortColumn={sortColumn}
            //onLike={this.handleLike}
            onDelete={this.handleDelete}
            //onSort={this.handleSort}
          />
        </div>
      </div>
    );
  }
}

export default EvilStudents;
