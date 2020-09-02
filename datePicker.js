/*
Кастомный датаПикер реализованный(по просьбе) с использованием уже существующей библиотеки (jquery)
*/

let TextField = MaterialUI.TextField

window.reactElements.DatePicker = class DatePicker extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        let it = this
        $("input[name='"+it.props.name+"']").datepicker({
            onSelect: function onSelect(fd, date) {
                it.props.onUpdate(fd, it.props.name)
            }
        })
    }

    render(){
        return(
            <ReactInputMask mask="99.99.9999" disabled = {this.props.disabled}  value={this.props.value} onChange={this.props.onUpdate}>
                {() =><TextField
                    inputProps={{ 
                        className:"datepicker-here"
                    }}
                    InputLabelProps={{ 
                        shrink: true, required: true 
                    }} 
                    required={this.props.required}
                    name={this.props.name}
                    label={this.props.label} 
                    disabled = {this.props.disabled} 
                    />}
            </ReactInputMask>
        )
    }
}
