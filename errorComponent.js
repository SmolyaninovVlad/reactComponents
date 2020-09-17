/*
Компонент для отлова ошибок в дочерних компонентах 
и для вывод аварийного интерфейса для минимального взаимодействия с пользователем
по кнопке "сообщить об ошибке" идёт отправка автоматичесски сгенерированного сообщения на почту сектора WEB-разработок
с подробным описанием ошибки
*/


let requestOptions = {
  method : "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
  }
}
window.reactElements.ErrorBoundary = class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        hasError: false,
        error: '',
        info: '',
        sending: false
      };
      this.sendInfo = this.sendInfo.bind(this)
    }
    
    
    componentDidCatch(error, info){
      this.setState({ hasError: true, error: error.toString(), info: info.componentStack})
    }
    sendInfo(){

      const searchParams = new URLSearchParams();
      let data = {
        'error':this.state.error,
        'info':this.state.info,
        'url':window.location.href,
        'user-Agent':get_name_browser()
      }
      for (let prop in data) {
          searchParams.set(prop, data[prop]);
      }
      requestOptions.body = searchParams
      this.setState({sending:true});
      
      (async () => {
        let response = await fetch('/ajax/errorCompSend.php', requestOptions)
        let json = await response.json()
        this.setState({sending:false})
      })()

    }

    render() {
      if (this.state.hasError) {
        // Аварийный UI
        return <div className="errorBlock mb-3 mt-3">
                  <div>
                    <span>Ошибка загрузки компонента</span>
                    <ErrorInfoDialog error={this.state.error} info={this.state.info}/>
                    <MaterialUI.Button variant="outlined" color="primary" disabled={this.state.sending} onClick={()=>this.sendInfo()}>{this.state.sending? <i className="fa fa-circle-o-notch fa-spin fa-fw"/>:"Сообщить об ошибке"}</MaterialUI.Button>
                  </div>
                </div>;
      }
      return this.props.children;
    }
  } 

  let ErrorInfoDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
          
    const handleClickOpen = scrollType => () => {
        event.preventDefault()
        setOpen(true);
        setScroll(scrollType);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);

    return (
        <div>
          <span className="modalInfo" variant="outlined" color="primary" onClick={handleClickOpen('paper')}>
            <MaterialUI.Icon className="fa fa-sticky-note-o mx-auto"></MaterialUI.Icon>
            Информация 
          </span>
          <MaterialUI.Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            maxWidth="md"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <MaterialUI.DialogTitle id="scroll-dialog-title">Информация об ошибке компонента</MaterialUI.DialogTitle>
            <MaterialUI.DialogContent dividers={scroll === 'paper'} >
            <div className="popup-body" style={{padding: "10px 20px", color: "#292b2c",fontFamily: '"OpenSans", "Helvetica Neue", Arial, sans-serif'}}>
              <p>{props.error}</p>
              <p>{props.info}</p>
            </div>
          </MaterialUI.DialogContent>
          <MaterialUI.DialogActions>
            <MaterialUI.Button onClick={handleClose} variant="contained" color="primary">
              Закрыть
            </MaterialUI.Button>
          </MaterialUI.DialogActions>
        </MaterialUI.Dialog>
        </div>
      );
}

