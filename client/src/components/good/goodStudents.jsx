/* import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GoodStudentsTable from "./GoodStudentsTable";
import { getGoodStudents, deleteGoodStudent } from "../services/goodStudentService.js";
//import _ from "lodash";

class GoodStudents extends Component {
  state = {
    goodStudents: [],
    //sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: goodStudents } = await getGoodStudents();
    this.setState({ goodStudents });
  }

  handleDelete = async goodStudent => {
    const originalGoodStudents = this.state.goodStudents;
    const goodStudents = originalGoodStudents.filter(m => m._id !== goodStudent._id);
    this.setState({ goodStudents });

    try {
      await deleteGoodStudent(goodStudent._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This Good students has already been deleted.");

      this.setState({ goodStudents: originalGoodStudents });
    }
  };

/* handleLike = goodStudent => {
    const goodStudentss = [...this.state.goodStudentss];
    const index = goodStudentss.indexOf(goodStudent);
    goodStudentss[index] = { ...goodStudentss[index] };
    goodStudentss[index].liked = !goodStudentss[index].liked;
    this.setState({ goodStudentss });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.goodStudents;

    if (count === 0) return <p>There are no good students in the database.</p>;

    //const { totalCount, data: goodStudents } = this.getPagedData();

    const {user} = this.props
    return (
      <div className="row">
        <div className="col-3">
        </div>
        <div className="col">
          {user && <Link
            to="/goodStudents/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New goodStudent
          </Link>}
          {/*<p>Showing {totalCount} of Good students in the database.</p>
         <SearchBox value={searchQuery} onChange={this.handleSearch} /> 
          <GoodStudentsTable
            goodStudentss={goodStudents}
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

export default GoodStudents;
 */