import React, { Component } from "react";

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
        if(this.props.task){
            var {task} = this.props;
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status
            })
        }
    }

    // load lại form khi onClick
    componentWillReceiveProps(nextProps){
        if(nextProps.task){
            //chuyển form edit
            var {task} = nextProps;
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status
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
        //Bỏ đi summit mặc định
        //event.preventDefault();
        this.props.onSummit(this.state);
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
                        <button type="submit" className="btn btn-warning" onClick={this.onSummit}>Lưu</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
}

export default TackForm;
