
const GoodStudents =()=> { 
    const {data: goodStudents} = this.getData()
    return (
      <table className="table">
        <thead>
          <tr>
          <th>Name</th>
            <th>Abilities</th>
            <th>who the student is helping</th>
          </tr>
        </thead>

        <tbody>
          {goodStudents.map(goodStudent =>
          <tr key={goodStudent._id}>
          <td>{goodStudent.name}</td>
          <td>{goodStudent.abilities}</td>
          <td>{goodStudent.whoToHelp}</td>
          <td>{goodStudent.isEvil}</td>
        </tr> )}
        </tbody>

      </table>
    );
  }
export default GoodStudents;

