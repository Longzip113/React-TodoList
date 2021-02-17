import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/index';

class TackForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status: true
        }
    }

    componentWillMount(){
        if(this.props.editingTask){
            var {editingTask} = this.props;
            this.setState({
                id: editingTask.id,
                name: editingTask.name,
                status: editingTask.status
            })
        }
    }

    // load lại form khi onClick
    componentWillReceiveProps(nextProps){
        if(nextProps.editingTask){
            //chuyển form edit
            var {editingTask} = nextProps;
            this.setState({
                id: editingTask.id,
                name: editingTask.name,
                status: editingTask.status
            })
        } else {
            // khi bấm thêm chuyên form thêm
            this.setState({
                id: '',
                name: '',
                status: true
            })
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onHandelChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    onSummit = (event) => {
        this.props.onAddTask(this.state);
        this.props.onCloseForm();
        this.onClear();
    }
    onClear = () => {
        this.setState({
            id : '',
            name: '',
            status: true
        })
    }
  render(){
    var title = this.state.id === '' ? 'Thêm Công Việc':'Cập nhật công viêc'
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">{title}</h3>
                <h4 onClick={ this.onCloseForm }>X</h4>
            </div>
            <div className="panel-body">
                <form>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name='name'
                                value={this.state.name}
                                onChange = {this.onHandelChange}
                                />
                    </div>
                    <label>Trạng Thái :</label>
                    <select 
                            className="form-control" 
                            name='status' 
                            value={this.state.status} 
                            onChange = {this.onHandelChange}
                            >
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button className="btn btn-warning" onClick={this.onSummit}>Lưu</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
}

var mapStateToProps =  state =>  {
    return {
        editingTask: state.editingTask
    }
}

var mapDispatchToProps = (dispatch, Props) =>{
    return {
        onAddTask: task => {
            dispatch(actions.addTask(task));
        },
        onCloseForm: isDisplayForm => {
            dispatch(actions.closeForm(isDisplayForm));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TackForm);
