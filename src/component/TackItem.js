import React, { Component } from "react";
import classNames from "classnames";

class TackItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

  render(){
      var {task, index} = this.props;
      var className = classNames({'label': true,
                                'label-danger': !task.status,
                                'label-success': task.status,
                            })
      var content = classNames({
                                'Ẩn': !task.status,// === false ? true : false,
                                'Kích Hoạt': task.status// === true ? true : false,
                            })
                            
    return (
        
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span
                     className = {className}
                     onClick={this.onUpdateStatus}
                     >
                            {content}
                </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                    <span className="fa fa-pencil mr-5"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                    <span className="fa fa-trash mr-5"></span>Xóa
                </button>
            </td>
        </tr>
    );
  }
}

export default TackItem;
