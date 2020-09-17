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


window.reactElements.SliderGroup = (props) => {
    const [inputValue, setInputValue] = React.useState(props.inputValue)
    const [addClass, setAddClass] = React.useState('')
    React.useEffect(()=>{
        if (inputValue<props.min) setInputValue(numberFormat(props.min))
        else if (inputValue>props.max) setInputValue(numberFormat(props.max))

    }, [props.min, props.max])

    React.useEffect(()=>{
        if (numberFormat(inputValue)<numberFormat(props.min)) setAddClass("input_invalid") 
        else setAddClass("") 
    }, [inputValue])

    const inputHandleChange = (event) => {
        let value = inputFormat(event.target.value)
        if (numberFormat(value)>props.max) {

            //Если внешняя функция передана то выполняем изменение внешнего параметра
            if (props.function && props.functionKey){
                props.function(props.max, props.functionKey)
            }
            setInputValue(numberFormat(props.max))
        }
        else {
            //Если внешняя функция передана то выполняем изменение внешнего параметра
            if (props.function && props.functionKey){
                props.function(numberFormat(value), props.functionKey)
            }
            setInputValue(numberFormat(value))
        }
    }

    const numberFormat = (string) => {
        string = String(string)
        return Number(string.replace(/\s+/g,''))
    }

    const inputFormat = (value) => {
        value = String(value)
        value = value.replace(/[^0-9]/g,'');
        value = value.replace(/^0+(.*)$/,'0$1');
        value = value.replace(/^0([^.].*)$/,'$1');
        if (props.isMoney) value = value.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");  
        return value
    }

    const inputValidate = (event) => {
        //кастомная валидация
        if (numberFormat(event.target.value)<numberFormat(props.min)) {

            //Если внешняя функция передана то выполняем изменение внешнего параметра
            if (props.function && props.functionKey){
                props.function(props.min, props.functionKey)
            }
            setInputValue(numberFormat(props.min))
        }
    }

    const sliderChangeHandler = (event) => {
        let elem = props.name?document.getElementsByName(props.name)[0]:false
        if (elem) elem.setAttribute("style", "");
        let value = inputFormat(event)

        //Если внешняя функция передана то выполняем изменение внешнего параметра
        if (props.function && props.functionKey){
            props.function(numberFormat(value), props.functionKey)
        }
        setInputValue(numberFormat(value))
    }

    return (
        <div className="form-group mb-0">
            <label>{props.label}</label>
            <input type="text" value={inputFormat(inputValue)} name={props.name? props.name : ""}  onBlur={inputValidate} onChange={inputHandleChange} className={`form-control form-control-lg ${props.isMoney && "currency currency__rub"} ${addClass}`}/>
            {props.percentOf &&
                <span className="sliderPercentLabel">
                    {Math.round(numberFormat(inputValue)/props.percentOf * 100)}%
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
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        value={parseInt(String(inputValue).replace(/[^0-9.]/gim, ""))}
                        onChange={sliderChangeHandler}
                    />
                </div>
            </div>
            <div className="slider-range">
                <span> {props.min.toLocaleString()} </span>
                {props.percentOf && Math.round(numberFormat(inputValue)/props.percentOf * 100)<20 &&
                <span className="sliderAdditionalPercentLabel">
                    Снизьте ставку, увеличив первоначальный взнос до 20%
                </span>
                }
                <span> {props.max.toLocaleString()} </span>
            </div>
        </div>
    )
}