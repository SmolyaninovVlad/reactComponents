$("head").append('<script src="/vendor/react-modules/react-components/rangeslider.min.js"></script>');
$("head").append('<link rel="stylesheet" href="/vendor/react-modules/react-components/rangeslider.min.css"/> ');

/*
Параметры компонента пример
    inputValue: 70000,
    min: 30000,
    max: 100000,
    step: 100,
    name: "slider1" имя елемента INPUT
    label: Среднемесячный доход,
    isMoney: true - Для разрядности чисел
    percentOf: 10000 - Для отображения процента от входного параметра
    function: внешняя функция для изменения внешнего параметра
*/


window.reactElements.SliderGroup = class SliderGroup extends React.Component {
    constructor(props) {
        super(props);
        this.inputHandleChange = this.inputHandleChange.bind(this)
        this.sliderChangeHandler = this.sliderChangeHandler.bind(this)
        this.inputValidate = this.inputValidate.bind(this)
        this.inputFormat = this.inputFormat.bind(this)
        this.numberFormat = this.numberFormat.bind(this)
    }
    sliderChangeHandler(event){
        let elem = this.props.name?document.getElementsByName(this.props.name)[0]:false
        if (elem) elem.setAttribute("style", "");
        let value = this.inputFormat(event)

        //Если внешняя функция передана то выполняем изменение внешнего параметра
        if (this.props.function && this.props.functionKey){
            this.props.function(this.numberFormat(value), this.props.functionKey)
        }
    }

    inputHandleChange(event){
        event.target.setAttribute("style", "");
        let value = this.inputFormat(event.target.value)
        if (this.numberFormat(value)>this.props.max) {

            //Если внешняя функция передана то выполняем изменение внешнего параметра
            if (this.props.function && this.props.functionKey){
                this.props.function(this.props.max, this.props.functionKey)
            }
        }
            else {
                //Если внешняя функция передана то выполняем изменение внешнего параметра
                if (this.props.function && this.props.functionKey){
                    this.props.function(this.numberFormat(value), this.props.functionKey)
                }
            }
               
    }

    numberFormat(string){
        string = String(string)
        return Number(string.replace(/\s+/g,''))
    }

    inputFormat(value){
        value = String(value)
        value = value.replace(/[^0-9]/g,'');
        value = value.replace(/^0+(.*)$/,'0$1');
        value = value.replace(/^0([^.].*)$/,'$1');
        if (this.props.isMoney) value = value.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");  
        return value
    }

    inputValidate(event){
        //кастомная валидация
        if (this.numberFormat(event.target.value)<this.numberFormat(this.props.min)) {

            //Если внешняя функция передана то выполняем изменение внешнего параметра
            if (this.props.function && this.props.functionKey){
                this.props.function(this.inputFormat(this.props.min), this.props.functionKey)
            }
        }
        if (this.numberFormat(event.target.value)>this.numberFormat(this.props.max)) {

            //Если внешняя функция передана то выполняем изменение внешнего параметра
            if (this.props.function && this.props.functionKey){
                this.props.function(this.props.max, this.props.functionKey)
            }
        }
    }

    render(){
        return(
            <div className="form-group mb-0">
            <label>{this.props.label}</label>
            <input type="text" value={this.inputFormat(this.props.inputValue)} name={this.props.name? this.props.name : ""}  onBlur={this.inputValidate} onChange={this.inputHandleChange} className={"form-control form-control-lg "+(this.props.isMoney && "currency currency__rub")}/>
            {this.props.percentOf &&
                <span className="sliderPercentLabel">
                    {Math.round(this.numberFormat(this.props.inputValue)/this.props.percentOf * 100)}%
                </span>
            }

            <div className="slider slider-horizontal">
                <div className="tooltip tooltip-min top hide" role="presentation">
                    <div className="tooltip-arrow"></div>
                    <div className="tooltip-inner"></div>
                </div>
                <div className="tooltip tooltip-max hide top" role="presentation">
                    <div className="tooltip-arrow"></div>
                    <div className="tooltip-inner"></div>
                </div>
                <div className='slider'>
                    <ReactRangeslider.default                        
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        value={parseInt(String(this.props.inputValue).replace(/[^0-9.]/gim, ""))}
                        onChange={this.sliderChangeHandler}
                    />
                </div>
            </div>
            <div className="slider-range">
                <span> {this.props.min.toLocaleString()} </span>
                {this.props.percentOf && Math.round(this.numberFormat(this.props.inputValue)/this.props.percentOf * 100)<20 &&
                <span className="sliderAdditionalPercentLabel">
                    Снизьте ставку, увеличив первоначальный взнос до 20%
                </span>
                }
                <span> {this.props.max.toLocaleString()} </span>

            </div>
            </div>
        )
    }
}
