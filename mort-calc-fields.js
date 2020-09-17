/*
Зависимые поля для ипотечного калькулятора и для интерфейса подачи ипотечной заявки
*/

// получение GET параметров если они есть(вход в калькулятор по сгенерированной ссылке)
const params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            let a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );
//Первоначальные данные калькулятора
const defaultCalcData = {
    cost: params['cost']?params['cost']:3000000,
    costMin: 300000,
    costMax: 50000000,
    costStep: 10000,            
    firstPaymentStep: 5000,  
    term: params['term']?params['term']:120,          
    termMin: 36,
    termMax: 360,
    termStep: 1,
    //Первоначальные данные для расчёта    
    firstPaymentMin: 35, // %    
    firstPayment: params['firstPayment']
}

let MortCalcFields = () => {
    let [cost, setCost] = React.useState(defaultCalcData.cost)
    let [term, setTerm] = React.useState(defaultCalcData.term)
    let [firstPayment, setFirstPayment] = React.useState(defaultCalcData.firstPayment?defaultCalcData.firstPayment:defaultCalcData.cost/100*defaultCalcData.firstPaymentMin)

    let inputHandleChange = React.useCallback((value, key) => {
        switch (key) {
            case "firstPayment":
                setFirstPayment(value)
                break;
            case "term":
                setTerm(value)
                break;
            case "cost":
                setCost(value)
                break;
        }
    }, [])
    
    React.useEffect(()=>{
        if (firstPayment>cost/100*90) setFirstPayment(cost/100*90) 
        else
        if (firstPayment<cost/100*defaultCalcData.firstPaymentMin) setFirstPayment(cost/100*defaultCalcData.firstPaymentMin)
    }, [cost])

    
    return (
        <div id="calc">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <window.reactElements.SliderGroup label="Стоимость недвижимости, руб." name="cost" functionKey= {"cost"} function={inputHandleChange} isMoney={true} min={defaultCalcData.costMin} max={defaultCalcData.costMax} inputValue={cost} step={defaultCalcData.costStep}/>
                        </div>
                        <div className="col-md-12">
                            <window.reactElements.SliderGroup label="Первоначальный взнос, руб."  name="firstPayment" functionKey= {"firstPayment"} function={inputHandleChange} percentOf={cost} isMoney={true} min={cost/100*defaultCalcData.firstPaymentMin} max={cost/100*90} inputValue={firstPayment} step={defaultCalcData.firstPaymentStep}/>
                        </div>
                        <div className="col-md-12">
                            <window.reactElements.SliderGroup label="Срок кредита, мес." name="term" functionKey= {"term"} function={inputHandleChange} min={defaultCalcData.termMin} max={defaultCalcData.termMax} inputValue={term} step={defaultCalcData.termStep}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
window.reactContainer.MortCalcFields = () => {
    return <window.reactElements.ErrorBoundary><MortCalcFields/></window.reactElements.ErrorBoundary>
}