import React, { Component } from "react";
import TackForm from "./component/TackForm";
import Control from "./component/control"
import TackList from "./component/TackList";
import classNames from "classnames";
import { connect } from "react-redux";
import * as actions from './actions/index';

class App extends Component {
    
    // được gọi lại một lần khi F5 reload lại trang
    componentWillMount(){
        if(localStorage && localStorage.getItem('stask')){
            var tasks = JSON.parse(localStorage.getItem('stask'));
            this.setState({
                tasks: tasks
            })
        }
    }
    onDislayTaskForm = () => {
        if(!this.props.editingTask.id) {
            this.props.onTogelForm(this.props.isDislayTaskForm);
        } else {
            this.props.onUpdate({
                id: '',
                name: '',
                status: false
            });
            this.props.onOpenForm(this.props.isDislayTaskForm);
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm(this.props.isDislayTaskForm);
        this.props.onUpdate({
            id: '',
            name: '',
            status: false
        });
    }

    onOpenForm = () => {
        this.props.onOpenForm(this.props.isDislayTaskForm);
    }

  render(){
    var className = classNames({
                            'col-xs-8 col-sm-8 col-md-8 col-lg-8': this.props.isDislayTaskForm,
                            'col-xs-12 col-sm-12 col-md-12 col-lg-12': !this.props.isDislayTaskForm,
                        })                  
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
        {this.props.isDislayTaskForm ? <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <TackForm 
                        onCloseForm={this.onCloseForm}
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
                <Control />
                <br></br>
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TackList />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

var mapStateToProps =  state =>  {
    return {
        isDislayTaskForm: state.form,
        editingTask: state.editingTask
    }
}

var mapDispatchToProps = (dispatch, Props) =>{
    return {
        onCloseForm: isDisplayForm => {
            dispatch(actions.closeForm(isDisplayForm));
        },
        onOpenForm: isDisplayForm => {
            dispatch(actions.openForm(isDisplayForm));
        },
        onTogelForm: isDisplayForm => {
            dispatch(actions.toggelForm(isDisplayForm));
        },
        onUpdate: task => {
            dispatch(actions.updateTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
