import Preloader from "../../Preloader/Preloader";
import React, {ChangeEvent} from "react";

type propsType={
    status: string
    profile:any
    updateStatus:(status:string)=> void
}
type stateType={
    editMode: boolean,
    status: string
}
class ProfileStatus extends React.Component<propsType, stateType>{
    state ={
        editMode: false,
        status: this.props.status
    };
    activateEditMode = () => {
       // console.log("this:",this);
        this.setState({
           editMode: true
        });

      // this.forceUpdate();//лайфхак для изменения глобального стейта (использовать в крайних случаях, лучше не испорльзовать))
    };
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
        // this.forceUpdate();//лайфхак для изменения глобального стейта (использовать в крайних случаях, лучше не испорльзовать))
    };

    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    };

//этот метод испольтзуем только с условием, иначе произойдет зацикливание программы (бесконечная перерисовка)
    componentDidUpdate(prevProps:propsType, prevState:stateType) {// перерисовка компоненты (обновление) -
        if (prevProps.status !== this.props.status){//если предыдущий статус не равен текущему статусу обновляем компоненту
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        if(!this.props.profile){
        return <Preloader/>
    }
        return(
            <div>
                {
                    !this.state.editMode &&
                    <span onDoubleClick={this.activateEditMode}>... {this.props.status || 'no status'}</span>
                }
                {
                    this.state.editMode &&
                    <input autoFocus={true} onChange={this.onStatusChange} onBlur={this.deActivateEditMode} type='text' value={this.state.status}/>
                }
            </div>

        )
    }


}
export  default  ProfileStatus;