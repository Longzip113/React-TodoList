import React, { Component } from "react";
import TackItem from "./TackItem";

class TackList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterByName: '',
            filterByStatus: -1
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(name === 'filterByName' ? value : this.state.filterByName,
                            name === 'filterByStatus' ? value : this.state.filterByStatus
                            );
        this.setState({
            [name] : value
        }) 
    }

  render(){
      var {tasks} = this.props;
      var elmTasks = tasks.map((task, index) => {
          return <TackItem 
                        key={index} 
                        task={task} 
                        index={index}
                        onUpdateStatus = {this.props.onUpdateStatus}
                        onDelete = {this.props.onDelete}
                        onUpdate = {this.props.onUpdate}
                        />
      })
    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control"
                            name = "filterByName" 
                            value = {this.state.filterByName}
                            onChange={this.onChange}
                            />
                    </td>
                    <td>
                        <select 
                            className="form-control" 
                            value = {this.state.filterByStatus} 
                            name = "filterByStatus" 
                            onChange = {this.onChange}
                            >
                            <option value={-1}>Tất Cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elmTasks}
            </tbody>
        </table>
    );
  }
}

export default TackList;
