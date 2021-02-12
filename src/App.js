import React, { Component } from "react";
import TackForm from "./component/TackForm";
import Control from "./component/control"
import TackList from "./component/TackList";
import classNames from "classnames";
import randomstring from 'randomstring'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            isDislayTaskForm: false,
            taskEditing: null,
            filter: {
                filterByName: '',
                filterByStatus: -1
            },
            search: '',
            sort: {
                sortName: '',
                sortValue: 1
            }
        }
    }

    // được gọi lại một lần khi F5 reload lại trang
    componentWillMount(){
        if(localStorage && localStorage.getItem('stask')){
            var tasks = JSON.parse(localStorage.getItem('stask'));
            this.setState({
                tasks: tasks,
                taskEditing: null
            })
        }
    }

    // onGenerateData = () => {
    //     var task = [
    //         {
    //             id: randomstring.generate(),
    //             name: 'Học lập trình',
    //             status: true
    //         },
    //         {
    //             id: randomstring.generate(),
    //             name: 'Học toán cao cấp',
    //             status: false
    //         },
    //         {
    //             id: randomstring.generate(),
    //             name: 'Học anh văn',
    //             status: true
    //         },
    //     ]
    //     this.setState({
    //         tasks: task
    //     })
    //     localStorage.setItem('stask', JSON.stringify(task));
    //     console.log(task);
    // }

    onDislayTaskForm = () => {
        if(this.state.taskEditing)
        {
            this.setState({
                taskEditing: null
            })
            console.log('long')
        } else {
            this.setState({
                isDislayTaskForm : !this.state.isDislayTaskForm,
                taskEditing: null
            })
        }
    }

    onCloseForm = () => {
        this.setState({
            isDislayTaskForm : !this.state.isDislayTaskForm,
            taskEditing: null
        })
    }

    onOpenForm = () => {
        this.setState({
            isDislayTaskForm : true
        })
    }

    onSummit = (data) => {
        data.status = data.status === 'true' ? true : false;
        var {tasks} = this.state;
        if(data.id !== ''){
            //Edit
            var index = this.findIndexById(data.id);
            tasks[index] = data;
        } else {
            //Add
            data.id = randomstring.generate();
            tasks.push(data);
        }
        this.setState({
            tasks: tasks,
            taskEditing : null
        })
        localStorage.setItem('stask', JSON.stringify(tasks));
        this.onCloseForm();
    }

    findIndexById = (id) => {
        var{tasks} = this.state;
        var result = -1;
        tasks.forEach((item, index) =>{
            if(item.id === id){
                result = index;
            }
        })
        return result;
    }

    onUpdateStatus = (id) => {
        var index = this.findIndexById(id);
        var{tasks} = this.state;
        tasks[index].status = !tasks[index].status;
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('stask', JSON.stringify(tasks));
    }

    onDelete = (id) => {
        var index = this.findIndexById(id);
        var{tasks} = this.state;
        tasks.splice(index, 1);
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('stask', JSON.stringify(tasks));
    }

    onUpdate = (id) => {
        var index = this.findIndexById(id);
        console.log(index);
        var{tasks} = this.state;
        var taskEditin = tasks[index];
        this.setState({
            taskEditing: taskEditin
        });
        this.onOpenForm();
        // localStorage.setItem('stask', JSON.stringify(tasks));
    }

    onFilter = (filterByName,filterByStatus) => {
        this.setState({
            filter: {
                filterByName: filterByName,
                filterByStatus: parseInt(filterByStatus)
            }
        })
    }

    onSearch = (keyword) => {
        this.setState({
            search: keyword
        })
    }

    onSort = (sortName, sortValue) => {
        this.setState({
            sort: {
                sortName: sortName,
                sortValue: sortValue
            }
        })
    }

  render(){
    
    var { tasks, filter, search, sort} = this.state;
    if(search) {
        tasks = tasks.filter((item) =>{
            return item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ? true : false
        })
    }
    if(filter.filterByStatus !== -1) {
        tasks = tasks.filter((item) =>{
            return item.status == filter.filterByStatus ? true : false
        })
    }
    if(filter.filterByName) {
        tasks = tasks.filter((item) =>{
            return item.name.toLowerCase().indexOf(filter.filterByName.toLowerCase()) >= 0 ? true : false
        })
    }
   
    if(sort.sortName === 'name') {
        
        tasks.sort((a, b) => {
            if(a.name > b.name) return sort.sortValue;
            else if(a.name < b.name) return -sort.sortValue;
            else return 0
        })
    } else {
        tasks.sort((a, b) => {
            if(a.status > b.status) return -sort.sortValue;
            else if(a.status < b.status) return sort.sortValue;
            else return 0
        })
    }
    var className = classNames({
                            'col-xs-8 col-sm-8 col-md-8 col-lg-8': this.state.isDislayTaskForm,
                            'col-xs-12 col-sm-12 col-md-12 col-lg-12': !this.state.isDislayTaskForm,
                        })                  
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
        {this.state.isDislayTaskForm ? <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <TackForm 
                        onCloseForm={this.onCloseForm}
                        onSummit={this.onSummit}
                        task={this.state.taskEditing}
                        />
            </div> : ''}
            <div className={className}>
                <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={this.onDislayTaskForm}
                        >
                            Thêm Công Việc
                </button>
                {/* <button 
                        type="button" 
                        className="btn btn-warning" 
                        onClick={this.onGenerateData}
                        >
                    <span className="fa fa-plus mr-5"></span>Genaric data
                </button> */}
                <Control 
                    onSearch={this.onSearch} 
                    onSort={this.onSort}
                />
                <br></br>
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TackList 
                            tasks={tasks}
                            onUpdateStatus = {this.onUpdateStatus}
                            onDelete = {this.onDelete}
                            onUpdate = {this.onUpdate}
                            onFilter = {this.onFilter}
                            />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
