import React, { Component } from "react";
import TackItem from "./TackItem";
import { connect } from "react-redux";
import * as actions from '../actions/index';

class TackList extends Component {

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilterTable({  
                                    name : name === 'filterByName' ? value : '',
                                    status : name === 'filterByStatus' ? value : -1
                                });
        this.setState({
            [name] : value
        }) 
    }

  render(){
    var {tasks, filter, search, sort} = this.props;
    
    //ON SEARCH
    if(search) {
        tasks = tasks.filter((item) =>{
            return item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ? true : false
        })
    }

    //ON FILTER
    if(filter.status !== -1) {
        tasks = tasks.filter((item) =>{
            return item.status == filter.status ? true : false
        })
    }
    if(filter.name) {
        tasks = tasks.filter((item) =>{
            return item.name.toLowerCase().indexOf(filter.name.toLowerCase()) >= 0 ? true : false
        })
    }

    //ON SORT
    if(sort.name === 'name') {
        
        tasks.sort((a, b) => {
            if(a.name > b.name) return sort.value;
            else if(a.name < b.name) return -sort.value;
            else return 0
        })
    } else {
        tasks.sort((a, b) => {
            if(a.status > b.status) return -sort.value;
            else if(a.status < b.status) return sort.value;
            else return 0
        })
    }


    var elmTasks = tasks.map((task, index) => {
        return <TackItem 
                    key={index} 
                    task={task} 
                    index={index}
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
                            onChange={this.onChange}
                            />
                    </td>
                    <td>
                        <select 
                            className="form-control"
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

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filter: state.filter,
        search: state.search,
        sort: state.sort
    }
};

var mapDispatchToProps = (dispatch, Props) =>{
    return {
        onFilterTable: filter => {
            dispatch(actions.filterTable(filter));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TackList);
